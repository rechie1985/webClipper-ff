"use strict";
Wiz.CookieManager = function () {
	this.intialize();
};

Wiz.CookieManager.prototype.intialize = function (){
	this._impl = new Wiz.CookieManagerImplFactory.getManagerImpl(window.navigator);
};

Wiz.CookieManager.prototype.set = function (url, name, value, expires){
	var cookie = this.createCookieObj(name, value, expires);
	if (this._impl){
		this._impl.set(url, cookie);
	}
};

Wiz.CookieManager.prototype.get = function (url, name){
	var cookie = null;
	if (this._impl){
		cookie = this._impl.get(url);
	}
	return cookie;
};

Wiz.CookieManager.prototype.remove = function () {

};

Wiz.CookieManager.prototype.createCookieObj = function (name, value, expires){
	var cookieObj = {
		'name' : name,
		'value' : value,
		'expires' : expires		
	};
	return new Wiz.Cookie(cookieObj);
};