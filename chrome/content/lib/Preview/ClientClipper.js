

function wiz_base64Encode(str) {
	var base64str = Base64.encode(str);
	return base64str;
}

function wiz_getFrameNodes(win) {
	var doc = win.document;
	if (doc == null)
		return null;
	//
	var frameNodes = doc.getElementsByTagName("iframe");
	if (frameNodes == null || frameNodes.length == 0) {
		frameNodes = doc.getElementsByTagName("frame");
		if (frameNodes == null || frameNodes.length == 0) {
			return null;
		}
	}
	//
	return frameNodes;
}

var wiz_g_frameNameIndex = 0;

function wiz_prepareFrameNodes(win) {
	var frameNodes = wiz_getFrameNodes(win);
	if (frameNodes == null)
		return;
	for (var i = 0; i < frameNodes.length; i++) {
		var node = frameNodes[i];
		node.setAttribute("wiz_ext_name", "Frame_" + wiz_g_frameNameIndex);
		wiz_g_frameNameIndex++;
	}
}

function wiz_prepareFrames(win) {
	if (win == null)
		return;
	//
	var doc = win.document;
	if (doc == null) {
		return;
	}
	//
	wiz_prepareFrameNodes(win);
	//
	var frames = win.frames;
	if (frames == null)
		return;
	//
	for (var i = 0; i < frames.length; i++) {
		var frame = frames[i];
		//
		wiz_prepareFrames(frame);
	}
}

function wiz_prepareAllFrames(win) {
	wiz_g_frameNameIndex = 0;
	wiz_prepareFrames(win);
}

var wiz_g_frameFilesIndex = 0;
function wiz_collectFrames(win) {
	var params = "";
	//
	if (win == null) {
		return "";
	}
	var doc = win.document;
	if (doc == null) {
		return "";
	}

	var frameNodes = wiz_getFrameNodes(win);

	if (frameNodes == null)
		return "";

	for (var i = 0; i < frameNodes.length; i++) {
		var frameNode = frameNodes[i];
		//
		if (frameNode != null) {
			var id = frameNode.getAttribute("id");
			var name = frameNode.getAttribute("name");

			var extName = frameNode.getAttribute("wiz_ext_name");
			//
			if (id == null)
				id = "";
			if (name == null)
				name = "";
			if (extName == null)
				extName = "";
			//
			var frameDoc = frameNode.contentDocument;

			if (frameDoc != null) {
				params += wiz_g_frameFilesIndex + "_FrameURL='" + wiz_base64Encode(frameDoc.URL) + "' ";
				params += wiz_g_frameFilesIndex + "_FrameName='" + name + "' ";
				params += wiz_g_frameFilesIndex + "_FrameID='" + id + "' ";
				params += wiz_g_frameFilesIndex + "_FrameExtName='" + extName + "' ";
				var source_html = wiz_base64Encode(frameDoc.documentElement.innerHTML);
				params += wiz_g_frameFilesIndex + "_FrameHtml='" + source_html + "' ";
				wiz_g_frameFilesIndex++;
			}
		}
	}

	var frames = win.frames;
	for (var i = 0; i < frames.length; i++) {
		var frame = frames[i];
		params += wiz_collectFrames(frame);
	}
	return params;
}

function wiz_collectAllFrames(win) {//
	var params = "";
	if ( typeof (win) == "object") {
		var source_url = wiz_base64Encode(win.location.href);
		var source_title = wiz_base64Encode(win.document.title);
		var source_html = "";

		wiz_prepareAllFrames(win);
		//
		var source_html = wiz_base64Encode(win.document.documentElement.innerHTML);
		params = "param-location='" + source_url + "' ";
		params += "param-title='" + source_title + "' ";

		wiz_g_frameFilesIndex = 0;

		params += wiz_g_frameFilesIndex + "_FrameURL='" + source_url + "' ";
		params += wiz_g_frameFilesIndex + "_FrameHtml='" + source_html + "' ";

		wiz_g_frameFilesIndex++;
		params += wiz_collectFrames(win);
		var frame_fcount = wiz_g_frameFilesIndex;
		params = "param-fcount='" + frame_fcount + "' " + params;
	}
	return params;
}

function wiz_getActiveFrame(win) {
	if (win == null)
		return null;
	var activeFrame = null;
	var frames = win.frames;
	for (var i = 0; i < frames.length; i++) {
		var frame = frames[i];
		if (frame != null && frame.document != null) {
			var seltxt = frame.getSelection();
			if (seltxt != null && seltxt.toString() != "") {
				activeFrame = frame;
				//
			}
		}
		if (activeFrame != null)
			return activeFrame;
		activeFrame = wiz_getActiveFrame(frame);
		//
		if (activeFrame != null)
			return activeFrame;
	}
	return null;
}

function wiz_getSelected(win) {
	var params = "";
	if ( typeof (win) == "object") {
		var source_url = wiz_base64Encode(win.location.href);
		var source_html = "";
		var frame_url = source_url;
		var winsel = contentPreview.getArticleElement();
		if (winsel == null || winsel.toString() == "") {
			var activeFrame = wiz_getActiveFrame(win);
			if (activeFrame != null) {
				winsel = activeFrame.getSelection();
				frame_url = wiz_base64Encode(activeFrame.location.href);
			}
		}
		if (winsel == null || winsel == "") {
			params = "";
			return params;
		} else {
			var source_html = winsel.innerHTML;
			if (source_html == null)
				source_html = "";
			params = source_html;
		}
	}
	return params;
}

function getFullpageHTML() {
	var base = "<base href='" + window.location.protocol + "//" + window.location.host + "'/>";
	var page_content = document.getElementsByTagName("html")[0];
	page_content = $(page_content).clone().find("script").remove().end().html();
	var index = page_content.indexOf("<head>");
	var fullpage = page_content.substring(0, index + 6) + base + page_content.substring(index + 6);
	return fullpage;
}

function getSelectedHTML() {
	var selection = document.getSelection();
	if (selection.rangeCount > 0) {
		var range = selection.getRangeAt(0);
		var html = range.commonAncestorContainer.ownerDocument.createElement("div");
		html.appendChild(range.cloneContents());
		return $(html).html();
	} else
		return "";
}

function requestSaveDoc(info) {
	clipResult.startClip();
	setTimeout(function(){
		//TODO save document
	}, 200);
}

