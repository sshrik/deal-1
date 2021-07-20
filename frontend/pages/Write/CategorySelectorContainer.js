import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import CategoryButton from '../../component/Button/CategoryButton';
import categories from './CategoryList';

export default class CategorySelectContainer extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('category-selector__container');
    categories.forEach((element, index) => {
      new CategoryButton({
        parent: this,
        state: this.props.buttonState[index],
        buttonText: element,
        onClick: (e) => {
          const $target = e.target.closest('.category-button--container');
          $target.toggleClass('category-button__deactive');
          $target.toggleClass('category-button__active');
          this.props.setButtonState(index); // Toggle State
          return true;
        },
      });
    });
    return $element;
  }
}
