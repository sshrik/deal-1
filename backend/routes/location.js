const express = require('express');
const pool = require('../model/db');
const router = express.Router();
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');

const { getAllProductsAuth } = require('../model/query/location');

router.get('/location', async (req, res) => {
  try {
    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    // access middle ware 설정 후 변경 예정
    const [results, _] = await pool.execute(getAllProductsAuth, [id]);
    util.sendJson(res, { data: results });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/location', async (req, res) => {});

router.post('/location_all', async (req, res) => {});

module.exports = router;
