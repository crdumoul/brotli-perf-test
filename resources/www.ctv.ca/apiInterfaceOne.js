var _etsapi = {};
_etsapi.output = function (str) {
    try { console.log('[ ETS Common Logger ] - ' + str); }
    catch (e) { }
};
_etsapi.ETSdestinationCode = "ctv_web";
_etsapi.etsAppFolder = '';
_etsapi.etsApiPath = '';

try {
    if (onePlayerWebObj != undefined) {
        if (onePlayerWebObj.type != undefined) {
            switch (onePlayerWebObj.type.toLowerCase()) {
                case "oneplayerweb":
                case "OnePlayerWeb":
                    onePlayerWebObj.type = 'OnePlayerWeb';
                    break;
                case "oneplayerwebplaylist":
                case "OnePlayerWebPlaylist":
                    onePlayerWebObj.type = 'OnePlayerWebPlaylist';
                    break;
                case "oneplayerwebplaylistmax":
                case "OnePlayerWebPlaylistMax":
                    onePlayerWebObj.type = 'OnePlayerWebPlaylistMax';
                    break;
                case "oneplayerwebembed":
                case "onePlayerWebEmbed":
                    onePlayerWebObj.type = 'onePlayerWebEmbed';
                    break;
                default:
                    onePlayerWebObj.type = 'OnePlayerWeb';
                    break;
            }
        } else {
            onePlayerWebObj.type = 'OnePlayerWeb';
        }

        if (onePlayerWebObj.language == undefined) {
            switch (onePlayerWebObj.language) {
                case "french":
                case "fr":
                    onePlayerWebObj.language = 'fr';
                    break;
                default:
                    onePlayerWebObj.language = 'en';
                    break;
            }
        } else {
            onePlayerWebObj.language = 'en';
        }

        if (onePlayerWebObj.metadataInfo == undefined) {
            onePlayerWebObj.metadataInfo = true;
        }
        if (onePlayerWebObj.share == undefined) {
            onePlayerWebObj.share = true;
        }
        if (onePlayerWebObj.embed == undefined) {
            onePlayerWebObj.embed = true;
        }

    } else {
        var onePlayerWebObj = { type: 'OnePlayerWeb', language: 'en', metadataInfo: true, share: true, embed: true }  //defualt player type        
    }
} catch (e) {
    _etsapi.output(' onePlayerWebObj Error: ' + e.toString());
    var onePlayerWebObj = { type: 'OnePlayerWeb', language: 'en', metadataInfo: true, share: true, embed: true }  //defualt player type 
}

_etsapi.output(' onePlayerWebObj Type: ' + onePlayerWebObj.type.toString());
_etsapi.configUrl = 'http://capi.9c9media.com/config/' + _etsapi.ETSdestinationCode + '/' + onePlayerWebObj.type;

if (window.location.search.indexOf("playerenv=prod") != -1){
    _etsapi.configUrl =  'http://capi.9c9media.com/config/' + _etsapi.ETSdestinationCode + '/' + onePlayerWebObj.type;
}else if(window.location.search.indexOf("playerenv=stage") != -1){
    _etsapi.configUrl =  'http://capi.stage.9c9media.com/config/' + _etsapi.ETSdestinationCode + '/' + onePlayerWebObj.type;
}


_etsapi.ajaxCrossDomainCors = function (serviceURL, successCallback, errorCallback, infoObj) {
    try {

        apiInterface_JqueryCallBack = function (data) {
            if (successCallback === undefined) { return; }
            successCallback(data, infoObj);
        };
        var ajaxPars = {
            url: serviceURL,
            cache: true,
            contentType: "application/json",
            jsonpCallback: "apiInterface_JqueryCallBack",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (errorCallback === undefined || textStatus == "parsererror") return;
                errorCallback(textStatus, infoObj);
            }
        };

        if ($.support.cors) {
            ajaxPars.type = "GET";
            ajaxPars.dataType = "jsonp";
            ajaxPars.jsonp = "callback";
        }
        else {
            ajaxPars.type = "GET";
            ajaxPars.dataType = "jsonp";
            ajaxPars.jsonp = "callback";
        }
        $.ajax(ajaxPars);

    } catch (err) {
        throw (err);
    }
};

_etsapi._Adrules = {}; _etsapi._Adrules.Type = {};
_etsapi.configuration = {}; _etsapi.configuration.refreshInterval = 10000;
_etsapi.configFlash = {};
_etsapi.copyFlash = {};
_etsapi.resources = {};
_etsapi.language = onePlayerWebObj.language; 

_etsapi.getConfiguration = function (result, loadETSapi) {
   // try{
        var globalConfiguration = result.Configuration.GlobalConfiguration.Settings; getText(globalConfiguration);
        var playerSettings = {};
        var configFlash = {};
        var copyFlash = {};
        var copy = {};

        _etsapi.resources = result.Configuration.GlobalConfiguration.Resources;
        if (result.Configuration.DestinationConfiguration) {
            _etsapi.configuration.refreshInterval = result.Configuration.DestinationConfiguration.Settings.cfgRefreshInterval;

            playerSettings = result.Configuration.DestinationConfiguration.Settings.playerSettings; getText(playerSettings);
            var adrules = result.Configuration.DestinationConfiguration.Settings.adrules; getText(adrules);
            if (adrules.adrule.length != undefined && adrules.adrule.length > 1) {
                for (var x = 0; x < adrules.adrule.length; x++) {
                    AdRules_map(adrules.adrule[x]);
                }
            } else {
                AdRules_map(adrules.adrule);
            }
            configFlash = result.Configuration.DestinationConfiguration.Settings.configFlash; getText(configFlash); //flashConfig_map(configFlash);
            copyFlash = result.Configuration.DestinationConfiguration.Settings.copyFlash; getText(copyFlash);// flashCopy_map(copyFlash);

            var lang = "";
            if (copyFlash.copy != undefined) {
                for (var i = 0; i < copyFlash.copy.length; i++) {
                    lang = copyFlash.copy[i]['@language'];
                    copy[lang] = copyFlash.copy[i];
                }
            } else {
                //for backwards compatibility
                copy["en"] = copyFlash;
            }

            if (copy[_etsapi.language] != undefined) {
                copyFlash = copy[_etsapi.language];
            } else {
                copyFlash = copy["en"];
            }


        } else { playerSettings.error = 'Destination configuration not available.'; }

        $.extend(_etsapi, globalConfiguration, playerSettings);
        _etsapi.etsAppFolder = _etsapi.appFolderPath;
        _etsapi.etsApiPath = _etsapi.apiPath;
        //_etsapi.etsAppFolder = "http://otot.9c9media.com/player_api/ETS_Universal_42_3.0/";

        _etsapi.playIconPosition = "left";
        //testENV overwrite
        // etsAppFolder = 'http://etsdev.ctv.ca/webroot2/Players/internal/mediaplayer/builds/ETS_Universal_42/';
        etsApiPath = "includes/etsapi.js";
        if (_etsapi.playerVersion === undefined) { _etsapi.playerVersion = {}; }

        (function(){
            var appFoldPathURLParsed = document.createElement('a');
            appFoldPathURLParsed.href = _etsapi.etsAppFolder;

            if (window.location.search.indexOf("playerpath=prod") != -1){
                _etsapi.etsAppFolder = "//player.9c9media.com" + appFoldPathURLParsed.pathname;
            }else if(window.location.search.indexOf("playerpath=stage") != -1){
                _etsapi.etsAppFolder = "//player.stage.9c9media.com" + appFoldPathURLParsed.pathname;
            }else if(window.location.search.indexOf("playerpath=local") != -1){
                _etsapi.etsAppFolder = "";
            }
        })();

        _etsapi.playerVersion[_etsapi.ETSdestinationCode] = {
            flashConfigs: {
                formatID: _etsapi.desktopFormatId,
                swf: _etsapi.etsAppFolder + _etsapi.swfPlayerPath,
                skin: _etsapi.etsAppFolder + _etsapi.swfSkinPath,
                appFolder: _etsapi.etsAppFolder + _etsapi.appFolder,
                cms: _etsapi.cms
            },
            comscoreID: _etsapi.comscoreId,
            streamsenseId: _etsapi.streamsenseId,
            configFlash: null,
            copyFlash: null
        };
        flashConfig_map(configFlash); flashCopy_map(copyFlash);
        _etsapi.output("config reset, interval set at: " + result.Configuration.DestinationConfiguration.Settings.cfgRefreshInterval);
        if (loadETSapi) {
            //$.getScript(_etsapi.etsAppFolder + etsApiPath, function () { });
            _etsapi.ajaxCrossDomainCors(_etsapi.etsAppFolder + etsApiPath,
             function (result) { }, function (XMLHttpRequest, textStatus, errorThrown) { alert('ERROR\n' + textStatus + '\n' + errorThrown); }, "load etsapi");
        }
        var tETS = window.setTimeout('ETSintervalFunc()', result.Configuration.DestinationConfiguration.Settings.cfgRefreshInterval);

        function flashCopy_map(copyConfig) {
            var jCopyConfig = JSON.stringify(copyConfig);
            jCopyConfig = jCopyConfig.replace(/\@/g, '');
            _etsapi.playerVersion[_etsapi.ETSdestinationCode].copyFlash = jCopyConfig;
        };

        function flashConfig_map(flashConfig) {
            var jFlashConfig = JSON.stringify(flashConfig);
            jFlashConfig = jFlashConfig.replace(/\@/g, '');
            _etsapi.playerVersion[_etsapi.ETSdestinationCode].configFlash = jFlashConfig;
        };
        function AdRules_map(adrule) {

            var jAdrules = JSON.stringify(adrule);
            jAdrules = jAdrules.replace(/\@/g, '');
            adrule = JSON.parse(jAdrules);

            var typeName = adrule.type;
            _etsapi._Adrules.Type[typeName] = adrule;
            delete _etsapi._Adrules.Type[typeName].type;

            var rules = {};
            $.each(adrule.rules.rule, function (i) {
                var ruleName = this.name;
                var params = {};
                $.each(this.param, function (i) {
                    var paramName = this.name;
                    var paramValu = this.value;
                    params[paramName] = paramValu;
                });
                rules[ruleName] = params;
            });

            _etsapi._Adrules.Type[typeName].rules = rules;
        };
        function getText(obj) {
            $.each(obj, function (i) {
                if (this['#cdata-section']) obj[i] = this['#cdata-section'];
            });
        };
    //} catch (e) {
                
    //    $('#mediaplayerdiv').append('<p class="ETSPlayerTVEMessage" style="text-align:center;">For the best possible video experience, please visit our <a href="http://www.ctv.ca/About/Frequently-Asked-Questions/CTV-GO.aspx" target="_blank" style="text-decoration: underline;">FAQ page'  
    //        + ' </a> for browsers <br/> and versions supported.<p>');
    //}
};


function ETSintervalFunc() {
    _etsapi.ajaxCrossDomainCors(_etsapi.configUrl,
           function (result) { _etsapi.getConfiguration(result, false); }, function (XMLHttpRequest, textStatus, errorThrown) { alert('ERROR\n' + textStatus + '\n' + errorThrown); }, "setIntervalConfig");
}

try {
    _etsapi.ajaxCrossDomainCors(_etsapi.configUrl, function (result) { _etsapi.getConfiguration(result, true); }, function (XMLHttpRequest, textStatus, errorThrown) { alert('ERROR\n' + textStatus + '\n' + errorThrown); }, "setInitialConfig");
} catch (e) { _etsapi.output("error on config refresh call."); }












