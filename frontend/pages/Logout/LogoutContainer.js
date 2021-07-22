import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import Button from '../../component/Button';
import Alert from '../../component/Modal/Alert';
import api from '../../util/api';

export default class LogoutContainer extends ElementBuilder {
  handleLogoutBtnClick = () => {
    const { router } = this.props;
    api
      .fetchGet('/logout')
      .then((res) => {
        router.globalState.isLogin = false;
        router.route('main', { props: { filter: '', location: [null, null] } });
      })
      .catch((error) => {
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
      });
  };

  constructElement() {
    const $logoutContentContainer = $.create('div').addClass(
      'logout-content-container'
    ).setHTML(`
      <div class=user-name>${this.props.userName}</div>
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
