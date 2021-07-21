const selectLocation = 'select area_1, area_2 from users where userName = ?';

const updateLocationOne =
  'update users set area_1 = ?, area_2 = null where userName = ?';

const updateLocationAll =
  'update users set area_1 = ?, area_2 = ? where userName = ?';

module.exports = {
  selectLocation,
  updateLocationOne,
  updateLocationAll,
};
