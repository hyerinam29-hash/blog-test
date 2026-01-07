"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideArrowUpRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  index: number;
}

export default function BlogCard({ title, slug, description, date, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="group relative h-full glass p-8 rounded-2xl flex flex-col justify-between overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
    >
      <Link href={`/blog/${slug}`} className="absolute inset-0 z-10" />
      
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="text-xs uppercase tracking-widest text-accent">
            {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-45">
            <LucideArrowUpRight size={18} />
          </div>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-serif leading-tight mb-4 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-accent group-hover:text-foreground/80 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-sm font-medium">Read Article</span>
      </div>

      {/* Subtle hover background decoration */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors duration-1000" />
    </motion.div>
  );
}
