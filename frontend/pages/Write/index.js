import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import WriteContainer from './WriteContainer';
import { commaSerateToPrice } from '../../util/utils';
import './write.css';

export default class Write extends ElementBuilder {
  constructor(props) {
    const { parent, routeTo, router } = props;
    super(props);
    this.router = router;
    this.state = {
      files: [],
      title: '',
      price: '',
      detail: '',
      buttonState: [
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
        'deactive',
      ],
    };
  }

  compareState(prevState, newState) {
    if (prevState.files === newState.files) {
      return false;
    }
    return true;
  }

  setTitle = (newTitle) => {
    this.setState({
      title: newTitle,
      buttonState: this.state.buttonState,
    });
  };

  setDetail = (newDetail) => {
    this.setState({
      detail: newDetail,
    });
  };

  setPrice = (newPrice) => {
    let priceNumber = commaSerateToPrice(newPrice);
    this.setState({
      price: priceNumber,
    });
  };

  setButtonState = (index) => {
    let nowState = this.state.buttonState;
    nowState[index] = nowState[index] === 'deactive' ? 'active' : 'deactive';
    this.setState({ buttonState: nowState });
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
    const newFiles = { files: [...this.state.files] };
    this.setState(newFiles);
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

  constructElement() {
    const { categories } = this.props;
    const $element = $.create('div').addClass('write-container');
    new SubHeader({
      parent: this,
      title: '글쓰기',
      moveHandler: () => this.router.route('main'),
      action: null,
    });
    new WriteContainer({
      ...this.state,
      categories,
      parent: this,
      setTitle: this.setTitle,
      setButtonState: this.setButtonState,
      uploadImgHandler: this.uploadImgHandler,
      deleteImage: this.deleteImage,
      setPrice: this.setPrice,
      setDetail: this.setDetail,
    });
    return $element;
  }
}
