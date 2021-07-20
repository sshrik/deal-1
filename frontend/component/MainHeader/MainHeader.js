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
        { id: 1, name: '역삼동', color: 'black' },
        { id: 2, name: '내 동네 설정하기', color: 'black' },
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

  handleDropDownClose = () => {
    this.setState({ isOpen: false });
  };

  handleDropDownSelect = ({ target }) => {
    const { router } = this.props;
    const id = parseInt(target.id);
    if (id === 2) {
      router.route('write');
    }
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
    $locationBtn.addEventListener('click', this.handleDropDownOpen);
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
      onSelect: this.handleDropDownSelect,
      isOpen: isOpen,
    });

    $headerContainer.addElement($locationContainer).addElement($rightContainer);

    return $headerContainer;
  }
}
