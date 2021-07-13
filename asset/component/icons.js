import $ from '../util/domControll';

const createSvgBtn = (name, svgTag) => {
  const $iconBtn = $.create('button').addClass('icon').addClass(name);
  $iconBtn.innerHTML = svgTag;
  return $iconBtn;
};

const category = createSvgBtn(
  'category',
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.33333 4H4.66667C4.29848 4 4 4.29848 4 4.66667V9.33333C4 9.70152 4.29848 10 4.66667 10H9.33333C9.70152 10 10 9.70152 10 9.33333V4.66667C10 4.29848 9.70152 4 9.33333 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.33333 14H4.66667C4.29848 14 4 14.2985 4 14.6667V19.3333C4 19.7015 4.29848 20 4.66667 20H9.33333C9.70152 20 10 19.7015 10 19.3333V14.6667C10 14.2985 9.70152 14 9.33333 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.3333 4H14.6667C14.2985 4 14 4.29848 14 4.66667V9.33333C14 9.70152 14.2985 10 14.6667 10H19.3333C19.7015 10 20 9.70152 20 9.33333V4.66667C20 4.29848 19.7015 4 19.3333 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.3333 14H14.6667C14.2985 14 14 14.2985 14 14.6667V19.3333C14 19.7015 14.2985 20 14.6667 20H19.3333C19.7015 20 20 19.7015 20 19.3333V14.6667C20 14.2985 19.7015 14 19.3333 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
);

const mapPin = createSvgBtn(
  'map-pin',
  `<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.5 7.66663C14.5 12.3333 8.5 16.3333 8.5 16.3333C8.5 16.3333 2.5 12.3333 2.5 7.66663C2.5 6.07533 3.13214 4.5492 4.25736 3.42399C5.38258 2.29877 6.9087 1.66663 8.5 1.66663C10.0913 1.66663 11.6174 2.29877 12.7426 3.42399C13.8679 4.5492 14.5 6.07533 14.5 7.66663Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.5 9.66663C9.60457 9.66663 10.5 8.7712 10.5 7.66663C10.5 6.56206 9.60457 5.66663 8.5 5.66663C7.39543 5.66663 6.5 6.56206 6.5 7.66663C6.5 8.7712 7.39543 9.66663 8.5 9.66663Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
);

const user = createSvgBtn(
  'user',
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 18.3333C18 17.4493 17.6839 17.6014 17.1213 16.9763C16.5587 16.3512 15.7956 16 15 16H9C8.20435 16 7.44129 16.3512 6.87868 16.9763C6.31607 17.6014 6 17.4493 6 18.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`
);

const menu = createSvgBtn(
  'menu',
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 6H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 12H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
`
);

export default {
  category,
  mapPin,
  user,
  menu,
};
