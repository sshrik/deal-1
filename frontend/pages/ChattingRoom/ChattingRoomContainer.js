import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import ProductStatusHeader from './ProductStatusHeader';
import Chat from './Chat';

export default class ChattingRoomContainer extends ElementBuilder {
  constructElement() {
    const $chattingContentContainer = $.create('div').addClass(
      'chatting-room-content-container'
    );
    new ProductStatusHeader({
      parent: this,
      title: this.props.title,
      price: this.props.price,
      nowSelling: this.props.nowSelling,
      imgSrc: this.props.imgSrc,
    });
    new Chat({
      parent: this,
      chatLogs: this.props.chatLogs,
      ...this.state,
    });

    return $chattingContentContainer;
  }
}
