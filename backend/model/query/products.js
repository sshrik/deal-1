const getAllProducts =
  'SELECT * FROM products JOIN users ON products.seller = users.id JOIN productSpecs ON products.id = productSpecs.productId';

const addNewProduct =
  'INSERT INTO products (title, uploadTime, price, detail, seller, category, viewCount, nowSelling) VALUES(?, ?, ?, ?, (SELECT id FROM users WHERE userName = ?), ?, ?, ?)';
const addNewProdcutSpec =
  'INSERT INTO products VALUES((SELECT id FROM products WHERE title = *), *, *)';

// INSERT INTO products
//    VALUES (1, '빈티지 롤러 스케이트', 10000, 30000, '한번 사용했습니다.', 'ag502', '스포츠/레저', 0, 1);
// INSERT INTO productSpecs
// 	VALUES(1, 1, 'productImg/roller1.png', 1)

// INSERT INTO bar (description, foo_id) VALUES
//     ( 'testing',     (SELECT id from foo WHERE type='blue') ),
//     ( 'another row', (SELECT id from foo WHERE type='red' ) );

module.exports = { getAllProducts, addNewProduct, addNewProdcutSpec };
