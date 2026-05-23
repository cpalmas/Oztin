/**
 * OZTIN — Asistente Escolar UVTV
 * app.js — Punto de entrada de la aplicación
 *
 * Aquí se instancian las tres capas del patrón MVC y
 * se ensambla la aplicación completa.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Instanciar el Modelo — datos y lógica de negocio
  const model = new AssistantModel();

  // 2. Instanciar la Vista — interfaz de usuario
  const view = new AssistantView();

  // 3. Instanciar el Controlador — orquestador MVC
  // El controlador recibe el modelo y la vista,
  // y conecta ambas capas sin que se conozcan entre sí.
  const controller = new AssistantController(model, view);

  // Exponer en window solo para debug en desarrollo
  if (window.location.hostname === "localhost") {
    window.__oztin = { model, view, controller };
    console.info(
      "%c🐦‍⬛ Oztin UVTV%c — Patrón MVC iniciado correctamente",
      "font-weight: bold; color: #5c6ef8;",
      "color: #9aa0c2;"
    );
  }
});
