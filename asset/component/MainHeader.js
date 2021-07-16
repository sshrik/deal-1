import $ from '../util/domControll';
import IconBtns from './IconButtons';
import '../css/mainHeader.css';
import ElementBuilder from './ElementBuilder';
import DropDown from './DropDown';

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
    );
    const $locationBtn = $.create('div').addClass('location-btn').setHTML(`
      ${IconBtns.mapPin().outerHTML}
      <span>양재동</span>
    `);
    $locationContainer.addElement($locationBtn);

    const $rightContainer = $.create('div')
      .addClass('header-container__right')
      .addElement(IconBtns.user(this.onMove))
      .addElement(IconBtns.menu(this.onMove));

    new DropDown({
      parent: this,
      $attachedTarget: $locationContainer.cloneNode(),
      dropDownInfo: [{ name: '양재동', color: 'black' }],
      isOpen: true,
    });

    $headerContainer.addElement($locationContainer).addElement($rightContainer);

    return $headerContainer;
  }
}
