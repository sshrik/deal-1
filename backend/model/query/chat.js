const enterChattingRoom = `INSERT INTO chatrooms (productId, userName, lastview)
VALUES(?, (SELECT id FROM users WHERE userName= ? ), ?),
(?, (SELECT id FROM users WHERE userName= ? ), ?);`;

const getChatLog = `SELECT chatMsg, sendTime, type from chats where productId = ? and (
  ( sendName =(SELECT id FROM users WHERE userName= ? )and recvName = (SELECT id FROM users WHERE userName= ? ) ) or
  ( sendName = (SELECT id FROM users WHERE userName=? ) and recvName = (SELECT id FROM users WHERE userName=?) )
);`;

const sendChat = `
INSERT INTO chats ( sendName, recvName, productId, chatMsg, sendTime, type)
VALUE(  (SELECT id FROM users WHERE userName= ? ), (SELECT id FROM users WHERE userName= ? ), ?, ?, ?, 'chat');`;

module.exports = { enterChattingRoom, getChatLog, sendChat };
