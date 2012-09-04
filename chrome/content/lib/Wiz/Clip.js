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
	alert("clip");
	alert(Wiz.ContentPreview);
	var contentPreview = new Wiz.ContentPreview();
	alert(contentPreview);
}