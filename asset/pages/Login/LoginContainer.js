import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import Input from '../../component/Input';

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
    

    return $element;
  }
}
