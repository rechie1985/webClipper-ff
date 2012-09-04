"use strict";

Wiz.Clipper = function(tab) {
	this._tab = tab;
}

Wiz.Clipper.prototype.doClipPreview = function() {
	alert(this._tab);
}

Wiz.Clipper.prototype.clipSelection = function() {
	alert(this._tab.getSelection());
}

Wiz.Clipper.prototype.clipFullpage = function() {
	alert(this._tab);
}

Wiz.Clipper.prototype.clipUrl = function() {
		var veil = this._tab.document.createElement("canvas");
		var context = veil.getContext('2d');
		var body = this._tab.document.body;
		alert(body);
		alert(context);
	try{
		this._contentPreview = new Wiz.ContentPreview(this._tab);
	} catch(err) {
		alert("clip url error : " + err);
	}
}