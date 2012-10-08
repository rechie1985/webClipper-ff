"use strict";
Wiz.Remote = function () {
	this.initialize();
};

Wiz.Remote.prototype.initialize = function () {
	this.initCommon();
};

Wiz.Remote.prototype.initCommon = function () {

};

Wiz.Remote.getPostObj = function () {
	var data = {
		'client_type' : 'web3',
		'api_version' : 3,
	    'program_type' : 'normal'
	};
	return data;
};

Wiz.Remote.prototype.clientLogin = function (username, password, rememberMe, callSuccess, callError) {
	try {
		Wiz.logger.debug('Wiz.Remote.clientLogin : ' + username + '---' + password);

		var postParams = Wiz.Remote.getPostObj();
		postParams.user_id = username;
		postParams.password = password;
		var success = function (respJson) {
			//登陆成功后，集中处理需要的信息
			Wiz.logger.debug('Wiz.Remote.clientLogin() Success : ' + JSON.stringify(respJson));

			Wiz.saveAuthCookie(username + '*' + password, rememberMe);
			Wiz.saveTokenCookie(respJson.token);
			//每次登陆成功后，重新写入now_user,方便以后显示或查看
			Wiz.prefStorage.set(Wiz.Pref.NOW_USER, username, 'char');
			callSuccess(respJson);
			
			//自动保持token在线
			setInterval(Wiz.remote.keepAlive, Wiz.Default.REFRESH_TOKEN_TIME_MS);
		},
			callError = callError || function(){};

		xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.ACCOUNT_LOGIN, [postParams], success, callError);
	} catch (err) {
		Wiz.logger.error('Wiz.Remote.clientLogin() Error : ' + err);
	}
};

Wiz.Remote.prototype.keepAlive = function (callSuccess, callError) {
	Wiz.logger.debug('Wiz.Remote.keepAlive(): start keepAlive');
	callSuccess = function () {
		Wiz.logger.debug('Wiz.Remote.keepAlive(): ' + Wiz.context.token);
	};
	callError = function (errorMsg) {
		//保持失败，自动登陆
		this.autoLogin();
		Wiz.logger.error('Wiz.Remote.keepAlive() Error: ' + errorMsg);
	};
	try {
		var token = Wiz.context.token;
		if (token !== null) {
			var postParams = Wiz.Remote.getPostObj();
			postParams.token = token;
			xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.ACCOUNT_KEEPALIVE, [postParams], callSuccess, callError);
		} else {
			//TODO need to autoLogin
		}	
	} catch (err) {
		Wiz.logger.error('Wiz.Remote.keepAlive() Error : ' + err);
	}
};

Wiz.Remote.prototype.getAllCategory = function (callSuccess, callError) {
	try {
		var token = Wiz.context.token;
		if (token !== null) {
			var postParams = Wiz.Remote.getPostObj();
			postParams.token = token;
			xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.GET_AllCATEGORIES, [postParams], callSuccess, callError);
		}	
	} catch (err) {
		Wiz.logger.error('Wiz.Remote.getAllCategory() Error : ' + err);
	}
};

Wiz.Remote.prototype.getAllTag = function (callSuccess, callError) {
	try {
		var token = Wiz.context.token;
		if (token !== null) {
			var postParams = Wiz.Remote.getPostObj();
			postParams.token = token;
			xmlrpc(Wiz.XMLRPC_URL, Wiz.Api.GET_AllTAGS, [postParams], callSuccess, callError);
		}
	} catch (err) {
		Wiz.logger.error('Wiz.Remote.getAllTag() Error : ' + err);
	}
};

Wiz.Remote.prototype.postDocument = function (docInfo) {
	var token = Wiz.context.token;
	if (token !== null) {
		var error = function (err) {
			try {
				Wiz.logger.debug('Wiz.Remote.postDocument() callerror: ' + err);
				var respJson = JSON.parse(err);
				if (respJson.return_code != 200) {
					Wiz.notificator.showError(respJson.return_message);
					this.autoLogin();
				} else {
					Wiz.notificator.showClipSuccess(docInfo.title);
				}
			} catch (e) {
				Wiz.notificator.showError(e);
				Wiz.logger.error('Wiz.Remote.postDocument() Error: ' + e);
			}
		},
			success = function (info) {
				Wiz.logger.debug('Wiz.Remote.postDocument() callsuccess: ' + info);
				Wiz.notificator.showClipSuccess(docInfo.title);
			};
		try {
			Wiz.logger.debug('Wiz.Remote.postDocument start token = ' + Wiz.context.token);
			var regexp = /%20/g,
				title = docInfo.title,
				category = docInfo.category,
				comment = docInfo.comment,
				body = docInfo.content;
			  
			if (comment && comment.trim() !== '') {
				body = comment + '<hr>' + body;
			}
			
			if (!category) {
				category = '/My Notes/';
			}

			var requestData = 'title=' + encodeURIComponent(title).replace(regexp,  '+') + '&token_guid=' + encodeURIComponent(token).replace(regexp,  '+') 
								+ '&body=' + encodeURIComponent(body).replace(regexp,  '+') + '&category=' + encodeURIComponent(category).replace(regexp,  '+');
			ajax(Wiz.POST_DOCUMENT_URL, requestData, success, error);
		} catch (err) {
			Wiz.logger.error('Wiz.Remote.postDocument() Error : ' + err);
		}
	}
};

/**
 * 自动登陆处理
 * @param  {[type]} cookie      [保存在cookie中的auth信息]
 * @param  {[type]} callSuccess [description]
 * @param  {[type]} callError   [description]
 * @return {[type]}             [description]
 */
Wiz.Remote.prototype.loginByCookie = function (cookie, callSuccess, callError) {
	try {
		var info = cookie.value,
			split_count = info.indexOf('*md5'),
			user_id = info.substring(0, split_count),
			password = info.substring(split_count + 1);
		this.clientLogin(user_id, password, true, callSuccess, callError);
	} catch (err) {
		Wiz.logger.error('Wiz.Remote.loginByCookie() Error : ' + err);
	}
};

Wiz.Remote.prototype.autoLogin = function () {
	var authCookie = Wiz.getAuthCookie(),
		success = function (resp) {
			Wiz.logger.info('Wiz.Remote.autoLogin()');
		},
		error = function (errorMsg) {
			//自动登陆错误暂不做错误处理,记录日志
			Wiz.logger.error('Wiz.Remote.autoLogin() Error: ' + errosMsg);
		};
	if (authCookie && authCookie.value) {	
		this.loginByCookie(authCookie, success, error);
	}
};
