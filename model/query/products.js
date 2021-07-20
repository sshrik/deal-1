const getAllProducts =
  'SELECT * FROM products JOIN users ON products.seller = users.id JOIN productSpecs ON products.id = productSpecs.productId';

module.exports = { getAllProducts };
