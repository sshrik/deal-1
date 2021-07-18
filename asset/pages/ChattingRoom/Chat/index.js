import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import ChatLog from './ChatLog';

export default class Chat extends ElementBuilder {
  constructElement() {
    const { chatLogs } = this.props;
    const $chatContents = $.create('div').addClass('chat-contents');

    new ChatLog({
      parent: this,
      chatLogs,
    });

    return $chatContents;
  }
}
