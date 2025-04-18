// ecommerce-artesanal/src/js/carrusel.js

document.addEventListener('DOMContentLoaded', () => {
  // If you are using Bootstrap's carousel, you don't need much JavaScript here
  // Bootstrap handles the sliding functionality using data attributes.

  // Example: Basic initialization if needed (though Bootstrap's data-bs-ride="carousel" handles this)
  const productCarousel = document.getElementById('productCarousel');
  if (productCarousel) {
      // Optional: Configure carousel options if needed
      // const carousel = new bootstrap.Carousel(productCarousel, {
      //     interval: 5000, // Auto-slide every 5 seconds
      //     wrap: true // Continue sliding after the last item
      // });
  }

  // If you were implementing a custom carousel without Bootstrap,
  // this file would contain the logic for changing slides,
  // handling indicators, etc.
});