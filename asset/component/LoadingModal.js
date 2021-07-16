import $ from '../util/domControll';
import '../css/modal.css';
import ElementBuilder from './ElementBuilder';

export default class LoadingModal extends ElementBuilder {
  constructElement() {
    const $modalContainer = $.create('div').addClass(
      'loading-modal--container'
    );
    if (this.props.needLoad()) {
      this.props.whenLoad();
      $modalContainer.addClass('modal--top-fix');
      const $logoContainer = $.create('div').addClass(
        'loading-modal__logo--container'
      );
      const $logoImage = $.create('img').addClass('loading-modal__logo-image');
      $logoImage.src = 'logo.png';
      $logoContainer.appendChild($logoImage);
      const $titleImage = $.create('img').addClass(
        'loading-modal__title-image'
      );
      $titleImage.src = 'app-title.png';
      $modalContainer.appendChild($logoContainer);
      $modalContainer.appendChild($titleImage);
    } else {
      $modalContainer.addClass('.invisible');
    }

    return $modalContainer;
  }
}
