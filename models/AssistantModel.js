/**
 * OZTIN - Asistente Escolar UVTV
 * AssistantModel.js — Capa de Modelo (MVC)
 * Gestiona datos, lógica de negocio y conocimiento base del asistente.
 */

class AssistantModel {
  constructor() {
    this.universityName = "Universidad Virtual de Tlaxcala (UVTV)";
    this.assistantName = "Oztin";
    this.conversationHistory = [];
    this.faqDatabase = this._buildFAQDatabase();
    this.linksDatabase = this._buildLinksDatabase();
  }

  // ─────────────────────────────────────────
  //  Base de conocimiento: Preguntas frecuentes
  // ─────────────────────────────────────────
  _buildFAQDatabase() {
    return [
      {
        category: "Inscripciones",
        keywords: ["inscripción", "inscribirme", "registro", "reinscripción", "periodo"],
        answer:
          "El proceso de inscripción en la UVTV se realiza en línea a través del portal estudiantil. Los periodos de inscripción se publican al inicio de cada semestre en el portal oficial. Necesitas tu número de matrícula, comprobante de pago y documentos oficiales. ¿Te gustaría el enlace directo al portal?"
      },
      {
        category: "Pagos y Aranceles",
        keywords: ["pago", "colegiatura", "arancel", "costo", "cuota", "financiero"],
        answer:
          "La UVTV ofrece diferentes modalidades de pago. Puedes realizar tus pagos en línea a través del portal de pagos o en los bancos autorizados. Para obtener tu referencia de pago, ingresa con tu matrícula al sistema. Si tienes problemas con tu pago, contacta a la caja escolar."
      },
      {
        category: "Trámites Escolares",
        keywords: ["constancia", "certificado", "kardex", "historial", "documento", "trámite"],
        answer:
          "Los trámites de documentos escolares (constancias, certificados, kardex) se solicitan en línea desde el portal estudiantil, sección 'Trámites'. El tiempo de entrega varía de 3 a 10 días hábiles dependiendo del documento. ¿Cuál trámite necesitas realizar?"
      },
      {
        category: "Becas",
        keywords: ["beca", "apoyo", "economico", "económico", "descuento", "financiamiento"],
        answer:
          "La UVTV tiene convenios con diversas instituciones para becas: PRONABES, SEP, y becas propias de la universidad. Los requisitos incluyen promedio mínimo de 8.0 y no adeudar materias. La convocatoria se publica cada semestre. ¿Quieres saber más sobre alguna beca en específico?"
      },
      {
        category: "Horarios y Clases",
        keywords: ["horario", "clase", "materia", "curso", "programa", "plan de estudios"],
        answer:
          "Los horarios y planes de estudio están disponibles en el portal académico. La UVTV opera bajo la modalidad virtual, por lo que la mayoría de clases son en línea con sesiones síncronas según el horario de tu programa. ¿En qué carrera o materia te puedo ayudar?"
      },
      {
        category: "Calificaciones",
        keywords: ["calificación", "calificaciones", "nota", "resultado", "examen", "evaluación"],
        answer:
          "Tus calificaciones están disponibles en el portal estudiantil dentro de los 10 días hábiles posteriores al cierre del período de evaluaciones. Si tienes algún inconveniente con una calificación, puedes solicitar una revisión a través del mismo portal."
      },
      {
        category: "Servicios Escolares",
        keywords: ["servicios", "servicio escolar", "ventanilla", "atencion", "atención"],
        answer:
          "El área de Servicios Escolares atiende de lunes a viernes de 9:00 AM a 5:00 PM. Puedes contactarlos por correo electrónico a servicios@uvtv.edu.mx o por teléfono al número oficial de la universidad. También atienden a través del portal en línea."
      },
      {
        category: "Tecnología y Plataformas",
        keywords: ["plataforma", "moodle", "sistema", "acceso", "contraseña", "usuario", "login"],
        answer:
          "La UVTV utiliza Moodle como plataforma de aprendizaje. Tu usuario y contraseña inicial se envían al correo con el que te registraste. Si olvidaste tu contraseña, usa la opción '¿Olvidaste tu contraseña?' en el portal o contacta a soporte técnico en soporte@uvtv.edu.mx"
      },
      {
        category: "Titulación",
        keywords: ["titulación", "titulo", "título", "tesis", "residencia", "pasantía", "egreso"],
        answer:
          "Los procesos de titulación en la UVTV incluyen: tesis, tesina, examen CENEVAL, residencia profesional, entre otros. El proceso inicia al cubrir el 100% de créditos. Contacta a tu coordinador de carrera para iniciar el proceso. ¿Te interesa información sobre alguna modalidad específica?"
      },
      {
        category: "General",
        keywords: ["hola", "ayuda", "información", "informacion", "que", "cómo", "como"],
        answer:
          "¡Hola! Soy Oztin, tu asistente escolar de la UVTV 🐦‍⬛. Puedo ayudarte con información sobre inscripciones, trámites, pagos, becas, horarios, calificaciones y mucho más. ¿En qué te puedo ayudar hoy?"
      }
    ];
  }

  // ─────────────────────────────────────────
  //  Base de datos de enlaces institucionales
  // ─────────────────────────────────────────
  _buildLinksDatabase() {
    return {
      portal: { label: "Portal Estudiantil", url: "https://portal.uvtv.edu.mx", icon: "🎓" },
      pagos: { label: "Portal de Pagos", url: "https://pagos.uvtv.edu.mx", icon: "💳" },
      moodle: { label: "Plataforma Moodle", url: "https://moodle.uvtv.edu.mx", icon: "📚" },
      tramites: { label: "Trámites Escolares", url: "https://tramites.uvtv.edu.mx", icon: "📋" },
      becas: { label: "Convocatoria Becas", url: "https://becas.uvtv.edu.mx", icon: "🏆" },
      soporte: { label: "Soporte Técnico", url: "https://soporte.uvtv.edu.mx", icon: "🔧" },
      biblioteca: { label: "Biblioteca Virtual", url: "https://biblioteca.uvtv.edu.mx", icon: "📖" },
      reglamento: { label: "Reglamento Estudiantil", url: "https://uvtv.edu.mx/reglamento", icon: "📜" }
    };
  }

  // ─────────────────────────────────────────
  //  Búsqueda de respuesta en la base de conocimiento
  // ─────────────────────────────────────────
  findAnswer(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    for (const faq of this.faqDatabase) {
      let score = 0;
      for (const keyword of faq.keywords) {
        if (lowerMsg.includes(keyword)) score++;
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    }

    return maxScore > 0 ? bestMatch : null;
  }

  // ─────────────────────────────────────────
  //  Gestión del historial de conversación
  // ─────────────────────────────────────────
  addMessage(role, content) {
    const message = {
      id: Date.now(),
      role,        // 'user' | 'assistant'
      content,
      timestamp: new Date().toISOString()
    };
    this.conversationHistory.push(message);
    return message;
  }

  getHistory() {
    return [...this.conversationHistory];
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  // ─────────────────────────────────────────
  //  Obtener enlaces relevantes según contexto
  // ─────────────────────────────────────────
  getRelevantLinks(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    const relevant = [];

    const linkMap = {
      portal:     ["portal", "estudiantil", "acceso", "login", "sistema"],
      pagos:      ["pago", "colegiatura", "cuota", "arancel"],
      moodle:     ["moodle", "plataforma", "clase", "curso", "materiales"],
      tramites:   ["trámite", "tramite", "constancia", "certificado", "kardex"],
      becas:      ["beca", "apoyo", "descuento"],
      soporte:    ["contraseña", "password", "acceso", "soporte", "técnico", "tecnico"],
      biblioteca: ["biblioteca", "libro", "investigación", "fuente"],
      reglamento: ["reglamento", "norma", "política", "politica", "regla"]
    };

    for (const [key, keywords] of Object.entries(linkMap)) {
      if (keywords.some(k => lowerMsg.includes(k))) {
        relevant.push(this.linksDatabase[key]);
      }
    }

    return relevant.slice(0, 3);
  }

  // ─────────────────────────────────────────
  //  Generar mensaje de bienvenida
  // ─────────────────────────────────────────
  getWelcomeMessage() {
    return {
      role: "assistant",
      content:
        `¡Bienvenido a la UVTV! Soy **Oztin**, tu asistente escolar personal 🐦‍⬛\n\nEstoy aquí para ayudarte con todo lo que necesites:\n\n` +
        `📋 Trámites escolares\n💰 Información de pagos\n🎓 Inscripciones y reinscripciones\n🏆 Becas disponibles\n📚 Plataformas educativas\n⭐ Y mucho más...\n\n` +
        `¡Escríbeme cualquier pregunta!`
    };
  }
}

// Exportar para uso en Node.js/módulos o como global en el navegador
if (typeof module !== "undefined" && module.exports) {
  module.exports = AssistantModel;
} else {
  window.AssistantModel = AssistantModel;
}
