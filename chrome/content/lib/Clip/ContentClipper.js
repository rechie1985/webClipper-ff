Wiz.ContentClipper = function() {
	this.initialize();
}

Wiz.ContentClipper.prototype.initialize = funciton() {
}

Wiz.ContentClipper.prototype.getSelectedHTML = function(win) {
	var doc = win.document;
	var selection = doc.getSelection();
	if (selection.rangeCount > 0) {
		var range = selection.getRangeAt(0);
		var html = range.commonAncestorContainer.ownerDocument.createElement("div");
		html.appendChild(range.cloneContents());
		return document.querySelector("html").innerHTML;
	} else {
		return "";
	}
}

Wiz.ContentClipper.prototype.getFullpageHTML = function(win) {
	var doc = win.document;
	var base = "<base href='" + win.location.protocol + "//" + win.location.host + "'/>";
	var page_content = doc.getElementsByTagName("html")[0];
	//TODO去除script标签
	var index = page_content.indexOf("<head>");
	var fullpage = page_content.substring(0, index + 6) + base + page_content.substring(index + 6);
	return fullpage;
}

Wiz.ContentClipper.prototype.base64Encode = function (str) {
	var base64str = Base64.encode(str);
	return base64str;
}

Wiz.ContentClipper.prototype.getFrameNodes = function(win) {
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

Wiz.ContentClipper.prototype.getActiveFrame = function(win) {
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
		activeFrame = getActiveFrame(frame);
		//
		if (activeFrame != null)
			return activeFrame;
	}
	return null;
}

var g_frameNameIndex = 0;

Wiz.ContentClipper.prototype.prepareFrameNodes = function(win) {
	var frameNodes = getFrameNodes(win);
	if (frameNodes == null)
		return;
	for (var i = 0; i < frameNodes.length; i++) {
		var node = frameNodes[i];
		node.setAttribute("wiz_ext_name", "Frame_" + g_frameNameIndex);
		g_frameNameIndex++;
	}
}

Wiz.ContentClipper.prototype.prepareFrames = function(win) {
	if (win == null)
		return;
	//
	var doc = win.document;
	if (doc == null) {
		return;
	}
	//
	prepareFrameNodes(win);
	//
	var frames = win.frames;
	if (frames == null)
		return;
	//
	for (var i = 0; i < frames.length; i++) {
		var frame = frames[i];
		//
		prepareFrames(frame);
	}
}

Wiz.ContentClipper.prototype.prepareAllFrames = function(win) {
	g_frameNameIndex = 0;
	prepareFrames(win);
}

var g_frameFilesIndex = 0;
Wiz.ContentClipper.prototype.collectFrames = function(win) {
	var params = "";
	//
	if (win == null) {
		return "";
	}
	var doc = win.document;
	if (doc == null) {
		return "";
	}

	var frameNodes = getFrameNodes(win);

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
				params += g_frameFilesIndex + "_FrameURL='" + base64Encode(frameDoc.URL) + "' ";
				params += g_frameFilesIndex + "_FrameName='" + name + "' ";
				params += g_frameFilesIndex + "_FrameID='" + id + "' ";
				params += g_frameFilesIndex + "_FrameExtName='" + extName + "' ";
				var source_html = base64Encode(frameDoc.documentElement.innerHTML);
				params += g_frameFilesIndex + "_FrameHtml='" + source_html + "' ";
				g_frameFilesIndex++;
			}
		}
	}

	var frames = win.frames;
	for (var i = 0; i < frames.length; i++) {
		var frame = frames[i];
		params += collectFrames(frame);
	}
	return params;
}

Wiz.ContentClipper.prototype.collectAllFrames = function(win) {//
	var params = "";
	if ( typeof (win) == "object") {
		var source_url = base64Encode(win.location.href);
		var source_title = base64Encode(win.document.title);
		var source_html = "";

		prepareAllFrames(win);
		//
		var source_html = base64Encode(win.document.documentElement.innerHTML);
		params = "param-location='" + source_url + "' ";
		params += "param-title='" + source_title + "' ";

		g_frameFilesIndex = 0;

		params += g_frameFilesIndex + "_FrameURL='" + source_url + "' ";
		params += g_frameFilesIndex + "_FrameHtml='" + source_html + "' ";

		g_frameFilesIndex++;
		params += collectFrames(win);
		var frame_fcount = g_frameFilesIndex;
		params = "param-fcount='" + frame_fcount + "' " + params;
	}
	return params;
}





