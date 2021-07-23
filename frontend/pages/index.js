import '../lib/commonCSS/normalize.css';
import '../lib/commonCSS/common.css';
import '../util/globalInit';
import Router from '../lib/router';
import Main from './Main/index';
import Category from './Category/index';
import Register from './Register/index';
import Location from './Location/index';
import Menu from './Menu/index';
import ChattingRoom from './ChattingRoom/index';
import Loading from './Loading/index';

const $root = document.querySelector('.app-container');
const router = new Router($root);

// 전역변수로 로그인 여부를 관리
router.globalState.isLogin = false;

if (window.localStorage.getItem('userName')) {
  router.globalState.isLogin = true;
  router.globalState.userName = window.localStorage.getItem('userName');
}

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
router.addScreen('register', $registerPage);
router.addScreen('location', $locationPage);
router.addScreen('menu', $menuPage);
router.addScreen('chattingRoom', $chattingRoom);
router.addScreen('loadingPage', $loadingPage);

// 첫 화면 Render시에는 해당 화면을 현재 페이지라고 설정해주어야 합니다.
router.setNowView($loadingPage);

$loadingPage.render();
