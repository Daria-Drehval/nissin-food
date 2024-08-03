const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  stats: 'errors-only',
  entry: {
    common: ['./scripts/common.js', './styles/common.scss'],
    formatMoney: ['./scripts/format-money.js'],
    addToCart: ['./scripts/add-to-cart.js'],
    'hero-slider-section': ['./scripts/sections/hero-slider-section.js', './styles/sections/hero-slider-section.scss'],
    'annoncement-bar': ['./styles/sections/annoncement-bar.scss'],
    'text-banner': ['./scripts/sections/text-banner.js', './styles/sections/text-banner.scss'],
    'featured-product': ['./scripts/sections/featured-product.js', './styles/sections/featured-product.scss'],
    'header': ['./scripts/sections/header.js', './styles/sections/header.scss'],
    'footer': ['./styles/sections/footer.scss'],
    'product-detail': ['./scripts/sections/product-detail.js', './styles/sections/product-detail.scss'],
    'related-products': ['./scripts/sections/related-products.js', './styles/sections/related-products.scss'],
    'product-card': ['./styles/product-card.scss'],
    'size-chart': ['./styles/size-chart.scss'],
    'hero-banner': ['./styles/sections/hero-banner.scss'],
    'product-list': ['./styles/sections/product-list.scss'],
    'cart-drawer': ['./styles/cart-drawer.scss'],
    'cart': ['./styles/sections/cart.scss'],
    'related-articles': ['./scripts/sections/related-articles.js', './styles/sections/related-articles.scss'],
    'leading-products': ['./scripts/sections/leading-products.js', './styles/sections/leading-products.scss'],
    'faq': ['./scripts/sections/faq.js', './styles/sections/faq.scss'],
    map: ['./scripts/sections/map.js', './styles/sections/map.scss'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'assets'),
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
