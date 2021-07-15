import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import CategoryButton from './CategoryButton';
import categories from './CategoryList';

export default class CategorySelectContainer extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('category-selector__container');
    categories.forEach((element, index) => {
      new CategoryButton({
        parent: this,
        state: this.props.state[index],
        buttonText: element,
        onClick: (e) => {
          const $target = e.target.closest('.category-button--container');
          $target.toggleClass('category-button__deactive');
          $target.toggleClass('category-button__active');
          this.props.state[index] =
            this.props.state[index] === 'active' ? 'deactive' : 'active';
          return true;
        },
      });
    });
    return $element;
  }
}
