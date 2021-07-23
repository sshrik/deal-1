const uuid = require('uuid');
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');

function checkSession(req, res, next) {
  // Session이 옳은지 확인하고 진행
  const bmCookie = req.cookies.bmCookie;
  if (!bmCookie) {
    util.sendError(res, CONSTANT.NO_BMCOOKIE_ERROR.type);
  } else if (!req.session[bmCookie]) {
    util.sendError(res, CONSTANT.NO_SESSION_INFOR_ERROR.type);
  } else {
    next();
  }
}

function addSession(req, res, next) {
  const bmCookie = uuid.v4();
  if (!req.session[req.body.userName] && !req.session[bmCookie]) {
    req.session[req.body.userName] = bmCookie;
    req.session[bmCookie] = req.body.userName;
    res.append('Set-Cookie', `bmCookie=${bmCookie};`);
  } else {
    // 이미 session 정보가 있는 경우
    // TODO : 중복 로그인 관련 처리도 할 수 있을 것 같다.
  }
  // req.session.save 는 http call 맨 마지막에 자동 호출.
  console.log(req.session);
  next();
}

function removeSession(req, res, next) {
  const bmCookie = req.cookies.bmCookie;
  if (!bmCookie) {
    util.sendError(res, CONSTANT.NO_BMCOOKIE_ERROR_TYPE);
  } else if (!req.session[bmCookie]) {
    util.sendError(res, CONSTANT.NO_SESSION_INFOR_ERROR_MSG);
  } else {
    // ID, PW가 있는 경우에만 session을 제거.
    const userName = req.session[bmCookie];
    delete req.session[userName];
    delete req.session[bmCookie];
    next();
  }
}

module.exports = {
  checkSession,
  addSession,
  removeSession,
};
