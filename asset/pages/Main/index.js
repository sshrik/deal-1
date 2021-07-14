import ElementBuilder from '../../component/ElementBuilder';
import icons from '../../component/icons';
import MainHeader from '../../component/MainHeader';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';

export default class Main extends ElementBuilder {
  constructor(props) {
    const { parent, routeTo, router } = props;
    super(parent);
    this.router = router;
    this.routeTo = routeTo;
  }

  moveHandler(dest) {
    console.log(`next page is ${dest}`);
    // this.router.route(dest)
  }

  init() {
    this.contents = $.create('div');
    // new MainHeader({
    //   parent: this,
    //   moveHandler: this.moveHandler,
    // });
    new SubHeader({ parent: this, title: '카테고리', action: null });
  }
}
