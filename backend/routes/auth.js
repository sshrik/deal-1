const express = require('express');
const fs = require('fs');
const pool = require('../model/db');
const router = express.Router();
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');

// Server에 사용자가 로그인 되어있는지 요청
router.get('/ping', async (req, res) => {
  util.sendJson(res, { data: 'admit' });
});

module.exports = router;
