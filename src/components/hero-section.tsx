import { Download, Mail, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  const handleDownloadResume = async () => {
    try {
      const response = await fetch('/Manikanta_Resume.pdf');
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Manikanta_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      const element = document.getElementById("resume");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleContactMe = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const techPills = ["LLMs", "RAG", "Agentic AI", "Document AI", "Enterprise Systems"];

  return (
    <section className="relative min-h-screen flex items-center py-12 overflow-hidden bg-white dark:bg-slate-950">
      {/* Background Elements - Subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-[92%] lg:max-w-[85%] xl:max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Welcome Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-8 mt-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-bold backdrop-blur-sm border-2 border-primary/20">
            <Sparkles className="h-4 w-4" />
            Welcome to my portfolio
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-12 items-start">

          {/* LEFT - Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col justify-between min-h-[400px] sm:min-h-[480px] lg:min-h-[560px]"
          >
            {/* Top Section */}
            <div className="space-y-6">
              {/* Main Heading */}
              <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] 2xl:text-[6rem] font-black text-slate-900 dark:text-white leading-[0.9]">
                Hi, I'm <br />
                <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Manikanta
                </span>
              </h1>

              {/* Role Title */}
              <div>
                <p className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-[2.75rem] font-bold text-slate-900 dark:text-white mb-1">
                  Senior Data Scientist
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl 2xl:text-[1.625rem] text-slate-600 dark:text-slate-400 font-semibold">
                  GenAI Engineer • Agentic AI Specialist
                </p>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg 2xl:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                Building <span className="font-bold text-slate-900 dark:text-white">production-grade AI systems</span> that solve real business problems.
                Specialized in <span className="font-bold text-primary">LLMs, RAG, and Agentic AI</span> for enterprise.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    onClick={handleContactMe}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-5 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-colors group w-full"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Get In Touch
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    onClick={handleDownloadResume}
                    variant="outline"
                    size="lg"
                    className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-5 text-base font-bold rounded-xl transition-colors w-full"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Tech Stack Pills - Bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex flex-wrap gap-2.5 pt-6"
            >
              {techPills.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.8 + index * 0.08,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-bold cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT - Photo (Clean, no background effects) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="relative lg:block hidden"
          >
            <img
              src="/assets/profile-photo.png"
              alt="Manikanta Ruppa - Senior Data Scientist"
              className="w-full h-[560px] rounded-2xl shadow-2xl object-cover object-top border-0"
              loading="eager"
              style={{ backgroundColor: 'transparent' }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800";
              }}
            />
          </motion.div>

          {/* Mobile Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:hidden"
          >
            <img
              src="/assets/profile-photo.png"
              alt="Manikanta Ruppa - Senior Data Scientist"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl object-cover border-0"
              loading="eager"
              style={{ backgroundColor: 'transparent' }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800";
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
