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
    $input.addEventListener('change', (event) => {
      this.setState({
        titleText: $input.value,
      });
    });

    if (this.state.titleText.length > 0) {
      new CategorySelector({
        parent: this,
      });
    }
    $element.appendChild($input);
    return $element;
  }
}
