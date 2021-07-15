import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import Input from '../../component/Input';
import Button from '../../component/Button';
import '../../css/register.css';

export default class RegisterContainer extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('register-content-container');

    new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'id',
      placeHolder: '영문, 숫자 조합 20자 이하',
      title: '아이디',
    });
    new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'location',
      placeHolder: '시∙구 제외, 동만 입력',
      title: '우리동네',
    });
    new Button({
      parent: this,
      text: '회원가입',
      size: 'large',
      type: 'default',
      state: 'disable',
      fontColor: 'white',
    });

    return $element;
  }
}
