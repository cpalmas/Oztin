/**
 * OZTIN - Asistente Escolar UVTV
 * AssistantController.js — Capa de Controlador (MVC)
 * Orquesta la comunicación entre el Modelo y la Vista.
 */

class AssistantController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this._init();
  }

  // ─────────────────────────────────────────
  //  Inicialización
  // ─────────────────────────────────────────
  _init() {
    // Mostrar mensaje de bienvenida
    const welcome = this.model.getWelcomeMessage();
    this.view.renderMessage(welcome.role, welcome.content);

    // Escuchar el evento de envío del usuario
    this.view.onUserSend((userInput) => this.handleUserMessage(userInput));

    // Escuchar el evento de limpiar conversación
    this.view.onClearChat(() => this.handleClearChat());

    // Renderizar atajos rápidos
    const links = this.model.linksDatabase;
    this.view.renderQuickLinks(links);
  }

  // ─────────────────────────────────────────
  //  Manejo del mensaje del usuario
  // ─────────────────────────────────────────
  async handleUserMessage(userInput) {
    if (!userInput || userInput.trim() === "") return;

    // 1. Guardar y mostrar mensaje del usuario
    this.model.addMessage("user", userInput);
    this.view.renderMessage("user", userInput);

    // 2. Mostrar indicador de escritura
    this.view.showTypingIndicator();

    // 3. Simular latencia natural del asistente
    await this._delay(800 + Math.random() * 600);

    // 4. Obtener respuesta del modelo
    const response = this._generateResponse(userInput);

    // 5. Ocultar indicador y mostrar respuesta
    this.view.hideTypingIndicator();
    this.model.addMessage("assistant", response.text);
    this.view.renderMessage("assistant", response.text, response.links);
  }

  // ─────────────────────────────────────────
  //  Generación de respuesta
  // ─────────────────────────────────────────
  _generateResponse(userInput) {
    // Buscar respuesta en la base de conocimiento
    const match = this.model.findAnswer(userInput);
    const relevantLinks = this.model.getRelevantLinks(userInput);

    if (match) {
      return { text: match.answer, links: relevantLinks };
    }

    // Respuesta por defecto cuando no hay coincidencia
    const defaultResponses = [
      "Mmm, no tengo información específica sobre eso 🤔 Te recomiendo contactar directamente a **Servicios Escolares** en servicios@uvtv.edu.mx o llamar a la universidad. ¿Puedo ayudarte con algo más?",
      "Esa pregunta está fuera de mi alcance por ahora 🐦‍⬛ Pero puedo ayudarte con trámites, becas, pagos, horarios y más. ¿Qué necesitas saber?",
      "No tengo esa información disponible, pero el equipo de **Servicios Escolares** podrá orientarte. ¿Te puedo ayudar con algún otro tema escolar?"
    ];

    const randomDefault = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    return { text: randomDefault, links: [this.model.linksDatabase.portal] };
  }

  // ─────────────────────────────────────────
  //  Limpiar conversación
  // ─────────────────────────────────────────
  handleClearChat() {
    this.model.clearHistory();
    this.view.clearChat();
    const welcome = this.model.getWelcomeMessage();
    this.view.renderMessage(welcome.role, welcome.content);
  }

  // ─────────────────────────────────────────
  //  Utilidades
  // ─────────────────────────────────────────
  _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = AssistantController;
} else {
  window.AssistantController = AssistantController;
}
