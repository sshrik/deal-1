import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import LocationButtonContainer from './locationButtonContainer';
import LocationTitleContainer from './LocationTitleContainer';
import InputPopUp from '../../component/Modal/InputPopUp';

import './location.css';
export default class Location extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
    this.state = {
      locations: ['역삼동'],
    };
    this.popUpScreen = this.popUpScreen.bind(this);
  }

  compareState(prevState, newState) {
    console.log(prevState, newState);
    if (prevState.locations.length !== newState.locations.length) {
      return true;
    }
    return false;
  }

  popUpScreen() {
    const $inputPopUp = new InputPopUp({
      parent: this,
      titleText: '현재 위치를 입력하세요.',
      placeholder: '시·구 제외, 동만 입력',
      onCancel: (e) => {
        this.getContentsElement().removeChild($inputPopUp.getContentsElement());
      },
      checkInput: (value) => value.endsWith('동'),
      onProceed: (e, value) => {
        this.getContentsElement().removeChild($inputPopUp.getContentsElement());
        console.log(value);
        this.setState({ locations: [...this.state.locations, value] });
      },
    });
    this.getContentsElement().appendChild($inputPopUp.getContentsElement());
  }

  constructElement() {
    const $element = $.create('div').addClass('location-container');
    new SubHeader({
      parent: this,
      title: '내동네 설정하기',
      moveHandler: () => this.router.route(this.routeTo),
    });

    new LocationTitleContainer({
      parent: this,
    });

    new LocationButtonContainer({
      parent: this,
      locations: this.state.locations,
      addEvent: this.popUpScreen,
      deleteEvent: this.popUpScreen,
    });

    return $element;
  }
}
