import { getPostBySlug } from "@/lib/notion";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import KakaoAdFit from "@/components/KakaoAdFit";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LucideArrowLeft } from "lucide-react";

export const revalidate = 3600;

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors mb-12 group"
        >
          <LucideArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-4 text-sm text-accent mb-6">
            <span>{new Date(post.metadata.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Notion CMS</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
            {post.metadata.title}
          </h1>
          <p className="text-xl md:text-2xl text-accent leading-relaxed italic border-l-4 border-accent/20 pl-6">
            {post.metadata.description}
          </p>
        </header>

        <section className="mt-16 pb-24">
          <MarkdownRenderer content={post.content} />
          <KakaoAdFit />
        </section>
      </div>
    </main>
  );
}
