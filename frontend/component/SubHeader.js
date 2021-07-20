import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';
import IconBtns from './IconButtons';
import '../css/subHeader.css';

export default class SubHeader extends ElementBuilder {
  constructor(props) {
    const { title, action, moveHandler, transparent } = props;
    super(props);
    this.title = title;
    this.onMove = moveHandler;
    this.action = action;
    this.transparent = transparent;
  }

  constructElement() {
    const $element = $.create('div').addClass('sub-header-container');
    $element.appendChild(IconBtns.back(this.onMove));
    if (this.transparent) {
      $element.addClass('transparent-background');
    }

    if (this.title) {
      const $title = $.create('div')
        .addClass('sub-header__title')
        .setText(this.title);
      $element.appendChild($title);
    }

    if (this.action) {
      const $actionBtn = $.create('div').addClass('sub-header__action');
      $actionBtn.appendChild(this.action);
      $element.appendChild($actionBtn);
    }

    return $element;
  }
}
