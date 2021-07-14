import $ from '../util/domControll';
import icons from '../component/icons';
import '../css/mainHeader.css';

export default class MainHeader {
  constructor($root) {
    this.$root = $root;
    this.render();
  }

  render = () => {
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

    this.$root.appendChild($headerContainer);
  };
}
