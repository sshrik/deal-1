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

Element.prototype.setText = function (text) {
  this.innerText = text;
  return this;
};

Element.prototype.setHTML = function (html) {
  this.innerHTML = html;
  return this;
};

export default {
  find: (selector) => document.querySelector(selector),
  create: (tagName) => document.createElement(tagName),
};
