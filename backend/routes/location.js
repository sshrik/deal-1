const express = require('express');
const pool = require('../model/db');
const router = express.Router();
const CONSTANT = require('../lib/constant');
const util = require('../lib/util');

const {
  selectLocation,
  updateLocationOne,
  updateLocationAll,
} = require('../model/query/location');

let curLocation = '흑석동';

router.post('/location_change', async (req, res) => {
  try {
    
  } catch(error) {

  }
})

router.get('/location', async (req, res) => {
  try {
    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    const [results, _] = await pool.execute(selectLocation, [id]);
    util.sendJson(res, { data: [results[0].area_1, results[0].area_2] });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/location', async (req, res) => {
  try {
    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    const [results, _] = await pool.execute(updateLocationOne, [
      req.body.area_1,
      id,
    ]);
    util.sendJson(res, { data: 'admit' });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

router.post('/location_all', async (req, res) => {
  try {
    const bmCookie = req.cookies.bmCookie;
    const id = req.session[bmCookie];
    const [results, _] = await pool.execute(updateLocationAll, [
      req.body.area_1,
      req.body.area_2,
      id,
    ]);
    util.sendJson(res, { data: 'admit' });
  } catch (error) {
    util.sendError(res, CONSTANT.INTERNAL_SERVER_ERROR.type);
  }
});

module.exports = router;
