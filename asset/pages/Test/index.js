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
    this.contents.innerHTML = `<p id="next-text">${this.testText}</p><p id="go-back">go back</p>`;
    this.contents.classList.add('test-container');
    this.contents.querySelector('#next-text').addEventListener('click', () => {
      console.log('Routing');
      this.router.route(this.dest);
    });
    this.contents.querySelector('#go-back').addEventListener('click', () => {
      console.log('Go back');
      this.router.back();
    });
  }
}
