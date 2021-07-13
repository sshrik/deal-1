Element.prototype.addClass = function (className) {
  this.classList.add(className);
  return this;
};

Element.prototype.removeClass = function (className) {
  this.classList.remove(className);
  return this;
};

Element.prototype.toggleClass = function (className) {
  this.classList.toggle(className);
  return this;
};

export default {
  find: (selector) => document.querySelector(selector),
  create: (tagName) => document.createElement(tagName),
};
