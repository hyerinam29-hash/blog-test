import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert prose-brand max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-serif mt-12 mb-6">{children}</h1>,
          h2: ({ children }) => <h2 className="text-3xl md:text-4xl font-serif mt-10 mb-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl md:text-3xl font-serif mt-08 mb-4">{children}</h3>,
          p: ({ children }) => <p className="text-lg leading-relaxed text-foreground/90 mb-6">{children}</p>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-white/20 pl-6 italic text-accent my-8">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ) : (
              <pre className="!bg-white/[0.03] !border !border-white/5 rounded-xl p-6 my-8 overflow-x-auto">
                <code className={className}>{children}</code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
