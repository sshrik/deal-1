import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import ListItem from '../../../component/ListItem';
import { tempData } from '../../../util/tempList';
import api from '../../../util/api';

export default class SellingList extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      sellingList: [],
    };
    this.fetchData();
  }

  compareState(prev, next) {
    return true;
  }

  fetchData = () => {
    api
      .fetchGet('/auth/user_selling_list')
      .then((res) => {
        this.setState({
          sellingList: [...res.data],
        });
      })
      .catch((error) => console.log(error));
  };

  constructElement() {
    const { sellingList } = this.state;
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
