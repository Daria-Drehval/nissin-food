window.formatMoney = function (cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }

  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || '${{amount}}';

  function defaultTo(value, defaultValue) {
    return value == null || value !== value ? defaultValue : value;
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    // precision = defaultTo(precision, 2);
    precision = defaultTo(precision, 0);
    thousands = defaultTo(thousands, ',');
    decimal = defaultTo(decimal, '.');

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    const parts = number.split('.');
    const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
    const centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
  }

  let value = '';

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_space_separator':
      value = formatWithDelimiters(cents, 2, ' ', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, ',', '.');
      break;
    case 'amount_no_decimals_with_space_separator':
      value = formatWithDelimiters(cents, 0, ' ');
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
  }

  if (formatString.indexOf('with_comma_separator') !== -1) {
    return formatString.replace(placeholderRegex, value).replace(',00', '');
  }
  return formatString.replace(placeholderRegex, value).replace('.00', '');
};
