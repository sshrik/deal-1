import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import { priceCommaSeperator } from '../../util/utils';
import './product.css';

export default class ProductBar extends ElementBuilder {
  constructElement() {
    const { onClick, isActive, sellerName } = this.props;
    const $element = $.create('div').addClass('product-bar--container');

    const $likeButton = $.create('img');
    $likeButton.src = isActive ? 'like-full.png' : 'like-empty.png';
    $likeButton.addEventListener('click', onClick);

    const $verticalLine = $.create('div').addClass(
      'product-bar--vertical-line'
    );

    const $price = $.create('p').setText(
      priceCommaSeperator(String(this.props.price))
    );

    $element.appendChild($likeButton);
    $element.appendChild($verticalLine);
    $element.appendChild($price);

    if (sellerName === this.props.router.globalState.userName) {
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
