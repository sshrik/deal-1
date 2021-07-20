import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import '../css/button.css';

export default class CategoryButton extends ElementBuilder {
  constructElement() {
    const $element = $.create('button').addClass('category-button--container');
    $element.addClass(`category-button__${this.props.state}`);
    const $buttonText = $.create('p').setText(this.props.buttonText);
    $element.appendChild($buttonText);
    $element.addEventListener('click', this.props.onClick);

    return $element;
  }
}
