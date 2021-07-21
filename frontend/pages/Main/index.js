import ElementBuilder from '../../lib/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import ListItem from '../../component/ListItem';
import FaB from '../../component/Button/FaB';
import ProductPage from '../Product/index';
import api from '../../util/api';
import Write from '../Write/index';
import $ from '../../util/domControll';
import Location from '../Location/index';
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
      this.router.route('logout');
    } else {
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

    products.forEach((element) => {
      new ListItem({
        parent: this,
        ...element,
        isActive: element.likeId ? true : false,
        onClick: () => {
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
