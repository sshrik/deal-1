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
    this.fetched = false;
    this.state = {
      isActive: false,
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
    if (prevState.isActive !== newState.isActive) return true;
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

      this.getContentsElement().appendChild($spinner.getContentsElement());

      const { productId, router } = this.props;
      api
        .fetchGet(
          !router.globalState.isLogin
            ? `/product/${productId}`
            : `/auth/product/${productId}`,
          {
            delayTime: 2000,
            startTime: new Date().getTime(),
          }
        )
        .then((res) => {
          this.setState({
            productInfo: res.data,
            isActive: res.data?.likeId ? true : false,
          });
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
    const { productInfo, isActive } = this.state;
    const { productId } = this.props;
    api
      .fetchPost(
        isActive ? '/auth/delete_like_product' : '/auth/add_like_product',
        { productId }
      )
      .then((res) => {
        this.setState({ isActive: !isActive });
      })
      .catch((error) => this.showAlert(error));
  };

  constructElement() {
    const { uploadTime, location } = this.props;
    const { productInfo, isActive } = this.state;
    console.log(productInfo);
    const $element = $.create('div').addClass('product--container');
    new SubHeader({
      parent: this,
      transparent: true,
      moveHandler: () => this.props.router.route(this.props.routeTo),
    });
    new ProductContainer({
      parent: this,
      router: this.props.router,
      pid: this.props.productId,
      productInfo: {
        ...productInfo,
        uploadTime,
        location,
      },
    });
    console.log(this.props.router.globalState);
    new ProductBar({
      parent: this,
      like: productInfo.likeId ? true : false,
      price: productInfo.price,
      onClick: this.handleLikeBtnToggle,
      isActive,
    });
    return $element;
  }
}
