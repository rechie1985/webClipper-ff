'use strict';
//主要用来获取本地客户端的目录信息
Wiz.DOMNativeController = function (win, appId) { 
	this.initialize(win, appId);
};

Wiz.DOMNativeController.prototype._nativeClient = null;

Wiz.DOMNativeController.prototype.initialize = function (Win, appId) {
	var nativeClient = win.document.getElementById(appId),
		version = nativeClient.Version;
	if (version) {
		this._nativeClient = nativeClient;
	}
};

Wiz.DOMNativeController.prototype.hasNativeClient = function () {
	if (this._nativeClient === null) {
		return false;
	}
	return true;
};

Wiz.DOMNativeController.prototype.getNativeCategory = function (userid) {
	var categoryStr = null;
	if (this._nativeClient) {
		try {
			categoryStr = this._nativeClient.GetAllFolders(userid)
		} catch (err) {
			//获取不到，不做处理
		}
	}
	return categoryStr;
};




