export default class PageElement {
  constructor(parent) {
    this.parent = parent;
  }

  init() {
    this.contents = document.createElement();
    return this.contents;
  }

  addClass(className) {
    this.contents.classList.add(className);
  }

  removeClass(className) {
    this.contents.classList.remove(className);
  }

  toggleClass(className) {
    this.contents.classList.toggle(className);
  }

  attachApp() {
    if (!this.contents) this.init();
    while (this.parent.hasChildNodes()) {
      this.parent.removeChild(this.parent.firstChild);
    }
    this.parent.appendChild(this.contents);
  }

  render(clearAll = false) {
    if (!this.contents) this.init();
    if (clearAll) {
      this.attachApp();
    } else {
      this.parent.appendChild(this.contents);
    }
  }
}
