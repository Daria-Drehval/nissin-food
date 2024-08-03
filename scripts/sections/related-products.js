(() => {
  const selector = {
    slider: '.relatedProducts__content--slider',
    relatedSection: '.relatedProducts',
  };

  const slickSettings = {
    infinite: false,
    dots: false,
    arrows: false,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: `<button class="slide-arrow prev-arrow">
                        <svg width="8" height="14" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 18L5.73968 11.6904C4.81128 10.7547 4.81128 9.24532 5.73968 8.30961L12 2L10 8.74228e-07L1.69706 8.30294C0.759801 9.2402 0.759799 10.7598 1.69706 11.6971L10 20L12 18Z" fill="white"/>
                        </svg>
                      </button>`,
          nextArrow: `<button class="slide-arrow next-arrow">
                        <svg width="8" height="14" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M-1.12852e-06 18L6.26032 11.6904C7.18872 10.7547 7.18872 9.24532 6.26032 8.30961L-2.52728e-06 2L2 8.74228e-07L10.3029 8.30294C11.2402 9.2402 11.2402 10.7598 10.3029 11.6971L2 20L-1.12852e-06 18Z" fill="white"/>
                        </svg>
                      </button>`,
        },
      },
    ],
  };

  const relatedSection = document.querySelector(selector.relatedSection);
  class relatedProducts extends HTMLElement {
    constructor() {
      super();

      const handleIntersection = (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.unobserve(this);

        fetch(this.dataset.url)
          .then((response) => response.text())
          .then((text) => {
            const html = document.createElement('div');
            html.innerHTML = text;
            const related = html.querySelector('related-products');

            if (related && related.innerHTML.trim().length) {
              this.innerHTML = related.innerHTML;
            }

            if (!html.querySelector('.relatedProducts__content').innerHTML.trim().length) {
              relatedSection.style.display = 'none';
            }

            if (html.querySelector('.grid__item')) {
              this.classList.add('related-products--loaded');
            }

            $(selector.slider).slick(slickSettings);
          })
          .finally(() => {
            window.lozadObserver?.observe();
          })
          .catch((e) => {
            console.error(e);
          });
      };

      new IntersectionObserver(handleIntersection.bind(this), {rootMargin: '0px 0px 200px 0px'}).observe(this);
    }
  }

  customElements.define('related-products', relatedProducts);
})();
