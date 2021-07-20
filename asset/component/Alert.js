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
    $cancel.addEventListener('click', (e) => {
      $alertContainer.addClass('slide-out-animation');
      if (this.props.onCancel) {
        setTimeout(() => this.props.onCancel(e), 500);
      }
    });
    const $proceed = $.create('p')
      .setText('나가기')
      .addClass('error-modal--answer-text')
      .addClass('error-modal--error-text');
    $proceed.addEventListener('click', (e) => {
      $alertContainer.addClass('slide-out-animation');
      if (this.props.onProceed) {
        setTimeout(() => this.props.onProceed(e), 500);
      }
    });

    $answerContainer.appendChild($cancel);
    $answerContainer.appendChild($proceed);

    $alertContainer.appendChild($errorTextContainer);
    $alertContainer.appendChild($answerContainer);

    $modalContainer.appendChild($alertContainer);
    $alertContainer.addClass('slide-in-animation');
    return $modalContainer;
  }
}
