import '../css/normalize.css';
import '../css/common.css';
import '../globalInit.js';
import MainHeader from '../component/MainHeader';

const $root = document.querySelector('.app-container');

new MainHeader($root);
