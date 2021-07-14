import '../css/normalize.css';
import '../css/common.css';
import '../globalInit';
import TestPage from './Test/index';
import Router from '../router';
import Main from './Main';
import Category from './Category';

const $root = document.querySelector('.app-container');
const router = new Router($root);
const $testPage1 = new TestPage({
  parent: $root,
  testText: 'INDEX_01',
  routeTo: 'testPage2',
  router,
});

const $mainPage = new Main({
  parent: $root,
  routeTo: 'category',
  router,
});

const $categoryPage = new Category({
  parent: $root,
  routeTo: '',
  router,
});

// const $testPage2 = new TestPage({
//   parent: $root,
//   testText: 'INDEX_02',
//   routeTo: 'testPage3',
//   router,
// });
// const $testPage3 = new TestPage({
//   parent: $root,
//   testText: 'INDEX_03',
//   routeTo: 'testPage4',
//   router,
// });

// const $testPage4 = new TestPage({
//   parent: $root,
//   testText: 'INDEX_04',
//   routeTo: 'testPage1',
//   router,
// });

router.addScreen('testPage1', $testPage1);
router.addScreen('main', $mainPage);
router.addScreen('category', $categoryPage);
// router.addScreen('testPage2', $testPage2);
// router.addScreen('testPage3', $testPage3);
// router.addScreen('testPage4', $testPage4);

// 첫 화면 Render시에는 해당 화면을 현재 페이지라고 설정해주어야 합니다.
// router.setNowView($testPage1);
router.setNowView($categoryPage);
$mainPage.render();
