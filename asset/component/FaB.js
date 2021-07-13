import $ from '../util/domControll';
import icons from '../component/icons';
import '../css/fab.css';

export default class FaB {
  constructor($root, onClick) {
    this.$root = $root;

    this.render();
  }

  render = () => {
    const $fab = $.create('button').addClass('fab-btn');
    $fab.appendChild(icons.plus);
    this.$root.appendChild($fab);
  };
}
