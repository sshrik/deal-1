import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import SlidingWindowShower from '../../component/SlidingImageShower';
import $ from '../../util/domControll';
import '../../css/product.css';

export default class ProductPage extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('product--container');
    new SubHeader({
      parent: this,
      transparent: true,
      moveHandler: () => this.props.router.route(this.props.routeTo),
    });
    new SlidingWindowShower({
      parent: this,
    });

    console.log(this.props.element);

    return $element;
  }
}
