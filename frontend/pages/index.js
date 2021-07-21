import '../lib/commonCSS/normalize.css';
import '../lib/commonCSS/common.css';
import '../util/globalInit';
import Router from '../lib/router';
import Main from './Main/index';
import Category from './Category/index';
import Login from './Login/index';
import Register from './Register/index';
import Location from './Location/index';
import Menu from './Menu/index';
import ChattingRoom from './ChattingRoom/index';
import Logout from './Logout/index';
import Loading from './Loading/index';

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

const $loginPage = new Login({
  parent: $root,
  routeTo: 'main',
  router,
});

const $logoutPage = new Logout({
  parent: $root,
  router,
});

const $registerPage = new Register({
  parent: $root,
  router,
});

const $locationPage = new Location({
  parent: $root,
  routeTo: 'main',
  router,
});

const $menuPage = new Menu({
  parent: $root,
  routeTo: 'main',
  router,
});

const $loadingPage = new Loading({
  parent: $root,
  routeTo: 'main',
  router,
});

const $chattingRoom = new ChattingRoom({
  parent: $root,
  router,
});

router.addScreen('main', $mainPage);
router.addScreen('category', $categoryPage);
router.addScreen('login', $loginPage);
router.addScreen('logout', $logoutPage);
router.addScreen('register', $registerPage);
router.addScreen('location', $locationPage);
router.addScreen('menu', $menuPage);
router.addScreen('chattingRoom', $chattingRoom);
router.addScreen('loadingPage', $loadingPage);

// 첫 화면 Render시에는 해당 화면을 현재 페이지라고 설정해주어야 합니다.
router.setNowView($loadingPage);

$loadingPage.render();
