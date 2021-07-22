import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';

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
      $dropDownItem.addEventListener('click', this.props.onClose);
      $element.appendChild($dropDownItem);
    });
    if (!this.props.isOpen) {
      $element.addClass('invisible');
    }
    return $element;
  }
}
