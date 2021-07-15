import $ from '../util/domControll';

const createSvgBtn = (name, svgTag, eventHandler = null) => {
  const $svgBtn = $.create('button')
    .addClass('icon')
    .addClass(name)
    .setHTML(svgTag);
  $svgBtn.addEventListener('click', (e) => {
    eventHandler(name);
  });
  return $svgBtn;
};

const category = (eventHandler) =>
  createSvgBtn(
    'category',
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.33333 4H4.66667C4.29848 4 4 4.29848 4 4.66667V9.33333C4 9.70152 4.29848 10 4.66667 10H9.33333C9.70152 10 10 9.70152 10 9.33333V4.66667C10 4.29848 9.70152 4 9.33333 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.33333 14H4.66667C4.29848 14 4 14.2985 4 14.6667V19.3333C4 19.7015 4.29848 20 4.66667 20H9.33333C9.70152 20 10 19.7015 10 19.3333V14.6667C10 14.2985 9.70152 14 9.33333 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.3333 4H14.6667C14.2985 4 14 4.29848 14 4.66667V9.33333C14 9.70152 14.2985 10 14.6667 10H19.3333C19.7015 10 20 9.70152 20 9.33333V4.66667C20 4.29848 19.7015 4 19.3333 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.3333 14H14.6667C14.2985 14 14 14.2985 14 14.6667V19.3333C14 19.7015 14.2985 20 14.6667 20H19.3333C19.7015 20 20 19.7015 20 19.3333V14.6667C20 14.2985 19.7015 14 19.3333 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
    eventHandler
  );

const mapPin = (eventHandler) =>
  createSvgBtn(
    'location',
    `<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.5 7.66663C14.5 12.3333 8.5 16.3333 8.5 16.3333C8.5 16.3333 2.5 12.3333 2.5 7.66663C2.5 6.07533 3.13214 4.5492 4.25736 3.42399C5.38258 2.29877 6.9087 1.66663 8.5 1.66663C10.0913 1.66663 11.6174 2.29877 12.7426 3.42399C13.8679 4.5492 14.5 6.07533 14.5 7.66663Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.5 9.66663C9.60457 9.66663 10.5 8.7712 10.5 7.66663C10.5 6.56206 9.60457 5.66663 8.5 5.66663C7.39543 5.66663 6.5 6.56206 6.5 7.66663C6.5 8.7712 7.39543 9.66663 8.5 9.66663Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
    eventHandler
  );

const user = (eventHandler) =>
  createSvgBtn(
    'login',
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 18.3333C18 17.4493 17.6839 17.6014 17.1213 16.9763C16.5587 16.3512 15.7956 16 15 16H9C8.20435 16 7.44129 16.3512 6.87868 16.9763C6.31607 17.6014 6 17.4493 6 18.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`,
    eventHandler
  );

const menu = () =>
  createSvgBtn(
    'menu',
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 6H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 12H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg> 
`
  );

const like = () =>
  createSvgBtn(
    'like',
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
  );

const chat = () =>
  createSvgBtn(
    'chat',
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 10C14 10.3536 13.8595 10.6928 13.6095 10.9428C13.3594 11.1929 13.0203 11.3333 12.6667 11.3333H4.66667L2 14V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V10Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
  );

const plus = () =>
  createSvgBtn(
    'plus',
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
  );

const back = (eventHandler) =>
  createSvgBtn(
    'back',
    `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17L1 9L9 1" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    eventHandler
  );

const picture = () =>
  createSvgBtn(
    'picture',
    `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 15L16 10L5 21" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
  );

const erase = () =>
  createSvgBtn(
    'erase',
    `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 4L12 12" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
  );

export default {
  category,
  mapPin,
  user,
  menu,
  like,
  chat,
  plus,
  back,
  picture,
  erase,
};
