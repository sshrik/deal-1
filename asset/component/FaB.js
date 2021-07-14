import $ from '../util/domControll';
import icons from './icons';
import ElementBuilder from './ElementBuilder';
import '../css/fab.css';

export default class FaB extends ElementBuilder {
  constructor(props) {
    super(props.parent);
    this.onClick = props.onClick;
  }

  init() {
    const $fab = $.create('button').addClass('fab-btn');
    $fab.appendChild(icons.plus());
    this.contents = $fab;
  }

  render() {
    super.render();
  }
}