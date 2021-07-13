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

  route(destScreenName) {
    // 만약 등록되어있지 않은 Screen이라면 로딩하지 않는다.
    if (Object.prototype.hasOwnProperty.call(this.screens, destScreenName)) {
      this.screens[destScreenName].render();
    } else {
      console.log('Not Included');
    }
    // 현재 root에 등록되어있는 것을 viewStack의 맨 위로 올리고, dest로 들어온 것을 nowView로 설정한 다음 render 시키면 된다.
    // this.root.classList.add('hidden-view');
    // const destContainer = document.createElement('div');
    // destContainer.classList.add('dest-container');
    // this.root.appendChild(dest);
  }
}
