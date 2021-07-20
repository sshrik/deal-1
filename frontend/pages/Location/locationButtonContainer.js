import ElementBuilder from '../../lib/ElementBuilder';
import LocationButton from './locationButton';
import $ from '../../util/domControll';

export default class LocationButtonContainer extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $titleContainer = $.create('div').addClass(
      'location--button-container'
    );

    new LocationButton({
      parent: this,
      location: this.props.locations[0],
      type: 'primary',
    });
    new LocationButton({
      parent: this,
      location:
        this.props.locations.length === 2 ? this.props.locations[1] : null,
      type: 'secondary',
    });
    return $titleContainer;
  }
}
