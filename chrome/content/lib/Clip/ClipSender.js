Wiz.ClipSender = function(clipManager) {
	this._clipManager = clipManager;
	this.initialize();
}

Wiz.ClipSender.prototype.initialize = function() {
	this._remote = new Wiz.Remote();
}

Wiz.ClipSender.prototype.postDocument = function(docInfo) {
	this._remote.postDocument(docInfo, this.callbackSuccess, this.callbackErrot);
}


Wiz.ClipSender.prototype.callbackSuccess = function(response) {
	alert("success");
}

Wiz.ClipSender.prototype.callbackErrot = function(err){
	alert("" + err);
}