// ecommerce-artesanal/src/js/dark-mode.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme');

  // Apply saved theme on load
  if (currentTheme === 'dark') {
      body.classList.add('dark-mode');
      if(toggleButton) toggleButton.textContent = 'Modo Claro';
  } else {
       if(toggleButton) toggleButton.textContent = 'Modo Oscuro';
  }

  if (toggleButton) {
      toggleButton.addEventListener('click', () => {
          body.classList.toggle('dark-mode');
          let theme = 'light';
          if (body.classList.contains('dark-mode')) {
              theme = 'dark';
              toggleButton.textContent = 'Modo Claro';
          } else {
               toggleButton.textContent = 'Modo Oscuro';
          }
          localStorage.setItem('theme', theme);
      });
  }
});