import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import ProductBar from './ProductBar';
import ProductContainer from './ProductContainer';
import $ from '../../util/domControll';
import './product.css';

export default class ProductPage extends ElementBuilder {
  constructElement() {
    const { productInfo } = this.props;
    const $element = $.create('div').addClass('product--container');
    new SubHeader({
      parent: this,
      transparent: true,
      moveHandler: () => this.props.router.route(this.props.routeTo),
    });
    new ProductContainer({
      parent: this,
      productInfo,
    });
    new ProductBar({
      parent: this,
      like: productInfo.likeId ? true : false,
      price: productInfo.price,
    });
    return $element;
  }
}
