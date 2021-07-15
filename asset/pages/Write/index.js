import ElementBuilder from '../../component/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import ImageUploader from './ImageUploader';
import '../../css/write.css';

export default class Write extends ElementBuilder {
  constructor(props) {
    const { parent, routeTo, router } = props;
    super(props);
    this.state = {
      files: [],
    };
  }

  compareState(prevState, newState) {
    if (prevState.files === newState.files) {
      return false;
    }
    return true;
  }

  readImageFile = (imgFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(imgFile);
    });
  };

  uploadImgHandler = ({ target }) => {
    this.readImageFile(target.files[0]).then((res) => {
      const newFiles = { files: [...this.state.files, res] };
      this.setState(newFiles);
    });
  };

  constructElement() {
    const $element = $.create('div').addClass('write-container');
    new SubHeader({
      parent: this,
      title: '글쓰기',
      action: null,
    });
    new ImageUploader({
      parent: this,
      files: this.state.files,
      addImgHandler: this.uploadImgHandler,
    });
    return $element;
  }
}
