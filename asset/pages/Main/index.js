import ElementBuilder from '../../component/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import ListItem from '../../component/ListItem';
import FaB from '../../component/FaB';
import { tempData } from '../../util/tempList';
import ProductPage from '../Product';
import $ from '../../util/domControll';
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

  constructElement() {
    const $element = $.create('div').addClass('main-contianer');
    new MainHeader({
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
