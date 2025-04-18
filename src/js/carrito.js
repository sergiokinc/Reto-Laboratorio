// ecommerce-artesanal/src/js/carrito.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Store the product details, including the image name
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        console.log(`${product.name} added to cart.`);
    } else {
        console.error('Product not found with ID:', productId);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    console.log(`Product with ID ${productId} removed from cart.`);
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (isNaN(item.quantity) || item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// This function needs to be globally accessible
window.updateCartCount = function() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
};

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    if (!cartItemsContainer || !cartSummary || !emptyCartMessage) {
        // Not on the cart page or missing elements
        return;
    }

    cartItemsContainer.innerHTML = '';
    let cartTotal = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cartSummary.style.display = 'block';

        cart.forEach(item => {
            // --- Ruta CORRECTA para la imagen en carrito.html (desde src/pages/) ---
            // item.image ahora solo contiene el nombre del archivo (ej: "mochila2.jpg")
            const imageUrl = `../imagenes/${item.image}`;

            const itemElement = `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${imageUrl}" class="img-fluid rounded-start" alt="${item.name}">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">Precio: $${item.price.toFixed(2)}</p>
                                <div class="d-flex align-items-center">
                                    <label for="quantity-${item.id}" class="me-2">Cantidad:</label>
                                    <input type="number" id="quantity-${item.id}" class="form-control form-control-sm quantity-input" value="${item.quantity}" min="1" style="width: 60px;" data-product-id="${item.id}">
                                    <button class="btn btn-danger btn-sm ms-3 remove-item-btn" data-product-id="${item.id}">Eliminar</button>
                                </div>
                                <p class="card-text text-end mt-2">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemElement;
            cartTotal += item.price * item.quantity;
        });

        document.getElementById('cart-total').textContent = cartTotal.toFixed(2);

        // Add event listeners for removing items and updating quantity
        // Using event delegation for robustness on the container
        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item-btn')) {
                const productId = parseInt(event.target.dataset.productId);
                removeFromCart(productId);
                updateCartCount();
                displayCartItems(); // Re-render cart after removal
            }
        });

        cartItemsContainer.addEventListener('change', (event) => {
             if (event.target.classList.contains('quantity-input')) {
                const productId = parseInt(event.target.dataset.productId);
                const newQuantity = parseInt(event.target.value);
                updateCartQuantity(productId, newQuantity);
                updateCartCount();
                displayCartItems(); // Re-render cart to reflect subtotal/total changes
             }
        });
    }
}


function clearCart() {
    cart = [];
    saveCart();
    console.log('Cart cleared.');
}