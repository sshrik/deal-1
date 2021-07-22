// Error Class
class ErrorMetaData {
  constructor(type, statusCode, msg) {
    this.type = type;
    this.statusCode = statusCode;
    this.msg = msg;
  }
}

// AUTH 관련 에러 정의
const NO_BMCOOKIE_ERROR = new ErrorMetaData(
  'ERR_000',
  401,
  '헤더에 설정된 COOKIE가 없습니다.'
);
const NO_SESSION_INFOR_ERROR = new ErrorMetaData(
  'ERR_001',
  401,
  '로그인 되어있지 않습니다.'
);

const UNVALID_INFO_ERROR = new ErrorMetaData(
  'ERR_002',
  401,
  '로그인된 아이디와 COOKIE가 다릅니다.'
);

const UNVALID_LOGIN_INFO_ERROR = new ErrorMetaData(
  'ERR_003',
  401,
  '로그인 정보를 확인해주세요.'
);

const DUPLICATE_ID_INFO_ERROR = new ErrorMetaData(
  'ERR_004',
  401,
  '이미 존재하는 계정 입니다.'
);

// 내부 문제 관련 정의
const INTERNAL_SERVER_ERROR = new ErrorMetaData(
  'ERR_100',
  500,
  '알 수 없는 서버 에러가 발생했습니다.'
);
const DB_QUERY_ERROR = new ErrorMetaData(
  'ERR_101',
  500,
  'DB 처리중에 문제가 발생했습니다.'
);

module.exports = {
  NO_BMCOOKIE_ERROR,
  NO_SESSION_INFOR_ERROR,
  UNVALID_INFO_ERROR,
  INTERNAL_SERVER_ERROR,
  DB_QUERY_ERROR,
  UNVALID_LOGIN_INFO_ERROR,
  DUPLICATE_ID_INFO_ERROR,
};
