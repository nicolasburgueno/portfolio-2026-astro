export interface Testimonial {
  name: string;
  role: { en: string; es: string };
  company: string;
  image: string;
  text: { en: string; es: string };
}

export const testimonials: Testimonial[] = [
  {
    name: 'Rans Urbina',
    role: { en: 'Operations Director', es: 'Director de Operaciones' },
    company: 'Let The World See Your Brand',
    image: '/testimonials/rans.jpg',
    text: {
      en: "I had the privilege of working with Nico during his time as our Automations Technician, and I can confidently say that he is one of those rare professionals who blends technical expertise with a clear eye for impact. Nico played a critical role in developing and implementing automations that directly transformed the way our teams operated. One of his standout achievements was creating a process that eliminated 40 hours of manual work per week for a single client—an incredible time savings that not only boosted efficiency but also allowed our staff to focus on higher-value activities. Beyond that, he engineered two-way syncs between client CRMs and our internal reporting CRM, ensuring data accuracy and removing bottlenecks that had slowed us down in the past. What impressed me most about Nico was his ability to quickly understand complex problems and architect scalable, sustainable solutions. He didn't build automations for the sake of automation—he built systems that made a measurable difference for the company and its employees. I highly recommend Nico for any role where process improvement, automation, or CRM integration is needed. He will be an asset from day one.",
      es: "Tuve el privilegio de trabajar con Nico durante su tiempo como nuestro Técnico de Automatizaciones, y puedo decir con confianza que es uno de esos raros profesionales que combina experiencia técnica con una clara visión de impacto. Nico jugó un papel crítico en el desarrollo e implementación de automatizaciones que transformaron directamente la forma en que operaban nuestros equipos. Uno de sus logros destacados fue crear un proceso que eliminó 40 horas de trabajo manual por semana para un solo cliente, un increíble ahorro de tiempo que no solo aumentó la eficiencia sino que también permitió a nuestro personal enfocarse en actividades de mayor valor. Diseñó sincronizaciones bidireccionales entre CRMs de clientes y nuestro CRM de informes interno, asegurando precisión de datos y eliminando cuellos de botella. Lo que más me impresionó de Nico fue su capacidad para comprender rápidamente problemas complejos y diseñar soluciones escalables y sostenibles. No construyó automatizaciones por el simple hecho de automatizar, construyó sistemas que hicieron una diferencia medible. Recomiendo ampliamente a Nico para cualquier rol donde se necesite mejora de procesos, automatización o integración de CRM. Será un activo desde el primer día.",
    },
  },
  {
    name: 'Brenda Pastorino Quaglia',
    role: { en: 'Automation & Workflows Director', es: 'Directora de Automatización y Flujos de Trabajo' },
    company: 'CMP',
    image: '/testimonials/bren.jpg',
    text: {
      en: "I had the pleasure of working with Nico at Henry, and it was a great experience to share a team with him. He consistently showed a highly committed attitude, a great vibe, and a strong willingness to contribute. He's the kind of teammate who makes collaboration feel effortless, probably because he combines solid technical skills with clear and friendly communication. On top of that, Nico was always willing to lend a hand when someone needed support, and that made a big difference in our daily teamwork. He brings a valuable critical eye and genuinely cares about doing things the right way. I recommend him without hesitation—he's a great professional and an even better person.",
      es: "Tuve el placer de trabajar con Nico en Henry, y fue una gran experiencia compartir equipo con él. Mostró constantemente una actitud muy comprometida, una gran vibra y una fuerte disposición a contribuir. Combina habilidades técnicas sólidas con una comunicación clara y amigable. Además, siempre estuvo dispuesto a echar una mano cuando alguien necesitaba apoyo, y eso marcó una gran diferencia en nuestro trabajo diario. Recomiendo a Nico sin dudarlo, es un gran profesional y una persona aún mejor.",
    },
  },
  {
    name: 'Thayrov García',
    role: { en: 'Software Developer', es: 'Desarrollador de Software' },
    company: 'Tech Solutions',
    image: '/testimonials/thayrov-garcia.jpg',
    text: {
      en: "Nicolás guided us through the development of the Mercadillo Cívico project in an exemplary way. He kept us motivated and clear on what the project needed in order to keep moving forward at a steady and productive pace. I'm very grateful for the opportunity to have been under his mentorship, as he helped me learn best practices when implementing several of the technologies we used, as well as improve my teamwork workflow with GitHub. I highly and confidently recommend you, because I know that any team you join will have someone reliable, skilled, and self-driven.",
      es: "Nicolás nos guió a través del desarrollo del proyecto Mercadillo Cívico de manera ejemplar. Nos mantuvo motivados y claros sobre lo que el proyecto necesitaba para seguir avanzando siempre a un ritmo constante y productivo. Estoy muy agradecido por la oportunidad de haber estado bajo su mentoría, ya que me ayudó a aprender las mejores prácticas al implementar varias de las tecnologías que usamos, así como a mejorar el flujo de trabajo de mi equipo con GitHub. ¡Muchas gracias, Nico! Te recomiendo ampliamente y con confianza, porque sé que cualquier equipo al que te unas tendrá a alguien confiable, hábil y autodidacta.",
    },
  },
  {
    name: 'María Belén Alaye',
    role: { en: 'Full Stack Developer', es: 'Desarrolladora Full Stack' },
    company: 'Innovation Labs',
    image: '/testimonials/maria-belen-alaye.jpg',
    text: {
      en: "Nicolás is not only an excellent professional but also an incredible person. I had the pleasure of working with him during my time at Henry. We spent a lot of time together working on projects, and working as a team was a great experience. He was always there to offer help and support, a true teammate in every sense of the word. He stands out for being proactive, eager to learn, and constantly willing to solve problems. He's dedicated, responsible, and deeply passionate about what he does.",
      es: "Nicolás no es solo un excelente profesional sino también una persona increíble. Tuve el placer de trabajar con él durante mi tiempo en Henry. Pasamos mucho tiempo juntos trabajando en proyectos, y trabajar en equipo fue una gran experiencia. Siempre estuvo ahí para ofrecer ayuda y apoyo, un verdadero compañero en todo el sentido de la palabra. Es proactivo, ansioso por aprender y constantemente dispuesto a resolver problemas. Es dedicado, responsable y profundamente apasionado por lo que hace.",
    },
  },
  {
    name: 'Agustina Paez',
    role: { en: 'Web Developer | Quality Engineer', es: 'Desarrolladora Web | Ingeniera de Calidad' },
    company: 'Digital Agency',
    image: '/testimonials/agustina-paez.jpg',
    text: {
      en: "Nicolás was my TA at Henry, during that learning phase he was one of the pillars I could rely on during my studies. He supported me both in technical support and emotionally. He motivated the team with different dynamics, listened to us, and could explain his technical knowledge in a way that was easy to understand so we could keep advancing. He's proactive, self-taught, and always searches for answers until he finds them. His ability to adapt to what we needed was very helpful and a great example. He's an excellent tutor, companion, and person.",
      es: "Nicolás fue mi TA en Henry, durante esa fase de aprendizaje fue uno de los pilares en los que pude confiar durante mis estudios. Me apoyó tanto en el soporte técnico como emocionalmente. Motivó al equipo con diferentes dinámicas, nos escuchó y pudo explicar sus conocimientos técnicos de una manera que fue fácil de entender para que pudiéramos seguir avanzando. Es proactivo, autodidacta y siempre busca respuestas hasta encontrarlas. Su capacidad de adaptarse a lo que necesitábamos fue muy útil y es un gran ejemplo. Es un excelente tutor, compañero y persona.",
    },
  },
  {
    name: 'Francisco Espíndola',
    role: { en: 'Full Stack Developer', es: 'Desarrollador Full Stack' },
    company: 'StartupHub',
    image: '/testimonials/fran-espindola.png',
    text: {
      en: "I had the pleasure of professionally working with Nicolás in a team where he was a key piece. He was in charge of guiding us in the daily meetings, organizing the team, and above all, always being attentive to how he could help. At the end of the project, when a bug appeared that made us crazy, he was there, helping to find the solution with patience and good vibes. More than a PM, a companion that really adds value. You're the best Nico!",
      es: "Tuve el placer de trabajar profesionalmente con Nicolás en un equipo donde él era una pieza clave. Estuvo a cargo de guiarnos en las reuniones diarias, organizar el equipo y, sobre todo, siempre estar atento a cómo podía ayudar. Al final del proyecto, cuando apareció un error que nos volvía locos, él estuvo ahí, ayudando a encontrar la solución con paciencia y buena vibra. Más que un PM, un compañero que realmente agrega valor. ¡Eres el mejor Nico!",
    },
  },
  {
    name: 'Carlos Díaz',
    role: { en: 'Blockchain Backend Developer', es: 'Desarrollador Backend Blockchain' },
    company: 'Dazlebs',
    image: '/testimonials/carlos-diaz.jpg',
    text: {
      en: "Nicolás was my mentor during the development of a web application that lasted about 1 month. He demonstrated great capacity to lead and organize the group with a clear focus on task assignment, as well as technical knowledge in front, back, and databases with the implementation of the relevant technologies. In addition to all that, he has a great talent for human relations to create connections with the development team.",
      es: "Nicolás fue mi mentor durante el desarrollo de una aplicación web que duró aproximadamente 1 mes. Demostró una gran capacidad para liderar y organizar al grupo con un enfoque claro en la asignación de tareas, así como conocimiento técnico en front, back y bases de datos con la implementación de las tecnologías relevantes. Además de eso, tiene un gran talento para las relaciones humanas para crear conexiones con el equipo de desarrollo.",
    },
  },
  {
    name: 'Agustín Choque',
    role: { en: 'Backend Developer', es: 'Desarrollador Backend' },
    company: 'Soy Henry',
    image: '/testimonials/agustin-choque.jpg',
    text: {
      en: "During the final project development at Soy Henry, I had the pleasure of having Nico as my mentor. He was always present, even outside of the agreed-upon schedule, helping us resolve doubts and not lose focus. His commitment was total. He guided us when we were excited about ideas beyond our reach, helping us prioritize and stay aligned with the objectives of each sprint—that clarity was fundamental for the project to progress well. Thanks to his technical experience and his way of guiding us, we learned a lot and managed to maintain a very solid working dynamic. In addition, his good vibes and closeness made the team solidify from the start. A great mentor and friend.",
      es: "Durante el desarrollo del proyecto final en Soy Henry, tuve el placer de tener a Nico como mi mentor. Siempre estuvo presente, incluso fuera del horario acordado, ayudándonos a resolver dudas y no perder el foco. Su compromiso fue total. Nos guió cuando estábamos emocionados con ideas fuera de nuestro alcance, ayudándonos a priorizar y mantenernos alineados con los objetivos de cada sprint. Esa claridad fue fundamental para que el proyecto progresara bien. Gracias a su experiencia técnica y su forma de guiarnos, aprendimos mucho y logramos mantener una dinámica de trabajo muy sólida. Además, su buena vibra y cercanía hicieron que el equipo se solidificara desde el inicio. Un gran mentor y amigo.",
    },
  },
];
