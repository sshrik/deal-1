export default class ElementBuilder {
  constructor(parent) {
    this.isPageElement = true;
    this.parent = parent;
    this.child = [];

    if (this.parent.isPageElement) {
      this.parent.appendChild(this);
    } else {
      // 부모가 pageElement가 아닌 경우는 수행하지 않습니다.
    }
  }

  init() {
    this.contents = document.createElement();
  }

  addClassToContainer(className) {
    this.contents.classList.add(className);
  }

  removeClassToContainer(className) {
    this.contents.classList.remove(className);
  }

  toggleClassToContainer(className) {
    this.contents.classList.toggle(className);
  }

  appendChild(target) {
    this.child.push(target);
  }

  render(clearAll = false) {
    // init() 이 한번도 안됐다면 init 해주기
    if (!this.contents) {
      this.init();
    }

    // 하위 element의 rendering 시작. 재귀적으로 호출하여 DFS의 형태로 Rendering 합니다.
    this.child.forEach((element) => {
      element.render();
    });

    // 만약 PageElement라면 실제 Element인 contents를 가지고 작업합니다.
    let DOMDestParent = null;
    if (this.parent.isPageElement) {
      DOMDestParent = this.parent.contents;
    } else {
      DOMDestParent = this.parent;
    }

    // 만약 App 하나만 달고 싶다면 clearAll 을 설정해줍니다. 다만 맨 윗 node에서 호출할 때만 사용됩니다. ( Page 단위로만.. )
    if (clearAll) {
      DOMDestParent.innerHTML = '';
    }
    // 루트 노드의 맨 마지막에 자신을 추가해줍니다.
    DOMDestParent.appendChild(this.contents);
  }
}
