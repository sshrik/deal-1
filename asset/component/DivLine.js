import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';
import '../css/common.css';

export default class DivLine extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('line');
    return $element;
  }
}
