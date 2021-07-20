import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import './textInput.css';

export default class TextAreaInput extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('textarea');
    $input.placeholder = this.props.placeholder;
    $input.value = this.props.value;

    $input.addEventListener('input', (event) => {
      console.log($input.value);
      this.props.onInput($input.value);
    });

    $element.appendChild($input);
    return $element;
  }
}
