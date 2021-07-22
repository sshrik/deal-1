import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import ChattingRoomContainer from './ChattingRoomContainer';
import api from '../../util/api';
import './chattingRoom.css';

import {
  addOpenRouting,
  sendChat,
  addMessageListener,
} from '../../util/webSocketApi';

export default class ChattingRoom extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = { chatLogs: [], myName: 0, myId: 0, otherName: 0, otherId: 0 };
  }

  compareState(prevState, nextState) {
    return prevState.chatLogs.length !== nextState.chatLogs.length;
  }

  setChatMsg = (res) => {
    Promise.all([
      api.fetchPost('/auth/search_id', { id: res[0].sendName }),
      api.fetchPost('/auth/search_id', { id: res[0].recvName }),
    ]).then(([userName1, userName2]) => {
      const myName = this.props.router.globalState.userName;
      const myId =
        userName1.data.userName === myName ? res[0].sendName : res[0].recvName;
      const otherId =
        userName1.data.userName !== myName ? res[0].sendName : res[0].recvName;
      const otherName =
        userName1.data.userName !== myName
          ? userName1.data.userName
          : userName2.data.userName;

      this.setState({
        myName: myName,
        myId: myId,
        otherName: otherName,
        otherId: otherId,
      });
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
  };

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3000/');

    addOpenRouting(this.socket, this.props.router.globalState.userName);
    addMessageListener(this.socket, (data) => {
      console.log(data);
    });

    api
      .fetchPost('/auth/chat/get_log', {
        user1: this.props.sellerName,
        user2: this.props.router.globalState.userName,
        productId: this.props.productId,
      })
      .then((res) => {
        this.setChatMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      productId: this.props.productId,
      chatLogs: this.state.chatLogs,
      myId: this.state.myId,
      myName: this.state.myName,
      otherId: this.state.otherId,
      otherName: this.state.otherName,
    });
    return $chattingRoomContainer;
  }
}
