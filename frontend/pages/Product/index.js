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
    this.state = {
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

  constructElement() {
    const { isActive, uploadTime, location } = this.props;
    const { productInfo } = this.state;
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
    });
    return $element;
  }
}
