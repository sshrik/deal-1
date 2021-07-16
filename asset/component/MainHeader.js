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
    );
    const $curLocation = $.create('span');
    $curLocation.innerHTML = '양재동';
    $locationContainer.appendChild(IconBtns.mapPin(this.onMove));
    $locationContainer.appendChild($curLocation);
    $headerContainer.appendChild($locationContainer);

    const $rightContainer = $.create('div').addClass('header-container__right');
    $rightContainer.appendChild(IconBtns.user(this.onMove));
    $rightContainer.appendChild(IconBtns.menu(this.onMove));

    $headerContainer.appendChild($rightContainer);

    return $headerContainer;
  }
}
