import $ from '../util/domControll';
import ElementBuilder from './ElementBuilder';
import icons from './icons';
import Image from './Image';
import '../css/listItem.css';

export default class ListItem extends ElementBuilder {
  setTitle(title) {
    if (title.length > 8) {
      return `${title.substring(0, 8)}...`;
    }
    return title;
  }

  constructElement() {
    const { title, location, lastTime, price, comment, like, imgSrc } =
      this.props;
    const $listItem = $.create('div').addClass('list-item');

    // 리스트 아이템 컨텐츠
    const $listItemContent = $.create('div').addClass('list-item__content');
    const $contentTitle = $.create('span')
      .addClass('content__title')
      .setText(this.setTitle(title));

    const $contentLocationTime = $.create('div').addClass('content__lo-time')
      .setHTML(`
      <span>${location}</span>
      <span>${lastTime}시간 전</span>
    `);

    const $contentPrice = $.create('span')
      .addClass('content__price')
      .setText(price);

    $listItemContent.appendChild($contentTitle);
    $listItemContent.appendChild($contentLocationTime);
    $listItemContent.append($contentPrice);

    // 리스트 아이템 버튼
    const $listItemActions = $.create('div').addClass('list-item__actions');
    $listItemActions.appendChild(icons.like());

    const $bottomIconInfoContainer = $.create('div').addClass(
      'list-item--bottom-info__container'
    );
    if (comment > 0) {
      const $commentContainer = $.create('div').addClass('actions__comments');
      $commentContainer.appendChild(icons.chat());
      $commentContainer.appendChild($.create('span').setText(comment));
      $bottomIconInfoContainer.appendChild($commentContainer);
    }
    if (like > 0) {
      const $likeContainer = $.create('div').addClass('actions__comments');
      const $likeButton = $.create('img');
      $likeButton.src = 'like__small.png';
      $likeContainer.appendChild($likeButton);
      $likeContainer.appendChild($.create('span').setText(like));
      $bottomIconInfoContainer.appendChild($likeContainer);
    }

    $listItem.appendChild(Image('large', imgSrc));
    $listItem.appendChild($listItemContent);
    $listItem.appendChild($listItemActions);
    $listItem.appendChild($bottomIconInfoContainer);

    return $listItem;
  }
}
