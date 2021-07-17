import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import '../../css/Logout.css';
import LogoutContainer from './LoginContainer';

export default class Logout extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const { router } = this.props;
    const $logoutContainer = $.create('div').addClass('logout-container');
    new SubHeader({
      parent: this,
      title: '내 계정',
      moveHandler: () => router.route('main'),
    });
    new LogoutContainer({
      parent: this,
    });

    return $logoutContainer;
  }
}
