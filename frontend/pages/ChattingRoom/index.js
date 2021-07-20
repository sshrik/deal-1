import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import './chattingRoom.css';
import ChattingRoomContainer from './ChattingRoomContainer';

export default class ChattingRoom extends ElementBuilder {
  constructElement() {
    const { router } = this.props;

    const $chattingRoomContainer = $.create('div').addClass(
      'chatting-room-container'
    );
    new SubHeader({
      parent: this,
      title: 'USERE',
      moveHandler: () => router.route('menu'),
    });
    new ChattingRoomContainer({
      parent: this,
    });

    return $chattingRoomContainer;
  }
}
