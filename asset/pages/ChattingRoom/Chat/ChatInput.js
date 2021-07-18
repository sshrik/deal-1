import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import Input from '../../../component/Input';
import IconButtons from '../../../component/IconButtons';

export default class ChatInput extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isActivated: false,
    };
  }
  constructElement() {
    const { message, isActivated } = this.state;
    const $chatInputContainer = $.create('div').addClass(
      'chat-input-container'
    );

    new Input({
      parent: this,
      placeHolder: '메세지를 입력하세요.',
      type: 'text',
      size: 'medium',
    });

    $chatInputContainer.addElement(
      $.create('button')
        .addClass('send', isActivated ? 'active' : 'not-active')
        .setHTML(IconButtons.send)
    );

    return $chatInputContainer;
  }
}
