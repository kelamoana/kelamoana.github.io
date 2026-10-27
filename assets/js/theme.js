// Theme: follows the system setting until the visitor picks one with the toggle.
// Loaded in <head> so a saved choice applies before first paint.
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function current() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var initial = saved();
  if (initial === "light" || initial === "dark") root.setAttribute("data-theme", initial);

  function label(button) {
    var next = current() === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", "Switch to " + next + " mode");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    buttons.forEach(function (button) {
      label(button);
      button.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
        buttons.forEach(label);
      });
    });
  });
})();
