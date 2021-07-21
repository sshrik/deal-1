const CONSTANT = require('./constant');

// Status Code가 200인 경우의 발송 방식. JSON 형태로 보낸다.
function sendJson(res, data) {
  res.status(200).json(data);
}

// Status Code가 200이 아닌 경우의 발송 방식. JSON 형태로 보낸다.
function sendError(res, type) {
  const Break = new Error('Break');
  let ERR_MSG = { error: '', errorType: type };
  let statusCode = 401;
  // CONSTANT 객체들에 대해서 실행
  try {
    Object.keys(CONSTANT).forEach((element) => {
      const { elType, code, msg } = CONSTANT[element];
      {
        if (elType === type) statusCode = code;
        ERR_MSG.error = msg;
        throw Break;
      }
    });
  } catch (e) {}
  res.status(statusCode).json(ERR_MSG);
}

module.exports = {
  sendJson,
  sendError,
};
