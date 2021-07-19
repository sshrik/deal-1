const express = require('express');
const pool = require('../model/db');
const router = express.Router();
const { getAllProducts } = require('../model/query/products');

router.get('/products', async (req, res) => {
  console.log('a');
  try {
    const [results, _] = await pool.execute(getAllProducts);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: '제품 조회실패' });
  }
});

module.exports = router;
