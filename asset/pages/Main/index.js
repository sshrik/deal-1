import ElementBuilder from '../../component/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import ListItem from '../../component/ListItem';
import FaB from '../../component/FaB';
import { tempData } from '../../util/tempList';
import ProductPage from '../Product';
import LoadingModal from '../../component/LoadingModal';
import $ from '../../util/domControll';
import api from '../../util/api';
import io from 'socket.io-client';
import '../../css/main.css';

export default class Main extends ElementBuilder {
  constructor(props) {
    const { routeTo, router } = props;
    super(props);
    this.router = router;
    this.routeTo = routeTo;
  }

  moveHandler = (dest) => {
    this.router.route(dest);
  };

  beforeRender() {
    api
      .fetchPost('/check_access')
      .then((res) => {
        const socket = io('http://localhost:5000', { withCredentials: true });
      })
      .catch((error) => console.log(error));
  }

  constructElement() {
    const $element = $.create('div').addClass('main-contianer');
    const $loadingModal = new LoadingModal({
      parent: this,
      needLoad: () => !this.router.globalState.firstLoading,
      whenLoad: () => (this.router.globalState.firstLoading = true),
    });
    setTimeout(() => {
      $loadingModal.removeClassToContainer('modal--top-fix');
      $loadingModal.addClassToContainer('invisible');
    }, 2000);
    new MainHeader({
      ...this.props,
      parent: this,
      moveHandler: this.moveHandler,
    });
    tempData.forEach((element) => {
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
      moveHandler: () => this.moveHandler('write'),
    });

    return $element;
  }
}
