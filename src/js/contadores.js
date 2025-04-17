// Contador de visitas
function actualizarContadorVisitas() {
    let visitas = localStorage.getItem('visitas');
    
    if (!visitas) {
        visitas = 0;
    } else {
        visitas = parseInt(visitas);
    }
    
    visitas++;
    localStorage.setItem('visitas', visitas);
    
    const contador = document.getElementById('contador-visitas');
    if (contador) {
        contador.textContent = visitas;
    }
}

// Efecto de navbar al hacer scroll
function configurarNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    actualizarContadorVisitas();
    configurarNavbarScroll();
});