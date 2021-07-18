import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';

export default class Chat extends ElementBuilder {
  constructElement() {
    const { chatLogs, ...rest } = this.props;
    const $chatContents = $.create('div').addClass('chat-contents');

    new ChatLog({
      parent: this,
      chatLogs,
    });
    new ChatInput({
      ...rest,
      parent: this,
    });

    return $chatContents;
  }
}
