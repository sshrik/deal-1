const getAllCategories = 'SELECT * FROM categories';

const getCertainCateogories = 'SELECT * FROM categories WHERE id = ?';

module.exports = { getAllCategories, getCertainCateogories };
