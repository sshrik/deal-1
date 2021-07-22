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
  updateLast1,
  updateLast2,
} = require('../model/query/chat');

async function updateLast(productId, user1, user2, nowTime) {
  const [r1, _] = await pool.execute(updateLast1, [nowTime, productId, user1]);
  const [r2, _] = await pool.execute(updateLast2, [nowTime, productId, user2]);
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

    console.log(results);

    if (results[0] == 0) {
      const [results, _] = await pool.execute(getChattingRoom, [
        productId,
        user1,
        user2,
        nowTime,
        nowTime,
      ]);
      util.sendJson(res, { data: results });
    } else {
      util.sendError(res, CONSTANT.ALREADY_EXIST_ROOM.type);
    }
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/get_log', async (req, res) => {
  try {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const productId = req.body.productId;
    const nowTime = new Date().getTime();

    const [results, _] = await pool.execute(getChatLog, [
      productId,
      user1,
      user2,
      user2,
      user1,
    ]);

    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    await updateLast(productId, id, id, nowTime);

    // const data = { chatMsg, sendName, recvName, sendTime, type };
    const chatLogs = {};
    results.forEach((element) => {
      const { chatMsg, sendName, recvName, sendTime, type } = element;
      console.log(element);
    });
    util.sendJson(res, { data: chatLogs });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/set_log', async (req, res) => {
  try {
    sendName, recvName, productId, chatMsg, sendTime, type;
    const sendName = req.body.sendName;
    const recvName = req.body.recvName;
    const productId = req.body.productId;
    const chatMsg = req.body.chatMsg;
    const sendTime = new Date().getTime();
    const type = req.body.type;

    const [results, _] = await pool.execute(sendChat, [
      sendName,
      recvName,
      productId,
      chatMsg,
      sendTime,
      type,
    ]);
    // const data = { chatMsg, sendName, recvName, sendTime, type };
    const chatLogs = {};
    results.forEach((element) => {
      //  { chatMsg, sendName, recvName, sendTime, type } = element;
      console.log(element);
    });

    await updateLast(productId, sendName, sendName, nowTime);
    util.sendJson(res, { data: chatLogs });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

module.exports = router;
