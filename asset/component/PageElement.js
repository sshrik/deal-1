export default class PageElement {
  init() {
    this.contents = document.createElement();
    return this.contents;
  }

  render() {
    return this.init();
  }
}
