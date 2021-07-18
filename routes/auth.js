const express = require('express');
const pool = require('../model/db');
const bycrypt = require('bcrypt');
const { getUser, createUser } = require('../model/query/auth');

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

router.post('/check_access', async (req, res) => {
  if (req.session?.userName) {
    return res.status(200).json({ userName: req.session.userName });
  }
  res.status(401).json({ error: '접근할 수 없는 페이지 입니다.' });
});

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const results = await checkUser(userName);
    if (results.length === 0) {
      return res.status(401).json({ error: '아이디를 확인해 주세요.' });
    }
    if (!bycrypt.compareSync(password, results[0].password)) {
      return res.status(401).json({ error: '비밀번호를 확인해 주세요.' });
    }
    req.session.userName = userName;
    req.session.save(() => {
      res.status(200).json({ userName });
    });
  } catch (error) {
    res.status(500).json({ error: '회원 정보를 찾을 수 없습니다.' });
  }
});

router.post('/user_check', async (req, res) => {
  const { userName } = req.body;
  try {
    const results = await checkUser(userName);
    if (results.length !== 0) {
      return res.status(401).json({ error: '이미 존재하는 계정 입니다.' });
    }
    return res.status(200).json({ userName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  const { userName, password, area } = req.body;
  try {
    const hashedPw = bycrypt.hashSync(password, SALT_ROUNDS);
    await pool.execute(createUser, [userName, hashedPw, area]);
    res.status(200).json({ userName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
