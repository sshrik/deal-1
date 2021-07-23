import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import Image from '../../component/Image';
import Button from '../../component/Button/Button';
import './chattingRoom.css';

export default class ProductStatusHeader extends ElementBuilder {
  constructElement() {
    const $productStatus = $.create('div').addClass('product-status');

    const $productInfo = $.create('div').addClass('product-info').setHTML(`
      <span class=price-info--name>${this.props.title}</span>
      <span class=price-info--price>${this.props.price}원</span>
    `);

    let setText = '예약중';
    if (this.props.nowSelling) setText = '판매중';
    new Button({
      parent: this,
      text: setText,
      type: 'default',
      fontColor: 'white',
      size: 'medium',
    });

    $productStatus
      .addElement(Image('small', this.props.imgSrc))
      .addElement($productInfo);

    return $productStatus;
  }
}
