import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';
import '../css/textInput.css';

export default class TextAreaInput extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('textarea');
    $input.placeholder = this.props.placeholder;

    $input.addEventListener('input', (event) => {
      console.log(event.target);
    });

    $element.appendChild($input);
    return $element;
  }
}