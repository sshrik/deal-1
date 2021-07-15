import ElementBuilder from '../../component/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import FaB from '../../component/FaB';
import '../../css/main.css';
import $ from '../../util/domControll';

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
    new FaB({
      parent: this,
      moveHandler: () => this.moveHandler('write'),
    });

    return $element;
  }
}
