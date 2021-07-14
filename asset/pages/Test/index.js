import ElementBuilder from '../../component/ElementBuilder';
import TestTextComponent from './TestTextComponent';
import '../../css/test.css';

export default class TestPage extends ElementBuilder {
  constructor(props) {
    super(props.parent);
    this.testText = props.testText;
    this.router = props.router;
    this.dest = props.routeTo;
  }

  init() {
    this.contents = document.createElement('div');
    const nextText = new TestTextComponent({
      parent: this,
      testText: this.testText,
      onClick: () => {
        console.log('Routing');
        this.router.route(this.dest);
      },
    });
    const backText = new TestTextComponent({
      parent: this,
      testText: 'go back',
      onClick: () => {
        console.log('Go back');
        this.router.back();
      },
    });

    this.contents.classList.add('test-container');
  }
}
