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

module.exports = {
  enterChattingRoom,
  getChatLog,
  sendChat,
  getChattingRoom,
  updateLast1,
  updateLast2,
  searchUser,
};
