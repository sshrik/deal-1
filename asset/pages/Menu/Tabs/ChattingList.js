import $ from '../../../util/domControll';
import ElementBuilder from '../../../component/ElementBuilder';

export default class ChattingList extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('chatting-list');
    $element.setHTML('<div>Chatting</div>');

    return $element;
  }
}
