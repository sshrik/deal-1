import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import '../css/chatMsg.css';

export default class ChatMsg extends ElementBuilder {
  constructElement() {
    const { sender, content } = this.props;
    const $chatMsg = $.create('div').addClass('chat-log', sender).setHTML(`
        <span>${content}</span>
      `);

    return $chatMsg;
  }
}
