import PageElement from '../../component/PageElement';
import '../../css/test.css';

export default class TestPage extends PageElement {
  constructor(parent, props) {
    super(parent);
    this.testText = props.testText;
    this.router = props.router;
    this.dest = props.routeTo;
  }

  init() {
    this.contents = document.createElement('div');
    this.contents.innerHTML = `<p>${this.testText}</p>`;
    this.contents.classList.add('test-container');
    this.contents.addEventListener('click', () => {
      this.router.route(this.dest);
    });
  }
}
