/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const sectionName = 'leading-products';

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
    content: '.leadingProducts__content',
    product: '.leadingProducts__item',
    sliderContainer: '.leadingProducts__content--slider',
    productImage: '.leadingProducts__image',
    productTitle: '.leadingProducts__image',
    button: '.leadingProducts__buttonDetails',
    wtbLink: '.leadingProducts__buttonBuy',
  };

  const slickSettings = {
    dots: false,
    arrows: true,
    centerMode: false,
    fade: false,
    infinite: false,
    adaptiveHeight: false,
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
  };

  const load = () => {
    const content = document.querySelector(selectors.content);
    const sliderContainer = document.querySelector(selectors.sliderContainer);

    async function drawProductSection() {
      const sectionPromiseIn = await fetch('https://nissin.node1.wfn-staging.com/wp-json/custom/v2/fan-store/');
      if (!sectionPromiseIn.ok) {
        throw new Error('Problem with the server. Try to reload the page');
      }

      const sectionContent = await sectionPromiseIn.json();

      const product = document.querySelectorAll(selectors.product);

      product.forEach((el, index) => {
        const productImage = el.querySelector(selectors.productImage);
        const productTitle = el.querySelector(selectors.productTitle);
        const button = el.querySelector(selectors.button);
        const wtbLink = el.querySelector(selectors.button);

        productImage.src = sectionContent.products[index].image;
        productTitle.innerHTML = sectionContent.products[index].title;
        button.href = sectionContent.products[index].link;
        wtbLink.href = sectionContent.products[index].wtb_link;
      });
    }

    drawProductSection();

    if (window.innerWidth < 830) {
      content.classList.add('leadingProducts__content--slider');
      $(selectors.sliderContainer).slick(slickSettings);
    }

    window.addEventListener('resize', () => {
      sliderContainer.slick('resize');
    });
  };

  const unload = () => {
    $(selectors.sliderContainer).slick('unslick');
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
