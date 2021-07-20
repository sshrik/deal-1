import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import './input.css';

export default class Input extends ElementBuilder {
  constructor(props) {
    super(props);
    this.placeHolder = props.placeHolder;
    this.title = props.title;
    this.type = props.type;
    this.size = props.size;
  }

  componentDidUpdate(prevState, newState) {
    const { id, focusRequire } = this.props;
    if (focusRequire) {
      const $input = $.find(`#${id}`);
      $input.focus();
    }
  }

  constructElement() {
    const { onChange, onFocusOut, id } = this.props;

    const $element = $.create('div').addClass('input-container');
    const fontClass = this.size === 'medium' ? 'font-medium' : 'font-large';
    const inputSizeClass =
      this.size === 'medium' ? 'input-medium' : 'input-large';

    if (this.title) {
      const $title = $.create('p').addClass(fontClass).setText(this.title);
      $element.appendChild($title);
    }

    const $input = $.create('input')
      .addClass(fontClass, inputSizeClass)
      .addId(id);
    $input.type = this.type;
    $input.placeholder = this.placeHolder;

    this.props?.value ? ($input.value = this.props.value) : '';
    $input.addEventListener('input', onChange);

    onFocusOut && $input.addEventListener('change', onFocusOut);

    $element.appendChild($input);

    return $element;
  }
}
