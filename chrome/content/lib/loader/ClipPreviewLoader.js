(function() {
    if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
		  "chrome://webclipper/content/lib/clip/ContentVeil.js",
		  "chrome://webclipper/content/lib/hatena-extract-content/extract-content-all.js",
		  "chrome://webclipper/content/lib/clip/pageInfo.js",
		  "chrome://webclipper/content/lib/clip/Preview.js",
		  "chrome://webclipper/content/lib/clip/GlobalUtils.js"
		]);
	}
})();