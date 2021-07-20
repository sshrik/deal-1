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
  constructElement() {
    const {
      categories,
      files,
      title,
      price,
      detail,
      uploadImgHandler,
      deleteImage,
      setButtonState,
      buttonState,
      onChange,
    } = this.props;
    const $element = $.create('div').addClass('write-content-container');

    new ImageUploader({
      parent: this,
      files: files,
      addImgHandler: uploadImgHandler,
      deleteImage: deleteImage,
    });
    new DivLine({
      parent: this,
    });
    new TitleTextInput({
      parent: this,
      value: title,
      id: 'title',
      categories,
      onInput: onChange,
      setButtonState: setButtonState,
      buttonState: buttonState,
    });
    new DivLine({
      parent: this,
    });
    new TextInput({
      parent: this,
      placeholder: '₩ 가격(선택사항)',
      id: 'price',
      value: price,
      valueSetter: priceCommaSeperator,
      valueChecker: numberChecker,
      dismissValue: '$0',
      onInput: onChange,
    });
    new DivLine({
      parent: this,
    });
    new TextAreaInput({
      parent: this,
      value: detail,
      id: 'detail',
      placeholder: '게시글 내용을 작성해주세요',
      onInput: onChange,
    });

    new WriteBottomFotter({
      parent: this,
      locationText: '역삼사오육동',
    });
    return $element;
  }
}
