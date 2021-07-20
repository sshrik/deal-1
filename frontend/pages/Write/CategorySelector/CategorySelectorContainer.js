import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import CategoryButton from '../../../component/Button/CategoryButton';

export default class CategorySelectContainer extends ElementBuilder {
  handleCategoryBtnClick = ({ target }, idx) => {
    const { setButtonState } = this.props;
    const $target = target.closest('.category-button--container');
    $target
      .toggleClass('category-button__deactive')
      .toggleClass('category-button__active');
    setButtonState(idx);
    return true;
  };

  constructElement() {
    const { categories } = this.props;
    const $element = $.create('div').addClass('category-selector__container');
    categories.forEach(({ name, imgSrc }, index) => {
      console.log(imgSrc);
      new CategoryButton({
        parent: this,
        state: this.props.buttonState[index],
        buttonText: name,
        // onClick: (e) => {
        //   const $target = e.target.closest('.category-button--container');
        //   $target.toggleClass('category-button__deactive');
        //   $target.toggleClass('category-button__active');
        //   this.props.setButtonState(index); // Toggle State
        //   return true;
        // },
        onClick: (e) => {
          this.handleCategoryBtnClick(e, index);
        },
      });
    });
    return $element;
  }
}
