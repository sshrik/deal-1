import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import { tempData } from '../../../util/tempList';
import ListItem from '../../../component/ListItem';

export default class LikeList extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('like-list');

    tempData.forEach((item) => {
      new ListItem({
        parent: this,
        ...item,
      });
    });

    return $element;
  }
}
