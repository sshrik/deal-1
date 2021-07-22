import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import ProductBar from './ProductBar';
import ProductContainer from './ProductContainer';
import $ from '../../util/domControll';
import './product.css';
import api from '../../util/api';

export default class ProductPage extends ElementBuilder {
  constructor(props) {
    super(props);
    const { isActive } = this.props;
    this.state = {
      isActive,
      productInfo: {},
    };
    this.fetchData();
  }

  compareState(prev, next) {
    return true;
  }

  fetchData = () => {
    const { productId } = this.props;
    api
      .fetchGet(`/api/product/${productId}`, {
        delayTime: 1000,
        startTime: new Date().getTime(),
      })
      .then((res) => {
        this.setState({ productInfo: res.data });
        console.log(this.state);
      })
      .catch((error) => console.log(error));
  };

  handleLikeBtnToggle = () => {
    const { isActive } = this.state;
    const { productId } = this.props;
    api
      .fetchPost(
        isActive ? '/api/delete_like_product' : '/api/add_like_product',
        { productId }
      )
      .then((res) => {
        this.setState({ isActive: !isActive });
      })
      .catch((error) => console.log(error));
  };

  constructElement() {
    const { uploadTime, location } = this.props;
    const { productInfo, isActive } = this.state;
    console.log(this.state);
    const $element = $.create('div').addClass('product--container');
    new SubHeader({
      parent: this,
      transparent: true,
      moveHandler: () => this.props.router.route(this.props.routeTo),
    });
    new ProductContainer({
      parent: this,
      productInfo: { ...productInfo, uploadTime, location },
    });
    console.log(isActive);
    new ProductBar({
      parent: this,
      like: isActive,
      price: productInfo.price,
      onClick: this.handleLikeBtnToggle,
    });
    return $element;
  }
}
