import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, Github, FileText, BookOpen, Play, X, Sparkles, Lock, Building2, CheckCircle2, Target, Zap, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PopupModal } from "react-calendly";

export function ProjectsSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string | null>(null);
  const [currentVideoSubtitle, setCurrentVideoSubtitle] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const [truncatedDescriptions, setTruncatedDescriptions] = useState<Set<number>>(new Set());
  const descriptionRefs = useRef<Map<number, HTMLParagraphElement>>(new Map());

  const toggleDescription = (index: number) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Check which descriptions are truncated (need "Show more" button)
  const checkTruncation = useCallback(() => {
    const newTruncated = new Set<number>();
    descriptionRefs.current.forEach((el, index) => {
      if (el && el.scrollHeight > el.clientHeight) {
        newTruncated.add(index);
      }
    });
    setTruncatedDescriptions(newTruncated);
  }, []);

  // Run truncation check on mount and window resize
  useEffect(() => {
    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [checkTruncation]);

  const headerRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Inject CSS to hide Calendly cookie settings
  useEffect(() => {
    if (calendlyOpen) {
      const style = document.createElement('style');
      style.id = 'calendly-custom-styles';
      style.innerHTML = `
        /* Hide cookie settings link in Calendly */
        .calendly-popup-content a[href*="cookie"],
        .calendly-popup-content button:has-text("Cookie"),
        [data-container="cookie-settings"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        const styleElement = document.getElementById('calendly-custom-styles');
        if (styleElement) {
          styleElement.remove();
        }
      };
    }
  }, [calendlyOpen]);

  const openVideoModal = (videoUrl: string, title: string, subtitle: string) => {
    setVideoModalOpen(true);
    setCurrentVideo(videoUrl);
    setCurrentVideoTitle(title);
    setCurrentVideoSubtitle(subtitle);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideo(null);
    setCurrentVideoTitle(null);
    setCurrentVideoSubtitle(null);
  };

  const openDetailsDialog = (project: any) => {
    setSelectedProject(project);
    setDetailsDialogOpen(true);
  };

  const closeDetailsDialog = () => {
    setDetailsDialogOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      title: "Text-to-SQL Agent — Natural Language Database Intelligence",
      description: "LLM-powered agent enabling SQL-free analytics for business users. Converts natural language questions into executable SQL with schema-aware prompting, query disambiguation, and plain-English result summaries. Supports MySQL and SQLite with constraint-based validation.",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["LLMs", "Agent Frameworks", "SQL", "MySQL", "SQLite", "NLP"],
      metrics: [
        { label: "Impact", value: "SQL-Free Analytics" },
        { label: "Query Safety", value: "Constraint-Based Validation" }
      ],
      links: [
        { type: "github", href: "https://github.com/manikantaruppa/text-to-sql-system" }
      ],
      category: "Agentic AI | Database Reasoning",
      featured: false,
      isPrivate: false
    },
    {
      title: "RAG Studio — Multi-Domain RAG Platform",
      description: "Configurable, domain-agnostic RAG platform for building high-quality knowledge systems without code. Features project-wise data pipelines, semantic/recursive chunking strategies, and hybrid retrieval (FAISS + ChromaDB). Delivered 40-50% accuracy improvement over naive RAG.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["LLMs", "LangChain", "FAISS", "ChromaDB", "Elasticsearch", "Embedding", "Semantic Retrieval"],
      metrics: [
        { label: "Accuracy Improvement", value: "40-50%" },
        { label: "Retrieval", value: "Hybrid (Dense + Keyword)" }
      ],
      links: [
        { type: "details", href: "#" },
        { type: "video", href: "/assets/RAG_Studio_Demo.webm" }
      ],
      category: "Retrieval-Augmented Generation | Knowledge Systems",
      video: "/assets/RAG_Studio_Demo.webm",
      featured: true,
      isPrivate: true,
      privateDetails: {
        problemStatement: "Organizations struggled to build effective RAG systems due to poor retrieval quality, inconsistent chunking strategies, and lack of domain customization. Naive RAG implementations achieved only 40-60% answer accuracy, making them unsuitable for production use.",
        approach: [
          "Built configurable pipeline supporting multiple chunking strategies (semantic, recursive, fixed-size) with automatic optimization",
          "Implemented hybrid retrieval combining FAISS for semantic search and ChromaDB for metadata filtering",
          "Designed project-wise data isolation allowing multi-tenant knowledge bases with separate embeddings",
          "Integrated Elasticsearch for keyword-based fallback and query expansion",
          "Created evaluation framework with automatic metrics tracking (context relevance, answer faithfulness, latency)"
        ],
        challenges: [
          "Optimizing chunk size and overlap for diverse document types (technical docs vs conversational data)",
          "Balancing retrieval speed vs accuracy with hybrid search (solved with smart query routing based on query type)",
          "Managing embedding storage costs for large corpora (implemented incremental indexing and compression)",
          "Handling multi-language documents with consistent semantic understanding"
        ],
        results: [
          "Improved answer accuracy from 40-60% to 85-92% across multiple domains",
          "Reduced retrieval latency to <200ms for 10M+ document collections",
          "Enabled 50+ production RAG applications across legal, medical, and technical domains",
          "Achieved 40-50% cost reduction through optimized embedding strategies",
          "Zero-code deployment reduced implementation time from weeks to hours"
        ],
        role: "Lead AI Engineer - Architected RAG pipeline, designed chunking strategies, built evaluation framework, deployed to production"
      }
    },
    {
      title: "SmartCover & Resume Optimization AI",
      description: "ATS-optimized resume and cover letter generator automating keyword alignment and LaTeX editing. Features NER-based keyword extraction, natural-language LaTeX agent, and AI-driven cover letter generation. Reduced manual tailoring effort by 70-80% with 10-second cover letter generation.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Python", "LLMs", "NLP", "NER", "LaTeX", "CLI Automation"],
      metrics: [
        { label: "Effort Reduction", value: "70-80%" },
        { label: "Cover Letter Gen", value: "< 10 seconds" }
      ],
      links: [
        { type: "details", href: "#" },
        { type: "video", href: "/assets/SmartCover_ResumeOptimization_AI_Demo.webm" }
      ],
      category: "Document AI | Career Tech",
      video: "/assets/SmartCover_ResumeOptimization_AI_Demo.webm",
      featured: true,
      isPrivate: true,
      privateDetails: {
        problemStatement: "Job seekers spent 30-45 minutes manually tailoring resumes and writing cover letters for each application. ATS systems rejected 75% of resumes due to poor keyword matching, and LaTeX editing required technical expertise that most candidates lacked.",
        approach: [
          "Built NER-based keyword extraction engine analyzing job descriptions to identify critical skills, technologies, and requirements",
          "Developed natural-language LaTeX agent allowing users to modify resume sections using plain English commands (e.g., 'add Python to skills')",
          "Implemented AI-driven cover letter generator with role-specific templates and automatic keyword incorporation",
          "Created ATS optimization scoring system evaluating keyword density, formatting, and section structure",
          "Designed CLI tool with interactive prompts for seamless resume customization workflow"
        ],
        challenges: [
          "Accurately extracting domain-specific keywords from diverse job descriptions (ML, healthcare, finance)",
          "Translating natural language commands to precise LaTeX edits without breaking document structure",
          "Generating authentic-sounding cover letters that don't feel AI-generated (solved with few-shot prompting and human feedback loops)",
          "Handling complex LaTeX templates with custom macros and nested environments"
        ],
        results: [
          "Reduced resume tailoring time from 30-45 minutes to 5-8 minutes (70-80% reduction)",
          "Generated ATS-optimized cover letters in under 10 seconds",
          "Improved ATS pass rate from 25% to 68% through keyword optimization",
          "Enabled 200+ successful job applications with personalized materials",
          "LaTeX agent achieved 95% success rate on natural language edit commands"
        ],
        role: "AI Engineer - Designed NLP pipeline, built LaTeX agent, developed cover letter generation system, created CLI interface"
      }
    },
    {
      title: "Private MVP Portfolio",
      description: "🎯 Real AI systems. Real results. 30 minutes. Production RAG, Multi-Agent AI, NLP → built, tested, deployed. Customize for your needs or scale to enterprise SaaS. See the code. Ask the questions. Make it yours.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
      tech: ["Advanced RAG", "Multi-Agent AI", "Custom NLP", "Enterprise Solutions"],
      metrics: [
        { label: "Offering", value: "MVP → SaaS Transformation" },
        { label: "Format", value: "30-Min Live Demo" }
      ],
      links: [
        { type: "schedule", href: "https://cal.com/manikanta-ruppa-0sfuas/30min" }
      ],
      category: "Enterprise AI Solutions | Book a Demo",
      featured: false,
      isPrivate: false,
      isSpecial: true
    },
    {
      title: "HR Assist AI — Responsible ATS Screening System",
      description: "AI-powered resume screening with explainable, multi-dimensional analysis and mandatory human-in-the-loop decision making. Features context-aware evaluation across skill match, experience alignment, and competency gaps using Google Gemini with confidence scoring. No auto-rejection—recruiters stay in control.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["FastAPI", "Google Gemini", "Python", "Pydantic", "AsyncIO", "Responsible AI"],
      metrics: [
        { label: "AI Model", value: "Google Gemini 2.5 Flash" },
        { label: "Decision Model", value: "Human-in-the-Loop" }
      ],
      links: [
        { type: "details", href: "#" },
        { type: "video", href: "/assets/Demo_video.webm" }
      ],
      category: "Responsible AI | HR Tech",
      video: "/assets/Demo_video.webm",
      featured: true,
      isPrivate: true,
      privateDetails: {
        problemStatement: "Recruitment teams spent 40-60 hours weekly manually screening resumes, with 75% of candidates rejected based on keyword matching alone. ATS systems had 12-15% error rates and provided no transparency into decision-making, creating bias risks and poor candidate experience.",
        approach: [
          "Built multi-dimensional analysis system evaluating 6 weighted criteria: Skill Match (30%), Experience Alignment (25%), Impact & Outcomes (20%), Tech Stack Compatibility (15%), Role Readiness (10%), and Competency Gap Analysis",
          "Integrated Google Gemini 2.5 Flash for semantic understanding beyond keyword matching, with confidence scoring for transparency",
          "Implemented human-in-the-loop decision framework - no auto-rejections, all results require recruiter review with explainable AI rationale",
          "Designed async FastAPI backend with PDF parsing (PyPDF2), Pydantic validation, and production-grade error handling",
          "Created responsible AI guardrails: minimum confidence thresholds (0.6), bias mitigation, and fail-safe triggers for mandatory human review"
        ],
        challenges: [
          "Balancing AI automation with ethical constraints - ensuring humans remain decision-makers while providing actionable insights",
          "Achieving semantic skill matching beyond keyword overlap (solved with Gemini's context-aware analysis and transferable skill detection)",
          "Handling diverse resume formats and quality (implemented robust PDF extraction with text cleaning and format normalization)",
          "Maintaining explainability while using complex LLM reasoning (added structured output parsing with confidence scores and rationale generation)"
        ],
        results: [
          "Reduced screening time from 40-60 hours to 8-10 hours per week (85% time savings)",
          "Improved screening accuracy to 98.5% with explainable decisions and confidence scores",
          "Decreased false rejections by 23% through semantic matching vs keyword-only filtering",
          "Achieved 100% human oversight compliance - zero auto-decisions made without recruiter approval",
          "Processed 500+ resumes with transparent competency gap analysis and actionable hiring recommendations"
        ],
        role: "Lead AI Engineer - Architected responsible AI system, implemented Gemini integration, designed 6-dimensional scoring framework, built FastAPI backend, deployed production system with safety guardrails"
      }
    },
    {
      title: "DataWhiz AI — Financial Statement Analyzer",
      description: "AI-powered financial analysis engine that automates KPI extraction, year-over-year trend analysis, and forecasting from financial statements. Integrates ARIMA and Prophet models for forward-looking insights. Delivers executive-level summaries across 3-5 years of data.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["LLMs", "NLP", "ARIMA", "Prophet", "Python", "Time Series", "PostgreSQL", "Redis"],
      metrics: [
        { label: "Analysis", value: "Automated YoY Comparison" },
        { label: "Forecasting", value: "ARIMA + Prophet" }
      ],
      links: [
        { type: "details", href: "#" }
      ],
      category: "Financial AI | Document Intelligence",
      featured: false,
      isPrivate: true,
      privateDetails: {
        problemStatement: "Financial analysts spent 40-60 hours monthly on manual KPI extraction and trend analysis from financial statements. The process was error-prone and delayed strategic decision-making.",
        approach: [
          "Built LLM-powered extraction pipeline for automated KPI identification from PDFs and Excel files",
          "Implemented dual forecasting system using ARIMA for short-term and Prophet for long-term predictions",
          "Designed PostgreSQL schema with Redis caching for multi-year historical data analysis",
          "Created executive dashboard with automated YoY comparisons and anomaly detection"
        ],
        challenges: [
          "Handling inconsistent financial statement formats across different companies and years",
          "Ensuring extraction accuracy for numerical data (achieved 98.5% accuracy with validation layers)",
          "Optimizing time-series forecasting for limited historical data points"
        ],
        results: [
          "Reduced analysis time from 40-60 hours to under 2 hours (95% time savings)",
          "Improved forecast accuracy by 23% compared to manual predictions",
          "Enabled real-time anomaly detection across 50+ financial metrics",
          "Scaled to analyze 100+ companies simultaneously"
        ],
        role: "Lead AI Engineer - Designed architecture, implemented ML pipelines, deployed to production"
      }
    },
    {
      title: "Trade Finance Studio — LLM-Orchestrated Enterprise Workflow",
      description: "Multi-agent system for document classification, extraction, and compliance checks in trade finance. Designed LLM-orchestrated agent workflows with automated compliance validation.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["LLMs", "LangGraph", "MCP Tools", "Document AI", "Google ADK", "Langsmith"],
      metrics: [
        { label: "Processing Time Reduction", value: "~70%" },
        { label: "Compliance", value: "Automated Validation" }
      ],
      links: [
        { type: "details", href: "#" }
      ],
      category: "Agentic AI | Trade Finance Automation",
      featured: false,
      isPrivate: true,
      privateDetails: {
        problemStatement: "Trade finance operations required manual processing of 15+ document types (Letters of Credit, Bills of Lading, Invoices) with compliance checks taking 2-3 days per transaction. Error rates of 12-15% led to delayed shipments and financial penalties.",
        approach: [
          "Architected multi-agent system using LangGraph with specialized agents for classification, extraction, and compliance",
          "Integrated Google ADK for document understanding and MCP Tools for enterprise system connectivity",
          "Implemented state machine workflow with human-in-loop checkpoints for high-risk transactions",
          "Built compliance rule engine with real-time validation against SWIFT MT700/MT800 standards"
        ],
        challenges: [
          "Handling handwritten documents and low-quality scans (solved with OCR preprocessing and confidence scoring)",
          "Managing complex state transitions across 8-12 agent interactions per document",
          "Ensuring regulatory compliance with automated audit trails",
          "Integrating with legacy banking systems while maintaining security standards"
        ],
        results: [
          "Reduced processing time from 2-3 days to 4-6 hours (70% reduction)",
          "Decreased error rate from 12-15% to under 2%",
          "Processed 500+ transactions monthly with 99.2% accuracy",
          "Saved $450K annually in operational costs and penalty avoidance",
          "Achieved SOC 2 Type II compliance for automated workflows"
        ],
        role: "Senior AI Engineer - Architected multi-agent system, implemented LangGraph workflows, led production deployment"
      }
    },
    {
      title: "AgentOps — Slack to Jira Automation System",
      description: "Production-grade multi-agent system that converts Slack thread discussions into structured Jira tasks with built-in governance and human oversight. Features LLM-powered summarization, PII detection/redaction, policy-based approval gates, and bidirectional sync between Slack and Jira.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Python", "FastAPI", "Next.js", "Google Gemini", "MCP", "Docker"],
      metrics: [
        { label: "Architecture", value: "Multi-Agent Orchestration" },
        { label: "Governance", value: "Human-in-the-Loop Approvals" }
      ],
      links: [
        { type: "github", href: "https://github.com/manikantaruppa/agentops" }
      ],
      category: "Agentic AI | Enterprise Workflow Automation",
      featured: false,
      isPrivate: false
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "github":
        return <Github className="h-4 w-4" />;
      case "demo":
        return <ExternalLink className="h-4 w-4" />;
      case "paper":
        return <FileText className="h-4 w-4" />;
      case "docs":
        return <BookOpen className="h-4 w-4" />;
      case "case-study":
        return <ExternalLink className="h-4 w-4" />;
      case "video":
        return <Play className="h-4 w-4" />;
      case "details":
        return <FileText className="h-4 w-4" />;
      case "schedule":
        return <Calendar className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getLinkLabel = (type: string) => {
    switch (type) {
      case "github":
        return "View Code";
      case "demo":
        return "Live Demo";
      case "paper":
        return "Paper";
      case "docs":
        return "Docs";
      case "case-study":
        return "Case Study";
      case "video":
        return "Watch Demo";
      case "details":
        return "View Details";
      case "schedule":
        return "Schedule Demo";
      default:
        return "Link";
    }
  };

  return (
    <section id="projects" className="pt-12 pb-20 lg:pt-16 lg:pb-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-[92%] lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">

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
              Featured Projects
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight"
          >
            Production AI Systems
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            Enterprise-grade Generative AI and multi-agent systems delivering measurable business impact
          </motion.p>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
            >
              <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-300 h-full ${
                project.isSpecial
                  ? "border-2 border-transparent bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-purple-900/20 relative before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:via-blue-500 before:to-purple-500 before:-z-10 before:animate-pulse"
                  : "border-slate-200 dark:border-slate-700"
              }`}>
                {/* PROJECT IMAGE */}
                <div className="relative overflow-hidden group bg-slate-100 dark:bg-slate-800">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {project.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                      className="absolute top-3 left-3 bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
                    >
                      <span className="text-sm">⭐</span>
                      Featured
                    </motion.div>
                  )}

                  {project.isPrivate && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                      className="absolute top-3 left-3 bg-slate-800 dark:bg-slate-700 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
                    >
                      <Lock className="h-3 w-3" />
                      Private Repository
                    </motion.div>
                  )}

                  {project.video && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                      className="absolute top-3 right-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                    >
                      <Play className="h-3 w-3" />
                      DEMO
                    </motion.div>
                  )}

                  {project.isSpecial && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                      className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
                    >
                      <Lock className="h-3 w-3" />
                      ENTERPRISE
                    </motion.div>
                  )}
                </div>

                <CardContent className="p-5">
                  {/* CATEGORY BADGE */}
                  <Badge variant="outline" className="text-xs text-primary border-primary mb-3 font-semibold">
                    {project.category}
                  </Badge>

                  {/* TITLE */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 line-clamp-2 leading-tight">
                    {project.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <div className="mb-3.5">
                    <div className="relative">
                      <p
                        ref={(el) => {
                          if (el) descriptionRefs.current.set(index, el);
                        }}
                        className={`text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                          expandedDescriptions.has(index) ? '' : 'line-clamp-3'
                        }`}
                      >
                        {project.description}
                      </p>
                      {/* Gradient fade overlay - only show when truncated and not expanded */}
                      {truncatedDescriptions.has(index) && !expandedDescriptions.has(index) && (
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
                      )}
                    </div>
                    {/* Show toggle only if description is truncated */}
                    {(truncatedDescriptions.has(index) || expandedDescriptions.has(index)) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDescription(index);
                        }}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 hover:underline text-xs font-medium mt-1.5 transition-all duration-200"
                      >
                        {expandedDescriptions.has(index) ? (
                          <>
                            Show less
                            <ChevronUp className="h-3 w-3 transition-transform duration-200" />
                          </>
                        ) : (
                          <>
                            Show more
                            <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs px-2.5 py-0.5 bg-slate-200 dark:bg-slate-700 hover:bg-primary hover:text-white transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* METRICS */}
                  <div className="mb-4 space-y-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-start text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <span className="text-slate-600 dark:text-slate-400">{metric.label}: </span>
                          <span className="font-bold text-slate-900 dark:text-white">{metric.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, idx) => (
                      link.type === "video" ? (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          onClick={() => openVideoModal(link.href, project.title, project.category)}
                          className="flex items-center text-primary hover:text-primary/80 hover:bg-primary/10 text-xs px-3 py-1.5 h-auto"
                        >
                          {getIcon(link.type)}
                          <span className="ml-1.5">{getLinkLabel(link.type)}</span>
                        </Button>
                      ) : link.type === "details" ? (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          onClick={() => openDetailsDialog(project)}
                          className="flex items-center text-primary hover:text-primary/80 hover:bg-primary/10 text-xs px-3 py-1.5 h-auto"
                        >
                          {getIcon(link.type)}
                          <span className="ml-1.5">{getLinkLabel(link.type)}</span>
                        </Button>
                      ) : link.type === "schedule" ? (
                        <Button
                          key={idx}
                          size="sm"
                          onClick={() => {
                            // Check if it's Cal.com or Calendly
                            if (link.href.includes('cal.com')) {
                              // Open Cal.com in new tab
                              window.open(link.href, '_blank', 'noopener,noreferrer');
                            } else {
                              // Open Calendly modal
                              setCalendlyOpen(true);
                            }
                          }}
                          className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs px-4 py-2 h-auto font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                          {getIcon(link.type)}
                          <span className="ml-1.5">{getLinkLabel(link.type)}</span>
                        </Button>
                      ) : (
                        <Button key={idx} variant="ghost" size="sm" asChild>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-primary hover:text-primary/80 hover:bg-primary/10 text-xs px-3 py-1.5 h-auto"
                          >
                            {getIcon(link.type)}
                            <span className="ml-1.5">{getLinkLabel(link.type)}</span>
                          </a>
                        </Button>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GITHUB BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-8 py-6 text-base font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <a href="https://github.com/manikantaruppa" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {videoModalOpen && currentVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeVideoModal}
                className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* VIDEO CONTAINER */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto"
                  controls
                  autoPlay
                  src={currentVideo}
                >
                  Your browser does not support the video tag.
                </video>

                <div className="p-5 bg-slate-800">
                  <p className="text-white text-center font-bold text-lg">
                    {currentVideoTitle}
                  </p>
                  <p className="text-slate-400 text-center text-sm mt-1">
                    {currentVideoSubtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT DETAILS DIALOG */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold mb-2">{selectedProject.title}</DialogTitle>
                    <Badge variant="outline" className="text-xs border-primary text-primary">
                      {selectedProject.category}
                    </Badge>
                  </div>
                </div>
                <DialogDescription className="text-base leading-relaxed">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              {selectedProject.privateDetails && (
                <div className="space-y-6 mt-6">
                  {/* PROBLEM STATEMENT */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-red-500" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Problem Statement</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                      {selectedProject.privateDetails.problemStatement}
                    </p>
                  </div>

                  {/* APPROACH */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Technical Approach</h3>
                    </div>
                    <ul className="space-y-2 pl-7">
                      {selectedProject.privateDetails.approach.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CHALLENGES */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-500" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Key Challenges</h3>
                    </div>
                    <ul className="space-y-2 pl-7">
                      {selectedProject.privateDetails.challenges.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* RESULTS */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Results & Impact</h3>
                    </div>
                    <ul className="space-y-2 pl-7">
                      {selectedProject.privateDetails.results.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ROLE */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">My Role</p>
                    <p className="text-slate-900 dark:text-white font-medium">{selectedProject.privateDetails.role}</p>
                  </div>

                  {/* TECH STACK */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-3 py-1 bg-slate-200 dark:bg-slate-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* FOOTER NOTE */}
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Lock className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        <strong>Private Repository:</strong> This is proprietary work. Code and detailed documentation available upon request with NDA.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CALENDLY SCHEDULING MODAL */}
      <PopupModal
        url="https://calendly.com/manikantaruppa1999/30min?hide_gdpr_banner=1"
        onModalClose={() => setCalendlyOpen(false)}
        open={calendlyOpen}
        rootElement={document.getElementById("root")!}
        pageSettings={{
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "6366f1",
          textColor: "1e293b",
          backgroundColor: "ffffff"
        }}
      />
    </section>
  );
}
