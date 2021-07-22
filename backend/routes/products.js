const express = require('express');
const fs = require('fs');
const pool = require('../model/db');
const { getCertainCateogories } = require('../model/query/categories');
const router = express.Router();
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');

const {
  addNewProduct,
  addNewProdcutSpec,
  addLikeProduct,
  deleteLikeProduct,
  getUserSellingProducts,
  getUserLikeProducts,
  getAllProductsAuth,
  getCetainProduct,
  getProductLikes,
} = require('../model/query/products');

router.get('/products_user', async (req, res) => {
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

    const [likeCount, ___] = await pool.execute(getProductLikes, [
      req.params.id,
    ]);
    productBasicInfo[0].like = likeCount[0].likeCount;

    res.status(200).json({ data: productBasicInfo[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add_product', async (req, res) => {
  try {
    const { title, price, detail, category, files } = req.body;
    const curTime = new Date().getTime();
    await pool.execute(addNewProduct, [
      title,
      curTime,
      parseInt(price),
      detail,
      'ag502',
      category,
      0,
      1,
    ]);
    files.forEach(async (file, idx) => {
      const imageBlob = file.split(',')[1];
      const fileName = `productImg/ag502_${title}_${idx}.jpg`;
      fs.writeFileSync(`public/resource/${fileName}`, imageBlob, 'base64');
      try {
        await pool.execute(addNewProdcutSpec, [
          curTime,
          `${fileName}`,
          idx === 0 ? 1 : 0,
        ]);
      } catch (error) {
        throw new Error(error);
      }
    });
    res.status(200).json({ message: '추가 성공' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add_like_product', async (req, res) => {
  try {
    const { productId } = req.body;
    // access middle ware 설정 후 변경 예정
    await pool.execute(addLikeProduct, ['ag502', productId]);
    res.status(200).json({ message: '추가 성공' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/delete_like_product', async (req, res) => {
  try {
    const { productId } = req.body;
    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    await pool.execute(deleteLikeProduct, [id, productId]);
    res.status(200).json({ message: '삭제 성공' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user_selling_list', async (req, res) => {
  try {
    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    const [results, _] = await pool.execute(getUserSellingProducts, [id, id]);
    util.sendJson(res, { data: results });
  } catch (error) {
    util.sendError(res, error.message);
  }
});

router.get('/user_like_list', async (req, res) => {
  try {
    const [results, _] = await pool.execute(getUserLikeProducts, ['ag502']);
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
