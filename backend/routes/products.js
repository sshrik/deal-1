const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
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
  getProductLikes,
  changeSellState,
  deleteSellingProduct,
  updateProduct,
  deleteProductSpecs,
  updateProductSpecs,
  getCertainProductAuth,
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
    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    const [productBasicInfo, _] = await pool.execute(getCertainProductAuth, [
      id,
      req.params.id,
    ]);
    const imgSrc = [];
    productBasicInfo.forEach((info) => imgSrc.push(info.imgSrc));
    productBasicInfo[0].imgSrc = imgSrc;

    const [category, __] = await pool.execute(getCertainCateogories, [
      productBasicInfo[0].category,
    ]);
    productBasicInfo[0].categoryName = category[0].name;

    const [likeCount, ___] = await pool.execute(getProductLikes, [
      req.params.id,
    ]);
    productBasicInfo[0].like = likeCount[0].likeCount;

    res.status(200).json({ data: productBasicInfo[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/add_product', async (req, res) => {
  try {
    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    const { title, price, detail, category, files } = req.body;
    console.log(title, price, detail, category, files);
    const curTime = new Date().getTime();
    await pool.execute(addNewProduct, [
      title,
      curTime,
      parseInt(price),
      detail,
      id,
      category,
      0,
      1,
    ]);
    files.forEach(async (file, idx) => {
      const imageBlob = file.split(',')[1];
      const fileName = `productImg/${id}_${title}_${idx}.jpg`;
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

router.post('/update_product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, detail, files, category } = req.body;
    console.log(id, title, price, detail, files, category);
    await pool.execute(deleteProductSpecs, [id]);
    files.forEach(async (file, idx) => {
      if (!file.includes(',')) {
        await pool.execute(updateProductSpecs, [id, file, idx === 0 ? 1 : 0]);
      } else {
        const imageBlob = file.split(',')[1];
        const fileName = `productImg/ag502_${title}_${uuid.v4()}.jpg`;
        fs.writeFileSync(`public/resource/${fileName}`, imageBlob, 'base64');
        await pool.execute(updateProductSpecs, [
          id,
          fileName,
          idx === 0 ? 1 : 0,
        ]);
      }
    });
    await pool.execute(updateProduct, [title, price, detail, category, id]);
    util.sendJson(res, { message: '변경 성공' });
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
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
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

router.post('/set_sell_state', async (req, res) => {
  try {
    console.log(req.body);
    const [results, _] = await pool.execute(changeSellState, [
      req.body.nowSelling,
      req.body.productId,
    ]);
    util.sendJson(res, { data: results });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});
router.post('/delete_selling_product', async (req, res) => {
  try {
    const { productId } = req.body;
    await pool.execute(deleteSellingProduct, [productId]);
    util.sendJson(res, { message: '삭제 성공' });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

module.exports = router;
