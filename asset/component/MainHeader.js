import $ from '../util/domControll';
import icons from './icons';
import '../css/mainHeader.css';
import ElementBuilder from './ElementBuilder';

export default class MainHeader extends ElementBuilder {
  constructor(props) {
    super(props.parent);
    // console.log(props);
  }

  init() {
    const $headerContainer = $.create('div').addClass('header-container');
    $headerContainer.appendChild(icons.category);

    const $locationContainer = $.create('div').addClass(
      'header-container__location'
    );
    const $curLocation = $.create('span');
    $curLocation.innerHTML = '양재동';
    $locationContainer.appendChild(icons.mapPin);
    $locationContainer.appendChild($curLocation);
    $headerContainer.appendChild($locationContainer);

    const $rightContainer = $.create('div').addClass('header-container__right');
    $rightContainer.appendChild(icons.user);
    $rightContainer.appendChild(icons.menu);
    $headerContainer.appendChild($rightContainer);
    this.contents = $headerContainer;
  }
}
