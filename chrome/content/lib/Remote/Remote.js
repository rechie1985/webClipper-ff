Wiz.Remote = function() {
	this.initCommon();
}

Wiz.Remote.initCommon() {
	var data = {};
	data.client_type = "web3";
	data.api_version = 3;
}

Wiz.Remote.prototype.clientLogin = function(username, password, rememberMe, callSuccess, callError) {
	this.data.user_id = username;
	this.data.password = 'md5.' + hex_md5(password);
	if(rememberMe) {
		//TODO 保存用户名密码
	}
	var success = function(respJson) {
		this.data.token = respJson.token;
		callSuccess(respJson);
	}
	xmlrpc(Wiz.XMLRPC_URL, Wiz.API.ACCOUNT_LOGIN, [this.data], success, callError);
}

Wiz.Remote.prototype.keepAlive = function(callSuccess, callError) {
	if(this.data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.API.ACCOUNT_KEEPALIVE, [this.data], callSuccess, callError);
	} else {
		//TODO need to autoLogin
	}
}

Wiz.Remote.prototype.getAllCategory = function(callSuccess, callError) {
	if(this.data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.API.GET_AllCATEGORIES, [this.data], callSuccess, callError)
	}
}

Wiz.Remote.prototype.getAllTag = function(callSuccess, callError) {
	if(this.data.token) {
		xmlrpc(Wiz.XMLRPC_URL, Wiz.API.GET_AllTAGS, [this.data], callSuccess, callError)
	}
}

