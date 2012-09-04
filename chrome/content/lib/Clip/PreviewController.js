function PreviewController() {
  "use strict";

  var reqName = "preview";

  function executeScript(tabId, codeString, callback) {
    controller.executeScript(tabId, {code: codeString}, callback);
  }

  function previewFullPage(tabId, callback) {
    var req = {name: reqName, op: "fullPage"};
  }

  function previewSelection(tabId, callback) {
    var req = {name: reqName, op: "selection"};
  }

  function previewArticle(tabId, callback, showHelp) {
    var req = {name: reqName, op: "article", args:{showHelp: showHelp}};
  }

  function previewURL(tabId, callback) {
    var req = {name: reqName, op: "url"};
  }

  function nudgePreview(tabId, direction, callback) {
    var req = {name: reqName, op: "nudge", args: {direction: direction}};
  }

  function clear(tabId, callback) {
    var req = {name: reqName, op: "clear"};
  }

  // Public API:
  this.clear = clear;
  this.clearAll = clearAll;
  this.nudgePreview = nudgePreview;
  this.previewArticle = previewArticle;
  this.previewFullPage = previewFullPage;
  this.previewSelection = previewSelection;
  this.previewURL = previewURL;

};

function nudge(evt) {
    if (!evt) return;
    if (!evt.srcElement) return;
    if (!evt.keyCode) return;

    var skipTypes = ["input", "select", "textarea"];
    for (var i = 0; i < skipTypes.length; i++) {
      if (evt.srcElement.nodeName.toLowerCase() == skipTypes[i]) {
        return;
      }
    }

    var key = evt.keyCode;
    contentPreview.nudgePreview(getNudgeOp(key, evt));
}

function getNudgeOp(key, evt) {
	var returnValue = null;
	var KEY_ALT = 18, KEY_CTRL = 17;
    var keyMap = {
      27: "cancle",
      38: "expand", // up
      40: "shrink", // down
      37: "left",
      39: "right",

      56: "topexpand", // alt + up
      58: "topshrink", // alt + down

      57: "bottomexpand", // ctrl + down
      55: "bottomshrink", // ctrl + up
    }

    if (keyMap[key]) {
      if (evt && evt.altKey == true) { // 18         
      	 // contentPreview.nudgePreview(keyMap[key+KEY_ALT]);
      	 returnValue = keyMap[key+KEY_ALT];
      } else if (evt && evt.ctrlKey == true) {// 17
      	 // contentPreview.nudgePreview(keyMap[key+KEY_CTRL]);
      	 returnValue = keyMap[key+KEY_CTRL];
      } else {
      	 // contentPreview.nudgePreview(keyMap[key]);
      	 returnValue = keyMap[key];
      }
      return returnValue;
    }
}
