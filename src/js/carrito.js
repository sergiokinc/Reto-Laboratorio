let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;
  
    // 1. Crear elemento animado
    const animacion = document.createElement('div');
    animacion.innerHTML = '<i class="bi bi-cart-plus"></i>';
    animacion.classList.add('animacion-carrito');
    
    // 2. Posicionar en el botón clickeado
    const boton = document.querySelector(`[data-id="${idProducto}"]`);
    const botonRect = boton.getBoundingClientRect();
    animacion.style.left = `${botonRect.left + botonRect.width/2 - 20}px`;
    animacion.style.top = `${botonRect.top}px`;
    
    // 3. Calcular destino (ícono del carrito)
    const carritoIcon = document.getElementById('cart-icon');
    const carritoRect = carritoIcon.getBoundingClientRect();
    animacion.style.setProperty('--end-x', `${carritoRect.left - botonRect.left}px`);
    animacion.style.setProperty('--end-y', `${carritoRect.top - botonRect.top}px`);
    
    document.body.appendChild(animacion);
  
    // 4. Animación en el ícono del carrito
    carritoIcon.classList.add('animate-bounce');
    setTimeout(() => {
      carritoIcon.classList.remove('animate-bounce');
    }, 500);
  
    // 5. Eliminar después de la animación
    setTimeout(() => {
      animacion.remove();
    }, 700);
  
    // 6. Lógica existente del carrito
    const productoEnCarrito = carrito.find(p => p.id === idProducto);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad = (productoEnCarrito.cantidad || 1) + 1;
    } else {
      producto.cantidad = 1;
      carrito.push(producto);
    }
    
    guardarCarrito();
    actualizarContadorCarrito();
  }

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    notificacion.style.zIndex = '1000';
    notificacion.style.transition = 'all 0.3s';
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => notificacion.remove(), 300);
    }, 2000);
}

// Función para actualizar contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        const totalItems = carrito.reduce((total, producto) => total + (producto.cantidad || 1), 0);
        contador.textContent = totalItems;
    }
}

// Función para guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

// Función para mostrar el carrito en carrito.html
function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carritoVacio = document.getElementById('carrito-vacio');
    const contenidoCarrito = document.getElementById('contenido-carrito');
    
    if (carrito.length === 0) {
        contenidoCarrito.style.display = 'none';
        carritoVacio.style.display = 'block';
    } else {
        contenidoCarrito.style.display = 'block';
        carritoVacio.style.display = 'none';
        
        listaCarrito.innerHTML = '';
        let total = 0;
        
        carrito.forEach((producto, index) => {
            const subtotal = producto.precio * (producto.cantidad || 1);
            total += subtotal;
            
            listaCarrito.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="d-flex">
                                <img src="${producto.imagen}" alt="${producto.nombre}" 
                                     class="img-thumbnail me-3" style="width: 80px; height: 80px; object-fit: cover;"
                                     onerror="this.src='imagenes/logo.png'">
                                <div>
                                    <h5 class="card-title">${producto.nombre}</h5>
                                    <p class="card-text">$${producto.precio} c/u</p>
                                </div>
                            </div>
                            <div class="text-end">
                                <div class="d-flex align-items-center mb-2">
                                    <button class="btn btn-sm btn-outline-secondary disminuir" data-index="${index}">-</button>
                                    <span class="mx-2">${producto.cantidad || 1}</span>
                                    <button class="btn btn-sm btn-outline-secondary aumentar" data-index="${index}">+</button>
                                </div>
                                <p class="mb-0 fw-bold">Subtotal: $${subtotal}</p>
                                <button class="btn btn-sm btn-danger mt-2 quitar-producto" data-index="${index}">
                                    <i class="bi bi-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        totalCarrito.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Total: $${total}</h4>
                    <button class="btn btn-success btn-lg w-100 mt-3" id="comprar">
                        <i class="bi bi-bag-check"></i> Finalizar Compra
                    </button>
                </div>
            </div>
        `;
    }
}

// Eventos para el carrito
document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
    
    // Mostrar carrito si estamos en carrito.html
    if (document.getElementById('lista-carrito')) {
        mostrarCarrito();
        
        // Evento para vaciar carrito
        document.getElementById('vaciar-carrito').addEventListener('click', function() {
            if (confirm('¿Estás seguro de vaciar el carrito?')) {
                carrito = [];
                guardarCarrito();
                mostrarCarrito();
                actualizarContadorCarrito();
            }
        });
        
        // Evento para finalizar compra
        document.addEventListener('click', function(e) {
            if (e.target.id === 'comprar') {
                alert('¡Compra realizada con éxito! Gracias por tu compra.');
                carrito = [];
                guardarCarrito();
                mostrarCarrito();
                actualizarContadorCarrito();
            }
        });
    }
});

// Eventos delegados para modificar cantidad y quitar productos
document.addEventListener('click', function(e) {
    // Aumentar cantidad
    if (e.target.classList.contains('aumentar')) {
        const index = e.target.getAttribute('data-index');
        carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
        guardarCarrito();
        mostrarCarrito();
        actualizarContadorCarrito();
        
    }
    
    // Disminuir cantidad
    if (e.target.classList.contains('disminuir')) {
        const index = e.target.getAttribute('data-index');
        if (carrito[index].cantidad > 1 || !carrito[index].cantidad) {
            carrito[index].cantidad = (carrito[index].cantidad || 2) - 1;
            guardarCarrito();
            mostrarCarrito();
            actualizarContadorCarrito();
        }
    }
    
    // Quitar producto
    if (e.target.classList.contains('quitar-producto')) {
        const index = e.target.getAttribute('data-index');
        carrito.splice(index, 1);
        guardarCarrito();
        mostrarCarrito();
        actualizarContadorCarrito();
    }
    
    // Agregar al carrito desde cualquier página
    if (e.target.classList.contains('agregar-carrito')) {
        const idProducto = parseInt(e.target.getAttribute('data-id'));
        agregarAlCarrito(idProducto);
    }
});