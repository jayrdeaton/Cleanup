let readline = require('./readline');

module.exports = (prompt) => {
  return new Promise((resolve, reject) => {
    if (!prompt) prompt = '> ';
    readline.question(prompt, (input) => {
      resolve(input);
    });
  });
};
