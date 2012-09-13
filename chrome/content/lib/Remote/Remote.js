"use strict";
Wiz.Remote = function () {
	this.initialize();
};

Wiz.Remote.prototype.initialize = function () {
	this.initCommon();
};

Wiz.Remote.prototype.initCommon = function () {

};

Wiz.Remote.prototype.getPostObj = function () {
	var data = {
		'client_type' : 'web3',
		'api_version' : 3,
	    'program_type' : 'normal'
	};
	return data;
};

Wiz.Remote.prototype.clientLogin = function (username, password, rememberMe, callSuccess, callError) {
	var postParams = this.getPostObj();
	postParams.user_id = username;
	postParams.password = password;
	var success = function(respJson) {
		Wiz.saveAuthCookie(username + '*' + password ,rememberMe);
		Wiz.saveTokenCookie(respJson.token);
		callSuccess(respJson);
	}
	xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.ACCOUNT_LOGIN, [postParams], success, callError);
};

Wiz.Remote.prototype.keepAlive = function (callSuccess, callError) {
	var token = this.getToken();
	if (token !== null) {
		var postParams = this.getPostObj();
		postParams.token = token;
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.ACCOUNT_KEEPALIVE, [postParams], callSuccess, callError);
	} else {
		//TODO need to autoLogin
	}
};

Wiz.Remote.prototype.getAllCategory = function (callSuccess, callError) {
	var token = this.getToken();
	if (token !== null) {
		var postParams = this.getPostObj();
		postParams.token = token;
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.GET_AllCATEGORIES, [postParams], callSuccess, callError)
	}
};

Wiz.Remote.prototype.getAllTag = function (callSuccess, callError) {
	var token = this.getToken();
	if (token !== null) {
		var postParams = this.getPostObj();
		postParams.token = token;
		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.GET_AllTAGS, [postParams], callSuccess, callError)
	}
};

Wiz.Remote.prototype.postDocument = function (docInfo) {
	var token = this.getToken();
	if (token !== null) {
		var regexp = /%20/g, 
			title = docInfo.title, 
			category = docInfo.category, 
			comment = docInfo.comment, 
			body = docInfo.content;
		  
		if (comment && comment.trim() != '') {
			body = comment + '<hr>' + body;
		}
		
		if (!category) {
			category = '/My Notes/';
		}

		var error = function (err) {
			try {
				var respJson = JSON.parse(err);
				Wiz.notificator.showClipSuccess(docInfo.title);
			} catch (err) {
				Wiz.notificator.showError(err);
			}
		}
		var success = function () {
			Wiz.notificator.showClipSuccess(docInfo.title);
		}
		
		var requestData = 'title=' + encodeURIComponent(title).replace(regexp,  '+') + '&token_guid=' + encodeURIComponent(token).replace(regexp,  '+') 
							+ '&body=' + encodeURIComponent(body).replace(regexp,  '+') + '&category=' + encodeURIComponent(category).replace(regexp,  '+');
		ajax(Wiz.POST_DOCUMENT_URL, requestData, success, error);				
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

Wiz.Remote.prototype.getToken = function () {
	var cookie = Wiz.getTokenCookie();
	if (cookie && cookie.value && cookie.value.length > 0) {
		return cookie.value;
	}
	return null;
};

