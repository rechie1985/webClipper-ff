Wiz.FFPopup = function (params) {
	this.__defineGetter__('clipManager', this.getClipManager);
	this.__defineGetter__('loginCtrl', this.getLoginCtrl);
	this.__defineGetter__('notePageCtrl', this.getNotePageCtrl);
	this.initialize(params);
};

Wiz.FFPopup.prototype._clipManager = null;
Wiz.FFPopup.prototype._preview = null;
Wiz.FFPopup.prototype._loginCtrl = null;
Wiz.FFPopup.prototype._notePageCtrl = null;
Wiz.FFPopup.prototype._remote = null;
Wiz.FFPopup.prototype._tab = null;

Wiz.FFPopup.prototype.initialize = function (params) {
	this._tab = params.content;
	this._clipManager = new Wiz.ClipManager();
	this._preview = new Wiz.ContentPreview(params.content);
	this._remote = params.remote;
	this._loginCtrl = new Wiz.LoginControl(this);
	this._notePageCtrl = new Wiz.NotePageControl(this);
};

Wiz.FFPopup.prototype.getClipManager = function () {
	if (!this._clipManager) {
		this._clipManager = new Wiz.ClipManager();
	}
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
	try {
		var authCookie = Wiz.getAuthCookie(),
			token = Wiz.context.token;
		Wiz.PopupView.localizePopup();
		if (authCookie && authCookie.value) {
			if (!token) {
				this._loginCtrl.autoLogin(authCookie);
			} else {
				this.showAndInitNotePage();
			}
		} else {
			Wiz.PopupView.showLogin();
		}
	} catch (err) {
		Wiz.logger.error('Wiz.FFPopup.startPopup() Error : ' + err);
	}
};

Wiz.FFPopup.prototype.showAndInitNotePage = function () {
	try {
		Wiz.PopupView.showNotePage();
		this._preview.previewArticle();
		this._notePageCtrl.initialize();
	} catch (err) {
		Wiz.logger.error('Wiz.FFPopup.showAndInitNotePage() Error : ' + err);
	}
};

Wiz.FFPopup.prototype.closePopup = function () {
	try {
		this._preview.clear();
		this._tab = null;
		this._remote = null;
		this._loginCtrl = null;
		this._clipManager = null;
		this._notePageCtrl = null;
		window.close();
	} catch (err) {
		Wiz.logger.error('Wiz.FFPopup.closePopup() Error : ' + err);
	}
};

Wiz.FFPopup.prototype.logout = function () {
	Wiz.cookieManager.removeAll();
	this.closePopup();
};

Wiz.FFPopup.prototype.getClipInfo = function () {
	if (this._preview) {
		return this._preview.getClipInfo();
	}
	return null;
};

Wiz.FFPopup.prototype.getTitle = function () {
	if (this._tab) {
		return this._tab.document.title;
	}
};

Wiz.FFPopup.prototype.switchPreview = function (previewType) {
	if (previewType) {
		try {
			switch(previewType) {
			case 'article' :
				this._preview.previewArticle();
				break;
			case 'selection' : 
				this._preview.previewSelection();
				break;
			case 'fullPage' :
				this._preview.previewFullPage();
				break;
			case 'url' : 
				this._preview.previewUrl();
				break;
			}
		} catch (err) {
			Wiz.logger.error('Wiz.FFPopup.switchPreview() type = ' + previewType + ' Error : ' + err);
		}
	}
};

Wiz.FFPopup.prototype.getDocBody = function (clipType, isNative) {
	if (isNative) {
		//本地保存不需要获取文档内容，通过XPCOM处理
		return "";
	}
	if (this._clipManager && this._preview) {
		return this._clipManager.getClipDocumentBody(clipType, this._preview);
	}
	return "";
};

Wiz.FFPopup.prototype.requestCategory = function (callSuccess, callError) {
	this._remote.getAllCategory(callSuccess, callError);
};

Wiz.FFPopup.prototype.requestSubmit = function (docInfo) {
	//popup页面提交时，必须传过去当前的win对象，否则无法获取内容
	docInfo.win = this._tab;
	this.clipManager.saveClip(docInfo);
};

