import $ from '../../util/domControll';
import './modal.css';
import ElementBuilder from '../../lib/ElementBuilder';

export default class LoadingModal extends ElementBuilder {
  constructElement() {
    const $modalContainer = $.create('div').addClass(
      'loading-modal--container'
    );
    $modalContainer.addClass('modal--top-fix');
    const $logoContainer = $.create('div').addClass(
      'loading-modal__logo--container'
    );
    const $logoImage = $.create('img').addClass('loading-modal__logo-image');
    $logoImage.src = 'logo.png';
    $logoContainer.appendChild($logoImage);
    const $titleImage = $.create('img').addClass('loading-modal__title-image');
    $titleImage.src = 'app-title.png';
    $modalContainer.appendChild($logoContainer);
    $modalContainer.appendChild($titleImage);

    return $modalContainer;
  }
}
