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
	this._data.token = "4bfa5d60-3306-4d52-b099-c75cb7868b0d";
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
	alert("post");
	if (this._data.token) {
		var regexp = /%20/g, 
			title = docInfo.title, 
			category = docInfo.category, 
			comment = docInfo.comment, 
			body = docInfo.content;
		if (comment && comment.trim() != '') {
			body = comment + '<hr>' + body;
		}
		var sending = 'title=' + encodeURIComponent(title).replace(regexp,  '+') + '&token_guid=' + encodeURIComponent(this._data.token).replace(regexp,  '+') 
									+ '&body=' + encodeURIComponent(body).replace(regexp,  '+') + '&category=' + encodeURIComponent(category).replace(regexp,  '+');
		ajax(Wiz.POST_DOCUMENT_URL, sending, callSuccess, callError);
	}
}

