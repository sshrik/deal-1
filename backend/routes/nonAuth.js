const express = require('express');
const pool = require('../model/db');
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');
const router = express.Router();
const {
  getAllProducts,
  getCetainProduct,
  getProductLikes,
} = require('../model/query/products');
const { getCertainCateogories } = require('../model/query/categories');

router.get('/products', async (req, res) => {
  try {
    const [results, _] = await pool.execute(getAllProducts);
    util.sendJson(res, { data: results });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const [productBasicInfo, _] = await pool.execute(getCetainProduct, [
      req.params.id,
    ]);
    const imgSrc = [];
    productBasicInfo.forEach((info) => imgSrc.push(info.imgSrc));
    productBasicInfo[0].imgSrc = imgSrc;

    const [category, __] = await pool.execute(getCertainCateogories, [
      productBasicInfo[0].category,
    ]);
    productBasicInfo[0].category = category[0].name;

    console.log(productBasicInfo);
    const [likeCount, ___] = await pool.execute(getProductLikes, [
      req.params.id,
    ]);
    productBasicInfo[0].like = likeCount[0].likeCount;

    res.status(200).json({ data: productBasicInfo[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
