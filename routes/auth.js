const express = require('express');
const pool = require('../model/db');
const { getUser } = require('../model/query/auth');
const router = express.Router();

router.post('/login', (req, res) => {
  const { userName, password } = req.body;
  pool.execute(getUser, [userName], (err, results, field) => {
    console.log(results);
    if (err) {
      return res.status(500).send('회원 정보를 찾을 수 없습니다.');
    }
    if (results.length === 0) {
      return res.status(401).send('아이디를 확인해 주세요.');
    }
    if (results[0].passWord !== password) {
      return res.status(401).send('비밀번호를 확인해 주세요.');
    }
    res.status(200).send('로그인 성공');
  });
});

module.exports = router;
