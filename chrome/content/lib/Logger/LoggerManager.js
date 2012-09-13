// 'use strict';
Wiz.LoggerManager = function () {
	this.__defineGetter__('mozillaLogger', this.getMozillaLogger);
	this.__defineGetter__('fileLogger', this.getFileLogger);
};

Wiz.LoggerManager.prototype._mozillaLogger = null;
Wiz.LoggerManager.prototype._fileLogger = null;

Wiz.LoggerManager.prototype.getMozillaLogger = function () {
	if (!this._mozillaLogger) {
		this._mozillaLogger = new Wiz.MozillaLoggerImpl();
	}
	return this._mozillaLogger;
};

Wiz.LoggerManager.prototype.getFileLogger = function () {
	if (!this._fileLogger) {
		this._fileLogger = new Wiz.FileLoggerImpl();
	}
	return this._fileLogger;
};

Wiz.LoggerManager.prototype.debug = function (message) {
	this.mozillaLogger.debug(message);
	this.fileLogger.debug(message);
};
Wiz.LoggerManager.prototype.info = function (message) {
	this.mozillaLogger.info(message);
	this.fileLogger.info(message);
};
Wiz.LoggerManager.prototype.warn = function (message) {
	this.mozillaLogger.warn(message);
	this.fileLogger.warn(message);
};
Wiz.LoggerManager.prototype.error = function (message) {
	this.mozillaLogger.error(message);
	this.fileLogger.error(message);
};