import $ from '../util/domControll';
import icons from '../component/icons';
import Image from '../component/Image';
import '../css/listItem.css';

export default class ListItem {
  constructor($root, isDropdown) {
    this.$root = $root;

    this.render();
  }

  render = () => {
    const $listItem = $.create('div').addClass('list-item');

    // 리스트 아이템 컨텐츠
    const $listItemContent = $.create('div').addClass('list-item__content');
    const $contentTitle = $.create('span')
      .addClass('content__title')
      .setText('파랑선풍기');

    const $contentLocationTime = $.create('div').addClass('content__lo-time')
      .setHTML(`
      <span>역삼동</span>
      <span>두 시간전</span>
    `);

    const $contentPrice = $.create('span')
      .addClass('content__price')
      .setText('1,599,999');

    $listItemContent.appendChild($contentTitle);
    $listItemContent.appendChild($contentLocationTime);
    $listItemContent.append($contentPrice);

    // 리스트 아이템 버튼
    const $listItemActions = $.create('div').addClass('list-item__actions');
    $listItemActions.appendChild(icons.like);
    const $commentContainer = $.create('div').addClass('actions__comments');
    $commentContainer.appendChild(icons.chat);
    $commentContainer.appendChild($.create('span').setText('1'));
    $listItemActions.appendChild($commentContainer);

    $listItem.appendChild(Image('large', '#'));
    $listItem.appendChild($listItemContent);
    $listItem.appendChild($listItemActions);

    this.$root.appendChild($listItem);
  };
}
