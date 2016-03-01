BookerWrapper.service('BookerConfig', function () {
    this.CONSTANTS = {
        RECENT_SEARCHES_FLIGHT_MAX_COUNT: 3,
        RECENT_SEARCHES_GETAWAY_MAX_COUNT: 3,
        GUESTLIMIT: 7,
        MIN_MINOR_AGE: 2,
        MAX_MINOR_AGE: 19
    };
    this.scopeDefaults = {
        "all": {
            "searchType": "flights",
            "currency": "usd",
            "itinerarySelect": "RT",
            "citySelector": {
                "filter": []
            }
        },
        "homepage": {
		"citySelector": {
			"filter": [
				{ "iata": ['XDR'] }
			]

		}
    },
    "mini": {
        "config": {			
	    "flights" :{
			"terms": {
			        "text": "Optional Services and Fees Info",
    			}
    		},
            "additionalInfo": {
                "legend": "Additional information",
                "links": [
                			{
							"url": "//www.jetblue.com/travel/special-assistance/",
						    "text": "Special assistance",
						    "class": "foreground-sprite-specialAssistance",
							"classSpan":"salinkImg",
							"imgsrc":"//www2.jetblue.com/includes/modules/booker_refresh/src/assets/special-needs-icon.gif"

                			},
			{
			    "url": "//www.jetblue.com/travel/baggage/",
   "text": "New baggage policy",
   "class": "foreground-sprite-newbaggage",
"classSpan":"nblinkImg",
"imgsrc":"//www2.jetblue.com/includes/modules/booker_refresh/src/assets/baggage-icon.png"

			},
			{
			    "url": "javascript:void(0);",
			    "text": "8+ travellers, special needs, pets, baggage policy, kids, lap infants, extra seats, FAQs",
  			    "class": "foreground-sprite-faq",
			    "classSpan":"faqlinkImg",
			    "modalContent": "/ajax-data/booker/v1/modal.faq.shtml",
			    "modalHeaderText": "FAQs",
			    "imgsrc":"//www2.jetblue.com/includes/modules/booker_refresh/src/assets/pets-baggage-icon.gif"
			}

		]
            }
        },
		"citySelector": {
			"filter": [
				{ "iata": ['XDR'] }
			]

		}
},
"multicity": {
    "itinerarySelect": "MC",
    "mcCurrency": "usd",
    "citySelector": {
	"filter": [
		{ "iata": ['XDR'] }
		]
	}
},
"bff": {
    "config": {
        "flights": {
            "currencies": [
						{
						    "name": "Lowest",
						    "valueEnum": "usd"
						}, {
						    "name": "Refundable",
						    "valueEnum": "refundable"
						}, {
						    "name": "TrueBlue Points",
						    "valueEnum": "tb"
						}
			        ]
        }
    },
    "citySelector": {
        "filter": [
					{ "blueCity": true },
					{ "iata": ['ACK', 'MVY', 'STT', 'STX', 'XBO', 'XDR', 'XFL', 'XSF', 'ZLA'] }
				]

    }
},
"vacations": {
    "searchType": "getaways",
    "cityselector": {
        "filter": [{ "iata": ['ACK', 'MVY', 'STT', 'STX', 'XBO', 'XDR', 'XFL', 'XSF', 'ZLA']}]
    }
}
};
this.searchTypes = {
    "legend": "Select what you're searching for",
    "types": [
			{
			    "name": "flights",
			    "label": "Flights",
			    "value": "flights",
			    "legacyCookie": "fflight-form-data"

			},
			{
			    "name": "vacations",
			    "label": "Flights + Hotel = SAVINGS",
			    "value": "getaways",
			    "legacyCookie": "fvacation-form-data"

			}
		],
    "defaultType": "flights"
};
this.multicityOptions = [
		{
		    "name": "first",
		    "required": true
		},
		{
		    "name": "second",
		    "required": true
		},
		{
		    "name": "third",
		    "required": false
		},
		{
		    "name": "fourth",
		    "required": false
		}
	];
this.legends = {
    "currency": "Select payment currency",
    "passengerSelect": "Select passengers traveling",
    "passengerSelectGetaways": "Select passengers traveling and number of hotel rooms",
    "multicityItin": "Select travel cities and dates",
    "originDestinationSelect": "Select origin and destination",
    "recentSearches": "Recent searches",
    "dateSelect": "Select travel dates",
    "promoCode": "If you have a promo code, enter it below",
    "optionalText": "Optional",
    "clearEntry": "Clear Entry"
};
this.additionalInfo = {
    "legend": "Additional information",
    "links": [
			{
			    "url": "//www.jetblue.com/travel/special-needs/",
			    "text": "Special assistance",
			    "class": "foreground-sprite-specialAssistance",
			    "classSpan":"salinkImg",
			    "imgsrc":"//www2.jetblue.com/includes/modules/booker_refresh/src/assets/special-needs-icon.gif"


			},
			{
			    "url": "//www.jetblue.com/travel/baggage/",
			    "text": "New baggage policy",
			    "class": "foreground-sprite-newbaggage",
			    "classSpan":"nblinkImg",
			    "imgsrc":"//www2.jetblue.com/includes/modules/booker_refresh/src/assets/baggage-icon.png"
			},
			{
			    "url": "javascript:void(0);",
			    "text": "8+ travellers, pets, kids, lap infants, FAQs",
			    "class": "foreground-sprite-faq",
			    "classSpan":"faqlinkImg",
   			    "modalContent": "/ajax-data/booker/v1/modal.faq.shtml",
   			    "modalHeaderText": "FAQs",
			    "imgsrc":"//www2.jetblue.com/includes/modules/booker_refresh/src/assets/pets-baggage-icon.gif"
			}

		]
};
this.multicityLink = {
    "url": "https://book.jetblue.com/B6/webqtrip.html?journeySpan=MC",
    "text": "Multicity",
    "alt": "Booking a multicity itinerary? Click here."
};
this.flights = {
    "form": {
        //"action": "https://book.jetblue.com/jetBlue/",
        "action": "https://book.jetblue.com/B6/webqtrip.html",
        "method": "POST",
        "redemptionAction": "https://book.jetblue.com/B6/webqtrip.html",
        "redemptionMethod": "POST"
    },
    "terms": {
        "url": "//www.jetblue.com/legal/fees/",
        "text": "Optional Services and Fees Information",
        "class": "optionalServices",
        "alt": "Click here for additional information on the terms of these offers"
    },
    "currencies": [
			{
			    "name": "Dollars",
			    "valueEnum": "usd"
			},
			{
			    "name": "TrueBlue Points",
			    "valueEnum": "tb"
			}
		],
    "ageGroups": [
			{
			    "name": "Adults",
			    "bookingGroup": "ADT",
			    "options": [
					{ "name": "0 Adults", "value": 0 },
					{ "name": "1 Adult", "value": 1 },
					{ "name": "2 Adults", "value": 2 },
					{ "name": "3 Adults", "value": 3 },
					{ "name": "4 Adults", "value": 4 },
					{ "name": "5 Adults", "value": 5 },
					{ "name": "6 Adults", "value": 6 },
					{ "name": "7 Adults", "value": 7 }
					],
			    "labels": {
			        "singular": "Adult",
			        "plural": "Adults"
			    },
			    "description": "Passengers who are 17 years and older make reservations as adults",
			    "maximumAge": false,
			    "ageEnumerationRequired": false,
			    "id": "flightsAdults",
			    "index": 0,
			    "defaultAmount": 1,
			    "ticketable": true
			},
			{
			    "name": "Minors",
			    "bookingGroup": "CHD",
			    "options": [
					{ "name": "0 Kids (Under 14)", "value": 0 },
					{ "name": "1 Kid", "value": 1 },
					{ "name": "2 Kids", "value": 2 },
					{ "name": "3 Kids", "value": 3 },
					{ "name": "4 Kids", "value": 4 },
					{ "name": "5 Kids", "value": 5 },
					{ "name": "6 Kids", "value": 6 },
					{ "name": "7 Kids", "value": 7 }
				],
			    "description": "Kids are passengers under 17 years of age who occupy a seat while travelling.  Kids under 12 are required to have an accompanyment service; this is also available optionally up to 16 years of age.",
			    "maximumAge": 14,
			    "ageEnumerationRequired": false,
			    "id": "flightsMinors",
			    "index": 1,
			    "labels": {
			        "singular": "Minor",
			        "plural": "Minors"
			    },
			    "defaultAmount": 0,
			    "ticketable": true
			},
			{
			    "name": "Lap Infants",
			    "bookingGroup": "INF",
			    "options": [
					{ "name": "0 Lap Infants (Under 2)", "value": 0 },
					{ "name": "1 Lap Infant", "value": 1 },
					{ "name": "2 Lap Infants", "value": 2 },
					{ "name": "3 Lap Infants", "value": 3 }
				],
			    "labels": {
			        "singular": "Lap Infant",
			        "plural": "Lap Infants"
			    },
			    "description": "Lap infants are two years of age or under",
			    "maximumAge": 2,
			    "ageEnumerationRequired": false,
			    "id": "flightsInfants",
			    "index": 2,
			    "defaultAmount": 0,
			    "ticketable": false
			}
		],

    "itineraries": {
        "legend": "Select a roundtrip or one-way itinerary",
        "types": [
				{
				    "label": "Roundtrip",
				    "value": "RT"
				},
				{
				    "label": "One-way",
				    "value": "OW"
				},
				{
				    "label": "Multicity",
				    "value": "MC"
				    //,	"suppress": "$parent.type!='multicity'" //suppresses this option if the booker type is not multicity
				}
			]
    }
};
this.getaways = {
    "form": {
        "action": "https://vacations.jetblue.com/profiles/jetblue_loyalty_process.cfm",
        "method": "GET",
        "redemptionAction": "https://redeem.getaways.jetblue.com/profiles/jetblue_loyalty_process.cfm",
        "redemptionMethod": "GET"
    },
    "terms": {
        "url": "//www.jetblue.com/vacations/getaways-terms/",
        "text": "Terms & Conditions",
        "alt": "Click here for additional information on the terms of these offers",
        "class": "getawaysTerms"
    },
    "currencies": [
			{
			    "name": "Cash",
			    "valueEnum": "usd"
			},
			{
			    "name": "Cash+Points",
			    "valueEnum": "tb"
			}
		],
    "ageGroups": [
			{
			    "name": "Adults",
			    "bookingGroup": "ADT",
			    "options": [
					{ "name": "1 Adult", "value": 1 },
					{ "name": "2 Adults", "value": 2 },
					{ "name": "3 Adults", "value": 3 },
					{ "name": "4 Adults", "value": 4 },
					{ "name": "5 Adults", "value": 5 },
					{ "name": "6 Adults", "value": 6 },
					{ "name": "7 Adults", "value": 7 }
					],
			    "labels": {
			        "singular": "Adult",
			        "plural": "Adults"
			    },
			    "description": "Passengers who are 17 years and older make reservations as adults",
			    "maximumAge": false,
			    "ageEnumerationRequired": false,
			    "id": "getawaysAdults",
			    "index": 0,
			    "defaultAmount": 2,
			    "ticketable": true
			},
			{
			    "name": "Minors",
			    "bookingGroup": "CHD",
			    "options": [
					{ "name": "0 Kids (Under 19)", "value": 0 },
					{ "name": "1 Kid", "value": 1 },
					{ "name": "2 Kids", "value": 2 },
					{ "name": "3 Kids", "value": 3 }
				],
			    "description": "Kids are passengers under 17 years of age who occupy a seat while traveling.  Kids under 12 are required to have an accompanyment service; this is also available optionally up to 16 years of age.",
			    "maximumAge": 19,
			    "ageEnumerationRequired": true,
			    "id": "getawaysMinors",
			    "index": 1,
			    "labels": {
			        "singular": "Kid",
			        "plural": "Kids"
			    },
			    "defaultAmount": 0,
			    "ticketable": true
			},
			{
			    "name": "Lap Infants",
			    "bookingGroup": "INF",
			    "options": [
					{ "name": "0 Lap Infants (Under 2)", "value": 0 },
					{ "name": "1 Lap Infant", "value": 1 },
					{ "name": "2 Lap Infants", "value": 2 },
					{ "name": "3 Lap Infants", "value": 3 }
				],
			    "labels": {
			        "singular": "Lap Infant",
			        "plural": "Lap Infants"
			    },
			    "description": "Lap infants are two years of age or under",
			    "maximumAge": 2,
			    "ageEnumerationRequired": false,
			    "id": "getawaysInfants",
			    "index": 2,
			    "defaultAmount": 0,
			    "ticketable": false
			}
		],
    "additionalProducts": [
			{
			    "legend": "Hotel Rooms",
			    "name": "Hotel Rooms",
			    "labels": {
			        "singular": "Hotel room",
			        "plural": "Hotel rooms"
			    },
			    "validAmounts": [1, 2, 3, 4]
			}
		]
};
this.vacationsServices = {
    "text": "Services & fees info",
    "alt": "Click here for more information on services and fees",
    "url": "/legal/fees/",
    "class": "services"
}
this.flexibleSearch = {
    enabled: false,
    baseURL: "//www.jetblue.com/bestfarefinder/",
    legend: "Are your search dates flexible?",
    optInText: "My search dates are flexible",
    optInDefaultValue: false
};
this.errorMessages = {
    UNACCOMPANIED_MINOR_TITLE: "Unaccompanied Minors",
    UNACCOMPANIED_MINOR_CONFIRM: "Children between the ages of 5 and under 14 years who will be traveling alone are considered unaccompanied minors. Unaccompanied minors may only travel on non-stop flights. They cannot travel on connecting flights or direct flights (flights that make a stop, but do not change aircraft), or multi-city itineraries. Flights booked are subject to a $100 fee each way per unaccompanied minor. Once booked, please fill out the form from the link on your confirmation page, print 3 copies and bring them with you to the airport.",
    SEASONAL_ITINERARY: "The route you selected only operates seasonally.\nIf you are flexible with your dates and want to see a full calendar view of our fares, check out the <a href='//www.jetblue.com/bestfarefinder'>Best Fare Finder</a> or click continue.",
    DAYS_OF_WEEK_ITINERARY: "The route you selected does not operate every day of the week.\nIf you are flexible and want to see a full calendar view of our fares, check out the <a href='//www.jetblue.com/bestfarefinder'>Best Fare Finder</a> or click continue.",
    DEPART_CITY_ERROR: "Please enter valid departure city.",
    ARRIVAL_CITY_ERROR: "Please enter valid arrival city.",
    DEPART_DATE_ERROR: "Please enter valid departure date.",
    RETURN_DATE_ERROR: "Please enter valid return date.",
    NO_PASSENGER_ERROR: "Please select a passenger.",
    TOO_MANY_LAP_INFANTS: "Please select more adults or less infants.",
    TOO_MANY_PASSENGERS: "Please select fewer passengers. The limit is 7.",
    INVALID_CHILD_AGE: "Please enter an age for child.",
    MINOR_AGE_RESTRICTION: "(age must be between 2 to 18)",
    GENERIC_DATE_ERROR: "Please enter a date.",
    GENERIC_CITY_ERROR: "Please enter a valid city.",
    INTERLINE_POINTS: "TrueBlue points cannot be used to search for flights operated by our partner airlines. Please select dollars as your fare type to continue."
};

this.warningMessages = {
	TODAYS_DATE: "Because you've selected today's date, only flights that leave at least 1 hours and 30 minutes from the current time will be shown on the next page.",
	SHORT_TRIP: "Your return date is the same as your departure date. Is such a short trip intentional?",
	LONG_TRIP: "You have selected a return date more than 4 weeks after your departure date. Is this intentional?",
	OW_INTERNATIONAL: "You have selected to fly one-way internationally. Because you're traveling to another country, proof of return travel may be required at the airport.",
};
this.countryExceptions = {
		'STX' : 'US',
		'STT' : 'US',
		'BQN' : 'US',
		'CPX' : 'US',
		'MAZ' : 'US',
		'PSE' : 'US',
		'SJU' : 'US',
		'VQS' : 'US'
};
this.submit = {
    "text": "Find it",
    "textPlural": "Find Flights"
};
});
