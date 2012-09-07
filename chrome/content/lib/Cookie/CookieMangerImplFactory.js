Wiz.CookieManagerImplFactory = {
	return : {
		getManagerImpl : funciton (navigator) {
			if(this.bBrowserType(navigator, "firefox")) {
				return new Wiz.MozillaCookieManagerImpl();
			}
		},
		bBrowserType : function (navigator, browserName) {
			var uA = navigator.userAgent.toLowerCase();
			return uA.indexOf(browserName) > -1;
		}
	}
}