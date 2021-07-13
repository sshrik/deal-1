export default class PageElement {
  constructor(parent) {
    this.parent = parent;
  }

  init() {
    this.contents = document.createElement();
    return this.contents;
  }

  render() {
    this.init();
    while (this.parent.hasChildNodes()) {
      this.parent.removeChild(this.parent.firstChild);
    }
    this.parent.appendChild(this.contents);
  }
}
