import ElementBuilder from '../../component/ElementBuilder';
import TestTextComponent from './TestTextComponent';
// import MainHeader from '../../component/MainHeader';
// import FabButton from '../../component/FaB';
import Input from '../../component/Input';
import Button from '../../component/Button';
import '../../css/test.css';

export default class TestPage extends ElementBuilder {
  constructor(props) {
    super(props);
    this.testText = props.testText;
    this.router = props.router;
    this.dest = props.routeTo;
  }

  constructElement() {
    const $element = document.createElement('div');
    function clickEvent(ev) {
      console.log('Hello!');
    }
    const myInput1 = new Input({
      parent: this,
      type: 'text',
      size: 'large',
      id: 'my-input1',
      placeHolder: '이것은 Placeholder',
      title: '이것은 Title',
    });
    const myInput2 = new Input({
      parent: this,
      type: 'password',
      size: 'medium',
      id: 'my-input2',
      placeHolder: '이것은 두번째, Title은 없어요~',
    });
    const button1 = new Button({
      parent: this,
      text: '이것은 버튼인가',
      size: 'medium',
      type: 'default',
      state: 'default',
      fontColor: 'white',
      onClick: clickEvent,
    });
    const button2 = new Button({
      parent: this,
      text: '이것은 비활성화',
      size: 'medium',
      type: 'default',
      state: 'disable',
      fontColor: 'white',
      onClick: clickEvent,
    });
    const button3 = new Button({
      parent: this,
      text: '이것은 텍스트 버튼',
      size: 'medium',
      type: 'text',
      state: 'default',
      fontColor: 'black',
      onClick: clickEvent,
    });
    const button4 = new Button({
      parent: this,
      text: '이것은 비활성화된 텍스트 버튼',
      size: 'medium',
      type: 'text',
      state: 'disable',
      fontColor: 'grey',
      onClick: clickEvent,
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

    $element.classList.add('test-container');

    return $element;
  }
}
