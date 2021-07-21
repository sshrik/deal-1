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

  moveHandler = (dest) => {
    this.router.route(dest);
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
    if (result < 24) {
      return `${parseInt(result)}일`;
    }
  }

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
        uploadTime: this.convertTime(element.uploadTime),
        isActive: element.likeId ? true : false,
        onClick: () => {
          const $newPage = new ProductPage({
            parent: this.parent,
            productInfo: element,
            uploadTime: this.convertTime(element.uploadTime),
            router: this.router,
            routeTo: 'main',
          });
          this.router.addScreen('newPage', $newPage);
          this.router.route('newPage');
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
