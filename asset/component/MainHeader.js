import $ from '../util/domControll';
import IconBtns from './IconButtons';
import '../css/mainHeader.css';
import ElementBuilder from './ElementBuilder';

export default class MainHeader extends ElementBuilder {
  constructor(props) {
    const { moveHandler } = props;
    super(props);
    this.onMove = moveHandler;
  }

  constructElement() {
    const $headerContainer = $.create('div').addClass('header-container');

    $headerContainer.appendChild(IconBtns.category(this.onMove));

    const $locationContainer = $.create('div').addClass(
      'header-container__location'
    ).setHTML(`
      ${IconBtns.mapPin().outerHTML}
      <span>양재동</span>
    `);

    const $rightContainer = $.create('div')
      .addClass('header-container__right')
      .addElement(IconBtns.user(this.onMove))
      .addElement(IconBtns.menu(this.onMove));

    $headerContainer.addElement($locationContainer).addElement($rightContainer);

    return $headerContainer;
  }
}
