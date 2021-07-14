const animateTime = 500;

export default class Router {
  constructor(root) {
    this.viewStack = [];
    this.nowView = null;
    this.root = root;
    this.screens = {};
  }

  addScreen(screenName, screenObject) {
    this.screens[screenName] = screenObject;
  }

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
    this.nowView.render(true);

    // 사라질 view에 Container 부착.
    fadeOutView.addClass('dest-container');

    // FadeInMotion을 어디서 줄 것인지 결정 ( right 기본, right면 오른쪽 벽으로 들어감. )
    if (viewDisappearLocation === 'right') {
      fadeOutView.addClass('fadeOutRight');
    } else if (viewDisappearLocation === 'left') {
      fadeOutView.addClass('fadeOutLeft');
    }

    // 사라질 view 등록
    fadeOutView.render();

    setTimeout(() => {
      fadeOutView.removeClass('dest-container');
      if (viewDisappearLocation === 'right') {
        fadeOutView.removeClass('fadeOutRight');
      } else if (viewDisappearLocation === 'left') {
        fadeOutView.removeClass('fadeOutLeft');
      }
      this.nowView.render(true);
    }, animateTime);
    return true;
  }

  route(destScreenName, viewEmergeLocation = 'right') {
    // 만약 등록되어있지 않은 Screen이라면 로딩하지 않는다.
    if (Object.prototype.hasOwnProperty.call(this.screens, destScreenName)) {
      const destObject = this.screens[destScreenName];
      if (!destObject.contents) {
        destObject.init();
      }

      // 현재 화면을 nowView에 등록, stack에 넣어줌.
      this.setNowScreenToStack();
      this.setNowView(destObject);

      // App의 상태에 관계없이 불러오기 위해서 dest-container를 사용 ( position을 absolute로 만들어줌 )
      destObject.addClass('dest-container');

      // FadeInMotion을 어디서 줄 것인지 결정 ( right 기본, right면 왼쪽에서 나와 오른쪽으로 감. )
      if (viewEmergeLocation === 'right') {
        destObject.addClass('fadeInRight');
      } else if (viewEmergeLocation === 'left') {
        destObject.addClass('fadeInLeft');
      }
      destObject.render();

      setTimeout(() => {
        destObject.removeClass('dest-container');
        if (viewEmergeLocation === 'right') {
          destObject.removeClass('fadeInRight');
        } else if (viewEmergeLocation === 'left') {
          destObject.removeClass('fadeInLeft');
        }
        destObject.render(true);
      }, animateTime);
    } else {
      console.log('Not Included');
    }
  }
}
