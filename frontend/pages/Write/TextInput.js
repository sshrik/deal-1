import ElementBuilder from '../../component/ElementBuilder';
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
