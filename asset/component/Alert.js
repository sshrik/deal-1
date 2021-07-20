import $ from '../util/domControll';
import '../css/modal.css';
import ElementBuilder from './ElementBuilder';

export default class Alert extends ElementBuilder {
  constructElement() {
    const $modalContainer = $.create('div').addClass(
      'transparent-modal--container'
    );

    const $alertContainer = $.create('div').addClass('modal-alert--container');
    const $errorTextContainer = $.create('div').addClass(
      'modal-alret--title-container'
    );
    const $errorText = $.create('p')
      .setText(this.props.errorText)
      .addClass('error-modal--plain-text')
      .addClass('modal--main-text');
    $errorTextContainer.appendChild($errorText);

    const $answerContainer = $.create('div').addClass(
      'modal-alert--answer-container'
    );
    const $cancel = $.create('p')
      .setText('취소')
      .addClass('error-modal--plain-text')
      .addClass('error-modal--answer-text');
    const $proceed = $.create('p')
      .setText('나가기')
      .addClass('error-modal--answer-text')
      .addClass('error-modal--error-text');

    $answerContainer.appendChild($cancel);
    $answerContainer.appendChild($proceed);

    $alertContainer.appendChild($errorTextContainer);
    $alertContainer.appendChild($answerContainer);

    $modalContainer.appendChild($alertContainer);
    return $modalContainer;
  }
}
