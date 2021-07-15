import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import CategorySelectContainer from './CategorySelectorContainer';
import categories from './CategoryList';

export default class CategorySelector extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('category-selector--container');
    if (this.props.invisible) {
      $element.addClass('invisible');
    }

    const $selectCategory =
      $.create('p').setText('(필수)카테고리를 선택해주세요.');
    $element.appendChild($selectCategory);

    new CategorySelectContainer({
      parent: this,
      state: [
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
      ],
    });
    return $element;
  }
}
