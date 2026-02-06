import React, { useMemo, useEffect, useRef } from "react";
import { GraduationCap, Rocket, Target, Award, Code2, Brain, Zap, CheckCircle2 } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

// Animated counter component
function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => {
    if (value === 3.5) {
      return `${current.toFixed(1)}+`;
    }
    return `${Math.floor(current)}+`;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

function AboutSectionComponent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isExpertiseInView = useInView(expertiseRef, { once: true, margin: "-100px" });
  const isAchievementsInView = useInView(achievementsRef, { once: true, margin: "-100px" });

  const achievements = useMemo(() => [
    { value: 3.5, label: "Years Experience", icon: Target, color: "from-blue-600 to-cyan-600" },
    { value: 10, label: "AI Systems", icon: Rocket, color: "from-purple-600 to-pink-600" },
    { value: 10, label: "POCs (85% Success)", icon: CheckCircle2, color: "from-green-600 to-emerald-600" },
    { value: 15, label: "GenAI Prototypes", icon: Award, color: "from-orange-600 to-red-600" },
  ], []);

  const expertise = useMemo(() => [
    {
      icon: Brain,
      title: "LLM Orchestration",
      skills: ["LangChain", "LangGraph", "AutoGen", "Multi-Agent Systems"]
    },
    {
      icon: Code2,
      title: "Technical Stack",
      skills: ["Python", "PyTorch", "FastAPI", "Vector DBs"]
    },
    {
      icon: Zap,
      title: "Enterprise AI",
      skills: ["RAG Systems", "Document AI", "Production MLOps"]
    }
  ], []);

  return (
    <section ref={sectionRef} id="about" className="relative py-20 lg:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-8">

        {/* SECTION HEADER */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide uppercase">
              About Me
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight"
          >
            Building AI That Delivers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            3.5+ years turning complex AI challenges into production-ready solutions
          </motion.p>
        </div>

        {/* MAIN STORY BOX */}
        <motion.div
          ref={storyRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isStoryInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="space-y-5 text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                I'm a <span className="font-bold text-slate-900 dark:text-white">Senior Data Scientist</span> specializing in{" "}
                <span className="font-bold text-primary">Generative AI, LLM orchestration, and agentic workflows</span>.
                Over the past 3.5+ years, I've built production-grade AI systems that solve real business problems.
              </p>
              <p>
                My approach is <span className="font-bold text-slate-900 dark:text-white">end-to-end</span>: from problem framing
                and architecture design to deployment, monitoring, and continuous optimization. I don't build demos—I ship{" "}
                <span className="font-bold text-slate-900 dark:text-white">enterprise-ready systems that scale</span>.
              </p>
              <p>
                I've delivered measurable impact across <span className="font-bold text-primary">finance, document processing, analytics, and decision intelligence</span>,
                always with a focus on production metrics: latency, cost, reliability, and accuracy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* TWO COLUMN LAYOUT */}
        <div ref={expertiseRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

          {/* LEFT - Core Expertise */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isExpertiseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-6"
            >
              Core Expertise
            </motion.h3>
            <div className="space-y-5">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isExpertiseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.03, x: 5, transition: { duration: 0.2 } }}
                    className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                          {item.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isExpertiseInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 + idx * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT - Education & Specializations */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={isExpertiseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-6"
            >
              Education & Focus
            </motion.h3>
            <div className="space-y-5">

              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isExpertiseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.03, x: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-primary mb-1.5 tracking-wider uppercase">
                      Master's Degree
                    </p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-tight">
                      M.S. in Computer Science
                    </p>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Machine Intelligence
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed">
                      Indian Institute of Information Technology & Management, Thiruvananthapuram
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Specializations Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isExpertiseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.03, x: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <Zap className="h-6 w-6 text-purple-600" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 tracking-wider uppercase">
                      Specializations
                    </p>
                    <div className="space-y-2.5">
                      {["Agentic AI", "RAG Systems", "Document AI", "LLM Orchestration"].map((spec, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={isExpertiseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                          className="flex items-center gap-2.5"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {spec}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* IMPACT & ACHIEVEMENTS */}
        <motion.div
          ref={achievementsRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isAchievementsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-10 lg:p-14"
        >
          {/* Decorative blur elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none opacity-50"></div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isAchievementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Impact & Achievements
              </h3>
              <p className="text-base lg:text-lg text-slate-300 max-w-3xl mx-auto">
                Measurable results from production AI systems
              </p>
            </motion.div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                    animate={isAchievementsInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.5, rotateY: 90 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.08,
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    className="group text-center"
                    style={{
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isAchievementsInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + index * 0.15,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-5"
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent mb-2.5 leading-none`}>
                        <AnimatedCounter value={achievement.value} duration={2} />
                      </div>
                      <div className="text-sm text-slate-300 font-bold">
                        {achievement.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export const AboutSection = React.memo(AboutSectionComponent);
