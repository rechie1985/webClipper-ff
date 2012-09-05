"use strict";
Wiz.I18N = {
	_stringBundle : null,
	getMessage : function(key) {
		if(this._stringBundle) {
			return this._stringBundle.GetStringFromName( key );
		}
	},
	setStringBundle : function(stringBundle) {
		this._stringBundle = stringBundle;
	}
}