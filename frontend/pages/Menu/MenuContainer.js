import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';
import SellingList from './Tabs/SellingList';
import ChattingList from './Tabs/ChattingList';
import LikeList from './Tabs/LikeList';
import api from '../../util/api';

const tabs = [
  { id: 1, name: '판매목록' },
  { id: 2, name: '채팅' },
  { id: 3, name: '관심목록' },
];

export default class MenuContainer extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      curTab: 1,
      sellingList: [],
    };
  }

  compareState(prevState, newState) {
    return true;
  }

  resetTabActivation = (target) => {
    const $tabs = target.parentElement.children;
    [...$tabs].forEach((tabBtn) => tabBtn.removeClass('active'));
  };

  tabChangeHandler = (e) => {
    const { target } = e;
    if (target.tagName === 'BUTTON') {
      this.resetTabActivation(target);
      this.setState({ curTab: parseInt(target.id) });
    }
  };

  constructElement() {
    const { curTab } = this.state;
    const $element = $.create('div').addClass('menu-content-container');
    const $tab = $.create('div').addClass('menu-tab');
    $tab.setHTML(
      tabs
        .map(
          (tab, idx) =>
            `<button class="tablink ${idx + 1 === curTab ? 'active' : ''}" id=${
              tab.id
            }>${tab.name}</button>`
        )
        .join('')
    );
    $tab.addEventListener('click', this.tabChangeHandler);
    $element.appendChild($tab);

    if (curTab === 1) {
      new SellingList({
        parent: this,
      });
    } else if (curTab === 2) {
      new ChattingList({
        ...this.props,
        parent: this,
      });
    } else if (curTab === 3) {
      new LikeList({
        parent: this,
      });
    }

    return $element;
  }
}
