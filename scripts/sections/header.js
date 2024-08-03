/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const sectionName = 'header';

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
    searchButton: '.header__searchButton',
    searchWrapper: '.search__modal',
    closeButton: '.search__modal .textBanner__closeIcon',
    menuButton: '.header__contentMobileMenuButton',
    menuMobile: '.header__menuMobile',
    closeMenuButton: '.header__menuMobile .textBanner__closeIcon',
    header: '.header',
    announcementBar: '.announcementBar',
    cartDrawer: '.cartDrawer',
  };

  const addClass = () => {
    const searchWrapper = document.querySelectorAll(selectors.searchWrapper);
    searchWrapper.forEach((wrapper) => {
      wrapper.classList.add('open');
    });
  };

  const removeClass = () => {
    const searchWrapper = document.querySelectorAll(selectors.searchWrapper);
    searchWrapper.forEach((wrapper) => {
      wrapper.classList.remove('open');
    });
  };

  const hiddenState = () => {
    const menuMobile = document.querySelector(selectors.menuMobile);
    menuMobile.classList.remove('hidden');
  };

  const removeHiddenState = () => {
    const menuMobile = document.querySelector(selectors.menuMobile);
    menuMobile.classList.add('hidden');
  };

  const load = () => {
    const searchButton = document.querySelectorAll(selectors.searchButton);
    const closeButton = document.querySelectorAll(selectors.closeButton);
    const menuButton = document.querySelector(selectors.menuButton);
    const closeMenuButton = document.querySelector(selectors.closeMenuButton);
    const headerElem = document.querySelector(selectors.header);
    const announcementBar = document.querySelector(selectors.announcementBar);
    const cartDrawer = document.querySelector(selectors.cartDrawer);

    function headerScroll() {
      const announcementBarHeight = announcementBar.getBoundingClientRect().height;
      const headerHeight = headerElem.getBoundingClientRect().height;

      if (window.scrollY > announcementBarHeight) {
        headerElem.classList.add('header--scrolled');
        announcementBar.style.marginBottom = headerHeight + 'px';
        cartDrawer.style.top = headerHeight + 'px';
      } else {
        headerElem.classList.remove('header--scrolled');
        announcementBar.style.marginBottom = 0 + 'px';
        cartDrawer.style.top = (headerHeight + announcementBarHeight) + 'px';
      }
    }

    window.addEventListener('scroll', () => headerScroll());

    searchButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        addClass();
      });
    });

    closeButton.forEach((close) => {
      close.addEventListener('click', () => {
        removeClass();
      });
    });

    menuButton.addEventListener('click', () => {
      hiddenState();
    });

    closeMenuButton.addEventListener('click', () => {
      removeHiddenState();
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