import { NotionToMarkdown } from "notion-to-md";
import { Client } from "@notionhq/client";

// notion-to-md를 위해 클라이언트는 유지하되, 데이터 패칭은 fetch를 사용함
const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});
const n2m = new NotionToMarkdown({ notionClient: notionClient });

export async function getPublishedPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const apiKey = process.env.NOTION_API_KEY;
  if (!databaseId || !apiKey) throw new Error("Notion orientation mismatch");

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28', // 최신 버전 명시
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            timestamp: "created_time",
            direction: "descending",
          },
        ],
      }),
      next: { revalidate: 60 } // Next.js 캐싱 옵션
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Notion API Fetch Error:", data);
      throw new Error(`Notion API returned ${response.status}`);
    }

    return data.results.map((page: any) => ({
      id: page.id,
      title: page.properties.title?.title[0]?.plain_text || "Untitled",
      slug: page.properties.slug?.rich_text[0]?.plain_text || "",
      description: page.properties.metaDescription?.rich_text[0]?.plain_text || "",
      date: page.created_time,
    }));
  } catch (error) {
    console.error("Direct Fetch Error:", error);
    throw error;
  }
}

export async function getPostBySlug(slug: string) {
  console.log(`[getPostBySlug] Fetching post for slug: "${slug}"`);
  const databaseId = process.env.NOTION_DATABASE_ID;
  const apiKey = process.env.NOTION_API_KEY;
  if (!databaseId || !apiKey) throw new Error("Notion orientation mismatch");

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Notion API Post Fetch Error:", data);
      throw new Error(`Notion API returned ${response.status}: ${JSON.stringify(data)}`);
    }

    if (!data.results || data.results.length === 0) {
      console.log(`No post found with slug: ${slug}`);
      return null;
    }

    const page = data.results[0];
    if (!page) return null;

    // 마크다운 변환 시에는 클라이언트를 사용 (여기서도 에러나면 fetch로 직접 구현 가능하나 우선 시도)
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      metadata: {
        title: (page as any).properties.title?.title[0]?.plain_text || "Untitled",
        description: (page as any).properties.metaDescription?.rich_text[0]?.plain_text || "",
        date: (page as any).created_time,
      },
      content: mdString.parent,
    };
  } catch (error) {
    console.error("Direct Slug Fetch Error:", error);
    throw error;
  }
}
