"use strict";
Wiz.ClipNotificator = function(clipManager) {
	this.initialize();
	this._clipManager = clipManager;
	this.__defineGetter__('alertsService', this.getAlertService);
};
Wiz.ClipNotificator.prototype._alertsService = null;
Wiz.ClipNotificator.prototype._clipManager = null;

Wiz.ClipNotificator.prototype.initialize = function () {
	if (!this._alertsService) {
		this._alertsService = this.getAlertService();
	}
};
Wiz.ClipNotificator.prototype.showNotification = function () {
	if (this._alertsService) {
		this._alertsService.showAlertNotification(null, 'title', 'notification content');
	}
};
Wiz.ClipNotificator.prototype.getWaitContainer = function () {

};

Wiz.ClipNotificator.prototype.getAlertService = function () {
	var alertsService = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
	return alertsService;
};
