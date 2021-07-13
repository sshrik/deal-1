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

// 첫 화면 Render시에는 해당 화면을 현재 페이지라고 설정해주어야 합니다.
router.setNowView($testPage2);

$testPage2.render();
