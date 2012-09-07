"use strict";
Wiz.ClipSender = function (clipManager) {
	this._clipManager = clipManager;
	this.initialize();
};

Wiz.ClipSender.prototype.initialize = function () {
};

Wiz.ClipSender.prototype.postDocument = function (docInfo) {
	Wiz.remote.postDocument(docInfo, this.callbackSuccess, this.callbackErrot);
};


Wiz.ClipSender.prototype.callbackSuccess = function (response) {
	alert("success");
};

Wiz.ClipSender.prototype.callbackErrot = function (err){
	alert(err);
};