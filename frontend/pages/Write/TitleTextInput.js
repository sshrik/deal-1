import ElementBuilder from '../../lib/ElementBuilder';
import CategorySelector from './CategorySelector';
import $ from '../../util/domControll';
import './textInput.css';

export default class TitleTextInput extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const { categories, id } = this.props;
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('input').addId(id);
    $input.placeholder = '글 제목';
    $input.value = this.props.value;
    const $categorySelector = new CategorySelector({
      parent: this,
      invisible: $input.value.length === 0,
      buttonState: this.props.buttonState,
      setButtonState: this.props.setButtonState,
      categories,
    });

    $input.addEventListener('input', (event) => {
      if ($input.value.length > 0) {
        $categorySelector.removeClassToContainer('invisible');
      } else {
        $categorySelector.addClassToContainer('invisible');
      }
      this.props.onInput(event);
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
