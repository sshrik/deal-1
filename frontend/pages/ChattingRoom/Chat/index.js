import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';
import IconButtons from '../../../component/Button/IconButtons';
import api from '../../../util/api';
import { sendChat } from '../../../util/webSocketApi';

export default class Chat extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      curScrollPos: 0,
      scrollTarget: null,
      isSendActivated: false,
      chatLogs: this.props.chatLogs,
    };
  }

  compareState(prevState, newState) {
    if (prevState.message !== newState.message) {
      return true;
    }
    return false;
  }

  handleInputChange = ({ target }) => {
    const { scrollTarget } = this.state;
    this.setState({
      curScrollPos: scrollTarget.scrollTop,
      message: target.value,
      isSendActivated: target.value === '' ? false : true,
    });
    this.activateBtn();
  };

  activateBtn = () => {
    const { message } = this.state;
    if (message !== '') {
      this.$sendBtn.removeClass('not-active').addClass('active');
    } else {
      this.$sendBtn.removeClass('active').addClass('not-active');
    }
  };

  handleSendBtnClick = () => {
    const { message, chatLogs, scrollTarget } = this.state;
    const webSocket = this.props.socket;

    // 실제 DB에 데이터 보내기.
    api
      .fetchPost('/auth/chat/set_log', {
        sendName: this.props.myName,
        recvName: this.props.otherName,
        productId: this.props.productId,
        chatMsg: message,
        type: 'chat',
      })
      .then((res) => {
        // Websocket으로 핑퐁 보내기
        sendChat(
          webSocket,
          this.props.myName,
          this.props.otherName,
          this.props.productId,
          message
        );

        this.setState({
          message: '',
          // TODO : Safari에서 scrollTarget.clientHeight 적용시 맨 밑으로 이동하지 않음
          curScrollPos: scrollTarget.clientHeight * 2,
          isSendActivated: false,
          chatLogs: [...chatLogs, { sender: 'me', content: message }],
        });
      });
  };

  setScrollTarget = (target) => {
    this.setState({ scrollTarget: target });
  };

  constructElement() {
    const { chatLogs, curScrollPos, ...rest } = this.state;
    const $chatContents = $.create('div').addClass('chat-contents');

    this.$sendBtn = $.create('button')
      .addClass('send', 'not-active')
      .setHTML(IconButtons.send);

    new ChatLog({
      parent: this,
      chatLogs,
      curScrollPos,
      onTarget: this.setScrollTarget,
    });
    new ChatInput({
      ...rest,
      parent: this,
      onChange: this.handleInputChange,
      onSend: this.handleSendBtnClick,
      sendBtn: this.$sendBtn,
    });

    return $chatContents;
  }
}
