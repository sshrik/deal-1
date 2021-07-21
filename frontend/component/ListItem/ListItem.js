import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import IconBtns from '../Button/IconButtons';
import Image from '../Image';
import { stringEllipsis } from '../../util/utils';
import api from '../../util/api';
import DropDown from '../DropDown/DropDown';
import './listItem.css';

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
      isOpen: false,
      likeActive: isActive,
      menuItems: [
        {
          id: 1,
          name: '수정하기',
          color: 'black',
          onClick: () => {
            // 수정 페이지 이동
            console.log('수정하기');
          },
        },
        {
          id: 2,
          name: '삭제하기',
          color: 'red',
          onClick: () => {
            // 삭제 로직
            console.log('삭제하기');
          },
        },
      ],
    };
  }

  compareState(prev, next) {
    if (prev.isOpen !== next.isOpen) {
      return true;
    }
    if (prev.isActive !== next.isActive) {
      return true;
    }
    return false;
  }

  handleDropDownOpen = (e) => {
    e.stopPropagation();
    this.setState({ isOpen: true });
  };

  handleDropDownClose = (e) => {
    this.setState({ isOpen: false });
  };

  handleLikeBtnToggle = () => {
    const { isActive } = this.state;
    const { productId } = this.props;
    api
      .fetchPost(
        isActive ? '/api/delete_like_product' : '/api/add_like_product',
        { productId }
      )
      .then((res) => {
        this.setState({ isActive: !isActive });
      })
      .catch((error) => console.log(error));
  };

  constructElement() {
    const { title, lastTime, price, comment, like, area_1, imgSrc, type } =
      this.props;
    const { isOpen, menuItems, isActive } = this.state;
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

    if (type === 'menu') {
      const $dotMenuBtn = $.create('button')
        .addClass('dot-menu')
        .setHTML(IconBtns.dotMenu);
      $listItemActions.addElement($dotMenuBtn);
      window.addEventListener('click', this.handleDropDownClose);
      $dotMenuBtn.addEventListener('click', (e) => {
        if (isOpen) {
          this.handleDropDownClose(e);
        } else {
          this.handleDropDownOpen(e);
        }
      });
      new DropDown({
        parent: this,
        isOpen,
        dropDownInfo: menuItems,
        onClose: this.handleDropDownClose,
        position: { top: '50px', right: '20px' },
      });
    } else {
      const $likeBtn = IconBtns.like().addClass(
        isActive ? 'active' : 'deactive'
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
      .addElement(Image('large', `http://localhost:3000/${imgSrc}`))
      .addElement($listItemContent)
      .addElement($listItemActions)
      .addElement($bottomIconInfoContainer);
    $listItem.addEventListener('click', this.props.onClick);

    return $listItem;
  }
}
