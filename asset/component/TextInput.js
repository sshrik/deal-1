import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';
import '../css/textInput.css';

export default class TextInput extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('input');
    $input.placeholder = this.props.placeholder;
    $input.addEventListener('input', (e) => {
      let value = this.props.valueChecker($input.value);
      value = this.props.valueSetter(value);
      $input.value = value;
    });

    $element.appendChild($input);
    return $element;
  }
}
