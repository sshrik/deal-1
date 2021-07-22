import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import ChattingRoom from '../ChattingRoom/index';
import api from '../../util/api';
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
          api
            .fetchPost('/auth/chat/room_exist', {
              productId: this.props.pid,
              user1: this.props.productInfo.sellerName,
              user2: this.props.router.globalState.userName,
            })
            .then((res) => {
              const goToChatRoom = () => {
                const dcRoom = new ChattingRoom({
                  parent: this.props.router.root,
                  router: this.props.router,
                  productId: this.props.pid,
                  sellerName: this.props.productInfo.sellerName,
                  title: this.props.productInfo.title,
                  price: this.props.productInfo.price,
                  nowSelling: this.props.productInfo.nowSelling === 1,
                  imgSrc: this.props.productInfo.imgSrc[0],
                });
                this.props.router.addScreen('newChat', dcRoom);
                this.props.router.route('newChat');
              };
              if (res.data) {
                api
                  .fetchPost('/auth/chat/enter_chat', {
                    productId: this.props.pid,
                    user1: this.props.productInfo.sellerName,
                    user2: this.props.router.globalState.userName,
                  })
                  .then((res) => {
                    goToChatRoom();
                  });
              } else {
                goToChatRoom();
              }
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
