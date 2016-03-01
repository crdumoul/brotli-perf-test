// Defining nuskin and nuskin.account namespace (if doesn't exist)
if ('undefined' === typeof nuskin){
    nuskin = {}
}
nuskin.site = nuskin.site || {};

nuskin.site.Preferences = function(preferences){
    "use strict";

    if (preferences && preferences !== null){
        this.currentPage = preferences.currentPage;
        this.startPage = preferences.startPage;
        this.countryCode = preferences.countryCode;
        this.ribbonOpen = preferences.ribbonOpen;
    }

    this.toJSON = function(){
        var preferences = {};
        preferences.currentPage = this.currentPage;
        preferences.startPage = this.startPage;
        preferences.countryCode = this.countryCode;
        preferences.ribbonOpen = this.ribbonOpen;

        return preferences;
    };

    // ---------------------------------------------
    //
    //        Define all setter methods.
    //
    // ---------------------------------------------
    this.setCurrentPage = function(currentPage){
        this.currentPage = currentPage;
    };
    this.setStartPage = function(startPage){
        this.startPage = startPage;
    };
    this.setCountryCode = function(countryCode){
        this.countryCode = countryCode;
    };
    this.setRibbonOpen = function(ribbonOpen){
        this.ribbonOpen = ribbonOpen;
    };

    // ---------------------------------------------
    //
    //        Define all getter methods.
    //
    // ---------------------------------------------
    this.getCurrentPage = function(){
        return this.currentPage;
    };
    this.getStartPage = function(){
        return this.startPage;
    };
    this.getCountryCode = function(){
        return this.countryCode;
    };
    this.getRibbonOpen = function(){
        return this.ribbonOpen;
    };
};
nuskin.site.PreferencesCookieService = function(){

    var STORAGE_KEY = 'nuskin.site';

    // ---------------------------------------------
    //
    //        Define all public methods.
    //
    // ---------------------------------------------
    var publicMethods = {
        getPreferences : function(){
            var preferences = null;
            var preferencesData = getStoredPreferences();

            preferences = new nuskin.site.Preferences(preferencesData);

            return preferences;
        },
        setPreferences : function(preferences){
            writePreferencesToStorage(preferences);
        },
        resetPreferencesCookie : function(){
            writePreferencesToStorage(null);
        }
    };

    // ---------------------------------------------
    //
    //        Define all private methods.
    //
    // ---------------------------------------------
    function getStoredPreferences(){
        var preferences = null;
        if ($.cookie !== undefined){
            var cookieVal = $.cookie(STORAGE_KEY);
            if (cookieVal !== null && cookieVal !== undefined) {
                var account = JSON.parse(cookieVal);
                if (account !== null && account !== undefined){
                    preferences = JSON.parse(cookieVal).preferences;
                }
            }
        }
        return preferences;
    }

    function writePreferencesToStorage(preferences){
        if ($.cookie !== undefined) {
            var options = {path: '/'};
            if (preferences !== null  && preferences instanceof nuskin.site.Preferences){
                $.cookie(STORAGE_KEY, JSON.stringify({preferences: preferences.toJSON()}), options);
            }
            else {
                $.cookie(STORAGE_KEY, JSON.stringify({preferences: preferences}), options);
            }
        }
    }

    return publicMethods;
}();
