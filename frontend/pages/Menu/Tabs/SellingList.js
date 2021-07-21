import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import ListItem from '../../../component/ListItem';
import { tempData } from '../../../util/tempList';

export default class SellingList extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      sellingList: [],
    };
    console.log('a');
  }

  constructElement() {
    const $element = $.create('div').addClass('selling-list');

    tempData.forEach((element) => {
      new ListItem({
        parent: this,
        type: 'menu',
        ...element,
      });
    });

    return $element;
  }
}
