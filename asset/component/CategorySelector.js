import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import CategorySelectContainer from './CategorySelectorContainer';

export default class CategorySelector extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('category-selector--container');
    if (this.props.invisible) {
      $element.addClass('invisible');
    }

    const $selectCategory =
      $.create('p').setText('(필수)카테고리를 선택해주세요.');
    $element.appendChild($selectCategory);

    const categories = [
      '디지털기기',
      '생활가전',
      '가구/인테리어',
      '게임/취미',
      '생활/가공식품',
      '스포츠/레저',
      '여성패션/잡화',
      '남성패션/잡화',
      '유아동',
      '뷰티/미용',
      '반려동물',
      '도서/티켓/음반',
      '식물',
      '기타 중고물품',
    ];

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
