import ElementBuilder from '../../component/ElementBuilder';
import Image from '../../component/Image';
import $ from '../../util/domControll';
import '../../css/categoryBody.css';

export default class CategoryBody extends ElementBuilder {
  constructor(props) {
    const { parent, categories } = props;
    super(parent);
    this.categories = categories;
  }

  init() {
    this.contents = $.create('div').addClass('categories-container');

    this.categories.forEach((category) => {
      const $category = $.create('div').addClass('category');
      $category.appendChild(Image('small', '#'));
      $category.appendChild($.create('span').setText(category));
      this.contents.appendChild($category);
    });
  }
}
