import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';
import icons from './icons';
import '../css/subHeader.css';

export default class SubHeader extends ElementBuilder {
  constructor(props) {
    const { parent, title, action, moveHandler } = props;
    super(parent);
    this.title = title;
    this.onMove = moveHandler;
    this.action = action;
  }

  constructElement() {
    const $element = $.create('div').addClass('sub-header-container');
    $element.appendChild(icons.back(this.onMove));

    const $title = $.create('div')
      .addClass('sub-header__title')
      .setText(this.title);
    $element.appendChild($title);

    if (this.action) {
      const $actionBtn = $.create('div').addClass('sub-header__action');
      $actionBtn.appendChild(this.action);
      $element.appendChild($actionBtn);
    }

    return $element;
  }
}
