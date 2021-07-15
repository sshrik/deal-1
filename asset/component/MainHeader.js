import $ from '../util/domControll';
import icons from './icons';
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

    $headerContainer.appendChild(icons.category(this.onMove));

    const $locationContainer = $.create('div').addClass(
      'header-container__location'
    );
    const $curLocation = $.create('span');
    $curLocation.innerHTML = '양재동';
    $locationContainer.appendChild(icons.mapPin());
    $locationContainer.appendChild($curLocation);
    $headerContainer.appendChild($locationContainer);

    const $rightContainer = $.create('div').addClass('header-container__right');
    $rightContainer.appendChild(icons.user(this.onMove));
    $rightContainer.appendChild(icons.menu());

    $headerContainer.appendChild($rightContainer);

    return $headerContainer;
  }
}
