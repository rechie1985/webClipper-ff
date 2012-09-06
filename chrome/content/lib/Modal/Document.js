"use strict";
Wiz.Document = function () {
	this.__defineSetter__("title", this.setDocTitle);
	this.__defineSetter__("content", this.setDocContent); 
	this.initialize();
};

//set default category
Wiz.Document.prototype._category = Wiz.Default.DOC_CATEGORY;
Wiz.Document.prototype._title = Wiz.Default.DOC_TITLE;
Wiz.Document.prototype._guid = null;


Wiz.Document.prototype.initialize = function () {
	this._guid = Wiz.Document.genGuid();
};

//get document info , use to post document.
Wiz.Document.prototype.getDocInfo = function () {
	var docInfo = {};
	docInfo.title = this._title;
	docInfo.category = this._category;
	docInfo.content = this._content;
	docInfo.guid = this._guid;
	return docInfo;
};
Wiz.Document.prototype.setDocTitle = function (docTitle) {
	if(docTitle) {
		this._title = docTitle;
	}
};
Wiz.Document.prototype.getDocTitle = function () {
	return this._title;
};

Wiz.Document.prototype.setDocContent = function (docContent) {
	this._content = docContent;
};
Wiz.Document.prototype.getDocContent = function () {
	return this._content;
};

Wiz.Document.prototype.setDocCategory = function (docCategory) {
	if(docCategory) {
		this._category = docCategory;
	}
};
Wiz.Document.prototype.getDocGuid = function () {
	if (!this._guid){
		this._guid = genGuid();
	}
	return this._guid;
}
Wiz.Document.prototype.getDocCategory = function () {
	return this._category;
}
Wiz.Document.createContextMenuDoc = function (tab, content) {
	var doc = new Wiz.Document();
	doc.title = tab.title;
	doc.content = content;
	return doc;
}

Wiz.Document.genGuid = function () {
    function S4 () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    var guid = S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    return guid;
}
