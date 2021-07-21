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
      if (element !== newState[index]) return true;
    });
    return false;
  }

  moveHandler = () => {
    if (this.router.globalState.isLogin) {
      const $logoutPage = new Logout({
        parent: this.parent,
        router: this.router,
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
    this.router.route('location');
  }

  toWritePage = () => {
    const { categories } = this.state;
    const $writePage = new Write({
      parent: this.parent,
      categories,
      routeTo: '',
      router: this.router,
    });
    this.router.addScreen('write', $writePage);
    this.router.route('write');
  };

  showAlert = (error) => {
    const $alert = new Alert({
      parent: this,
      titleText: error,
      proceedText: '확인',
      onCancel: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
      },
      onProceed: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
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
      location: '양재동',
      moveHandler: this.moveHandler,
      moveToSetLocation: this.moveToSetLocation,
    });
    const $emptyDiv = new DragDownItem({
      parent: this,
    });
    $element.addEventListener(
      'drag',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      true
    );
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
      new ListItem({
        parent: this,
        ...element,
        isActive: element.likeId ? true : false,
        onClick: () => {
          // TODO : ADD event to refresh... this.fetchContents();
          // const $newPage = new ProductPage({
          //   parent: this.parent,
          //   element,
          //   router: this.router,
          //   routeTo: 'main',
          // });
          // this.router.addScreen('newPage', $newPage);
          // this.router.route('newPage');
        },
      });
    });
    new FaB({
      parent: this,
      moveHandler: () => this.toWritePage(),
    });

    return $element;
  }
}
