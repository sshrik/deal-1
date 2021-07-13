import '../css/normalize.css';
import '../css/common.css';
import '../globalInit.js';
import MainHeader from '../component/MainHeader';
import ListItem from '../component/ListItem';

const $root = document.querySelector('.app-container');

new MainHeader($root);
new ListItem($root);
