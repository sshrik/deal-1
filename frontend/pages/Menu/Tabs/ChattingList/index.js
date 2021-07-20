import $ from '../../../../util/domControll';
import ElementBuilder from '../../../../lib/ElementBuilder';
import ChatListItem from './ChatListItem';
import { chattingList } from '../../../../util/tempList';

export default class ChattingList extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('chatting-list');
    console.log(this.props);

    chattingList.forEach((chat) => {
      new ChatListItem({
        ...chat,
        ...this.props,
        parent: this,
      });
    });

    return $element;
  }
}
