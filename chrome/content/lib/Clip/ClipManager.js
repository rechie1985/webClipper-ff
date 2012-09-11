"use strict";
Wiz.ClipManager = function() {
	this.__defineGetter__("sender", this.getSender);
	this.__defineGetter__("notificator", this.getNotificator);
	this.__defineGetter__("clipper", this.getClipper);
	this.initialize();
};

Wiz.ClipManager.prototype.initialize = function() {
	this._clipper = new Wiz.ContentClipper();
	this._notificator = new Wiz.ClipNotificator(this);
	this._sender = new Wiz.ClipSender(this);
	this._tab = content;
};

Wiz.ClipManager.prototype.startClip = function(rootElement, contextMenuClipType) {
	//if not contextMenu clicked, show preview and the popup
	var token = Wiz.context.token;
	alert(token);
	if (!contextMenuClipType || typeof token === 'undefined' || token === null) { 
		//TODO 不应该是直接显示预览,openDialog和预览应该同时进行
		this._clipper.openPopup();
	} else {
		switch (contextMenuClipType) {
		case "CLIP_ACTION_FULL_PAGE":
			this.contenxtMenuClipFullpage();
			break;
		case "CLIP_ACTION_SELECTION":
			this.contenxtMenuClipSelection();
			break;
		case "CLIP_ACTION_URL":
			this.contenxtMenuClipUrl();
			break;
		}
	}
};
Wiz.ClipManager.prototype.contenxtMenuClipFullpage = function() {
	var docContent = this._clipper.collectAllFrames(this._tab),
		doc = Wiz.Document.createContextMenuDoc(this._tab, docContent);
	this.postDocument(doc);
};

Wiz.ClipManager.prototype.contenxtMenuClipSelection = function() {
	var docContent = this._clipper.getSelectedHTML(this._tab),
		doc = Wiz.Document.createContextMenuDoc(this._tab, docContent);
	this.postDocument(doc);
};

Wiz.ClipManager.prototype.contenxtMenuClipUrl = function() {
	var url = this._tab.location.href,
		docContent = "<a href='" + url + "'>" + url + "</a>",
		doc = Wiz.Document.createContextMenuDoc(this._tab, docContent);
	this.postDocument(doc);
};

Wiz.ClipManager.prototype.postDocument = function(doc) {
	this._sender.postDocument(doc.getDocInfo());
};


Wiz.ClipManager.prototype.getClipper = function() {
	if (!this._clipper) {
		this._clipper = new Wiz.ContentClipper();
	}
	return this._clipper;
};

Wiz.ClipManager.prototype.getNotificator = function() {
	if (!this._notificator) {
		this._notificator = new Wiz.ClipNotificator();
	}
	return this._notificator;
};

Wiz.ClipManager.prototype.getSender = function() {
	if (!this._sender) {
		this._sender = new Wiz.ClipSender();
	}
	return this._sender;
};