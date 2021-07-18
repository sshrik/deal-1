import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import ChatMsg from '../../../component/ChatMsg';

export default class ChatLog extends ElementBuilder {
  constructElement() {
    const { chatLogs } = this.props;
    const $chatLogContainer = $.create('div').addClass('chat-log-container');

    chatLogs.forEach(({ sender, content }) => {
      new ChatMsg({
        parent: this,
        sender,
        content,
      });
    });

    return $chatLogContainer;
  }
}
