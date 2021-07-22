import $ from '../../util/domControll';
import SellerDropDown from './SellerDropDown';
import ElementBuilder from '../../lib/ElementBuilder';

export default class SellerButton extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  compareState(prevState, newState) {
    if (prevState.isOpen === newState.isOpen) {
      return false;
    }
    return true;
  }

  handleDropDownOpen = (e) => {
    e.stopPropagation();
    this.setState({ isOpen: true });
  };

  handleDropDownClose = (e) => {
    e.stopPropagation();
    this.setState({ isOpen: false });
  };

  constructElement() {
    const $element = $.create('div').addClass('seller-button__container');

    let sellInfo = ['판매중', '예약중'];
    if (this.props.nowSelling) {
      const $buttonText = $.create('p').setText('판매중');
      $element.appendChild($buttonText);
    } else {
      const $buttonText = $.create('p').setText('예약중');
      sellInfo = ['예약중', '판매중'];
      $element.appendChild($buttonText);
    }

    const $downImage = $.create('img');
    $downImage.src = 'down.png';

    $element.appendChild($downImage);

    $element.addEventListener('click', (e) => {
      if (this.state.isOpen) {
        this.handleDropDownClose(e);
      } else {
        this.handleDropDownOpen(e);
      }
    });

    new SellerDropDown({
      parent: this,
      dropDownInfo: sellInfo,
      onClose: this.handleDropDownClose,
      isOpen: this.state.isOpen,
    });

    return $element;
  }
}
