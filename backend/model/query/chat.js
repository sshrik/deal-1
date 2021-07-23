const enterChattingRoom = `INSERT INTO chatrooms (productId, user1, user2, lastview1, lastview2)
VALUES(?, (SELECT id FROM users WHERE userName= ? ), (SELECT id FROM users WHERE userName= ? ), ?, ?);`;

const getChatLog = `SELECT chatMsg, sendName, recvName, sendTime, type from chats where roomId = ?`;

const sendChat = `
INSERT INTO chats ( sendName, recvName, productId, chatMsg, sendTime, type, roomId)
VALUE(  (SELECT id FROM users WHERE userName= ? ), (SELECT id FROM users WHERE userName= ? ), ?, ?, ?, ?, ?);`;

const getChattingRoom = `SELECT id from chatrooms 
WHERE productId = ? AND
(
  (user1 = (SELECT id FROM users WHERE userName = ?) AND user2 = (SELECT id FROM users WHERE userName = ?)) OR 
  (user1 = (SELECT id FROM users WHERE userName = ?) AND user2 = (SELECT id FROM users WHERE userName = ?))
);`;

const updateLast1 = `UPDATE chatrooms SET lastview1 = ? where productId = ? and user1 = ?`;
const updateLast2 = `UPDATE chatrooms SET lastview2 = ? where productId = ? and user2 = ?`;

const searchUser = `SELECT userName from users where id = ?`;

const searchMyRoom = `SELECT id from chatrooms where user1 = (SELECT id FROM users WHERE userName = ?) or user2 = (SELECT id FROM users WHERE userName = ?)`;

const searchRoomWithId = `SELECT user1, user2, productId from chatrooms where id = ?`;

const getRoomProductInfo = `
SELECT p.id, p.title, p.uploadTime, p.price, p.detail, p.seller, p.category, p.viewCount, p.nowSelling, ps.imgSrc, u.userName as sellerName
FROM products p JOIN productSpecs ps on p.id = ps.productId JOIN users u on p.seller = u.id 
WHERE p.id = (SELECT productId FROM chatrooms where id=?)
`;

module.exports = {
  enterChattingRoom,
  getChatLog,
  sendChat,
  getChattingRoom,
  updateLast1,
  updateLast2,
  searchUser,
  searchMyRoom,
  searchRoomWithId,
  getRoomProductInfo,
};
