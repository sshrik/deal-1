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

  route(destScreenName) {
    // 만약 등록되어있지 않은 Screen이라면 로딩하지 않는다.
    if (Object.prototype.hasOwnProperty.call(this.screens, destScreenName)) {
      const destObject = this.screens[destScreenName];
      if (!destObject.contents) {
        destObject.init();
      }
      const dest = destObject.contents;

      this.setNowScreenToStack();
      this.setNowView(destObject);

      dest.classList.add('dest-container');
      this.root.appendChild(dest);

      setTimeout(() => {
        destObject.render();
      }, 500);
    } else {
      console.log('Not Included');
    }
  }
}
