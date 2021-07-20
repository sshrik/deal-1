import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import LocationButtonContainer from './locationButtonContainer';
import LocationTitleContainer from './LocationTitleContainer';
import InputPopUp from '../../component/Modal/InputPopUp';
import Alert from '../../component/Modal/Alert';

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
    this.alertScreen = this.alertScreen.bind(this);
  }

  compareState(prevState, newState) {
    if (prevState.locations.length !== newState.locations.length) {
      return true;
    }
    return false;
  }

  popUpScreen() {
    if (this.state.locations.length === 2) return;

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
        this.setState({ locations: [...this.state.locations, value] });
        // TODO : 추가 할 때 마다 서버에 요청보내기
      },
    });
    this.getContentsElement().appendChild($inputPopUp.getContentsElement());
  }

  alertScreen(deleteLocation) {
    if (this.state.locations.length === 1) return;

    const $alert = new Alert({
      parent: this,
      titleText: '정말 위치를 삭제하시겠습니까?',
      proceedText: '삭제',
      onCancel: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
      },
      onProceed: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
        let tempState = [...this.state.locations];
        // 1개 삭제하고 state 재등록.
        if (this.state.locations[0] === deleteLocation) {
          tempState.splice(0, 1);
        } else {
          tempState.splice(1, 1);
        }
        this.setState({ locations: tempState });
        // TODO : 삭제 할 때 마다 서버에 요청보내기
      },
    });
    this.getContentsElement().appendChild($alert.getContentsElement());
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
      deleteEvent: this.alertScreen,
    });

    return $element;
  }
}
