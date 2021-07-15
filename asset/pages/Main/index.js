import ElementBuilder from '../../component/ElementBuilder';
import MainHeader from '../../component/MainHeader';
import ListItem from '../../component/ListItem';
import FaB from '../../component/FaB';
import '../../css/main.css';
import $ from '../../util/domControll';

export default class Main extends ElementBuilder {
  constructor(props) {
    const { routeTo, router } = props;
    super(props);
    this.router = router;
    this.routeTo = routeTo;
  }

  moveHandler = (dest) => {
    this.router.route(dest);
  };

  constructElement() {
    const tempData = [
      {
        title: '파랑 선풍기',
        location: '역삼동',
        lastTime: '2',
        price: '24,500원',
        comment: 1,
        like: 0,
        imgSrc: 'blueFan.png',
      },
      {
        title: '빈티지 밀크 글래스 전등',
        location: '역삼동',
        lastTime: '2',
        price: '158,500원',
        comment: 0,
        like: 1,
        imgSrc: 'lamp.png',
      },
      {
        title: '입사귀 포스터',
        location: '역삼동',
        lastTime: '3',
        price: '59,000원',
        comment: 0,
        like: 0,
        imgSrc: 'leaves.png',
      },
      {
        title: '도자기 화병 5종',
        location: '역삼동',
        lastTime: '3',
        price: '14,500원',
        comment: 3,
        like: 10,
        imgSrc: 'poetry.png',
      },
      {
        title: '빈티지 일본 경대',
        location: '역삼동',
        lastTime: '3',
        price: '180,000원',
        comment: 0,
        like: 2,
        imgSrc: 'mirror.png',
      },
      {
        title: '파랑 선풍기',
        location: '역삼동',
        lastTime: '2',
        price: '24,500원',
        comment: 1,
        like: 0,
        imgSrc: 'blueFan.png',
      },
      {
        title: '빈티지 밀크 글래스 전등',
        location: '역삼동',
        lastTime: '2',
        price: '158,500원',
        comment: 0,
        like: 1,
        imgSrc: 'lamp.png',
      },
      {
        title: '입사귀 포스터',
        location: '역삼동',
        lastTime: '3',
        price: '59,000원',
        comment: 0,
        like: 0,
        imgSrc: 'leaves.png',
      },
      {
        title: '도자기 화병 5종',
        location: '역삼동',
        lastTime: '3',
        price: '14,500원',
        comment: 3,
        like: 10,
        imgSrc: 'poetry.png',
      },
      {
        title: '빈티지 일본 경대',
        location: '역삼동',
        lastTime: '3',
        price: '180,000원',
        comment: 0,
        like: 2,
        imgSrc: 'mirror.png',
      },
    ];
    const $element = $.create('div').addClass('main-contianer');
    new MainHeader({
      parent: this,
      moveHandler: this.moveHandler,
    });
    tempData.forEach((element) => {
      new ListItem({
        parent: this,
        title: element.title,
        location: element.location,
        lastTime: element.lastTime,
        price: element.price,
        comment: element.comment,
        like: element.like,
        imgSrc: element.imgSrc,
      });
    });
    new FaB({
      parent: this,
      moveHandler: () => this.moveHandler('write'),
    });

    return $element;
  }
}
