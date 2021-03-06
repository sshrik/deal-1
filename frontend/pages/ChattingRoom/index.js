import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import ChattingRoomContainer from './ChattingRoomContainer';
import api from '../../util/api';
import './chattingRoom.css';

import { addOpenRouting, addMessageListener } from '../../util/webSocketApi';

import { WS_ADDRESS } from '../../constant/urls';

export default class ChattingRoom extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = { chatLogs: [], myName: 0, otherName: 0 };
    this.socket = new WebSocket(WS_ADDRESS);
  }

  compareState(prevState, nextState) {
    if (prevState.otherName != nextState.otherName) return true;
    return prevState.chatLogs.length !== nextState.chatLogs.length;
  }

  setChatMsg = (res) => {
    const myName = this.props.router.globalState.userName;
    if (res.length > 0) {
      Promise.all([
        api.fetchPost('/auth/search_id', { id: res[0].sendName }),
        api.fetchPost('/auth/search_id', { id: res[0].recvName }),
      ]).then(([userName1, userName2]) => {
        const myId =
          userName1.data.userName === myName
            ? res[0].sendName
            : res[0].recvName;

        const chatLogs = [];
        res.forEach((element) => {
          if (element.type === 'chat') {
            const chatLog = {};
            chatLog.content = element.chatMsg;
            chatLog.sender = element.sendName === myId ? 'me' : 'other';
            chatLogs.push(chatLog);
          }
        });
        this.setState({ chatLogs: chatLogs });
      });
    }
    this.setState({
      myName: myName,
    });
  };

  reloadLog = () => {
    api
      .fetchPost('/auth/chat/get_log', {
        roomId: this.props.roomId,
      })
      .then((res) => {
        this.setChatMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    addOpenRouting(this.socket, this.props.router.globalState.userName);
    addMessageListener(this.socket, (data) => {
      if (this.props.productId === data.productId) {
        this.reloadLog();
      }
    });
    api
      .fetchPost('/auth/chat/get_names', { roomId: this.props.roomId })
      .then((res) => {
        Promise.all([
          api.fetchPost('/auth/search_id', { id: res.data[0].user1 }),
          api.fetchPost('/auth/search_id', { id: res.data[0].user2 }),
        ]).then(([userName1, userName2]) => {
          if (
            userName1.data.userName === this.props.router.globalState.userName
          ) {
            this.setState({ otherName: userName2.data.userName });
          } else {
            this.setState({ otherName: userName1.data.userName });
          }
        });
      });

    this.reloadLog();
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
      productId: this.props.productId,
      chatLogs: this.state.chatLogs,
      myName: this.props.router.globalState.userName,
      otherName: this.state.otherName,
      roomId: this.props.roomId,
    });
    return $chattingRoomContainer;
  }
}
