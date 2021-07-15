import $ from '../../util/domControll';
import ElementBuilder from '../ElementBuilder';
import '../../css/button.css';

export default class Input extends ElementBuilder {
  constructor(props) {
    super(props.parent);
    this.placeHolder = props.placeHolder;
    this.text = props.text;
    this.size = props.size; // medium / large
    this.type = props.type; // default / text
    this.state = props.state; // default / disable
    this.fontColor = props.fontColor; // white / black / mint
    this.onClick = props.onClick;
  }

  init() {
    this.contents = $.create('button').addClass('button-container');
    const buttonFontClass = `button-font-${this.size}`;
    const buttonSizeClass = `button-size-${this.size}`;
    const $buttonText = $.create('p').setText(this.text);

    $buttonText.addClass(buttonFontClass);
    $buttonText.addClass(`button-font-color-${this.fontColor}`);
    this.contents.addClass(buttonSizeClass);
    if (this.type === 'text') {
      this.contents.addClass('text-button');
    } else {
      this.contents.addClass('color-button');
    }
    if (this.state === 'disable') {
      this.contents.addClass('button-disable');
      this.contents.disabled = true;
    } else {
      this.contents.addClass('button-active');
    }
    this.contents.addEventListener('click', (ev) => {
      this.onClick(ev);
    });
    this.contents.appendChild($buttonText);
  }
}
