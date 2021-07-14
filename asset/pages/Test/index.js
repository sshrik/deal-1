import ElementBuilder from '../../component/ElementBuilder';
import TestTextComponent from './TestTextComponent';
// import MainHeader from '../../component/MainHeader';
// import FabButton from '../../component/FaB';
import Input from '../../component/Input';
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
    const myInput1 = new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'my-input1',
      placeHolder: '이것은 Placeholder',
      title: '이것은 Title',
    });

    console.log(myInput1);
    const myInput2 = new Input({
      parent: this,
      type: 'password',
      size: 'medium',
      id: 'my-input1',
      placeHolder: '이것은 두번째, Title은 없어요~',
    });
    const nextText = new TestTextComponent({
      parent: this,
      testText: this.testText,
      onClick: () => {
        console.log('Routing to ', this.dest);
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
