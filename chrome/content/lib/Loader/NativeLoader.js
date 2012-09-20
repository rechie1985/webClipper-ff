(function() {
    if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
			"chrome://webclipper/content/lib/Native/MozillaNativeController.js",
			"chrome://webclipper/content/lib/Native/DOMNativeController.js",
			"chrome://webclipper/content/lib/Native/NativeManager.js"
		]);
	}
})();