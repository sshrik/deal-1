import ElementBuilder from '../../../../lib/ElementBuilder';
import $ from '../../../../util/domControll';
import Image from '../../../../component/Image';
import ChattingRoom from '../../../ChattingRoom/index';

export default class ChatListItem extends ElementBuilder {
  goToChatRoom = () => {
    const dcRoom = new ChattingRoom({
      parent: this.props.router.root,
      router: this.props.router,
      productId: this.props.productId,
      sellerName: this.props.sellerName,
      title: this.props.title,
      price: this.props.price,
      nowSelling: this.props.nowSelling === 1,
      imgSrc: this.props.imgSrc,
      roomId: this.props.roomId,
    });
    this.props.router.addScreen('newChat', dcRoom);
    this.props.router.route('newChat');
  };

  constructElement() {
    const { sender, lastMsg, isCheck, timeStemp, imgSrc, unChecked, router } =
      this.props;
    const $chatItemContainer = $.create('div').addClass('chat-item');
    $chatItemContainer.addEventListener('click', () => {
      this.goToChatRoom();
    });

    const $chatLeftSide = $.create('div').addClass('chat-item--left').setHTML(`
      <span class="sender">${sender}</span>
      <span class="last-msg">${lastMsg}</span>
    `);

    const $chatMiddleSide = $.create('div').addClass('chat-item--mid').setHTML(`
      <span class="time-stamp">${timeStemp}분전</span>
      ${
        !isCheck
          ? `<div class="msg-count ${
              unChecked > 10 ? 'ten' : unChecked > 100 ? 'hund' : ''
            }">${unChecked}</div>`
          : ''
      }
    `);

    const $chatRightSide = $.create('div')
      .addClass('chat-item--right')
      .appendChild(Image('small', imgSrc));

    $chatItemContainer.appendChild($chatLeftSide);
    $chatItemContainer.appendChild($chatMiddleSide);
    $chatItemContainer.appendChild($chatRightSide);

    return $chatItemContainer;
  }
}
