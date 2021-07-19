import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import ChatMsg from '../../../component/ChatMsg';

export default class ChatLog extends ElementBuilder {
  constructor(props) {
    super(props);
    this.ignoreScrollEvents = true;
  }

  componentDidUpdate(prevState, newState) {
    const { curScrollPos } = this.props;

    if (
      curScrollPos !== 0 &&
      this.$chatLogContainer.scrollTop != curScrollPos
    ) {
      this.ignoreScrollEvents = true;
      this.$chatLogContainer.scrollTo({
        top: curScrollPos,
        behavior: 'smooth',
      });
    }
  }

  constructElement() {
    const { chatLogs, onScroll, curScrollPos } = this.props;
    this.$chatLogContainer = $.create('div').addClass('chat-log-container');

    chatLogs.forEach(({ sender, content }) => {
      new ChatMsg({
        parent: this,
        sender,
        content,
      });
    });

    let timer = null;
    this.$chatLogContainer.addEventListener('scroll', (e) => {
      const ignore = this.ignoreScrollEvents;
      this.ignoreScrollEvents = false;
      if (ignore) return false;
      timer = setTimeout(() => {
        timer = null;
        onScroll(e);
      }, 200);
    });

    return this.$chatLogContainer;
  }
}
