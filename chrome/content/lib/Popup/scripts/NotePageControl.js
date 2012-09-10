/**
 * @author rechie
 */
'use strict';
Wiz.NotePageControl = function (popup) {
	this._popup = popup;
	$('wiz_clip_detail').bind('show', this.initialize);
};

Wiz.NotePageControl.prototype._popup = null;

Wiz.NotePageControl.prototype.initialize = function () {
	this.initNotePageListener();
	this.initNotePageInfo();
};

Wiz.NotePageControl.prototype.initNotePageListener = function () {
	$('#submit-type').change(this.changeSubmitTypehandler);
	$('#note_submit').click(this.noteSubmit);
	$('#comment-info').focus(this.resizeCommentHeight);
};

Wiz.NotePageControl.prototype.resizeCommentHeight = function (evt) {
	$('#comment-info').animate({
		height: '80px'
	}, 500);
};


Wiz.NotePageControl.prototype.changeSubmitTypehandler = function (evt) {
	var selectedOption = $('option:selected', '#submit-type'),
		cmd = selectedOption.attr('id');
	//改变页面显示
	PopupView.changeSubmitDisplayByType();
};


Wiz.NotePageControl.prototype.initSubmitGroup = function () {
};

Wiz.NotePageControl.prototype.initNotePageInfo = function(evt) {
	PopupView.hideCreateDiv();
	this.initLogoutLink();
	this.requestPageStatus();
	this.requestTitle();
	this.initDefaultCategory();
	this.requestToken();
	var categoryStr = localStorage['category'];
	//如果本地未保存文件夹信息，需要发送请求加载
	if (categoryStr) {
		this.parseWizCategory();
	} else {
		this.requestCategory();
	}
};

Wiz.NotePageControl.prototype.initLogoutLink = function () {
	var logoutText = Wiz.i18n.getMessage('logout');
	$('#header_user').show();
	$('#logout_control').html(logoutText).bind('click', this.cmdLogout);
};

Wiz.NotePageControl.prototype.cmdLogout = function () {
	this._popup.logout();
};

Wiz.NotePageControl.prototype.requestTitle = function () {
};

Wiz.NotePageControl.prototype.setTitle = function (title) {
	$('#wiz_note_title').val(title);
};

Wiz.NotePageControl.prototype.initDefaultCategory = function () {
	var lastCategory = localStorage['last-category'];
	if (lastCategory) {
		var array = lastCategory.split('*'),
			displayName = array[0],
			location = array[1];
		$('#category_info').html(displayName).attr('location', location);
	}
}


Wiz.NotePageControl.prototype.changeCategoryLoadingStatus = function () {
	var visible = this.isCategoryLoading();
	if (visible) {
		PopupView.hideCategoryLoading();
	} else {
		var categoryLoadingMsg = Wiz.i18n.getMessage('category_loading');
		PopupView.showCategoryLoading(categoryLoadingMsg);
	}
}

Wiz.NotePageControl.prototype.isCategoryLoading = function () {
	var visible = $('#category_loading').is(':visible');
	return visible;
}
Wiz.NotePageControl.prototype.parseWizCategory = function (categoryStr) {

	initZtree();
	var visible = this.isCategoryLoading();
	if (visible) {
		//用户已经点击展开文件夹树，此时，需要直接显示文件夹树即可
		PopupView.showCategoryTreeFromLoading(500);
	}
	$('#category_info').unbind('click');
	$('#category_info').click(switchCategoryTreeVisible);
}

Wiz.NotePageControl.prototype.initZtree = function () {
	var categoryString = localStorage['category'];
	var ztreeJson = ztreeControl.parseDate(categoryString);
	ztreeControl.setNodes(ztreeJson);
	ztreeControl.initTree('ztree');
}


Wiz.NotePageControl.prototype.switchCategoryTreeVisible = function() {
	var visible = $('#ztree_container').is(':visible');
	if (visible) {
		$('#ztree_container').hide(500);
	} else {
		$('#ztree_container').show(500);
	}
}

Wiz.NotePageControl.prototype.requestCategory = function() {
	$('#category_info').bind('click', this.changeCategoryLoadingStatus);
}

Wiz.NotePageControl.prototype.noteSubmit = function () {
	this.requestSubmit();
}

Wiz.NotePageControl.prototype.requestSubmit = function () {
	var type = $('option:selected', '#submit-type').attr('id'),
		title = $('#wiz_note_title').val(),
		category = $('#category_info').attr('location'),
		comment = $('#comment-info').val(),
		docInfo = {
			title: title,
			category: category,
			comment: comment
		};
}

Wiz.NotePageControl.prototype.initUserLink = function (token) {
	var user_id = localStorage['wiz-clip-auth'];
	$('#header_username').html('(' + user_id + ')').bind('click', function (evt) {
		window.open(mainUrl + '/?t=' + token);
	});
}
