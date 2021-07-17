import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import '../css/input.css';

export default class Input extends ElementBuilder {
  constructor(props) {
    super(props);
    this.placeHolder = props.placeHolder;
    this.title = props.title;
    this.type = props.type;
    this.id = props.id;
    this.size = props.size;
  }

  constructElement() {
    const { onChange, onFocusOut } = this.props;

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
      .addId(this.id);
    $input.type = this.type;
    $input.placeholder = this.placeHolder;
    $input.addEventListener('input', onChange);
    onFocusOut && $input.addEventListener('change', onFocusOut);

    $element.appendChild($input);
    return $element;
  }
}
