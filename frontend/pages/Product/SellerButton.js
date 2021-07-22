import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';

export default class SellerButton extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      nowImageIndex: 0,
    };
  }

  constructElement() {
    const $element = $.create('div').setText('TEMP CONTAINER!');

    return $element;
  }
}
