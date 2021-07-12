export function addLiveReloadScript() {
  // Tag 에 liveReload Script를 붙여주어 자동으로 reload하게 해 줍니다.
  const liveReloadScript = document.createElement('script');
  liveReloadScript.async = true;
  liveReloadScript.defer = true;
  liveReloadScript.src = 'http://localhost:35729/livereload.js?snipver=1';
  document.head.appendChild(liveReloadScript);
};
