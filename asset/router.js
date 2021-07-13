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

  goBack() {
    this.nowView = this.viewStack[this.viewStack.length - 1];
    this.nowView.render();
  }

  route(destScreenName, viewEmergeLocation = 'right') {
    // 만약 등록되어있지 않은 Screen이라면 로딩하지 않는다.
    if (Object.prototype.hasOwnProperty.call(this.screens, destScreenName)) {
      console.log(this.viewStack);
      const destObject = this.screens[destScreenName];
      if (!destObject.contents) {
        destObject.init();
      }
      const dest = destObject.contents;

      // 현재 화면을 nowView에 등록, stack에 넣어줌.
      this.setNowScreenToStack();
      this.setNowView(destObject);

      // App의 상태에 관계없이 불러오기 위해서 dest-container를 사용 ( position을 absolute로 만들어줌 )
      dest.classList.add('dest-container');

      // FadeInMotion을 어디서 줄 것인지 결정 ( right 기본, right면 왼쪽에서 나와 오른쪽으로 감. )
      if (viewEmergeLocation === 'right') {
        dest.classList.add('fadeInRight');
      } else if (viewEmergeLocation === 'left') {
        dest.classList.add('fadeInLeft');
      }
      this.root.appendChild(dest);

      setTimeout(() => {
        dest.classList.remove('dest-container');
        destObject.render();
      }, 500);
    } else {
      console.log('Not Included');
    }
  }
}
