import ElementBuilder from '../../component/ElementBuilder';
import ImageBtn from '../../component/ImageBtn';
import $ from '../../util/domControll';

export default class ImageUploader extends ElementBuilder {
  constructor(props) {
    const { parent, files, addImgHandler } = props;
    super(props);
    this.files = files;
    this.onAdd = addImgHandler;
  }

  compareState(prevState, newState) {
    return false;
  }

  constructElement() {
    const $element = $.create('div').addClass('img-upload__container');
    const $inputUnvisible = $.create('input');
    $inputUnvisible.type = 'file';
    $inputUnvisible.style.display = 'none';
    $inputUnvisible.addEventListener('change', this.onAdd);

    const $imgUploadBtn = ImageBtn('add', this.files.length);
    $imgUploadBtn.addEventListener('click', () => {
      $inputUnvisible.click();
    });

    const $temp = $.create('div');
    this.files.forEach((file) => {
      $temp.appendChild(ImageBtn('delete', this.files.length, file));
    });

    $element.appendChild($inputUnvisible);
    $element.appendChild($imgUploadBtn);
    $element.appendChild($temp);

    return $element;
  }
}
