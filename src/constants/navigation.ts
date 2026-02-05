export const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Blog", id: "blog" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" }
] as const;

export type NavItem = typeof NAV_ITEMS[number];
