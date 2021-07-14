import $ from '../../util/domControll';
import ElementBuilder from '../ElementBuilder';
import '../../css/input.css';

export default class Input extends ElementBuilder {
  constructor(props) {
    super(props.parent);
    this.placeHolder = props.placeHolder;
    this.title = props.title;
    this.type = props.type;
    this.id = props.id;
    this.size = props.size;
  }

  init() {
    this.contents = $.create('div').addClass('input-container');
    const fontClass = this.size === 'medium' ? 'font-medium' : 'font-large';
    const inputSizeClass =
      this.size === 'medium' ? 'input-medium' : 'input-large';

    if (this.title) {
      const $title = $.create('p').setText(this.title);
      $title.addClass(fontClass);
      this.contents.appendChild($title);
    }

    const $input = $.create('input');
    $input.addClass(fontClass);
    $input.addClass(inputSizeClass);
    $input.type = this.type;
    $input.placeholder = this.placeHolder;

    this.contents.appendChild($input);
  }
}