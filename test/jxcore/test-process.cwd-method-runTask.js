// Copyright & License details are available under JXCORE_LICENSE file

/*
 This code compares process.cwd() called from main thread and method.runTask()
 */

var assert = require('assert');
var clog = jxcore.utils.console.log;
var finished = false;

var value = JSON.stringify(process.cwd());

var method = function (obj) {
  return JSON.stringify(process.cwd());
};

process.on('exit', function (code) {
  assert.ok(finished, "The test did not finish.");
});

method.runTask(null, function (ret) {

  finished = true;

  clog("main thread:", "green");
  clog("\t", value);

  clog("method.runTask():", "magenta");
  clog("\t", ret);

  assert.strictEqual(value, ret, "Values are not equal: process.cwd()");

  // forcing faster exit than naturally
  setTimeout(process.exit, 10);

});


