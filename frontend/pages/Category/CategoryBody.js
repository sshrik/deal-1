import ElementBuilder from '../../lib/ElementBuilder';
import Image from '../../component/Image';
import $ from '../../util/domControll';
import './category.css';

export default class CategoryBody extends ElementBuilder {
  constructor(props) {
    const { categories } = props;
    super(props);
    this.categories = categories;
  }

  constructElement() {
    const $element = $.create('div').addClass('categories-container');

    this.categories.forEach((category, index) => {
      const $category = $.create('div').addClass('category');
      $category.appendChild(Image('small', this.props.catImages[index]));
      $category.appendChild($.create('span').setText(category));
      $category.addEventListener('click', (e) => {
        this.props.onClick(index);
      });
      $element.appendChild($category);
    });

    return $element;
  }
}
