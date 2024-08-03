import { register } from '@shopify/theme-sections';

const sectionName = 'text-banner';

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
    closeIcon: '.textBanner .textBanner__closeIcon',
    bannerContent: '.textBanner__content',
  };

  const load = () => {
    const closeIcon = document.querySelector(selectors.closeIcon);
    const bannerContent = document.querySelector(selectors.bannerContent);

    closeIcon.addEventListener('click', () => {
      bannerContent.style.display = 'none';
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
};