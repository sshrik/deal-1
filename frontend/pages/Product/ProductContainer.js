import ElementBuilder from '../../lib/ElementBuilder';
import SlidingWindowShower from './SlidingImageShower';
import ProductContent from './ProductContent';
import $ from '../../util/domControll';
import './product.css';

export default class ProductPage extends ElementBuilder {
  constructElement() {
    const { productInfo } = this.props;
    // console.log(productInfo);
    const $element = $.create('div').addClass('product--middle--container');
    new SlidingWindowShower({
      parent: this,
      specImage: productInfo?.imgSrc ? productInfo.imgSrc : [],
    });
    new ProductContent({
      parent: this,
      title: productInfo.title,
      lastTime: productInfo.uploadTime,
      location: productInfo.location,
      category: productInfo.category,
      specDetail: productInfo.detail,
      seller: productInfo.sellerName,
      // chat: this.props.element.chat,
      view: productInfo.viewCount,
      like: productInfo.like,
    });
    return $element;
  }
}
