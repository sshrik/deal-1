import ElementBuilder from './ElementBuilder';
import CategorySelector from './CategorySelector';
import $ from '../util/domControll';
import '../css/textInput.css';

export default class TitleTextInput extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('input');
    $input.placeholder = '글 제목';
    $input.value = this.props.value;
    const $categorySelector = new CategorySelector({
      parent: this,
      invisible: $input.value.length === 0,
      buttonState: this.props.buttonState,
      setButtonState: this.props.setButtonState,
    });

    $input.addEventListener('input', (event) => {
      if ($input.value.length > 0) {
        $categorySelector.removeClassToContainer('invisible');
      } else {
        $categorySelector.addClassToContainer('invisible');
      }
      this.props.onInput($input.value);
    });

    $input.addEventListener('change', (event) => {
      if ($input.value.length > 0) {
        $categorySelector.removeClassToContainer('invisible');
      } else {
        $categorySelector.addClassToContainer('invisible');
      }
    });

    $element.appendChild($input);
    return $element;
  }
}
