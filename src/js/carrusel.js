function inicializarCarrusel() {
    const productosDestacados = productos.filter(p => p.destacado);
    const contenedor = document.getElementById('contenedor-carrusel');
    const indicadores = document.getElementById('indicadores-carrusel');

    // Generar slides e indicadores
    productosDestacados.forEach((producto, index) => {
        // Slide
        const slide = document.createElement('div');
        slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${producto.imagen}" class="d-block w-100" alt="${producto.nombre}" 
                 onerror="this.src='imagenes/logo.png'">
            <div class="carousel-caption d-none d-md-block">
                <h5>${producto.nombre}</h5>
                <p>${producto.descripcion}</p>
                <p class="h4">$${producto.precio}</p>
                
                <a href="detalle-producto.html?id=${producto.id}" class="btn btn-primary mt-2">Ver Detalles</a>
            </div>
        `;
        contenedor.appendChild(slide);

        // Indicador
        const indicador = document.createElement('button');
        indicador.type = 'button';
        indicador.dataset.bsTarget = '#carruselDestacados';
        indicador.dataset.bsSlideTo = index;
        indicador.className = index === 0 ? 'active' : '';
        indicadores.appendChild(indicador);
    });

    // Configurar autoplay (opcional)
    const carrusel = new bootstrap.Carousel('#carruselDestacados', {
        interval: 5000, // Cambia cada 5 segundos
        ride: 'carousel',
        pause: 'hover' // Pausa al poner el mouse encima
    });
}

document.addEventListener('DOMContentLoaded', inicializarCarrusel);  
