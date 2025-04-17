// Array de productos
const productos = [
    // Bolsos
    {
        id: 1,
        nombre: "Bolso Artesanal de Cuero",
        precio: 150000,
        imagen: "imagenes/bolso1.jpg",
        descripcion: "Bolso hecho a mano con cuero genuino y detalles artesanales",
        categoria: "Bolsos",
        destacado: true,
        stock: 10
    },
    {
        id: 2,
        nombre: "Bolso Tejido Tradicional",
        precio: 125000,
        imagen: "imagenes/bolso2.jpg",
        descripcion: "Bolso tejido a mano con fibras naturales",
        categoria: "Bolsos",
        destacado: false,
        stock: 15
    },
    {
        id: 3,
        nombre: "Bolso Bohemio con Bordados",
        precio: 145000,
        imagen: "imagenes/bolso3.jpg",
        descripcion: "Bolso estilo bohemio con hermosos bordados a mano",
        categoria: "Bolsos",
        destacado: true,
        stock: 8
    },

    // Mochilas
    {
        id: 4,
        nombre: "Mochila Andina",
        precio: 220000,
        imagen: "imagenes/mochila1.jpg",
        descripcion: "Mochila tradicional con diseños andinos",
        categoria: "Mochilas",
        destacado: true,
        stock: 12
    },
    {
        id: 5,
        nombre: "Mochila de Lana",
        precio: 195000,
        imagen: "imagenes/mochila2.jpg",
        descripcion: "Mochila tejida con lana de oveja 100% natural",
        categoria: "Mochilas",
        destacado: false,
        stock: 7
    },
    {
        id: 6,
        nombre: "Mochila Campesina",
        precio: 175000,
        imagen: "imagenes/mochila3.jpg",
        descripcion: "Mochila rústica ideal para el campo",
        categoria: "Mochilas",
        destacado: true,
        stock: 9
    },

    // Sombreros
    {
        id: 7,
        nombre: "Sombrero de Paja Toquilla",
        precio: 95000,
        imagen: "imagenes/sombrero1.jpg",
        descripcion: "Sombrero tejido a mano con paja toquilla",
        categoria: "Sombreros",
        destacado: true,
        stock: 20
    },
    {
        id: 8,
        nombre: "Sombrero Vaquero Artesanal",
        precio: 135000,
        imagen: "imagenes/sombrero2.jpg",
        descripcion: "Sombrero estilo vaquero hecho a mano",
        categoria: "Sombreros",
        destacado: false,
        stock: 14
    },
    {
        id: 9,
        nombre: "Sombrero de Lana",
        precio: 110000,
        imagen: "imagenes/sombrero3.jpg",
        descripcion: "Sombrero tejido con lana natural para climas fríos",
        categoria: "Sombreros",
        destacado: true,
        stock: 11
    },
    {
        id: 10,
        nombre: "Sombrero Panamá Fino",
        precio: 250000,
        imagen: "imagenes/sombrero4.jpg",
        descripcion: "Sombrero Panamá de alta calidad hecho a mano",
        categoria: "Sombreros",
        destacado: true,
        stock: 5
    },

    // Productos destacados adicionales
    {
        id: 11,
        nombre: "Set Artesanal Premium",
        precio: 320000,
        imagen: "imagenes/feature_prod_01.jpg",
        descripcion: "Set completo de productos artesanales seleccionados",
        categoria: "Sets",
        destacado: true,
        stock: 6
    },
    {
        id: 12,
        nombre: "Sombrero y Collar",
        precio: 180000,
        imagen: "imagenes/feature_prod_02.jpg",
        descripcion: "Juego de collar y pulsera hecho a mano",
        categoria: "Bisutería",
        destacado: true,
        stock: 8
    },
    {
        id: 13,
        nombre: "Manta Andina",
        precio: 275000,
        imagen: "imagenes/feature_prod_03.jpg",
        descripcion: "Manta tejida a mano con diseños tradicionales",
        categoria: "Textiles",
        destacado: true,
        stock: 4
    }
];

// Función para mostrar productos destacados en el inicio
function mostrarProductosDestacados() {
    const destacadosContainer = document.getElementById('destacados-container');
    const productosDestacados = productos.filter(p => p.destacado).slice(0, 3);
    
    destacadosContainer.innerHTML = '';
    
    productosDestacados.forEach(producto => {
        destacadosContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card card-producto h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" 
                         onerror="this.src='imagenes/logo.png'">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="text-muted">${producto.categoria}</p>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary">$${producto.precio}</span>
                            <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">
                                <i class="bi bi-cart-plus"></i> Agregar
                            </button>
                        </div>
                        ${producto.stock < 5 ? `<small class="text-danger">¡Últimas ${producto.stock} unidades!</small>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
}

// Función para mostrar todos los productos (usada en productos.html)
function mostrarTodosProductos() {
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = '';
    
    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card card-producto h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" 
                         onerror="this.src='imagenes/logo.png'">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="text-muted">Categoría: ${producto.categoria}</p>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary">$${producto.precio}</span>
                            <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">
                                <i class="bi bi-cart-plus"></i> Agregar
                            </button>
                        </div>
                        ${producto.stock < 5 ? `<small class="text-danger">¡Últimas ${producto.stock} unidades!</small>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
}

// Función para filtrar productos por categoría
function filtrarProductosPorCategoria(categoria) {
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = '';
    
    const productosFiltrados = categoria ? 
        productos.filter(p => p.categoria === categoria) : 
        productos;
    
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3>No hay productos en esta categoría</h3>
                <a href="productos.html" class="btn btn-primary mt-3">Ver todos los productos</a>
            </div>
        `;
        return;
    }
    
    productosFiltrados.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card card-producto h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" 
                         onerror="this.src='imagenes/logo.png'">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary">$${producto.precio}</span>
                            <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">
                                <i class="bi bi-cart-plus"></i> Agregar
                            </button>
                        </div>
                        ${producto.stock < 5 ? `<small class="text-danger">¡Últimas ${producto.stock} unidades!</small>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
}

// Inicializar productos destacados en el index
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('destacados-container')) {
        mostrarProductosDestacados();
    }
    
    // Para la página de productos
    if (document.getElementById('productos-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoria = urlParams.get('categoria');
        
        if (categoria) {
            document.getElementById('titulo-categoria').textContent = categoria;
            filtrarProductosPorCategoria(categoria);
        } else {
            mostrarTodosProductos();
        }
    }
});