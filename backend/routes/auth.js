const express = require('express');
const fs = require('fs');
const pool = require('../model/db');
const router = express.Router();
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');
const { searchUser } = require('../model/query/chat');

// Server에 사용자가 로그인 되어있는지 요청
router.get('/ping', async (req, res) => {
  util.sendJson(res, { data: 'admit' });
});

router.post('/search_id', async (req, res) => {
  try {
    const [results, _] = await pool.execute(searchUser, [req.body.id]);
    util.sendJson(res, { data: results[0] });
  } catch {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

module.exports = router;
