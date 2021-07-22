const express = require('express');
const util = require('../lib/util');
const CONSTANT = require('../lib/constant');
const router = express.Router();
const pool = require('../model/db');
const {
  enterChattingRoom,
  getChatLog,
  sendChat,
  getChattingRoom,
  searchMyRoom,
  updateLast1,
  updateLast2,
  getRoomProductInfo,
} = require('../model/query/chat');

async function updateLast(productId, user1, user2, nowTime) {
  const [r1, _] = await pool.execute(updateLast1, [nowTime, productId, user1]);
  const [r2, __] = await pool.execute(updateLast2, [nowTime, productId, user2]);
}

router.post('/enter_chat', async (req, res) => {
  try {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const productId = req.body.productId;
    const nowTime = new Date().getTime();

    const [results, _] = await pool.execute(getChattingRoom, [
      productId,
      user1,
      user2,
      user2,
      user1,
    ]);
    if (results.length === 0) {
      const [r, ___] = await pool.execute(enterChattingRoom, [
        productId,
        user1,
        user2,
        nowTime,
        nowTime,
      ]);
      util.sendJson(res, { data: false, roomId: r.insertId });
    } else {
      util.sendJson(res, { data: true, roomId: results[0].id });
    }
  } catch (error) {
    console.log(error);
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/room_exist', async (req, res) => {
  try {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const productId = req.body.productId;
    const [results, _] = await pool.execute(getChattingRoom, [
      productId,
      user1,
      user2,
      user2,
      user1,
    ]);
    if (results.length === 0) {
      util.sendJson(res, { data: false, roomId: results[0].roomId });
    } else {
      util.sendJson(res, { data: true, roomId: results[0].roomId });
    }
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/get_log', async (req, res) => {
  try {
    const roomId = req.body.roomId;
    const nowTime = new Date().getTime();

    const [results, _] = await pool.execute(getChatLog, [roomId]);

    util.sendJson(res, { data: results });
  } catch (error) {
    console.log(error);
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/set_log', async (req, res) => {
  try {
    const sendName = req.body.sendName;
    const recvName = req.body.recvName;
    const productId = req.body.productId;
    const chatMsg = req.body.chatMsg;
    const sendTime = new Date().getTime();
    const type = req.body.type;
    const roomId = req.body.roomId;

    const [results, _] = await pool.execute(sendChat, [
      sendName,
      recvName,
      productId,
      chatMsg,
      sendTime,
      type,
      roomId,
    ]);

    // await updateLast(productId, sendName, sendName, nowTime);
    util.sendJson(res, { data: results });
  } catch (error) {
    console.log(error);
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/get_my_room', async (req, res) => {
  try {
    const userName = req.body.userName;
    console.log(userName);

    const [results, _] = await pool.execute(searchMyRoom, [userName, userName]);
    util.sendJson(res, { data: results });
  } catch (error) {
    console.log(error);
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/get_room_info', async (req, res) => {
  try {
    const roomId = req.body.roomId;

    const [results, _] = await pool.execute(getRoomProductInfo, [roomId]);
    util.sendJson(res, { data: results });
  } catch (error) {
    console.log(error);
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

module.exports = router;
