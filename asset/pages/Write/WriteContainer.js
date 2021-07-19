import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import ImageUploader from './ImageUploader';
import TitleTextInput from '../../component/TitleTextInput';
import TextInput from '../../component/TextInput';
import TextAreaInput from '../../component/TextAreaInput';
import DivLine from '../../component/DivLine';
import WriteBottomFotter from '../../component/WriteBottomFotter';
import '../../css/write.css';

export default class WriteContainer extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.uploadImgHandler = this.uploadImgHandler.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  compareState(prevState, newState) {
    if (prevState.files === newState.files) {
      return false;
    }
    return true;
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
      id: 'write-header',
    });
    new DivLine({
      parent: this,
    });
    new TextInput({
      parent: this,
      placeholder: '₩ 가격(선택사항)',
      id: 'write-price',
      valueSetter: (value) => {
        let formatedText = '';
        let remainText = value;
        if (!value.startsWith('$')) {
          formatedText = '$';
        } else {
          remainText = remainText.substring(1);
        }
        formatedText += Number(remainText).toLocaleString('en');
        return formatedText;
      },
      valueChecker: (value) => {
        let numberString = '';
        for (let i = 0; i < value.length; i++) {
          if (!value[i].match(/[^0-9]/)) {
            numberString += value[i];
          }
        }
        return numberString;
      },
    });
    new DivLine({
      parent: this,
    });
    new TextAreaInput({
      parent: this,
      placeholder: '게시글 내용을 작성해주세요',
      id: 'write-content',
    });

    new WriteBottomFotter({
      parent: this,
      locationText: '역삼사오육동',
    });
    return $element;
  }
}
