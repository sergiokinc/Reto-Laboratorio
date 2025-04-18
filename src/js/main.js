// ecommerce-artesanal/src/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize any general page functionality here

    // Display featured products on the homepage if the container exists
    if (document.getElementById('featured-products-container')) {
        displayFeaturedProducts();
    }

    // Display all products on the products page if the container exists
    if (document.getElementById('product-list')) {
        displayAllProducts();
    }

    // Update cart count on all pages
    updateCartCount();

    // Example of a simple visit counter (simulated)
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    console.log(`Total site visits: ${visitCount}`);

    // Add event listeners for adding to cart on pages with add-to-cart buttons
    // Using event delegation for robustness
    addAddToCartListeners();
});

function displayFeaturedProducts() {
    const container = document.getElementById('featured-products-container');
    if (!container) return; // Exit if container doesn't exist

    const featured = products.filter(product => product.featured); // Assuming a 'featured' property in products.js

    container.innerHTML = ''; // Clear existing content

    featured.forEach(product => {
        // --- Rutas CORRECTAS para index.html (que está en la raíz) ---
        const imageUrl = `src/imagenes/${product.image}`; // image en productos.js ahora es solo el nombre del archivo
        const detailUrl = `src/pages/detalle-producto.html?id=${product.id}`;

        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <a href="${detailUrl}"> <!-- Link to detail page -->
                        <img src="${imageUrl}" class="card-img-top" alt="${product.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">
                             <a href="${detailUrl}">${product.name}</a> <!-- Link to detail page -->
                        </h5>
                        <p class="card-text">${product.description.substring(0, 100)}...</p>
                        <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

function displayAllProducts() {
     const container = document.getElementById('product-list');
     if (!container) return; // Exit if container doesn't exist

     container.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        // --- Rutas CORRECTAS para páginas dentro de src/pages/ ---
        const imageUrl = `../imagenes/${product.image}`; // image en productos.js ahora es solo el nombre del archivo
        const detailUrl = `detalle-producto.html?id=${product.id}`; // detail-producto.html está en la misma carpeta pages/

        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                     <a href="${detailUrl}"> <!-- Link to detail page -->
                         <img src="${imageUrl}" class="card-img-top" alt="${product.name}">
                     </a>
                    <div class="card-body">
                        <h5 class="card-title">
                             <a href="${detailUrl}">${product.name}</a> <!-- Link to detail page -->
                        </h5>
                        <p class="card-text">${product.description.substring(0, 100)}...</p>
                        <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// Using event delegation for add to cart buttons
function addAddToCartListeners() {
    // Listen for click events on the entire body
    document.body.addEventListener('click', (event) => {
        // Check if the clicked element has the 'add-to-cart-btn' class
        if (event.target.classList.contains('add-to-cart-btn')) {
             const productId = parseInt(event.target.dataset.productId);
             const product = products.find(p => p.id === productId); // Find the product to get its name
             if (product) {
                 addToCart(productId);
                 updateCartCount();
                 alert(`"${product.name}" añadido al carrito.`); // Simple feedback
             } else {
                 console.error('Product not found with ID:', productId);
             }
             // Prevent the default action if the button was a link (though not the case here)
             // event.preventDefault();
        }
    });
}

// The updateCartCount function is assumed to be in carrito.js and available globally
// Ensure carrito.js is included before main.js in your HTML files where needed.