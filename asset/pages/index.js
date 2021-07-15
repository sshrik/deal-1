import '../css/normalize.css';
import '../css/common.css';
import '../globalInit';
import Router from '../router';
import Main from './Main';
import Category from './Category';
import Write from './Write';
import Login from './Login';
import Location from './Location';

const $root = document.querySelector('.app-container');
const router = new Router($root);

const $mainPage = new Main({
  parent: $root,
  routeTo: 'category',
  router,
});

const $categoryPage = new Category({
  parent: $root,
  routeTo: 'main',
  router,
});

const $writePage = new Write({
  parent: $root,
  routeTo: '',
  router,
});

const $loginPage = new Login({
  parent: $root,
  routeTo: 'main',
  router,
});

const $locationPage = new Location({
  parent: $root,
  routeTo: 'main',
  router,
});

router.addScreen('main', $mainPage);
router.addScreen('category', $categoryPage);
router.addScreen('write', $writePage);
router.addScreen('login', $loginPage);
router.addScreen('location', $locationPage);

// 첫 화면 Render시에는 해당 화면을 현재 페이지라고 설정해주어야 합니다.
router.setNowView($mainPage);
// router.setNowView($writePage);
// $writePage.render();
$mainPage.render();
