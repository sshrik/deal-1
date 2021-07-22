import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import './product.css';

export default class ProductBar extends ElementBuilder {
  constructElement() {
    const { onClick } = this.props;
    const $element = $.create('div').addClass('product-bar--container');

    const $likeButton = $.create('img');
    $likeButton.src = this.props.like ? 'like-full.png' : 'like-empty.png';
    $likeButton.addEventListener('click', onClick);

    const $verticalLine = $.create('div').addClass(
      'product-bar--vertical-line'
    );

    const $price = $.create('p').setText(this.props.price);

    $element.appendChild($likeButton);
    $element.appendChild($verticalLine);
    $element.appendChild($price);

    if (!this.props.isActive()) {
      const $callButton = $.create('button')
        .addClass('deactive-bar--button')
        .setText('채팅 목록 보기');
      $element.appendChild($callButton);
      $callButton.addEventListener('click', () => {
        this.props.router.route('menu');
      });
    } else {
      const $callButton = $.create('button').setText('문의하기');
      $element.appendChild($callButton);
      $callButton.addEventListener('click', () => {
        if (this.props.router.globalState.isLogin) {
          this.props.router.route('menu');
        } else {
          this.props.showAlert('로그인 후 사용하실 수 있습니다.', false);
        }
      });
    }

    return $element;
  }
}
