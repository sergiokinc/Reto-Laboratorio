// Contador de visitas
function incrementarVisitas() {
    let visitas = localStorage.getItem('visitas');
    if (visitas) {
        visitas = parseInt(visitas) + 1;  // Incrementa el contador de visitas
    } else {
        visitas = 1;  // Si es la primera vez, iniciamos el contador en 1
    }
    localStorage.setItem('visitas', visitas);  // Guardamos el valor actualizado en el localStorage
    document.getElementById('contador-visitas').textContent = `Visitas: ${visitas}`;
}

// Contador de productos en el carrito
function actualizarContadorProductos() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  // Obtenemos el carrito del localStorage
    document.getElementById('contador-productos').textContent = carrito.length;  // Actualizamos el contador
}

// Llamar a las funciones al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    incrementarVisitas();
    actualizarContadorProductos();
});
