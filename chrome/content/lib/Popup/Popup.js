Wiz.FFPopup = function (params) {
	this.__defineGetter__('clipManager', this.getClipManager);
	this.__defineGetter__('preview', this.getPreview);
	this.__defineGetter__('loginCtrl', this.getLoginCtrl);
	this.__defineGetter__('notePageCtrl', this.getNotePageCtrl);
	this.__defineGetter__('remote', this.getRemote);
	this.initialize(params);
};

Wiz.FFPopup.prototype._clipManager = null;
Wiz.FFPopup.prototype._preview = null;
Wiz.FFPopup.prototype._loginCtrl = null;
Wiz.FFPopup.prototype._notePageCtrl = null;
Wiz.FFPopup.prototype._remote = null;

Wiz.FFPopup.prototype.initialize = function (params) {
	this._clipManager = params.clipManager;
	this._preview = params.preview;
	this._loginCtrl = new Wiz.LoginControl(this);
	this._notePageCtrl = new Wiz.NotePageControl(this);
	this._remote = new Wiz.Remote();
};

Wiz.FFPopup.prototype.getClipManager = function () {
	return this._clipManager;
};

Wiz.FFPopup.prototype.getPreview = function () {
	return this._preview;
};

Wiz.FFPopup.prototype.getRemote = function () {
	if (!this._remote) {
		this._remote = new Wiz.Remote();
	}
	return this._remote;
};

Wiz.FFPopup.prototype.getLoginCtrl = function () {
	if (!this._loginCtrl) {
		this._loginCtrl = new Wiz.LoginController(this);
	}
	return this._loginCtrl;
};

Wiz.FFPopup.prototype.getNotePageCtrl = function () {
	if (!this._notePageCtrl) {
		this._notePageCtrl = new Wiz.NotePageController(this);
	}
	return this._notePageCtrl;
};

Wiz.FFPopup.prototype.startPopup = function () {
	var authCookie = Wiz.getAuthCookie();
	Wiz.PopupView.localizePopup();
	if(authCookie && authCookie.value) {
		this._loginCtrl.autoLogin(authCookie);
	} else {
		Wiz.PopupView.showLogin();
	}
};

Wiz.FFPopup.prototype.closePopup = function () {
	window.close();
};

Wiz.FFPopup.prototype.logout = function () {
	Wiz.removeAuthCookie();
	this.closePopup();
}
