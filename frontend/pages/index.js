import '../css/normalize.css';
import '../css/common.css';
import '../globalInit';
import Router from '../router';
import Main from './Main';
import Category from './Category';
import Login from './Login';
import Register from './Register';
import Location from './Location';
import Menu from './Menu';
import ChattingRoom from './ChattingRoom';
import Logout from './Logout';

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

// 첫 화면 Render시에는 해당 화면을 현재 페이지라고 설정해주어야 합니다.
router.setNowView($mainPage);

$mainPage.render();
