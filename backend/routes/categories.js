const express = require('express');
const router = express.Router();
const pool = require('../model/db');
const { getAllCategories } = require('../model/query/categories');

router.get('/categories', async (req, res) => {
  try {
    const [results, _] = await pool.execute(getAllCategories);
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
