import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import './dropdown.css';

export default class DropDown extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const { $attachedTarget, dropDownInfo, isOpen, onClose, onSelect } =
      this.props;

    const $dropDownContainer = $.create('ul').addClass('drop-downs-items');
    $dropDownContainer.addEventListener('click', (e) => {
      onClose();
      onSelect(e);
    });

    dropDownInfo.forEach(({ id, name, color }) => {
      $dropDownContainer.addElement(
        $.create('li').addClass('drop-down-item', color).addId(id).setText(name)
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
