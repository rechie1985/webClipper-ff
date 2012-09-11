"use strict";
Wiz.Remote = function () {
	this.initialize();
	this.__defineGetter__('token', this.getToken);
};

Wiz.Remote.prototype._data = null;

Wiz.Remote.prototype.initialize = function () {
	this.initCommon();
};

Wiz.Remote.prototype.initCommon = function () {
	this._data = {
		'client_type' : 'web3',
		'api_version' : 3,
	    'program_type' : 'normal'
	};
};

Wiz.Remote.prototype.getToken = function () {
	if (!this._data) {
		return null;
	}
	return this._data.token;
};

Wiz.Remote.prototype.clientLogin = function (username, password, rememberMe, callSuccess, callError) {
	this._data.user_id = username;
	this._data.password = password;
	var success = function(respJson) {
		Wiz.saveAuthCookie(username + '*' + password ,rememberMe);	
		this._data.token = respJson.token;
		callSuccess(respJson);
	}
	xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.ACCOUNT_LOGIN, [this._data], $.proxy(success, this), callError);
};

Wiz.Remote.prototype.keepAlive = function (callSuccess, callError) {
	if (this._data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.ACCOUNT_KEEPALIVE, [this._data], callSuccess, callError);
	} else {
		//TODO need to autoLogin
	}
};

Wiz.Remote.prototype.getAllCategory = function (callSuccess, callError) {
	if (this._data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.GET_AllCATEGORIES, [this._data], callSuccess, callError)
	}
};

Wiz.Remote.prototype.getAllTag = function (callSuccess, callError) {
	if (this._data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.GET_AllTAGS, [this._data], callSuccess, callError)
	}
};

Wiz.Remote.prototype.postDocument = function (docInfo, callSuccess, callError) {
	alert(this._data.token);
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
        xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.DOCUMENT_POSTSIMPLE, [simplePostDataParams], callSuccess, callError);
	}
};

