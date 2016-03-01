//var mqk			= "Gmjtd%7Clu6y200yn9%2Cb2%3Do5-lwrl5";
//var mqk			= "Gmjtd%7Clu6y200yn9%2Cb2%3Do5-lwrlq";
var bitlyh		= "https://api-ssl.bitly.com/v3/shorten";
var bitlyl		= "dunkindonuts";
var bitlyak		= "R_7a4efad11b918e846591b8fab439ef73";
var smsgwak		= "fo2XEtlOwdZVkb3RIaFc5992g7dkSnVYTlbhKssmSr";
var smsgwcid	= "ab713c3e-3e56-102e-b394-001e4f18c7e5";
var smsgwcidtrip= "19ca0bf8-7943-102e-b394-001e4f18c7e5";


//URL parameter
var ADDRESS_PARAM			= "a";
var ADDRESS_FROM_PARAM 		= "f";
var ADDRESS_TO_PARAM	 	= "t";
var ROUTE_TYPE_PARAM 		= "rt";
var LOCALE_PARAM 			= "l";
var REVERSE_IND_PARAM		= "r";
var WIDTH_PARAM 			= "w";
var FILTER1_PARAM	 		= "f1";
var FILTER2_PARAM 			= "f2";
var FILTER3_PARAM 			= "f3";
var FILTER4_PARAM 			= "f4";
var STORES_IN_ROUTE_PARAM 	= "sr";
var CURRENT_STORE_PARAM 	= "s";









/*
* Function to pass a query string to parse
* Pre-Condtion: The query string must exist.
* Post-Condition: The Query String is passed
*
*
* @param        qs - standard query string
*/
function Querystring(qs) {
	//Get the Query String
	this.params = new Object()
	this.get=Querystring_get

	if (qs == null)
		qs=location.search.substring(1,location.search.length)

	if (qs.length == 0) return

	// Turn <plus> back to <space>
	// See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
	qs = qs.replace(/\+/g, ' ')
	var args = qs.split('&') // parse out name/value pairs separated via &

	// Split out each name=value pair
	for (var i=0;i<args.length;i++) {
		var value;
		var pair = args[i].split('=')
		var name = unescape(pair[0])

		if (pair.length == 2)
			value = unescape(pair[1])
		else
			value = name

		this.params[name] = value
	}
}


/*
* Function to retrieve the query string
*
* @param		key - a key for retrieving a parameter
* @param        default_ - default value
* @return		value - retuns value of the query string
*/
function Querystring_get(key, default_) {
	//Changes UNDEFINED to NULL
	if (default_ == null) default_ = null;

	var value=this.params[key]
	if (value==null) value=default_;

	return value;
}


/*
* Collection of Javascript String functions for evaluating and verifying input.
*
*/
function StringFunct(){
	/*
	* Function to take a string and capitalize the first character of each word in the string.
	* Pre-Condtion: The string must exist and not be blank.
	* Post-Condition: The string is returned with each first character of every word capitalized.
	*
	* @param        str - the string to be capitalized.
	* @return		newVal - A new string with the firts letter of each word capitalized.
	*/
	this.capitalize = function(str) {
        var newVal = '';
        var val = str.split(' ');
        for(var c=0; c < val.length; c++) {
            newVal += val[c].substring(0,1).toUpperCase() +
			val[c].substring(1,val[c].length) + ' ';
        }
        return newVal.substring(0,newVal.length - 1);
	}

	/*
	* Function to take a string and remove all blank spaces from the string.
	* Pre-Condtion: The string must exist and not be blank.
	* Post-Condition: The string has all blank spaces removed.
	*
	* @param        st - the string to have blank spaces removed
	* @return		A new string with the blank spaces removed
	*/
	this.trim = function(st) {
		var len = st.length;
		var begin = 0, end = len - 1;
		while (st.charAt(begin) == " " && begin < len) {
			begin++;
		};
		while (st.charAt(end) == " " && begin < end) {
			end--;
		};
		return st.substring(begin, end+1);
	};

	/*
	* Function to evaluate whether a string is empty.
	* Pre-Condtion: The string must exist.
	* Post-Condition: A boolean value that contains the evaluation of whether the string is empty or not is returned.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.isBlank = function(str){
		
		if(str == null){
			return true;
		}
		str = this.trim(str);
		if(str == ''){
			return true;
		};
		return false;
	};

	/*
	* Function to evaluate whether an object contains any <script> tags.
	* Pre-Condtion: The object must exist.
	* Post-Condition: A boolean value that contains the evaluation of whether the object contains any <script> tags is returned.
	*				  If the object contains script tags return false, else true.
	*
	* @param        obj - the object to be evaluated
	* @return		Boolean value containing the evaluation of the object.
	*/
	this.checkScript = function(obj){
		if(obj.toUpperCase().indexOf("<SCRIPT") >= 0){
			return false
		}
		else {
			return true;
		};
	};

	/*
	* Function to evaluate whether an object is undefined.
	* Pre-Condtion: The object must exist.
	* Post-Condition: A boolean value contains the evaluation of whether the object is undefined is returned.
	*				  If the object is undefined return false, else true.
	*
	* @param        obj - the object to be evaluated
	* @return		Boolean value containing the evaluation of the object.
	*/
	this.checkObj = function(obj){
		if(obj){
			return true;
		}
		else{
			return false;
		};
	};

	/*
	* Function to evaluate whether a string is undefined.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string is undefined is returned.
	*				  If the string is undefined return false, else true.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkObjString = function(str){
		var start = 0;
		var sStr = "";
		while(str.indexOf(".",start+1)!= -1){
			start = str.indexOf(".",start+1);
			sStr = str.substring(0,start);
			if(!this.checkObj(eval(sStr))){
				return false;
			};
		};
		if(!this.checkObj(eval(str))){
			return false;
		};
		return true;
	};

	/*
	* Function to evaluate whether an email address in the form of a string is correctly formatted.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string is undefined is returned.
	*				  If the email string is incorrectly formatted return false, else true.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the email address.
	*/
	this.checkEmail = function(str) {
		if (str.indexOf("@")<3){
			return false;
		};

		if ((str.lastIndexOf(".")<5)){
			return false;
		};

		if(str.lastIndexOf(".") != 4){
			return false;
		};

		return true;
	};

	/*
	* Function to evaluate whether string contains an integer.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string contains an integer and is returned.
	*				  If the string is an integer return false, else return true.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkInteger = function(str){

		if(!this.checkNumeric(str)){
			return false;
		};

		if(str.indexOf(".") > -1){
			return false;
		};

		return true;
	};

	/*
	* Function to evaluate whether string contains an integer and the integer is > 0.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string contains an integer and is > 0 and is returned.
	*				  If the string is an integer and is > 0 return false, else return true.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkPositiveInteger = function(str){
		if(!this.checkInteger(str)){
			return false;
		};
		var val = parseInt(str);
		return (val>=0);
	};

	/*
	* Function to evaluate whether string contains a monetary number and the number is > 0.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string contains a monetary number and the number is >= 0 and is returned.
	*				  If the string contains a number and the number is >= 0 return false, else return true.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkMoney = function(str){
		if(str.lastIndexOf(".")  < str.length && (str.lastIndexOf(".") >= str.length-3)){
			if(!this.checkNumeric(str)){
				return false;
			};
			var val = parseFloat(str);
			return (val>=0)
		};
		return false;
	};

	/*
	* Function to evaluate whether string contains a number and the number is > 0.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string contains a number and the number is >= 0 and is returned.
	*				  If the string contains a number and the number is >= 0 return false, else return true.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkPositiveNumeric = function(str){
		//Pre: str != null
		//Post: If str is a Number and a greater or equal to zero
		//		 return true, else false
		if(!this.checkNumeric(str)){
			return false;
		};
		var val = parseFloat(str);
		return (val>=0)
	};


	/*
	* Function to evaluate whether string contains a number.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string contains a number and is returned.
	*				  If the string contains a number return false, else return true.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkNumeric = function(str){
		//Pre: str != null
		//Post: If str is a Number return true, else false
		var strLength = str.length;
		var isFloat = false;

		var error = false;
		var i = 0;
		for (i; i < strLength; i++){
			if ( (str.charAt(i) < '0') || (str.charAt(i) > '9') ){
				if(!isFloat && (str.charAt(i) == '.')){
					isFloat = true;
				}
				else if ( i == 0){
					if ((str.charAt(i) != '-')){
						error = true;
						break;
					};
				}
				else{
					error = true;
					break;
				};
			};
		};
		return !error;
	};

	/*
	* Function to evaluate whether string contains a phone number.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string contains a phone number and the number is properly formatted and is returned.
	*				  If the string contains a phone number and the phone number is properly formatted return true, else return false.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkPhone = function(str){
		if(this.checkPositiveNumeric(str)){
			if(str.length == 10 || str.length == 7){
				return true;
			}
			else {
				return false;
			};
		}
		else{
			if(this.isBlank(str)){
				return false;
			};
			var x = 0;
			if ((this.checkNumeric(str.charAt(0))) && ((str.charAt(1) == '-') || (str.charAt(1) == '.'))){
				x=2;
			};
			if (!((str.charAt(x+3) == '-')&&(str.charAt(x+3) == '.')) && !((str.charAt(x+7) == '-')||(str.charAt(x+7) == '.'))){
				return false;
			};
			var strLength = str.length;
			var error = false;
			if (strLength < 12){
				return false;
			};
			for (i=x; i < strLength; i++){
				if ( (str.charAt(i) < '0') || (str.charAt(i) > '9') ){
					if (!((i  == (x + 3)) || (i  == (x + 7)))){
						error = true;
						break;
					};
				};
			};
			return !error;
		};
	};

	/*
	* Function to evaluate whether string is a valid postal code.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string is a valid postal code and is returned.
	*				  If the string is a valid postal code return true, else return false.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkPostalCode = function(str){
		if(str.length == 5 || str.length == 10){
			return true;
		}
		else {
			return false;
		}
	}

	/*
	* Function to evaluate whether string is a valid Zipcode.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string is a valid ZipCode and is returned.
	*				  If the string is a valid ZipCode return true, else return false.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkZip = function(str){
		if (str.length < 5){
			return false;
		};
		if(!this.checkNumeric(str.charAt(0) + str.charAt(1) + str.charAt(2) + str.charAt(3) + str.charAt(4))){
			return false;
		};
		if(str.length == 5){
			return true;
		};
		if((str.charAt(5) != '-') || (str.length != 10)){
			return false;
		};
		if(!this.checkNumeric(str.charAt(6) + str.charAt(7) + str.charAt(8) + str.charAt(9))){
			return false;
		};
		return true;
	};

	/*
	* Function to evaluate whether string is a valid Time.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string is a valid time and is returned.
	*				  If the string is a valid time return true, else return false.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkTime = function(str){
		var i=0;
		if (!this.checkNumeric(str.charAt(0))){
			return false;
		};
		if (str.charAt(1) == ":"){
			i=1;
		}
		else if (!this.checkNumeric(str.charAt(1))){
			return false;
		}
		else if ((i!=1) && (str.charAt(2) == ":")){
			i=2;
		}
		else if(!this.checkNumeric(str.charAt(2))){
			return false;
		};
		if ((i==2) && (str.charAt(0) != "1")){
			return false;
		};
		if (!this.checkNumeric(str.charAt(i+1))){
			return false;
		};
		if (!this.checkNumeric(str.charAt(i+2))){
			return false;
		};
		if (str.charAt(i+3) != " "){
			return false;
		};
		if ((str.charAt(i+4).toUpperCase() != "A") && (str.charAt(i+4) != "P")){
			return false;
		};
		if(str.charAt(i+5).toUpperCase() != "M"){
			return false;
		};
		return true;
	};

	/*
	* Function to evaluate whether the integer passed is a leap year.
	* Pre-Condtion: The integer must not be zero.
	* Post-Condition: A boolean value contains the evaluation of whether the integer is a valid leap year and is returned.
	*				  If the integer is a valid leap year return true, else false.
	*
	* @param        intYear - the integer to be evaluated
	* @return		Boolean value containing the evaluation of the integer.
	*/
	this.isLeapYear = function(intYear){
		if ((((intYear % 4) == 0) && ((intYear % 100) != 0)) || (((intYear % 100) == 0) && ((intYear % 400) == 0))){
			return true;
		}
		else {
			return false;
	   };
	};

	/*
	* Function to correct a year with only two digits to be year 2000 compliant.
	* Pre-Condtion: The integer must not be zero.
	* Post-Condition: If the year is a two digit year the correct value is returned to be year 2000 compliant.
	*
	* @param        number - the integer to be evaluated
	* @return		The corrected year 2000 compliant year number.
	*/
	this.y2k = function(number) {
		return (number < 1000) ? number + 1900 : number;
	};

	/*
	* Function to evaluate whether string is a valid Date.
	* Pre-Condtion: The string must not be null.
	* Post-Condition: A boolean value contains the evaluation of whether the string is a valid Date and is returned.
	*				  If the string is a valid Date return true, else return false.
	*
	* @param        str - the string to be evaluated
	* @return		Boolean value containing the evaluation of the string.
	*/
	this.checkDate = function(str){
		var firstSlash = str.indexOf("/");
		var secondSlash = str.indexOf("/",str.indexOf("/")+1);
		var month = str.substring(0,firstSlash);
		var day = str.substring(firstSlash+1,secondSlash);
		var year = str.substring(secondSlash+1,str.length);
		if(!this.checkPositiveNumeric(month) || !this.checkPositiveNumeric(day) || !this.checkPositiveNumeric(year)){
			return false;
		};
		var today = new Date();
		year = ((!year) ? this.y2k(today.getYear()):year);
		month = ((!month) ? today.getMonth():month-1);
		if (!day){
			return false;
		};
		var test = new Date(year,month,day);
		if ( (this.y2k(test.getYear()) == year) &&
			 (month == test.getMonth()) &&
			 (day == test.getDate()) ){
			return true;
		}
		else {
			return false;
		};
	};

};

var StringFunctions = new StringFunct();



function formatStdTime(hours,minutes){
  
	var dn="AM";
	if (hours>12){
		dn="PM";
		hours=hours-12;
	  }
	if(hours===12){
	    dn="PM";
	    }

	if (hours===0)
		hours=12;

	if (minutes<=9)
		minutes="0"+minutes;
	
	return(hours+":"+minutes+" "+dn);
  
}


function militaryTimeToStandardTime(mt){
	var hrs=null;
	var mins=null;
	
	if (mt != null) {
		if (mt.indexOf(":") > -1) {
		
			hrs = mt.substring(0, mt.indexOf(":"));
			
			if (hrs != null && StringFunctions.checkPositiveNumeric(hrs) ) {
				//hrs = parseInt(hrs);
				// added the radix argument for parsing as a base 10 Decimal
				hrs = parseInt(hrs, 10);
				
				mins = mt.substring(mt.indexOf(":") + 1);
			
				if (mins != null && StringFunctions.checkPositiveNumeric(mins) ) {
					//mins = parseInt(mins);
					// added the radix argument for parsing as a base 10 Decimal
					mins = parseInt(mins,10);
					
					/*var d=new Date();
					d.setHours(hrs);
					d.setMinutes(mins);
					return d.format('h:MM TT');*/
					return(formatStdTime(hrs,mins));
				}else{
					return mt;
				}
				
			}else{
				return mt;
			}
			
			
		}
		else {
			hrs = parseInt(mt);
			mins = 0;
		}
	}
	else {
		return mt;
	}
}

function toFixedDecimals(data, decimals){
	var number = parseFloat(data);
	return number.toFixed(2);
}

function cleanPhoneNumber(number){
	if(!StringFunctions.isBlank(number)){
		return number.replace(/-/g,"");
	}else{
		return number;
	}
}

function validateMobilePhone(mPhone){
	if(mPhone.match(/^[0-9]{10}/)){
		return true;
	}
	return false;
}

function convertStoreHrs(hrs){
	var hrs1;
	var hrs1;
	
	//Hardcode fix in case the hrs are being return with a "24HOURS" at then end
	var ind = hrs.indexOf("24HOURS");
	if (ind > 0) {
		hrs = hrs.substring(0, ind);
	}
	
	if (hrs.indexOf("-") > -1) {
		hrs1 = militaryTimeToStandardTime(hrs.substring(0, hrs.indexOf("-")));
		hrs2 = militaryTimeToStandardTime(hrs.substring(hrs.indexOf("-")+1));
		hrs  = hrs1 + " - " + hrs2;
	}else if(hrs=='24HOURS'){
		return '24 Hours';
	}
	return hrs;
}

/*
* Utility Functions
*
*/

/*
* Function to take a standard javascript event object and return the target that triggered the event.
* Pre-Condtion: An javascript event must exist.
* Post-Condition: The target that triggered the event is returned.
*
* @param        e - standard javascript event
* @return		targ - the target that triggered the event.
*/
function getEventCurrentTarget(e){
	var targ
	if (!e) var e = window.event
	if (e.currentTarget) targ = e.currentTarget
	else if (e.srcElement) targ = e.srcElement
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode
	return targ;
}

/*
* Function to take a standard javascript event object and return the physical element that triggered the event.
* Pre-Condtion: An javascript event must exist.
* Post-Condition: The physical element that triggered the event is returned.
*
*
* @param        e - standard javascript event.
* @return		targ - Returns the physical element that triggered the event.
*/
function getEventElement(e){
	var targ
	if (!e) var e = window.event
	if (e.target) targ = e.target
	else if (e.srcElement) targ = e.srcElement
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode
	return targ;
}

/*
* Function to get the x value of the physical element clicked.
* Pre-Condtion: An javascript event must exist.
* Post-Condition: The x value of the physical element clicked is returned.
*
* @param        e - a standard javascript event
* @return		event.offsetX - the x value of the physical element clicked.

function getImageXfromLeft(e) {
  if (!browserCheck.ie) return e.layerX;
  else return event.offsetX;
}


* Function to get the y value of the physical element clicked.
* Pre-Condtion: An javascript event must exist.
* Post-Condition: The y value of the physical element clicked is returned.
*
*
* @param        e - a standard javascript event
* @return		e.layerY - The y value of the physical element clicked.

function getImageYfromTop(e) {
  if (!browserCheck.ie) return e.layerY;
  else return event.offsetY;
}


* Function to get the x value of the location clicked in the browser client.
* Pre-Condtion: An javascript event must exist.
* Post-Condition: The x value of the location clicked in the browser client is returned.
*
* @param        e - a standard javascript event
* @return 		event.clientX + scrollx - x location clicked in the browser client.

function getClientXfromLeft(e) {
	var scrollx = (document.all)?document.body.scrollLeft:window.pageXOffset;
	if (!browserCheck.ie) return e.clientX + scrollx;
	else return event.clientX + scrollx;
}


* Function to get the y value of the location clicked in the browser client.
* Pre-Condtion: An javascript event must exist.
* Post-Condition: The y value of the location clicked in the browser client is returned.
*
* @param        e - s standard javascript event
* @return 		event.clientY + scrolly - the y value of the location clicked in the browser client.

function getClientYfromTop(e) {
	 var scrolly = (document.all)?document.body.scrollTop:window.pageYOffset;
	if (!browserCheck.ie) return e.clientY + scrolly;
	else return event.clientY + scrolly;
}

/*
* Function to append an option to a select statement.
* Pre-Condition: The select statement must exist.
* Post-Condition: The option is added to the select statement passed to the function.
*
* @param        select - the name of the select statement to be appended.
* @param		option - the option to be appeneded to the select statement.
* @return		select - the select statement with the new option appended.
*/
function appendOptionToSelect(select, option){
	if(browserCheck.ie){
		var num = select.options.length;
		select.options[num] = option;
	}
	else {
		select.appendChild(option);
	}
	return select;
}


/*
* Function that creates an option for a select statement.
* Post-Condition: An option is created with the text and value pair.
* @param        value - a value of a option
* @param		text - the text of the option
* @return		opt - the completed option statement
*/
function getSelectOption(value, text){
	var opt;
	if(browserCheck.ie){
		opt = new Option(text,value);
	}
	else {
		opt = document.createElement("option");
		opt.value = value;
		opt.text = text;
	}
	return opt;
}


/*
* Function to get an XML Request object.
* Pre-Condition: The client browser must support XML transfers
* Post-Condition: The correct XML request object is returned based on the client browser
*
* @return		An XML Rquest Object

function getHTTPRequest(){
	if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
	else {
		alert("You browser doesn't support xml transfers, you cannot view this!");
	}
}

/*
* Function to retrieve an XML Document.
* Post-Condition: The XML document is returned.
*
* @return		xmlDoc - an XML document

function getXMLDocument() {
	var xmlDoc;
	// code for IE
	if (window.ActiveXObject){
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument){
		xmlDoc=document.implementation.createDocument("","",null);
	}
	else{
		alert('Your browser cannot handle this script');
	}
	return xmlDoc;
}

/*
* Function to retrieve a node from an XML document.
* Pre-Condition: The XMl node must exist.
* Post-Condition: An array of values are returned from the node specified.
*
* @param        xmlDoc - the XML document the node is retrieved from.
* @param		str - the node requested.
* @return		An Array of the node values.

function getNode(xmlDoc, str){
	//gets node from xmlDoc, node tree is split by '/'
	try{
		var arr = str.split('/');
		return getNodeViaArray(xmlDoc.responseXML.documentElement, 0, arr);
	}
	catch(exc){
		return null;
	}
}

/*
* Function that recursively finds an XML node at the end of an array.
* Pre-Condition: The XML node exists.
* Post-Condition: If found an XML node is returned.
*
* @param        node - element currently at
* @param		num - number of the element in the current array
* @param 		arr - array containing xml node names
* @return		If found an XML node, if not null is returned.

function getNodeViaArray(node, num, arr){
	//recursive function finds node at the end of the arr array
	if(num == arr.length){
		return node;
	}
	else if(arr[num] == ""){
		return getNodeViaArray(node, num+1, arr);
	}
	else if(arr[num] == node.nodeName){
		return getNodeViaArray(node, num+1, arr);
	}
	else {
		var children = node.childNodes;
		for(i=0; i < children.length;i++){

			if(children[i].nodeName == arr[num]){
				return getNodeViaArray(children[i], num+1, arr);
			}
		}
		return null;
	}
}

/*
* Function to check whether an object is in an array.
* Post-Condition: A boolean value is returned evaluating if the object is found in the array.
*
* @param        needle - an object
* @param		haystack - an array
* @return 		Boolean value holding whether the object is found in the array or not.

function isIn(needle, haystack){
	for(var i=0; i < haystack.length; i++){
		if(haystack[i].match(needle) != null)
			return true;
	}
	return false;
}

/*
* Function to some of the children from a node with the exception of those specified as exempt.
* Pre-Condition: The node is an html element
* Post-Condition: All child elements are removed from the node
*
* @param        node - node to which the children are to be removed from
* @param		exempt - children exceptions - not to be removed

function removeSomeChildren(node, exempt){
	if(!node){
		return;
	}

	var len = node.childNodes.length;

	for(var i = 0; i < len; i++){
		try{
			if(!isIn(node.childNodes[i].id, exempt)){
				node.removeChild(node.childNodes[i]);
			}
		}
		catch(ex){}
	}

}

/*
* Function to remove all children from a node.
* Pre-Condition: The node is an html element.
* Post-Condition: All children are removed from the node.
*
* @param        node - node to have all children removed from.
*/
function removeAllChildren(node){
	if(!node){
		return;
	}

	var len = node.childNodes.length;

	for(var i = 0; i < len; i++){
		try{
			node.removeChild(node.childNodes[i]);
		}
		catch(ex){}
	}

	node.innerHTML = "";

}

/*
* Function to create a web cookie.
* Pre-Condition: The String passed is in the format yyyy-mm-dd hh:mm:ss.
* Post-Condition: A javascript Date object is created and returned.
*
* @param        str - a formatted string containing a date and time
* @return		date - a standard javascript date object

function odbcCanonicalToJSDate(str){
	var year = str.substring(0,4);
	var month = str.substring(5,7);
	var day = str.substring(8,10);
	var hours = str.substring(11,13);
	var minutes = str.substring(14,15);
	var seconds = str.substring(17,19);

	var date = new Date();
	date.setDate(parseInt(day));
	date.setMonth(parseInt(month-1));
	date.setFullYear(parseInt(year));
	date.setHours(parseInt(hours));
	date.setMinutes(parseInt(minutes));
	date.setSeconds(parseInt(seconds));
	return date;

}

/*
* Function to display all member functions of an object through standard output.
* Pre-Condition: A web cookie is created with the name "name", a value of "value" and set to expire on the time specified in "days" converted to UTC.
* Post-Condition: All member functions are displayed of the object passed in.
*
* @param        obj - the object that contains member functions.
* @param		parent - second parameter.

function dumpProps(obj, parent) {
   // Go through all the properties of the passed-in object
   for (var i in obj) {
      // if a parent (2nd parameter) was passed in, then use that to
      // build the message. Message includes i (the object's property name)
      // then the object's property value on a new line
      if (parent) { var msg = parent + "." + i + "\n" + obj[i]; } else { var msg = i + "\n" + obj[i]; }
      // Display the message. If the user clicks "OK", then continue. If they
      // click "CANCEL" then quit this level of recursion
      if (!confirm(msg)) { return; }
      // If this property (i) is an object, then recursively process the object
      if (typeof obj[i] == "object") {
         if (parent) { dumpProps(obj[i], parent + "." + i); } else { dumpProps(obj[i], i); }
      }
   }
}

/*
* Function to read a CSS type Stylesheet.
* Pre-Condition: Information exists in a CSS type Stylesheet
* Post-Condition: A string is returned displaying information in a CSS Stylesheet.
*
* @param        oElm - element
* @param		strCssRule - callback function
* @return 		strValue - value of the information read from the stylesheet.

function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}


/*
* Function retrieve the value of the inner window height of the client browser.
* Post-Condition: The value of the inner window height of the client browser is returned.
*
* @return		myHeight - value of the height of the inner window of the client browser.

function getBrowserWindowHeight() {
  var myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
  }
  return myHeight;
}

/*
* Function retrieve the value of the inner window wifth of the client browser.
* Post-Condition: The value of the inner window width of the client browser is returned.
*
* @return		myWidth - value of the width of the inner window of the client browser.

function getBrowserWindowWidth() {
  var myWidth = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
  }
  return myWidth;
}

/*
* Function to format a number passed into Currency.
* Pre-Condition: The value passed into the function must be a valid number.
* Post-Condition: The number is converted and displayed as currency in dollars and cents.
*
* @param        num - a value to be converted into currency
* @return		A string that contains the formatted value of the currency.

function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10)
		cents = "0" + cents;
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		num = num.substring(0,num.length-(4*i+3))+','+
		num.substring(num.length-(4*i+3));
	return (((sign)?'':'-') + '$' + num + '.' + cents);
}

/*
* Function to change the visibility status of an html element.
* Pre-Condition; The element must be an html element.
* Post-Condition: The visibility status of the html element is switched based on the initial status of the element.
*
* @param        element - an html element
* @param		status - visibility status

function changeElementVisibility(element, status)
{
	if (document.layers)
	{
		if(status == "visible")
			status = "show";
		else
			status = "hide";
		element.visibility = status;
	}
	else if (document.all || document.getElementById)
	{
		element.style.visibility = status;
	}
}



* Function to build an html input element.
* Pre-Condition: none
* Post-Condition: An html input element is constructed based on the type, name and value.
*
* @param        type - input type
* @param		name - input name
* @param		value - input value
* @return       input - an html input element
*/
function createInputElement(type, name, value){
	if(browserCheck.ie)
		return document.createElement("<input type=\"" + type + "\" name=\"" + name + "\" value=\"" + value + "\"/>");
	else {
		input = document.createElement("input");
		input.type = type;
		input.name = name;
		input.value = value;
		return input;
	}
}



/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


function formatPhoneNumber(phone){
	
	phone = new String(phone);
	
	if(!StringFunctions.isBlank(phone)){
	
		switch(phone.length){
			case 10: return new String(phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6));
			case 7:  return new String(phone.substring(0, 3) + "-" + phone.substring(3));
			case 6:  return new String(phone.substring(0, 3) + "-" + phone.substring(3));
			break;
			default:
				return phone;
		}
		
	}else{
		return phone;
	}
}



function popup(url, name, width, height, scrollbars) {
 var left   = (screen.width  - width)/2;
 var top    = (screen.height - height)/2;
 var params = 'width='+width+', height='+height;
 params += ', top='+top+', left='+left;
 params += ', directories=no';
 params += ', location=no';
 params += ', menubar=no';
 params += ', resizable=no';
 params += ', scrollbars='+scrollbars;
 params += ', status=no';
 params += ', toolbar=no';
 
 //ccortes: remove spaces and other characters from window name because IE8 doesn't support it
 var charsToRemove = new RegExp('[- ]');
 name = name.replace(charsToRemove,'_');
 //End
 
 var newwin = (window.open(url,name,params));
 if (window.focus) {
 	newwin.focus()
 }
 return newwin;
}


function is24HrsStore(fields){
	
	if(fields.sun_hours!=null && fields.sun_hours=='24HOURS'){
		return true; 
	}
	
	if(fields.mon_hours!=null && fields.mon_hours=='24HOURS'){
		return true; 
	}
	
	if(fields.tue_Hours!=null && fields.tue_Hours=='24HOURS'){
		return true; 
	}
	
	if(fields.wed_Hours!=null && fields.wed_Hours=='24HOURS'){
		return true; 
	}
	
	if(fields.thu_hours!=null && fields.thu_hours=='24HOURS'){
		return true; 
	}
	
	if(fields.fri_hours!=null && fields.fri_hours=='24HOURS'){
		return true; 
	}
	
	if(fields.sat_hours!=null && fields.sat_hours=='24HOURS'){
		return true; 
	}
	
	return false;
}

function isGoodQuality(geocodeQualityCode){
	
	var retval = true;
	
	if(geocodeQualityCode!=null && geocodeQualityCode.length==5){
		
		var granularity = geocodeQualityCode.substring(0,2);
		var confidence =  geocodeQualityCode.substring(2);
		var confidence2 =  confidence.substring(1,2);
		
		//Filters searches entire level of confidence is wrong (XXX)
		//Filters searches found as country, state or county.  It also filters cities found with C (approx) o X (wrong)level of confidence 
		if (granularity=="A1" || granularity=="A3" || granularity=="A4" || (granularity=="A5" && (confidence2=="X" || confidence2=="C"))  ||  confidence=="XXX"){
			retval = false;
		}	
	}
	return retval;
}

function getBrowserWindowHeight() {
  var myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
  }
  return myHeight;
}

/**
 * Send to mobile overlay
 */
 
 function openPopup()
	 {
		 $(".ddsc_errorShow").hide();
		$('.sf_msgResponse').hide();
		$('.sf_dialog_theme').show();
		$('.sf_dialog').show("slow");
	 }
	 
 
function openDialog(obj, pos, width, dgClass){
	var objDialog = $('#sf_dialogBox');
	var selContent = '#' + $(obj).attr('rel');
	var posX = (pos == 'lt') ? $(obj).position().left : ($(obj).position().left + $(obj).width()) - width ;
	var posY = $(obj).position().top + $(obj).height();
	dgClass = (dgClass.length) ? dgClass + ' sf_dialog_theme' : 'sf_dialog_theme';

	objDialog.dialog('option', 'width', width);
	objDialog.dialog('option', 'position', [posX,posY]);
	objDialog.dialog('option', 'dialogClass', dgClass);
	objDialog.dialog('open');
	objDialog.html($(selContent).html());
}

	function closeDialog(){
		$(".ddsc_errorShow").hide();
		 $('.sf_dialog_theme').hide("slow");
		 $('.sf_msgResponse').hide(100);
			
	//	$('#sf_dialogBox').dialog('close');
	}

function showMsgOnDialog(msg,sc_ddStatus){
//	alert(msg);
	if(sc_ddStatus== 'ok')
	{
		$('#sf_dialogBox').html('<div class="sf_msgResponse"><p>' + msg + '</p><a alt="sf_close" href="javascript:void(0);" class="sf_button sf_btnClose" onclick="closeDialog()"><span>Close</span></a></div>');
	}
	else
	{
		$(".ddsc_errorShow").show();
		$(".ddsc_errorShow").html(msg);
	}
	
}

$(document).ready(function(){
	/*if(typeof $('#sf_dialogBox').dialog == 'function') {
		$('#sf_dialogBox').dialog({
			autoOpen:false,
			width:620,
			position:[0,0],
			modal:true,
			title:"",
			closeText: '',
			dialogClass:"sf_dialog_theme"
		});
	}
*/
	$('body').delegate('.sf_dgField label','click',function(){
		$(this).parent().children('input[type=text]').focus();
	});
	$('body').delegate('.sf_dgField input[type=text]','focus',function(){
		$(this).parent().children('label').hide();
	});
	$('body').delegate('.sf_dgField input[type=text]','blur',function(){
		if(!$(this).val().length){
			$(this).parent().children('label').show();
		}
	});
	

});

function getMetaDescript(pageState){
	var msgState = {
		'store' : "I just got info on a Dunkin' Donuts restaurant. Want to find a DD near you? Get it a DunkinDonuts.com.",
		'drivingDirection' : "I just got directions to a Dunkin' Donuts restaurant. Find a DD near you on DunkinDonuts.com.",
		'tripPlanner' : "I just planned out my trip with Dunkin' Donuts stops along the way. Do it yourself with the Trip Planner on DunkinDonuts.com."
	}
	return (msgState[pageState]);	
}

function setMetaTag(metaName, metaContent){
	var objMeta = ($('head meta[name=' + metaName + ']').length) ? $('head meta[name=' + metaName + ']') : $('<meta />').attr('name',metaName);
	objMeta.attr('content',metaContent);
	
	//Add meta tag if it doesn't exists yet
	if (!$('head meta[name=' + metaName + ']').length){
		objMeta.appendTo('head');
	}
}

 
function addFBMetaTag(metaName,metaContent){
	var newFBMeta = $('<meta />').attr('property','og:'+metaName).attr('content',metaContent).appendTo('head');
}


function buildOriginLocation(origin){
	var location="";
	
	if(origin!=null){
		if(origin.street != undefined && origin.street!=""){			
			location +=origin.street;
		}
		if(origin.adminArea5 != undefined && origin.adminArea5 !=""){
			if(location!=""){
				location+=", ";
			}
			location +=origin.adminArea5 ;
		}
		if(origin.adminArea3 != undefined &&  origin.adminArea3 !=""){	

			if(location!=""){
				location+=", ";
			}
			location +=origin.adminArea3;
		}
		if(origin.postalCode != undefined && origin.postalCode !=""){	

			if(location!=""){
				location+=" ";
			}
			location +=origin.postalCode ;
		}
	}
	return location;
}


function replaceMtoMiles(unit){	
    var myRegExp = new RegExp("m","i");  
	var newUnit = unit.replace(myRegExp, CQ.I18n.getMessage("storefinder.miles"));	
	return newUnit;
}

function initialize(){

    //Trims the imagesFullPath value in case it has the leading http://
    var httpLeadingTxt = location.protocol;
    if (imagesFullPath.indexOf(httpLeadingTxt) > -1) {
        imagesFullPath = imagesFullPath.substring(httpLeadingTxt.length);
    }
    else{
    	imagesFullPath = httpLeadingTxt + "//" + imagesFullPath;
    }
}

function doClosestSearch(){

    var maxMatches = 1;
    var pageSize = 1;
    var radius = 1000;
    var units = "m";
    $.ajax({
    	url:mqRadiusSearchURL ,
        dataType: 'jsonp',
        crossDomain: true,
        data:
        {
        	key: key,
            origin: currentDMAWidget,
            units: units,
            maxMatches: maxMatches,
            radius: radius,
            hostedData: tableName,
            ambiguities: 'ignore'
        },
        success: function(data) {
        	processDataRadiusSearch(data);
        },
        error: function(e)
        {
        	//alert(e.message);
        }
    }); 
    
}



function processDataRadiusSearch(response){

    if (currentDMAWidget != '' && response != null && response.searchResults != null && response.searchResults.length > 0) {
        
        $('#sf_CS_Widget').show();
        
        var oPanel = $('#sf_CS_Widget .sf_CS_panel');
        
        //Extracts general information of the search
        var searchLat = response.origin.latLng.lat;
        var searchLng = response.origin.latLng.lng;
        
        //Extracts information of the 1st (and only) result
        var result = response.searchResults[0];

        var address = result.fields.address + ", " + result.fields.city + ", " + result.fields.state + " " + result.fields.postal;
        var phone   = formatPhoneNumber(cleanPhoneNumber(result.fields.phonenumber));
        var fax     = formatPhoneNumber(cleanPhoneNumber(result.fields.faxnumber));
        
        // create Cookie for future use
        createCookie('DMA',result.fields.city +":" + result.fields.state + ":" + result.fields.postal+":" + result.fields.dma_cd,'7');        
        
        oPanel.html(createInnerHTMLStaticMap(result, searchLat, searchLng));
        
        var oPanelInfo = $('<div></div>').addClass('sf_CS_panel_info');
        oPanelInfo.html($('<p></p>')
            .html($('<a></a>')
                .html(address)
                .attr({'href':'#','alt':'panel'})
                .bind('click',function(e){
                    e.preventDefault();
                    openStoreFinder(ADDRESS_TO_PARAM);
                })
            ).addClass('storeaddress')
        );
        if(phone.length > 0){
            oPanelInfo.append($('<p></p>')
                .html('Phone: ' + phone)
            );
        }
        if(fax.length > 0){
            oPanelInfo.append($('<p></p>')
                .html('Fax: ' + fax)
            );
        } 
        oPanelInfo.append($('<p></p>')
            .addClass('storehours')
            .html(getStoreHrs(result))
        );
        oPanelInfo.appendTo(oPanel);
        
        var oPanelActions = $('<div></div>').addClass('sf_CS_panel_actions');
        oPanelActions.html($('<a></a>')
            .attr({'href':sfPath,'alt':'findMore'})
            .addClass('primary')
            .html(CQ.I18n.getMessage("closeststore.findmore"))
            .bind('click',function(e){
                e.preventDefault();
                openStoreFinder(ADDRESS_PARAM); 
            })
        );
        oPanelActions.append($('<a></a>')
            .attr({'href':'#','alt':'close'})
            .attr('id','closeMap')
            .html(CQ.I18n.getMessage("closeststore.close"))
            .bind('click',function(e){
                e.preventDefault();
                $(".sf_CS_Button").click();
            })
        );
        oPanelActions.appendTo(oPanel);
    }
}

function getStoreHrs(result){

    var fields = result.fields;
    var retval = "";
    var hrs = new Array;
    var days = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
    var prevHrs = null;
    var prevDay = null;
    
    hrs.push(fields.mon_hours);
    hrs.push(fields.tue_hours);
    hrs.push(fields.wed_hours);
    hrs.push(fields.thu_hours);
    hrs.push(fields.fri_hours);
    hrs.push(fields.sat_hours);
    hrs.push(fields.sun_hours);
    
    for (var i = 0; i < hrs.length; i++) {
    
        if (prevHrs != null) {
            if (!StringFunctions.isBlank(prevHrs)) {
                if (hrs[i] != prevHrs) {
                    retval += "<br>" + days[prevDay] + " - " + days[i - 1] + ": " + convertStoreHrs(prevHrs);
                    prevHrs = hrs[i];
                    prevDay = i;
                }
                else 
                    if (i == hrs.length - 1) {
                        retval += "<br>" + days[prevDay] + " - " + days[i] + ": " + convertStoreHrs(prevHrs);
                        break;
                    }
            }
        }
        else {
            prevHrs = hrs[i];
            prevDay = i;
        }
    }
    
    return retval;
}

function createInnerHTMLStaticMap(result, searchLat, searchLng){
    
    var staticMapSrc =  mqMapSearchURL + "?key=" + mqk + "&size=223,166&xis=" + imagesFullPath + "storefinder_ddIcon.gif,1,TR," + result.shapePoints[0] + "," + result.shapePoints[1] + ",0,0,-30,-30," + imagesFullPath + "storefinder_starIcon.gif,1,TR," + searchLat + "," + searchLng + ",0,0,0,0";
    var innerHTML = "<img alt='staticMap' src='" + staticMapSrc + "'>";
    return innerHTML;
}


function openStoreFinder(param){
    
    var newLocation = sfPath;
    
    var address = o('addressCS');
    if(param!=null && !StringFunctions.isBlank(currentDMAWidget)) {
        newLocation+="?"+param+"="+currentDMAWidget;
    }
    
    window.location=newLocation;
    
}

function hideCSWidget(hide){
	newWidth = (hide) ? 26 : 111;
	
	$('#sf_CS_Widget').animate({width:newWidth}, 450 , function(){
		if ( hide ) {
			$('#sf_CS_Widget .sf_CS_Button').addClass('sf_CS_hidden');
		}
		else{
			$( '.sf_CS_hidden' ).removeClass('sf_CS_hidden');
		}
	});
}

$(document).ready(function(){
    var hasClick = true;
    $('#sf_CS_Widget').show();

    $(".sf_CS_Button").click(function(e){
        
        e.preventDefault();
        if (hasClick) {
        	  if (typeof(lResponse) != "undefined" ){
        		processDataRadiusSearch(lResponse); // In case we already have data to process
        	} else{        	
        		doClosestSearch(); // Make a new Mapquest call
        	}        	
        }
        hasClick = false;
		if(!$(this).hasClass('sf_CS_hidden')){

	        var offset = $(".sf_CS_panelWrap").width();
	        var headerW = $(".sf_CS_Button").width();
	        var animateValues = {};
	        
	        if($(this).hasClass('sf_CS_open'))
	        {
	            animateValues = {height: '111', width: headerW+1, top: '313'};
	            $(this).removeClass('sf_CS_open');
	        }
	        else
	        {
	            animateValues = {height: '400', width: offset+headerW+2, top: '24'};
	            $(this).addClass('sf_CS_open');
	        }
	        
	        $('#sf_CS_Widget').animate(animateValues,450);

		}

    });

});

