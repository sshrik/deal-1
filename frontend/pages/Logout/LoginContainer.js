import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import Button from '../../component/Button';
import '../../css/Logout.css';
import api from '../../util/api';

export default class LogoutContainer extends ElementBuilder {
  handleLogoutBtnClick = () => {
    const { router } = this.props;
    api
      .fetchGet('/logout')
      .then((res) => {
        router.route('main');
      })
      .catch((error) => console.log(error));
  };

  constructElement() {
    const $logoutContentContainer = $.create('div').addClass(
      'logout-content-container'
    ).setHTML(`
      <div class=user-name>USERNAME</div>
    `);

    new Button({
      parent: this,
      text: '로그아웃',
      size: 'large',
      type: 'default',
      fontColor: 'white',
      onClick: this.handleLogoutBtnClick,
    });

    return $logoutContentContainer;
  }
}
