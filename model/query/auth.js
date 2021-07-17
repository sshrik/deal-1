const getUser = 'SELECT * FROM Users WHERE userName = ?';
const createUser =
  'INSERT INTO Users(userName, password, area_1) VALUES(?, ?, ?)';

module.exports = {
  getUser,
  createUser,
};
