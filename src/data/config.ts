export const siteConfig = {
  name: 'Nicolas Burgueño',
  role: 'Backend & Automation Engineer',
  email: 'nburgueno.dev@gmail.com',
  github: 'https://github.com/nicolasburgueno',
  linkedin: 'https://www.linkedin.com/in/nico-burgueno',
  twitter: undefined,
  location: 'Argentina',
  available: true,
  description:
    'Backend & Automation Engineer. I build scalable systems, automate workflows with AI, and craft clean interfaces.',
  cvEn: '/cv-en.pdf',
  cvEs: '/cv-es.pdf',
} as const;

export const navLinks = [
  { href: '/', labelKey: 'nav.home', icon: 'House' },
  { href: '/about', labelKey: 'nav.about', icon: 'User' },
  { href: '/projects', labelKey: 'nav.projects', icon: 'FolderKanban' },
  { href: '/stack', labelKey: 'nav.stack', icon: 'Layers' },
  { href: '/blog', labelKey: 'nav.blog', icon: 'BookOpen' },
  { href: '/contact', labelKey: 'nav.contact', icon: 'Mail' },
] as const;

export type NavLink = (typeof navLinks)[number];
