const getAllProducts = `SELECT p.id as productId, p.title as title, p.uploadTime as uploadTime,
  p.price as price, p.detail as detail, p.category as category, p.viewCount as viewCount, p.nowSelling as nowSelling,
  u.userName as userName, u.id as userId, u.area_1 as area_1, u.area_2 as area_2, ps.imgSrc as imgSrc
   FROM products p JOIN users u ON p.seller = u.id JOIN productSpecs ps ON p.id = ps.productId`;

const addNewProduct =
  'INSERT INTO products (title, uploadTime, price, detail, seller, category, viewCount, nowSelling) VALUES(?, ?, ?, ?, (SELECT id FROM users WHERE userName = ?), ?, ?, ?)';

const addNewProdcutSpec =
  'INSERT INTO productSpecs (productId, imgSrc, isMain) VALUES((SELECT id FROM products WHERE uploadTime = ?), ?, ?)';

const addLikeProduct =
  'INSERT INTO likes (userId, productId) VALUES((SELECT id FROM users WHERE userName = ?), ?)';

const deleteLikeProduct =
  'DELETE FROM likes WHERE userId = (SELECT id FROM users WHERE userName = ?) AND productId = ?';

const getUserSellingProducts =
  'SELECT * FROM products JOIN productSpecs ON products.id = productSpecs.productId WHERE seller = (SELECT id FROM users WHERE userName =?)';

const getUserLikeProducts =
  'SELECT * FROM products JOIN productSpecs ON products.id = productSpecs.productId JOIN likes on products.id = likes.productId WHERE likes.userId = (SELECT id FROM users WHERE userName = ?)';

module.exports = {
  getAllProducts,
  addNewProduct,
  addNewProdcutSpec,
  addLikeProduct,
  deleteLikeProduct,
  getUserSellingProducts,
  getUserLikeProducts,
};
