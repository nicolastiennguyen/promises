/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getGitHub = require('./promisification.js');

Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return fs.readFileAsync(readFilePath, 'utf8')
    .then(function(data) {
      let text = data.toString();
      return text.slice(0, text.indexOf('\n'));
    })
    .then(function(user) {
      return getGitHub.getGitHubProfileAsync(user);
    })
    .then(function(data) {
      console.log(data);
      // console.log(data.id.toString());
      let id = data.id.toString();
      return fs.writeFileAsync(writeFilePath, JSON.stringify(data));
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
