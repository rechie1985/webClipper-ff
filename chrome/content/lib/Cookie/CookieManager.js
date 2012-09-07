"use strict";
Wiz.CookieManager = function () {
	this.intialize();
};

Wiz.CookieManager.prototype.intialize = function (){
	this._impl = new Wiz.CookieManagerImplFactory.getManagerImpl();
};

Wiz.CookieManager.prototype.set = function (url, name, value, expires){
	if (this._impl){
		this._impl.set(url, name);
	}
};

Wiz.CookieManager.prototype.get = function (){
	if (this._impl){
		this._impl.get(url);
	}
};

Wiz.CookieManager.prototype.createCookieObj = function (name, value, expires){

};