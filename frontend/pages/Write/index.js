import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import WriteContainer from './WriteContainer';
import './write.css';

export default class Write extends ElementBuilder {
  constructor(props) {
    const { parent, routeTo, router } = props;
    super(props);
    this.state = {};
    this.router = router;
  }

  constructElement() {
    const $element = $.create('div').addClass('write-container');
    new SubHeader({
      parent: this,
      title: '글쓰기',
      moveHandler: () => this.router.route('main'),
      action: null,
    });
    new WriteContainer({
      parent: this,
    });
    return $element;
  }
}
