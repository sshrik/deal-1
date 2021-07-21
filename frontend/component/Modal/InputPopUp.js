import $ from '../../util/domControll';
import './modal.css';
import ElementBuilder from '../../lib/ElementBuilder';

export default class InputPopUp extends ElementBuilder {
  /*
    props
    titleText : 위에 뜰 문구
    placeholder : Placeholder
    onInput : input event 가 실행 될 때 마다 수행 될 함수.
    onCancel : 종료 버튼을 눌렀을 때 수행 될 함수.
    checkInput : 입력의 문자열이 조건에 맞는지.
    onProceed : 계속하기 버튼을 눌렀을 때 수행 될 함수.
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
      .addClass('modal-popup--container')
      .addClass('modal--container__common');

    const $titleContainer = $.create('div');
    const $title = $.create('p')
      .addClass('error-modal--plain-text')
      .setText(this.props.titleText);
    $titleContainer.appendChild($title);

    const $inputContainer = $.create('div').addClass(
      'modal-popup--input-container'
    );
    const $input = $.create('input');
    $input.placeholder = this.props.placeholder;
    $inputContainer.appendChild($input);
    $input.addEventListener('input', (e) => {
      if (this.props.checkInput(e.target.value)) {
        $proceed.addClass('input-modal--proceed-text__active');
        if (this.props.onInput) {
          this.props.onInput(e);
        }
      }
    });
    const $answerContainer = $.create('div').addClass(
      'modal-popup--answer-container'
    );
    const $cancel = $.create('p')
      .addClass('error-modal--plain-text')
      .addClass('error-modal--answer-text')
      .setText('취소');
    const $proceed = $.create('p')
      .addClass('input-modal--proceed-text')
      .addClass('error-modal--answer-text')
      .setText('확인');

    $cancel.addEventListener('click', (e) => {
      this.addOutAnimation($alertContainer, $modalContainer);
      if (this.props.onCancel) {
        setTimeout(() => this.props.onCancel(e), 500);
      }
    });

    $proceed.addEventListener('click', (e) => {
      if (this.props.checkInput($input.value)) {
        this.addOutAnimation($alertContainer, $modalContainer);
        if (this.props.onProceed) {
          setTimeout(() => this.props.onProceed(e, $input.value), 500);
        }
      }
    });

    $answerContainer.appendChild($cancel);
    $answerContainer.appendChild($proceed);

    $alertContainer.appendChild($titleContainer);
    $alertContainer.appendChild($inputContainer);
    $alertContainer.appendChild($answerContainer);

    $modalContainer.appendChild($alertContainer);
    this.addInAnimation($alertContainer, $modalContainer);
    return $modalContainer;
  }
}
