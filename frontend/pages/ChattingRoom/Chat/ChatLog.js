import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import ChatMsg from './ChatMsg';

export default class ChatLog extends ElementBuilder {
  constructor(props) {
    super(props);
    this.ignoreScrollEvents = true;
  }

  componentDidUpdate(prevState, newState) {
    const { curScrollPos } = this.props;
    this.$chatLogContainer.scrollTop = curScrollPos;
  }

  constructElement() {
    const { chatLogs, onTarget } = this.props;
    this.$chatLogContainer = $.create('div').addClass('chat-log-container');

    chatLogs.forEach(({ sender, content }) => {
      new ChatMsg({
        parent: this,
        sender,
        content,
      });
    });

    onTarget(this.$chatLogContainer);

    return this.$chatLogContainer;
  }
}
