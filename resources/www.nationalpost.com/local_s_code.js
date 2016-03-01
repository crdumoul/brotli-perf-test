/* This file is used to overwrite any default SiteCatalyst settings found in "/js/global_canwest_s_code.js".
To set the report suite, modify "/js/account_s_code.js" */

//s.linkInternalFilters = 'javascript:,nationalpost.com,nationalpost.adperfect.com,nationalpost.kijiji.ca,nationalpost.oodle.com,nationalpost.stats.com,flyercity.ca,legacy.com,workopolis.com';
//s.prop34 = scDivsion.publishing;
s.prop35 = scBranding.nationalpost;
if (typeof npSOverride !== 'undefined') { // npSOverride is defined before s is created...
	if (npSOverride.prop50) {
		s.prop50 = npSOverride.prop50;
	}
}
