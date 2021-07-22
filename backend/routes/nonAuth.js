const { getAllProducts } = require('../model/query/products');
const express = require('express');
const pool = require('../model/db');
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');
const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const [results, _] = await pool.execute(getAllProducts);
    util.sendJson(res, { data: results });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

module.exports = router;
