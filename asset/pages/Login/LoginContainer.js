import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import Input from '../../component/Input';
import Button from '../../component/Button';

export default class LoginContainer extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const { router } = this.props;
    const $element = $.create('div').addClass('login-content-container');

    new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'id',
      placeHolder: '아이디를 입력하세요',
    });
    new Input({
      parent: this,
      type: 'password',
      size: 'large',
      id: 'password',
      placeHolder: '비밀번호를 입력하세요',
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
      onClick: () => router.route('register'),
    });

    return $element;
  }
}
