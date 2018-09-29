let getSize = require('./getSize');

module.exports = async (items, size) => {
  var deletes = [];
  var i = 1;
  var base = size * 1024 * 1024;
  for (let item of items) {
    let size = await getSize(item)
    if (size < base) deletes.push(item);
  };
  return deletes;
};
