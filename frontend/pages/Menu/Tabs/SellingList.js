import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import ListItem from '../../../component/ListItem';
import Write from '../../Write/index';
import api from '../../../util/api';
import { convertTime } from '../../../util/utils';

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
        console.log(this.state);
      })
      .catch((error) => console.log(error));
  };

  handleDeleteBtnClick = (pId) => {
    api
      .fetchPost('/auth/delete_selling_product', { productId: pId })
      .then((res) => {
        const { sellingList } = this.state;
        const newSellingList = sellingList.filter(
          ({ productId }) => productId !== pId
        );
        this.setState({ sellingList: newSellingList });
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
        uploadTime: convertTime(element.uploadTime),
        menuItems: [
          {
            id: 1,
            name: '수정하기',
            color: 'black',
            onClick: () => {
              const { router } = this.props;
              router.addScreen(
                'newPage',
                new Write({
                  parent: router.root,
                  type: 'modify',
                  productId: element.productId,
                  router,
                })
              );
              router.route('newPage');
            },
          },
          {
            id: 2,
            name: '삭제하기',
            color: 'red',
            onClick: () => {
              this.handleDeleteBtnClick(element.productId);
            },
          },
        ],
      });
    });

    return $element;
  }
}
