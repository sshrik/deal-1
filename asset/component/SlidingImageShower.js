import $ from '../util/domControll';
import '../css/slidingWindowShower.css';
import ElementBuilder from './ElementBuilder';

export default class SlidingWindowShower extends ElementBuilder {
  constructElement() {
    const $windowContainer = $.create('div').addClass(
      'sliding-window--container'
    );

    return $windowContainer;
  }
}
