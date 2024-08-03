/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const sectionName = 'related-articles';

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
    articlesContent: '.relatedArticles__wrapper',
    article: '.relatedArticles__item',
    articleImage: '.relatedArticles__image',
    articleTag: '.relatedArticles__itemTag',
    articleTitle: '.relatedArticles__itemTitle',
    articleData: '.relatedArticles__itemDate',
  };

  const load = () => {
    async function drawArticlesSection() {
      const sectionPromiseIn = await fetch('https://nissin.node1.wfn-staging.com/wp-json/custom/v2/fan-store/');
      if (!sectionPromiseIn.ok) {
        throw new Error('Problem with the server. Try to reload the page');
      }

      const sectionContent = await sectionPromiseIn.json();
      const article = document.querySelectorAll(selectors.article);

      article.forEach((el, index) => {
        const articleImage = el.querySelector(selectors.articleImage);
        const articleTag = el.querySelector(selectors.articleTag);
        const articleTitle = el.querySelector(selectors.articleTitle);
        const articleData = el.querySelector(selectors.articleData);

        articleImage.src = sectionContent.stories[index].image;
        articleTag.innerHTML = sectionContent.stories[index].type;
        articleTitle.innerHTML = sectionContent.stories[index].title;
        articleData.innerHTML = sectionContent.stories[index].date;
        articleTitle.href = sectionContent.stories[index].link;
      });
    }

    drawArticlesSection();
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
