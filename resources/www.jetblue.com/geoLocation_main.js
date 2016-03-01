// Geo Location : Base Airport Cookie

//Data Loader
window.geolocation = "GEOLOCATION";

window.Events = {
    "GEOLOCATION":"GEOLOCATION"
}

var jbGeoLocationImpl       = jbGeoLocationImpl     || null
    , jbGeoLocationDataImpl = jbGeoLocationDataImpl || null; 

(function($){

    jbGeoLocationData = function () {
        //alert('in data loader');
        var self = this;
        self.name = 'jbGeoLocationData';
        self.file = 'js/geoLocation_main.js';
       
        var preferredAirport = $.cookie('base_airport');
        var ffCookie = $.cookie("recentSearchesFlight");
        var jbTrueBlueCookie = $.cookie("jbTrueBlueCookie");

        //Check for base_airport cookie
        if (preferredAirport === null) {

            //check for previous search cookie
            if (ffCookie != null)
            {
                var ffcookieValue = decodeURIComponent(ffCookie);
                var ffcookieParams = JSON.parse(ffcookieValue);
                preferredAirport = ffcookieParams[0].fromCode;
                $.cookie('base_airport',preferredAirport);           
            }
            //check for TruBlueCookie
            else if (jbTrueBlueCookie != null)
            {           
                var jbTrueBlueCookieParams = jbTrueBlueCookie.split("&");
                for(var i = 0; i <jbTrueBlueCookieParams.length; i++){
                    var temp = jbTrueBlueCookieParams[i].split('=');
                    if(temp[0] == 'PreferredAirports'){
                        preferredAirport = temp[1];
                        $.cookie('base_airport', preferredAirport);
                    }
                }
            }
        }

        
        //Dispatch Listeners
        $(jbGeoLocationImpl).bind(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_REQUESTED, function (e, requestDataObj) {
             retrieveGeoLocation(requestDataObj);
        });

        //Retrieve Geo Location : Make a Call to Geo Location API : Ajax Call and Response
        var retrieveGeoLocation = function (requestDataObj) { 
          
            //Call GeoLocation API when base_airport cookie is null
            if ($.cookie('base_airport') === null || $.cookie('base_airport') == "") {        
                //$(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_REQUESTED);
                //var newAkamaiLat = (akamaiLat == "") || (akamaiLat == null) ?  "40.6397" : akamaiLat;
                //var newAkamaiLong = (akamaiLong == "") || (akamaiLong == null) ?  "-73.7789" : akamaiLong;
                $.ajax({
                    // ajax call to get geolocation data
                    type: "GET",
                    url: "/apis/ODAPI/NearbyAirport/?Longitude="+akamaiLong+"&Latitude="+akamaiLat,/* /apis/geolocationAPI/BaseAirport */ /* Future state: http://www-dev.jetblue.com/apis/ODAPI/NearbyAirport/?Longitude=-74.005973&Latitude=40.714352999999996  */
                    cache: false,
                    async:true,
                    contentType: "application/json; charset=utf-8",
                    headers : {
                        'X-Akamai-Edgescape' : 'lat=40.6397,long=-73.7789'
                    },
                    success: function (fsResponseData) {
                        self.geoLocationDataObj = fsResponseData.AirportCode || fsResponseData.Code;
                        $(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_LOADED,{'Code': self.geoLocationDataObj });          
                    },
                    error: function (xhr, status, error) {
                        if (typeof console == "object") {
                            console.log("Deals JSON loading failed");
                            console.log('Xhr:')
                            console.log(xhr);
                            console.log("Status:");
                            console.log(status);
                            console.log("Error:");
                            console.log(error);
                        }
                        $(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_LOADED,{'Code': "JFK" });      
                    }    
                })/*.always(function (fsResponseData) {
                    self.geoLocationDataObj = fsResponseData.AirportCode || fsResponseData.Code;
                    //$.cookie('base_airport', fsResponseData.AirportCode);
                    //$(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_LOADED,{'Code': $.cookie('base_airport') });
                    
                    $(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_LOADED,{'Code': self.geoLocationDataObj });                    
                });*/
            }
            else {           
                $(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_LOADED, {'Code': $.cookie('base_airport') });
               // $(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.RETURN_GEOLOCATION,$.cookie('base_airport'));
            }
 

        }
        
        //Call GeoLocation API when base_airport cookie is null
        /*
        if ($.cookie('base_airport') === null || $.cookie('base_airport') == "") {        
                $(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.GEO_LOCATION_JSON_REQUESTED);
        }
        else{
            alert("ELSE");
            $(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.RETURN_GEOLOCATION,$.cookie('base_airport'));
        }
        */
        //Let the Main Controller know an instance of this has been created and ready to listen for dispatches.
        $(jbGeoLocationImpl).trigger(jbGeoLocationImpl.Events.DATA_CONTROLLER_INSTANTIATED);   

        
    }

    //View changes and responses
    jbGeoLocationViews = function () {
        //alert('in View Controller');
        var self = this;
        self.name = 'jbGeoLocationViews';
        self.file = 'js/geoLocation_main.js';
    }

    //Main Controller
    jbGeoLocation = function () {
        var self = this;

        //Configuration
        this.name = "jbGeoLocation";
        this.file = 'js/geoLocation_main.js';
        this.Events = {
            'DATA_CONTROLLER_INSTANTIATED': 'DATA_CONTROLLER_INSTANTIATED',    
            'GEO_LOCATION_JSON_REQUESTED': 'GEO_LOCATION_JSON_REQUESTED',
            'GEO_LOCATION_JSON_LOADED': 'GEO_LOCATION_JSON_LOADED',
            "RETURN_GEOLOCATION":"RETURN_GEOLOCATION"
        }
        var dependencies = {
            //viewControllerInstance: false,
            dataControllerInstance: false
        }


        var addListeners = function () {
        

            $(self).bind(self.Events.DATA_CONTROLLER_INSTANTIATED, function () {
                dependencies.dataControllerInstance = true;
            })

             $(self).bind(self.Events.GEO_LOCATION_JSON_LOADED, function (e, dataObject) {     
                $(self).trigger(self.Events.RETURN_GEOLOCATION, dataObject.Code);
            })
            
            $(self).bind(self.Events.RETURN_GEOLOCATION,function(e,geodata){
                $(window).trigger(window.Events.GEOLOCATION,geodata)
            })
        }

        this.init = function () {
            addListeners();
        }

        this.init();
    }

    //$(document).ready(function () {

        //Any Custom configurations in any applications must be loaded prior to current file or default will be loaded.
        //Create a var jbDestFilterCustomConfig to house the custom config. See jbDestFilterConfigController() for more details on config
        //alert('in geolocationmain');
        jbGeoLocationImpl = new jbGeoLocation();
        jbGeoLocationDataImpl = new jbGeoLocationData();   
    //})

})(jQuery);