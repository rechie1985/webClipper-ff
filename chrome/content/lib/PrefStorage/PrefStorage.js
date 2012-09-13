Wiz.PrefStorage = function () {
	this.__defineGetter__('prefService', this.getPrefService);
	this.initialize();
};
Wiz.PrefStorage.prototype._prefSrv = null;

Wiz.PrefStorage.prototype.initialize = function () {
	this._prefSrv = this.getPrefService();
}

Wiz.PrefStorage.prototype.getPrefService = function () {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("extensions.wiz.webclipper.");
    return prefs;
};

Wiz.PrefStorage.prototype.getPref = function (name, type) {
};

Wiz.PrefStorage.prototype.setPref = function (name, value, type) {
	if (type) {

		switch (type) {
		case 'char':
			this._prefSrv.setCharPref(name, value);
			break;
		case 'boolean':
			this._prefSrv.setBoolPref(name, value);
			break;
		case 'int':
			this._prefSrv.setIntPref(name, value);
			break;
		}
	}
};