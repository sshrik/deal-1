import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import Input from '../../../component/Input';
import IconButtons from '../../../component/Button/IconButtons';

export default class ChatInput extends ElementBuilder {
  constructElement() {
    const { message, onChange, onSend, sendBtn } = this.props;
    const $chatInputContainer = $.create('div').addClass(
      'chat-input-container'
    );

    new Input({
      parent: this,
      placeHolder: '메세지를 입력하세요.',
      type: 'text',
      size: 'medium',
      focusRequire: true,
      id: 'chatting-input',
      onChange,
      value: message,
    });

    sendBtn.addEventListener('click', onSend);
    $chatInputContainer.addElement(sendBtn);

    return $chatInputContainer;
  }
}
