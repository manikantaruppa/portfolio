import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Rss, Sparkles } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// BlogCard with parallax scroll and hover glow
function BlogCard({ article, index }: { article: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect - image moves slower than card
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth motion
      }}
      className="h-full group"
    >
      <Card className="overflow-hidden h-full relative transition-all duration-500 hover:shadow-2xl">
        {/* Animated border glow on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-[-2px] bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50 rounded-lg blur-sm" />
        </div>

        {/* Image container with parallax and clip reveal */}
        <div className="relative overflow-hidden h-56">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.2, ease: "easeOut" }}
              className="w-full h-full"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Reading time badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
            className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full"
          >
            <div className="flex items-center text-xs font-medium">
              <Clock className="h-3 w-3 mr-1.5 text-primary" />
              <span>{article.readTime}</span>
            </div>
          </motion.div>
        </div>

        {/* Content with layered fade-in */}
        <motion.div style={{ y: contentY }}>
          <CardContent className="p-6 relative z-10 bg-white dark:bg-slate-900">
            {/* Date */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3"
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span>{article.date}</span>
            </motion.div>

            {/* Title with line reveal */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
              className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight"
            >
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300 relative group/title"
              >
                {article.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/title:w-full" />
              </a>
            </motion.h3>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
              className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-3"
            >
              {article.excerpt}
            </motion.p>

            {/* Tags and button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
              className="flex items-center justify-between mt-6"
            >
              <div className="flex gap-2">
                {article.tags.map((tag: string, tagIndex: number) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.15 + 0.7 + tagIndex * 0.1,
                      ease: "backOut"
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs px-3 py-1 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <Button variant="ghost" size="sm" asChild>
                <motion.a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium flex items-center gap-1 group/btn"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Read
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </motion.a>
              </Button>
            </motion.div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export function BlogSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const articles = [
    {
      title: "RAG in Production: The Architecture That Actually Works (2026 Edition)",
      excerpt: "We built the demo in a weekend. Optimizing it took six months. Here is the blueprint for enterprise-grade RAG that doesn't hallucinate or timeout.",
      image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XM5YorrxclnwoF8ekiskYg.jpeg",
      date: "Jan 2026",
      readTime: "10 min read",
      tags: ["RAG", "Production"],
      href: "https://medium.com/@manikantaruppa/rag-in-production-the-architecture-that-actually-works-2026-edition-c06aa7b47f68"
    },
    {
      title: "Agentic AI Demystified: Hype, Reality, and How to Build Scalable Systems That Actually Work",
      excerpt: "Why 40%+ of agentic AI projects fail, what companies are missing, and a battle-tested framework for building autonomous systems that survive production.",
      image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*MbUnfpW9mXR3nmJTB-E3Ig.jpeg",
      date: "Jan 2026",
      readTime: "12 min read",
      tags: ["Agentic AI", "LLMs"],
      href: "https://medium.com/@manikantaruppa/designing-enterprise-scale-agentic-ai-systems-beyond-the-hype-d486984889af"
    }
  ];

  return (
    <section id="blog" className="pt-12 pb-20 lg:pt-16 lg:pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-[92%] lg:max-w-[85%] xl:max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* SECTION HEADER */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide uppercase">
              <Sparkles className="h-4 w-4" />
              Insights & Articles
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight"
          >
            Blog
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            Insights on GenAI systems, agentic architectures, and production AI patterns
          </motion.p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {articles.map((article, index) => (
            <BlogCard key={index} article={article} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16"
        >
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold group relative overflow-hidden"
            asChild
          >
            <motion.a
              href="https://medium.com/@manikantaruppa"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Animated gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative flex items-center gap-2">
                <Rss className="h-5 w-5" />
                View All Articles
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
