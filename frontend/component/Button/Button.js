import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import './button.css';

export default class Button extends ElementBuilder {
  constructor(props) {
    super(props);
    this.placeHolder = props.placeHolder;
    this.text = props.text;
    this.size = props.size; // medium / large
    this.type = props.type; // default / text
    this.state = props.state; // default / disable
    this.fontColor = props.fontColor; // white / black / mint
    this.onClick = props.onClick;
  }

  constructElement() {
    const $element = $.create('button').addClass('button-container');

    const buttonFontClass = `button-font-${this.size}`;
    const buttonSizeClass = `button-size-${this.size}`;
    const $buttonText = $.create('p')
      .addClass(buttonFontClass)
      .addClass(`button-font-color-${this.fontColor}`)
      .setText(this.text);

    $element.addClass(buttonSizeClass);
    if (this.type === 'text') {
      $element.addClass('text-button');
    } else {
      $element.addClass('color-button');
    }
    if (this.state === 'disable') {
      $element.addClass('button-disable');
      $element.disabled = true;
    } else {
      $element.addClass('button-active');
    }
    $element.addEventListener('click', (ev) => {
      this.onClick(ev);
    });
    $element.appendChild($buttonText);

    return $element;
  }
}
