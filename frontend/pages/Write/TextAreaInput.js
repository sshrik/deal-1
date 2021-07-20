import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import './textInput.css';

export default class TextAreaInput extends ElementBuilder {
  componentDidUpdate(prev, next) {
    const { id, curFocus } = this.props;
    if (curFocus === id) {
      $.find(`#${id}`).focus();
    }
  }
  constructElement() {
    const { id, onFocus } = this.props;
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('textarea').addId(id);
    $input.placeholder = this.props.placeholder;
    $input.value = this.props.value;

    $input.addEventListener('input', (event) => {
      console.log($input.value);
      this.props.onInput(event);
    });

    $input.addEventListener('click', onFocus);

    $element.appendChild($input);
    return $element;
  }
}
