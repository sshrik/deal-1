import ElementBuilder from '../../lib/ElementBuilder';
import SubHeader from '../../component/SubHeader';
import $ from '../../util/domControll';
import WriteContainer from './WriteContainer';
import IconButtons from '../../component/Button/IconButtons';
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
      sendActive: false,
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
    const { sendActive } = this.state;
    const $element = $.create('div').addClass('write-container');

    const $checkBtn = $.create('button')
      .addClass('check-button', sendActive ? 'active' : 'deactive')
      .setHTML(IconButtons.check);
    $checkBtn.addEventListener('click', (e) => console.log('a'));

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
    });
    return $element;
  }
}
