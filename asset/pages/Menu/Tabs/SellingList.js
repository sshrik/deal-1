import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import ListItem from '../../../component/ListItem';
import tempData from '../../../component/TempMainList';

export default class SellingList extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      sellingList: [],
    };
  }

  constructElement() {
    const $element = $.create('div').addClass('selling-list');

    tempData.forEach((element) => {
      new ListItem({
        parent: this,
        ...element,
      });
    });

    return $element;
  }
}
