import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';
import IconButtons from '../../../component/Button/IconButtons';

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
      return false;
    }
    return true;
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
    this.setState({
      message: '',
      // TODO : Safari에서 scrollTarget.clientHeight 적용시 맨 밑으로 이동하지 않음
      curScrollPos: scrollTarget.clientHeight * 2,
      isSendActivated: false,
      chatLogs: [...chatLogs, { sender: 'me', content: message }],
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
