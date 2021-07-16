import $ from '../util/domControll';
import IconBtns from './IconButtons';
import '../css/mainHeader.css';
import ElementBuilder from './ElementBuilder';
import DropDown from './DropDown';

export default class MainHeader extends ElementBuilder {
  constructor(props) {
    super(props);
    const { moveHandler } = props;
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

  handleDropDownClose = () => {
    this.setState({ isOpen: false });
  };

  constructElement() {
    const { moveHandler } = this.props;
    const { isOpen } = this.state;

    const $headerContainer = $.create('div').addClass('header-container');

    $headerContainer.appendChild(IconBtns.category(moveHandler));

    const $locationContainer = $.create('div').addClass(
      'header-container__location'
    );
    const $locationBtn = $.create('div').addClass('location-btn').setHTML(`
      ${IconBtns.mapPin().outerHTML}
      <span>양재동</span>
    `);
    $locationContainer.addElement($locationBtn);
    $locationBtn.addEventListener('click', this.handleDropDownOpen);
    window.addEventListener('click', this.handleDropDownClose);

    const $rightContainer = $.create('div')
      .addClass('header-container__right')
      .addElement(IconBtns.user(moveHandler))
      .addElement(IconBtns.menu(moveHandler));

    new DropDown({
      parent: this,
      $attachedTarget: $locationContainer.cloneNode(),
      dropDownInfo: [{ name: '양재동', color: 'black' }],
      onClose: this.handleDropDownClose,
      isOpen: isOpen,
    });

    $headerContainer.addElement($locationContainer).addElement($rightContainer);

    return $headerContainer;
  }
}
