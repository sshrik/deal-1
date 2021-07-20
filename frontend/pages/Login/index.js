import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import LoginContainer from './LoginContainer';
import './login.css';
import api from '../../util/api';

export default class Login extends ElementBuilder {
  constructor(props) {
    super(props);
    const { router, routeTo } = props;
    this.router = router;
    this.routeTo = routeTo;
  }

  beforeRender() {
    api
      .fetchGet('/check_access')
      .then((res) => {
        this.router.route('logout');
      })
      .catch((error) => console.log(error));
  }

  constructElement() {
    console.log(this.props);
    const $element = $.create('div').addClass('login-container');
    new SubHeader({
      parent: this,
      title: '로그인',
      moveHandler: () => this.router.route('logout'),
    });
    new LoginContainer({
      ...this.props,
      parent: this,
    });

    return $element;
  }
}
