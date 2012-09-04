"use strict";

if ( typeof Wiz == "undefined" ) {
    var Wiz = {};

    Wiz.SERVICE_URL = "http://service.wiz.cn/wizkm"
    Wiz.XMLRPC_URL = Wiz.SERVICE_URL + "/xmlrpc";
    Wiz.POST_DOCUMENT_URL = Wiz.SERVICE_URL + "/web/post?";
    Wiz.EXTENSIOD_ID = "wizbrother@wiz.cn";
}

Wiz.API = {
	ACCOUNT_LOGIN : "accounts.clientLogin",
	ACCOUNT_KEEPALIVE : "accounts.keepAlive",
	ACCOUNT_GETOKEN : "accounts.getToken",
	GET_AllCATEGORIES : "category.getAll",
	GET_ALLTAGS : "tag.getList"
};
