(function() {
    if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
			"chrome://webclipper/content/lib/Remote/xmlrpc.js",
			"chrome://webclipper/content/lib/Remote/Remote.js"
		]);
	}
})();