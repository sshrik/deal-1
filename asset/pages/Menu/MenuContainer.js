import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import '../../css/menu.css';
import SellingList from './Tabs/SellingList';
import ChattingList from './Tabs/ChattingList';
import LikeList from './Tabs/LikeList';

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
    };
  }

  compareState(prevState, newState) {
    if (prevState.curTab === newState.curTab) {
      return false;
    }
    return true;
  }

  tabChangeHandler = (e) => {
    const { target } = e;
    this.setState({ curTab: parseInt(target.id) });
  };

  constructElement() {
    const { curTab } = this.state;
    console.log(curTab);
    const $element = $.create('div').addClass('menu-content-container');
    const $tab = $.create('div').addClass('menu-tab');
    $tab.setHTML(
      tabs
        .map(
          (tab) => `<button class="tablink" id=${tab.id}>${tab.name}</button>`
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
