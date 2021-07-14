import ElementBuilder from '../../component/ElementBuilder';
import '../../css/test.css';

export default class TestTextComponent extends ElementBuilder {
  constructor(props) {
    super(props.parent);
    this.testText = props.testText;
    this.onClick = props.onClick;
  }

  constructElement() {
    const $element = document.createElement('p');
    $element.innerText = this.testText;
    $element.addEventListener('click', this.onClick);

    return $element;
  }
}
