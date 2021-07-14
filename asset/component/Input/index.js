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
  }

  init() {
    this.contents = $.create('div').addClass('input-container');
    if (this.title) {
      const $title = $.create('p').setText(this.title);
      this.contents.appendChild($title);
    }

    const $input = $.create('input');
    $input.type = this.type;
    $input.placeholder = this.placeHolder;

    this.contents.appendChild($input);
  }
}
