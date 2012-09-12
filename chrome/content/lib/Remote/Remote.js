"use strict";
Wiz.Remote = function () {
	this.initialize();
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
Wiz.Remote.prototype.clientLogin = function (username, password, rememberMe, callSuccess, callError) {
	this._data.user_id = username;
	this._data.password = password;
	var success = function(respJson) {
		Wiz.saveAuthCookie(username + '*' + password ,rememberMe);
		Wiz.saveTokenCookie(respJson.token);
		callSuccess(respJson);
	}
	xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.ACCOUNT_LOGIN, [this._data], success, callError);
};

Wiz.Remote.prototype.keepAlive = function (callSuccess, callError) {
	if (Wiz.context.token ) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.ACCOUNT_KEEPALIVE, [this._data], callSuccess, callError);
	} else {
		//TODO need to autoLogin
	}
};

Wiz.Remote.prototype.getAllCategory = function (callSuccess, callError) {
	if (Wiz.context.token ) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.GET_AllCATEGORIES, [this._data], callSuccess, callError)
	}
};

Wiz.Remote.prototype.getAllTag = function (callSuccess, callError) {
	if (Wiz.context.token ) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.GET_AllTAGS, [this._data], callSuccess, callError)
	}
};

Wiz.Remote.prototype.postDocument = function (docInfo, callSuccess, callError) {
	alert(Wiz.context.token );
	if (Wiz.context.token) {
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

/**
 * 自动登陆处理
 * @param  {[type]} cookie      [保存在cookie中的auth信息]
 * @param  {[type]} callSuccess [description]
 * @param  {[type]} callError   [description]
 * @return {[type]}             [description]
 */
Wiz.Remote.prototype.autoLogin = function (cookie, callSuccess, callError) {
	var info = cookie.value,
		split_count = info.indexOf('*md5'),
		user_id = info.substring(0, split_count),
		password = info.substring(split_count + 1);
	this.clientLogin(user_id, password, true, callSuccess, callError);
};

