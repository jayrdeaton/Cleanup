var fs = require('fs');
var getFolderSize = require('get-folder-size');
var rimraf = require('rimraf');
var prompt = require('prompt');

var cleanup = (dir, program) => {
  getItems(dir).then((items) => {
    getDeletes(items, program).then((deletes) => {
      if (deletes.length > 0) {
        if (program.verbose && !program.force) console.log('Files found to delete ', deletes);
        prompt.start();
        prompt.message = '';
        if (program.force) {
          deleteItems(deletes, program);
        } else {
          prompt.get({
            properties: {
              confirm: {
                description: 'Are you sure you want to delete these ' + deletes.length + ' items? (Y/n)'
              }
            }
          }, (err, result) => {
            if (result.confirm === 'Y' || result.confirm === 'y') {
              deleteItems(deletes, program);
            } else {
              console.log('Cleanup aborted');
            }
          });
        };
      } else {
        var base = 30;
        if (program.size) base = program.size;
        console.log('Found no items smaller than ' + base + 'MB');
      };
    });
  });
};
deleteItems = (deletes, program) => {
  return new Promise((resolve, reject) => {
    deletes.forEach((d, index) => {
      rimraf(d, () => {
        if (program.verbose) console.log('Deleted ' + d);
      });
      if (index === deletes.length - 1) resolve();
    });
  });
};
getItems = (dir) => {
  return new Promise((resolve, reject) => {
    var itemDirs = [];
    fs.readdir(dir, function(err, items) {
      var size;
      items.forEach((item) => {
        itemDir = dir + '/' + item;
        itemDirs.push(itemDir);
      });
      resolve(itemDirs);
    });
  });
};
getDeletes = (items, program) => {
  return new Promise((resolve, reject) => {
    var deletes = [];
    var i = 1;
    var base = 30 * 1024 * 1024;
    if (program.size) base = program.size * 1024 * 1024;
    items.forEach((item) => {
      getSize(item).then((size) => {
        if (size < base) deletes.push(item);
        if (i === items.length) resolve(deletes);
        i++;
      });
    });
  });
};
getSize = (dir) => {
  return new Promise((resolve, reject) => {
    getFolderSize(dir, function(err, size) {
      if (err) throw err;
      resolve(size);
    });
  });
};
module.exports.cleanup = cleanup;
