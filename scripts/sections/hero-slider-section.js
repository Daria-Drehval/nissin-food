/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const sectionName = 'hero-slider';

if (sectionName in Shopify.theme.sections.registered) {
  const sections = document.querySelectorAll(`[data-section-type=${sectionName}]`);

  sections.forEach((section, index) => {
    if (index !== 0) {
      const linkTag = section.querySelector('link');
      const scriptTag = section.querySelector('script');

      linkTag.remove();
      scriptTag.remove();
    }
  });
} else {
  const selectors = {
    container: '.heroSlider',
  };

  const slickSettings = {
    lazyLoad: 'ondemand',
    infinite: true,
    dots: false,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    prevArrow: `<button class="slide-arrow prev-arrow">
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18L5.73968 11.6904C4.81128 10.7547 4.81128 9.24532 5.73968 8.30961L12 2L10 8.74228e-07L1.69706 8.30294C0.759801 9.2402 0.759799 10.7598 1.69706 11.6971L10 20L12 18Z" fill="white"/>
                  </svg>
                </button>`,
    nextArrow: `<button class="slide-arrow next-arrow">
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-1.12852e-06 18L6.26032 11.6904C7.18872 10.7547 7.18872 9.24532 6.26032 8.30961L-2.52728e-06 2L2 8.74228e-07L10.3029 8.30294C11.2402 9.2402 11.2402 10.7598 10.3029 11.6971L2 20L-1.12852e-06 18Z" fill="white"/>
                  </svg>
                </button>`,
  };

  const load = () => {
    $(selectors.container).slick(slickSettings);
  };

  const unload = () => {
    $(selectors.container).slick('unslick');
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
