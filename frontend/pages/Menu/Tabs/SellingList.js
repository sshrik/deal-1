import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import ListItem from '../../../component/ListItem';
import { tempData } from '../../../util/tempList';

export default class SellingList extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const { sellingList } = this.props;
    const $element = $.create('div').addClass('selling-list');

    sellingList.forEach((element) => {
      new ListItem({
        parent: this,
        type: 'menu',
        ...element,
      });
    });

    return $element;
  }
}
