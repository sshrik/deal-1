import '../globalInit';
import '../css/normalize.css';
import '../css/common.css';
import TestPage from './Test/index';
import Router from '../router';

const $root = document.querySelector('.app-container');
const router = new Router($root);
const $testPage = new TestPage($root, {
  testText: 'INDEX_01',
  routeTo: 'testPage2',
  router,
});

const $testPage2 = new TestPage($root, {
  testText: 'INDEX_02',
  routeTo: 'testPage1',
  router,
});

router.addScreen('testPage1', $testPage);
router.addScreen('testPage2', $testPage2);
console.log(router);

$testPage2.render();
