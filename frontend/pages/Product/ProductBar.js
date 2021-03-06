import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import { priceCommaSeperator } from '../../util/utils';
import ChattingRoom from '../ChattingRoom/index';
import api from '../../util/api';
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
      $callButton.addEventListener('click', () => {
        this.props.router.route('menu');
      });
    } else {
      const $callButton = $.create('button').setText('문의하기');
      $element.appendChild($callButton);
      $callButton.addEventListener('click', () => {
        if (this.props.router.globalState.isLogin) {
          const goToChatRoom = (roomId) => {
            console.log(roomId);
            const dcRoom = new ChattingRoom({
              parent: this.props.router.root,
              router: this.props.router,
              productId: this.props.pid,
              sellerName: this.props.productInfo.sellerName,
              title: this.props.productInfo.title,
              price: this.props.productInfo.price,
              nowSelling: this.props.productInfo.nowSelling === 1,
              imgSrc: this.props.productInfo.imgSrc[0],
              roomId: roomId,
            });
            this.props.router.addScreen('newChat', dcRoom);
            this.props.router.route('newChat');
          };
          api
            .fetchPost('/auth/chat/enter_chat', {
              productId: this.props.pid,
              user1: this.props.productInfo.sellerName,
              user2: this.props.router.globalState.userName,
            })
            .then((res) => {
              goToChatRoom(res.roomId);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.props.showAlert('로그인 후 사용하실 수 있습니다.', false);
        }
      });
    }

    return $element;
  }
}
