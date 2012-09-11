/**
 * @author rechie
 */
'use strict';
Wiz.NotePageControl = function (popup) {
	this._popup = popup;
	$('wiz_clip_detail').show($.proxy(this.initialize, this));
};

Wiz.NotePageControl.prototype._popup = null;

Wiz.NotePageControl.prototype.initialize = function () {
	this.initNotePageListener();
	this.initNotePageInfo();
};

Wiz.NotePageControl.prototype.initNotePageListener = function () {
	$('#submit-type').change($.proxy(this.changeSubmitTypehandler, this));
	$('#note_submit').click($.proxy(this.noteSubmit, this));
	$('#comment-info').focus($.proxy(this.resizeCommentHeight, this));
};

Wiz.NotePageControl.prototype.resizeCommentHeight = function (evt) {
	$('#comment-info').animate({
		height: '80px'
	}, 500);
};


Wiz.NotePageControl.prototype.changeSubmitTypehandler = function (evt) {
	var selectedOption = $('option:selected', '#submit-type'),
		cmd = selectedOption.attr('id');
	this._popup.switchPreview(cmd);
	//改变页面显示
	Wiz.PopupView.changeSubmitDisplayByType();
};


Wiz.NotePageControl.prototype.initSubmitGroup = function () {
	var clipPageResponse = this._popup.getClipInfo(),
		clipArticle = clipPageResponse.article,
		clipSelection = clipPageResponse.selection;
	if (clipSelection == true) {
		$('#submit-type')[0].options[1].selected = true;
	} else if (clipArticle == true) {
		$('#submit-type')[0].options[0].selected = true;
	} else {
		$('#submit-type')[0].options[2].selected = true;
	}

	//用户没有选择时，禁止选择该'保存选择'
	if (clipSelection == false) {
		$('#submit-type option[id="selection"]').attr('disabled', '');
	}

	//用户有选择或者不可以智能提取时，禁止选择'保存文章'
	if (clipArticle == false || clipSelection == true) {
		$('#submit-type option[id="article"]').attr('disabled', '');
	}
	var type = $('#submit-type').val();
	$('#note_submit').html(type);
};

Wiz.NotePageControl.prototype.initNotePageInfo = function(evt) {
	Wiz.PopupView.hideCreateDiv();

	this.initLogoutLink();
	this.initDefaultCategory();
	this.initSubmitGroup();

	this.requestTitle();
	this.requestCategory();
	//TODO save category
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
	var title = this._popup.getTitle();
	this.setTitle(title);
};

Wiz.NotePageControl.prototype.setTitle = function (title) {
	$('#wiz_note_title').val(title);
};

Wiz.NotePageControl.prototype.initDefaultCategory = function () {
};


Wiz.NotePageControl.prototype.changeCategoryLoadingStatus = function () {
	var visible = this.isCategoryLoading();
	if (visible) {
		Wiz.PopupView.hideCategoryLoading();
	} else {
		var categoryLoadingMsg = Wiz.i18n.getMessage('category_loading');
		Wiz.PopupView.showCategoryLoading(categoryLoadingMsg);
	}
};

Wiz.NotePageControl.prototype.isCategoryLoading = function () {
	var visible = $('#category_loading').is(':visible');
	return visible;
};
Wiz.NotePageControl.prototype.parseWizCategory = function (categoryStr) {

	initZtree();
	var visible = this.isCategoryLoading();
	if (visible) {
		//用户已经点击展开文件夹树，此时，需要直接显示文件夹树即可
		Wiz.PopupView.showCategoryTreeFromLoading(500);
	}
	$('#category_info').unbind('click');
	$('#category_info').click(switchCategoryTreeVisible);
};

Wiz.NotePageControl.prototype.initZtree = function (categoryString) {
	var ztreeControl = new ZtreeController(),
		ztreeJson = ztreeControl.parseDate(categoryString);
	ztreeControl.setNodes(ztreeJson);
	ztreeControl.initTree('ztree');
};


Wiz.NotePageControl.prototype.switchCategoryTreeVisible = function() {
	var visible = $('#ztree_container').is(':visible');
	if (visible) {
		$('#ztree_container').hide(500);
	} else {
		$('#ztree_container').show(500);
	}
};

Wiz.NotePageControl.prototype.requestCategory = function() {
	$('#category_info').bind('click', this.changeCategoryLoadingStatus);
};

Wiz.NotePageControl.prototype.noteSubmit = function () {
	this.requestSubmit();
};

Wiz.NotePageControl.prototype.requestSubmit = function () {
	var type = $('option:selected', '#submit-type').attr('id'),
		title = $('#wiz_note_title').val(),
		category = $('#category_info').attr('location'),
		comment = $('#comment-info').val(),
		selectedOption = $('option:selected', '#submit-type'),
		cmd = selectedOption.attr('id'),
		content = this._popup.getDocBody(cmd),
		docInfo = {
			title: title,
			category: category,
			comment: comment,
			content: content
		};
	this._popup.postDocument(docInfo);
};

Wiz.NotePageControl.prototype.initUserLink = function (token) {
	// $('#header_username').html('(' + user_id + ')').bind('click', function (evt) {
	// 	window.open(mainUrl + '/?t=' + token);
	// });
};
