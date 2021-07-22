const CONSTANT = require('./constant');

// Status Code가 200인 경우의 발송 방식. JSON 형태로 보낸다.
function sendJson(res, data) {
  res.status(200).json(data);
}

// Status Code가 200이 아닌 경우의 발송 방식. JSON 형태로 보낸다.
function sendError(res, eType) {
  const Break = new Error('Break');
  let ERR_MSG = { error: '', errorType: eType };
  let sCode = 401;
  // CONSTANT 객체들에 대해서 실행
  try {
    Object.keys(CONSTANT).forEach((element) => {
      const { type, statusCode, msg } = CONSTANT[element];
      if (type === eType) {
        sCode = statusCode;
        ERR_MSG.error = msg;
        throw Break;
      }
    });
  } catch (e) {}
  res.status(sCode).json(ERR_MSG);
}

module.exports = {
  sendJson,
  sendError,
};
