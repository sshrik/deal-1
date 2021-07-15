export default class ElementBuilder {
  constructor(props) {
    if (!props.parent) {
      throw new Error(
        '[ElementBuilder] : props key error - props need parent key for appendChild this.'
      );
    }
    this.isPageElement = true;
    this.parent = props.parent;
    this.child = [];

    if (this.parent.isPageElement) {
      this.parent.appendChild(this);
    } else {
      // 부모가 pageElement가 아닌 경우는 수행하지 않습니다.
    }
  }

  init() {
    const $element = this.constructElement();
    this.setContents($element);
  }

  constructElement() {
    throw new Error('[ElementBuilder] : ConstructElement is not emplemented.');
  }

  setContents(elements) {
    this.contents = elements;
  }

  isInited() {
    return this.contents === false;
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

  clear() {
    this.contents = null;
    this.child.forEach((element) => {
      element.clear();
    });
    this.child = [];
  }

  getContentsElement() {
    if (!this.contents) this.init();
    return this.contents;
  }

  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    if (this.compareState(prevState, this.state)) {
      this.clear();
      this.render({ clearAll: true });
    }
  }

  compareState(prevState, newState) {
    return false;
  }

  render(option = {}) {
    // init() 이 한번도 안됐다면 init 해주기 -> 내용이 바뀐게 있어도 init() 하며 바꿔주기
    if (!this.contents) {
      this.init();
    }

    // 하위 element의 rendering 시작. 재귀적으로 호출하여 BFS의 형태로 Rendering 합니다.
    this.child.forEach((element) => {
      element.render();
    });

    // 만약 PageElement라면 실제 Element인 contents를 가지고 작업합니다.
    let DOMDestParent = null;
    if (this.parent.isPageElement) {
      DOMDestParent = this.parent.getContentsElement();
    } else {
      DOMDestParent = this.parent;
    }

    // 만약 App 하나만 달고 싶다면 clearAll 을 설정해줍니다. 다만 맨 윗 node에서 호출할 때만 사용됩니다. ( Page 단위로만.. )
    if (option.clearAll) {
      DOMDestParent.innerHTML = '';
    }
    // 루트 노드의 맨 마지막에 자신을 추가해줍니다.
    DOMDestParent.appendChild(this.getContentsElement());
  }
}
