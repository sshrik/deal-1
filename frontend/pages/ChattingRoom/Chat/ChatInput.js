import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import Input from '../../../component/Input';
import IconButtons from '../../../component/Button/IconButtons';

export default class ChatInput extends ElementBuilder {
  constructElement() {
    const { message, isSendActivated, onChange, onSend } = this.props;
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

    const $sendBtn = $.create('button')
      .addClass('send', isSendActivated ? 'active' : 'not-active')
      .setHTML(IconButtons.send);
    $sendBtn.addEventListener('click', onSend);

    $chatInputContainer.addElement($sendBtn);

    return $chatInputContainer;
  }
}
