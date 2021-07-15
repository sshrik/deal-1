import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import CategoryButton from './CategoryButton';

export default class CategorySelectContainer extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('category-selector__container');
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
