(function() {
    if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
			"chrome://webclipper/content/lib/Util/Base64.js",
			"chrome://webclipper/content/lib/Util/md5.js"
		]);
	}
})();