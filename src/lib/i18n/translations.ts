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
        'Trebol Labs turns bold ideas into working technology. Two engineers with a hunger for the cutting edge — MultiStack by nature, ambitious by design.',
      cta1: 'See our work',
      cta2: "Let's talk",
    },
    humble: {
      label: 'Where we stand',
      aside: ["We don't sell a track record.", 'We sell talent, time,', 'and full commitment.'],
      stats: [
        { val: 'Early', suffix: ' stage', desc: 'Writing our story' },
        { val: 'BOG', suffix: ' based', desc: 'Latin America & beyond' },
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
          desc: "AI integrations, automation, and a MultiStack approach — using whatever technology is most effective, not just what's familiar.",
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
          name: 'FOMAG',
          sub: 'Mobile-first PWA digitalizing health data for 890,000 Colombian teachers',
        },
        {
          name: 'OCTsense',
          sub: 'AI-powered platform diagnosing ocular pathologies from OCT scans in seconds',
        },
        {
          name: 'Routyne',
          sub: 'Premium PWA turning Markdown workout plans into interactive training sessions',
        },
      ],
    },
    manifesto: {
      label: 'Our belief',
      part1: "The future doesn't wait for anyone.",
      part2: ' We are the bridge',
      part3: ' between technology and the humans it serves.',
      part4: ' A robot and a clover:',
      part5: ' innovation without losing',
      part6: ' what makes us human —',
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
      'MultiStack',
      'Future-Forward',
      'Systems Architecture',
      'Product Design',
    ],
    footer: {
      copyright: '© 2026 Trebol Labs · Bogotá',
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
        'Trebol Labs convierte ideas audaces en tecnología funcional. Dos ingenieros con hambre por lo más avanzado — MultiStack por naturaleza, ambiciosos por convicción.',
      cta1: 'Ver nuestro trabajo',
      cta2: 'Hablemos',
    },
    humble: {
      label: 'Dónde estamos',
      aside: ['No vendemos un historial.', 'Vendemos talento, tiempo', 'y compromiso total.'],
      stats: [
        { val: 'Early', suffix: ' stage', desc: 'Escribiendo nuestra historia' },
        { val: 'BOG', suffix: ' based', desc: 'América Latina y más allá' },
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
          desc: 'Integraciones de IA, automatización y un enfoque MultiStack — usando la tecnología más efectiva, no solo la familiar.',
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
          name: 'FOMAG',
          sub: 'PWA mobile-first que digitaliza datos de salud de 890.000 docentes colombianos',
        },
        {
          name: 'OCTsense',
          sub: 'Plataforma IA que diagnostica patologías oculares desde tomografías en segundos',
        },
        {
          name: 'Routyne',
          sub: 'PWA premium que transforma rutinas en Markdown en sesiones de entrenamiento interactivas',
        },
      ],
    },
    manifesto: {
      label: 'Nuestra convicción',
      part1: 'El futuro no espera a nadie.',
      part2: ' Somos el puente',
      part3: ' entre la tecnología y los humanos a quienes sirve.',
      part4: ' Un robot y un trébol:',
      part5: ' innovación sin perder',
      part6: ' lo que nos hace humanos —',
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
      'MultiStack',
      'Orientados al Futuro',
      'Arquitectura de Sistemas',
      'Diseño de Producto',
    ],
    footer: {
      copyright: '© 2026 Trebol Labs · Bogotá',
    },
  },
} as const
