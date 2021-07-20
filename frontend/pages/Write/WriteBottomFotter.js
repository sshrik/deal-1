import ElementBuilder from '../../component/ElementBuilder';
import $ from '../../util/domControll';
import './write.css';

export default class WriteBottomFotter extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('write-fotter--container');
    const $mapPinIcon = $.create('img');
    $mapPinIcon.src = 'mapPin.png';
    const $locationText = $.create('p').setText(this.props.locationText);

    $element.appendChild($mapPinIcon);
    $element.appendChild($locationText);
    return $element;
  }
}
