import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import { ADD_IMAGE_SRC, CANCLE_IMAGE_SRC } from '../../constant/imgSrc';

export default class LocationButton extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('button');
    $element.addClass(`location--button__${this.props.type}`);
    if (this.props.location) {
      const $buttonText = $.create('p').setText(this.props.location);
      const $addImage = $.create('img');
      $addImage.src = CANCLE_IMAGE_SRC;

      $element.appendChild($buttonText);
      $element.appendChild($addImage);
    } else {
      const $addImage = $.create('img');
      $addImage.src = ADD_IMAGE_SRC;

      $element.appendChild($addImage);
    }

    return $element;
  }
}
