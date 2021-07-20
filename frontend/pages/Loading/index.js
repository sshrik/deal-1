import ElementBuilder from '../../lib/ElementBuilder';
import LoadingModal from '../../component/Modal/LoadingModal';
import $ from '../../util/domControll';
import api from '../../util/api';
import './loading.css';

export default class Main extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
  }

  checkAnimationEnd(animationStartTime, waitTime, next, timeInterval = 100) {
    let nowTime = new Date().getTime();

    // 만약 에니메이션 시간이 지나지 않았으면 timeInterval 만큼 기다린 다음 다시 자긴을 수행.
    if (nowTime - animationStartTime < waitTime) {
      setTimeout((e) => {
        this.checkAnimationEnd(
          animationStartTime,
          waitTime,
          next,
          timeInterval
        );
      }, timeInterval);
    } else {
      next();
    }
  }

  constructElement() {
    const $element = $.create('div').addClass('loading-contianer');

    let animationStartTime = new Date().getTime();
    new LoadingModal({
      parent: this,
    });

    api
      .fetchGet('/products')
      .then((res) => {
        this.checkAnimationEnd(animationStartTime, 1800, () => {
          this.router.route(this.routeTo, {
            props: {
              products: [...res],
            },
          });
        });
      })
      .catch((error) => console.log(error));

    return $element;
  }
}
