"use strict";
Wiz.ClipManager = function() {}

Wiz.ClipManager.startClip = function(rootElement, contextMenuClipType){
	var clipper = new Wiz.Clipper(content);
	var contentPreview = new Wiz.ContentPreview(content);
	//if not contextMenu clicked, show preview and the popup
	if(!contextMenuClipType) {
		clipper.doClipPreview();
	} else {
		switch(contextMenuClipType) {
		case "CLIP_ACTION_FULL_PAGE" :
			clipper.clipFullpage(contentPreview);
			break;
		case "CLIP_ACTION_SELECTION" :
			clipper.clipSelection(contentPreview);
			break;
		case "CLIP_ACTION_URL" :
			clipper.clipUrl(contentPreview);
			break;
		}
	}
}

Wiz.ClipManager.finishClip = function() {

}


