import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import LocationButtonContainer from './locationButtonContainer';
import LocationTitleContainer from './LocationTitleContainer';
import './location.css';
export default class Location extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
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
      locations: ['역삼동'],
    });

    return $element;
  }
}
