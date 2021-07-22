import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import ProductBar from './ProductBar';
import ProductContainer from './ProductContainer';
import SpinnerModal from '../../component/Modal/SpinnerModal';
import Alert from '../../component/Modal/Alert';
import $ from '../../util/domControll';
import './product.css';
import api from '../../util/api';

export default class ProductPage extends ElementBuilder {
  constructor(props) {
    super(props);
    const { isActive } = this.props;
    this.fetched = false;
    this.state = {
      isActive,
      productInfo: {
        title: '',
        lastTime: '',
        location: '',
        category: '',
        specDetail: '',
        seller: '',
        view: 0,
        like: 0,
      },
    };
  }

  compareState(prevState, newState) {
    if (prevState.productInfo.title !== newState.productInfo.title) return true;
    return false;
  }

  showAlert = (error) => {
    const $alert = new Alert({
      parent: this.parent,
      titleText: error,
      proceedText: '확인',
      onCancel: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
      },
      onProceed: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
        this.props.router.route(this.props.routeTo);
      },
    });
    this.getContentsElement().appendChild($alert.getContentsElement());
  };

  componentDidMount() {
    this.spinnerFetch();
  }

  spinnerFetch = () => {
    if (!this.fetched) {
      this.fetched = true;
      const $spinner = new SpinnerModal({
        parent: this.parent,
      });

      console.log($spinner);
      console.log($spinner.getContentsElement());
      this.getContentsElement().appendChild($spinner.getContentsElement());

      const { productId } = this.props;
      api
        .fetchGet(`/product/${productId}`, {
          delayTime: 2000,
          startTime: new Date().getTime(),
        })
        .then((res) => {
          this.setState({ productInfo: res.data });
          this.getContentsElement().removeChild($spinner.getContentsElement());
        })
        .catch((error) => {
          if (!error.name === 'NotFoundError') {
            this.showAlert(error);
          }
        });
    }
  };

  handleLikeBtnToggle = () => {
    const { isActive } = this.state;
    const { productId } = this.props;
    api
      .fetchPost(
        isActive ? '/auth/delete_like_product' : '/auth/add_like_product',
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
    new ProductBar({
      parent: this,
      like: isActive,
      price: productInfo.price,
      onClick: this.handleLikeBtnToggle,
      isActive: () => {
        // TODO : this.router.globalState.userName과 같지 않은지 비교 필요
        return productInfo.seller === this.props.router.globalState.userName;
      },
    });
    return $element;
  }
}
