const getAllProducts =
  'SELECT * FROM products JOIN users ON products.seller = users.id JOIN productSpecs ON products.id = productSpecs.productId';
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

module.exports = {
  getAllProducts,
  addNewProduct,
  addNewProdcutSpec,
  addLikeProduct,
  deleteLikeProduct,
  getUserSellingProducts,
};
