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

Element.prototype.addElement = function (element) {
  if (element instanceof Element) {
    this.appendChild(element);
    return this;
  }
  throw new Error('Only node can be attached');
};

export default {
  find: (selector) => document.querySelector(selector),
  create: (tagName) => document.createElement(tagName),
};
