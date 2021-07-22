const stringEllipsis = (string) => {
  if (string.length > 8) {
    return `${string.substring(0, 8)}...`;
  }
  return string;
};

const priceCommaSeperator = (value) => {
  let formatedText = '';
  let remainText = value;
  if (!value.startsWith('₩')) {
    formatedText = '₩';
  } else {
    remainText = remainText.substring(1);
  }
  formatedText += Number(remainText).toLocaleString('ko-KR');
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
  // value = ₩200,200,200 같은 숫자.
  return value
    .substring(1)
    .split(',')
    .reduce((acc, cur) => {
      return acc + cur;
    }, '');
};

const convertTime = (uploadTime) => {
  const passedTime = new Date().getTime() - uploadTime;
  let result = passedTime / 1000;
  // millsec / 1000 -> 초
  // millsec / 1000 / 60 -> 분
  // millsec / 1000 / 60 / 60 -> 시간
  // millsec / 1000 / 60 / 60 / 24 -> 일

  if (result < 60) {
    return `${parseInt(result)}초`;
  }
  result = result / 60;
  if (result < 60) {
    return `${parseInt(result)}분`;
  }
  result = result / 60;
  if (result < 24) {
    return `${parseInt(result)}시간`;
  }
  result = result / 24;
  return `${parseInt(result)}일`;
};

export {
  stringEllipsis,
  priceCommaSeperator,
  numberChecker,
  commaSerateToPrice,
  convertTime,
};
