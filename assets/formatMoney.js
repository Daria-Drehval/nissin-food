/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/*!*********************************!*\
  !*** ./scripts/format-money.js ***!
  \*********************************/
eval("window.formatMoney = function (cents, format) {\n  if (typeof cents === 'string') {\n    cents = cents.replace('.', '');\n  }\n\n  const placeholderRegex = /\\{\\{\\s*(\\w+)\\s*\\}\\}/;\n  const formatString = format || '${{amount}}';\n\n  function defaultTo(value, defaultValue) {\n    return value == null || value !== value ? defaultValue : value;\n  }\n\n  function formatWithDelimiters(number, precision, thousands, decimal) {\n    // precision = defaultTo(precision, 2);\n    precision = defaultTo(precision, 0);\n    thousands = defaultTo(thousands, ',');\n    decimal = defaultTo(decimal, '.');\n\n    if (isNaN(number) || number == null) {\n      return 0;\n    }\n\n    number = (number / 100.0).toFixed(precision);\n\n    const parts = number.split('.');\n    const dollarsAmount = parts[0].replace(/(\\d)(?=(\\d\\d\\d)+(?!\\d))/g, `$1${thousands}`);\n    const centsAmount = parts[1] ? decimal + parts[1] : '';\n\n    return dollarsAmount + centsAmount;\n  }\n\n  let value = '';\n\n  switch (formatString.match(placeholderRegex)[1]) {\n    case 'amount':\n      value = formatWithDelimiters(cents, 2);\n      break;\n    case 'amount_no_decimals':\n      value = formatWithDelimiters(cents, 0);\n      break;\n    case 'amount_with_space_separator':\n      value = formatWithDelimiters(cents, 2, ' ', ',');\n      break;\n    case 'amount_no_decimals_with_comma_separator':\n      value = formatWithDelimiters(cents, 0, ',', '.');\n      break;\n    case 'amount_no_decimals_with_space_separator':\n      value = formatWithDelimiters(cents, 0, ' ');\n      break;\n    case 'amount_with_comma_separator':\n      value = formatWithDelimiters(cents, 2, '.', ',');\n      break;\n  }\n\n  if (formatString.indexOf('with_comma_separator') !== -1) {\n    return formatString.replace(placeholderRegex, value).replace(',00', '');\n  }\n  return formatString.replace(placeholderRegex, value).replace('.00', '');\n};\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/format-money.js?");
/******/ })()
;