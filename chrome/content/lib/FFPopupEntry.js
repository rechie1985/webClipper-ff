'use strict';
function wiz_initFFPopup() {
	var params = window.overlay.arguments[0];
	var FFpopup = new Wiz.FFPopup(params);
	Wiz.i18n = params.i18n;
    Wiz.logger.error('123123');
	window.focus();

	$(window).blur(function () {
		FFpopup.closePopup();
	});
	FFpopup.startPopup();
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