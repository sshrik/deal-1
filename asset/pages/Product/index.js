import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import '../../css/product.css';

export default class ProductPage extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('product--container');
    new SubHeader({
      parent: this,
      title: '',
      transparent: true,
      moveHandler: () => this.props.router.route(this.props.routeTo),
    });
    console.log(this.props.element);

    return $element;
  }
}
