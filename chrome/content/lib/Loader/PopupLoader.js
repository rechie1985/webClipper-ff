(function() {
    if ( typeof Wiz != "undefined" && typeof Wiz.ScriptLoader != "undefined" ) {
		Wiz.ScriptLoader.load([
			"chrome://webclipper/content/lib/Popup/scripts/WizObject.js",
			"chrome://webclipper/content/lib/Popup/scripts/ZtreeController.js",
			"chrome://webclipper/content/lib/Popup/scripts/PopupView.js",
			"chrome://webclipper/content/lib/Popup/scripts/NotePageControl.js",
			"chrome://webclipper/content/lib/Popup/scripts/LoginControl.js", 
			"chrome://webclipper/content/lib/Popup/Popup.js"
		]);
	}
})();