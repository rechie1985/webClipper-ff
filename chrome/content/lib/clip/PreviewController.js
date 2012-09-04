function PreviewController() {
  "use strict";

  var reqName = "preview";

  function executeScript(tabId, codeString, callback) {
    controller.executeScript(tabId, {code: codeString}, callback);
  }

  function previewFullPage(tabId, callback) {
    var req = {name: reqName, op: "fullPage"};
    chrome.tabs.sendRequest(tabId, req, callback);
  }

  function previewSelection(tabId, callback) {
    var req = {name: reqName, op: "selection"};
    chrome.tabs.sendRequest(tabId, req, callback);
  }

  function previewArticle(tabId, callback, showHelp) {
    var req = {name: reqName, op: "article", args:{showHelp: showHelp}};
    chrome.tabs.sendRequest(tabId, req, callback);
  }

  function previewURL(tabId, callback) {
    var req = {name: reqName, op: "url"};
    chrome.tabs.sendRequest(tabId, req, callback);
  }

  function nudgePreview(tabId, direction, callback) {
    var req = {name: reqName, op: "nudge", args: {direction: direction}};
    chrome.tabs.sendRequest(tabId, req, callback);
  }

  function clear(tabId, callback) {
    var req = {name: reqName, op: "clear"};
    chrome.tabs.sendRequest(tabId, req, callback);
  }

  // Utility function called by 'clearAll'.
  function clearAllWindows(windows) {
    var i, j;
    for (i = 0; i < windows.length; i++) {
      if (windows[i].tabs) {
        for (j = 0; j < windows[i].tabs.length; j++) {
          // We explicitly ignore chrome-specific URLs, as trying to access them throws errors.
          if (!windows[i].tabs[j].url.match(/^chrome.*:\/\//)) {
            clear(windows[i].tabs[j].id);
          }
        }
      }
    }
  }

  // Clears the preview for *all* open tabs in all open windows. Even ones that don't have a preview. Even ones that
  // might not have an 'Evernote' object. This isn't really ideal. It'd be better to call 'clear' for a specific tab.
  function clearAll() {
    chrome.windows.getAll({populate: true}, clearAllWindows);
  }

  // Public API:
  this.clear = clear;
  this.clearAll = clearAll;
  this.nudgePreview = nudgePreview;
  this.previewArticle = previewArticle;
  this.previewFullPage = previewFullPage;
  this.previewSelection = previewSelection;
  this.previewURL = previewURL;

  // Force people to add properties and methods for this object here, and not arbitrarily from other code.
  Object.preventExtensions(this);
};

// register shortcut keys
// document.querySelector("body").addEventListener("keydown", nudge);

function nudge(evt) {
    // We won't do anything unless we're pretty sure we're correct.
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
    // Note: the keys in here are all coerced to strings!
    // var KEY_ALT = 18, KEY_CTRL = 17;
    // var keyMap = {
      // 13: "enter",
      // 27: "cancle",
      // 38: "expand", // up
      // 40: "shrink", // down
      // 37: "left",
      // 39: "right",
// 
      // 56: "topexpand", // alt + up
      // 58: "topshrink", // alt + down
// 
      // 57: "bottomexpand", // ctrl + down
      // 55: "bottomshrink", // ctrl + up
    // }
// 
    // if (keyMap[key]) {
      // if (evt.altKey == true) // 18
          // contentPreview.nudgePreview(keyMap[key+KEY_ALT]);
      // else if (evt.ctrlKey == true) // 17
          // contentPreview.nudgePreview(keyMap[key+KEY_CTRL]);
      // else
          // contentPreview.nudgePreview(keyMap[key]);
      // //previewController.nudgePreview(null, keyMap[key]);
      // //chrome.extension.sendRequest({name: "preview", op: "clear"});
    // }
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
      //previewController.nudgePreview(null, keyMap[key]);
      //chrome.extension.sendRequest({name: "preview", op: "clear"});
    }
}
