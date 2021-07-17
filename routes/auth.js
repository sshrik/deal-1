const express = require('express');
const pool = require('../model/db');
const { getUser } = require('../model/query/auth');
const router = express.Router();

router.post('/login', (req, res) => {
  const { userName, password } = req.body;
  pool.execute(getUser, [userName], (err, results, field) => {
    if (err) {
      return res.status(500).json({ error: '회원 정보를 찾을 수 없습니다.' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: '아이디를 확인해 주세요.' });
    }
    if (results[0].passWord !== password) {
      return res.status(401).json('비밀번호를 확인해 주세요.');
    }
    res.status(200).json({ userName });
  });
});

module.exports = router;
