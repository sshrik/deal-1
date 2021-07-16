import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import '../css/product.css';

export default class ProductBar extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('product-bar--container');

    const $likeButton = $.create('img');
    $likeButton.src = this.props.like ? 'like-full.png' : 'like-empty.png';

    const $verticalLine = $.create('div').addClass(
      'product-bar--vertical-line'
    );

    const $price = $.create('p').setText(this.props.price);
    const $callButton = $.create('button').setText('문의하기');

    $element.appendChild($likeButton);
    $element.appendChild($verticalLine);
    $element.appendChild($price);
    $element.appendChild($callButton);

    return $element;
  }
}
