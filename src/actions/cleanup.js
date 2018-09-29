let { resolve } = require('path'),
  { deleteItems, getDeletes, getItems } = require('../helpers'),
  { prompt } = require('../consoleIO');

module.exports = async (options) => {
  let { dir, size, force, verbose } = options;
  if (!size) size = 30;
  if (!dir) dir = '.';
  dir = resolve(dir);

  let items = await getItems(dir);
  let deletes = await getDeletes(items, size);

  if (deletes.length > 0) {
    if (verbose && !force) console.log('Files found to delete:\n', deletes);
    if (force) {
      await deleteItems(deletes, verbose);
    } else {
      let confirm = await prompt(`Are you sure you want to delete these ${deletes.length} items? (Y/n) `);
      if (confirm.toLowerCase() === 'y') {
        await deleteItems(deletes, verbose);
      } else {
        console.log('Cleanup aborted');
      };
    };
  } else {
    console.log(`Found no items smaller than ${size} MB`);
  };
};
