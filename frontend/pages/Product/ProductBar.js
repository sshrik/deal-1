import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import './product.css';

export default class ProductBar extends ElementBuilder {
  constructElement() {
    const { onClick, isActive } = this.props;
    const $element = $.create('div').addClass('product-bar--container');

    const $likeButton = $.create('img');
    $likeButton.src = isActive ? 'like-full.png' : 'like-empty.png';
    $likeButton.addEventListener('click', onClick);

    const $verticalLine = $.create('div').addClass(
      'product-bar--vertical-line'
    );

    const $price = $.create('p').setText(this.props.price);

    $element.appendChild($likeButton);
    $element.appendChild($verticalLine);
    $element.appendChild($price);

    if (isActive) {
      const $callButton = $.create('button')
        .addClass('deactive-bar--button')
        .setText('채팅 목록 보기');
      $element.appendChild($callButton);
    } else {
      const $callButton = $.create('button').setText('문의하기');
      $element.appendChild($callButton);
    }

    return $element;
  }
}
