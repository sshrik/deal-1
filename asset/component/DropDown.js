import ElementBuilder from './ElementBuilder';
import $ from '../util/domControll';
import '../css/dropDown.css';

export default class DropDown extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  // dropDownInfo = [{name,color}]

  constructElement() {
    const { $attachedTarget, dropDownInfo, isOpen, onClose } = this.props;

    const $dropDownContainer = $.create('ul').addClass('drop-downs-items');
    $dropDownContainer.addEventListener('click', () => {
      onClose();
    });

    dropDownInfo.forEach(({ name, color }) => {
      $dropDownContainer.addElement(
        $.create('li').addClass('drop-down-item', color).setText(name)
      );
    });

    if (isOpen) {
      $attachedTarget.style.position = 'relative';
      $dropDownContainer.style.display = 'block';
    } else {
      $attachedTarget.style.position = 'static';
      $dropDownContainer.style.display = 'none';
    }

    $attachedTarget.addElement($dropDownContainer);

    return $attachedTarget;
  }
}
