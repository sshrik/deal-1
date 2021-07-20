import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';

export default class DivLine extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('line');
    return $element;
  }
}
