const CONSTANT = require('./constant');

res.status(200).json({ userName: req.session.userName });
// 401, 500
// 406 : NOT_ACCEPTABLE

// Status Code가 200인 경우의 발송 방식. JSON 형태로 보낸다.
function sendJson(res, data) {
  res.status(200).json(data);
}

// Status Code가 200이 아닌 경우의 발송 방식. JSON 형태로 보낸다.
function sendError(res, type) {
  const ERR_MSG = { error: '', errorType: type };
  let statusCode = 401;
  switch (type) {
    case CONSTANT.NO_BMCOOKIE_ERROR_TYPE:
      ERR_MSG.error = CONSTANT.NO_BMCOOKIE_ERROR_MSG;
      statusCode = 401;
      break;
    case CONSTANT.NO_SESSION_INFOR_ERROR_TYPE:
      ERR_MSG.error = CONSTANT.NO_SESSION_INFOR_ERROR_MSG;
      statusCode = 401;
      break;
    case CONSTANT.UNVALID_INFO_ERROR_TYPE:
      ERR_MSG.error = CONSTANT.UNVALID_INFO_ERROR_MSG;
      statusCode = 401;
      break;
    default:
      ERR_MSG.error = CONSTANT.INTERNAL_SERVER_ERROR_MSG;
      statusCode = 500;
      break;
  }
  res.status(statusCode).json(ERR_MSG);
}

exports.module = {
  sendJson,
  sendError,
};
