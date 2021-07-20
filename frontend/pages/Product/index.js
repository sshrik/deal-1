import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import ProductBar from '../../component/ProductBar';
import ProductContainer from './ProductContainer';
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
    new ProductContainer({
      parent: this,
      element: this.props.element,
    });
    new ProductBar({
      parent: this,
      like: this.props.element.iLike,
      price: this.props.element.price,
    });
    return $element;
  }
}
