import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import CategoryBody from './CategoryBody';
import categories from '../../component/CategoryList';
import catImages from '../../component/CategoryImage';
import $ from '../../util/domControll';

export default class Category extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
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
    new CategoryBody({ parent: this, catImages, categories });

    return $element;
  }
}
