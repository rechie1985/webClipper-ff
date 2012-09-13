(function() {
    if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
			"chrome://webclipper/content/lib/Logger/LoggerImpl.js",
			"chrome://webclipper/content/lib/Logger/FileLoggerImpl.js",
			"chrome://webclipper/content/lib/Logger/MozillaLoggerImpl.js",
			"chrome://webclipper/content/lib/Logger/LoggerManager.js"
		]);
	}
})();