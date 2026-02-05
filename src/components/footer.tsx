import { Mail, Linkedin, Github } from "lucide-react";
import { SiKaggle, SiX } from "react-icons/si";
import { motion } from "framer-motion";

export function Footer() {
  const socialLinks = [
    {
      icon: <Linkedin className="text-xl" />,
      href: "https://www.linkedin.com/in/manikanta-ruppa-496102217",
      label: "LinkedIn"
    },
    {
      icon: <Github className="text-xl" />,
      href: "https://github.com/manikantaruppa",
      label: "GitHub"
    },
    {
      icon: <SiX className="text-xl" />,
      href: "https://x.com/Mani13672412",
      label: "X (Twitter)"
    },
    {
      icon: <SiKaggle className="text-xl" />,
      href: "https://www.kaggle.com/manikantaruppa",
      label: "Kaggle"
    },
    {
      icon: <Mail className="text-xl" />,
      href: "mailto:ruppamanikanta1999@gmail.com",
      label: "Email"
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-0"
          >
            <p className="text-lg font-semibold">Manikanta Ruppa</p>
            <p className="text-slate-400">Senior Data Scientist | GenAI Engineer | Agentic AI Specialist</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-white transition-colors duration-200"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-slate-700 mt-8 pt-8 text-center"
        >
          <p className="text-slate-400">
            © 2026 Manikanta Ruppa. All rights reserved. Made with ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
