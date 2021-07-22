import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import ChattingRoomContainer from './ChattingRoomContainer';
import './chattingRoom.css';

import {
  addOpenRouting,
  sendChat,
  addMessageListener,
} from '../../util/webSocketApi';

export default class ChattingRoom extends ElementBuilder {
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3000/');

    addOpenRouting(this.socket, this.props.router.globalState.userName);
    addMessageListener(this.socket, (data) => {
      console.log(data);
    });
  }
  constructElement() {
    const $chattingRoomContainer = $.create('div').addClass(
      'chatting-room-container'
    );
    new SubHeader({
      parent: this,
      title: this.props.sellerName,
      moveHandler: () => this.props.router.route('menu'),
    });
    new ChattingRoomContainer({
      parent: this,
      socket: this.socket,
      title: this.props.title,
      price: this.props.price,
      nowSelling: this.props.nowSelling,
      imgSrc: this.props.imgSrc,
      chatLogs: [
        { sender: 'other', content: '안녕하세요?' },
        { sender: 'me', content: '요리사' },
        { sender: 'other', content: '사진관' },
        { sender: 'me', content: '관지기?' },
        { sender: 'other', content: '기러기' },
        { sender: 'me', content: '기차표' },
      ],
    });
    return $chattingRoomContainer;
  }
}
