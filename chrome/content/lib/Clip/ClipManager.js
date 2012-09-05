"use strict";
Wiz.ClipManager = function() {
	this.__defineGetter__("sender", this.getSender);
	this.__defineGetter__("notificator", this.getNotificator);
	this.__defineGetter__("clipper", this.get)
	this.initialize();	
}

Wiz.ClipManager.prototype.initialize = fucntion() {
	this._clipper = new Wiz.ContentClipper();
	this._sender = new Wiz.ClipSender();
	this._notificator = new Wiz.ClipNotificator();
	this._tab = content;
}

Wiz.ClipManager.prototype.startClip = function(rootElement, contextMenuClipType){
	var clipper = new Wiz.Clipper(content);
	//if not contextMenu clicked, show preview and the popup
	if(!contextMenuClipType) {
		//TODO 不应该是直接显示预览,openDialog和预览应该同时进行
		clipper.doClipPreview();
	} else {
		switch(contextMenuClipType) {
		case "CLIP_ACTION_FULL_PAGE" :
			this.contenxtMenuClipFullpage();
			break;
		case "CLIP_ACTION_SELECTION" :
			this.contenxtMenuClipSelection();
			break;
		case "CLIP_ACTION_URL" :
			this.contenxtMenuClipUrl();
			break;
		}
	}
}
Wiz.ClipManager.prototype.contenxtMenuClipFullpage = function() {
	var docContent = this._clipper.getFullpageHTML(this._tab);
	var doc = Wiz.Document.createContextMenuDoc(this._tab, docContent);
	this.postDocument(doc);
}

Wiz.ClipManager.prototype.contenxtMenuClipSelection = function() {
	doc.content = this._clipper.getSelectedHTML(this._tab);
	var doc = Wiz.Document.createContextMenuDoc(this._tab, docContent);
	this.postDocument(doc);
}

Wiz.ClipManager.prototype.contenxtMenuClipUrl = function() {
	doc.content = this._tab.location.href;
	var doc = Wiz.Document.createContextMenuDoc(this._tab, docContent);
	this.postDocument(doc);
}

Wiz.ClipManager.prototype.postDocument = function(doc) {
	this._sender.postDocument(doc.getDocInfo);			
}


Wiz.ClipManager.prototype.getClipper = function() {
	if(!this._clipper) {
		this._clipper = new Wiz.ContentClipper();
	}
	return this._clipper;
}

Wiz.ClipManager.prototype.getNotificator = function() {
	if(!this._notificator) {
		this._notificator = new Wiz.ClipNotificator();
	}
	return this._notificator;
}

Wiz.ClipManager.prototype.getSender = function() {
	if(!this._sender) {
		this._sender = new Wiz.ClipSender();
	}
	return this._sender;
}
