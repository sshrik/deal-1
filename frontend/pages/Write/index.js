import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import WriteContainer from './WriteContainer';
import IconButtons from '../../component/Button/IconButtons';
import { commaSerateToPrice } from '../../util/utils';
import Alert from '../../component/Modal/Alert';
import './write.css';
import api from '../../util/api';

export default class Write extends ElementBuilder {
  constructor(props) {
    const { parent, routeTo, router, categories } = props;
    super(props);
    this.router = router;
    this.state = {
      files: [],
      title: '',
      price: '',
      detail: '',
      sendActive: false,
      buttonState: [],
      categories: [],
    };
    this.fetchCategory();
    this.fetchProductData();
  }

  fetchCategory = () => {
    api
      .fetchGet('/categories')
      .then((res) => {
        console.log(res);
        const categories = res.data;
        this.setState({
          buttonState: new Array(categories.length).fill('deactive'),
          categories,
        });
      })
      .catch((error) => console.log(error));
  };

  fetchProductData = () => {
    const { type, productId } = this.props;
    if (type === 'modify') {
      api
        .fetchGet(`/auth/product/${productId}`)
        .then((res) => {
          console.log(res.data);
          const { title, detail, price, category, imgSrc } = res.data;
          const newBtnState = [...this.state.buttonState];
          newBtnState[category - 1] = 'active';
          this.setState({
            files: imgSrc,
            title,
            detail,
            price,
            buttonState: newBtnState,
          });
          this.canSubmit();
        })
        .catch((error) => console.log(error));
    }
  };

  compareState(prevState, newState) {
    if (prevState.files !== newState.files) {
      return true;
    }
    if (prevState.categories !== newState.categories) {
      return true;
    }
    return false;
  }

  canSubmit = () => {
    let isSubmit = true;
    const { files, title, price, detail, buttonState } = this.state;
    if (title === '' || price === '' || detail === '') {
      isSubmit = false;
    }
    if (files.length === 0) {
      isSubmit = false;
    }
    if (!buttonState.some((status) => status === 'active')) {
      isSubmit = false;
    }

    if (isSubmit) {
      this.setState({ sendActive: true });
      this.$checkBtn.removeClass('deactive').addClass('active');
    } else {
      this.setState({ sendActive: false });
      this.$checkBtn.removeClass('active').addClass('deactive');
    }
  };

  handleInputChange = ({ target }) => {
    const { buttonState } = this.state;
    if (target.id === 'title') {
      this.setState({
        title: target.value,
        buttonState,
      });
    } else if (target.id === 'detail') {
      this.setState({
        detail: target.value,
      });
    } else if (target.id === 'price') {
      this.setState({
        price: commaSerateToPrice(target.value),
      });
    }

    this.canSubmit();
  };

  handleFocusChange = ({ target }) => {
    this.setState({ curFocus: target.id });
  };

  setButtonState = (index) => {
    const nowState = [...this.state.buttonState];
    nowState[index] = nowState[index] === 'deactive' ? 'active' : 'deactive';
    this.setState({ buttonState: nowState });
    this.canSubmit();
  };

  readImageFile = (imgFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(imgFile);
    });
  };

  deleteImage = (index) => {
    this.state.files.splice(index, 1);
    this.setState({ files: [...this.state.files] });
    this.canSubmit();
  };

  uploadImgHandler = ({ target }) => {
    this.readImageFile(target.files[0]).then((res) => {
      if (this.state.files.length >= 10) {
        console.log('over 10');
      } else {
        const newFiles = { files: [...this.state.files, res] };
        this.setState(newFiles);
      }
      this.canSubmit();
    });
  };

  showAlert = (error, callback) => {
    const $alert = new Alert({
      parent: this.parent,
      titleText: error,
      proceedText: '확인',
      onProceed: (e) => {
        this.getContentsElement().removeChild($alert.getContentsElement());
        callback();
      },
    });
    this.getContentsElement().appendChild($alert.getContentsElement());
  };

  handleSubmitBtnClick = () => {
    const { sendActive, title, price, detail, files, buttonState } = this.state;
    const { type, productId, router, routeTo } = this.props;
    if (sendActive) {
      const activeBtn = buttonState.indexOf('active') + 1;
      api
        .fetchPost(
          type === 'modify'
            ? `/auth/update_product/${productId}`
            : '/auth/add_product',
          {
            title,
            price,
            detail,
            files,
            category: activeBtn,
          }
        )
        .then((res) => {
          console.log(res);
          this.showAlert('등록했습니다.', () => router.route(routeTo));
        })
        .catch((error) => console.log(error));
    }
  };

  constructElement() {
    // const { categories } = this.props;
    const { sendActive, categories } = this.state;
    const { routeTo } = this.props;
    const $element = $.create('div').addClass('write-container');

    this.$checkBtn = $.create('button')
      .addClass('check-button', 'deactive')
      .setHTML(IconButtons.check);
    this.$checkBtn.addEventListener('click', this.handleSubmitBtnClick);

    new SubHeader({
      parent: this,
      title: '글쓰기',
      moveHandler: () => this.router.route(routeTo),
      action: this.$checkBtn,
    });
    new WriteContainer({
      ...this.state,
      categories,
      parent: this,
      setButtonState: this.setButtonState,
      uploadImgHandler: this.uploadImgHandler,
      deleteImage: this.deleteImage,
      onChange: this.handleInputChange,
      // onFocus: this.handleFocusChange,
    });
    return $element;
  }
}
