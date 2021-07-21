import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import CategorySelectContainer from './CategorySelectorContainer';

export default class CategorySelector extends ElementBuilder {
  constructElement() {
    const { categories } = this.props;
    const $element = $.create('div').addClass('category-selector--container');
    if (this.props.invisible) {
      $element.addClass('invisible');
    }

    const $selectCategory =
      $.create('p').setText('(필수)카테고리를 선택해주세요.');
    $element.appendChild($selectCategory);

    new CategorySelectContainer({
      parent: this,
      buttonState: this.props.buttonState,
      setButtonState: this.props.setButtonState,
      categories,
    });

    return $element;
  }
}
