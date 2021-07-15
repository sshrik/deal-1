import $ from '../util/domControll';
import icons from './icons';

export default (type, numOfFiles, src = null, deleteAction = null) => {
  const $imgContainer = $.create('div').addClass('img').addClass('img-medium');

  if (type === 'add') {
    $imgContainer.addClass('img-btn');
    const $pictureCount = $.create('div').addClass('img-counter');
    $pictureCount.appendChild(icons.picture());
    $pictureCount.appendChild($.create('p').setText(`${numOfFiles}/10`));
    $imgContainer.appendChild($pictureCount);
  } else if (type === 'delete') {
    $imgContainer.addClass('img-erase');
    const $img = $.create('img');
    $img.src = src;

    const $eraseBtn = $.create('div').addClass('erase-btn');
    $eraseBtn.appendChild(icons.erase());
    $eraseBtn.addEventListener('click', deleteAction);

    $imgContainer.appendChild($img);
    $imgContainer.appendChild($eraseBtn);
  }

  return $imgContainer;
};
