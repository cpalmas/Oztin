/**
 * OZTIN — Asistente Escolar UVTV
 * config/config.js — Configuración centralizada
 */

const OztinConfig = {
  app: {
    name: "Oztin",
    version: "1.0.0",
    university: "Universidad Virtual de Tlaxcala (UVTV)",
    mascot: "Oztin el Cuervo",
    language: "es-MX"
  },
  chat: {
    typingDelayMin: 600,    // ms mínimo antes de responder
    typingDelayMax: 1400,   // ms máximo antes de responder
    maxHistoryLength: 100,  // mensajes máximos en historial
    welcomeOnLoad: true
  },
  api: {
    // Cuando se integre IA real, configurar aquí
    baseUrl: null,
    apiKey: null,
    model: null
  },
  contact: {
    email: "servicios@uvtv.edu.mx",
    soporte: "soporte@uvtv.edu.mx",
    phone: null
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = OztinConfig;
} else {
  window.OztinConfig = OztinConfig;
}
