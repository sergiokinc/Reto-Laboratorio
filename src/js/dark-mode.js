/**
 * Sistema completo de modo oscuro
 * - Persistente entre recargas
 * - Compatible con Bootstrap
 * - Respeto a preferencias del sistema
 */

// Configuración inicial al cargar la página
function initDarkMode() {
    // 1. Leer preferencias
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    // 2. Aplicar modo oscuro si corresponde
    const isDark = savedMode ? savedMode === 'true' : systemPrefersDark;
    applyDarkMode(isDark);
  }
  
  // Aplicar cambios visuales
  function applyDarkMode(isDark) {
    // 1. Toggle clases
    document.body.classList.toggle('dark-mode', isDark);
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('navbar-dark', isDark);
      navbar.classList.toggle('navbar-light', !isDark);
    }
  
    // 2. Actualizar ícono
    updateIcon(isDark);
  
    // 3. Guardar preferencia
    localStorage.setItem('darkMode', isDark);
  }
  
  // Actualizar ícono del toggle
  function updateIcon(isDark) {
    const icon = document.getElementById('dark-mode-icon');
    if (icon) {
      icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  }
  
  // Evento del botón toggle
  function setupToggleButton() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        applyDarkMode(isDark);
      });
    }
  }
  
  // Escuchar cambios en preferencias del sistema
  function watchSystemPreference() {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
      if (!('darkMode' in localStorage)) {
        applyDarkMode(e.matches);
      }
    });
  }
  
  // Inicializar todo cuando la página esté lista
  window.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    setupToggleButton();
    watchSystemPreference();
  });