import $ from '../../util/domControll';
import {
  priceCommaSeperator,
  numberChecker,
  commaSerateToPrice,
} from '../../util/utils';
import ElementBuilder from '../../lib/ElementBuilder';
import ImageUploader from './ImageUploader';
import TitleTextInput from './TitleTextInput';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import DivLine from './DivLine';
import WriteBottomFotter from './WriteBottomFotter';
import './write.css';

export default class WriteContainer extends ElementBuilder {
  constructor(props) {
    super(props);
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
    this.uploadImgHandler = this.uploadImgHandler.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setDetail = this.setDetail.bind(this);
    this.setButtonState = this.setButtonState.bind(this);
  }

  compareState(prevState, newState) {
    if (prevState.files === newState.files) {
      return false;
    }
    return true;
  }

  setTitle(newTitle) {
    this.setState({
      title: newTitle,
      buttonState: this.state.buttonState,
    });
  }

  setDetail(newDetail) {
    this.setState({
      detail: newDetail,
    });
  }

  setPrice(newPrice) {
    let priceNumber = commaSerateToPrice(newPrice);
    this.setState({
      price: priceNumber,
    });
  }

  setButtonState(index) {
    let nowState = this.state.buttonState;
    nowState[index] = nowState[index] === 'deactive' ? 'active' : 'deactive';
    this.setState({ buttonState: nowState });
  }

  readImageFile(imgFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(imgFile);
    });
  }

  deleteImage(index) {
    this.state.files.splice(index, 1);
    const newFiles = { files: [...this.state.files] };
    this.setState(newFiles);
  }

  uploadImgHandler({ target }) {
    this.readImageFile(target.files[0]).then((res) => {
      if (this.state.files.length >= 10) {
        console.log('over 10');
      } else {
        const newFiles = { files: [...this.state.files, res] };
        this.setState(newFiles);
      }
    });
  }

  constructElement() {
    const $element = $.create('div').addClass('write-content-container');

    new ImageUploader({
      parent: this,
      files: this.state.files,
      addImgHandler: this.uploadImgHandler,
      deleteImage: this.deleteImage,
    });
    new DivLine({
      parent: this,
    });
    new TitleTextInput({
      parent: this,
      value: this.state.title,
      id: 'write-header',
      onInput: this.setTitle,
      setButtonState: this.setButtonState,
      buttonState: this.state.buttonState,
    });
    new DivLine({
      parent: this,
    });
    new TextInput({
      parent: this,
      placeholder: '₩ 가격(선택사항)',
      id: 'write-price',
      value: this.state.price,
      valueSetter: priceCommaSeperator,
      valueChecker: numberChecker,
      dismissValue: '$0',
      onInput: this.setPrice,
    });
    new DivLine({
      parent: this,
    });
    new TextAreaInput({
      parent: this,
      value: this.state.detail,
      placeholder: '게시글 내용을 작성해주세요',
      onInput: this.setDetail,
    });

    new WriteBottomFotter({
      parent: this,
      locationText: '역삼사오육동',
    });
    return $element;
  }
}
