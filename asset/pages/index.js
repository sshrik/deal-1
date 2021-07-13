import '../globalInit';
import '../css/normalize.css';
import '../css/common.css';
import TestPage from './Test/index';

const $root = document.querySelector('.app-container');
const $testPage = new TestPage($root, {
  testText: 'INDEX_01',
});
$testPage.render();
