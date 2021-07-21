const express = require('express');
const fs = require('fs');
const pool = require('../model/db');
const { getCertainCateogories } = require('../model/query/categories');
const router = express.Router();
const {
  getAllProducts,
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

router.get('/products', async (req, res) => {
  try {
    const [results, _] = await pool.execute(getAllProducts);
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: '제품 조회실패' });
  }
});

router.get('/products_user', async (req, res) => {
  try {
    // access middle ware 설정 후 변경 예정
    const [results, _] = await pool.execute(getAllProductsAuth, ['ag502']);
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: '제품조회 실패' });
  }
});

router.get('/product/:id', async (req, res) => {
  console.log(req.params.id);
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
    console.log(likeCount);
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
      fs.writeFileSync(
        `public/resource/productImg/ag502_${title}.jpg`,
        imageBlob,
        'base64'
      );
      try {
        console.log('aaa');
        await pool.execute(addNewProdcutSpec, [
          curTime,
          `productImg/ag502_${title}.jpg`,
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
    // access middle ware 설정 후 변경 예정
    await pool.execute(deleteLikeProduct, ['ag502', productId]);
    res.status(200).json({ message: '삭제 성공' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user_selling_list', async (req, res) => {
  try {
    // access middle ware 설정 후 변경 예정
    const [results, _] = await pool.execute(getUserSellingProducts, ['ag502']);
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
