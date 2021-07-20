import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import './location.css';
import {
  SELECT_LOCATION_STRING1,
  SELECT_LOCATION_STRING2,
} from '../../constant/strings';

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

    const $titleContainer = $.create('div').addClass(
      'location--title-container'
    );

    const $titleText1 = $.create('p').setText(SELECT_LOCATION_STRING1);
    const $titleText2 = $.create('p').setText(SELECT_LOCATION_STRING2);
    $titleContainer.appendChild($titleText1);
    $titleContainer.appendChild($titleText2);

    return $element;
  }
}
