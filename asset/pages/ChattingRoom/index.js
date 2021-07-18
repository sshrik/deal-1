import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import '../../css/chattingRoom.css';
import ProductStatusHeader from './ProductStatusHeader';

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
    new ProductStatusHeader({
      parent: this,
    });

    return $chattingRoomContainer;
  }
}
