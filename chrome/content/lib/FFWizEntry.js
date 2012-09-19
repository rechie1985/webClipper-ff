"use strict";
var wiznote_doAction = function( popupSrc, clipType ) {

	try {
		if (Wiz.nativeClient && Wiz.nativeClient.bInstall()) {
			Wiz.nativeClient.startClip();
		} else {
			Wiz.clipManager.startClip( popupSrc, clipType );
		}
	} catch (err) {
		alert('wiznote_doAction Error : ' + err);
	}
}


function initOverlay() {
	var i18n = document.getElementById("wiznote_i18n"); 
	if(i18n) {
		Wiz.i18n.setStringBundle(i18n.stringBundle);
	}
	Wiz.init(content);
	var menu = document.getElementById("contentAreaContextMenu");
	menu.addEventListener("popupshowing", contextPopupShowing, false);
}

function contextPopupShowing(evt) {
}

window.addEventListener("load", initOverlay, false);

