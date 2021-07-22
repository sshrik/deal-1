import $ from '../../util/domControll';
import './modal.css';
import ElementBuilder from '../../lib/ElementBuilder';

export default class SpinnerModal extends ElementBuilder {
  constructor(props) {
    super(props);
    this.color = this.props.color ? this.props.color : '#222222';
    this.width = this.props.width ? this.props.width : 54;
    this.height = this.props.height ? this.props.height : 54;
    this.stroke = this.props.stroke ? this.props.stroke : 4;
    this.spinnerSvg = `<svg width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2.00001 27 2.00001C13.1929 2.00001 2 13.1929 2 27C2 40.8071 13.1929 52 27 52Z" stroke="${this.color}" stroke-width="${this.stroke}"/>
    </svg>
    `;
  }

  addOutAnimation = ($totalContainer) => {
    $totalContainer.addClass('transparent-modal--container__out');
  };

  constructElement() {
    const $modalContainer = $.create('div')
      .addClass('transparent-modal--container')
      .addClass('transparent-modal--container-color');
    const $svgImage = $.create().addClass('loading-modal__svg-image');
    $svgImage.setHTML(this.spinnerSvg);
    console.log($svgImage);
    $modalContainer.appendChild($svgImage);

    return $modalContainer;
  }
}
