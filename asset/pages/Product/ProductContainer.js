import ElementBuilder from '../../component/ElementBuilder';
import SlidingWindowShower from '../../component/SlidingImageShower';
import ProductContent from '../../component/ProductContent';
import $ from '../../util/domControll';
import '../../css/product.css';

export default class ProductPage extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('product--middle--container');
    new SlidingWindowShower({
      parent: this,
      specImage: this.props.element.specImage,
    });
    new ProductContent({
      parent: this,
      title: this.props.element.title,
      lastTime: this.props.element.lastTime,
      location: this.props.element.location,
      category: this.props.element.category,
      specDetail: this.props.element.specDetail,
      seller: this.props.element.seller,
      chat: this.props.element.chat,
      view: this.props.element.view,
      like: this.props.element.like,
    });
    return $element;
  }
}
