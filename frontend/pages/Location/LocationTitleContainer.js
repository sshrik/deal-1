import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import {
  SELECT_LOCATION_STRING1,
  SELECT_LOCATION_STRING2,
} from '../../constant/strings';

export default class LocationTitleContainer extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
  }

  constructElement() {
    const $titleContainer = $.create('div').addClass(
      'location--title-container'
    );

    const $titleText1 = $.create('p').setText(SELECT_LOCATION_STRING1);
    const $titleText2 = $.create('p').setText(SELECT_LOCATION_STRING2);
    $titleContainer.appendChild($titleText1);
    $titleContainer.appendChild($titleText2);

    return $titleContainer;
  }
}
