import $ from '../util/domControll';

export default (type, src) => {
  const $imgContainer = $.create('div');
  $imgContainer.addClass('img');
  $imgContainer.addClass(`img-${type}`);

  const $img = $.create('img');
  $img.setAttribute('src', src);
  $imgContainer.appendChild($img);

  return $imgContainer;
};
