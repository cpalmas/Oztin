/**
 * OZTIN - Asistente Escolar UVTV
 * AssistantView.js — Capa de Vista (MVC)
 * Gestiona el DOM, la renderización y los eventos de la interfaz.
 */

class AssistantView {
  constructor() {
    // Referencias a elementos del DOM
    this.chatContainer = document.getElementById("chat-messages");
    this.userInput = document.getElementById("user-input");
    this.sendButton = document.getElementById("send-btn");
    this.clearButton = document.getElementById("clear-btn");
    this.quickLinksContainer = document.getElementById("quick-links");
    this.typingEl = null;

    // Callbacks registrados por el controlador
    this._sendCallback = null;
    this._clearCallback = null;

    this._bindEvents();
  }

  // ─────────────────────────────────────────
  //  Registro de callbacks desde el controlador
  // ─────────────────────────────────────────
  onUserSend(callback) {
    this._sendCallback = callback;
  }

  onClearChat(callback) {
    this._clearCallback = callback;
  }

  // ─────────────────────────────────────────
  //  Binding de eventos del DOM
  // ─────────────────────────────────────────
  _bindEvents() {
    this.sendButton.addEventListener("click", () => this._handleSend());
    this.clearButton.addEventListener("click", () => {
      if (this._clearCallback) this._clearCallback();
    });

    this.userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this._handleSend();
      }
    });

    // Auto-expandir textarea
    this.userInput.addEventListener("input", () => {
      this.userInput.style.height = "auto";
      this.userInput.style.height = Math.min(this.userInput.scrollHeight, 120) + "px";
    });
  }

  _handleSend() {
    const text = this.userInput.value.trim();
    if (!text) return;
    this.userInput.value = "";
    this.userInput.style.height = "auto";
    if (this._sendCallback) this._sendCallback(text);
  }

  // ─────────────────────────────────────────
  //  Renderizar un mensaje en el chat
  // ─────────────────────────────────────────
  renderMessage(role, content, links = []) {
    const bubble = document.createElement("div");
    bubble.classList.add("message", role === "user" ? "message--user" : "message--bot");

    // Ícono del asistente
    if (role !== "user") {
      const avatar = document.createElement("div");
      avatar.classList.add("message__avatar");
      avatar.innerHTML = `<img src="assets/oztin-avatar.svg" alt="Oztin" />`;
      bubble.appendChild(avatar);
    }

    const body = document.createElement("div");
    body.classList.add("message__body");

    // Contenido con soporte a markdown básico
    const text = document.createElement("p");
    text.classList.add("message__text");
    text.innerHTML = this._parseMarkdown(content);
    body.appendChild(text);

    // Renderizar enlaces si existen
    if (links && links.length > 0) {
      const linksEl = document.createElement("div");
      linksEl.classList.add("message__links");
      links.forEach((link) => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.classList.add("link-chip");
        a.innerHTML = `<span>${link.icon || "🔗"}</span> ${link.label}`;
        linksEl.appendChild(a);
      });
      body.appendChild(linksEl);
    }

    bubble.appendChild(body);
    this.chatContainer.appendChild(bubble);
    this._scrollToBottom();

    // Animación de entrada
    requestAnimationFrame(() => bubble.classList.add("message--visible"));
  }

  // ─────────────────────────────────────────
  //  Indicador de escritura (typing dots)
  // ─────────────────────────────────────────
  showTypingIndicator() {
    this.typingEl = document.createElement("div");
    this.typingEl.classList.add("message", "message--bot", "message--typing");
    this.typingEl.innerHTML = `
      <div class="message__avatar">
        <img src="assets/oztin-avatar.svg" alt="Oztin" />
      </div>
      <div class="message__body">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>`;
    this.chatContainer.appendChild(this.typingEl);
    this._scrollToBottom();
    requestAnimationFrame(() => this.typingEl.classList.add("message--visible"));
  }

  hideTypingIndicator() {
    if (this.typingEl) {
      this.typingEl.remove();
      this.typingEl = null;
    }
  }

  // ─────────────────────────────────────────
  //  Renderizar atajos rápidos (links institucionales)
  // ─────────────────────────────────────────
  renderQuickLinks(links) {
    if (!this.quickLinksContainer) return;
    Object.values(links).forEach((link) => {
      const btn = document.createElement("button");
      btn.classList.add("quick-link");
      btn.innerHTML = `${link.icon} <span>${link.label}</span>`;
      btn.addEventListener("click", () => {
        window.open(link.url, "_blank", "noopener,noreferrer");
      });
      this.quickLinksContainer.appendChild(btn);
    });
  }

  // ─────────────────────────────────────────
  //  Limpiar el chat
  // ─────────────────────────────────────────
  clearChat() {
    this.chatContainer.innerHTML = "";
  }

  // ─────────────────────────────────────────
  //  Utilidades
  // ─────────────────────────────────────────
  _scrollToBottom() {
    requestAnimationFrame(() => {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    });
  }

  // Parser básico de markdown a HTML
  _parseMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = AssistantView;
} else {
  window.AssistantView = AssistantView;
}
