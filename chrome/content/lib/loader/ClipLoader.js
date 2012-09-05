(function() {
    if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
			"chrome://webclipper/content/lib/Clip/ContentClipper.js",
			"chrome://webclipper/content/lib/Clip/ClipSender.js",
			"chrome://webclipper/content/lib/Clip/ClipNotificator.js",
			"chrome://webclipper/content/lib/Clip/ClipManager.js"
		]);
	}
})();