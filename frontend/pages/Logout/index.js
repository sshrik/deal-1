import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import './Logout.css';
import LogoutContainer from './LogoutContainer';

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
      ...this.props,
      parent: this,
    });

    return $logoutContainer;
  }
}
