import ElementBuilder from '../../component/ElementBuilder';
import $ from '../../util/domControll';
import Button from '../../component/Button';
import '../../css/Logout.css';

export default class LogoutContainer extends ElementBuilder {
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
    });

    return $logoutContentContainer;
  }
}
