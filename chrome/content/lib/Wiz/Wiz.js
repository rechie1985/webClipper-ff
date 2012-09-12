"use strict";

if (typeof Wiz == "undefined") {
    var Wiz = {
		_clipManager : null,
		_preview : null,
		_remote : null,
        _cookieManager : null,
        _context : null
    };

    Wiz.SERVICE_URL = "http://service.wiz.cn/wizkm";
    Wiz.XMLRPC_URL = Wiz.SERVICE_URL + "/xmlrpc";
    Wiz.POST_DOCUMENT_URL = Wiz.SERVICE_URL + "/a/web/post?";
    Wiz.EXTENSIOD_ID = "wizbrother@wiz.cn";
    Wiz.AUTHENTICATION_NAME = 'wiz_auth';
}

Wiz.init = function (tab) {
    if (!this._clipManager) {
        this._clipManager = new Wiz.ClipManager();
    }
    if (!this._remote) {
        this._remote = new Wiz.Remote();
    }
    if (!this._cookieManager) {
        this._cookieManager = new Wiz.CookieManager();
    }
};
Wiz.getClipManager = function () {
	if (!this._clipManager) {
		this._clipManager = new Wiz.ClipManager();
	}
	return this._clipManager;
};
Wiz.setClipManager = function (clipManager) {
	this._clipManager = clipManager;
};

Wiz.getPreview = function() {
	if (!this._preview) {
		//TODO throw exception?
		this._preview = new Wiz.ContentPreview(content);
	}
	return this._preview;
};
Wiz.setPreview = function (preview) {
	this._preview = preview;
};

Wiz.getRemote = function () {
	if (!this._remote) {
		this._remote = new Wiz.Remote();
	}
	return this._remote;
};

Wiz.getContext = function () {
    if (!this._context) {
        this._context = new Wiz.Context();
    }
    return this._context;
}

Wiz.setContext = function (context) {
    this._context = context;
}


Wiz.setRemote = function (remote) {
	this._remote = remote;
};

Wiz.getAuthCookie = function () {
    var cookies = this.cookieManager.get(Wiz.SERVICE_URL, Wiz.AUTHENTICATION_NAME);
    if (cookies && cookies.length > 0) {
        return cookies[0];
    } 
    return null;
};

Wiz.saveAuthCookie = function (value, isRememberMe) {
    if(isRememberMe) {
        this.cookieManager.set(Wiz.SERVICE_URL, Wiz.AUTHENTICATION_NAME, value, Wiz.Default.COOKIE_EXPIRE_SEC);
    } else {
        this.cookieManager.set(Wiz.SERVICE_URL, Wiz.AUTHENTICATION_NAME, value);
    }
};

Wiz.saveTokenCookie = function (token) {
    Wiz.cookieManager.set(Wiz.SERVICE_URL, 'auth-token', token, Wiz.Default.TOKEN_EXPIRE_SEC);
};

Wiz.getTokenCookie = function () {
    var cookie = Wiz.cookieManager.get(Wiz.SERVICE_URL, 'auth-token');  
    return cookie;
}

Wiz.removeAuthCookie = function () {
    this.cookieManager.remove(Wiz.SERVICE_URL, Wiz.AUTHENTICATION_NAME);
};

Wiz.getCookieManager = function () {
    if (!this._cookieManager) {
        this._cookieManager = new Wiz.CookieManager();
    }
    return this._cookieManager;
};

Wiz.inherit = function (childConstructor, parentClassOrObject, includeConstructorDefs) {
	if ( parentClassOrObject.constructor == Function ) {
        // Normal Inheritance
        childConstructor.prototype = new parentClassOrObject;
        childConstructor.prototype.constructor = childConstructor;
        childConstructor.prototype.parent = parentClassOrObject.prototype;
        childConstructor.constructor.parent = parentClassOrObject;
    }
    else {
        // Pure Virtual Inheritance
        childConstructor.prototype = parentClassOrObject;
        childConstructor.prototype.constructor = childConstructor;
        childConstructor.prototype.parent = parentClassOrObject;
        childConstructor.constructor.parent = parentClassOrObject;
    } 

    if ( includeConstructorDefs ) {
        for ( var i in parentClassOrObject.prototype.constructor ) {
            if ( i != "parent" && i != "prototype" && parentClassOrObject.constructor[i] != parentClassOrObject.prototype.constructor[ i ]
                && typeof childConstructor.prototype.constructor[ i ] == 'undefined' ) {
                childConstructor.prototype.constructor[ i ] = parentClassOrObject.prototype.constructor[ i ];
            }
        }
    }
    return childConstructor;
};

Wiz.__defineGetter__("clipManager", Wiz.getClipManager);
Wiz.__defineGetter__("preview", Wiz.getPreview);
Wiz.__defineGetter__("remote", Wiz.getRemote);
Wiz.__defineGetter__("cookieManager", Wiz.getCookieManager);
Wiz.__defineGetter__("context", Wiz.getContext);