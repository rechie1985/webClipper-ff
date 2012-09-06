"use strict";
Wiz.Document = function() {
	this.__defineGetter__("content", this.getDocContent);
	this.__defineSetter__("content", this.setDocContent);
	this.__defineGetter__("title", this.getDocTitle);
	this.__defineSetter__("title", this.setDocTitle);
}

//set default category
Wiz.Document.prototype._category = Wiz.Default.DOC_CATEGORY;
Wiz.Document.prototype._title = Wiz.Default.DOC_TITLE;


//get document info , use to post document.
Wiz.Document.prototype.getDocInfo = function() {
	var docInfo = {};
	info.title = this._title;
	info.category = this._category;
	info.content = this._content;
	return docInfo;
};
Wiz.Document.prototype.setDocTitle = function(docTitle) {
	if(docTitle) {
		this._title = docTitle;
	}
};
Wiz.Document.prototype.getDocTitle = function() {
	return this._title;
};

Wiz.Document.prototype.setDocContent = function(docContent) {
	this._content = docContent;
};
Wiz.Document.prototype.getDocContent = function() {
	return this._content;
};

Wiz.Document.prototype.setDocCategory = function(docCategory) {
	if(docCategory) {
		this._category = docCategory;
	}
};
Wiz.Document.prototype.getDocCategory = function() {
	return this._category;
}
Wiz.Document.createContextMenuDoc = function(tab, content) {
	var doc = new Wiz.Document();
	doc.title = tab.title;
	doc.content = content;
	return doc;
}
