export function addLiveReloadScript() {
  // Tag 에 liveReload Script를 붙여주어 자동으로 reload하게 해 줍니다.
  if (document.location.host.split(':')[0] == 'localhost') {
    // localhost에서 수행한 경우만 실행합니다.
    const liveReloadScript = document.createElement('script');
    liveReloadScript.async = true;
    liveReloadScript.defer = true;
    liveReloadScript.src = 'http://localhost:35729/livereload.js?snipver=1';
    document.head.appendChild(liveReloadScript);
  }
}

// Add Live Reload Script.
// 이 코드를 수행하면 서버에 있는 파일이 변경될 때 마다 0.1초마다 자동으로 reload 해서 실행해줍니다.
// 이는 npm run dev 로 수행한 경우에만 해당합니다.
addLiveReloadScript();
