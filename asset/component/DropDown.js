import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';

export default class DropDown extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  // dropDownInfo = [{name,color}]

  constructElement() {
    const { dropDownInfo, action, isOpen } = this.props;
    const $dropDownContainer = $.create('ul').addClass('drop-downs-items');
    $dropDownContainer.addEventListener('click', action);

    dropDownInfo.forEach(({ name, color }) => {
      $dropDownContainer.addElement(
        $.create('li').addClass('drop-down-item', color).setText(name)
      );
    });

    isOpen
      ? ($dropDownContainer.style.display = 'block')
      : ($dropDownContainer.style.display = 'none');

    return $dropDownContainer;
  }
}
