import ElementBuilder from '../../component/ElementBuilder';
import ImageButton from '../../component/Button/ImageButton';
import $ from '../../util/domControll';

export default class ImageUploader extends ElementBuilder {
  constructor(props) {
    const { files, addImgHandler } = props;
    super(props);
    this.files = files;
    this.onAdd = addImgHandler;
  }

  constructElement() {
    const $element = $.create('div').addClass('img-upload__container');
    const $inputUnvisible = $.create('input');
    $inputUnvisible.type = 'file';
    $inputUnvisible.style.display = 'none';
    $inputUnvisible.addEventListener('change', this.onAdd);

    const $imgUploadBtn = ImageButton('add', this.files.length);
    $imgUploadBtn.addEventListener('click', () => {
      $inputUnvisible.click();
    });

    const $temp = $.create('div').addClass('img-shower__container');
    this.files.forEach((file, index) => {
      $temp.appendChild(
        ImageButton('delete', this.files.length, file, () => {
          this.props.deleteImage(index);
        })
      );
    });

    $element.appendChild($inputUnvisible);
    $element.appendChild($imgUploadBtn);
    $element.appendChild($temp);

    return $element;
  }
}
