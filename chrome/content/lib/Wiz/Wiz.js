"use strict";

if (typeof Wiz == "undefined") {
    var Wiz = {
		_clipManager : null,
		_preview : null,
		_remote : null
    };

    Wiz.SERVICE_URL = "http://127.0.0.1:8800/wiz";
    Wiz.XMLRPC_URL = Wiz.SERVICE_URL + "/xmlrpc";
    Wiz.POST_DOCUMENT_URL = Wiz.SERVICE_URL + "/a/web/post?";
    Wiz.EXTENSIOD_ID = "wizbrother@wiz.cn";
}

Wiz.init = function (tab) {
	this._clipManager = new Wiz.ClipManager();
	this._remote = new Wiz.Remote();
};
Wiz.getClipManager = function () {
	if (!this._clipManager) {
		this._clipManager = new Wiz.ClipManager();
	}
	return this._clipManager;
};
Wiz.setClipManager = function (clipManager) {
	this._clipManager = clipManager;
};

Wiz.getPreview = function() {
	if (!this._preview) {
		//TODO throw exception?
		this._preview = new Wiz.ContentPreview(content);
	}
	return this._preview;
};
Wiz.setPreview = function (preview) {
	this._preview = preview;
};

Wiz.getRemote = function () {
	if (!this._remote) {
		this._remote = new Wiz.Remote();
	}
	return this._remote;
};

Wiz.setRemote = function (remote) {
	this._remote = remote;
};
Wiz.__defineGetter__("clipManager", Wiz.getClipManager);
Wiz.__defineGetter__("preview", Wiz.getPreview);
Wiz.__defineGetter__("remote", Wiz.getRemote);