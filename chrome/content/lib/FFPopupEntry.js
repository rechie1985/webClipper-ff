'use strict';
function wiz_initFFPopup() {
	if(window.overlay.arguments) {
		var params = window.overlay.arguments[0];
	}
	Wiz.i18n = params.i18n;
	window.focus();

	$(window).blur(function () {
		window.close();
	})

	initPopupPage();
	window.sizeToContent();
	window.overlay.sizeToContent();

	function initPopupPage() {
		$('#waiting-label').html(Wiz.i18n.getMessage('popup_wating'));

		//login page
		$('#user_id_tip').html(Wiz.i18n.getMessage('user_id_tip'));
		$('#password_tip').html(Wiz.i18n.getMessage('password_tip'));
		$('#keep_password_tip').html(Wiz.i18n.getMessage('keep_password_tip'));
		$('#login_button').html('&nbsp;' + Wiz.i18n.getMessage('login_msg') + '&nbsp;');

		//note info page
		$('#note_title_tip').html(Wiz.i18n.getMessage('note_title_tip'));
		$('#category_tip').html(Wiz.i18n.getMessage('category_tip'));
		// $('#tag_tip').html(Wiz.i18n.getMessage('tag_tip'));
		// $('#tag_input').html(Wiz.i18n.getMessage('tag_input'));
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
	}

}

$(document).ready( function() {
    var initTimeout = 5000;
    var initPeriod = 100;
    var initStartTime = new Date().getTime();

    var initProc = setInterval( function() {
        if ( window.overlay && window.overlayContentContainer ) {
            clearInterval( initProc );
            initProc = null;

            wiz_initFFPopup();
        }
        else if ( initStartTime + initTimeout < new Date().getTime() ) {
            alert( "FFPopup initialization timeout exceeding" );

            clearInterval( initProc );
            initProc = null;
        }
    }, initPeriod );
} );