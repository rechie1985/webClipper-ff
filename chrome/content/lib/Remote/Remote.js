"use strict";
Wiz.Remote = function() {
	this.initialize();
}

Wiz.Remote.prototype.initialize = function() {
	this.initCommon();
}

Wiz.Remote.prototype.initCommon = function() {
	this._data = {};
	this._data.client_type = "web3";
	this._data.api_version = 3;
    this._data.program_type = "normal";
	this._data.token = "0bdefc98-4eeb-40f1-aef7-53df4ec07ec4";
    this._data.kb_guid = "325a4734-66d1-11e1-a992-00237def97cc";
}

Wiz.Remote.prototype.clientLogin = function(username, password, rememberMe, callSuccess, callError) {
	this._data.user_id = username;
	this._data.password = 'md5.' + hex_md5(password);
	if(rememberMe) {
		//TODO 保存用户名密码
	}
	var success = function(respJson) {
		this._data.token = respJson.token;
		callSuccess(respJson);
	}
	xmlrpc(Wiz.XMLRPC_URL, Wiz.API.ACCOUNT_LOGIN, [this.data], success, callError);
}

Wiz.Remote.prototype.keepAlive = function(callSuccess, callError) {
	if(this._data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.API.ACCOUNT_KEEPALIVE, [this.data], callSuccess, callError);
	} else {
		//TODO need to autoLogin
	}
}

Wiz.Remote.prototype.getAllCategory = function(callSuccess, callError) {
	if(this._data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.API.GET_AllCATEGORIES, [this.data], callSuccess, callError)
	}
}

Wiz.Remote.prototype.getAllTag = function(callSuccess, callError) {
	if(this._data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.API.GET_AllTAGS, [this.data], callSuccess, callError)
	}
}

Wiz.Remote.prototype.postDocument = function(docInfo, callSuccess, callError) {
	if (this._data.token) {
		// var regexp = /%20/g, 
		// 	title = docInfo.title, 
		// 	category = docInfo.category, 
		var comment = docInfo.comment, 
			body = docInfo.content;
		if (comment && comment.trim() != '') {
			body = comment + '<hr>' + body;
		}
		var simplePostDataParams = this._data;
        simplePostDataParams.document_guid = docInfo.guid;
        simplePostDataParams.document_title = docInfo.title;
        simplePostDataParams.document_body = body;
        simplePostDataParams.document_category = docInfo.category;
        simplePostDataParams.document_data = "";
        simplePostDataParams.dt_modified = new Date();
   		alert(body);
        xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.DOCUMENT_POSTSIMPLE, [simplePostDataParams], callSuccess, callError);

	}
}

