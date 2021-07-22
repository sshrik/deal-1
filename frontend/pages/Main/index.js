import ElementBuilder from '../../lib/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import ListItem from '../../component/ListItem';
import FaB from '../../component/Button/FaB';
import ProductPage from '../Product/index';
import api from '../../util/api';
import Login from '../Login/index';
import Logout from '../Logout/index';
import Write from '../Write/index';
import $ from '../../util/domControll';
import Location from '../Location/index';
import Alert from '../../component/Modal/Alert';
import DragDownItem from './DragDownItem';
import './main.css';

export default class Main extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
    this.state = {
      products: [],
      categories: [],
      location: [null, null],
      filter: '',
    };
    this.mouseLocation = {
      isDown: false,
      pressY: 0,
      nowY: 0,
    };

    this.moveToSetLocation = this.moveToSetLocation.bind(this);
    this.useScroll();
  }

  compareState(prevState, newState) {
    prevState.products.forEach((element, index) => {
      if (element !== newState.products[index]) return true;
    });
    for (let i = 0; i < 2; i++) {
      if (prevState.location[i] !== newState.location[i]) return true;
    }
    if (prevState.filter !== newState.filter) return true;
    return false;
  }

  moveHandler = (dest) => {
    this.router.route(dest);
  };

  toLogin = () => {
    if (this.router.globalState.isLogin) {
      const $logoutPage = new Logout({
        parent: this.parent,
        router: this.router,
        userName: this.router.globalState.userName,
      });
      this.router.addScreen('logout', $logoutPage);
      this.router.route('logout');
    } else {
      const $loginPage = new Login({
        parent: this.parent,
        routeTo: 'main',
        router: this.router,
      });
      this.router.addScreen('login', $loginPage);
      this.router.route('login');
    }
  };

  moveToSetLocation(e) {
    e.stopPropagation();
    const $locationPage = new Location({
      parent: this.parent,
      router: this.router,
      routeTo: 'main',
    });

    this.router.addScreen('location', $locationPage);
    this.router.route('location', {
      props: { location: this.state.location },
    });
  }

  toWritePage = () => {
    if (this.router.globalState.isLogin) {
      const { categories } = this.state;
      const $writePage = new Write({
        parent: this.parent,
        categories,
        routeTo: '',
        router: this.router,
      });
      this.router.addScreen('write', $writePage);
      this.router.route('write');
    } else {
      this.showAlert('글을 쓰려면 로그인부터 해야합니다.', this.toLogin);
    }
  };

  convertTime(uploadTime) {
    const passedTime = new Date().getTime() - uploadTime;
    let result = passedTime / 1000;
    // millsec / 1000 -> 초
    // millsec / 1000 / 60 -> 분
    // millsec / 1000 / 60 / 60 -> 시간
    // millsec / 1000 / 60 / 60 / 24 -> 일

    if (result < 60) {
      return `${parseInt(result)}초`;
    }
    result = result / 60;
    if (result < 60) {
      return `${parseInt(result)}분`;
    }
    result = result / 60;
    if (result < 24) {
      return `${parseInt(result)}시간`;
    }
    result = result / 24;
    return `${parseInt(result)}일`;
  }

  showAlert = (error, callback = () => {}) => {
    const $alert = new Alert({
      parent: this.parent,
      titleText: error,
      proceedText: '확인',
      onCancel: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
      },
      onProceed: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
        callback();
      },
    });
    this.getContentsElement().appendChild($alert.getContentsElement());
  };

  fetchMine = () => {
    api
      .fetchGet('/auth/products_user')
      .then((products) => {
        this.setState({ products: [...products.data] });
      })
      .catch((error) => this.showAlert(error));
  };

  fetchAll = () => {
    api
      .fetchGet('/products')
      .then((products) => {
        this.setState({ products: [...products.data] });
      })
      .catch((error) => this.showAlert(error));
  };

  fetchContents = () => {
    this.setState({ filter: '' });
    if (this.router.globalState.isLogin) {
      this.fetchMine();
    } else {
      this.fetchAll();
    }
  };

  constructElement() {
    const { products } = this.state;
    const $element = $.create('div').addClass('main-contianer');
    new MainHeader({
      ...this.props,
      parent: this,
      location: this.state.location,
      moveHandler: this.moveHandler,
      moveToSetLocation: this.moveToSetLocation,
      toLogin: this.toLogin,
      isLogin: this.router.globalState.isLogin,
      showAlert: this.showAlert,
    });

    const $emptyDiv = new DragDownItem({
      parent: this,
    });

    $element.addEventListener('mousedown', (e) => {
      this.mouseLocation.isDown = true;
      this.mouseLocation.pressY = e.pageY;
      this.mouseLocation.nowY = e.pageY;
    });

    $element.addEventListener('mousemove', (e) => {
      if (this.mouseLocation.isDown) {
        this.mouseLocation.nowY = e.pageY;
        const height = this.mouseLocation.nowY - this.mouseLocation.pressY;
        if (height > 0 && height < 65) {
          $emptyDiv.setHeight(height);
        }
      }
    });

    $element.addEventListener('mouseup', (e) => {
      this.mouseLocation.isDown = false;
      this.mouseLocation.nowY = e.pageY;
      const height = this.mouseLocation.nowY - this.mouseLocation.pressY;
      if (height > 65) {
        this.fetchContents();
      }
      $emptyDiv.setHeight(0);
    });

    products.forEach((element) => {
      if (element.category === this.state.filter || this.state.filter === '') {
        new ListItem({
          parent: this,
          ...element,
          isActive: element.likeId ? true : false,
          onAlert: this.showAlert,
          onClick: () => {
            const $newPage = new ProductPage({
              parent: this.parent,
              productId: element.productId,
              location: element.area_1,
              isActive: element.likeId ? true : false,
              uploadTime: this.convertTime(element.uploadTime),
              router: this.router,
              routeTo: 'main',
            });
            this.router.addScreen('newPage', $newPage);
            this.router.route('newPage');
          },
        });
      }
    });

    new FaB({
      parent: this,
      moveHandler: () => this.toWritePage(),
    });

    return $element;
  }
}
