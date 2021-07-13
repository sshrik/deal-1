import PageElement from '../../component/PageElement';
import TestTextComponent from './TestTextComponent';
import '../../css/test.css';

export default class TestPage extends PageElement {
  constructor(props) {
    super();
    this.testText = props.testText;
    this.router = props.router;
    this.dest = props.routeTo;
  }

  init() {
    this.contents = document.createElement('div');
    const nextText = new TestTextComponent({
      testText: this.testText,
      onClick: () => {
        console.log('Routing');
        this.router.route(this.dest);
      },
    });
    const backText = new TestTextComponent({
      testText: 'go back',
      onClick: () => {
        console.log('Go back');
        this.router.back();
      },
    });

    this.contents.classList.add('test-container');
    this.contents.appendChild(nextText.init());
    this.contents.appendChild(backText.init());

    return this.contents;
  }
}
