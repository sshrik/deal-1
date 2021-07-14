import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';
import icons from './icons';
import '../css/subHeader.css';

export default class SubHeader extends ElementBuilder {
  constructor(props) {
    const { parent, title, action } = props;
    super(parent);
    this.title = title;
    this.action = action;
  }

  init() {
    this.contents = $.create('div').addClass('sub-header-container');
    console.log(this.contents);
    this.contents.appendChild(icons.back());

    const $title = $.create('div')
      .addClass('sub-header__title')
      .setText(this.title);
    this.contents.appendChild($title);

    if (this.action) {
      const $actionBtn = $.create('div').addClass('sub-header__action');
      $actionBtn.appendChild(this.action);
      this.contents.appendChild($actionBtn);
    }
  }
}
