(function() {
    if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
		  "chrome://webclipper/content/lib/Preview/ContentVeil.js",
		  "chrome://webclipper/content/lib/Preview/hatena-extract-content/extract-content-all.js",
		  "chrome://webclipper/content/lib/Preview/pageInfo.js",
		  "chrome://webclipper/content/lib/Preview/Preview.js",
		  "chrome://webclipper/content/lib/Preview/GlobalUtils.js"
		]);
	}
})();