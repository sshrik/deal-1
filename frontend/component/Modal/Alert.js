import $ from '../../util/domControll';
import './modal.css';
import ElementBuilder from '../../lib/ElementBuilder';

export default class Alert extends ElementBuilder {
  /* props
  titleText : 위에 뜰 문구
  proceedText : 계속하기 문구
  onCancel : 취소를 눌렀을 때 일어날 함수
  onProceed : 계속 진행 할 때 일어날 함수
   */
  addOutAnimation = ($container, $totalContainer) => {
    if (this.props.animation === 'slide') {
      $container.addClass('slide-out-animation');
    } else {
      $container.addClass('pop-down-animation');
    }
    $totalContainer.addClass('transparent-modal--container__out');
  };

  addInAnimation = ($container, $totalContainer) => {
    if (this.props.animation === 'slide') {
      $container.addClass('slide-in-animation');
    } else {
      $container.addClass('pop-up-animation');
    }
    $totalContainer.addClass('transparent-modal--container__in');
  };

  constructElement() {
    const $modalContainer = $.create('div').addClass(
      'transparent-modal--container'
    );

    const $alertContainer = $.create('div')
      .addClass('modal-alert--container')
      .addClass('modal--container__common');

    const $errorTextContainer = $.create('div').addClass(
      'modal-alret--title-container'
    );
    const $errorText = $.create('p')
      .setText(this.props.titleText)
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
      this.addOutAnimation($alertContainer, $modalContainer);
      if (this.props.onCancel) {
        setTimeout((e) => this.props.onCancel(e), 500);
      }
    });
    const $proceed = $.create('p')
      .setText(this.props.proceedText)
      .addClass('error-modal--answer-text')
      .addClass('error-modal--error-text');
    $proceed.addEventListener('click', (e) => {
      this.addOutAnimation($alertContainer, $modalContainer);
      if (this.props.onProceed) {
        setTimeout(() => this.props.onProceed(), 500);
      }
    });

    $answerContainer.appendChild($cancel);
    $answerContainer.appendChild($proceed);

    $alertContainer.appendChild($errorTextContainer);
    $alertContainer.appendChild($answerContainer);

    $modalContainer.appendChild($alertContainer);
    this.addInAnimation($alertContainer, $modalContainer);
    return $modalContainer;
  }
}
