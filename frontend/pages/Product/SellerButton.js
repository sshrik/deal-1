import $ from '../../util/domControll';
import SellerDropDown from './SellerDropDown';
import ElementBuilder from '../../lib/ElementBuilder';

export default class SellerButton extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      nowSelling: this.props.nowSelling,
    };
  }

  compareState(prevState, newState) {
    if (prevState.isOpen !== newState.isOpen) {
      return true;
    }
    if (prevState.nowSelling !== newState.nowSelling) return true;
    return false;
  }

  handleDropDownOpen = (e) => {
    e.stopPropagation();
    this.setState({ isOpen: true });
  };

  handleDropDownClose = (e, toggleOption) => {
    e.stopPropagation();
    console.log(this.state);
    console.log(this.props);
    if (toggleOption) {
      this.setState({ isOpen: false, nowSelling: !this.state.nowSelling });
    } else {
      this.setState({ isOpen: false });
    }
  };

  constructElement() {
    const $element = $.create('div').addClass('seller-button__container');

    let sellInfo = ['판매중', '예약중'];
    if (!this.state.nowSelling) {
      sellInfo = ['예약중', '판매중'];
    }

    const $buttonText = $.create('p').setText(sellInfo[0]);
    $element.appendChild($buttonText);

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
      productNumber: this.props.productNumber,
    });

    return $element;
  }
}
