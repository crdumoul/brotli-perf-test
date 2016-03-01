/**
 * Global variable containing OCA configuration, data and functions
 *
 * @namespace
 * @name oca
 */

var oca = {
	/**
	 * Container variable for all oca functions
	 * @namespace
	 */
	fn: {},
	/**
	 * Container for all variables defined within FTL templates
	 * @name ftl
	 * @memberOf oca
	 */
	ftl: {},
	/**
	 * Debug class used
	 * @name debug
	 * @memberOf oca
	 */
	debug: false,
	log: function() {},
	/**
	 * Container for all data during and after page load
	 * @augments oca
	 * @name data
	 */
	data: {
		/**
		 * Account services data collected via ajax for the left hand nav
		 * @name myServicesNav
		 * @memberOf data
		 */
		myServicesNav: {
			ready:false
		},
		pid: "pid-defined", //pid-undefined
		login: false,
		marketSegment: "segment-undefined",
		username: "username-undefined",
		origin: "",
		//made the below change for ie8 fix oca.data is not defined at this point
		// isHome: (oca.data && ('isHome' in oca.data))? oca.data.isHome : false,
		isHome: false,
		serviceType: null,
		OPSESSIONID: null,
		exceptions: {
			errorCount:0,
			portletName: "",
			pageId: ""
		}
	},
	breadcrumbs: ["undefined"],
	config: {
		debug: false, // debug.console.js will set it to true
		environment: window.oca_environment ||  "environment-undefined",
		currentDomain: 'currentDomain-undefined', // @deprecated - currently still used on eventTracker
		EventTracker: {
			enabled: true
		},
		cssPie: true,
		urls: {
			reitzSessionImg: "/web/portlets/KeepSessionTransparent.Gif",
			ippayments: {
				local: "preview?model=personal/my-account/billing-payments/jason/ippCallback.jason",
				sit: "https://demo.ippayments.com.au/access/index.aspx",
				st: "https://demo.ippayments.com.au/access/index.aspx",
				uat: "https://demo.ippayments.com.au/access/index.aspx",
				ppt: "https://demo.ippayments.com.au/access/index.aspx",
				prod: "https://www.ippayments.com.au/access/index.aspx"
			},
			usernameCookie: "/portal/site/customercentre/CookieReader",
			shopSession: "/portal/site/shop/ssecure",
			smbHost: {
				local:"",
				sit: "https://sit1.www.optusbusiness.com.au",
				st: "https://sit2.my.optus.com.au",
				uat: "https://uat1.www.optusbusiness.com.au",
				prod: "https://www.optusbusiness.com.au",
				ppt: "https://ppt.www.optusbusiness.com.au"
			},
			cmrHost: {
				local:"",
				sit:"https://sit1.www.optus.com.au",
				st: "https://sit2.my.optus.com.au",
				uat:"https://uat1.www.optus.com.au",
				prod:"https://www.optus.com.au",
				ppt: "https://ppt.www.optus.com.au"
			}
		},
		activeGroup: "group-undefined",
		activePage: "page-undefined"
	},

	// globalHeader data
	globalHeader: {
		internal: true
	}
};
