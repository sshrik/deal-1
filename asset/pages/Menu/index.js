import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import MenuContainer from './MenuContainer';
import $ from '../../util/domControll';

export default class Menu extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
  }

  constructElement() {
    const $element = $.create('div').addClass('menu-container');
    new SubHeader({
      parent: this,
      title: '메뉴',
      moveHandler: () => this.router.route(this.routeTo),
    });
    new MenuContainer({
      ...this.props,
      parent: this,
    });

    return $element;
  }
}
