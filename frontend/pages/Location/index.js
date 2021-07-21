import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import LocationButtonContainer from './locationButtonContainer';
import LocationTitleContainer from './LocationTitleContainer';
import InputPopUp from '../../component/Modal/InputPopUp';
import Alert from '../../component/Modal/Alert';
import api from '../../util/api';

import './location.css';
export default class Location extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
    this.state = {
      location: [],
    };
    this.popUpScreen = this.popUpScreen.bind(this);
    this.alertScreen = this.alertScreen.bind(this);
  }

  compareState(prevState, newState) {
    if (prevState.location[0] !== newState.location[0]) return true;
    if (prevState.location[1] !== newState.location[1]) return true;
    if (prevState.location.length !== newState.location.length) {
      return true;
    }
    return false;
  }

  popUpScreen() {
    if (this.state.location[1] !== null) return;

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
        api
          .fetchPost('/auth/location_all', {
            area_1: this.state.location[0],
            area_2: value,
          })
          .then((data) => {
            this.setState({ location: [this.state.location[0], value] });
          })
          .catch((error) => this.showAlert(error));
      },
    });
    this.getContentsElement().appendChild($inputPopUp.getContentsElement());
  }

  alertScreen(deleteLocation) {
    if (this.state.location[1] === null) return;

    const $alert = new Alert({
      parent: this,
      titleText: '정말 위치를 삭제하시겠습니까?',
      proceedText: '삭제',
      onCancel: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
      },
      onProceed: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
        let tempState = [...this.state.location];
        // 1개 삭제하고 state 재등록.
        if (this.state.location[0] === deleteLocation) {
          tempState.splice(0, 1);
        } else {
          tempState.splice(1, 1);
        }
        tempState.push(null);
        api
          .fetchPost('/auth/location', {
            area_1: this.state.location[0],
          })
          .then((data) => {
            this.setState({ location: tempState });
          })
          .catch((error) => this.showAlert(error));
      },
    });
    this.getContentsElement().appendChild($alert.getContentsElement());
  }

  constructElement() {
    const $element = $.create('div').addClass('location-container');
    new SubHeader({
      parent: this,
      title: '내동네 설정하기',
      moveHandler: () =>
        this.router.route(this.routeTo, {
          props: { location: this.state.location },
        }),
    });

    new LocationTitleContainer({
      parent: this,
    });

    new LocationButtonContainer({
      parent: this,
      locations: this.state.location,
      addEvent: this.popUpScreen,
      deleteEvent: this.alertScreen,
    });

    return $element;
  }
}
