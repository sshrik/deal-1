const stringEllipsis = (string) => {
  if (string.length > 8) {
    return `${string.substring(0, 8)}...`;
  }
  return string;
};

export { stringEllipsis };
