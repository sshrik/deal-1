import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';
import '../css/textInput.css';

export default class TextInput extends ElementBuilder {
  valueSetter(value) {
    let inputValue = this.props.valueChecker(value);
    inputValue = this.props.valueSetter(inputValue);
    if (inputValue === '$0') {
      return '';
    } else {
      return inputValue;
    }
  }

  constructElement() {
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('input');
    $input.placeholder = this.props.placeholder;

    $input.value = this.valueSetter(this.props.value);

    $input.addEventListener('input', (e) => {
      $input.value = this.valueSetter($input.value);
      this.props.onInput($input.value);
    });
    $element.appendChild($input);
    return $element;
  }
}
