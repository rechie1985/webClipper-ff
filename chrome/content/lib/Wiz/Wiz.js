"use strict";

if ( typeof Wiz == "undefined" ) {
    Wiz = {
    	_remote : null,
    	_syncmanager : null,
    	_cookieManager : null,
    	_toolbarManager : null,
    	_clipResult : null,
    	_clipProcessor : null,
    	_viewManger : null,
    };

    Wiz.SERVICE_URL = "http://service.wiz.cn/wizkm"
    Wiz.XMLRPC_URL = Wiz.SERVICE_URL + "/xmlrpc";
    Wiz.POST_DOCUMENT_URL = Wiz.SERVICE_URL + "/web/post?";
    Wiz.EXTENSIOD_ID = "wizbrother@wiz.cn";
}

Wiz.getPostDocumentUrl= function() {
	return Wiz.POST_DOCUMENT_URL;
}

Wiz.init = function() {
	this._syncmanager = new Wiz.SyncManager();
	this._remote = new Wiz.Remote();
    this._clipProcessor = new Evernote.ClipProcessor();
}


Wiz.API = {
	ACCOUNT_LOGIN = "accounts.clientLogin",
	ACCOUNT_KEEPALIVE = "accounts.keepAlive",
	ACCOUNT_GETOKEN = "accounts.getToken",
	GET_AllCATEGORIES = "category.getAll",
	GET_ALLTAGS = "tag.getList"
};
