import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';

export default class LikeList extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('like-list');
    $element.setHTML('<div>List List</div>');

    return $element;
  }
}
