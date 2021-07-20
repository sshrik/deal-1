import ElementBuilder from '../../lib/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import ListItem from '../../component/ListItem';
import FaB from '../../component/Button/FaB';
import ProductPage from '../Product/index';
import LoadingModal from '../../component/Modal/LoadingModal';
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
      categories: [],
    };
    this.fecthData();
    this.useScroll();
  }

  compareState(prevState, newState) {
    return true;
  }

  moveHandler = (dest) => {
    this.router.route(dest);
  };

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

  fecthData() {
    Promise.all([
      api.fetchGet('/api/products'),
      api.fetchGet('/api/categories'),
    ])
      .then(([products, categories]) => {
        this.setState({
          products: [...products.data],
          categories: [...categories.data],
        });
      })
      .catch((error) => console.log(error));
  }

  constructElement() {
    const { products } = this.state;
    const $element = $.create('div').addClass('main-contianer');
    // const $loadingModal = new LoadingModal({
    //   parent: this,
    //   needLoad: () => !this.router.globalState.firstLoading,
    //   whenLoad: () => (this.router.globalState.firstLoading = true),
    // });
    // setTimeout(() => {
    //   $loadingModal.removeClassToContainer('modal--top-fix');
    //   $loadingModal.addClassToContainer('invisible');
    // }, 2000);
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
