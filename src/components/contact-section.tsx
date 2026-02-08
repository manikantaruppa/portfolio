import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Sparkles } from "lucide-react";
import { SiKaggle, SiX } from "react-icons/si";
import { getApiUrl, isProduction } from "@/lib/getApiUrl";
import { motion, useInView } from "framer-motion";

export function ContactSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trim all form data
    const trimmedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim()
    };

    // Basic validation
    if (!trimmedData.firstName || !trimmedData.lastName || !trimmedData.email || !trimmedData.subject || !trimmedData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Name validation (2-50 characters, letters and spaces only)
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(trimmedData.firstName)) {
      toast({
        title: "Validation Error",
        description: "First name must be 2-50 characters and contain only letters and spaces.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!nameRegex.test(trimmedData.lastName)) {
      toast({
        title: "Validation Error",
        description: "Last name must be 2-50 characters and contain only letters and spaces.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Subject validation (5-100 characters)
    if (trimmedData.subject.length < 5 || trimmedData.subject.length > 100) {
      toast({
        title: "Validation Error",
        description: "Subject must be between 5 and 100 characters.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Message validation (10-1000 characters)
    if (trimmedData.message.length < 10 || trimmedData.message.length > 1000) {
      toast({
        title: "Validation Error",
        description: "Message must be between 10 and 1000 characters.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Get API URL from environment configuration
      const apiUrl = getApiUrl();

      // Use different endpoint for production (Vercel) vs development (standalone backend)
      const endpoint = isProduction() ? '/api/send-email' : '/send-email';

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          first_name: trimmedData.firstName,
          last_name: trimmedData.lastName,
          email: trimmedData.email,
          subject: trimmedData.subject,
          message: trimmedData.message,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Invalid response from server");
      }

      if (response.ok && data && data.success) {
        toast({
          title: "Message Sent Successfully! 🎉",
          description: "Thank you for your message. I'll get back to you soon."
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        // Handle backend validation errors
        if (data && data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map((err: any) => {
            return `${err.path}: ${err.msg}`;
          }).join('\n');
          
          toast({
            title: "Validation Error",
            description: errorMessages,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: data?.message || `Server error: ${response.status}`,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      const environment = isProduction() ? 'production (Render)' : 'local';

      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast({
          title: "Connection Error",
          description: `Cannot connect to ${environment} backend. Please check if the server is running.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="text-primary text-xl" />,
      label: "Email",
      value: "ruppamanikanta1999@gmail.com",
      href: "mailto:ruppamanikanta1999@gmail.com"
    },
    {
      icon: <Phone className="text-primary text-xl" />,
      label: "Phone",
      value: "+91 9849637595",
      href: "tel:+919849637595"
    },
    {
      icon: <MapPin className="text-primary text-xl" />,
      label: "Location",
      value: "Hyderabad, Telangana, India",
      href: null
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="text-blue-600 text-2xl" />,
      href: "https://www.linkedin.com/in/manikanta-ruppa-496102217",
      bgColor: "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40"
    },
    {
      name: "GitHub",
      icon: <Github className="text-slate-900 dark:text-slate-100 text-2xl" />,
      href: "https://github.com/manikantaruppa",
      bgColor: "bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600"
    },
    {
      name: "X (Twitter)",
      icon: <SiX className="text-slate-900 dark:text-slate-100 text-2xl" />,
      href: "https://x.com/Mani13672412",
      bgColor: "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
    },
    {
      name: "Kaggle",
      icon: <SiKaggle className="text-cyan-500 text-2xl" />,
      href: "https://www.kaggle.com/manikantaruppa",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40"
    }
  ];

  return (
    <section id="contact" className="pt-12 pb-20 lg:pt-16 lg:pb-24 bg-slate-50 dark:bg-slate-950">
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
              Let's Connect
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            Let's talk about GenAI systems, agentic architectures, or AI product ideas
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6"
                >
                  Send a Message
                </motion.h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="grid sm:grid-cols-2 gap-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        minLength={2}
                        maxLength={50}
                        required
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                      <p className="text-xs text-slate-500">2-50 characters, letters only</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        minLength={2}
                        maxLength={50}
                        required
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                      <p className="text-xs text-slate-500">2-50 characters, letters only</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@example.com"
                      required
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      minLength={5}
                      maxLength={100}
                      required
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                    <p className="text-xs text-slate-500">
                      {formData.subject.length}/100 characters (minimum 5)
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or opportunity..."
                      minLength={10}
                      maxLength={1000}
                      required
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                    <p className="text-xs text-slate-500">
                      {formData.message.length}/1000 characters (minimum 10)
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6"
                  >
                    Contact Information
                  </motion.h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center group"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="mr-4"
                        >
                          {info.icon}
                        </motion.div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors duration-200"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-slate-600 dark:text-slate-400">{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6"
                  >
                    Connect With Me
                  </motion.h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.6 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center p-4 rounded-lg transition-all duration-200 group shadow-sm hover:shadow-md ${social.bgColor}`}
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="mr-3"
                        >
                          {social.icon}
                        </motion.div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {social.name}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}