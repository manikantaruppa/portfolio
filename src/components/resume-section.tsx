import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, FileText, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function ResumeSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = async () => {
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
      alert('Failed to download resume. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePreview = async () => {
    try {
      const response = await fetch('/Manikanta_Resume.pdf');
      if (!response.ok) throw new Error('Failed to fetch PDF');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setShowPreview(true);
    } catch (error) {
      alert('Failed to load PDF preview. Please try again.');
    }
  };

  const handleClosePreview = () => {
    if (pdfUrl) {
      window.URL.revokeObjectURL(pdfUrl);
    }
    setShowPreview(false);
    setPdfUrl(null);
  };

  const stats = [
    {
      value: "M.S.",
      label: "Machine Intelligence",
      sublabel: "IIITM-Kerala"
    },
    {
      value: "3.5+",
      label: "Years Experience",
      sublabel: "Data Science & ML"
    },
    {
      value: "10+",
      label: "Models Deployed",
      sublabel: "Production Systems"
    },
    {
      value: "1",
      label: "Publication",
      sublabel: "IEEE"
    }
  ];

  return (
    <section id="resume" className="pt-12 pb-20 lg:pt-16 lg:pb-24 bg-white dark:bg-slate-900">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-8">
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
              Professional Profile
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight"
          >
            Resume
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            Download my complete resume or view the embedded version below
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="mb-8 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col md:flex-row items-center justify-between mb-6"
                >
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Complete Resume
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Updated January 2026 • PDF Format
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 text-white" asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </motion.button>
                    </Button>
                    <Button variant="outline" onClick={handlePrint} asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </motion.button>
                    </Button>
                  </div>
                </motion.div>

                {/* Resume Preview Placeholder */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 pt-6 pb-12 px-2 sm:px-6 md:px-12 text-center"
                >
                  {showPreview && pdfUrl ? (
                    <div>
                      <div className="flex justify-end mb-2">
                        <Button size="sm" variant="outline" onClick={handleClosePreview}>Close Preview</Button>
                      </div>
                      <iframe
                        src={pdfUrl}
                        title="Resume PDF Preview"
                        className="mx-auto border rounded"
                        style={{ width: '100%', maxWidth: '900px', height: '800px', minHeight: '600px' }}
                      />
                    </div>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 200 }}
                      >
                        <FileText className="mx-auto text-6xl text-slate-400 mb-4" />
                      </motion.div>
                      <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Resume Preview
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        PDF preview will be displayed here in the actual implementation
                      </p>
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary/80"
                        onClick={handlePreview}
                        asChild
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Click to view full resume
                        </motion.button>
                      </Button>
                    </>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="text-center p-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + 0.1 * index,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">{stat.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">{stat.sublabel}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
