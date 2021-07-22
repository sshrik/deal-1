import $ from '../../util/domControll';
import ElementBuilder from '../../lib/ElementBuilder';

export default class ProductContent extends ElementBuilder {
  constructElement() {
    const $element = $.create('div').addClass('product-content__container');
    const $titleSection = $.create('div').addClass('product-content__title');
    $titleSection.appendChild(
      $.create('p')
        .addClass('product-content__title__text')
        .setText(this.props.title)
    );
    $titleSection.appendChild(
      $.create('p')
        .addClass('product-content__title__sub')
        .setText(`${this.props.category}·${this.props.lastTime} 전`)
    );
    $element.appendChild($titleSection);
    const $contentSection = $.create('div').addClass(
      'product-content__content'
    );

    $contentSection.appendChild(
      $.create('p')
        .addClass('product-content__content__text')
        .setText(this.props.specDetail)
    );
    $element.appendChild($contentSection);

    const $metaSection = $.create('div').addClass('product-content__meta');
    $metaSection.appendChild(
      $.create('p')
        .addClass('product-content__meta__text')
        .setText(
          `채팅 ${this.props.chat}·관심 ${this.props.like}·조회 ${this.props.view}`
        )
    );
    $element.appendChild($metaSection);

    const $userSection = $.create('div').addClass('product-content__user');
    $userSection.appendChild(
      $.create('p')
        .addClass('product-content__seller__title')
        .setText('판매자 정보')
    );
    $userSection.appendChild(
      $.create('p')
        .addClass('product-content__seller__id')
        .setText(this.props.seller)
    );
    $userSection.appendChild(
      $.create('p')
        .addClass('product-content__seller__location')
        .setText(this.props.location)
    );
    $element.appendChild($userSection);

    return $element;
  }
}
