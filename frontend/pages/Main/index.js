import ElementBuilder from '../../lib/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import ListItem from '../../component/ListItem';
import FaB from '../../component/Button/FaB';
import ProductPage from '../Product/index';
import api from '../../util/api';
import Write from '../Write/index';
import $ from '../../util/domControll';
import './main.css';

export default class Main extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
    this.state = {
      products: [],
    };
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

  toWritePage = () => {
    const $writePage = new Write({
      parent: this.parent,
      routeTo: '',
      router: this.router,
    });
    this.router.addScreen('write', $writePage);
    this.router.route('write');
  };

  fecthData() {
    api
      .fetchGet('/products')
      .then((res) => {
        this.setState({ products: [...res] });
      })
      .catch((error) => console.log(error));
  }

  constructElement() {
    const { products } = this.state;
    const $element = $.create('div').addClass('main-contianer');
    new MainHeader({
      ...this.props,
      parent: this,
      moveHandler: this.moveHandler,
    });

    products.forEach((element) => {
      new ListItem({
        parent: this,
        ...element,
        onClick: () => {
          const $newPage = new ProductPage({
            parent: this.parent,
            element,
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
