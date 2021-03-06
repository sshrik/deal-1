import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import LoginContainer from './LoginContainer';
import './login.css';

export default class Login extends ElementBuilder {
  constructor(props) {
    super(props);
    const { router, routeTo } = props;
    this.router = router;
    this.routeTo = routeTo;
  }

  constructElement() {
    const $element = $.create('div').addClass('login-container');
    new SubHeader({
      parent: this,
      title: '로그인',
      moveHandler: () => {
        this.router.route('main');
      },
    });
    new LoginContainer({
      ...this.props,
      parent: this,
    });

    return $element;
  }
}
