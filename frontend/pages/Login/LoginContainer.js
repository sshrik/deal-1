import $ from '../../util/domControll';
import Button from '../../component/Button/Button';
import ElementBuilder from '../../lib/ElementBuilder';
import Input from '../../component/Input';
import api from '../../util/api';

export default class LoginContainer extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
    };
  }

  compareState(prevState, newState) {
    const { id, password } = prevState;
    if (id === newState.id) {
      return false;
    } else if (password === newState.password) {
      return false;
    }
    return true;
  }

  handleLoginBtnClick = () => {
    const { id, password } = this.state;
    const { router } = this.props;
    api
      .fetchPost('/login', { userName: id, password: password })
      .then((res) => router.route('main'))
      .catch((error) => console.log(error));
  };

  handleInputChange = ({ target }) => {
    if (target.id === 'id') {
      this.setState({ id: target.value });
    } else if (target.id === 'password') {
      this.setState({ password: target.value });
    }
  };

  constructElement() {
    const { router } = this.props;
    const $element = $.create('div').addClass('login-content-container');

    new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'id',
      placeHolder: '아이디를 입력하세요',
      onChange: this.handleInputChange,
    });
    new Input({
      parent: this,
      type: 'password',
      size: 'large',
      id: 'password',
      placeHolder: '비밀번호를 입력하세요',
      onChange: this.handleInputChange,
    });
    new Button({
      parent: this,
      text: '로그인',
      size: 'large',
      type: 'default',
      fontColor: 'white',
      onClick: this.handleLoginBtnClick,
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