import ElementBuilder from '../../component/ElementBuilder';
import '../../css/test.css';

export default class TestTextComponent extends ElementBuilder {
  constructor(props) {
    super(props.parent);
    this.testText = props.testText;
    this.onClick = props.onClick;
  }

  init() {
    this.contents = document.createElement('p');
    this.contents.innerText = this.testText;
    this.contents.addEventListener('click', this.onClick);
  }
}
