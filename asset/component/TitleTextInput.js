import ElementBuilder from './ElementBuilder';
import CategorySelector from './CategorySelector';
import $ from '../util/domControll';
import '../css/textInput.css';

export default class TitleTextInput extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
    };
  }

  compareState(prevState, newState) {
    return prevState.titleText !== newState.titleText;
  }

  constructElement() {
    const $element = $.create('div').addClass('text-input--container');
    const $input = $.create('input');
    $input.placeholder = '글 제목';
    $input.value = this.state.titleText;
    const $categorySelector = new CategorySelector({
      parent: this,
      invisible: $input.value.length === 0,
    });

    $input.addEventListener('input', (event) => {
      if ($input.value.length > 0) {
        $categorySelector.removeClassToContainer('invisible');
      } else {
        $categorySelector.addClassToContainer('invisible');
      }
    });

    $input.addEventListener('change', (event) => {
      if ($input.value.length > 0) {
        $categorySelector.removeClassToContainer('invisible');
      } else {
        $categorySelector.addClassToContainer('invisible');
      }
      this.setState({
        titleText: $input.value,
      });
    });

    $element.appendChild($input);
    return $element;
  }
}
