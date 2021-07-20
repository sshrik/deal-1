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
    });
    new Chat({
      parent: this,
      ...this.state,
    });

    return $chattingContentContainer;
  }
}
