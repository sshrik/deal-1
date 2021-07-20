import $ from '../util/domControll';
import '../css/slidingWindowShower.css';
import ElementBuilder from './ElementBuilder';
export default class SlidingWindowShower extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      nowImageIndex: 0,
    };
  }

  compareState(prev, now) {
    return prev.nowImageIndex !== now.nowImageIndex;
  }

  constructElement() {
    const $windowContainer = $.create('div').addClass(
      'sliding-window--container'
    );
    const $circleButtonContainer = $.create('div').addClass(
      'sliding-window--circle-container'
    );

    let $ShowImage;
    this.props.specImage.forEach((element, index) => {
      if (index === this.state.nowImageIndex) {
        $circleButtonContainer.appendChild(
          $.create('div')
            .addClass('sliding-window__circle')
            .addClass('circle__full')
        );
        $ShowImage = $.create('img');
        $ShowImage.src = element;
      } else {
        $circleButtonContainer.appendChild(
          $.create('div')
            .addClass('sliding-window__circle')
            .addClass('circle__empty')
        );
      }
    });

    $windowContainer.appendChild($ShowImage);
    $windowContainer.appendChild($circleButtonContainer);
    $windowContainer.addEventListener('click', (e) => {
      const maxImageNumber = this.props.specImage.length;
      this.setState({
        nowImageIndex: (this.state.nowImageIndex + 1) % maxImageNumber,
      });
    });
    return $windowContainer;
  }
}
