import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import CategoryBody from './CategoryBody';
import $ from '../../util/domControll';

export default class Category extends ElementBuilder {
  constructor(props) {
    const { routeTo, router } = props;
    super(props);
    this.state = {
      categories: ['가전기기', '생활가전', '가구인테리어', '게임/취미'],
    };
    this.routeTo = routeTo;
    this.router = router;
  }

  constructElement() {
    const $element = $.create('div');
    new SubHeader({
      parent: this,
      title: '카테고리',
      action: null,
      moveHandler: () => this.router.route(this.routeTo),
    });
    new CategoryBody({ parent: this, categories: this.state.categories });

    return $element;
  }
}
