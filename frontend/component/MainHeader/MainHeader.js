import $ from '../../util/domControll';
import IconBtns from '../Button/IconButtons';
import ElementBuilder from '../../lib/ElementBuilder';
import DropDown from '../DropDown';
import './mainHeader.css';

export default class MainHeader extends ElementBuilder {
  constructor(props) {
    super(props);
    const { moveHandler } = props;
    this.state = {
      isOpen: false,
      locations: [
        { id: 1, name: '역삼동', color: 'black', onClick: () => {} },
        {
          id: 2,
          name: '내 동네 설정하기',
          color: 'black',
          onClick: (e) => {
            this.props.moveToSetLocation(e);
          },
        },
      ],
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
    this.setState({ isOpen: false });
  };

  constructElement() {
    const { moveHandler } = this.props;
    const { isOpen, locations } = this.state;

    const $headerContainer = $.create('div').addClass('header-container');

    $headerContainer.appendChild(IconBtns.category(moveHandler));

    const $locationContainer = $.create('div').addClass(
      'header-container__location'
    );
    const $locationBtn = $.create('div').addClass('location-btn').setHTML(`
      ${IconBtns.mapPin().outerHTML}
      <span>${this.props.location}</span>
    `);
    $locationBtn.addEventListener('click', (e) => {
      if (isOpen) {
        this.handleDropDownClose(e);
      } else {
        this.handleDropDownOpen(e);
      }
    });
    window.addEventListener('click', this.handleDropDownClose);
    $locationContainer.addElement($locationBtn);

    const $rightContainer = $.create('div')
      .addClass('header-container__right')
      .addElement(IconBtns.user(moveHandler))
      .addElement(IconBtns.menu(moveHandler));

    new DropDown({
      parent: this,
      $attachedTarget: $locationContainer.cloneNode(),
      dropDownInfo: locations,
      onClose: this.handleDropDownClose,
      isOpen,
      position: { top: '45px', left: 'calc(50% - 82px)' },
    });

    $headerContainer.addElement($locationContainer).addElement($rightContainer);

    return $headerContainer;
  }
}
