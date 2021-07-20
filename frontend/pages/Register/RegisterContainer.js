import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import Input from '../../component/Input';
import Button from '../../component/Button/Button';
import api from '../../util/api';
import '../../css/register.css';

export default class RegisterContainer extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      area: '',
      canSubmit: 'true',
    };
  }

  compareState(prevState, newState) {
    const { id, password, area } = prevState;
    if (
      id === newState.id ||
      password === newState.password ||
      area === newState.area
    ) {
      return false;
    }
    return true;
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  handleInputFocusOut = () => {
    const { id } = this.state;
    api
      .fetchPost('/user_check', { userName: id })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
        this.setState({ canSubmit: false });
      });
  };

  handleSumbitRegisterForm = () => {
    const { id, password, area } = this.state;
    const { router } = this.props;
    api
      .fetchPost('/register', { userName: id, password, area })
      .then((res) => router.route('login'))
      .catch((error) => console.log(error));
  };

  constructElement() {
    const $element = $.create('div').addClass('register-content-container');

    new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'id',
      placeHolder: '영문, 숫자 조합 20자 이하',
      title: '아이디',
      onChange: this.handleInputChange,
      onFocusOut: this.handleInputFocusOut,
    });
    new Input({
      parent: this,
      type: 'password',
      size: 'large',
      id: 'password',
      placeHolder: '비밀 번호를 입력해 주세요.',
      title: '비밀번호',
      onChange: this.handleInputChange,
    });
    new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'area',
      placeHolder: '시∙구 제외, 동만 입력',
      title: '우리동네',
      onChange: this.handleInputChange,
    });
    new Button({
      parent: this,
      text: '회원가입',
      size: 'large',
      type: 'default',
      state: 'default',
      fontColor: 'white',
      onClick: this.handleSumbitRegisterForm,
    });

    return $element;
  }
}
