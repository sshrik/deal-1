import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';

export default class Chat extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      curScrollPos: 0,
      scrollTarget: null,
      isSendActivated: false,
      chatLogs: [
        { sender: 'other', content: '안녕하세요?' },
        {
          sender: 'me',
          content:
            "What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        { sender: 'other', content: 'a' },
        { sender: 'other', content: 'b' },
        { sender: 'me', content: 'c' },
        { sender: 'me', content: 'd' },
        { sender: 'me', content: 'e' },
        { sender: 'me', content: 'f' },
        { sender: 'me', content: 'g' },
        { sender: 'me', content: 'h' },
        { sender: 'me', content: 'i' },
        { sender: 'me', content: 'j' },
        { sender: 'me', content: 'k' },
        { sender: 'me', content: 'l' },
      ],
    };
  }

  compareState(prevState, newState) {
    return true;
  }

  handleInputChange = ({ target }) => {
    const { scrollTarget } = this.state;
    this.setState({
      curScrollPos: scrollTarget.scrollTop,
      message: target.value,
      isSendActivated: target.value === '' ? false : true,
    });
  };

  handleSendBtnClick = () => {
    const { message, chatLogs, scrollTarget } = this.state;
    this.setState({
      message: '',
      curScrollPos: scrollTarget.clientHeight,
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
    });

    return $chatContents;
  }
}
