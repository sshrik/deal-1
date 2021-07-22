import $ from '../../util/domControll';
import IconBtns from '../Button/IconButtons';
import ElementBuilder from '../../lib/ElementBuilder';
import Alert from '../Modal/Alert';
import DropDown from '../DropDown';
import './mainHeader.css';

export default class MainHeader extends ElementBuilder {
  constructor(props) {
    super(props);
    let locationState = [];
    if (this.props.location[0] && this.props.location[1]) {
      locationState = [
        {
          id: 1,
          name: this.props.location[0],
          color: 'black',
          onClick: () => {},
        },
        {
          id: 2,
          name: this.props.location[1],
          color: 'black',
          onClick: () => {
            this.swapLocation();
          },
        },
        {
          id: 3,
          name: '내 동네 설정하기',
          color: 'black',
          onClick: (e) => {
            this.props.moveToSetLocation(e);
          },
        },
      ];
    } else if (this.props.location[0] && !this.props.location[1]) {
      locationState = [
        {
          id: 1,
          name: this.props.location[0],
          color: 'black',
          onClick: () => {},
        },
        {
          id: 2,
          name: '내 동네 설정하기',
          color: 'black',
          onClick: (e) => {
            this.props.moveToSetLocation(e);
          },
        },
      ];
    } else {
      locationState = [
        { id: 1, name: '역삼동', color: 'black', onClick: () => {} },
        {
          id: 2,
          name: '로그인 후 지역 설정',
          color: 'black',
          onClick: (e) => {
            this.props.toLogin();
          },
        },
      ];
    }
    this.state = {
      isOpen: false,
      locations: locationState,
    };
  }

  swapLocation() {
    const newLocationState = { ...this.state.locations };
    let temp = newLocationState[0].name;
    newLocationState[0].name = newLocationState[1].name;
    newLocationState[1].name = temp;
    this.setState(newLocationState);
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
    const { moveHandler, toLogin, showAlert } = this.props;
    const { isOpen, locations } = this.state;

    const $headerContainer = $.create('div').addClass('header-container');

    $headerContainer.appendChild(IconBtns.category(moveHandler));

    const $locationContainer = $.create('div').addClass(
      'header-container__location'
    );
    const $locationBtn = $.create('div').addClass('location-btn').setHTML(`
      ${IconBtns.mapPin().outerHTML}
      <span>${this.state.locations[0].name}</span>
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
      .addElement(IconBtns.user(toLogin))
      .addElement(
        IconBtns.menu((dest) => {
          if (this.props.isLogin) {
            moveHandler(dest);
          } else {
            showAlert('로그인을 진행해야 합니다.', toLogin);
          }
        })
      );

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
