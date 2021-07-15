import ElementBuilder from './ElementBuilder';
import CategorySelector from './CategorySelector';
import $ from '../util/domControll';
import '../css/textInput.css';

export default class TitleTextInput extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('input');
    $input.placeholder = '글 제목';
    new CategorySelector({
      parent: this,
    });
    $element.appendChild($input);
    return $element;
  }
}
