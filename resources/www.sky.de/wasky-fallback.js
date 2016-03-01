// is the DDL not defined yet? It should exist by now
if(typeof(digitalData) === "undefined" || (typeof(digitalData) === "object" && digitalData === null)) {

    // digitalData skeleton
    var digitalData = {
        campaign: {
            crm: "",
            eml: "",
            intcmp1: "",
            intcmp2: "",
            intcmp3: "",
            slt: "",
            wkz: ""
        },
        country: "",
        crm: {
            selfCareType: ""
        },
        errorLoggingEnabled: "",
        errorMessage: "",
        form: {
            step: ""
        },
        helpcenter: {
            contactViewString: "",
            contactRatingString: "",
            faqViewString: "",
            faqRatingString: ""
        },
        inPage: {
            type: "",
            name: "",
            string: ""
        },
        media: {
            mediaInfo: {
                articleId: 0,
                type: "",
                title: "",
                genre: "",
                seriesSeasonNr: "",
                seriesEpisodeTitle: "",
                seriesEpisodeNr: ""
            },
            video: {
                videoId: 0,
                videoTitle: "",
                videoPlayer: "",
                videoDRM: "",
                videoGenre: ""
            }
        },
        newsletter: {
            name: "",
            action: "",
            string: ""
        },
        page: {
            pageInfo: {
                adEnabled: false,
                contentType: "",
                contentSales: false,
                contentCRM: false,
                contentRelevanceString: "",
                hierarchy1: "",
                hierarchy2: "",
                hierarchy3: "",
                IVWcategory: "",
                level1: "",
                level2: "",
                level3: "",
                level4: "",
                level5: "",
                level6: "",
                level7: "",
                level8: "",
                level9: "",
                level10: "",
                pageId: 0,
                pageName: "",
                pageCMSHeadline: "",
                previousPage: "",
                previousChannel: "",
                viewPort: ""
            }
        },
        permission: {
            change: ""
        },
        persistStore: {},
        persistStoreLoaded: false,
        product: {
            connectionType: "",
            paymentType: "",
            installationType: "",
            productString: "",
            productChannel: "",
            purchaseId: 0,
            receiverType: "",
            offerId: 0
        },
        referrer: {},
        sales: {
            leadGenerated: "",
            offerId: ""
        },
        search: {
            filterString: "",
            isQuicksearchUsed: "false",
            isSearchsite: "false",
            resultClicked: "",
            termEntered: "",
            quicksearchTerm: ""
        },
        sessionTimedOut: "false",
        sessionStart: "",
        record: {
            recordString: "",
            itemRecorded: ""
        },
        teaser: [],
        teaserViewedList: "",
        teaserLastClicked: "",
        timestamp: "",
        timestampSecs: "",
        timestampLastPage: "",
        tvguide: {
            epgPageName: ""
        },
        user: {
            age: "",
            altUserIdName: "",
            altUserIdHash: "",
            cHash: "",
            cHashTimestamped: "",
            customerProfile: "",
            gender: "",
            group: "",
            loginStatusPersistent: "",
            loginStatus: "",
            loginStringPersistent: "",
            loginString: "",
            marketingPermission: "",
			mHash: "",
            packages: "",
            rememberMeOption: "",
            singleSignOnOption: ""
        },
        url: {},
        version: "fallback_DDL_loaded",
        widget: [],
        widgetViewedList: "",
        widgetLastClicked: ""
    };

    // set indicator for later error tracking
    var waSkyErrDDL = "no"; 

}

// is the waSky library not defined yet? It should exist by now
if(typeof(waSky) === "undefined" || (typeof(waSky) === "object" && waSky === null)) {
    
    // waSky skeleton
    var waSky = {
        page: {
            setInfo: function(a, b, c, d, e, f, g, h, i, j, k, l) {},
            homeClick: function(a) {},
            homeButtonClick: function(a) {},
            correctPageName: function(a) {},
            correctHierarchy1: function(a) {},
            setPreviousPage: function() {},
            setPreviousChannel: function() {}
        },
        inPage: {
            setView: function(a, b) {},
            setInteraction: function(a, b, c) {}
        },
        country: {
            setCountry: function() {}
        },
        user: {
            setCHash: function(a) {},
            recoverVars: function() {},
            setLogin: function(a, b, c, d, e, f, g, h, i) {},
            setLogout: function() {}
        },
        teaser: {
            viewedCount: 0,
            setView: function(a, b, c, d, e, f) {},
            setClicked: function(a) {},
            getViewed: function() {},
            resetViewed: function() {}
        },
        tvguide: {
            setEpgDetails: function(a, b, c, d, e, f, g) {}
        },
        widget: {
            viewedCount: 0,
            setView: function(a) {},
            getViewed: function() {}
        },
        newsletter: {
            setAdded: function(a) {},
            setRemoved: function(a) {}
        },
        product: {
            setAbo: function(a, b, c, d, e, f, g, h, i, j) {},
            setInfoAbo: function(a, b, c, d, e, f, g, h, i, j) {},
            setUpgrade: function(a, b, c, d, e, f, g, h, i) {},
            setInfoUpgrade: function(a, b, c, d, e, f, g, h, i) {},
            parsePurchaseId: function(a, b) {},
            parseReceiverType: function(a, b) {},
            parseAddOns: function(a) {},
            setAboMgmEntry: function(a, b) {},
            resetAboMgmEntry: function() {},
            setRecord: function() {}
        },
        select: {
            setPurchase: function(a, b, c, d, e, f, g, h, i) {},
            parsePurchaseId: function(a) {},
            checkAccessPath: function(a) {}
        },
        campaignParams: {
            checkUrlParams: function() {},
            resetCampaignParams: function() {},
            wkzLogic: function() {},
            salesOfferPathSet: function(a) {},
            salesOfferPathDelete: function() {}
        },
        media: {
            setInfo: function(a, b, c, d, e, f, g) {},
            videoCallbackReady: function(a) {},
            videoCallbackBegin: function(a) {},
            videoCallbackPlay: function(a) {},
            videoCallbackStop: function(a) {},
            videoCallbackSeek: function(a) {},
            videoCallbackComplete: function(a) {},
            videoCallbackError: function(a) {},
            videoCallbackAdStart: function(a) {},
            videoCallbackAdComplete: function(a) {},
            videoCallbackAuthNeeded: function(a) {},
            videoCallbackDuration: function(a) {},
            videoCallbackCuePoint: function(a) {},
            video:{
                ready: function(a, b, c, d, e, f, g, h, i, j, k) {},
                programChange: function(a, b, c, d, e, f, g, h, i, j) {},
                setSeriesData: function(a, b, c, d) {},
                resetSeriesData: function(a) {},
                play: function(a, b) {},
                stop: function(a, b) {},
                seek: function(a, b) {},
                complete: function(a) {},
                error: function(a, b) {},
                adPlay: function(a, b, c, d, e, f) {},
                adStop: function(a, b, c) {},
                adComplete: function(a, b, c) {}
            }
        },
        form: {
            setStep: function(a, b, c) {},
            setError: function(a, b, c) {}
        },
        selfcare: {
            setActionSuccessfull: function(a) {}
        },
        helpcenter: {
            setContactTopic: function(a, b, c, d) {},
            setContactFeedback: function(a) {},
            setFaqView: function(a, b, c) {},
            setFaqRating: function(a) {}
        },
        permission: {
            setPermission: function(a) {}
        },
        search: {
            setQuicksearchClicked: function(a) {},
            checkSearchParams: function() {},
            setClicked: function(a, b, c) {},
            setViewed: function(a, b) {}
        },
        constructor: function() {},
        debug: function(a) {},
        setDebug: function(a) {},
        removeEvent: function(a) {},
        setEvent: function(a) {},
        removeEvent: function(a) {},
        getTimestamp: function() {},
        error: function(a, b, c) {},
        errorSend: function(a) {},
        errorLoggingCheck: function() {},
        findFirstElement: function(a, b) {},
        setDataElement: function(a, b) {},
        persistStore: {
            get: function(a) {},
            set: function(a, c, d) {},
            deleteItem: function(a) {},
            loadCookieVars: function() {},
            writeCookieVars: function() {},
            writeSimpleCookie: function(a, b) {},
            exists: function(a) {},
            isExpired: function(a) {},
            sessionStartCheck: function() {},
            sessionStartReset: function(a) {}
        },
        timer: {
            runningTimers: [],
            start: function(a, b) {},
            stop: function(a) {},
            get: function(a) {},
            reset: function(a) {}
        },
        ppv: {
            start: function() {},
            get: function() {},
            handleEvent: function() {}
        },
        pagePercentViewed: {
            start: function() {},
            get: function() {},
            handleEvent: function() {}
        },
        loadtime: {
            measure: function() {}
        }
    }

    // log error, prepare date, format: 8/30/2014 12:58:34, urlencoded
    var waSkyErr = new Object();

    waSkyErr["dt_obj"]    = new Date();
    waSkyErr["dt_y"]      = waSkyErr["dt_obj"].getFullYear();
    waSkyErr["dt_mon"]    = waSkyErr["dt_obj"].getMonth();
    waSkyErr["dt_d"]      = waSkyErr["dt_obj"].getDate();
    waSkyErr["dt_h"]      = waSkyErr["dt_obj"].getHours();
    waSkyErr["dt_min"]    = waSkyErr["dt_obj"].getMinutes();
    waSkyErr["dt_s"]      = waSkyErr["dt_obj"].getSeconds();
    waSkyErr["dt_string"] = waSkyErr["dt_mon"] + "%2F" + waSkyErr["dt_d"] + "%2F" + waSkyErr["dt_y"] +"%20" + waSkyErr["dt_h"] + "%3A" + waSkyErr["dt_min"] +"%3A" + waSkyErr["dt_s"];

    // log error, send call
    if(typeof(waSkyErrDDL) === "undefined") waSkyErrDDL = "yes"; // defined earlier, if errorneous

    waSkyErr["loaded_sat"] = "yes";
    if(typeof(_satellite) === "undefined") waSkyErr["loaded_sat"] = "no";

    waSkyErr["loaded_s"] = "yes";
    if(typeof(s) === "undefined") waSkyErr["loaded_s"] = "no";

    waSkyErr["ref"] = "(no referrer)"; 
    if(document.referrer.length > 0) waSkyErr["ref"] = document.referrer;

    waSkyErr["url"] = document.URL;

    waSkyErr["track_host"] = "http://omni.sky.de";
    if(waSkyErr["url"].indexOf("https") > -1) waSkyErr["track_host"] = "https://somni.sky.de";

    waSkyErr["message"] = "Fallback activated, no waSky Lib and/or other needed objects. Lib loaded?: no, s-obj: " + waSkyErr["loaded_s"] + ", _satellite: " + waSkyErr["loaded_sat"] + ", DDL: " + waSkyErrDDL;
    waSkyErr["track_url"] = waSkyErr["track_host"] + "/b/ss/sky-error/1/JS-1.4/s18389223130634?AQB=1&ndh=1&pf=1&t=" + waSkyErr["dt_string"] + "%201%20-120&D=D%3D&mid=24763500750700519764127654960611629178&aamlh=6&ce=UTF-8&pageName=error-fallback-libload-failed&g=http%3A%2F%2Fint.next.sky.de%2Fnext%2F&cc=EUR&ch=error&events=event1&aamb=NRX38WO0n5BH8Th-nqAG_A&h1=error&l1=NEXT%2Fx.x%23%23%28none%29%23%23" + waSkyErr["message"] + "%23%23na%23%23" + waSkyErr["url"] + "%23%23" + waSkyErr["ref"] + "&s=1600x900&c=24&j=1.8.5&v=Y&k=Y&bw=1600&bh=391&AQE=1";

    waSkyErr["track_img"] = new Image();
    waSkyErr["track_img"].src = waSkyErr["track_url"];

}