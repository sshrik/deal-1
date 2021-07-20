const express = require('express');
const pool = require('../model/db');
const router = express.Router();
const {
  getAllProducts,
  addNewProduct,
  addNewProdcutSpec,
} = require('../model/query/products');

router.get('/products', async (req, res) => {
  try {
    const [results, _] = await pool.execute(getAllProducts);
    console.log(results);
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: '제품 조회실패' });
  }
});

router.post('/add_product', async (req, res) => {
  try {
    const { title, price, detail, category, files } = req.body;
    await pool.execute(addNewProduct, [
      title,
      new Date().getTime(),
      parseInt(price),
      detail,
      'ag502',
      category,
      0,
      1,
    ]);
    res.status(200).json({ message: '추가 성공' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
