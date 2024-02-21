/* export default {
    mounted() {
      // Inizializza il carosello per ogni card
      for (let index = 0; index < 20; index++) {
        new bootstrap.Carousel(document.getElementById('carouselExampleIndicators_' + index), {
          interval: 5000,
          keyboard: true,
          pause: 'hover'
        });
      }
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    // Get the carousel element
    let carousel = document.getElementById('carouselExampleIndicators');

    // Add event listener for keydown event
    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        // Navigate to the previous slide on left arrow key
        carousel && new bootstrap.Carousel(carousel).prev();
      } else if (event.key === 'ArrowRight') {
        // Navigate to the next slide on right arrow key
        carousel && new bootstrap.Carousel(carousel).next();
      }
    });

    // Add event listeners for mousewheel and DOMMouseScroll events
    document.addEventListener('wheel', function (event) {
      if (event.deltaY > 0) {
        // Scroll down, navigate to the next slide
        carousel && new bootstrap.Carousel(carousel).next();
      } else if (event.deltaY < 0) {
        // Scroll up, navigate to the previous slide
        carousel && new bootstrap.Carousel(carousel).prev();
      }
    });
  }); */