/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const sectionName = 'featured-product';

if (sectionName in Shopify.theme.sections.registered) {
  const sections = document.querySelectorAll(`[data-section-type=${sectionName}]`);

  sections.forEach((section, index) => {
    if (index !== 0) {
      const linkTag = section.querySelector('link');
      const scriptTag = section.querySelector('script');

      linkTag && linkTag.remove();
      scriptTag && scriptTag.remove();
    }
  });
} else {
  const selectors = {
    section: '.featuredProduct',
    products: '.featuredProduct__products',
    sliderContainer: '.featuredProduct__products--slider',
    sliderCollections: '.featuredProduct__collections--slider',
    collectionTabs: '.featuredProduct__collection',
    productsTab: '.featuredProduct__content',
  };

  const slickSettings = {
    dots: false,
    arrows: true,
    centerMode: false,
    fade: false,
    autoplay: false,
    infinite: false,
    adaptiveHeight: false,
    slidesToShow: 1,
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
  };

  const slickCollectionSettings = {
    dots: false,
    arrows: true,
    centerMode: false,
    fade: false,
    infinite: false,
    adaptiveHeight: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: `<button class="slide-arrow prev-arrow">
                  <svg width="8" height="12" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18L5.73968 11.6904C4.81128 10.7547 4.81128 9.24532 5.73968 8.30961L12 2L10 8.74228e-07L1.69706 8.30294C0.759801 9.2402 0.759799 10.7598 1.69706 11.6971L10 20L12 18Z" fill="white"/>
                  </svg>
                </button>`,
    nextArrow: `<button class="slide-arrow next-arrow">
                  <svg width="8" height="12" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-1.12852e-06 18L6.26032 11.6904C7.18872 10.7547 7.18872 9.24532 6.26032 8.30961L-2.52728e-06 2L2 8.74228e-07L10.3029 8.30294C11.2402 9.2402 11.2402 10.7598 10.3029 11.6971L2 20L-1.12852e-06 18Z" fill="white"/>
                  </svg>
                </button>`,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const changeCollection = (element) => {
    const collectionId = element.dataset.collectionIndex;
    const productsTab = document.querySelectorAll(selectors.productsTab);
    const collectionTabs = document.querySelectorAll(selectors.collectionTabs);

    collectionTabs.forEach((el) => {
      el.classList.remove('selected');
    });
    element.classList.add('selected');

    productsTab.forEach((elem) => {
      elem.classList.add('hidden');
    });

    productsTab.forEach((content) => {
      if (content.dataset.contentIndex === collectionId) {
        const slider = content.querySelector(selectors.sliderContainer);

        content.classList.remove('hidden');
        $(slider).slick('refresh');
      }
    });
  };

  const load = () => {
    const collectionTabs = document.querySelectorAll(selectors.collectionTabs);
    const products = document.querySelector(selectors.products);
    const sliderContainer = document.querySelector(selectors.sliderContainer);

    if (window.innerWidth < 768) {
      products.classList.add('featuredProduct__products--slider');
      $(selectors.sliderContainer).slick(slickSettings);
    }

    window.addEventListener('resize', () => {
      sliderContainer.slick('resize');
    });

    $(selectors.sliderCollections).slick(slickCollectionSettings);

    collectionTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        changeCollection(tab);
      });
    });
  };

  const unload = () => {
    $(selectors.sliderContainer).slick('unslick');
    $(selectors.sliderCollections).slick('unslick');
  };

  register(sectionName, {
    async onLoad() {
      load();
    },
    onUnload() {
      unload();
    },
  });
}
