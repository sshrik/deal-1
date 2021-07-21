const express = require('express');
const pool = require('../model/db');
const bycrypt = require('bcrypt');
const { getUser, createUser } = require('../model/query/auth');
const app = require('../../app');
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');

const SALT_ROUNDS = 10;
const router = express.Router();

const checkUser = async (userName) => {
  try {
    const [results, _] = await pool.execute(getUser, [userName]);
    return results;
  } catch (error) {
    return new Error('사용자 조회 실패');
  }
};

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const results = await checkUser(userName);
    if (results.length === 0) {
      util.sendError(res, CONSTANT.UNVALID_LOGIN_INFO_ERROR.type);
    } else if (!bycrypt.compareSync(password, results[0].password)) {
      util.sendError(res, CONSTANT.UNVALID_LOGIN_INFO_ERROR.type);
    }
    util.sendJson(res, { userName });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/user_check', async (req, res) => {
  const { userName } = req.body;
  try {
    const results = await checkUser(userName);
    if (results.length !== 0) {
      util.sendError(res, CONSTANT.DUPLICATE_ID_INFO_ERROR.type);
    }
    util.sendJson(res, { userName });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/register', async (req, res) => {
  const { userName, password, area } = req.body;
  try {
    const hashedPw = bycrypt.hashSync(password, SALT_ROUNDS);
    await pool.execute(createUser, [userName, hashedPw, area]);
    util.sendJson(res, { userName });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.get('/logout', async (req, res) => {
  util.sendJson(res, { message: '로그아웃 성공' });
});

module.exports = router;
