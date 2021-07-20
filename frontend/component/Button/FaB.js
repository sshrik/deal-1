import $ from '../../util/domControll';
import IconBtns from './IconButtons';
import ElementBuilder from '../../lib/ElementBuilder';
import './fab.css';

export default class FaB extends ElementBuilder {
  constructor(props) {
    super(props);
    const { moveHandler } = props;
    this.onClick = moveHandler;
  }

  constructElement() {
    const $fab = $.create('button').addClass('fab-btn');
    $fab.addEventListener('click', this.onClick);
    $fab.appendChild(IconBtns.plus());
    return $fab;
  }

  render() {
    super.render();
  }
}
