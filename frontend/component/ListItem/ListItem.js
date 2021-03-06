import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import IconBtns from '../Button/IconButtons';
import Image from '../Image';
import { priceCommaSeperator } from '../../util/utils';
import { stringEllipsis } from '../../util/utils';
import api from '../../util/api';
import DropDown from '../DropDown/DropDown';

import './listItem.css';

import { ADDR } from '../../constant/urls';

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
  constructor(props) {
    super(props);
    const { isActive } = this.props;
    this.state = {
      likeActive: isActive,
    };
  }

  compareState(prev, next) {
    if (prev.isOpen !== next.isOpen) {
      return true;
    }
    if (prev.likeActive !== next.likeActive) {
      return true;
    }
    return false;
  }

  handleLikeBtnToggle = (e) => {
    e.stopPropagation();
    const { likeActive } = this.state;
    const { productId, onClickAction } = this.props;
    api
      .fetchPost(
        likeActive ? '/auth/delete_like_product' : '/auth/add_like_product',
        {
          productId,
        }
      )
      .then((res) => {
        this.setState({ likeActive: !likeActive });
        if (onClickAction) {
          onClickAction(productId);
        }
      })
      .catch((error) => this.props.onAlert(error));
  };

  constructElement() {
    const {
      title,
      uploadTime,
      price,
      comment,
      like,
      area_1,
      imgSrc,
      type,
      menuItems,
      onToggleDropDown,
      isOpen,
    } = this.props;
    const { likeActive } = this.state;
    const $listItem = $.create('div').addClass('list-item');

    // 리스트 아이템 컨텐츠
    const $listItemContent = $.create('div').addClass('list-item__content');
    const $contentTitle = $.create('span')
      .addClass('content__title')
      .setText(stringEllipsis(title));

    const $contentLocationTime = $.create('div').addClass('content__lo-time')
      .setHTML(`
      <span>${area_1}</span>
      <span>${uploadTime} 전</span>
    `);

    const $contentPrice = $.create('span')
      .addClass('content__price')
      .setText(priceCommaSeperator(String(price)));

    $listItemContent
      .addElement($contentTitle)
      .addElement($contentLocationTime)
      .addElement($contentPrice);

    // 리스트 아이템 버튼
    const $listItemActions = $.create('div').addClass('list-item__actions');

    if (type === 'menu') {
      const $dotMenuBtn = $.create('button')
        .addClass('dot-menu')
        .setHTML(IconBtns.dotMenu);
      $listItemActions.addElement($dotMenuBtn);
      $dotMenuBtn.addEventListener('click', onToggleDropDown);
      new DropDown({
        parent: this,
        isOpen,
        dropDownInfo: menuItems,
        onClose: onToggleDropDown,
        position: { top: '50px', right: '20px' },
      });
    } else {
      const $likeBtn = IconBtns.like().addClass(
        likeActive ? 'active' : 'deactive'
      );
      $likeBtn.addEventListener('click', this.handleLikeBtnToggle);
      $listItemActions.appendChild($likeBtn);
    }

    const $bottomIconInfoContainer = $.create('div').addClass(
      'list-item--bottom-info__container'
    );
    comment > 0 && $bottomIconInfoContainer.appendChild(Comment(comment));
    like > 0 && $bottomIconInfoContainer.appendChild(Like(like));

    $listItem
      .addElement(Image('large', `http://${ADDR}/${imgSrc}`))
      .addElement($listItemContent)
      .addElement($listItemActions)
      .addElement($bottomIconInfoContainer);
    $listItem.addEventListener('click', this.props.onClick);

    return $listItem;
  }
}
