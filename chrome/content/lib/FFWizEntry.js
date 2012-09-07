"use strict";
var wiznote_doAction = function( popupSrc, clipType ) {
	Wiz.clipManager.startClip( popupSrc, clipType );
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

	var pageMenuitem = document.getElementById("webclipper-contextmenu-popup-clippage");
	var selectionMenuitem = document.getElementById("webclipper-contextmenu-popup-clipsel");
	var urlMenuitem = document.getElementById("webclipper-contextmenu-popup-clipurl");
	selectionMenuitem.hidden = !gContextMenu.isTextSelected;
	pageMenuitem.hidden = gContextMenu.isTextSelected;
	var url = window.top.location.href;
	if(url) {
		urlMenuitem.hidden = false;
	} else {
		urlMenuitem.hidden = true;
	}
}

window.addEventListener("load", initOverlay, false);

