import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import Input from '../../component/Input';
import Button from '../../component/Button';

export default class LoginContainer extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('login-content-container');

    new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'id',
      placeHolder: '아이디를 입력하세요',
    });
    new Button({
      parent: this,
      text: '로그인',
      size: 'large',
      type: 'default',
      fontColor: 'white',
    });
    new Button({
      parent: this,
      text: '회원가입',
      size: 'large',
      type: 'text',
      fontColor: 'black',
    });

    // const $span = $.create('span').setText('test');
    // this.appendChild($span);

    return $element;
  }
}
