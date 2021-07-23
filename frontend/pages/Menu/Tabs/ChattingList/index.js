import $ from '../../../../util/domControll';
import ElementBuilder from '../../../../lib/ElementBuilder';
import ChatListItem from './ChatListItem';
import api from '../../../../util/api';

export default class ChattingList extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      roomId: [],
      roomInfo: [],
      fetchedId: [],
    };
    api
      .fetchPost('/auth/chat/get_my_room', {
        userName: this.props.router.globalState.userName,
      })
      .then((res) => {
        res.data.forEach((element, index) => {
          api
            .fetchPost('/auth/chat/get_room_info', {
              roomId: element.id,
            })
            .then((res) => {
              console.log(res.data);
              const newRoomInfo = [...this.state.roomInfo];
              const newIdInfo = [...this.state.roomId];
              newRoomInfo.push(...res.data);
              newIdInfo.push(element.id);
              this.setState({ roomId: newIdInfo, roomInfo: newRoomInfo });
            });
        });
      });
  }

  compareState(prevState, nowState) {
    if (prevState.roomId.length !== nowState.roomId.length) return true;
    if (prevState.roomInfo.length !== nowState.roomInfo.length) return true;
    return false;
  }

  constructElement() {
    const $element = $.create('div').addClass('chatting-list');
    this.state.roomInfo.forEach((chat, index) => {
      new ChatListItem({
        sender: this.props.router.globalState.userName,
        lastMsg: '',
        isCheck: true,
        timeStemp: 4,
        imgSrc: chat.imgSrc,
        unChecked: 3,
        router: this.props.router,
        sellerName: chat.sellerName,
        title: chat.title,
        price: chat.price,
        nowSelling: chat.nowSelling,
        productId: chat.id,
        roomId: this.state.roomId[index],
        ...this.props,
        parent: this,
      });
    });

    return $element;
  }
}
