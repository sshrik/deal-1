import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';

export default class ChattingRoomContainer extends ElementBuilder {
  constructElement() {
    const $chattingContentContainer = $.create('div').addClass(
      'chatting-room-content-container'
    );

    return $chattingContentContainer;
  }
}
