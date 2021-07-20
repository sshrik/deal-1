import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import WriteContainer from './WriteContainer';
import './write.css';

export default class Write extends ElementBuilder {
  constructor(props) {
    const { parent, routeTo, router } = props;
    super(props);
    this.router = router;
  }

  constructElement() {
    const { categories } = this.props;
    const $element = $.create('div').addClass('write-container');
    new SubHeader({
      parent: this,
      title: '글쓰기',
      moveHandler: () => this.router.route('main'),
      action: null,
    });
    new WriteContainer({
      parent: this,
      categories,
    });
    return $element;
  }
}
