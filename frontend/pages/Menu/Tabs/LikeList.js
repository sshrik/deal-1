import $ from '../../../util/domControll';
import ElementBuilder from '../../../lib/ElementBuilder';
import ListItem from '../../../component/ListItem';
import api from '../../../util/api';

export default class LikeList extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      likeList: [],
    };
    this.fetchData();
  }

  compareState(prev, next) {
    return true;
  }

  fetchData = () => {
    api
      .fetchGet('/api/user_like_list')
      .then((res) => {
        this.setState({ likeList: [...res.data] });
      })
      .catch((error) => console.log(error));
  };

  handleClickLikeBtn = (pId) => {
    const { likeList } = this.state;
    api
      .fetchPost('/api/delete_like_product', { productId: pId })
      .then((res) => {
        console.log(res);
        this.setState({
          likeList: likeList.filter(({ productId }) => productId !== pId),
        });
      })
      .catch((error) => console.log(error));
  };

  constructElement() {
    const { likeList } = this.state;
    const $element = $.create('div').addClass('like-list');

    likeList.forEach((item) => {
      new ListItem({
        parent: this,
        ...item,
        isActive: true,
        onClickAction: this.handleClickLikeBtn,
      });
    });

    return $element;
  }
}
