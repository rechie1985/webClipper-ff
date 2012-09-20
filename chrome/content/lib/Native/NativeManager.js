'use strict';
Wiz.NativeManager = function () {
	this.__defineGetter__('mozillaCtrl', this.getMozillaClient);
};
//本地调用XPCOM的client
Wiz.NativeManager.prototype._MozillaNativeCtrl = null;
//dom中调用的client
Wiz.NativeManager.prototype._DOMNativeCtrl = null;

Wiz.NativeManager.prototype.startNativeClip = function (info) {
	this.mozillaCtrl.startClip(info);
};

Wiz.NativeManager.prototype.getMozillaClient = function () {
	if (!this._MozillaNativeCtrl) {
		this._MozillaNativeCtrl = new Wiz.MozillaNativeController();
	}
	return this._MozillaNativeCtrl;
};

Wiz.NativeManager.prototype.getDOMClient = function () {
	return this._DOMNativeCtrl;
};

Wiz.NativeManager.prototype.bInstall = function () {
	return this.mozillaCtrl.bInstall();
};