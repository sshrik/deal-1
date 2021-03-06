import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import './textInput.css';

export default class TextAreaInput extends ElementBuilder {
  constructElement() {
    const { id, onFocus } = this.props;
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('textarea').addId(id);
    $input.placeholder = this.props.placeholder;
    $input.value = this.props.value;

    $input.addEventListener('input', (event) => {
      this.props.onInput(event);
    });

    $element.appendChild($input);
    return $element;
  }
}
