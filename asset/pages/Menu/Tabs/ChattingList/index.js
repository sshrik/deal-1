import $ from '../../../../util/domControll';
import ElementBuilder from '../../../../component/ElementBuilder';
import ChatListItem from './ChatListItem';
import { chattingList } from '../../../../util/tempList';

export default class ChattingList extends ElementBuilder {
  constructor(props) {
    super(props);
  }

  constructElement() {
    const $element = $.create('div').addClass('chatting-list');

    chattingList.forEach((chat) => {
      new ChatListItem({
        ...chat,
        parent: this,
      });
    });

    return $element;
  }
}
