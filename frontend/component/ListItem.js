import $ from '../util/domControll';
import ElementBuilder from '../lib/ElementBuilder';
import IconBtns from './Button/IconButtons';
import Image from './Image';
import { stringEllipsis } from '../util/utils';
import '../css/listItem.css';

function Comment(comment) {
  return $.create('div').addClass('actions__comments').setHTML(`
    <div class="actions__comments">
      ${IconBtns.chat().innerHTML}
      <span>${comment}</span>
    </div>
    `);
}

function Like(like) {
  return $.create('div').addClass('actions__comments').setHTML(`
        <img src="like__small.png"/>
        <span>${like}</span>
      `);
}

export default class ListItem extends ElementBuilder {
  constructElement() {
    console.log(this.props);
    const { title, lastTime, price, comment, like, area_1, imgSrc } =
      this.props;
    const $listItem = $.create('div').addClass('list-item');

    // 리스트 아이템 컨텐츠
    const $listItemContent = $.create('div').addClass('list-item__content');
    const $contentTitle = $.create('span')
      .addClass('content__title')
      .setText(stringEllipsis(title));

    const $contentLocationTime = $.create('div').addClass('content__lo-time')
      .setHTML(`
      <span>${area_1}</span>
      <span>${lastTime}시간 전</span>
    `);

    const $contentPrice = $.create('span')
      .addClass('content__price')
      .setText(price);

    $listItemContent
      .addElement($contentTitle)
      .addElement($contentLocationTime)
      .addElement($contentPrice);

    // 리스트 아이템 버튼
    const $listItemActions = $.create('div').addClass('list-item__actions');
    $listItemActions.appendChild(IconBtns.like());

    const $bottomIconInfoContainer = $.create('div').addClass(
      'list-item--bottom-info__container'
    );
    comment > 0 && $bottomIconInfoContainer.appendChild(Comment(comment));
    like > 0 && $bottomIconInfoContainer.appendChild(Like(like));

    $listItem
      .addElement(Image('large', `http://localhost:3000/${imgSrc}`))
      .addElement($listItemContent)
      .addElement($listItemActions)
      .addElement($bottomIconInfoContainer);
    $listItem.addEventListener('click', this.props.onClick);

    return $listItem;
  }
}
