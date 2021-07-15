import $ from '../util/domControll';
import icons from './icons';
import ElementBuilder from './ElementBuilder';
import '../css/fab.css';

export default class FaB extends ElementBuilder {
  constructor(props) {
    super(props);
    const { moveHandler } = props;
    this.onClick = moveHandler;
  }

  constructElement() {
    const $fab = $.create('button').addClass('fab-btn');
    $fab.addEventListener('click', this.onClick);
    $fab.appendChild(icons.plus());
    return $fab;
  }

  render() {
    super.render();
  }
}
