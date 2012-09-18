'use strict';
Wiz.PopupView = {
	changeSubmitDisplayByType : function () 
	{
		var type = $('#submit-type').val();
		$('#note_submit').html(type);
	},
	showCategoryTreeFromLoading : function (animate_time_ms) 
	{
		$('#category_loading').hide();
		$('#ztree_container').show(animate_time_ms);
	},
	showCategoryLoading : function (msg)
	{
		$('#category_loading').show();
		$('#category_loading label').html(msg);
	},
	hideCategoryLoading : function()
	{
		$('#category_loading').hide();
	},
	showClipFailure : function (msg)
	{
		$('#waiting_div').hide();
		$('#errorpage_tip label').html(msg);
		$('#errorpage_tip').show();
	},
	showLoginError : function (msg)
	{
		$('#wiz_login').show();
		$('#wiz_clip_detail').hide();
		$('#div_error_validator').html(msg);
		$('#waiting').hide();
	},
	showWaiting : function (msg)
	{	
		$('#waiting').show();
		$('#waiting-label').html(msg);
		$('#wiz_login').hide();
		$('#wiz_clip_detail').hide();
	},
	showLogin : function ()
	{
		$("#waiting").hide();
		$("#wiz_clip_detail").hide();
		$("#wiz_login").show();
	},
	showNotePage : function ()
	{
		$("#waiting").hide();
		$("#wiz_login").hide();
		$("#wiz_clip_detail").show();
	},
	hideCategoryTreeAfterSelect : function (display, delay_ms)
	{
		$("#category_info").html(display);
		$("#ztree_container").hide(delay_ms);
	},
	hideCreateDiv : function () {
		$('#loginoff_div').hide();
	},
	localizePopup : function () {
		$('#waiting-label').html(Wiz.i18n.getMessage('popup_wating'));

		//login page
		$('#user_id_tip').html(Wiz.i18n.getMessage('user_id_tip'));
		$('#password_tip').html(Wiz.i18n.getMessage('password_tip'));
		$('#keep_password_tip').html(Wiz.i18n.getMessage('keep_password_tip'));
		$('#login_button').html('&nbsp;' + Wiz.i18n.getMessage('login_msg') + '&nbsp;');

		//note info page
		$('#note_title_tip').html(Wiz.i18n.getMessage('note_title_tip'));
		$('#category_tip').html(Wiz.i18n.getMessage('category_tip'));
		//submit type
		$('#article').html(Wiz.i18n.getMessage('article_save'));
		$('#fullPage').html(Wiz.i18n.getMessage('fullpage_save'));
		$('#selection').html(Wiz.i18n.getMessage('select_save'));
		$('#url').html(Wiz.i18n.getMessage('url_save'));
		//comment area
		$('#comment_tip').html(Wiz.i18n.getMessage('comment_tip'));
		$('#comment-info').attr('placeholder', Wiz.i18n.getMessage('add_comment'));

		//默认文件夹
		$('#category_info').html('/' + Wiz.i18n.getMessage('MyNotes') + '/').attr('location', '/My Notes/');
	},
	setPopupHeight : function (height_px) {
        var frame = window.overlay.document.getElementById( "popupContent" );
        if ( frame ) {
            frame.style.height = (height_px + 10) + "px";
            frame.style.width = (frame.style.width + 10) + "px";
        }
        window.sizeToContent();
        window.overlay.sizeToContent();
	}
};