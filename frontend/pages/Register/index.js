import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import RegisterContainer from './RegisterContainer';
import './register.css';

export default class Register extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const { router } = this.props;
    const $element = $.create('div').addClass('register-container');
    new SubHeader({
      parent: this,
      title: '회원가입',
      moveHandler: () => router.route('main'),
    });
    new RegisterContainer({
      ...this.props,
      parent: this,
    });

    return $element;
  }
}
