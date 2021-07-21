import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import './textInput.css';

export default class TextInput extends ElementBuilder {
  valueSetter(value) {
    // 혹시 Login이나 다른 곳에서 사용 할 수 있도록 관련 Logic은 모두 props로 대체합니다.
    const { valueChecker, valueSetter, dismissValue } = this.props;
    let inputValue = valueChecker(value);
    inputValue = valueSetter(inputValue);
    if (inputValue === dismissValue) {
      return '';
    } else {
      return inputValue;
    }
  }

  componentDidUpdate(prev, next) {
    const { id, curFocus } = this.props;
    if (id === curFocus) {
      $.find(`#${id}`).focus();
    }
  }

  constructElement() {
    const { id, onFocus } = this.props;
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('input').addId(id);
    $input.placeholder = this.props.placeholder;

    $input.value = this.valueSetter(this.props.value);

    $input.addEventListener('input', (e) => {
      $input.value = this.valueSetter($input.value);
      this.props.onInput(e);
    });

    $input.addEventListener('click', onFocus);

    $element.appendChild($input);
    return $element;
  }
}
