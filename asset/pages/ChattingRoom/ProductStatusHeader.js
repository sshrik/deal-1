import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import Image from '../../component/Image';
import Button from '../../component/Button';
import '../../css/chattingRoom.css';

export default class ProductStatusHeader extends ElementBuilder {
  constructElement() {
    const $productStatus = $.create('div').addClass('product-status');

    const $productInfo = $.create('div').addClass('product-info').setHTML(`
      <span class=price-info--name>빈티지 롤러 스케이트</span>
      <span class=price-info--price>160,000원</span>
    `);

    new Button({
      parent: this,
      text: '판매중',
      type: 'default',
      fontColor: 'white',
      size: 'medium',
    });

    $productStatus
      .addElement(Image('small', 'roller1.png'))
      .addElement($productInfo);

    return $productStatus;
  }
}
