const stringEllipsis = (string) => {
  if (string.length > 8) {
    return `${string.substring(0, 8)}...`;
  }
  return string;
};

const priceCommaSeperator = (value) => {
  let formatedText = '';
  let remainText = value;
  if (!value.startsWith('$')) {
    formatedText = '$';
  } else {
    remainText = remainText.substring(1);
  }
  formatedText += Number(remainText).toLocaleString('en');
  return formatedText;
};

const numberChecker = (value) => {
  let numberString = '';
  for (let i = 0; i < value.length; i++) {
    if (!value[i].match(/[^0-9]/)) {
      numberString += value[i];
    }
  }
  return numberString;
};

const commaSerateToPrice = (value) => {
  // value = $200,200,200 같은 숫자.
  return value
    .substring(1)
    .split(',')
    .reduce((acc, cur) => {
      return acc + cur;
    }, '');
};

export {
  stringEllipsis,
  priceCommaSeperator,
  numberChecker,
  commaSerateToPrice,
};
