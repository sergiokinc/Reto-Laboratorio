/**
 * Configuración completa del modo oscuro para tu e-commerce
 * Incluye: navbar, cards, textos, íconos y persistencia
 */

// Elementos del DOM que necesitan cambios específicos
const DOM_ELEMENTS = {
    navbar: '.navbar',
    navLinks: '.navbar .nav-link, .navbar .navbar-brand',
    toggleIcon: '#dark-mode-icon',
    toggler: '.navbar-toggler',
    cards: '.card, .modal-content, .dropdown-menu',
    inputs: 'input.form-control, select.form-select',
    buttons: '.btn-outline-primary'
  };
  
  // Función principal para activar/desactivar el modo oscuro
  function toggleDarkMode() {
    const body = document.body;
    const isDark = !body.classList.contains('dark-mode');
    
    // Aplicar clases al body y componentes
    body.classList.toggle('dark-mode', isDark);
    
    // Navbar: cambiar clases de Bootstrap dinámicamente
    const navbar = document.querySelector(DOM_ELEMENTS.navbar);
    if (navbar) {
      navbar.classList.toggle('navbar-light', !isDark);
      navbar.classList.toggle('navbar-dark', isDark);
    }
  
    // Actualizar ícono del botón toggle
    const icon = document.querySelector(DOM_ELEMENTS.toggleIcon);
    if (icon) {
      icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  
    // Guardar preferencia
    localStorage.setItem('darkMode', isDark);
  }
  
  // Verificar preferencias al cargar la página
  function initDarkMode() {
    // 1. Verificar localStorage
    const savedMode = localStorage.getItem('darkMode') === 'true';
    
    // 2. Verificar preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Activar modo oscuro si está guardado o si el sistema lo prefiere (y no hay configuración guardada)
    if (savedMode || (!localStorage.getItem('darkMode') && systemPrefersDark)) {
      document.body.classList.add('dark-mode');
      
      // Forzar actualización de componentes
      setTimeout(() => toggleDarkMode(), 10);
    }
  }
  
  // Event listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Inicializar
    initDarkMode();
    
    // Botón toggle
    document.getElementById('dark-mode-toggle')?.addEventListener('click', toggleDarkMode);
  });
  
  // Escuchar cambios en las preferencias del sistema (opcional)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('darkMode')) {
      toggleDarkMode();
    }
  });