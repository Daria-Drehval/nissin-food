/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const sectionName = 'faq';

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
    faqTitles: '.faqSection__itemHeading',
  };

  const load = () => {
    const faqTitles = document.querySelectorAll(selectors.faqTitles);

    faqTitles.forEach((title) => {
      title.addEventListener('click', (e) => {
        const faqContent = e.currentTarget.nextElementSibling;

        if (faqContent.classList.contains('faqSection__itemText--active')) {
          faqContent.classList.remove('faqSection__itemText--active');
          faqContent.style.maxHeight = 0;
        } else {
          faqContent.classList.add('faqSection__itemText--active');
          faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
        }
      });
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
