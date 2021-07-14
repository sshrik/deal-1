import $ from '../util/domControll';
import icons from './icons';

export default (type, numOfFiles, src = null, deleteAction = null) => {
  const $imgContainer = $.create('div').addClass('img').addClass('img-medium');

  if (type === 'add') {
    $imgContainer.addClass('img-btn');
    const $pictureCount = $.create('div').addClass('img-counter');
    $pictureCount.appendChild(icons.picture());
    $pictureCount.appendChild($.create('span').setText(`10/${numOfFiles}`));
    $imgContainer.appendChild($pictureCount);
  } else if (type === 'delete') {
    const $img = $.create('img');
    $img.src = src;

    const $eraseBtn = $.create('div').addClass('erase-btn');
    $eraseBtn.appendChild(icons.erase());

    $imgContainer.appendChild($img);
    $imgContainer.appendChild($eraseBtn);
  }

  return $imgContainer;
};
