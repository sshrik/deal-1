import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import './chatMsg.css';

export default class ChatMsg extends ElementBuilder {
  constructElement() {
    const { sender, content } = this.props;
    const $chatMsg = $.create('div').addClass('chat-log', sender).setHTML(`
        <span>${content}</span>
      `);

    return $chatMsg;
  }
}
