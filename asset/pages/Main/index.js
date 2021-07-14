import ElementBuilder from '../../component/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import $ from '../../util/domControll';

export default class Main extends ElementBuilder {
  constructor(props) {
    const { parent, routeTo, router } = props;
    super(parent);
    this.router = props.router;
    this.routeTo = routeTo;
  }

  moveHandler = (dest) => {
    this.router.route(dest);
  };

  init() {
    this.contents = $.create('div');
    new MainHeader({
      parent: this,
      moveHandler: this.moveHandler,
    });
  }
}
