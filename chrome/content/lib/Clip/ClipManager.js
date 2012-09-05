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
			clipper.contenxtMenuClipFullpage();
			break;
		case "CLIP_ACTION_SELECTION" :
			clipper.contenxtMenuClipSelection();
			break;
		case "CLIP_ACTION_URL" :
			clipper.contenxtMenuClipUrl();
			break;
		}
	}
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
