export default class ElementBuilder {
  constructor(props) {
    if (!props.parent) {
      throw new Error(
        '[ElementBuilder] : props key error - props need parent key for appendChild this.'
      );
    }
    this.isPageElement = true;
    this.parent = props.parent;
    this.props = props;
    this.scrolled = 0;
    this.child = [];
    this.usingScroll = false;

    if (this.parent.isPageElement) {
      this.parent.appendChild(this);
    } else {
      // 부모가 pageElement가 아닌 경우는 수행하지 않습니다.
    }
  }

  useScroll() {
    this.usingScroll = true;
  }

  setScrolledEvent() {
    const $container = this.getContentsElement();
    $container.addEventListener('scroll', (e) => {
      if (e.target.scrollTop !== 0) {
        // ScrollTop 설정시 일어나는 scroll
        this.scrolled = e.target.scrollTop;
      }
    });
  }

  pageScroll() {
    if (this.usingScroll) this.getContentsElement().scrollTop = this.scrolled;
  }

  getScrollHeight() {
    return this.scrolled;
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
    return this.contents !== undefined;
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
      this.update();
    }
    this.componentDidUpdate();
    this.child.forEach((element) => {
      // container state = prev, new
      element.setState();
    });
  }

  compareState(prevState, newState) {
    return false;
  }

  regenerateContents() {
    this.clear();
    this.init();
    this.child.forEach((element) => {
      element.render();
    });

    return this.getContentsElement();
  }

  update() {
    // 기존의 값을 가져옴 ( $contents )
    const $contents = this.getContentsElement();

    // 부모가 root인지 혹은 ElementBuilder인지 확인하여 HTMLElement를 가져옴.
    let parentDOMElement;
    if (this.parent.isPageElement) {
      parentDOMElement = this.parent.getContentsElement();
      // 현재 자신이 부모의 몇번째 자식인지 확인.
      const $parentChild = parentDOMElement.childNodes;
      const $childNodes = [];

      [...$parentChild].forEach((element) => {
        if (element === $contents) {
          $childNodes.push(-1);
        } else {
          $childNodes.push(element);
        }
      });

      // 부모 노드를 비워줌.
      while (parentDOMElement.hasChildNodes()) {
        parentDOMElement.removeChild(parentDOMElement.firstChild);
      }

      // 자신의 위치에 자기 자신을 넣어줌.
      $childNodes.forEach((element) => {
        if (element === -1) {
          parentDOMElement.appendChild(this.regenerateContents());
        } else {
          parentDOMElement.appendChild(element);
        }
      });
    } else {
      // 만약 ElementBuilder의 자손이 아니라면 전부 regenerate.
      parentDOMElement = this.parent;
      while (parentDOMElement.hasChildNodes()) {
        parentDOMElement.removeChild(parentDOMElement.firstChild);
      }
      parentDOMElement.appendChild(this.regenerateContents());
    }
  }

  componentDidUpdate() {
    // Update가 호출된 경우 실행
  }

  componentDidMount() {
    // Render가 호출 된 이후 한번만 실행
  }

  afterRender() {
    if (!this.isMount) {
      this.isMount = true;
      this.componentDidMount();
    }
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
      while (this.parent.hasChildNodes()) {
        this.parent.removeChild(this.parent.firstChild);
      }
    }
    // 루트 노드의 맨 마지막에 자신을 추가해줍니다.
    DOMDestParent.appendChild(this.getContentsElement());
    if (this.usingScroll) {
      this.pageScroll();
      this.setScrolledEvent();
    }

    this.afterRender();
  }
}
