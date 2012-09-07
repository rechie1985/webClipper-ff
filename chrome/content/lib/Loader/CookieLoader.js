(function(){
	if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
			"chrome://webclipper/content/lib/Cookie/Cookie.js",
			"chrome://webclipper/content/lib/Cookie/CookieManagerImpl.js",
			"chrome://webclipper/content/lib/Cookie/MozillaCookieManagerImpl.js",
			"chrome://webclipper/content/lib/Cookie/CookieManagerImplFactory.js",
			"chrome://webclipper/content/lib/Cookie/CookieManager.js"
		]);
	}
})();