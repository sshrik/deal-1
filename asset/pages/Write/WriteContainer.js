import $ from '../../util/domControll';
import ElementBuilder from '../../component/ElementBuilder';
import ImageUploader from './ImageUploader';
import '../../css/write.css';

export default class WriteContainer extends ElementBuilder {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.uploadImgHandler = this.uploadImgHandler.bind(this);
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

  uploadImgHandler = function ({ target }) {
    this.readImageFile(target.files[0]).then((res) => {
      const newFiles = { files: [...this.state.files, res] };
      this.setState(newFiles);
    });
  };

  constructElement() {
    const $element = $.create('div').addClass('write-content-container');

    new ImageUploader({
      parent: this,
      files: this.state.files,
      addImgHandler: this.uploadImgHandler,
    });

    return $element;
  }
}
