import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';

export default class Logout extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $logoutContainer = $.create('div').addClass('logout-container');
    new SubHeader({
      parent: this,
      title: '내 계정',
    });

    return $logoutContainer;
  }
}
