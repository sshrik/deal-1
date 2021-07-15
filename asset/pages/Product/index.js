import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import SlidingWindowShower from '../../component/SlidingImageShower';
import ProductBar from '../../component/ProductBar';
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
      specImage: this.props.element.specImage,
    });
    new ProductContent({
      parent: this,
    });
    new ProductBar({
      parent: this,
      like: this.props.element.iLike,
      price: this.props.element.price,
    });
    return $element;
  }
}
