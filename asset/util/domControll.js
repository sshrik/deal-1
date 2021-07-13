export default $ = {
  find: (selector) => document.querySelector(selector),
  create: (tagName) => document.createElement(tagName),
};
