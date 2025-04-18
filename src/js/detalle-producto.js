// ecommerce-artesanal/src/js/detalle-producto.js

document.addEventListener('DOMContentLoaded', () => {
  // Get the product ID from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')); // Get the 'id' parameter and convert to integer

  const productDetailContainer = document.getElementById('product-detail-container');
  const loadingMessage = document.getElementById('loading-message');
  const notFoundMessage = document.getElementById('not-found-message');

  // Hide initial messages
  if (loadingMessage) loadingMessage.style.display = 'none';
  if (notFoundMessage) notFoundMessage.style.display = 'none';


  // Find the product in the products array (products array is assumed to be loaded from productos.js)
  const product = products.find(p => p.id === productId);

  if (product && productDetailContainer) {
      // Product found, display details
      // --- Ruta CORRECTA para la imagen en detalle-producto.html (desde src/pages/) ---
      // product.image ahora solo contiene el nombre del archivo (ej: "mochila2.jpg")
      const imageUrl = `../imagenes/${product.image}`;

      const productHTML = `
          <div class="col-md-6">
              <img src="${imageUrl}" class="img-fluid" alt="${product.name}">
          </div>
          <div class="col-md-6">
              <h2>${product.name}</h2>
              <p class="lead">$${product.price.toFixed(2)}</p>
              <p>${product.description}</p>
              <p><strong>Categoría:</strong> ${product.category}</p>
              <div class="d-flex align-items-center mt-4">
                   <label for="detail-quantity" class="me-2">Cantidad:</label>
                   <input type="number" id="detail-quantity" class="form-control quantity-input" value="1" min="1" style="width: 80px;">
              </div>
              <button id="add-to-cart-detail-btn" class="btn btn-primary btn-lg mt-3" data-product-id="${product.id}">Añadir al Carrito</button>
          </div>
      `;
      productDetailContainer.innerHTML = productHTML;

      // Add event listener for the 'Add to Cart' button on this page
      const addToCartBtn = document.getElementById('add-to-cart-detail-btn');
      if (addToCartBtn) {
          addToCartBtn.addEventListener('click', () => {
               const quantityInput = document.getElementById('detail-quantity');
               const quantity = parseInt(quantityInput.value);
               if (quantity > 0) {
                   // Call addToCart from carrito.js for each quantity
                   for (let i = 0; i < quantity; i++) {
                       addToCart(product.id);
                   }
                   updateCartCount();
                   alert(`${quantity} x "${product.name}" añadido(s) al carrito.`); // Simple feedback
               } else {
                    alert('La cantidad debe ser al menos 1.');
               }
          });
      }

  } else if (notFoundMessage) {
      // Product not found or container missing
      if (productDetailContainer) productDetailContainer.innerHTML = ''; // Clear content if container exists
      notFoundMessage.style.display = 'block';
  }

  // Ensure cart count is updated
  updateCartCount();
});

// We rely on carrito.js for addToCart and updateCartCount