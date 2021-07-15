import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';
import ListItem from '../../../component/ListItem';

export default class SellingList extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      sellingList: [],
    };
  }

  constructElement() {
    const $element = $.create('div').addClass('selling-list');

    new ListItem({
      parent: this,
      title: 'ts',
    });

    return $element;
  }
}
