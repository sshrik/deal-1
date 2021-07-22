import ElementBuilder from '../../lib/ElementBuilder';
import $ from '../../util/domControll';
import IconBtns from '../Button/IconButtons';
import DropDown from '../DropDown/DropDown';
import './subHeader.css';

export default class SubHeader extends ElementBuilder {
  constructor(props) {
    const { title, action, moveHandler, transparent } = props;
    super(props);
    this.title = title;
    this.onMove = moveHandler;
    this.action = action;
    this.transparent = transparent;
  }

  constructElement() {
    const { isOpen, menuItems, onClose } = this.props;
    const $element = $.create('div').addClass('sub-header-container');
    $element.appendChild(IconBtns.back(this.onMove));
    if (this.transparent) {
      $element.addClass('transparent-background');
    }

    if (this.title) {
      const $title = $.create('div')
        .addClass('sub-header__title')
        .setText(this.title);
      $element.appendChild($title);
    }

    if (this.action) {
      const $actionBtn = $.create('div').addClass('sub-header__action');
      $actionBtn.appendChild(this.action);
      $element.appendChild($actionBtn);
      new DropDown({
        parent: this,
        isOpen,
        dropDownInfo: menuItems,
        onClose,
        position: { top: '50px', right: '20px' },
      });
    }

    return $element;
  }
}
