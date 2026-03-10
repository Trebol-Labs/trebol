export type Lang = 'en' | 'es'

export const translations = {
  en: {
    nav: {
      services: 'Services',
      work: 'Work',
      contact: 'Contact',
      startProject: 'Start a project',
    },
    hero: {
      eyebrow: 'Bogotá, Colombia · IT & Innovation Agency',
      available: 'Bogotá, Colombia · Available now',
      subtitle:
        'Trebol turns bold ideas into working technology. A young, ambitious team building software that outlasts the moment.',
      cta1: 'See our work',
      cta2: "Let's talk",
    },
    humble: {
      label: 'Where we stand',
      aside: ["We don't sell a track record.", 'We sell talent, time,', 'and full commitment.'],
      stats: [
        { val: 'Early', suffix: ' stage', desc: 'Building our story' },
        { val: 'BOG', suffix: ' based', desc: 'Latin America' },
        { val: '100', suffix: '%', desc: 'Skin in the game' },
        { val: '∞', suffix: '', desc: 'Runway of ambition' },
      ],
    },
    services: {
      label: 'What we do',
      heading1: 'OUR',
      heading2: 'CRAFT',
      subtext:
        "End-to-end technology solutions. We don't just solve problems — we redefine what's possible for you.",
      explore: 'Explore',
      items: [
        {
          name: 'Software Development',
          desc: 'Bespoke applications built for performance, scale, and longevity. From APIs to full-stack platforms.',
        },
        {
          name: 'Tech Innovation',
          desc: "AI integrations, automation, and systems that don't just follow trends — they create them.",
        },
        {
          name: 'Digital Strategy',
          desc: 'Blueprints for transformation. We map the path from where you are to where you need to be.',
        },
        {
          name: 'Systems Architecture',
          desc: 'Robust, elegant infrastructure that scales with ambition and stands the test of time.',
        },
        {
          name: 'UI/UX Engineering',
          desc: 'Interfaces that feel inevitable. Design thinking fused with precision engineering.',
        },
        {
          name: 'Consulting & R&D',
          desc: 'Deep-dive advisory for those navigating complexity and pursuing breakthrough ideas.',
        },
      ],
    },
    work: {
      label: 'Selected Work',
      heading1: 'CASE',
      heading2: 'STUDIES',
      scrollHint: 'Scroll to explore',
      cases: [
        {
          name: 'NeuralOps Platform',
          sub: 'Intelligent operations platform reducing manual workload by 70%',
        },
        {
          name: 'Vaultex Core',
          sub: 'Next-gen financial infrastructure for emerging market scale-ups',
        },
        {
          name: 'GridSense Network',
          sub: 'Real-time IoT monitoring across distributed industrial infrastructure',
        },
        {
          name: 'Meridian Suite',
          sub: 'End-to-end SaaS platform for B2B workflow automation',
        },
      ],
    },
    manifesto: {
      label: 'Our belief',
      part1: "The future doesn't wait for anyone.",
      part2: ' We are the bridge',
      part3: ' between where your idea lives today',
      part4: " and where it's meant to go.",
      part5: ' Young, ambitious,',
      part6: ' with everything still to prove —',
      part7: " and that's our greatest asset.",
    },
    contact: {
      label: 'Get in touch',
      line1: "LET'S",
      line2: 'BUILD',
      line3: 'TOGETHER',
      form: {
        nameLbl: 'Your name',
        emailLbl: 'Email address',
        messageLbl: 'What are you building?',
        namePlaceholder: 'Jane Smith',
        emailPlaceholder: 'hello@company.com',
        messagePlaceholder: 'Tell us about your idea...',
        submit: 'Send message →',
        submitting: 'Sending…',
        successLabel: 'Message received',
        successTitle: "We'll be in touch soon.",
        successBody: 'Thanks for reaching out. Expect to hear from us within 24–48 hours.',
        errorGeneric: 'Something went wrong. Please try again.',
        errorNetwork: 'Network error. Please try again.',
      },
    },
    ticker: [
      'IT Development',
      'Digital Innovation',
      'Tech Strategy',
      'Future-Forward',
      'Systems Architecture',
      'Product Design',
    ],
    footer: {
      copyright: '© 2025 Trebol Agency · Bogotá',
    },
  },

  es: {
    nav: {
      services: 'Servicios',
      work: 'Trabajo',
      contact: 'Contacto',
      startProject: 'Iniciar proyecto',
    },
    hero: {
      eyebrow: 'Bogotá, Colombia · Agencia de IT e Innovación',
      available: 'Bogotá, Colombia · Disponibles ahora',
      subtitle:
        'Trebol convierte ideas audaces en tecnología funcional. Un equipo joven y ambicioso construyendo software que trasciende el momento.',
      cta1: 'Ver nuestro trabajo',
      cta2: 'Hablemos',
    },
    humble: {
      label: 'Dónde estamos',
      aside: ['No vendemos un historial.', 'Vendemos talento, tiempo', 'y compromiso total.'],
      stats: [
        { val: 'Early', suffix: ' stage', desc: 'Escribiendo nuestra historia' },
        { val: 'BOG', suffix: ' based', desc: 'América Latina' },
        { val: '100', suffix: '%', desc: 'Todo en juego' },
        { val: '∞', suffix: '', desc: 'Ambición sin límites' },
      ],
    },
    services: {
      label: 'Qué hacemos',
      heading1: 'NUESTRO',
      heading2: 'OFICIO',
      subtext:
        'Soluciones tecnológicas de extremo a extremo. No solo resolvemos problemas — redefinimos lo posible para ti.',
      explore: 'Explorar',
      items: [
        {
          name: 'Desarrollo de Software',
          desc: 'Aplicaciones a medida para rendimiento, escala y longevidad. Desde APIs hasta plataformas full-stack.',
        },
        {
          name: 'Innovación Tecnológica',
          desc: 'Integraciones de IA, automatización y sistemas que no siguen tendencias — las crean.',
        },
        {
          name: 'Estrategia Digital',
          desc: 'Planos para la transformación. Trazamos el camino desde donde estás hasta donde necesitas llegar.',
        },
        {
          name: 'Arquitectura de Sistemas',
          desc: 'Infraestructura robusta y elegante que escala con la ambición y resiste el paso del tiempo.',
        },
        {
          name: 'Ingeniería UI/UX',
          desc: 'Interfaces que se sienten inevitables. Pensamiento de diseño fusionado con ingeniería de precisión.',
        },
        {
          name: 'Consultoría e I+D',
          desc: 'Asesoría profunda para quienes navegan la complejidad y persiguen ideas disruptivas.',
        },
      ],
    },
    work: {
      label: 'Trabajo seleccionado',
      heading1: 'CASOS',
      heading2: 'DE ESTUDIO',
      scrollHint: 'Desplaza para explorar',
      cases: [
        {
          name: 'Plataforma NeuralOps',
          sub: 'Plataforma de operaciones inteligentes que reduce la carga manual en un 70%',
        },
        {
          name: 'Vaultex Core',
          sub: 'Infraestructura financiera de nueva generación para scale-ups en mercados emergentes',
        },
        {
          name: 'Red GridSense',
          sub: 'Monitoreo IoT en tiempo real sobre infraestructura industrial distribuida',
        },
        {
          name: 'Suite Meridian',
          sub: 'Plataforma SaaS integral para la automatización de flujos de trabajo B2B',
        },
      ],
    },
    manifesto: {
      label: 'Nuestra convicción',
      part1: 'El futuro no espera a nadie.',
      part2: ' Somos el puente',
      part3: ' entre donde vive tu idea hoy',
      part4: ' y adonde está destinada a llegar.',
      part5: ' Jóvenes, ambiciosos,',
      part6: ' con todo por demostrar —',
      part7: ' y esa es nuestra mayor ventaja.',
    },
    contact: {
      label: 'Contáctanos',
      line1: 'CONSTRUYAMOS',
      line2: 'JUNTOS',
      line3: '',
      form: {
        nameLbl: 'Tu nombre',
        emailLbl: 'Correo electrónico',
        messageLbl: '¿Qué estás construyendo?',
        namePlaceholder: 'Juan Pérez',
        emailPlaceholder: 'hola@empresa.com',
        messagePlaceholder: 'Cuéntanos sobre tu idea...',
        submit: 'Enviar mensaje →',
        submitting: 'Enviando…',
        successLabel: 'Mensaje recibido',
        successTitle: 'Te contactaremos pronto.',
        successBody: 'Gracias por escribirnos. Espera nuestra respuesta en 24–48 horas.',
        errorGeneric: 'Algo salió mal. Por favor intenta de nuevo.',
        errorNetwork: 'Error de red. Por favor intenta de nuevo.',
      },
    },
    ticker: [
      'Desarrollo de IT',
      'Innovación Digital',
      'Estrategia Tech',
      'Orientados al Futuro',
      'Arquitectura de Sistemas',
      'Diseño de Producto',
    ],
    footer: {
      copyright: '© 2025 Trebol Agency · Bogotá',
    },
  },
} as const
