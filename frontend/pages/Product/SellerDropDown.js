import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import api from '../../util/api';

export default class SellerDropDown extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('seller-drop-down__container');

    this.props.dropDownInfo.forEach((element) => {
      const $dropDownItem = $.create('div').addClass('seller-drop-down__item');
      const $dropDownText = $.create('p').setText(element);
      $dropDownItem.appendChild($dropDownText);
      $dropDownItem.addEventListener('click', (e) => {
        const nowSelling = element === '판매중' ? 2 : 1;
        api
          .fetchPost('/auth/set_sell_state', {
            nowSelling: nowSelling,
            productId: this.props.productNumber,
          })
          .then((res) => {
            this.props.onClose(e, true);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      $element.appendChild($dropDownItem);
    });
    if (!this.props.isOpen) {
      $element.addClass('invisible');
    }
    return $element;
  }
}
