import "../css/test.css";
import { addLiveReloadScript } from "../globalInit.js";

// Add Live Reload Script. 
// 이 코드를 수행하면 서버에 있는 파일이 변경될 때 마다 0.1초마다 자동으로 reload 해서 실행해줍니다.
// 이는 npm run dev 로 수행한 경우에만 해당합니다.
addLiveReloadScript();

console.log("Hello world!");