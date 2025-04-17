document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const producto = productos.find(p => p.id === productId);
    const contenedor = document.getElementById('contenedor-detalle');

    if (producto) {
        contenedor.innerHTML = `
            <div class="col-md-6">
                <img src="imagenes/${producto.imagen.split('/').pop()}" class="img-fluid rounded" 
                     alt="${producto.nombre}" onerror="this.src='imagenes/logo.png'">
            </div>
            <div class="col-md-6">
                <h1>${producto.nombre}</h1>
                <p class="text-muted">${producto.categoria}</p>
                <p class="h2 text-primary my-4">$${producto.precio}</p>
                
                <div class="mb-4">
                    <label>Cantidad:</label>
                    <input type="number" min="1" max="${producto.stock}" 
                           value="1" class="form-control w-25" id="cantidad">
                </div>
                
                <button class="btn btn-primary btn-lg agregar-carrito" 
                        data-id="${producto.id}">
                    <i class="bi bi-cart-plus"></i> Agregar al Carrito
                </button>
                
                <div class="mt-4">
                    <h4>Descripción</h4>
                    <p>${producto.descripcion}</p>
                    ${producto.stock < 5 ? 
                        `<p class="text-danger">¡Solo ${producto.stock} disponibles!</p>` : 
                        `<p class="text-success">Disponible</p>`}
                </div>
            </div>
        `;
    } else {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3>Producto no encontrado</h3>
                <a href="productos.html" class="btn btn-primary mt-3">Volver a la tienda</a>
            </div>
        `;
    }
});