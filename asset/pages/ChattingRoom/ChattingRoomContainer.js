import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import ProductStatusHeader from './ProductStatusHeader';
import Chat from './Chat';

export default class ChattingRoomContainer extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isSendActivated: false,
      chatLogs: [
        { sender: 'other', content: '안녕하세요?' },
        {
          sender: 'me',
          content:
            "What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    };
  }

  compareState(prevState, newState) {
    return true;
  }

  handleInputChange = ({ target }) => {
    this.setState({
      message: target.value,
      isSendActivated: target.value === '' ? false : true,
    });
  };

  handleSendBtnClick = () => {
    this.setState({
      chatLogs: [
        ...this.state.chatLogs,
        { sender: 'me', content: this.state.message },
      ],
    });
  };

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
      onChange: this.handleInputChange,
      onSend: this.handleSendBtnClick,
    });

    return $chattingContentContainer;
  }
}
