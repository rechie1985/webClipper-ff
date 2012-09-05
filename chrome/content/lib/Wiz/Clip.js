"use strict";

Wiz.Clipper = function(tab) {
	this._tab = tab;
}

Wiz.Clipper.prototype.doClipPreview = function() {
	alert(this._tab);
}

Wiz.Clipper.prototype.clipSelection = function(contentPreview) {
	contentPreview.previewSelection();
}

Wiz.Clipper.prototype.clipFullpage = function(contentPreview) {
	contentPreview.previewArticle();
}

Wiz.Clipper.prototype.clipUrl = function(contentPreview) {
	contentPreview.previewUrl();
}