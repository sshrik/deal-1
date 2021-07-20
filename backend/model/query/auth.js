const getUser = 'SELECT * FROM users WHERE userName = ?';
const createUser =
  'INSERT INTO users(userName, password, area_1) VALUES(?, ?, ?)';

module.exports = {
  getUser,
  createUser,
};
