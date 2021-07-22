import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import ProductBar from './ProductBar';
import ProductContainer from './ProductContainer';
import SpinnerModal from '../../component/Modal/SpinnerModal';
import Alert from '../../component/Modal/Alert';
import Write from '../Write/index';
import $ from '../../util/domControll';
import './product.css';
import api from '../../util/api';
import IconButtons from '../../component/Button/IconButtons';

export default class ProductPage extends ElementBuilder {
  constructor(props) {
    super(props);
    this.fetched = false;
    this.state = {
      isActive: false,
      isOpen: false,
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
    if (prevState.isOpen !== newState.isOpen) return true;
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

  handleToggleDropDown = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleDeleteBtnClick = (pId) => {
    api
      .fetchPost('/auth/delete_selling_product', { productId: pId })
      .then((res) => {
        this.showAlert('삭제되었습니다.');
      })
      .catch((error) => console.log(error));
  };

  constructElement() {
    const { uploadTime, location, productId, router } = this.props;
    const { productInfo, isActive, isOpen } = this.state;
    console.log(productInfo);
    const $element = $.create('div').addClass('product--container');

    const $dotMenuBtn = $.create('button')
      .addClass('dot-menu')
      .setHTML(IconButtons.dotMenu);

    $dotMenuBtn.addEventListener('click', this.handleToggleDropDown);

    new SubHeader({
      parent: this,
      transparent: true,
      title: ' ',
      moveHandler: () => this.props.router.route(this.props.routeTo),
      action: $dotMenuBtn,
      isOpen,
      onClose: this.handleToggleDropDown,
      menuItems: [
        {
          id: 1,
          name: '수정하기',
          color: 'black',
          onClick: (e) => {
            e.stopPropagation();
            router.addScreen(
              'newPage',
              new Write({
                parent: router.root,
                type: 'modify',
                productId,
                router,
                routeTo: 'main',
              })
            );
            router.route('newPage');
          },
        },
        {
          id: 2,
          name: '삭제하기',
          color: 'red',
          onClick: (e) => this.handleDeleteBtnClick(productId),
        },
      ],
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
    new ProductBar({
      parent: this,
      router: this.props.router,
      sellerName: productInfo.sellerName,
      like: productInfo.likeId ? true : false,
      price: productInfo.price,
      onClick: this.handleLikeBtnToggle,
      isActive,
    });
    return $element;
  }
}
