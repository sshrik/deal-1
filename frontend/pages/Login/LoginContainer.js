import $ from '../../util/domControll';
import Button from '../../component/Button/Button';
import ElementBuilder from '../../lib/ElementBuilder';
import Input from '../../component/Input';
import Alert from '../../component/Modal/Alert';
import Register from '../Register/index';
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

  onAlert = (error) => {
    const $alert = new Alert({
      parent: this,
      titleText: error,
      proceedText: '다시 입력',
      onCancel: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
      },
      onProceed: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
      },
    });
    this.getContentsElement().appendChild($alert.getContentsElement());
  };

  handleLoginBtnClick = () => {
    const { id, password } = this.state;
    const { router } = this.props;
    api
      .fetchPost('/login', { userName: id, password: password })
      .then((res) => {
        api.fetchGet('/auth/location').then((res) => {
          router.globalState.isLogin = true;
          router.globalState.userName = id;
          window.localStorage.setItem('userName', id);
          router.route('main', {
            props: { filter: '', location: [...res.data] },
          });
        });
      })
      .catch((error) => this.onAlert(error));
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
      // onClick: () => {router.route('register')},
      onClick: () => {
        router.addScreen(
          'register',
          new Register({
            parent: router.root,
            router,
          })
        );
        router.route('register');
      },
    });

    return $element;
  }
}
