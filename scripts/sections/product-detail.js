/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const sectionName = 'product-detail';

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
    hiddenSelect: '.productIdSelect--js',
    customSelects: '.productCustomSelect--js',
    selectShowed: '.customSelect--selected',
    selectItems: '.customSelect__item',
    slider: '.productSection__images',
    sliderNav: '.productSection__galleryNav',
    variantPrice: '.productSection__price--js',
    sliderItems: '.productSection__images .productSection__image',
    productInfo: '.productSection__contentWrapper',
    header: '.header',
    sizeButton: '.productSection__sizeChartButton',
    sizeContent: '.productSection__sizeChart',
    closeButton: '.productSection__sizeChart .textBanner__closeIcon',
    overlay: '.sizeChart__overlay',
    variantSelector: '.productSection__variant',
    customSelector: '.customSelect--selected',
    quantityForm: '.productSection__quantity',
    body: 'body',
  };

  const sliderItems = document.querySelectorAll(selectors.sliderItems);

  const slickSettings = {
    dots: false,
    arrows: false,
    slidesToShow: sliderItems.length,
    slidesToScroll: 1,
    asNavFor: '.slider-nav',
    vertical: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          infinite: true,
          slidesToShow: 1,
          vertical: false,
        },
      },
    ],
  };

  const slickSettingsNav = {
    dots: false,
    arrows: false,
    slidesToShow: sliderItems.length,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    focusOnSelect: true,
    vertical: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          infinite: true,
          vertical: false,
        },
      },
    ],
  };

  const customSelectsArray = document.querySelectorAll(selectors.customSelects);
  const variantPrice = document.querySelectorAll(selectors.variantPrice);
  const hiddenSelect = document.querySelector(selectors.hiddenSelect);
  const sizeButton = document.querySelector(selectors.sizeButton);
  const sizeContent = document.querySelector(selectors.sizeContent);
  const closeButton = document.querySelector(selectors.closeButton);
  const overlay = document.querySelector(selectors.overlay);
  const variantSelector = document.querySelector(selectors.variantSelector);
  const quantityForm = document.querySelectorAll(selectors.quantityForm);
  const body = document.querySelector(selectors.body);
  const productInfo = document.querySelector(selectors.productInfo);

  const contactSelects = (id) => {
    const hiddenSelectArray = document.querySelectorAll(selectors.hiddenSelect);

    hiddenSelectArray.forEach((element) => {
      const currentVariant = element.querySelector(`[data-variant="${id}"]`);

      if (currentVariant) {
        currentVariant.selected = true;
      }
    });

    customSelectsArray.forEach((select) => {
      const selectShowed = select.querySelector(selectors.selectShowed);
      const currentSelect = select.querySelector(`[data-id="${id}"]`);

      if (currentSelect) {
        selectShowed.innerHTML = currentSelect.innerHTML;
      }
    });
  };

  // update variant infromtaion when customer change product variant
  const variantUpdate = (select) => {
    const hiddenSelect = select.querySelector(selectors.hiddenSelect);
    const currentVariant = hiddenSelect.selectedOptions[0];
    const variantId = currentVariant.dataset.variant;

    contactSelects(variantId);
  };

  const load = () => {
    const selectItems = document.querySelectorAll(selectors.selectItems);
    selectItems.forEach((select) => {
      select.addEventListener('click', (event) => {
        const currentSelect = event.currentTarget.closest(selectors.customSelects);

        variantPrice.forEach((price) => {
          price.setAttribute('hidden', '');
          if (price.getAttribute('value') === hiddenSelect.value) {
            price.removeAttribute('hidden');
          }
        });

        quantityForm.forEach((quantity) => {
          quantity.setAttribute('hidden', '');
          if (quantity.getAttribute('data-value') === hiddenSelect.value) {
            quantity.removeAttribute('hidden');
          }
        });

        variantUpdate(currentSelect);
      });
    });

    const customSelector = document.querySelector(selectors.customSelector);

    if (customSelector) {
      customSelector.addEventListener('click', () => {
        if (variantSelector.classList.contains('open')) {
          variantSelector.classList.remove('open');
        } else {
          variantSelector.classList.add('open');
        }
      });
    }

    document.addEventListener('click', () => {
      variantSelector.classList.remove('open');
    });

    $(selectors.slider).slick(slickSettings);
    $(selectors.sliderNav).slick(slickSettingsNav);

    // size chart

    sizeButton.addEventListener('click', () => {
      sizeContent.classList.remove('hidden');
      overlay.classList.add('sizeChart__overlay--active');
      productInfo.classList.add('hide');
      body.classList.add('hide');
    });

    closeButton.addEventListener('click', () => {
      sizeContent.classList.add('hidden');
      overlay.classList.remove('sizeChart__overlay--active');
      body.style.overflow = 'visible';
      productInfo.classList.remove('hide');
      body.classList.remove('hide');
    });
  };

  const unload = () => {};

  register(sectionName, {
    async onLoad() {
      load();
    },
    onUnload() {
      unload();
    },
  });
}
