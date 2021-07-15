import $ from '../util/domControll';
import icons from './icons';
import ElementBuilder from './ElementBuilder';
import '../css/fab.css';

export default class FaB extends ElementBuilder {
  constructor(props) {
    super(props);
    this.onClick = props.onClick;
  }

  constructElement() {
    const $fab = $.create('button').addClass('fab-btn');
    $fab.appendChild(icons.plus());
    return $fab;
  }

  render() {
    super.render();
  }
}
