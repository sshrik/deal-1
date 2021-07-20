import ElementBuilder from '../../../../component/ElementBuilder';
import $ from '../../../../util/domControll';
import Image from '../../../../component/Image';

export default class ChatListItem extends ElementBuilder {
  constructElement() {
    const { sender, lastMsg, isCheck, timeStemp, imgSrc, unChecked, router } =
      this.props;
    const $chatItemContainer = $.create('div').addClass('chat-item');
    $chatItemContainer.addEventListener('click', () =>
      router.route('chattingRoom')
    );

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
