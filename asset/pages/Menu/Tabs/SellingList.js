import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';

export default class SellingList extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('selling-list');
    $element.setHTML('<div>TEST</div>');

    return $element;
  }
}
