import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';

export default class DragDownItem extends ElementBuilder {
  constructor(props) {
    super(props);
    this.height = 0;
  }
  setHeight(height) {
    if (height === 0 && this.height > 10) {
      this.addClassToContainer('main__main__drag-down__transition');
      setTimeout(() => {
        this.removeClassToContainer('main__main__drag-down__transition');
      }, 500);
    }
    this.getContentsElement().setAttribute('style', `margin-top: ${height}px`);
    this.height = height;
  }

  constructElement() {
    const $element = $.create('span').addClass('main__drag-down');
    const $p = $.create('p').setText('업데이트하자!');
    $element.appendChild($p);
    return $element;
  }
}
