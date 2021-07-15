import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';

export default class Location extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
  }

  constructElement() {
    const $element = $.create('div').addClass('location-container');
    new SubHeader({
      parent: this,
      title: '내동네 설정하기',
      moveHandler: () => this.router.route(this.routeTo),
    });

    return $element;
  }
}
