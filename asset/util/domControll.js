Element.prototype.addClass = function (...className) {
  className.forEach((name) => this.classList.add(name));
  return this;
};

Element.prototype.removeClass = function (...className) {
  className.forEach((name) => this.classList.remove(name));
  return this;
};

Element.prototype.toggleClass = function (...className) {
  className.forEach((name) => this.classList.toggle(name));
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
