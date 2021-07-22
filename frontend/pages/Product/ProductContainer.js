import ElementBuilder from '../../lib/ElementBuilder';
import SlidingWindowShower from './SlidingImageShower';
import ProductContent from './ProductContent';
import SellerButton from './SellerButton';
import $ from '../../util/domControll';
import './product.css';

export default class ProductContainer extends ElementBuilder {
  constructElement() {
    const { productInfo } = this.props;
    const $element = $.create('div').addClass('product--middle--container');
    new SlidingWindowShower({
      parent: this,
      specImage: productInfo?.imgSrc ? productInfo.imgSrc : [],
    });

    // TODO : this.router.globalState.userName과 비교 필요
    if (productInfo.sellerName === 'ag502') {
      new SellerButton({
        parent: this,
        productNumber: this.props.pid,
        nowSelling: productInfo.nowSelling === 1,
      });
    }
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
