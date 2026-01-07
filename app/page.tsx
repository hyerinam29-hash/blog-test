import { getPublishedPosts } from "@/lib/notion";
import BlogCard from "@/components/BlogCard";

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function Home() {
  let posts: any[] = [];
  let error: string | null = null;

  try {
    posts = await getPublishedPosts();
  } catch (e: any) {
    console.error("Failed to fetch posts:", e);
    error = e.message;
  }

  return (
    <main className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-8 tracking-tighter leading-none">
            MANTIS<span className="text-accent italic">.</span>
          </h1>
          <p className="text-lg md:text-xl text-accent max-w-2xl leading-relaxed">
            Exploring the intersection of high-end design and scalable technology. 
            Curated thoughts on architecture, aesthetics, and code.
          </p>
        </header>

        {error ? (
          <div className="glass p-12 rounded-2xl text-center">
            <h2 className="text-2xl mb-4">Connection Required</h2>
            <p className="text-accent">
              Please check your <code className="bg-white/5 px-2 py-1 rounded">.env.local</code> settings. 
              Notion API integration is pending initialization.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
            {posts.length > 0 ? (
              posts.map((post, idx) => (
                <div key={post.id} className={idx % 4 === 0 ? "md:col-span-2" : ""}>
                  <BlogCard 
                    {...post} 
                    index={idx}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center opacity-50">
                <p className="text-2xl font-serif italic">No stories published yet.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
