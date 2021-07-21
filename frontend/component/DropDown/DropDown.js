import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import './dropdown.css';

export default class DropDown extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  applyPosition(dropDown, position) {
    if (position) {
      Object.keys(position).forEach((pos) => {
        dropDown.style[pos] = position[pos];
      });
    }
  }

  showDropDown(dropDown, isOpen) {
    if (isOpen) {
      dropDown.style.display = 'block';
      console.log('dropdoqns');
    } else {
      dropDown.style.display = 'none';
    }
  }

  constructElement() {
    const { dropDownInfo, isOpen, position, onClose } = this.props;

    const $dropDownContainer = $.create('ul').addClass('drop-downs-items');
    $dropDownContainer.addEventListener('click', (e) => {
      onClose();
    });

    dropDownInfo.forEach(({ id, name, color, onClick }) => {
      const $addLi = $.create('li')
        .addClass('drop-down-item', color)
        .addId(id)
        .setText(name);
      $addLi.style.color = color;
      $addLi.addEventListener('click', (e) => {
        onClick(e);
      });

      $dropDownContainer.addElement($addLi);
    });

    this.applyPosition($dropDownContainer, position);
    this.showDropDown($dropDownContainer, isOpen);

    return $dropDownContainer;
  }
}
