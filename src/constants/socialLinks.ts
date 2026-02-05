import { Linkedin, Github, Mail } from "lucide-react";
import { SiKaggle, SiX } from "react-icons/si";

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/manikanta-ruppa-496102217",
    icon: Linkedin,
    label: "LinkedIn Profile"
  },
  {
    name: "GitHub",
    url: "https://github.com/manikantaruppa",
    icon: Github,
    label: "GitHub Profile"
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/Mani13672412",
    icon: SiX,
    label: "X (Twitter) Profile"
  },
  {
    name: "Kaggle",
    url: "https://www.kaggle.com/manikantaruppa",
    icon: SiKaggle,
    label: "Kaggle Profile"
  },
  {
    name: "Email",
    url: "mailto:ruppamanikanta1999@gmail.com",
    icon: Mail,
    label: "Email Address"
  }
] as const;

export type SocialLink = typeof SOCIAL_LINKS[number];
