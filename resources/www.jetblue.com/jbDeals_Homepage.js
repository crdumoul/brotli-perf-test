//JB HomePage Deals

//Data Loader
jbDealsHomeData = function () {
    var self = this;
    self.name = 'jbDealsHomeData';
    self.file = '/js/jbDeals_Homepage.js';
    self.deals_homepage_config = {
        ajaxReqOrigin: "JFK", //requestDataObj.flightOrigin;
        ajaxReqDestination: "",
        ajaxMaxLowestDeals: 2,
        ajaxMaxTrueBlueDeals: 0
    }
    self.geoCode = 'JFK';
    self.viewAirportName = '';
    self.dealsLoadedCheck = false;
    self.bffPageCheck = false;
    self.bffServiceCheck = false;
    self.dealsBFFError = true;
    self.dealsDealAPIError = true;

    //Dispatch Listeners
    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.DEALS_JSON_REQUESTED, function (e, requestDataObj) {
        retreiveDealsData(requestDataObj);
    });
    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.CHECK_BFF_AVAILABILITY, function () {
        checkBFFAvailability();
    })

    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.VALIDATE_ERR_SCN_CHK, function () {
        validateErrorScenChks()
    })

    var checkBFFAvailability = function () {
        //console.log("checkBFFAvailability")
        var subdomain = location.hostname.split('.').shift();
        //Bypass BFF check if local
        if (subdomain.indexOf("dint") >= 0 || subdomain.indexOf("localhost") >= 0) {
            self.bffPageCheck = true;
            self.bffServiceCheck = true;
            self.dealsBFFError = false;
            validateErrorScenChks();
        }
        else {
            //Check BFF page
            $.ajax("/bestfarefinder/default.aspx?origin=JFK&destination=BOS")
                .done(function () {
                    //Page is up. Now check BFF service
                    self.bffPageCheck = true;
                    checkBFFService();
                })
                .fail(function () {
                    self.bffPageCheck = true;
                    //self.dealsBFFError = true;
                    errReason = "BestFareFinder Page down";
                    $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.DEALS_JSON_LOAD_FAILED, errReason);
                });
        }

        //Check BFF service
        function checkBFFService(cb) {
            var date = new Date();

            $.ajax("/bestfarefinder/CalendarData.aspx?month=" + parseInt(date.getMonth() + 1) + "+" + date.getFullYear() + "&type=points&direction=outbound&tripType=RT&origin=JFK&destination=BOS&adult=1&child=0&infant=0")
                .done(function (data) {
                    if (data.hasError == "NO") {
                        self.bffServiceCheck = true;
                        self.dealsBFFError = false;
                        $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.VALIDATE_ERR_SCN_CHK);
                    }
                    else {
                        self.bffServiceCheck = true;
                        //self.dealsBFFError = true;
                        errReason = "BestFareFinder service has Error";
                        $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.DEALS_JSON_LOAD_FAILED, errReason);
                    }

                })
                .fail(function () {
                    self.bffServiceCheck = true;
                    //self.dealsBFFError = true;
                    errReason = "BestFareFinder service down";
                    $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.DEALS_JSON_LOAD_FAILED, errReason);
                })
        }

    }

    var validateErrorScenChks = function () {

        if (self.bffPageCheck && self.bffServiceCheck && self.dealsLoadedCheck && !self.dealsBFFError && !self.dealsDealAPIError) {
            $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.DEALS_JSON_LOADED, self.dealsDataObj);
        }
    }

    //Ajax Call and Response
    var retreiveDealsData = function (requestDataObj, allDealsReq) {
        var ajaxReqOrigin = requestDataObj.ajaxReqOrigin; //requestDataObj.flightOrigin;
        var ajaxReqDestination = requestDataObj.ajaxReqDestination;
        var ajaxMaxLowestDeals = requestDataObj.ajaxMaxLowestDeals;
        var ajaxMaxTrueBlueDeals = requestDataObj.ajaxMaxTrueBlueDeals;
        var targetCode = self.geoCode;

        $.ajax({
            //Ajax call to get deals data
            cache: false,
            dataType: "json",
            url: "/apis/DealsAPI/Deals/", /* /DealsWebAPI/Deals */
            data: { "Origin": ajaxReqOrigin, "Destination": ajaxReqDestination, "MaxLowestDeals": ajaxMaxLowestDeals, "MaxTrueBlueDeals": ajaxMaxTrueBlueDeals, "TargetOrigin": targetCode, backfill: true },
            success: function (dealsResponseData) {
                self.dealsDataObj = dealsResponseData.Deals;
                var numDeals = 0;
                if (self.dealsDataObj != null) {
                    numDeals = self.dealsDataObj.length;
                }
                if (numDeals < 1) {//Error scenario
                    self.dealsLoadedCheck = true;
                    //self.dealsDealAPIError = true;
                    $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.DEALS_JSON_LOAD_FAILED, ["error", "error", "zero deals returned"]);
                }
                else {
                    self.dealsLoadedCheck = true;
                    self.dealsDealAPIError = false;
                    $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.VALIDATE_ERR_SCN_CHK);
                }
            },
            error: function (xhr, status, error) {//Error scenario
                self.dealsLoadedCheck = true;
                //                self.dealsDealAPIError = true;
                $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.DEALS_JSON_LOAD_FAILED, [xhr, status, error]);
            }
        })


    }

    var pubOriginData = function (data) {
        self.deals_homepage_config.ajaxReqOrigin = data;
    }

    //Let the Main Controller know an instance of this has been created and ready to listen for dispatches.
    $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.DATA_CONTROLLER_INSTANTIATED);
}

//View changes and responses
jbDealsHomeViews = function () {
    var self = this;
    self.name = 'jbDealsHomeViews';
    self.file = '/js/jbDeals_Homepage.js';

    //Dispatch listeners

    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.INJECT_DATA_INTO_VIEW, function (e, dataObject) {
        createDealsUI(dataObject);
    });

    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.APPLY_RESTRICTIONS_TOGGLE, function () {
        applyRestrictionsToggle();
    });

    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.ADD_HIDEDISPLAY_TO_ELEMENT, function (e, element) {
        addHideDisplayCSS(element);
    });

    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.REMOVE_HIDEDISPLAY_FROM_ELEMENT, function (e, element) {
        removeHideDisplayCSS(element);
    });

    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.HIDE_LOADER, function () {
        hideLoader();
    });

    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.UPDATE_FARE_URL, function () {
        updateFareURL();
    });

    $(jbDealsHomeImpl).bind(jbDealsHomeImpl.Events.CHANGE_ORIGIN_VIEW, function (e, data) {
        changeOriginView(data);
    });

    //Removes Element by adding .displayHide css Class
    var addHideDisplayCSS = function (element) {
        $(element).addClass('displayHide');
    }

    //Shows Element by removing .displayHide css class
    var removeHideDisplayCSS = function (element) {
        $(element).removeClass('displayHide');
    }

    var hideLoader = function () {
        var LOADER_CONTAINER = $('.loaderContainer').get(0);
        $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.ADD_HIDEDISPLAY_TO_ELEMENT, LOADER_CONTAINER);
    }

    var createDealsUI = function (data) {
        var deals = jbDealsHomeDataImpl.dealsDataObj;
        var MAX_ORIGIN_DEALS_NUM = 2;
        var NO_ORIGIN_DEALS_NUM = 0;
        var DEALSOFFERS_WRAPPER = $('.offers-wrap');
        var showGetaways;

        var legalDaysTextFormat = function (deal) {
            var MAX_NUM_DOW_NOTAVAIL = 5;
            var daysOfWeek = deal.Fare.DaysOfWeek;
            var allDaysofWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            var arr_diff = function (a1, a2) {
                /*
                var a = [], diff = [];
                for (var i = 0; i < a1.length; i++) {
                a[a1[i]] = true;
                }
                for (var i = 0; i < a2.length; i++) {
                a[a2[i]] ? delete a[a2[i]] : a[a2[i]] = true;
                }
                for (var k in a) {
                if (k != "indexOf") {
                diff.push(k);
                }
                }
                return diff;*/
                var diff = [];
                $.each(a1, function (i) {
                    if ($.inArray(a1[i], a2) < 0) {
                        diff.push(a1[i]);
                    }
                });
                return diff;
            }

            var daysNotAvailable = daysOfWeek.length == 7 ? [] : arr_diff(allDaysofWeek, daysOfWeek);
            var daysNotAvailableLength = daysNotAvailable.length;
            var daysNotAvailableTxt = "";

            /*switch (daysNotAvailableLength) {
                case 0:
                    break;
                case 1:
                    daysNotAvailableTxt = daysNotAvailable[0];
                    break;
                case 2:
                    daysNotAvailableTxt = daysNotAvailable[0] + " and " + daysNotAvailable[1];
                    break;
                default:
                    for (var currentDay = 0; currentDay < daysNotAvailableLength; currentDay++) {
                        (currentDay + 1) == daysNotAvailableLength ? daysNotAvailableTxt += "and " + daysNotAvailable[currentDay] : daysNotAvailableTxt += daysNotAvailable[currentDay] + ", ";
                    }
                    break;
            }*/

            var dayUnavailableText = daysNotAvailable.join(", ");
            if (daysNotAvailable.length > 1) {
                var index = dayUnavailableText.lastIndexOf(', ');
                daysNotAvailableTxt = dayUnavailableText.substring(0, index) + " and " + dayUnavailableText.substring(index + 2);
            } else {
                daysNotAvailableTxt = dayUnavailableText;
            }

            var legalDayText = "No flights on " + daysNotAvailableTxt + ".  ";
            // legalDayText = daysNotAvailableLength >= 5 ? legalDayText + "No flights on DOW available.  " : legalDayText;
            legalDayText = (daysNotAvailableLength == 0 || daysNotAvailableLength > 6) ? "" : legalDayText;

            return legalDayText;
        }

        var formatProperDate = function (date) {
            var year = date.substr(2, 2);
            var month = date.substr(5, 1) == 0 ? date.substr(6, 1) : date.substr(5, 2);
            var day = date.substr(8, 1) == 0 ? date.substr(9, 1) : date.substr(8, 2);

            return month + '/' + day + '/' + year;
        }

        //Check if last deals pod is from page origin or Mac city
        var origin = jbDealsHomeDataImpl.deals_homepage_config.ajaxReqOrigin;
        var lastPod = deals[1].Origin.AirportCode
        var exists = false;
        if (MACDefinitions[origin]) {
            //MAC exists
            //var lastPod = $($('.featuredHolder .jbPod .podOrigin')[6]).text().trim().slice(-4, -1);
            for (var i = 0; i < MACDefinitions[origin].length; i++) {
                if (MACDefinitions[origin][i] == lastPod) {
                    exists = true;
                    break;
                }
            }
        }

        if (!exists && (lastPod != origin)) {
            $(DEALSOFFERS_WRAPPER).removeClass("no-getaway");
            showGetaways = true;
        } //end of origin/final pod check


        //Take Pittsburgh, PA (PIT) and return Pittsburgh, PA
        //Take St. Croix, (STX) and return St. Croix
        var formatCityNames = function (name) {
            var formatted = name.split('(')[0];
            var lastChars = formatted.split(',')[1];

            if (lastChars.length < 3) {
                formatted = formatted.split(',')[0];
            }
            return formatted;
        }

        for (var dealcount = 0; dealcount < deals.length; dealcount++) {
            var currentDeal = deals[dealcount];
            var offerCount = dealcount + 1;
            var DEALSOFFERS_CONTAINER = $('.offers-inner');
            var currentOfferContainer = $(DEALSOFFERS_CONTAINER).find('.offer' + offerCount);
            var offer_price = $(currentOfferContainer).find('.price .value');
            var offer_from = $(currentOfferContainer).find('.from>span');
            var offer_to = $(currentOfferContainer).find('.to>span');
            var see_offer = $(currentOfferContainer).find('.see-offer>a');
            var fare_link = $(currentOfferContainer).find('.middle-col>a');
            var legal_link = $(currentOfferContainer).find('.restrictions>a');
            var extraLegalCopy = $('#dealsIMLegal').html();
            var NOHEADER_NUMCHARS = 40;
            var HEADER_NUMCHARS = 40;

            var trueFirstAvailableDate = formatProperDate(currentDeal.Fare.FirstDayOfAvailability);
            var trueLastAvailableDate = formatProperDate(currentDeal.Fare.LastDayOfAvailability);
            var daysOfWeekText = legalDaysTextFormat(currentDeal);

            //var hasOriginState = currentDeal.Origin.StateCode && (currentDeal.Origin.StateCode != "");
            //var hasDestState = currentDeal.Destination.StateCode && (currentDeal.Destination.StateCode != "");

            var dealPrice = currentDeal.Fare.FareAmount;
            dealPrice = Math.ceil(dealPrice);

            var dealFrom = currentDeal.Origin.DefaultDisplayName; //hasOriginState ? currentDeal.Origin.CityName + ", " + currentDeal.Origin.StateCode : currentDeal.Origin.CityName;
            dealFrom = formatCityNames(dealFrom); //cut off airport code for deal homepage
            //if (hasOriginState) {
            dealFrom = showGetaways ? jbDealsHomeImpl.airportEllipsisFormatter(dealFrom, NOHEADER_NUMCHARS) : jbDealsHomeImpl.airportEllipsisFormatter(dealFrom, HEADER_NUMCHARS);
            //}

            var dealTo = currentDeal.Destination.DefaultDisplayName //hasDestState ? currentDeal.Destination.CityName + ", " + currentDeal.Destination.StateCode : currentDeal.Destination.CityName;
            dealTo = formatCityNames(dealTo); //cut off airport code for deal homepage
            //if (hasDestState) {
            dealTo = showGetaways ? jbDealsHomeImpl.airportEllipsisFormatter(dealTo, NOHEADER_NUMCHARS) : jbDealsHomeImpl.airportEllipsisFormatter(dealTo, HEADER_NUMCHARS);
            //}

            var bestfareURL = '/BestFareFinder/?origin=' + currentDeal.Origin.AirportCode + '&destination=' + currentDeal.Destination.AirportCode + "&departure=" + currentDeal.Fare.FirstDayOfAvailability

            var legalTxt = '<div class="dealsLegalOverlay">*This fare is available on select dates between ' + trueFirstAvailableDate + ' and ' + trueLastAvailableDate + '.  ' + daysOfWeekText + 'Fare may not be available during holidays or other peak travel days.  Click on the fare to see a fare calendar showing the exact dates this fare is available.  Any "Price Drop" that is shown is based on lowest bookable fare within the last 72 hours.  ' + extraLegalCopy + '</div>'

            $(offer_price).html(dealPrice);
            $(offer_from).html(dealFrom);
            $(offer_to).html(dealTo);
            $(see_offer).add(fare_link).attr('href', bestfareURL);
            $(legal_link).attr('data', legalTxt);

            $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.REMOVE_HIDEDISPLAY_FROM_ELEMENT, currentOfferContainer);
        }


    }

    var applyRestrictionsToggle = function () {
        var restrictionsModal = new JB.Class.Modal("#restrictions-modal", {
            openTogglers: "div.restrictions a",
            onOpen: function (e, instance) {
                //if (window.console) { console.log(e, e.currentTarget, instance, instance.container) };
                $('#restrictions-modal').removeClass('hidden');
                var $modal = instance.modal,
					$dataInject = '<div class="body-inner">' + $(e.currentTarget).attr('data') + '</div>';
                $modal.find('div.body').html($dataInject);
                return false;
            }
        });
    }

    var changeOriginView = function (data) {
        var dealsOriginContainer = $("#from_deals").get(0);
        data = data.toUpperCase();
        $(dealsOriginContainer).html(data);
    }

    //Let the Main Controller know an instance of this has been created and ready to listen for dispatches.
    $(jbDealsHomeImpl).trigger(jbDealsHomeImpl.Events.VIEW_CONTROLLER_INSTANTIATED);
}


//Main Controller
jbDealsHome = function () {
    var self = this;

    var DEALS_OFFERS_CONTAINER = $('.offers-wrap');
    var UPSELL_OFFERS_CONTAINER = $('.upsells-wrap');

    //Configuration
    this.name = "jbDealsHome";
    this.file = '/js/jbDeals_Homepage.js';
    this.Events = {
        'HTML_TEMPLATES_INSTANTIATED': 'HTML_TEMPLATES_INSTANTIATED',
        'DATA_CONTROLLER_INSTANTIATED': 'DATA_CONTROLLER_INSTANTIATED',
        'VIEW_CONTROLLER_INSTANTIATED': 'VIEW_CONTROLLER_INSTANTIATED',
        'CHECK_DEPENDENTS_INSTANTIZATION': 'CHECK_DEPENDENTS_INSTANTIZATION',
        'DEALS_JSON_REQUESTED': 'DEALS_JSON_REQUESTED',
        'DEALS_JSON_LOADED': 'DEALS_JSON_LOADED',
        'DEALS_JSON_LOAD_FAILED': 'DEALS_JSON_LOAD_FAILED',
        'INJECT_DATA_INTO_VIEW': 'INJECT_DATA_INTO_VIEW',
        "APPLY_RESTRICTIONS_TOGGLE": "APPLY_RESTRICTIONS_TOGGLE",
        'HIDE_LOADER': 'HIDE_LOADER',
        "ADD_HIDEDISPLAY_TO_ELEMENT": "ADD_HIDEDISPLAY_TO_ELEMENT",
        "REMOVE_HIDEDISPLAY_FROM_ELEMENT": "REMOVE_HIDEDISPLAY_FROM_ELEMENT",
        "UPDATE_FARE_URL": "UPDATE_FARE_URL",
        'SHOW_UPSELLS': 'SHOW_UPSELLS',
        'RETRIEVE_GEOLOCATION': 'RETRIEVE_GEOLOCATION',
        'GEOLOCATION': 'GEOLOCATION',
        'CHANGE_ORIGIN_VIEW': 'CHANGE_ORIGIN_VIEW',
        'CHECK_BFF_AVAILABILITY': 'CHECK_BFF_AVAILABILITY',
        'VALIDATE_ERR_SCN_CHK':'VALIDATE_ERR_SCN_CHK'
    }
    var dependencies = {
        htmlTemplatesInstance: false,
        viewControllerInstance: false,
        dataControllerInstance: false
    }

    var addListeners = function () {

        $(self).bind(self.Events.VIEW_CONTROLLER_INSTANTIATED, function () {
            dependencies.viewControllerInstance = true;
            $(self).trigger(self.Events.CHECK_DEPENDENTS_INSTANTIZATION);
        })

        $(self).bind(self.Events.DATA_CONTROLLER_INSTANTIATED, function () {
            dependencies.dataControllerInstance = true;
            $(self).trigger(self.Events.CHECK_DEPENDENTS_INSTANTIZATION);
        })

        $(self).bind(self.Events.CHECK_DEPENDENTS_INSTANTIZATION, function () {
            checkDepentsInstances();
        })

        $(self).bind(self.Events.DEALS_JSON_LOADED, function (e, dataObject) {
            injectDataIntoView(dataObject);
            $(self).trigger(self.Events.APPLY_RESTRICTIONS_TOGGLE);
            $(self).trigger(self.Events.ADD_HIDEDISPLAY_TO_ELEMENT, UPSELL_OFFERS_CONTAINER);
            $(self).trigger(self.Events.REMOVE_HIDEDISPLAY_FROM_ELEMENT, DEALS_OFFERS_CONTAINER);
            $(self).trigger(self.Events.HIDE_LOADER);
        })

        $(self).bind(self.Events.DEALS_JSON_LOAD_FAILED, function (e, xhr, status, error) {
            if (typeof console == "object") {
                console.log("Deals JSON loading failed");
                console.log('Xhr:')
                console.log(xhr);
                console.log("Status:");
                console.log(status);
                console.log("Error:");
                console.log(error);
            }
            $(self).trigger(self.Events.APPLY_RESTRICTIONS_TOGGLE);
            $(self).trigger(self.Events.ADD_HIDEDISPLAY_TO_ELEMENT, DEALS_OFFERS_CONTAINER);
            $(self).trigger(self.Events.REMOVE_HIDEDISPLAY_FROM_ELEMENT, UPSELL_OFFERS_CONTAINER);
            $(self).trigger(self.Events.HIDE_LOADER);
        })

        $(self).bind(self.Events.RETRIEVE_GEOLOCATION, function () {
            retrieveGeoLocation();
        })

        $(self).bind(self.Events.GEOLOCATION, function (e, data) {
            var airportName = "o" + data;
            airportName = window[airportName].name;
            //var airportCodeText = ' (' + data + ')';
            //airportName = airportName.replace(airportCodeText, "")

            //airportName.trim();
            jbDealsHomeDataImpl.geoCode = data;
            jbDealsHomeDataImpl.deals_homepage_config.ajaxReqOrigin = data;
            jbDealsHomeDataImpl.deals_homepage_config.reqOriginName = airportName;
            var shortenedAirportName = self.airportEllipsisFormatter(airportName, 50);
            jbDealsHomeDataImpl.viewAirportName = shortenedAirportName;
            $(self).trigger(self.Events.CHANGE_ORIGIN_VIEW, shortenedAirportName);
            $(self).trigger(self.Events.CHECK_BFF_AVAILABILITY)
        })
    }

    //Events to Trigger once all dependencies are ready
    var checkDepentsInstances = function () {
        if (dependencies.viewControllerInstance && dependencies.dataControllerInstance) {
            callDealsJSONRequest(jbDealsHomeDataImpl.deals_homepage_config); //Check and load url Params 
        }
    }

    //Trigger Data to be Loaded into JS Object
    var callDealsJSONRequest = function (requestDataObj) {
        //$(self).trigger(self.Events.SHOW_LOADER);
        $(self).trigger(self.Events.RETRIEVE_GEOLOCATION, requestDataObj);
        $(self).bind(self.Events.GEOLOCATION, function () {
            $(self).trigger(self.Events.DEALS_JSON_REQUESTED, requestDataObj);
        });
    }

    //Trigger Data to be injected into View
    var injectDataIntoView = function (dataObject) {
        $(self).trigger(self.Events.INJECT_DATA_INTO_VIEW, dataObject);
    }

    var retrieveGeoLocation = function () {
        $(window).bind(window.geolocation, function (e, data) {
            $(self).trigger(self.Events.GEOLOCATION, data);
        })
    }

    self.airportEllipsisFormatter = function (airportName, maxCityLength) {
        var splitName = airportName.split(',');
        var hasAirportCode = true;

        if (!splitName[1]) {
            splitName = splitName[0].split('(');
            splitName[1] ? splitName[1] = '(' + splitName[1] : hasAirportCode = false;
        }

        splitName[0] = splitName[0].replace(/^\s+|\s+$/g, '');
        hasAirportCode ? splitName[1] = splitName[1].replace(/^\s+|\s+$/g, '') : "";

        var cityName = splitName[0];
        var stateCode = hasAirportCode ? splitName[1] : "";

        var cityLength = cityName.length;
        var NAME_START_LOC = 0
        var MAX_CITY_LENGTH = maxCityLength; // 17;
        var ELLIPSIS_LENGTH = 3;
        var nameReplacementLoc = MAX_CITY_LENGTH - ELLIPSIS_LENGTH;
        var reconstructedCityName;

        cityName = cityLength > MAX_CITY_LENGTH ? cityName.substr(NAME_START_LOC, nameReplacementLoc) + "..." : cityName

        var newAirportName = hasAirportCode ? cityName + ", " + stateCode : cityName;

        return newAirportName;
    }


    this.init = function () {
        addListeners();
    }

    this.init();
}

$(document).ready(function () {
    jbDealsHomeImpl = new jbDealsHome();
    jbDealsHomeDataImpl = new jbDealsHomeData();
    jbDealsHomeViewImpl = new jbDealsHomeViews();
    jQuery(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_REQUESTED);
})
