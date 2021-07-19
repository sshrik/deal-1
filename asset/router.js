import $ from './util/domControll';

const animateTime = 500;

export default class Router {
  constructor(root) {
    this.viewStack = [];
    this.nowView = null;
    this.root = root;
    this.screens = {};
    this.globalState = {};
  }

  // screenObject [ElementBuidler]
  addScreen(screenName, screenObject) {
    this.screens[screenName] = screenObject;
  }

  // screenObject [ElementBuidler]
  setNowView(nowView) {
    this.nowView = nowView;
  }

  setNowScreenToStack() {
    this.viewStack.push(this.nowView);
  }

  back(viewDisappearLocation = 'right') {
    // 뒤가 없으면 종료
    if (this.viewStack.length === 0) {
      return false;
    }

    // 뒤로가기 Stack 관리
    const fadeOutView = this.nowView;
    this.nowView = this.viewStack.pop();

    // 화면에 보여야 할 App을 등록( nowView 가 보여야 함)
    this.nowView.render({ clearAll: true });

    // 사라질 view에 Container 부착.
    // FadeInMotion을 어디서 줄 것인지 결정 ( right 기본, right면 오른쪽 벽으로 들어감. )
    const animationContainer = $.create('div').addClass('dest-container');
    animationContainer.appendChild(fadeOutView.getContentsElement());
    // 사라질 view 등록
    this.root.appendChild(animationContainer);

    if (viewDisappearLocation === 'right') {
      animationContainer.addClass('fadeOutRight');
    } else if (viewDisappearLocation === 'left') {
      animationContainer.addClass('fadeOutLeft');
    }

    setTimeout(() => {
      this.nowView.render({ clearAll: true });
    }, animateTime);
    return true;
  }

  route(destScreenName, viewEmergeLocation = 'right') {
    // 만약 등록되어있지 않은 Screen이라면 로딩하지 않는다.
    if (Object.prototype.hasOwnProperty.call(this.screens, destScreenName)) {
      const destObject = this.screens[destScreenName];

      const $nowViewContainer = $.create('div').addClass('dest-container');
      console.log(destObject.getScrollHeight());
      const $emptyDiv = $.create('div');
      $emptyDiv.setAttribute(
        'style',
        `display:box;width:100%;height:${destObject.getScrollHeight()}px`
      );
      $nowViewContainer.appendChild($emptyDiv);
      console.log($emptyDiv);
      console.log($nowViewContainer);
      $nowViewContainer.appendChild(this.nowView.getContentsElement());
      this.root.appendChild($nowViewContainer);

      if (!destObject.isInited()) {
        destObject.render();
      }

      // 현재 화면을 nowView에 등록, stack에 넣어줌.
      this.setNowScreenToStack();
      this.setNowView(destObject);

      // App의 상태에 관계없이 불러오기 위해서 dest-container를 사용 ( position을 absolute로 만들어줌 )
      const animationContainer = $.create('div').addClass('dest-container');
      animationContainer.appendChild(destObject.getContentsElement());
      this.root.appendChild(animationContainer);

      // FadeInMotion을 어디서 줄 것인지 결정 ( right 기본, right면 왼쪽에서 나와 오른쪽으로 감. )
      if (viewEmergeLocation === 'right') {
        animationContainer.addClass('fadeInRight');
      } else if (viewEmergeLocation === 'left') {
        animationContainer.addClass('fadeInLeft');
      }

      // Page가 다시 돌아오면 Page를 Scroll 해 준다.
      destObject.pageScroll();
      setTimeout(() => {
        destObject.render({ clearAll: true });
      }, animateTime);
    } else {
      console.log('Not Included');
    }
  }
}
