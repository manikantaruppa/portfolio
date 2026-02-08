import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Bot, Cloud, Database, Brain, Settings, Layers, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const specializationsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isSpecializationsInView = useInView(specializationsRef, { once: true, margin: "-80px" });
  const isHighlightsInView = useInView(highlightsRef, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Languages & Core ML",
      icon: <Code className="text-primary text-xl" />,
      skills: ["Python", "SQL", "Machine Learning", "Deep Learning", "NLP", "Statistical Modeling", "Feature Engineering"]
    },
    {
      title: "Generative AI & Agentic Frameworks",
      icon: <Bot className="text-primary text-xl" />,
      skills: ["LangChain", "LangGraph", "AutoGen", "CrewAI", "Prompt Engineering", "Tool Calling", "Google ADK", "Multi-Agent Orchestration"]
    },
    {
      title: "LLM Ecosystem & Training",
      icon: <Brain className="text-primary text-xl" />,
      skills: ["OpenAI", "Anthropic", "DeepSeek", "vLLM", "Ollama", "LLaMA-3", "Qwen", "Mistral", "Hugging Face", "SFT", "DPO", "QLoRA", "Multimodal LLMs"]
    },
    {
      title: "Python Libraries & CV",
      icon: <Layers className="text-primary text-xl" />,
      skills: ["NumPy", "Pandas", "Scikit-learn", "PyTorch", "TensorFlow", "OpenCV", "Regex"]
    },
    {
      title: "Databases & Vector Stores",
      icon: <Database className="text-primary text-xl" />,
      skills: ["MySQL", "MongoDB", "Elasticsearch", "Milvus", "ChromaDB", "Vector Databases", "Hybrid Search (Dense + Sparse)"]
    },
    {
      title: "Cloud, MLOps & Deployment",
      icon: <Cloud className="text-primary text-xl" />,
      skills: ["Microsoft Azure", "AWS Bedrock", "Amazon SageMaker", "ECS Fargate", "AWS Lambda", "MLflow", "MLOps", "LLMOps", "CI/CD", "Docker", "Git"]
    },
    {
      title: "Frameworks & Tools",
      icon: <Settings className="text-primary text-xl" />,
      skills: ["FastAPI", "Celery", "RAG Pipelines", "Streamlit"]
    }
  ];

  const specializations = {
    title: "Core Specializations",
    items: [
      "Agentic AI Systems (Planning, Reasoning, Tool Use)",
      "Enterprise RAG Architectures",
      "Document Intelligence & PDF AI",
      "Text-to-SQL & Knowledge Agents",
      "Scalable LLM Inference & Cost Optimization"
    ]
  };

  const getSkillColor = (skill: string, index: number) => {
    const colors = [
      "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
      "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
      "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200",
      "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200",
      "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200",
      "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="skills" className="pt-12 pb-20 lg:pt-16 lg:pb-24 bg-white dark:bg-slate-950">
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
              Technical Arsenal
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight"
          >
            Skills & Expertise
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            A production-focused toolkit spanning Generative AI, agentic systems, LLM training, and deployment.
          </motion.p>
        </div>

        {/* Main Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.03, y: -6, transition: { duration: 0.2 } }}
            >
              <Card className="bg-slate-50 dark:bg-slate-800 hover:shadow-2xl transition-all duration-300 h-full border-slate-200 dark:border-slate-700 group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 ml-3">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: 0.3,
                          delay: skillIndex * 0.03,
                          ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        <Badge
                          className={`text-xs ${getSkillColor(skill, skillIndex)} cursor-default`}
                          variant="secondary"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Core Specializations Section */}
        <motion.div
          ref={specializationsRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isSpecializationsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/20 hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-8">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={isSpecializationsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center"
              >
                {specializations.title}
              </motion.h3>
              <div className="grid md:grid-cols-2 gap-4">
                {specializations.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={isSpecializationsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.03, x: index % 2 === 0 ? 5 : -5 }}
                    className="flex items-start bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-default"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={isSpecializationsInView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.4 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="text-primary text-2xl mr-3 font-bold"
                    >
                      •
                    </motion.span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technology Stack Highlights */}
        <div ref={highlightsRef} className="mt-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHighlightsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider font-semibold"
          >
            Technology Stack Highlights
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "LLMs", "RAG", "LangChain", "PyTorch", "Azure", "AWS",
              "Vector DBs", "FastAPI", "Docker", "MLOps"
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isHighlightsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
              >
                <Badge className="px-4 py-2 text-sm bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200 cursor-default font-bold">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
