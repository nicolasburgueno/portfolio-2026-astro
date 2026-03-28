export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en' as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.stack': 'Stack',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',

    // Hero
    'hero.available': 'Available for Work',
    'hero.greeting': "Hey there! I'm Nicolas",
    'hero.tagline': 'Backend & Automation Engineer',
    'hero.description':
      'I build scalable systems, automate workflows with AI, and craft clean interfaces.',
    'hero.cta': 'More about me',
    'hero.cta.projects': 'See my work',
    'hero.download.cv': 'Download CV',

    // Section titles
    'section.projects': 'Projects: Showcasing My Journey',
    'section.stack': 'Stack: My Toolbox',
    'section.about': 'About: Who I Am',
    'section.blog': 'Blog: My Thoughts',
    'section.contact': 'Contact: Let\'s Talk',

    // About
    'about.bio': 'Bio',
    'about.experience': 'Experience',
    'about.education': 'Education',
    'about.badge': 'About Me',
    'about.title': 'Crafting Digital: Excellence',
    'about.intro': "Backend engineer, automation builder, and lifelong learner — based in Argentina.",
    'about.bio.text': "Backend & Automation Engineer with 3+ years of experience designing APIs, building integrations, and automating business workflows. I specialize in connecting CRMs, databases, and SaaS platforms using Node.js, NestJS, and automation tools (Make, n8n, Zapier). I've led 50+ development teams using SCRUM methodology and mentored 200+ junior developers in full-stack projects.",
    'about.experience.title': 'Experience: Where I\'ve Been',
    'about.education.title': 'Education: The Foundation',
    'about.values.title': 'Values: What I Believe In',
    'about.values.concepts.title': 'Concepts over Code',
    'about.values.concepts.desc': 'Understand the fundamentals before reaching for a framework. Architecture thinking always comes first.',
    'about.values.ai.title': 'AI as a Tool',
    'about.values.ai.desc': 'I am Tony Stark, AI is Jarvis. It amplifies human capability — it does not replace thought.',
    'about.values.foundations.title': 'Solid Foundations',
    'about.values.foundations.desc': 'Design patterns, clean architecture, and SOLID principles before chasing the next shiny library.',

    // Projects
    'projects.all': 'All Projects',
    'projects.featured': 'Featured',
    'projects.view': 'View Project',
    'projects.github': 'GitHub',
    'projects.live': 'Live Demo',

    // Contact
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message →',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent! I\'ll get back to you soon.',
    'contact.error': 'Something went wrong. Try again.',
    'contact.heading': "Let's work",
    'contact.heading.accent': 'together',
    'contact.intro': "Have a project in mind or want to discuss an opportunity? I'm currently available for new projects and full-time roles.",
    'contact.available': 'Currently Available',
    'contact.copy': 'Copy email',
    'contact.copied': 'Copied!',
    'contact.error.name': 'Name is too short',
    'contact.error.email': 'Invalid email',
    'contact.error.subject': 'Subject is too short',
    'contact.error.message': 'Message is too short (min 20 chars)',
    'contact.confirm.title': 'Ready to send?',
    'contact.confirm.subtitle': 'Review your message before it goes out.',
    'contact.confirm.to': 'To',
    'contact.confirm.subject': 'Subject',
    'contact.confirm.preview': 'Message',
    'contact.confirm.cancel': 'Go back',
    'contact.confirm.send': 'Send it →',

    // Stack page
    'stack.badge': 'Tech Stack',
    'stack.title': 'Stack: Tools of the Trade',
    'stack.subtitle': 'The technologies I trust in production — picked for their tradeoffs, not their hype.',
    'stack.stat.years.value': '5+',
    'stack.stat.years.label': 'Years Experience',
    'stack.stat.technologies.value': '30+',
    'stack.stat.technologies.label': 'Technologies',
    'stack.stat.domains.value': '3',
    'stack.stat.domains.label': 'Domains',
    'stack.stat.coffee.value': '∞',
    'stack.stat.coffee.label': 'Coffee Consumed',

    // Blog
    'blog.badge': 'Blog',
    'blog.title': 'Thoughts: & Tutorials',
    'blog.subtitle': 'Engineering articles, opinions, and lessons learned.',
    'blog.readMore': 'Read article →',
    'blog.backToBlog': '← Back to Blog',
    'blog.minRead': 'min read',
    'blog.originalOn': 'Originally on Medium',

    // Testimonials
    'testimonials.title': 'Testimonials: What They Say',
    'testimonials.subtitle': 'What people I\'ve worked with say',
    'testimonials.readMore': 'Read more',
    'testimonials.readLess': 'Read less',

    // Footer
    'footer.built': 'Built with Astro & ☕',
    'footer.rights': 'All rights reserved.',

    // Theme
    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Switch language',
  },
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.stack': 'Stack',
    'nav.testimonials': 'Testimonios',
    'nav.contact': 'Contacto',
    'nav.blog': 'Blog',

    // Hero
    'hero.available': 'Disponible para trabajar',
    'hero.greeting': '¡Hola! Soy Nicolas',
    'hero.tagline': 'Ingeniero Backend & Automatización',
    'hero.description':
      'Construyo sistemas escalables, automatizo flujos con IA y creo interfaces limpias.',
    'hero.cta': 'Más sobre mí',
    'hero.cta.projects': 'Ver mis proyectos',
    'hero.download.cv': 'Descargar CV',

    // Section titles
    'section.projects': 'Proyectos: Mi trayectoria',
    'section.stack': 'Stack: Mis herramientas',
    'section.about': 'Sobre mí: Quién soy',
    'section.blog': 'Blog: Mis ideas',
    'section.contact': 'Contacto: Hablemos',

    // About
    'about.bio': 'Bio',
    'about.experience': 'Experiencia',
    'about.education': 'Educación',
    'about.badge': 'Sobre mí',
    'about.title': 'Construyendo: Excelencia Digital',
    'about.intro': "Ingeniero backend, constructor de automatizaciones y aprendiz permanente — desde Argentina.",
    'about.bio.text': "Desarrollador Backend e Ingeniero de Automatización con más de 3 años de experiencia diseñando APIs, construyendo integraciones y automatizando flujos de trabajo empresariales. Especializado en conectar CRMs, bases de datos y plataformas SaaS utilizando Node.js, NestJS y herramientas de automatización (Make, n8n, Zapier). Lideré más de 50 equipos de desarrollo con metodología SCRUM y mentoreé a más de 200 desarrolladores junior.",
    'about.experience.title': 'Experiencia: Mi Trayectoria',
    'about.education.title': 'Educación: Las Bases',
    'about.values.title': 'Valores: En lo que creo',
    'about.values.concepts.title': 'Conceptos sobre Código',
    'about.values.concepts.desc': 'Entender los fundamentos antes de agarrar un framework. El pensamiento arquitectónico siempre es primero.',
    'about.values.ai.title': 'IA como Herramienta',
    'about.values.ai.desc': 'Yo soy Tony Stark, la IA es Jarvis. Amplifica la capacidad humana — no reemplaza el pensamiento.',
    'about.values.foundations.title': 'Bases Sólidas',
    'about.values.foundations.desc': 'Patrones de diseño, arquitectura limpia y principios SOLID antes de correr detrás de la próxima librería de moda.',

    // Projects
    'projects.all': 'Todos los proyectos',
    'projects.featured': 'Destacados',
    'projects.view': 'Ver proyecto',
    'projects.github': 'GitHub',
    'projects.live': 'Demo en vivo',

    // Contact
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar mensaje →',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Mensaje enviado! Te responderé pronto.',
    'contact.error': 'Algo salió mal. Intentá de nuevo.',
    'contact.heading': 'Trabajemos',
    'contact.heading.accent': 'juntos',
    'contact.intro': '¿Tenés un proyecto en mente o querés hablar de una oportunidad? Estoy disponible para nuevos proyectos y posiciones full-time.',
    'contact.available': 'Disponible ahora',
    'contact.copy': 'Copiar email',
    'contact.copied': '¡Copiado!',
    'contact.error.name': 'El nombre es muy corto',
    'contact.error.email': 'Email inválido',
    'contact.error.subject': 'El asunto es muy corto',
    'contact.error.message': 'El mensaje es muy corto (mínimo 20 caracteres)',
    'contact.confirm.title': '¿Listo para enviar?',
    'contact.confirm.subtitle': 'Revisá tu mensaje antes de enviarlo.',
    'contact.confirm.to': 'Para',
    'contact.confirm.subject': 'Asunto',
    'contact.confirm.preview': 'Mensaje',
    'contact.confirm.cancel': 'Volver',
    'contact.confirm.send': 'Enviar →',

    // Stack page
    'stack.badge': 'Tech Stack',
    'stack.title': 'Stack: Mis Herramientas',
    'stack.subtitle': 'Las tecnologías que uso en producción — elegidas por sus ventajas, no por el hype.',
    'stack.stat.years.value': '5+',
    'stack.stat.years.label': 'Años de Experiencia',
    'stack.stat.technologies.value': '30+',
    'stack.stat.technologies.label': 'Tecnologías',
    'stack.stat.domains.value': '3',
    'stack.stat.domains.label': 'Dominios',
    'stack.stat.coffee.value': '∞',
    'stack.stat.coffee.label': 'Café Consumido',

    // Blog
    'blog.badge': 'Blog',
    'blog.title': 'Ideas: y Tutoriales',
    'blog.subtitle': 'Artículos, opiniones y lecciones aprendidas.',
    'blog.readMore': 'Leer artículo →',
    'blog.backToBlog': '← Volver al Blog',
    'blog.minRead': 'min de lectura',
    'blog.originalOn': 'Publicado en Medium',

    // Testimonials
    'testimonials.title': 'Testimonios: Lo Que Dicen',
    'testimonials.subtitle': 'Lo que dicen quienes han trabajado conmigo',
    'testimonials.readMore': 'Leer más',
    'testimonials.readLess': 'Leer menos',

    // Footer
    'footer.built': 'Hecho con Astro & ☕',
    'footer.rights': 'Todos los derechos reservados.',

    // Theme
    'theme.toggle': 'Cambiar tema',
    'lang.switch': 'Cambiar idioma',
  },
} as const;

export type UIKeys = keyof (typeof ui)['en'];
