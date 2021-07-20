import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import WriteContainer from './WriteContainer';
import IconButtons from '../../component/Button/IconButtons';
import { commaSerateToPrice } from '../../util/utils';
import './write.css';
import api from '../../util/api';

export default class Write extends ElementBuilder {
  constructor(props) {
    const { parent, routeTo, router, categories } = props;
    super(props);
    this.router = router;
    this.state = {
      files: [],
      curFocus: '',
      title: '',
      price: '',
      detail: '',
      sendActive: false,
      buttonState: new Array(categories.length).fill('deactive'),
    };
  }

  compareState(prevState, newState) {
    return true;
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
    } else {
      this.setState({ sendActive: false });
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
    let nowState = this.state.buttonState;
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
    });
  };

  handleSubmitBtnClick = () => {
    const { sendActive, title, price, detail, files, buttonState } = this.state;
    if (sendActive) {
      const activeBtn = buttonState.indexOf('active') + 1;
      api
        .fetchPost('/api/add_product', {
          title,
          price,
          detail,
          files,
          category: activeBtn,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    }
  };

  constructElement() {
    const { categories } = this.props;
    const { sendActive } = this.state;
    const $element = $.create('div').addClass('write-container');

    const $checkBtn = $.create('button')
      .addClass('check-button', sendActive ? 'active' : 'deactive')
      .setHTML(IconButtons.check);
    $checkBtn.addEventListener('click', this.handleSubmitBtnClick);

    new SubHeader({
      parent: this,
      title: '글쓰기',
      moveHandler: () => this.router.route('main'),
      action: $checkBtn,
    });
    new WriteContainer({
      ...this.state,
      categories,
      parent: this,
      setButtonState: this.setButtonState,
      uploadImgHandler: this.uploadImgHandler,
      deleteImage: this.deleteImage,
      onChange: this.handleInputChange,
      onFocus: this.handleFocusChange,
    });
    return $element;
  }
}
