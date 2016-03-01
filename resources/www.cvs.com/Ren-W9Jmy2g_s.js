/* Script imported from http://www.cvs.com/webcontent/js/common.js */
/* ---------------------------------------------------
   Custom functions:

   Functions created for custom functionality.

   1. insertHeaderFlash
   2. menuroll
   3. linkto
   4. grayout
   --------------------------------------------------- */

/* Added for 508 inorder to show a hidden div when some one hides images. This way screen readers can read what row in the datatable they are on
	 * without the help of the image alt text
	 */
	function showProdDesc(action,id,size) {
		//alert(size);


		if (action == 'hide') {
			for(count=1;count<=size;count++)
			{
				if (document.getElementById(id+count)) {
					document.getElementById(id+count).style.display='none';
				}
			}

		} else if (action == 'show') {
			for(count=0;count<=size;count++)
			{
				if (document.getElementById(id+count)) {
					document.getElementById(id+count).style.display='block';
				}

			}
		}

	}




/* Used to bypass the "Click to active" functionality in Internet Explorer.
   Writes the HTML code into the document wherever the function is called.

   Called by: home.jsp
              home_cookied.jsp
              home_loggedin.jsp
*/


function insertHeaderFlash() {
    var swf = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="480" height="299">'
    + '<param name="movie" value="../../swf/heroShell.swf" />'
    + '<param name="quality" value="high" />'
    + '<param name="flashvars" value="IDnumber=3" />'
    + '<param name="base" value="../../swf/" />'
    + '<param name="wmode" value="transparent">'
    + '<embed src="../../swf/heroShell.swf" width="480" height="299" quality="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" flashvars="IDnumber=3" base="../../swf/" wmode="transparent"></embed>'
    + '</object>';

    document.write(swf);
}
/* Right menu functionality:
   1. Checks and changes the current class assigned to the menu item table
      row.
   2. Extracts the link location from the second column of the menu item and
      sets it as the window status text.

   Called by: home.jsp
              home_cookied.jsp
              home_loggedin.jsp
*/
var temp=0;
var temp2=0;
var b=0;

function menuroll(id) {
    if(id.className == "rightmenuon") {
        id.className = "rightmenuoff";
        window.status = "";
    }
    else {
        id.className = "rightmenuon";
        if (navigator.appName.indexOf("Microsoft")==-1)
            window.status = id.childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[3].childNodes[0].href;
        else
            window.status = id.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].href;
    }
}
/* Right menu functionality:
   Extracts link location from the second column of the menu item and sets
   it as the current window location.

   Called by: home.jsp
              home_cookied.jsp
              home_loggedin.jsp
*/
function linkto(id) {
        if (navigator.appName.indexOf("Microsoft") == -1) {
                window.location.href = id.childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[3].childNodes[1].href;
        } else {
                document.location.href = id.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].href;
        }
}
/* Grayout functionality:
   Used to show an opaque layer on top of everything else within a page.
   The following HTML code *MUST* be added to the top of each page where
   it will be used:

   <!-- Start grayout div -->
    <div id="grayout"></div>
   <!-- End grayout div -->
   <!-- Start grayout container div -->
    <div id="UNIQUE_ID" align="center" class="grayout_dialog">
        <!-- INCLUDE BEGINS --><%@include file="../path/to/include.jsp"%><!-- INCLUDE ENDS -->
    </div>
   <!-- End grayout container div -->

   Make sure to change UNIQUE_ID to a unique ID which will be used by the
   grayout function.

   CSS required: cvs_style_common.css

   Called by: Global
*/
var grayout_active=false;

function grayout(id) {
    var i;

    var divs = document.getElementsByTagName("div");

    for(i = 0; i < divs.length; i++)
        if(divs[i].className == "grayout_dialog")
            divs[i].style.display = "none";

    var grayout = document.getElementById("grayout");
    var container = document.getElementById(id);
    var html = document.getElementsByTagName("html");

    //MSIE 6.0 fix
    if(navigator.appVersion.indexOf("MSIE 6.0")!=-1) {
        grayout.style.height = "100%"
        grayout.style.width = "100%"
        grayout.style.position = "absolute";
        document.body.style.height = "100%";
        document.body.style.overflow = "auto";
        html[0].style.height = "100%";
        html[0].style.overflow = "auto";
        document.body.onresize = function (){
            grayout.style.height = document.documentElement.clientHeight;
            grayout.style.width = document.documentElement.clientWidth;
        }
    }
    else {
        grayout.style.width = "100%";
        if(navigator.appVersion.indexOf("KHTML")!=-1)
            grayout.style.height = "" + document.documentElement.clientHeight + "px";
        else
                grayout.style.height = "100%";
        grayout.style.position = "absolute";
    }

    if(grayout.style.display != "block") {
        grayout.style.display = "block";
        container.style.display = "block";
        grayout_active = true;
        toggleSelect();
    }
    else {
        grayout.style.display = "none";
        grayout_active = false;
        toggleSelect();
    }
}

/* Toggles visibility of select; hides all except for the ones with grayout_select
   class.
*/

function toggleSelect() {
    if(navigator.appVersion.indexOf("MSIE 6.0")!=-1) {
        var selects = document.getElementsByTagName("select");
        for(i = 0; i < selects.length; i++)
            if(selects[i].className.indexOf("grayout_select")==-1)
                if(selects[i].style.visibility != "hidden")
                    selects[i].style.visibility = "hidden";
                else
                    selects[i].style.visibility = "visible";
    }
}

function checkGrayout() {
    var grayoutPos = getScrollXY();

    var grayout = document.getElementById("grayout");
    grayout.style.top = grayoutPos[1] + "px";
}

/* Gets scroll position
*/

function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

/* Shopping Cart Widget functionality
*/
var widgettimer;

function toggleWidgetVisibility(state) {
    var swidget = document.getElementById("swidget");

    if(navigator.appVersion.indexOf("KHTML") != -1) {
        swidget.style.top = "174px";
        swidget.style.marginLeft = "-17px";
    }
    /*if(navigator.appName.indexOf("Microsoft") == -1)

    else*/

    if(state)
        swidget.style.display = "block";
    else
        swidget.style.display = "none";
}
function toggleWidgetTimer(state) {
    if(state)
        widgettimer = setTimeout("toggleWidgetVisibility()", 1500);
    else
        clearTimeout(widgettimer);
}
/* Clean fields functionality:
    Clean field when user click over the text field of "Zip or City & State"

    Called by: longleft_smallright.jsp

*/
function goToBlank(idField)
{
    if(document.getElementById(idField).value == "Zip or City & State")
        document.getElementById(idField).value = "";
    if(document.getElementById(idField).value == " ZIP Code")
        document.getElementById(idField).value = "";
}

function toggleLayer(whichLayer)
            {
                if (document.getElementById)
                {
                // this is the way the standards work
                var style2 = document.getElementById(whichLayer).style;
                style2.display = style2.display? "":"block";
                }
                else if (document.all)
                {
                // this is the way old msie versions work
                var style2 = document.all[whichLayer].style;
                style2.display = style2.display? "":"block";
                }
                else if (document.layers)
                {
                // this is the way nn4 works
                var style2 = document.layers[whichLayer].style;
                style2.display = style2.display? "":"block";
                }
            }
function show(ele)
            {
                var srcElement = document.getElementById(ele);
                 if(srcElement != null)
                {
                    if(srcElement.style.display == "block")
                {       srcElement.style.display = 'none';    }
                else {       srcElement.style.display = 'block';    }
                }
                return false;
            }

function goToBlankDate(idField)
{
    if(document.getElementById(idField).value == "MM/DD/YYYY")
        document.getElementById(idField).value = "";
}


function goToBlankEmailAddress(idField)
{
    if(document.getElementById(idField).value == "Enter your Email Address")
        document.getElementById(idField).value = "";
}


function goToBlankAddressCityZip(idField)
{
    if(document.getElementById(idField).value == "Enter Address/ Cross Streets, City and State or ZIP")
        document.getElementById(idField).value = "";
}

function goToBlankCardNumber(idField)
{
    if(document.getElementById(idField).value == "00000000000000")
        document.getElementById(idField).value = "";
}


function goToBlankstartaddr(idField)
{
    if(document.getElementById(idField).value == "Starting Address")
        document.getElementById(idField).value = "";
}
function goToBlankdir(idField)
{

        document.getElementById(idField).value = "";
}


function goToBlankAddressCityState(idField)
{
    if(document.getElementById(idField).value == "Enter Street, City and State")
        document.getElementById(idField).value = "";
}

function goToBlankKeyWord(idField)
{
    if(document.getElementById(idField).value == "Enter keyword")
        document.getElementById(idField).value = "";
}

function goToBlankStoreNumber(idField)
{
    if(document.getElementById(idField).value == "Store #")
        document.getElementById(idField).value = "";
}

function goToBlankPhoneNumber(idField)
{
    if(document.getElementById(idField).value == "000-000-0000") {
        document.getElementById(idField).value = "";
	} else if(document.getElementById(idField).value == "000") {
		document.getElementById(idField).value = "";
	} else if(document.getElementById(idField).value == "0000") {
		document.getElementById(idField).value = "";
	}
}

function goToBlankPhoneNumberNew(idField)
{
	alert(hi);
    if(document.getElementById(idField).value == "000" || document.getElementById(idField).value == "0000") {
		alert(document.getElementById(idField).value);
        document.getElementById(idField).value = "";
	}
}

function goToBlankNickName(idField)
{
    if(document.getElementById(idField).value == "e.g., Work, Home")
        document.getElementById(idField).value = "";
}

/* Enable Disable Cheks and fields

    Called by: insurance_information.jsp

*/

function enableDisableCheck1(allergyval)
{
	var allergycount=parseInt(allergyval);
    document.getElementById("textCheckBoxAllergy").style.color = "#56595c";
                 document.getElementById("checkboxAllergy").disabled=false;
                   for(i=1;i<(allergycount+1);i++)
                {
                    document.getElementById("checkbox"+i).disabled = false;
                    document.getElementById("textCheckBox"+i).style.color = "#56595c";
                }

}
function movefocus(ph) {
	if(ph=="ph1") {
		if(document.getElementById("pharmacyPhone1").value.length==3) {
			document.getElementById("pharmacyPhone2").focus();
		}
	} else {
		if(document.getElementById("pharmacyPhone2").value.length==3) {
			document.getElementById("pharmacyPhone3").focus();
		}
	}
}
function movePhoneFocus(ph) {
	if(ph=="ph1") {
		if(document.getElementById("patientPhone1").value.length==3) {
			document.getElementById("patientPhone2").focus();
		}
	} else {
		if(document.getElementById("patientPhone2").value.length==3) {
			document.getElementById("patientPhone3").focus();
		}
	}
}
function submitToTransferPharmacy() {
	var phNo = document.getElementById("pharmacyPhone1").value + "-" + document.getElementById("pharmacyPhone2").value + "-" + document.getElementById("pharmacyPhone3").value;
	document.getElementById("pharmacyPhone").value = phNo;
	document.getElementById('transferPharmacy').click();
}
function submitFormForStoreSearch() {
	var phNo = document.getElementById("pharmacyPhone1").value + "-" + document.getElementById("pharmacyPhone2").value + "-" + document.getElementById("pharmacyPhone3").value;
	document.getElementById("pharmacyPhone").value = phNo;
	document.forms[0].submit();
}

function submitVerifyFormForStoreMap() {
	document.forms[0].submit();
}

function submitVerifyFormForCIUpdate() {
	document.getElementById('updateCI').click();
}

function restorePhoneNo(phNo) {
	if(phNo!='' && phNo!='--') {
		document.getElementById("pharmacyPhone1").value = phNo.substring(0, 3);
		document.getElementById("pharmacyPhone2").value = phNo.substring(4, 7);
		document.getElementById("pharmacyPhone3").value = phNo.substring(8, 12);
	} else {
		document.getElementById("pharmacyPhone1").value = "000";
		document.getElementById("pharmacyPhone2").value = "000";
		document.getElementById("pharmacyPhone3").value = "0000";
	}
}

function restorePhoneNoMail(phNo) {
	 if(phNo!=null&&phNo!='' && phNo!='--') {

		$('#phone1').val(phNo.substring(0, 3));
		$('#phone2').val(phNo.substring(4, 7));
		$('#phone3').val(phNo.substring(8, 12));
	}
	else
	{
		$('#phone1').val('000');
		$('#phone2').val('000');
		$('#phone3').val('0000');
	}
}

function restorePatientPhoneNo(phNo) {
	if(phNo!='' && phNo!='--') {
		document.getElementById("patientPhone1").value = phNo.substring(0, 3);
		document.getElementById("patientPhone2").value = phNo.substring(4, 7);
		document.getElementById("patientPhone3").value = phNo.substring(8, 12);
	} else {
		document.getElementById("patientPhone1").value = "000";
		document.getElementById("patientPhone2").value = "000";
		document.getElementById("patientPhone3").value = "0000";
	}
}

function enableDisableCheck2(allergyval,medcondval)
{
	var allergycount=parseInt(allergyval);
	var medcondcount=parseInt(medcondval);

                 document.getElementById("textCheckBoxMedical").style.color = "#56595c";
                document.getElementById("checkboxMedical").disabled=false;
                for(i=(allergycount+2);i<(allergycount+medcondcount+2);i++)
                {
                    document.getElementById("checkbox"+i).disabled = false;
                    document.getElementById("textCheckBox"+i).style.color = "#56595c";
                }
}

function enableDisableCheck(flag, sect, allergyval,medcondval)
{
	var allergycount=parseInt(allergyval);
	var medcondcount=parseInt(medcondval);
     if(flag)  //enabled
    {
        switch(sect)
        {
            case 1:
                document.getElementById("textCheckBoxAllergy").style.color = "#56595c";
                 document.getElementById("checkboxAllergy").disabled=false;
                for(i=1;i<(allergycount+1);i++)
                {
                    document.getElementById("checkbox"+i).disabled = false;
                    document.getElementById("textCheckBox"+i).style.color = "#56595c";
                }
                temp2=0;
            break;

            case 2:
                document.getElementById("textCheckBoxMedical").style.color = "#56595c";
                document.getElementById("checkboxMedical").disabled=false;
                for(i=(allergycount+2);i<(allergycount+medcondcount+2);i++)
                {
                    document.getElementById("checkbox"+i).disabled = false;
                    document.getElementById("textCheckBox"+i).style.color = "#56595c";
                }
                temp=0;
            break;

            case 3:
                document.getElementById("textarea3").disabled = false;
                document.getElementById("textLabel3").style.color = "#56595c";
                //document.getElementById("textLabel4").style.color = "#56595c";
                document.getElementById("checkbox_pharmacist").disabled = false;
            break;

            case 4:
                for(i=40;i<51;i++)
                {
                    document.getElementById("textLabel"+i).style.color = "#56595c";
                    if(i<47)
                    {
                        document.getElementById("textfield"+i).readOnly = false;
                    }
                }
                document.getElementById("radiobutton50").disabled = false;
                document.getElementById("radiobutton51").disabled = false;
                document.getElementById("radiobutton52").disabled = false;
            break;

            case 5:
                for(i=51;i<62;i++)
                {
                    document.getElementById("textLabel"+i).style.color = "#56595c";
                    if(i<58)
                        document.getElementById("textfield"+i).readOnly = false;
                }
                document.getElementById("radiobutton70").disabled = false;
                document.getElementById("radiobutton71").disabled = false;
                document.getElementById("radiobutton72").disabled = false;
            break;
        }
    }

    else  //disabled
    {
        switch(sect)
        {
            case 1:
             document.getElementById("checkboxAllergy").disabled=true;
             document.getElementById("checkboxAllergy").checked=false;
             document.getElementById("textarea1").value='';
             document.getElementById("textarea1").disabled=true;
             document.getElementById("textCheckBoxAllergy").style.color="#dddddd";
         for(i=1;i<(allergycount+1);i++)
                {
                    document.getElementById("checkbox"+i).disabled=true;
                    document.getElementById("checkbox"+i).checked=false;
                    document.getElementById("textCheckBox"+i).style.color="#dddddd";
                }
                temp2=0;
            break;

            case 2:
                document.getElementById("textCheckBoxMedical").style.color = "#dddddd";
                document.getElementById("textarea2").disabled = true;
                document.getElementById("checkboxMedical").checked=false;
                document.getElementById("textarea2").value='';
                document.getElementById("checkboxMedical").disabled = true;
                for(i=(allergycount+2);i<(allergycount+medcondcount+2);i++)
                {

                    document.getElementById("checkbox"+i).disabled = true;
                    document.getElementById("checkbox"+i).checked = false;
                    document.getElementById("textCheckBox"+i).style.color="#dddddd";
                    }
                temp=0;
            break;

            case 3:
                document.getElementById("textarea3").disabled = true;
                document.getElementById("textarea3").value='';
                document.getElementById("textLabel3").style.color = "#dddddd";
//                document.getElementById("textLabel4").style.color = "#dddddd";
           //     document.getElementById("checkbox_pharmacist").disabled = true;
             //    document.getElementById("checkbox_pharmacist").checked=false;

            break;

            case 4:
                for(i=40;i<51;i++)
                {
                  document.getElementById("textLabel"+i).style.color = "#dddddd";
                    if(i<47)
                    {
                    document.getElementById("textfield"+i).readOnly = true;
                    document.getElementById("textfield"+i).value='';
                    }
                }
                document.getElementById("radiobutton50").disabled = true;
                document.getElementById("radiobutton51").disabled = true;
                document.getElementById("radiobutton52").disabled = true;
            break;

            case 5:
                for(i=51;i<62;i++)
                {
                    document.getElementById("textLabel"+i).style.color = "#dddddd";
                    if(i<58)
                    {
                      document.getElementById("textfield"+i).readOnly = true;
                      document.getElementById("textfield"+i).value='';
                    }
                }
                document.getElementById("radiobutton70").disabled = true;
                document.getElementById("radiobutton71").disabled = true;
                document.getElementById("radiobutton72").disabled = true;

            break;
        }
    }
}

function populateInitialphoneNoPrimary()
{
document.getElementById("textfield46").value="000-000-0000";
}

function populateInitialphoneNoSec()
{
document.getElementById("textfield57").value="000-000-0000";
}


function validatePlanPhone(phoneNumber)
{

if(phoneNumber=="000-000-0000")
    {
        goToBlankPhoneNumber('textfield46');

    }
    else if (phoneNumber=="")
    {
        goToBlankPhoneNumber('textfield46');

    }

}

function validatePlanPhoneSec(phoneNumber)
{

if(phoneNumber=="000-000-0000")
    {
        goToBlankPhoneNumber('textfield57');

    }
    else if (phoneNumber=="")
    {
        goToBlankPhoneNumber('textfield57');

    }

}

function hidden_textArea(idCheckBox, idTextArea)
{
    if(document.getElementById(idCheckBox).checked)
    {
        document.getElementById(idTextArea).disabled=false;
    }
    else
    {
        document.getElementById(idTextArea).disabled=true;
        document.getElementById(idTextArea).value='';
    }
}



function check_radios()
{
    document.getElementById("check_radio").checked=true;
    document.getElementById("check_radio_one").checked=true;
    document.getElementById("checkbox7").checked=false;
    document.getElementById("checkbox20").checked=false;
    document.getElementById("textarea1").value='';
    document.getElementById("textarea2").value='';

}

function check_radiosFormWithBoxes()
{
    document.getElementById("checkbox7").checked=true;
    document.getElementById("radiobutton21").checked=true;
    document.getElementById("radiobutton31").checked=true;
    document.getElementById("radiobutton41").checked=true;
    document.getElementById("checkbox20").checked=false;
    document.getElementById("checkbox13").checked=false;
    document.getElementById("checkbox13").checked=false;

    document.getElementById("textarea1").value='';
    document.getElementById("textarea2").value='';

}

function enableDisableTextbox(idText, flag)
{
    if(flag)
    {
        document.getElementById(idText).readOnly = false;
    }
    else
    {
        document.getElementById(idText).readOnly = true;
        document.getElementById(idText).value = "";
    }
}


function enableDisableTextArea(idCheckBox, idTextArea)
{
    if(document.getElementById(idCheckBox).checked)
    {
        document.getElementById(idTextArea).disabled = false;
        document.getElementById(idTextArea).value = '';
    }
    else
    {
        document.getElementById(idTextArea).disabled = true;
        document.getElementById(idTextArea).value = '';
    }
}


//function used in file form_with_boxes_hi.jsp
function enableDisableCheckFormWithBoxes(flag, sect)
{
    if(flag)    //enabled
    {
        switch(sect)
        {
            case 1:
                for(i=1;i<14;i++)
                {
                    document.getElementById("checkbox"+i).disabled = false;
                    document.getElementById("textCheckBox"+i).style.color = "#56595c";
                }
                document.getElementById("textarea1").disabled = true;
                document.getElementById("checkbox7").checked=false;
                document.getElementById("textarea1").value='';
            break;

            case 2:
                for(i=14;i<21;i++)
                {
                    document.getElementById("checkbox"+i).disabled = false;
                    document.getElementById("textCheckBox"+i).style.color = "#56595c";
                    document.getElementById("textarea2").disabled=true;
                }
                document.getElementById("textarea2").disabled = true;
                document.getElementById("checkbox20").checked=false;
                document.getElementById("textarea2").value='';
            break;

            case 3:
                document.getElementById("textarea3").disabled = false;
                document.getElementById("textLabel3").style.color = "#56595c";
                document.getElementById("textarea3").value='';

            break;
        }
    }

    else    //disabled
    {
        switch(sect)
        {
            case 1:
                for(i=1;i<14;i++)
                {
                    document.getElementById("checkbox"+i).disabled = true;
                    document.getElementById("checkbox"+i).checked = false;
                    document.getElementById("textCheckBox"+i).style.color = "#dddddd";
                }
                document.getElementById("textarea1").disabled = true;
                document.getElementById("checkbox7").checked=false;
                document.getElementById("textarea1").value='';
            break;

            case 2:
                for(i=14;i<21;i++)
                {
                    document.getElementById("checkbox"+i).disabled = true;
                    document.getElementById("checkbox"+i).checked = false;
                    document.getElementById("textCheckBox"+i).style.color = "#dddddd";
                    document.getElementById("textarea2").disabled=false;
                }
                document.getElementById("textarea2").disabled = true;
                document.getElementById("checkbox20").checked=false;
                document.getElementById("textarea2").value='';
            break;

            case 3:
                document.getElementById("textarea3").disabled = true;
                document.getElementById("textLabel3").style.color = "#dddddd";
                document.getElementById("textarea3").value='';
            break;
        }
    }
}


function enableDisableCheckRM10(sect)
{
    switch(sect)
    {
        case 0:
            document.getElementById("textRadio1").style.color = "#9f9f9f";      //disable
            document.getElementById("textRadio2").style.color = "#9f9f9f";      //disable
            document.getElementById("textRadio3").style.color = "#9f9f9f";      //disable
            document.getElementById("textRadio4").style.color = "#9f9f9f";      //disable
        break;

        case 1:
            document.getElementById("textRadio1").style.color = "#56595c";      //enable
            document.getElementById("textRadio2").style.color = "#1aa1cf";      //enable
            document.getElementById("textRadio3").style.color = "#9f9f9f";      //disable
            document.getElementById("textRadio4").style.color = "#9f9f9f";      //disable
        break;

        case 2:
            document.getElementById("textRadio1").style.color = "#9f9f9f";      //disable
            document.getElementById("textRadio2").style.color = "#9f9f9f";      //disable
            document.getElementById("textRadio3").style.color = "#56595c";      //enable
            document.getElementById("textRadio4").style.color = "#1aa1cf";      //enable
        break;
    }
}


/* ---------------------------------------------------
   Dreamweaver functions:

   Functions created by Adobe and found internally in
   Adobe Dreamweaver.

   1. MM_preloadImages
   2. MM_swapImgRestore
   3. MM_findObj
   4. MM_swapImage
   --------------------------------------------------- */

/* Internal Dreamweaver function:
   Preloads images
*/
function MM_preloadImages() { //v3.0
    var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
        if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
/* Internal Dreamweaver function:
   Restores an image
*/
function MM_swapImgRestore() { //v3.0
    var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
/* Internal Dreamweaver function:
   Finds object (image, table, etc.) in HTML
*/
function MM_findObj(n, d) { //v4.01
    var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
        if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
        if(!x && d.getElementById) x=d.getElementById(n); return x;
}
/* Internal Dreamweaver function:
   Swaps an image
*/
function MM_swapImage() { //v3.0
    var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
        if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}



/* Right menu functionality:
tabdropdown.init("moonmenu")
"moonmenu"this is Id that containt div funcionality
tabdropdown.init("moonmenu") this function support two parameters, the first
parameter is the Div id and second parameter is position its the vector for
select this element
   Called by: header.jsp
*/


var tabdropdown={
    disappeardelay: 200, //set delay in miliseconds before menu disappears onmouseout
    disablemenuclick: false, //when user clicks on a menu item with a drop down menu, disable menu item's link?
    enableiframeshim: 1, //1 or 0, for true or false

    //No need to edit beyond here////////////////////////
    dropmenuobj: null, ie: document.all, firefox: document.getElementById&&!document.all, previousmenuitem:null,
    currentpageurl: window.location.href.replace("http://"+window.location.hostname, "").replace(/^\//, ""),

    getposOffset:function(what, offsettype){
        var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
        var parentEl=what.offsetParent;
            while (parentEl!=null){
                totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
                parentEl=parentEl.offsetParent;
            }
        return totaloffset;
    },

    showhide:function(obj, e, obj2){ //obj refers to drop down menu, obj2 refers to tab menu item mouse is currently over
        if (this.ie || this.firefox)
            this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px"
        if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover"){
            if (obj2.parentNode.className.indexOf("default")==-1) //if tab isn't a default selected one
                obj2.parentNode.className="selected"
            obj.visibility="visible"
            }
        else if (e.type=="click")
            obj.visibility="hidden"
    },

    iecompattest:function(){
        return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
    },

    clearbrowseredge:function(obj, whichedge){
        var edgeoffset=0
        if (whichedge=="rightedge"){
            var windowedge=this.ie && !window.opera? this.standardbody.scrollLeft+this.standardbody.clientWidth-15 : window.pageXOffset+window.innerWidth-15
            this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth
        if (windowedge-this.dropmenuobj.x < this.dropmenuobj.contentmeasure)  //move menu to the left?
            edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
        }
        else{
            var topedge=this.ie && !window.opera? this.standardbody.scrollTop : window.pageYOffset
            var windowedge=this.ie && !window.opera? this.standardbody.scrollTop+this.standardbody.clientHeight-15 : window.pageYOffset+window.innerHeight-18
            this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight
            if (windowedge-this.dropmenuobj.y < this.dropmenuobj.contentmeasure){ //move up?
                edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight
                if ((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure) //up no good either?
                    edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
            }
            this.dropmenuobj.firstlink.style.borderTopWidth=(edgeoffset==0)? 0 : "1px" //Add 1px top border to menu if dropping up
        }
        return edgeoffset
    },

    dropit:function(obj, e, dropmenuID){
        if (this.dropmenuobj!=null){ //hide previous menu
            this.dropmenuobj.style.visibility="hidden" //hide menu
            if (this.previousmenuitem!=null && this.previousmenuitem!=obj){
                if (this.previousmenuitem.parentNode.className.indexOf("default")==-1) //If the tab isn't a default selected one
                    this.previousmenuitem.parentNode.className=""
            }
        }
        this.clearhidemenu()
        if (this.ie||this.firefox){
            obj.onmouseout=function(){tabdropdown.delayhidemenu(obj)}
            obj.onclick=function(){return !tabdropdown.disablemenuclick} //disable main menu item link onclick?
            this.dropmenuobj=document.getElementById(dropmenuID)
            this.dropmenuobj.onmouseover=function(){tabdropdown.clearhidemenu()}
            this.dropmenuobj.onmouseout=function(e){tabdropdown.dynamichide(e, obj)}
            this.dropmenuobj.onclick=function(){tabdropdown.delayhidemenu(obj)}
            this.showhide(this.dropmenuobj.style, e, obj)
            this.dropmenuobj.x=this.getposOffset(obj, "left")
            this.dropmenuobj.y=this.getposOffset(obj, "top")
            this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px"
            this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px"
            this.previousmenuitem=obj //remember main menu item mouse moved out from (and into current menu item)
            this.positionshim() //call iframe shim function
        }
    },

    contains_firefox:function(a, b) {
        while (b.parentNode)
        if ((b = b.parentNode) == a)
            return true;
        return false;
    },

    dynamichide:function(e, obj2){ //obj2 refers to tab menu item mouse is currently over
        var evtobj=window.event? window.event : e
        if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
            this.delayhidemenu(obj2)
        else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& !this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
            this.delayhidemenu(obj2)
    },

    delayhidemenu:function(obj2){
        this.delayhide=setTimeout(function(){tabdropdown.dropmenuobj.style.visibility='hidden'; if (obj2.parentNode.className.indexOf('default')==-1) obj2.parentNode.className=''},this.disappeardelay) //hide menu
    },

    clearhidemenu:function(){
        if (this.delayhide!="undefined")
            clearTimeout(this.delayhide)
    },

    positionshim:function(){ //display iframe shim function
        if (this.enableiframeshim && typeof this.shimobject!="undefined"){
            if (this.dropmenuobj.style.visibility=="visible"){
                this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px"
                this.shimobject.style.height=this.dropmenuobj.offsetHeight+"px"
                this.shimobject.style.left=this.dropmenuobj.style.left
                this.shimobject.style.top=this.dropmenuobj.style.top
            }
        this.shimobject.style.display=(this.dropmenuobj.style.visibility=="visible")? "block" : "none"
        }
    },

    hideshim:function(){
        if (this.enableiframeshim && typeof this.shimobject!="undefined")
            this.shimobject.style.display='none'
    },

isSelected:function(menuurl){
    var menuurl=menuurl.replace("http://"+menuurl.hostname, "").replace(/^\//, "")
    return (tabdropdown.currentpageurl==menuurl)
},

    init:function(menuid, dselected){
		var none = 0;

        /* this.standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body //create reference to common "body" across doctypes
        var menuitems=document.getElementById(menuid).getElementsByTagName("a")
        for (var i=0; i<menuitems.length; i++){
            if (menuitems[i].getAttribute("rel")){
                var relvalue=menuitems[i].getAttribute("rel")
                document.getElementById(relvalue).firstlink=document.getElementById(relvalue).getElementsByTagName("a")[0]
                menuitems[i].onmouseover=function(e){
                    var event=typeof e!="undefined"? e : window.event
                    tabdropdown.dropit(this, event, this.getAttribute("rel"))
                }
            }
            if (dselected=="auto" && typeof setalready=="undefined" && this.isSelected(menuitems[i].href)){
                menuitems[i].parentNode.className+=" selected default"
                var setalready=true
            }
            else if (parseInt(dselected)==i)
                menuitems[i].parentNode.className+=" selected default"
        }
        */
    }

}

/*view div and hidden beginds*/
    function diplay_details(id){
    mostrado=0;
    elem = document.getElementById(id);
    if(elem.style.display=='block')mostrado=1;
    elem.style.display='none';
    if(mostrado!=1)elem.style.display='block';
}



function drug_info_openall_closeall(id){

	if (document.getElementById(id).alt=='Show') {
		 elem = document.getElementById('contra');
		 if(elem != null) {
			 hide_All('contra');
		 }
		 elem = document.getElementById('admin');
		 if(elem != null) {
			 hide_All('admin');
		 }
		 elem = document.getElementById('missed');
		 if(elem != null) {
			 hide_All('missed');
		 }
		 elem = document.getElementById('inter');
		 if(elem != null) {
			 hide_All('inter');
		 }
		 elem = document.getElementById('monitor');
		 if(elem != null) {
			 hide_All('monitor');
		 }
		 elem = document.getElementById('side');
		 if(elem != null) {
			 hide_All('side');
		 }
		 elem = document.getElementById('store');
		 if(elem != null) {
			 hide_All('store');
		 }
		 elem = document.getElementById('pregSection');
		 if(elem != null) {
			 hide_All('pregSection');
		 }
	}
	else {
		 elem = document.getElementById('contra');
		 if(elem != null) {
			 diplay_All('contra');
		 }
		 elem = document.getElementById('admin');
		 if(elem != null) {
			 diplay_All('admin');
		 }
		 elem = document.getElementById('missed');
		 if(elem != null) {
			 diplay_All('missed');
		 }
		 elem = document.getElementById('inter');
		 if(elem != null) {
			 diplay_All('inter');
		 }
		 elem = document.getElementById('monitor');
		 if(elem != null) {
			 diplay_All('monitor');
		 }
		 elem = document.getElementById('side');
		 if(elem != null) {
			 diplay_All('side');
		 }
		 elem = document.getElementById('store');
		 if(elem != null) {
			 diplay_All('store');
		 }
		 elem = document.getElementById('pregSection');
		 if(elem != null) {
			 diplay_All('pregSection');
		 }
	}
}


function hide_All(id){

   elem = document.getElementById(id);
   elem.style.display='block';

}

function diplay_All(id){

   elem = document.getElementById(id);
   elem.style.display='none';

}

var flag=0;
    function change_ico(id)
    {
     if (document.getElementById(id).alt=='+')
     {
         MM_swapImage(id,'','../../webcontent/images/common/icon_minus.gif',1);
        document.getElementById(id).alt='-';
     }
     else
     {
         MM_swapImage(id,'','../../webcontent/images/common/icon_plus.gif',2);
        document.getElementById(id).alt='+';
    }

}

function change_ico_text(id,text)
    {
     if (document.getElementById(id).alt=='+')
     {
         MM_swapImage(id,'','../../webcontent/images/common/icon_minus.gif',1);
        document.getElementById(id).alt='-';
        document.getElementById(text).innerHTML ="Hide Answer";
     }
     else
     {
         MM_swapImage(id,'','../../webcontent/images/common/icon_plus.gif',2);
        document.getElementById(id).alt='+';
        document.getElementById(text).innerHTML ="Answer";
    }

}


function change_ico_text_blue(id,text)
    {
     if (document.getElementById(id).alt=='+')
     {
         MM_swapImage(id,'','../../webcontent/images/common/icon_minus_blue.gif',1);
        document.getElementById(id).alt='-';
        document.getElementById(text).innerHTML ="Hide Answer</nobr>";
     }
     else
     {
         MM_swapImage(id,'','../../webcontent/images/common/icon_plus_blue.gif',2);
        document.getElementById(id).alt='+';
        document.getElementById(text).innerHTML ="Answer</nobr>";
    }

}


function change_icon(id,context) {
    if (document.getElementById(id).alt=='Expand'){
        MM_swapImage(id,'','/webcontent/images/common/icon_minus_blue.gif',1);
        document.getElementById(id).alt='Collapse';
    } else {
        MM_swapImage(id,'','/webcontent/images/common/icon_plus_blue.gif',2);
        document.getElementById(id).alt='Expand';
    }
}

function change_icon_text(id,text,context) {
    if (document.getElementById(id).alt=='Show') {
        MM_swapImage(id,'','/webcontent/images/common/icon_minus.gif',1);
        document.getElementById(id).alt='';
        document.getElementById(text).innerHTML ="Hide Answer";
    } else {
        MM_swapImage(id,'','/webcontent/images/common/icon_plus.gif',2);
        document.getElementById(id).alt='Show';
        document.getElementById(text).innerHTML ="Answer";
    }
}

function change_icon_text_blue(id,text,context) {
    if (document.getElementById(id).alt=='+') {
        MM_swapImage(id,'','/webcontent/images/common/icon_minus_blue.gif',1);
        document.getElementById(id).alt='-';
        document.getElementById(text).innerHTML ="Hide Answer</nobr>";
    } else {
        MM_swapImage(id,'','/webcontent/images/common/icon_plus_blue.gif',2);
        document.getElementById(id).alt='+';
        document.getElementById(text).innerHTML ="Answer</nobr>";
    }
}

function change_icon_text_open_close(id,text,context) {
    if (document.getElementById(id).alt=='Show') {
        MM_swapImage(id,'','/webcontent/images/prescription/icon_plus_blue2.png',1);
        document.getElementById(id).alt='';
        document.getElementById(text).innerHTML ="Open";
    } else {
        MM_swapImage(id,'','/webcontent/images/prescription/icon_minus_blue2.png',2);
        document.getElementById(id).alt='Show';
        document.getElementById(text).innerHTML ="Close";
    }
}

function change_icon_text_openall_closeall(id,text,context) {
    if (document.getElementById(id).alt=='Show') {
        MM_swapImage(id,'','/webcontent/images/prescription/icon_plus_blue2.png',1);
        document.getElementById(id).alt='';
		if(id == "imgOpenCloseAllQuestions"){
			document.getElementById(text).innerHTML ="Open All Questions";
		}else{
			document.getElementById(text).innerHTML ="Open All";
		}

        elem = document.getElementById('contraClose');
		if(elem != null) {
		    change_icon_text_open('img1','contraClose','');
		}
		elem = document.getElementById('adminClose');
		if(elem != null) {
		    change_icon_text_open('img2','adminClose','');
		}
		elem = document.getElementById('missedClose');
		if(elem != null) {
		    change_icon_text_open('img3','missedClose','');
		}
		elem = document.getElementById('interClose');
		if(elem != null) {
		    change_icon_text_open('img4','interClose','');
		}
		elem = document.getElementById('monitorClose');
		if(elem != null) {
		    change_icon_text_open('img5','monitorClose','');
		}
		elem = document.getElementById('sideClose');
		if(elem != null) {
		    change_icon_text_open('img6','sideClose','');
		}
		elem = document.getElementById('storeClose');
		if(elem != null) {
		    change_icon_text_open('img7','storeClose','');
		}
		elem = document.getElementById('pregClose');
		if(elem != null) {
		    change_icon_text_open('img8','pregClose','');
		}

        //change_icon_text_open('img1','contraClose','');
        //change_icon_text_open('img2','adminClose','adminClose');
        //change_icon_text_open('img3','missedClose','');
        //change_icon_text_open('img4','interClose','');
        //change_icon_text_open('img5','monitorClose','');
        //change_icon_text_open('img6','sideClose','');
        //change_icon_text_open('img7','storeClose','');
        //change_icon_text_open('img8','pregClose','');
    } else {
        MM_swapImage(id,'','/webcontent/images/prescription/icon_minus_blue2.png',2);
        document.getElementById(id).alt='Show';
        if(id == "imgOpenCloseAllQuestions"){
			document.getElementById(text).innerHTML ="Close All Questions";
		}else{
			document.getElementById(text).innerHTML ="Close All";
		}

        elem = document.getElementById('contraClose');
		if(elem != null) {
		    change_icon_text_close('img1','contraClose','');
		}
		elem = document.getElementById('adminClose');
		if(elem != null) {
		    change_icon_text_close('img2','adminClose','');
		}
		elem = document.getElementById('missedClose');
		if(elem != null) {
		    change_icon_text_close('img3','missedClose','');
		}
		elem = document.getElementById('interClose');
		if(elem != null) {
		    change_icon_text_close('img4','interClose','');
		}
		elem = document.getElementById('monitorClose');
		if(elem != null) {
		    change_icon_text_close('img5','monitorClose','');
		}
		elem = document.getElementById('sideClose');
		if(elem != null) {
		    change_icon_text_close('img6','sideClose','');
		}
		elem = document.getElementById('storeClose');
		if(elem != null) {
		    change_icon_text_close('img7','storeClose','');
		}
		elem = document.getElementById('pregClose');
		if(elem != null) {
		    change_icon_text_close('img8','pregClose','');
		}

        //change_icon_text_close('img1','contraClose','');
        //change_icon_text_close('img2','adminClose','');
        //change_icon_text_close('img3','missedClose','');
        //change_icon_text_close('img4','interClose','');
        //change_icon_text_close('img5','monitorClose','');
        //change_icon_text_close('img6','sideClose','');
        //change_icon_text_close('img7','storeClose','');
        //change_icon_text_close('img8','pregClose','');
    }

}

function change_icon_text_open(id2,text,context) {
		document.getElementById(id2).alt='';
        MM_swapImage(id2,'','/webcontent/images/prescription/icon_plus_blue2.png',1);
        document.getElementById(text).innerHTML ="Open";


}

function change_icon_text_close(id,text,context) {
		document.getElementById(id).alt='Show';
        MM_swapImage(id,'','/webcontent/images/prescription/icon_minus_blue2.png',2);
        document.getElementById(text).innerHTML ="Close";

}
/*Image loading with context path ends */

    function limite(que,cuanto)
    {
        var v=que.value
        if(v.length>cuanto)
            que.value=v.substring(0,cuanto)
    }

    function replaceCharacters(conversionString,inChar,outChar)
    {
        var convertedString = conversionString.split(inChar);
        convertedString = convertedString.join(outChar);
        return convertedString;
    }
    /*This function adds a new field to the original <div>
      The "target_original" parameter is the main <div>
      The "source" parameter is the div that contains the newly added field
    */


    var iteration = 0;
    function add_fields(target_original,source,val)
    {
		iteration++;
	    var passedLength=parseInt(val);
		var ni = document.getElementById(target_original);
        var divIdName = "";
        var newdiv = document.createElement('div');
        newdiv.setAttribute("id",divIdName);
        newdiv.innerHTML = document.getElementById(source).innerHTML;
        var content = document.getElementById(source).innerHTML;
		var browserName=navigator.appName;
		if (browserName=="Netscape") {
			content = replaceCharacters(content,'width="20">'+val,'width="20">'+(iteration+passedLength));
			} else {
	        content = replaceCharacters(content,'width=20>'+val,'width=20>'+(iteration+passedLength));
		}
	    newdiv.innerHTML = content;
        ni.appendChild(newdiv);
    }

    var iteration = 0;
    function add_fields_coupon(target_original,source,val)
    {
		iteration++;
	    var passedLength=parseInt(val);
		var ni = document.getElementById(target_original);
        var divIdName = "";
        var newdiv = document.createElement('div');
        newdiv.setAttribute("id",divIdName);
        newdiv.innerHTML = document.getElementById(source).innerHTML;
        var content = document.getElementById(source).innerHTML;
        content = content.replace('title="Coupon code"','title="Coupon code '+(iteration+1)+'"');
		var browserName=navigator.appName;
		if (browserName=="Netscape") {
			content = replaceCharacters(content,'width="20">'+val,'width="20">'+(iteration+passedLength));
			} else {
	        content = replaceCharacters(content,'width=20>'+val,'width=20>'+(iteration+passedLength));
		}
	    newdiv.innerHTML = content;
        ni.appendChild(newdiv);
    }
    var iteration = 0;
    function add_fields_rx(target_original,source,val)
    {
		iteration++;
	    var passedLength=parseInt(val);
		var ol = document.getElementById(target_original);
		var newLiHtml = document.getElementById(source).innerHTML;
        var newLi =  document.createElement('li');
        newLi.setAttribute("id","newLi"+iteration);

			newLiHtml = replaceCharacters(newLiHtml,'number">'+val,'number">'+(iteration+passedLength));
			newLiHtml = replaceCharacters(newLiHtml,'##COUNT1##',(iteration+passedLength));
			newLiHtml = replaceCharacters(newLiHtml,'##COUNT2##',(iteration+passedLength));
			newLiHtml = replaceCharacters(newLiHtml,'##COUNT3##',(iteration+passedLength));

        newLi.innerHTML = newLiHtml;
	    ol.appendChild(newLi);

	    document.getElementById("rxStatusRequestHolder.rxNumber"+(iteration+passedLength)).focus();
    }

/*  function add_fields(target_original,source)
    {
        document.getElementById(target_original).innerHTML = document.getElementById(target_original).innerHTML +document.getElementById(source).innerHTML;
    }
*/

/*view div and hidden ends*/

/*
        //  In my case I want to load them onload, this is how you do it!
        //
        Event.observe(window, 'load', loadAccordions, false);
        Event.observe(window, 'load', loadAccordions_providence, false);

        //
        //  Set up all accordions
        //
        function loadAccordions() {
            var topAccordion = new accordion('#top_container', {
                classNames : {
                    toggle : 'horizontal_accordion_toggle',
                    toggleActive : 'horizontal_accordion_toggle_active',
                    content : 'horizontal_accordion_content'
                },
                defaultSize : {
                    width : 525
                },
                direction : 'horizontal'
            });
            var bottomAccordion = new accordion('#bottom_container');

            // Open first one
            bottomAccordion.activate($$('#bottom_container .accordion_toggle')[0]);

            // Open second one
            topAccordion.activate($$('#top_container .horizontal_accordion_toggle')[2]);
        }

            function loadAccordions_providence() {
                    var topAccordion = new accordion('#top_container_providence', {
                        classNames : {
                            toggle : 'horizontal_accordion_toggle',
                            toggleActive : 'horizontal_accordion_toggle_active',
                            content : 'horizontal_accordion_content'
                        },
                        defaultSize : {
                            width : 525
                        },
                        direction : 'horizontal'
                    });
                    var bottomAccordion = new accordion('#bottom_container_providence');

                    // Open first one
                    bottomAccordion.activate($$('#bottom_container_providence .accordion_toggle')[0]);

                    // Open second one
                topAccordion.activate($$('#top_container_providence .horizontal_accordion_toggle')[2]);
            }


*/


function modifyHeader()
{
    if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
    {
        myRule = document.styleSheets[2].cssRules;
        styles = [".subttl_menu_text", ".subttl_menu_text_li"];

        for (i=0; reg=myRule[i]; i++)
        {
            if(myRule[i].selectorText ==styles[0])
            {
                reg.style.padding="0px 0px 0px 0px";
            }

            if(myRule[i].selectorText ==styles[1])
            {
                reg.style.padding="0px 0px 0px 0px";
            }
        }
    }
}

var temp=0;
var incCount=0;
function changeFontSize(inc)
{
        var process = false;

		if(incCount < 0){
			incCount = 0;
		} else if(incCount > 2){
			incCount = -1;
		}

		if(inc == 2 && temp < 2){
			incCount++;
		} else if(inc == -2 ){
			incCount--;
		}

        if(inc == -2 )
        {
            if(temp > -2)
            {
                temp--;
                process = true;
            }
        }
        else
        {
            if(temp < 2)
            {
                    temp++;
                    process = true;
            }
        }

		if(incCount < 0){
			process = false;
		} else if(incCount > 2){
			process = false;
			incCount = 2;
		}
        if(process)
        {

        if (navigator.userAgent.toLowerCase().indexOf("safari") != -1)
            {
                var p = document.getElementsByTagName('td');
                for(n=0; n<p.length; n++)
                    {
                        if(p[n].style.fontSize)
                        {
                            var size = parseInt(p[n].style.fontSize.replace("px", ""));
                     } else
                        {
                             var size = 14;
                     }
                        p[n].style.fontSize = size+inc + 'px';
                    }

                var p_span = document.getElementsByTagName('span');
                for(n=0; n<p_span.length; n++)
                    {
                        if(p_span[n].style.fontSize)
                        {
                            var size = parseInt(p_span[n].style.fontSize.replace("px", ""));
                     } else
                        {
                             var size = 14;
                     }
                        p_span[n].style.fontSize = size+inc + 'px';
                    }

            var p_a = document.getElementsByTagName('a');
                for(n=0; n<p_a.length; n++)
                    {
                        if(p_a[n].style.fontSize)
                        {
                            var size = parseInt(p_a[n].style.fontSize.replace("px", ""));
                     } else
                        {
                             var size = 12;
                     }
                        p_a[n].style.fontSize = size+inc + 'px';
                    }


            }
            else
            {
                var top = 30;   //max size font
                var down = 12;  //min zise font
                var i=0;
                var k=0;
                var j=0;

                styles = [".cont"];


                for(k=0;k<parseInt(document.styleSheets.length);k++)
                {
                    //alert(document.styleSheets.length + " " +k);

                    if (document.all)  //IE
                        miRegla = document.styleSheets[k].rules;
                    else                //FF
                        miRegla = document.styleSheets[k].cssRules;

                        for (i=0; reg=miRegla[i]; i++)
                            {
                                flag = false;
                                size = reg.style.fontSize;
                                for(j=0; j<styles.length; j++)
                                    {
                                        if(miRegla[i].selectorText == styles[j])
                                            flag = true;
                                    }

                                    if (size!='' && flag)
                                    {
                                        if(inc >0 && parseFloat(size) < top)
                                        {
                                            size = parseFloat(size) + inc + 'px';
                                            reg.style.fontSize=size;
                                        }

                                        if(inc <0 && parseFloat(size) > down)
                                        {
                                            size = parseFloat(size) + inc + 'px';
                                            reg.style.fontSize=size;
                                        }

                                    }
                            }
                }
             }
            }
        }



    function modifyHeader_styles()
    {
        var k;

        if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText ==".div_position_menu_trhee")    //vitamints item
                        {
                            if(navigator.userAgent.indexOf('Mac') != -1)
                            {
                                reg.style.margin="7px 0px 0px -138px";
                            }
                            else
                            {
                                reg.style.margin="6px 0px 0px -138px";
                            }
                        }

                        if(myRules[i].selectorText ==".div_position_menu_two")  //view item
                        {
                            if(navigator.userAgent.indexOf('Mac') != -1)
                            {
                                reg.style.margin="7px 0px 0px -146px";
                            }
                            else
                            {
                                reg.style.margin="6px 0px 0px -145px";
                            }
                        }

                        if(myRules[i].selectorText ==".div_position_menu_one")  //rest of the items
                        {
                            if(navigator.userAgent.indexOf('Mac') != -1)
                            {
                                reg.style.margin="7px 0px 0px 4px";
                            }
                            else
                            {
                                reg.style.margin="6px 0px 0px 4px";
                            }
                        }

                        if(myRules[i].selectorText ==".spacer_menu")
                        {
                            if(navigator.userAgent.indexOf('Mac') != -1)
                            {
                                reg.style.margin="7px 0px 0px -2px";
                            }
                            else
                            {
                                reg.style.margin="6px 0px 0px -8px";
                            }
                        }
                    }
            }
    }
}

function scroll_city()
{
    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_2")    //vitamints item
                        {
                            reg.style.height="479px";
                        }
                    }
            }
        }
        else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_2")    //vitamints item
                        {
                    //      alert(reg.style.overflow);
                            reg.style.overflow="scroll";
                        //  alert(reg.style.overflow);
                        }


                    }

            }
        }
}


function scroll_city_1()
{

    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox")  //vitamints item
                        {
                            reg.style.height="289px";
                        }
                    }
            }
        }
        else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox")  //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }
                    }

            }
        }
}


function scroll_city_2()
{
    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_3")    //vitamints item
                        {
                            reg.style.height="219px";
                        }
                    }
            }
        }
    else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_3")    //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }


                    }

            }
        }

}


function scroll_city_3()
{
    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_directions")   //vitamints item
                        {
                            reg.style.height="268px";
                        }
                    }
            }
        }

}

function scroll_city_6()
{
    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_6")    //vitamints item
                        {
                            reg.style.height="438px";
                        }
                    }
            }
        }
    else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_6")    //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }
                        if(myRules[i].selectorText =="#scrollBox_providence")   //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }
                    }
            }
        }
}

function scroll_city_7()
{
    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_7")    //vitamints item
                        {
                            reg.style.height="442px";
                        }
                    }
            }
        }
    else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_7")    //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }
                    }
            }
        }
}


function scroll_city_8()
{
    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_8")    //vitamints item
                        {
                            reg.style.height="420px";
                        }
                    }
            }
        }
    else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_8")    //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }

                    }
            }
        }
}


function scroll_city_9()
{
    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_9")    //vitamints item
                        {
                            reg.style.height="456px";
                        }
                    }
            }
        }
    else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_9")    //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }

                    }
            }
        }
}



function scroll_directions()
{


    if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox_directions")   //vitamints item
                        {
                            reg.style.height="285px";
                        }
                    }
            }
        }
    else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                    myRules = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules[i];
                        if(myRules[i].selectorText =="#scrollBox")  //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }

                        if(myRules[i].selectorText =="#scrollBox_directions")   //vitamints item
                        {
                            reg.style.overflow="scroll";
                        }
                    }
            }
        }
}


function scroll_size_net()
{
 if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
    {
        for(k=0;k<parseInt(document.styleSheets.length);k++)
        {
                myRules = document.styleSheets[k].cssRules;
                for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                {
                    reg=myRules[i];
                    if(myRules[i].selectorText =="#cntr_special")   //vitamints item
                    {
                        reg.style.overflow="scroll";
                    }
                }
        }
    }
}

/*This script is for correct resolutions in 1024*768 Start*/
if (screen.width=="1024" && screen.height=="768")
{
    var k=0;
    var i=0;
        if(navigator.userAgent.toLowerCase().indexOf("safari") != -1)
        {
        for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                myRules_styles = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {
                        reg=myRules_styles[i];
                        if(myRules_styles[i].selectorText ==".div_position_menu_trhee") //vitamints item
                        {
                            if(navigator.userAgent.indexOf('Mac') != -1)
                            {
                                reg.style.margin="7px 0px 0px -130px";
                            }
                            else
                            {
                                reg.style.margin="6px 0px 0px 100px";
                            }
                        }

                        if(myRules_styles[i].selectorText ==".div_position_menu_two")   //view item
                        {
                            if(navigator.userAgent.indexOf('Mac') != -1)
                            {
                                reg.style.margin="7px 0px 0px -146px";
                            }
                            else
                            {
                                reg.style.margin="6px 0px 0px -145px";
                            }
                        }

                        if(myRules_styles[i].selectorText ==".div_position_menu_one")   //rest of the items
                        {
                            if(navigator.userAgent.indexOf('Mac') != -1)
                            {
                                reg.style.margin="7px 0px 0px 4px";
                            }
                            else
                            {
                                reg.style.margin="6px 0px 0px 4px";
                            }
                        }

                        if(myRules_styles[i].selectorText ==".spacer_menu")
                        {
                            if(navigator.userAgent.indexOf('Mac') != -1)
                            {
                                reg.style.margin="7px 0px 0px -2px";
                            }
                            else
                            {
                                reg.style.margin="6px 0px 0px -8px";
                            }
                        }
                    }
            }
        }
        else if(navigator.userAgent.toLowerCase().indexOf("netscape") != -1)
        {
        var k=0;
        var i=0;
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {

                    myRules_styles = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {

                        reg=myRules_styles[i];
                        if(myRules_styles[i].selectorText ==".div_position_menu_trhee") //vitamints item
                        {
                            reg.style.margin="6px 0px 0px 3px";
                        }

                        if(myRules_styles[i].selectorText ==".div_position_menu_two")   //view item
                        {
                                reg.style.margin="6px 0px 0px 3px";
                        }

                        if(myRules_styles[i].selectorText ==".div_position_menu_one")   //rest of the items
                        {
                            reg.style.margin="6px 0px 0px -4px";
                        }
                    }
            }
        }
        else if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
        {
            var k=0;
            var i=0;
            for(k=0;k<parseInt(document.styleSheets.length);k++)
            {
                myRules_styles = document.styleSheets[k].cssRules;
                    for (i=0; i<document.styleSheets[k].cssRules.length; i++)
                    {

                        reg=myRules_styles[i];

                        if(myRules_styles[i].selectorText ==".div_position_menu_trhee") //vitamints item
                        {
                            reg.style.margin="6px 0px 0px 5px";
                        }

                        if(myRules_styles[i].selectorText ==".div_position_menu_two")   //view item
                        {
                            reg.style.margin="7px 0px 0px 0px";
                        }

                        if(myRules_styles[i].selectorText ==".div_position_menu_one")   //rest of the items
                        {
                                reg.style.margin="6px 0px 0px -2px";
                        }
                    }
            }
        }
    else
        {

        var k=0;
        var i=0;
        for(k=0;k<parseInt(document.styleSheets.length);k++)
        {
            myRules_styles = document.styleSheets[k].rules;

            for (i=0; i<document.styleSheets[k].rules.length; i++)
            {
                reg=myRules_styles[i];
                if(myRules_styles[i].selectorText ==".div_position_menu_trhee") //vitamints item
                {
                    reg.style.margin="6px 0px 0px 5px";
                }

                if(myRules_styles[i].selectorText ==".div_position_menu_two")   //view item
                {
                    reg.style.margin="7px 0px 0px 5px";
                }

                if(myRules_styles[i].selectorText ==".div_position_menu_one")   //rest of the items
                {
                    reg.style.margin="6px 0px 0px 1px";
                }
            }
        }
    }

}

/*This script is for correct resolutions in 1024*768 End*/

/* to open the Sample military window, Context path should be sent from JSP as input */
function openMilitaryWindow(context){
    window.open("/account/military-address-popup.jsp","MilitaryWindow","scrollbars=1,menubar=0,resizable=0,width=766,height=700");
}

function openRememberMeWindow(context){
    window.open(context+"/account/rememberme-faqs-popup.jsp","MilitaryWindow","scrollbars=1,menubar=0,resizable=0,width=766,height=700");
}

function openSmsPolicy(context){
    window.open(context+"/account/popup/smspolicy_window.jsp","MilitaryWindow","scrollbars=1,menubar=0,resizable=0,width=766,height=700");
}

function openGateWayPage(link,id,context) {
		window.open(link);
}


function openTransferredPrescriptionsWindowFromURL(url){
    window.open(url,"TransferredWindow","scrollbars=1,menubar=0,resizable=0,width=766,height=700");
}

function storeCircular(storeId)
{
	//Modified to new Weekly Ad Page
	$.ajax({
		url: "/rest/bean/cvs/store/CvsStoreLocatorServices/getAddStoreToFavoriteList",
		type: "POST",
		data: {
				"storeId": storeId,
			},
		dataType: "JSON",
		success: function( json ){
			if( json.atgResponse ){
				if( json.atgResponse.sc === "00" ){

					window.location.href = "/weeklyad/browse/browse-home.jsp#Browse";
				}
			}
		},

	});

    //window.open("http://weeklyad.cvs.com/cvs/new_user_entry.aspx?action=entryflash&storeref="+storeId,"StoreCircular","");
}

function storeCircularWithZipCode()
{
	//Modified to new weekly Ad page
	window.open("/weeklyad/browse/browse-home.jsp#Browse","");
    //var zipcode=document.getElementById('address1').value;
    //window.open("http://weeklyad.cvs.com/cvs/new_user_entry.aspx?action=entryflash&citystatezip="+zipcode,"StoreCircular","");
}

function storeCircularInRx()
{
	//Modified to new weekly Ad page
	window.open("/weeklyad/browse/browse-home.jsp#Browse","");
   // var zipcode=document.getElementById('address2').value;
   // window.open("http://weeklyad.cvs.com/cvs/new_user_entry.aspx?action=entryflash&citystatezip="+zipcode,"StoreCircular","");
}

// For Registration Changes
function checkValues(x)
{
	var pass_text=document.getElementById(x).value;
	var pass_text_array=new Array();
	pass_text_array=pass_text.split("");
	var char_presence=false,number_presence=false;
	var pass_text_len=false;
	var index=0;
	var empty=false;
	if(pass_text_array.length==0)
	{
		document.getElementById("lenin").style.display="block";
		document.getElementById("charin").style.display="block";
		document.getElementById("numin").style.display="block";
		document.getElementById("lentr").style.display="none";
		document.getElementById("chartr").style.display="none";
		document.getElementById("numtr").style.display="none";
		document.getElementById("lenfa").style.display="none";
		document.getElementById("charfa").style.display="none";
		document.getElementById("numfa").style.display="none";
		empty=true;
	}
	else
	{
		document.getElementById("lenin").style.display="none";
		document.getElementById("charin").style.display="none";
		document.getElementById("numin").style.display="none";
	}
	if(pass_text_array.length>6)
	{
		pass_text_len=true;
	}
	for(index=0;index<pass_text_array.length;index++)
	{
		var asc=pass_text_array[index].charCodeAt(0);
		if(asc>=97 && asc<=122)
		{
			char_presence=true;
		}
		else if(asc>=65 && asc<=90)
		{
			char_presence=true;
		}

		if(asc>=48 && asc<=57)
		{
			number_presence=true;
		}
	}
	if(empty!=true)
	{
		if(pass_text_len==true)
		{
			document.getElementById("lenfa").style.display="none";
			document.getElementById("lentr").style.display="block";
		}
		else
		{
			document.getElementById("lenfa").style.display="block";
			document.getElementById("lentr").style.display="none";
		}
		if(number_presence==true)
		{
			document.getElementById("numtr").style.display="block";
			document.getElementById("numfa").style.display="none";
		}
		else
		{
			document.getElementById("numtr").style.display="none";
			document.getElementById("numfa").style.display="block";
		}
		if(char_presence==true)
		{
			document.getElementById("chartr").style.display="block";
			document.getElementById("charfa").style.display="none";
		}
		else
		{
			document.getElementById("chartr").style.display="none";
			document.getElementById("charfa").style.display="block";
		}
	}
	if(empty!=true) {
		if(pass_text_len == true && number_presence == true && char_presence == true){
			document.getElementById("confirmPassword").title = "confirm password";
		} else {
			document.getElementById("confirmPassword").title = "go back to enter new password. the password you entered does not meet requirements";
		}
	}
}
/* Commented by RAM to Remove M/C port number / Server Name from UI - Start   */
/*
function appInstanceAndTS(server,port)
{
    var myServerResult = server.split(".");
    document.write('<font size="2" face="Arial"><B>' + myServerResult[0] + ":" + port + "@" +'</B></font>');
    Stamp = new Date();
    year = Stamp.getYear();
    if (year < 2000) year = 1900 + year;
    document.write('<font size="2" face="Arial"><B>' + (Stamp.getMonth() + 1) +"/"+Stamp.getDate()+ "/"+ year + " " +'</B></font>');
    var Hours;
    var Mins;
    Hours = Stamp.getHours();
    Mins = Stamp.getMinutes();
    if (Mins < 10) {
    Mins = "0" + Mins;
    }
    document.write('<font size="2" face="Arial"><B>' + Hours + ":" + Mins + '</B></font>');

}*/
/* Commented by RAM to Remove M/C port number / Server Name from UI - End   */

/* Chay - function that allows Hover and Focus in IE6 - used in new global header - 09/30/2009
	HoverFocus = function () {
		if (document.getElementById("nav")) {
			var listitemshover = document.getElementById("nav").getElementsByTagName("li");
			for (var i = 0; i < listitemshover.length; i++) {
				listitemshover[i].onmouseover = function () {
					this.className += " hover";
				var selects = document.getElementsByTagName("select");
					for (var j = 0; j < selects.length; j++) {
						selects[j].className = "hidden";
					};
				};
				listitemshover[i].onmouseout = function () {
					this.className = this.className.replace(new RegExp(" hover\\b"), "");
					var selects = document.getElementsByTagName("select");
					for (var j = 0; j < selects.length; j++) {
						selects[j].className = "";
					};
				};
			};
			var links = document.getElementsByTagName("a");
			for (var j = 0; j < links.length; j++) {
				links[j].onfocus = function () {
					this.className += " focus";
				};
				links[j].onblur = function () {
					this.className = this.className.replace(new RegExp(" focus\\b"), "");
				};
			};
		}
	};
	if (window.attachEvent) {
		window.attachEvent("onload", HoverFocus);
	};
*/

/*FlushBuffer functins for AJAX
*/
function prepareBuffer()
{
    var objNew = document.createElement('p');
    var objHidden = document.createElement('input');

    objHidden.setAttribute('type', 'hidden');
    objHidden.setAttribute('value', '1');
    objHidden.setAttribute('id', 'virtualbufferupdate');
    objHidden.setAttribute('name', 'virtualbufferupdate');

    objNew.appendChild(objHidden);
    document.body.appendChild(objNew);
}

function updateBuffer()
{
    var objHidden = document.getElementById('virtualbufferupdate');

    if (objHidden)
    {
        if (objHidden.getAttribute('value') == '1')
            objHidden.setAttribute('value', '0');
        else
            objHidden.setAttribute('value', '1');
    }
}

function isNumeric(evt)
  {
		 var num = (evt.which) ? evt.which : event.keyCode
		 if (num > 47&& num < 58)
			return true;
		 return false;
  }

function changeToBoldString(divId)
{
	var newLiHtml = document.getElementById(divId).innerHTML;
	newLiHtml = replaceCharacters(newLiHtml,'Please note:','<b>Please note:</b>');
	document.getElementById(divId).innerHTML = newLiHtml;
}
function doAddMedicationLineForInstorePickup() {
	setPatientPhoneNoOnLoad();
	document.getElementById("resetInfo").value=false;
	document.getElementById('addNewMedication').click();
}
function doAddMedicationLineForMultiPatient(patientIndex) {
	setPatientPhoneNoOnLoad();
	document.getElementById("patientIndex").value = patientIndex;
	document.getElementById("resetInfo").value=false;
	document.getElementById('addAnotherMedicationForPatient').click();
}
function doMedicationSearch(idx) {
	openMedicationSearchForm('medname' + idx);
}
function doRemoveMedicationLine(index) {
	setPatientPhoneNoOnLoad();
	document.getElementById("removeIndex").value = index;
	document.getElementById("resetInfo").value=false;
	document.getElementById('removeSelectedMedication').click();
}
function doRemoveMedicationLineForHD(index) {
	document.getElementById("removeIndex").value = index;
	document.getElementById("resetInfo").value=false;
	document.getElementById('removeSelectedMedication').click();
}
function doRemoveMedicationLineForMultiPatient(patientIndex, medIndex) {
	setPatientPhoneNoOnLoad();
	document.getElementById("patientIndex").value = patientIndex;
	document.getElementById("removeIndex").value = medIndex;
	document.getElementById("resetInfo").value=false;
	document.getElementById('removeSelectedMedicationForMultiPatient').click();
}
function doRemoveMultiPatient(patientIndex) {
	setPatientPhoneNoOnLoad();
	document.getElementById("patientIndex").value = patientIndex;
	document.getElementById("resetInfo").value=false;
	document.getElementById('removeMultiPatient').click();
}
function submitToTransferPatient() {
	var phNo = document.getElementById("patientPhone1").value + "-" + document.getElementById("patientPhone2").value + "-" + document.getElementById("patientPhone3").value;
	document.getElementById("patientPhoneNumber").value = phNo;
	document.getElementById("resetInfo").value=false;
	document.getElementById('transferPatientInfo').click();
}
function clearPopulatedValues() {
	document.getElementById("patientFirstName").value="";
	document.getElementById("patientLastName").value="";
	document.getElementById("patientInitial").value="";
	document.getElementById("dob_month").value="month";
	document.getElementById("dob_day").value="day";
	document.getElementById("dob_year").value="year";
	document.getElementById("childResistantPackaging").checked=false;
	document.getElementById("resetInfo").value=false;
	document.getElementById("initMedication").click();
}
function addAnotherPatient() {
	setPatientPhoneNoOnLoad();
	document.getElementById("resetInfo").value=false;
	document.getElementById('addAnotherPatient').click();
}
function setPatientPhoneNoOnLoad() {
	var phNo = document.getElementById("patientPhone1").value + "-" + document.getElementById("patientPhone2").value + "-" + document.getElementById("patientPhone3").value;
	document.getElementById("patientPhoneNumber").value = phNo;
}

function resizeIframe(element, size)
{
	$(element).css({height: size});
}



function closeOverlayFromIframe(args)
{
	if (args.reload != "true")
	{
		$("a#overlayClose").click();
	} else
	{
		window.top.location.reload();
	}
}

function redirectToPage(url)
{
	window.location.replace(url);
}

function resizeIframeOverlay(size)
{
	$("#overlayFrame").css({height: size});
}

function repositionOverlay(){

	var	windowWidth = $(window).width();
	var	windowHeight = $(window).height();
	var $cvsOverlay = $("#cvs-overlay");
	var overlayHeight = $cvsOverlay.height();

	var newPosition = windowHeight/2 - overlayHeight/2;
	$($cvsOverlay).animate({top: newPosition}, 250);
}

function adjust_iframe(h) {
	//alert('height1 '+ h);
    if(h==0)
    h=500;
    else
    h=h+5;

    $("#overlayFrame").css({'height': h});
    //window.scrollTo(0,0);

}


function clearSearchBox(searchboxfield)
{
/* 13 FEB 2013- Added for CR02515 to Persist Search Term When User Clicks Back Into Search Field---STARTS */

if(searchboxfield=="searchbox")
{
	if(document.getElementById('searchbox').value==("Search"))
		document.getElementById('searchbox').value = "";

}
/* 13 FEB 2013-Added for CR02515 to Persist Search Term When User Clicks Back Into Search Field---ENDS */
if(searchboxfield=="noTextSuggestions")
	document.getElementById('noTextSuggestions').value = "";

if(searchboxfield=="drugNoTextSuggestions")
	document.getElementById('drugNoTextSuggestions').value = "";

if(searchboxfield=="pharmacyNoTextSuggestions")
	document.getElementById('pharmacyNoTextSuggestions').value = "";

if(searchboxfield=="drugTextSuggestions")
	document.getElementById('drugTextSuggestions').value = "";
/*27 AUG 2013 -Added for CR03089 Search mechanism to identify controlled substance in Prescription information--STARTS*/
if(searchboxfield.substring(0,7)=="medname")
{
	if(document.getElementById(searchboxfield).value == "Type the first 3 letters of your medication")
	{
	document.getElementById(searchboxfield).value = "";
	document.getElementById(searchboxfield).style.fontStyle="";
	}

}
/*27 AUG 2013 -Added for CR03089 Search mechanism to identify controlled substance in Prescription information--ENDS*/
}

var OAS_listpos;
var OAS_sitepage;
var OAS_query;
var OAS_query_endeca;

function addtolist(pos,page) {

	if (OAS_listpos==null || OAS_listpos=="")
	{
		OAS_listpos=pos;
		if(page!=null&&page!='')
		{
			OAS_sitepage=page;
		}
	}
	else
		OAS_listpos=OAS_listpos+","+pos;

}

function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

   return true;
}
$(document).ready(function(){

	//Scrollable code for jquery scrollable
	$(".cvsScrollable").scrollable({});
	//End scrollable


	/*Tool tip code*/
	$('.cvs-tooltip .close').click(function() {
		$(this).parent().hide();
	});

	$('.tt-red-right-trig').tooltip({relative:true,position: 'center right',tipClass: 'tt-red-right',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-red-top-trig').tooltip({position: 'top center',tipClass: 'tt-red-top',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-red-bottom-trig').tooltip({position: 'bottom center',tipClass: 'tt-red-bottom',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-red-left-trig').tooltip({position: 'center left',tipClass: 'tt-red-left',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});

	$('.tt-blue-right-trig').tooltip({relative:true,position: 'center right',tipClass: 'tt-blue-right',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-blue-top-trig').tooltip({relative:true,position: 'top center',tipClass: 'tt-blue-top',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-blue-bottom-trig').tooltip({relative:true,position: 'bottom center',tipClass: 'tt-blue-bottom',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-blue-left-trig').tooltip({relative:true,position: 'center left',tipClass: 'tt-blue-left',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});

	$('.tt-red-right-trig,.tt-red-top-trig,.tt-red-bottom-trig,.tt-red-left-trig,.tt-blue-right-trig,.tt-blue-top-trig,.tt-blue-bottom-trig,.tt-blue-left-trig').click(function() {
		$(this).next().toggle();
	});

	$('#forgotPasswordLink').click(function() { window.location.href="/account/forgot_password.jsp";});
	if($('#tryAgainLink').length){
		$('#login_val #tryAgainLink').click(function(){if($('#login_new').length){$("#login_new").focus();}});

		$('#tryAgainLink').click(function(){if($('#userId').length){$("#userId").focus();}});
		$('#tryAgainLink').click(function(){if($('#promoSignin #signinRxEmailId').length){$("#signinRxEmailId").focus();}});
	}

	if($('#weeklyadSigninInterrupter #tryAgainLink').length ){
		$('#tryAgainLink').click(function(){if($('#login').length){$("#login").focus();}});
	}

	if($('#tryAgainLink').length ){
		$('#tryAgainLink').click(function(){if($('#forgot_pass_val #login_new').length){$("#login_new").focus();}});
	}

});

function removeClass(id){
	$(document).ready(function(){
		var idToRemoveClass = "#"+id;
		$(idToRemoveClass).removeClass("overlay");
		//alert($(idToRemoveClass));
	});
}

$(document).ready(function(){

	//Scrollable code for jquery scrollable
	$(".cvsScrollable").scrollable({});
	//End scrollable


	/*Tool tip code*/
	$('.cvs-tooltip .close').click(function() {
		$(this).parent().hide();
	});

	$('.tt-red-right-trig').tooltip({relative:true,position: 'center right',tipClass: 'tt-red-right',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-red-top-trig').tooltip({position: 'top center',tipClass: 'tt-red-top',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-red-bottom-trig').tooltip({position: 'bottom center',tipClass: 'tt-red-bottom',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-red-left-trig').tooltip({position: 'center left',tipClass: 'tt-red-left',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});

	$('.tt-blue-right-trig').tooltip({relative:true,position: 'center right',tipClass: 'tt-blue-right',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-blue-top-trig').tooltip({relative:true,position: 'top center',tipClass: 'tt-blue-top',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-blue-bottom-trig').tooltip({relative:true,position: 'bottom center',tipClass: 'tt-blue-bottom',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});
	$('.tt-blue-left-trig').tooltip({relative:true,position: 'center left',tipClass: 'tt-blue-left',	events: {def: 'click,""',tooltip: '"","mouseout"'},	onShow: function(){ var tip = this.getTip(); tip.show();}});

	$('.tt-red-right-trig,.tt-red-top-trig,.tt-red-bottom-trig,.tt-red-left-trig,.tt-blue-right-trig,.tt-blue-top-trig,.tt-blue-bottom-trig,.tt-blue-left-trig').click(function() {
		$(this).next().toggle();
	});

});

function removeClass(id){
	$(document).ready(function(){
		var idToRemoveClass = "#"+id;
		$(idToRemoveClass).removeClass("overlay");
		//alert($(idToRemoveClass));
	});
}

(function( $ ){
		var sort_order = 1;
		var sorting_type = '';
		var column_index = '';
		var methods = {
			sort_rows : function( a, b ) {
				a_val = $(a).children("td").eq(column_index).html();
				b_val = $(b).children("td").eq(column_index).html();
				 switch (sorting_type){
					case "sort-integer":
					  a_val = parseInt(a_val);
					  b_val = parseInt(b_val);
					  break;
					case "sort-float":
					  a_val = parseFloat(a_val);
					  b_val = parseFloat(b_val);
					  break;
					case "sort-date":
					  a_val = new Date(a_val);
					  b_val = new Date(b_val);
					  break;
				 }
				 return (a_val > b_val) ? sort_order :(a_val < b_val)? -sort_order : 0;
			}
		}

		$.fn.sortTable = function( options ) {


			element_id = this.attr("id");
			$("#"+element_id+" th.sort-integer, th.sort-date, th.sort-float, th.sort-string").bind("click", function() {
					sort_order = 1;
					column_index = $("#"+element_id+" th").index($(this));
					//tracing the type of sorting
					if( $(this).hasClass("sort-integer") ) sorting_type = "sort-integer";
					if( $(this).hasClass("sort-date") ) sorting_type = "sort-date";
					if( $(this).hasClass("sort-float") ) sorting_type = "sort-float";
					if( $(this).hasClass("sort-string") ) sorting_type = "sort-string";

					if( $(this).hasClass("asc") ) {
						sort_order = -1; //for decending order
						$(this).removeClass("asc");
						$(this).addClass("dsc");
					} else {
						sort_order = 1;  //for ascending order
						$(this).removeClass("dsc");
						$(this).addClass("asc");
					}

					var unsorted_rows = new Array();
					rows_counter = 0;
					$("#"+element_id+" tr").each( function( index ) {
						if( index > 0 ) {
							unsorted_rows[rows_counter] = $(this).clone();
							rows_counter++;
						}
					});

					//apply sorting
					unsorted_rows.sort( methods[ 'sort_rows' ] );

					rows_counter = 0;
					$("#"+element_id+" tr").each( function( index ) {
						   if( index > 0 ) {
							   $(this).replaceWith(unsorted_rows[rows_counter]);
							   rows_counter++;
						   }
					});
			});



		}
})( jQuery );



/* Placeholder Text Functions*/
function initializePlaceholders(pForm){

	var fields = $(pForm).find("input[type='text']");
	$.each(fields, function(idx, el){

		var fieldPHTxt = $(el).attr("data-placeholder");
		if (!$(el).val())
		{
			$(el).val(fieldPHTxt);
		}
	});

	/* on focus remove the placeholder value */
	$(fields).focus(function () {
	    if ($(this).val() == $(this).attr('data-placeholder')) {
	        $(this).val('');
	    }
	});

	/* on blur if emply, set the placeholder value back */
	$(fields).blur(function () {
	    if ($(this).val() == '') {
	        $(this).val($(this).attr('data-placeholder'));
	    }
	});

	/* Placeholder for Password fields. The password field of type=password in the html should have a class "passwordtag" to add placeholder through this javascript*/
	$(pForm).find(".passwordtag").each(function(idx, el){
		if (!$(el).val()){
			$(el).after("<input id='plhPassword" + idx + "' type='text' value='Enter Your Password' class='password-placeholder' />");
			$(".password-placeholder").show();
			$(pForm).find(".passwordtag").hide();
		}
	});

	/* on focus remove the placeholder value */
	$(".password-placeholder").focus(function() {
        $(this).hide();
        $(this).prev().show().focus();
    });

	/* on blur if emply, set the placeholder value back */
    $(".passwordtag").blur(function() {
        if($(this).val() == "") {
            $(this).next().show();
            $(this).hide();
        }
    });

}

var MP = {
<!-- mp_trans_disable_start -->
  Version: '1.0.23',
  Domains: {'es':'es.cvs.com'},
  SrcLang: 'en',
<!-- mp_trans_disable_end -->
  UrlLang: 'mp_js_current_lang',
  SrcUrl: decodeURIComponent('mp_js_orgin_url'),
<!-- mp_trans_disable_start -->
  init: function(){
    if (MP.UrlLang.indexOf('p_js_')==1) {
      MP.SrcUrl=window.top.document.location.href;
      MP.UrlLang=MP.SrcLang;
  }
},
getCookie: function(name){
  var start=document.cookie.indexOf(name+'=');
  if(start < 0) return null;
  start=start+name.length+1;
  var end=document.cookie.indexOf(';', start);
  if(end < 0) end=document.cookie.length;
  while (document.cookie.charAt(start)==' '){ start++; }
  return decodeURIComponent(document.cookie.substring(start,end));
},
setCookie: function(name,value,path,domain){
  var cookie=name+'='+encodeURIComponent(value);
  if(path)cookie+='; path='+path;
  if(domain)cookie+='; domain='+domain;
  var now=new Date();
  now.setTime(now.getTime()+1000*60*60*24*365);
  cookie+='; expires='+now.toUTCString();
  document.cookie=cookie;
},
switchLanguage: function(lang){
  if(lang!=MP.SrcLang){
    var script=document.createElement('SCRIPT');
    script.src=location.protocol+'//'+MP.Domains[lang]+'/'+MP.SrcLang+lang+'/?1023749632;'+encodeURIComponent(MP.SrcUrl);
	document.body.appendChild(script);
  } else if(lang==MP.SrcLang && MP.UrlLang!=MP.SrcLang){
    var script=document.createElement('SCRIPT');
	script.src=location.protocol+'//'+MP.Domains[MP.UrlLang]+'/'+MP.SrcLang+MP.UrlLang+'/?1023749634;'+encodeURIComponent(location.href);
	document.body.appendChild(script);
  }
  return false;
},
switchToLang: function(url) {
  window.top.location.href=url;
}
<!-- mp_trans_disable_end -->
};

/*number field should not allow alphanumeric and special characters - validation script*/

jQuery(function($) {
	  $(".numVal").onlyDigits();
	});

jQuery.fn.onlyDigits = function() {
    var k;
    // little trick just in case you want use this:
    $('<span></span>').insertAfter(this);
    var $dText = $(this).next('span').hide();
    // Really cross-browser key event handler
    function Key(e) {
        if (!e.which && ((e.charCode ||
        e.charCode === 0) ? e.charCode: e.keyCode)) {
        e.which = e.charCode || e.keyCode;
        } return e.which; }
    return $(this).each(function() {
        $(this).keydown(function(e) {
            k = Key(e);
            return (
            // Allow CTRL+V , backspace, tab, delete, arrows,
            // numbers and keypad numbers ONLY
            ( k == 86 && e.ctrlKey ) || (k == 224 && e.metaKey) || k == 8 || k == 9 || k == 46 || (k >= 37 && k <= 40 && k !== 32 ) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105));
        }).keyup(function(e) {
            var value = this.value.replace(/\s+/,'-');
            // Check if pasted content is Number
            if (isNaN(value)) {
                // re-add stored digits if CTRL+V have non digits chars
                $(this).val($dText.text());
            } else { // store digits only of easy access
                $dText.empty().append(value);
            }
        });
    });
};







//--------------------------------------------------------------------------------------------------------------------
//------------------- Store Locator ----------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
var CVSJS = CVSJS || {};
window.CVSJS.StoreLoc = window.CVSJS.StoreLoc || {};

CVSJS.StoreLoc.Data = {
    stores: [],
    favstores: [],
    mystore: {}
};

CVSJS.StoreLoc.Globals = {
    changeStoreAlert: false,
    myCvsSpuInd: "",
    myStoreId: "",
};

CVSJS.StoreLoc.Defaults = {
    bingMapKey: ''
}


CVSJS.StoreLoc.Global = {
    getJSON: function( serviceurl, requestData, requestType ){
        var returnjson = "";

        var type = requestType ? requestType : "POST";

        $.ajax({
            url: "/rest/bean" + serviceurl,
            async: false,
            type: type,
            data: requestData,
            dataType: "json",
            success: function( json ){
                if( json.atgResponse ){
                    if( json.atgResponse.sc === "00" ){
                        returnjson = json.atgResponse;
                     }else{
                        returnjson = { error: json.atgResponse.sc };
                     }
                }else{
                    returnjson = { error: "500" };
                }
            },
            error: function(xhrObj, errorType, errorThrown){
                if(errorType == "timeout"){
                    returnjson = { error: "999" };
                }else{
                    returnjson = { error: "500" };
                }
            }
        });

        return returnjson;
    }
}


CVSJS.StoreLoc.ErrorMsgs = {
    sAddStoreFavorite:      "we were unable to add your store favorite",
    sGetFavoriteStores:     "we were unable to retrieve your favorite stores",
    sChangeStoreError:      "there was an issue processing your request. ",
    sSearchStoreNone:       "there are currently no stores that match the location and/or services you selected.",
    sSearchStoreNoInfo:     "Please enter a ZIP Code, City and State, Street Address or Store Number.",
    sChangeStoreAlert:      "Please note before changing myCVS store: Store pickup items already in your basket may not be available at the new store you select.",
    solTryAgain:            "Please try again.",
    sSorry:                 "Sorry, ",
}

CVSJS.StoreLoc.ErrorMsgs.build = function( context, solution, errCode ){
    var usrCode
    if(errCode && errCode != "99"){
        if(errCode === "999"){ //timeout
            usrCode = "[E1]";
        }else if(errCode === "500"){
            usrCode = "[E2]";
        }else{
            usrCode = "[E3]";
        }
        return "Sorry, " + context + ". " + solution + " " + usrCode;
    }
    return "";
}


CVSJS.StoreLoc.Services = {
    URL: {
        //Store Locator
        getStores: "/cvs/store/CvsStoreLocatorServices/getSearchStore",
        setFavoriteStore: "/cvs/store/CvsStoreLocatorServices/getAddStoreToFavoriteList",
        getFavoriteStores: "/cvs/store/CvsStoreLocatorServices/getFavoriteStores",
        getStoreDetails: "/cvs/store/CvsStoreLocatorServices/getStoreIdDetails",
        getStoreInfoById: "/cvs/store/CvsStoreLocatorServices/getStoreInfoById",
    },
    //Store Locator
    getBingResults: function( queryData, suggest, callback ){
        var returnData = "";
        var countryRegion = 'US';
        var intRegex = /^\d+$/;
        var searchString = $.trim(queryData);

        CVSJS.StoreLoc.Services.getBingKey();

        if(intRegex.test(searchString)){
            if(searchString.length < 6){
                var trimmedStr = searchString.replace(/^0+/, "");
                if(trimmedStr.length === 3){
                    searchString = trimmedStr;
                }
            }

            if(suggest) {
                // setup "did you mean store #xxxx" search option
                if (searchString.length <= 5) {
                    var checkStoreId = CVSJS.StoreLoc.Services.getStoreDetails(searchString);
                    if (checkStoreId && checkStoreId.sm != null) {
                        var suggestStoreId = 'Did you mean Store <strong>#' + trimmedStr + '</strong>? <a class="searchtermlink" href="#" data-storeid="' + trimmedStr + '" title="View details for this store">View details for this store.</a>';
                        $('#suggestStoreId').html(suggestStoreId).show();
                    }
                }
            }

            if(searchString.length === 1 || searchString.length === 2){
                if(searchString.length === 1){
                    searchString = "0000" + searchString;
                }else if(searchString.length === 2){
                    searchString = "000" + searchString;
                }
            }else if(searchString.length === 3){
                searchString = "00" + searchString;
                countryRegion = "PR";
            }else if(searchString.length === 4){
                searchString = "0" + searchString;
            }
        }
        var bingprotocol = window.location.protocol;
        var restprotocol = "http:";
        if (bingprotocol != null && bingprotocol != "" && bingprotocol === "https:"){
            restprotocol = "https:";
        }

        var bingURL = restprotocol+"//dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(searchString) + "," + countryRegion + "&output=json&key=" + CVSJS.StoreLoc.Defaults.bingMapKey + "&$filter=Cvs_Store_Flag%20Eq%20'Y'" + "&jsonp=?";

        $.getJSON( bingURL, function( data ){
            if(data && data.resourceSets.length > 0 && data.statusCode == "200"){
                return callback(data.resourceSets[0].resources, searchString, data.resourceSets[0].estimatedTotal);
            }else{
                return callback([], searchString, 0);
            }
        }).fail(function(){
            return callback([], searchString, 0);
        });

    },
    getStores: function( reqData ){
        var data = CVSJS.StoreLoc.Global.getJSON( CVSJS.StoreLoc.Services.URL.getStores, reqData );
        if(data && data.sd){
            CVSJS.StoreLoc.Data.stores = data.sd;
        }else if(data && data.error){
            CVSJS.StoreLoc.Data.stores=[];
        }else{
            CVSJS.StoreLoc.Data.stores=[];
        }
    },
    setFavoriteStore: function( reqData ){
        var data = CVSJS.StoreLoc.Global.getJSON( CVSJS.StoreLoc.Services.URL.setFavoriteStore, reqData );
        if(data && data.sd){
            CVSJS.StoreLoc.Data.mystore = data.sd;
            return CVSJS.StoreLoc.Data.mystore.id;
        }else if(data && data.error){
            CVSJS.StoreLoc.Helper.growl(data.error, CVSJS.StoreLoc.ErrorMsgs.build(CVSJS.StoreLoc.ErrorMsgs.sAddStoreFavorite, CVSJS.StoreLoc.ErrorMsgs.solTryAgain, data.error));
        }
    },
    getFavoriteStores: function( reqData ){
        var data = CVSJS.StoreLoc.Global.getJSON( CVSJS.StoreLoc.Services.URL.getFavoriteStores, reqData );
        if(data && data.sd){
            CVSJS.StoreLoc.Data.favstores = data.sd;
            CVSJS.StoreLoc.Data.mystore = _.find(data.sd, function(store){ return store.id === data.ds; });
            return true;
        }else if(data && data.error){
            return false;
        }
    },
    getStoreDetails: function(storeId) {
        var data = CVSJS.StoreLoc.Global.getJSON( CVSJS.StoreLoc.Services.URL.getStoreDetails, {storeId: storeId});
        return data;
    },
    getBingKey: function() {
        CVSJS.StoreLoc.Defaults.bingMapKey = $('#cvs-overlay .bingkey').data('bingmapskey');
    }
}


CVSJS.StoreLoc.Helper = {
    growl: function(code, message, sticky, life){
            alert('Error occured! ' + code + ' ' + message );
    },
    changeStoreError: function(error) {
        $('#cvs-overlay .storeselectorerror').html(error);
        console.log($('#cvs-overlay .storeselectorerror').html());
    }
}


CVSJS.StoreLoc.StoreLocator = {
    load: function( evElem ){
        CVSJS.StoreLoc.Services.getFavoriteStores();
        CVSJS.StoreLoc.StoreLocator.render();

        $('#cvs-overlay .details #btnFindStores').live('click', function(evElem) {
            CVSJS.StoreLoc.StoreLocator.findstores(evElem);
            utag.link({ event_name:'BOPUS:StoreSelectorOverlay:FindaStore', event_category: 'BOPUS' });

        });
        $('.storeselectoverlaywrapper #iSearch').live('keypress keydown', function(evElem) {
            CVSJS.StoreLoc.StoreLocator.checkforenter(evElem);
        });
        $('#cvs-overlay .details .searchtermlink').live('click', function(evElem) {
            CVSJS.StoreLoc.StoreLocator.selectsearchterm(evElem);
        });
        $('#cvs-overlay .details .closesuggest').live('click', function(evElem) {
            evElem.preventDefault();
            CVSJS.StoreLoc.StoreLocator.hidesuggestsearch();
        });
        $('#cvs-overlay .details #aStartOver').live('click', function(evElem) {
            CVSJS.StoreLoc.StoreLocator.startover(evElem);
        });
        $('#cvs-overlay .details .shopstorelink').live('click', function(evElem) {
            var that = this;
            CVSJS.StoreLoc.StoreLocator.selectstore(that, evElem);
            utag.link({ event_name:'BOPUS:StoreSelectorOverlay:MakeThismyCVSStore', event_category: 'BOPUS' });
        });

    },
    clearError: function(){
        $("#cvs-overlay #formerrorswrapper").hide();
        $("#cvs-overlay #formerrorswrapper li").remove();
        $("#cvs-overlay .storeselectorerror").html('');
        return false;
    },
    toggleFindStoreBtn: function(){
        var actionBtn=$("#cvs-overlay #btnFindStores");
        if(actionBtn.is(":disabled")){
            actionBtn.removeAttr("disabled");
        }else{
            actionBtn.attr("disabled","disabled");
        }
    },
    showSpinner: function(){
        $("#cvs-overlay #suggestBoxHolderCont").hide();
        $("#cvs-overlay #dStoreResultsLoading").show();
        $("#cvs-overlay #dSearchResultsHdr").hide();
        $("#cvs-overlay #dFavStoresHdr").hide();
        $("#cvs-overlay #dStoreList").hide();
        return false;
    },
    showSearchResults: function(){
        $("#cvs-overlay #suggestBoxHolderCont").hide();
        $("#cvs-overlay #dStoreResultsLoading").hide();
        $("#cvs-overlay #dSearchResultsHdr").show();
        $("#cvs-overlay #dFavStoresHdr").hide();
        $("#cvs-overlay #dStoreList").show();
        return false;
    },
    showError: function () {
        $('#cvs-overlay #formerrorswrapper').show();
        $("#cvs-overlay #dStoreResultsLoading").hide();
        return false;
    },
    checkforenter: function(ev){
        if(ev.keyCode == 13){
            ev.preventDefault();
            utag.link({ event_name:'BOPUS:StoreSelectorOverlay:FindaStore', event_category: 'BOPUS' });
            CVSJS.StoreLoc.StoreLocator.findstores(ev);
            return false;
        }
    },
    startover: function(ev){
        ev.preventDefault();
        var renderedFavStores = CVSJS.StoreLoc.StoreLocator.renderFavStores()
        $('#cvs-overlay  #dStoreList').html(renderedFavStores);
        $("#cvs-overlay .storedt").hide(); //hiding the distance on favorite stores
        $("#cvs-overlay #dSearchResultsHdr, #cvs-overlay #suggestStoreId").hide();
        $("#cvs-overlay #dFavStoresHdr").show();
        return false;
    },
    hidesuggestsearch: function(){
        $("#cvs-overlay #suggestBoxHolderCont").hide();
        return false;
    },
    hideSuggestStoreId: function() {
        $('#cvs-overlay #suggestStoreId').hide();
        return false;
    },
    selectstore: function(btn, ev){
        ev.preventDefault();
        var storeId = $(btn).data('id');
        if(CVSJS.StoreLoc.Services.setFavoriteStore({ storeId: storeId, storeNamePrefix: 'myCVS Store #'}) ){
            if($('#isincheckout').length != 0) {
                window.location.href ='/checkout/fs/shoppingcart_items.jsp';
            } else {
                location.reload();
            }
        }
    },
    findstores: function( ev, lat, long ){
        CVSJS.StoreLoc.StoreLocator.tealiumChangeStoreViewed(CVSJS.StoreLoc.Globals.myCvsSpuInd, CVSJS.StoreLoc.Globals.myStoreId, 'SHOP: BOPUS: Store Selector Overlay: New Search', 'BOPUS');
        var $targetEl;
        if(ev.target){
            $targetEl = $(ev.target);
        }else if(window.event.srcElement){
            $targetEl = $(window.event.srcElement);
        }else{
            $targetEl = $(ev.target);
        }
        if($targetEl && $.trim($("#cvs-overlay #iSearch").val()) === ""){
            if(($targetEl.attr("id") === "btnFindStores" || $targetEl.attr("id") === "iSearch") || $targetEl.hasClass("findlink")){ //hasClass test is for Chrome
                CVSJS.StoreLoc.StoreLocator.renderErrorNoInfo();
            }
        }else{
            CVSJS.StoreLoc.StoreLocator.showSpinner();
            CVSJS.StoreLoc.StoreLocator.clearError();
            CVSJS.StoreLoc.StoreLocator.hidesuggestsearch();
            CVSJS.StoreLoc.StoreLocator.toggleFindStoreBtn(); // Disabling the Find Store button
            if( lat && long ){
                //We have lat/long from a clicked link in the suggest box
                //This shows up with longer search and displays addresses
                CVSJS.StoreLoc.Services.getStores({ latitude: lat, longitude: long });

                if(CVSJS.StoreLoc.Data.stores.length > 0){
                    $('#cvs-overlay #dSearchResultsHdrTxt').html('<span>Search Results For:</span><br/>');
                    $('#cvs-overlay #dStoreList').html('');
                    $.each( CVSJS.StoreLoc.Data.stores, function( index, value ) {
                        var storeEntry = CVSJS.StoreLoc.StoreLocator.renderStoreList(value);
                        $('#cvs-overlay #dStoreList').append(storeEntry);
                    });
                    CVSJS.StoreLoc.StoreLocator.showSearchResults();
                }else{
                    CVSJS.StoreLoc.StoreLocator.renderNoResults();
                }
            }else{
                //We only have a search term, send it to bing to get results
                CVSJS.StoreLoc.Services.getBingResults($("#cvs-overlay #iSearch").val(), true, function(bingResults, searchTerm, totalPlaces){
                    if (totalPlaces > 1)
                    {
                        var matchedaddress = false;
                        var appendHTML = "";

                        //This tests to see if Bing came back with a place name or an address, if so we use it
                        for(var i=0;i < bingResults.length;i++) {
                            if((i+1) < bingResults.length && bingResults[i].name==bingResults[i+1].name){
                                matchedaddress = true;
                                break;
                            }
                        }
                        for(var i=0;i<bingResults.length;i++)   {
                            if(matchedaddress){
                                if(bingResults[i].address.countryRegion === "United States" || bingResults[i].address.countryRegion === "Puerto Rico"){
                                    var address="";
                                    if(bingResults[i].address.formattedAddress != null){
                                        address = address + bingResults[i].address.formattedAddress;
                                    }
                                    if(bingResults[i].address.adminDistrict2 != null && address != ''){
                                        address = address + ', ' + bingResults[i].address.adminDistrict2;
                                    }else if(bingResults[i].address.adminDistrict != null){
                                        address = address+', ' + bingResults[i].address.adminDistrict;
                                    }
                                    appendHTML += "<li class=\"searchtermlink\"><a href='#' data-latitude='" + bingResults[i].point.coordinates[0] + "' data-longitude='" + bingResults[i].point.coordinates[1] + "' title='" + address + "'>" + address + "</a></li>";
                                }
                            } else {
                                if(bingResults[i].address.countryRegion === "United States" || bingResults[i].address.countryRegion === "Puerto Rico"){
                                    appendHTML += "<li class=\"searchtermlink\"><a href='#' data-latitude='" + bingResults[i].point.coordinates[0] + "' data-longitude='" + bingResults[i].point.coordinates[1] + "' title='" + bingResults[i].name + "'>" + bingResults[i].name + "</a></li>";
                                }
                            }
                        }
                        if(appendHTML != ""){
                            $("#cvs-overlay #suggestions ul").html(appendHTML);
                            $("#cvs-overlay #suggestBoxHolderCont").show();
                            $("#cvs-overlay #dStoreResultsLoading").hide();
                        }else{
                            CVSJS.StoreLoc.StoreLocator.renderNoResults();
                        }
                    }else if (totalPlaces === 1){
                        var validResult = false;
                        if(bingResults[0].address){
                            if(bingResults[0].address.postalCode){
                                if(bingResults[0].address.postalCode != $("#cvs-overlay #iSearch").val()){
                                    $("#cvs-overlay #iSearch").val(bingResults[0].address.formattedAddress);
                                }
                                validResult = true;
                            }else if(bingResults[0].name != "United States" && bingResults[0].name != "Puerto Rico"){
                                $("#cvs-overlay #iSearch").val(bingResults[0].address.formattedAddress);
                                validResult = true;
                            }
                        }
                        if( validResult ){
                            CVSJS.StoreLoc.Services.getStores({ latitude: bingResults[0].point.coordinates[0], longitude: bingResults[0].point.coordinates[1] });

                            if(CVSJS.StoreLoc.Data.stores.length > 0){
                                $('#cvs-overlay #dSearchResultsHdrTxt').html('<span>Search Results For:</span><br/>');
                                $('#cvs-overlay #dStoreList').html('');
                                $.each( CVSJS.StoreLoc.Data.stores, function( index, value ) {
                                    var storeEntry = CVSJS.StoreLoc.StoreLocator.renderStoreList(value);
                                    $('#cvs-overlay #dStoreList').append(storeEntry);
                                });
                                CVSJS.StoreLoc.StoreLocator.showSearchResults();

                            }else{
                                CVSJS.StoreLoc.StoreLocator.renderNoResults();
                            }
                        }else{
                            CVSJS.StoreLoc.StoreLocator.renderNoResults();
                        }
                    }else{
                        CVSJS.StoreLoc.StoreLocator.renderNoResults();
                    }
                });
            }
            CVSJS.StoreLoc.StoreLocator.toggleFindStoreBtn(); // Enabling the Find Store button
        }
        return false;
    },
    selectsearchterm: function(ev){
        ev.preventDefault();
        CVSJS.StoreLoc.StoreLocator.clearError();
        CVSJS.StoreLoc.StoreLocator.showSpinner();
        var $targetEl;
        if(ev.target){
            $targetEl = $(ev.target);
        }else if(window.event.srcElement){
            $targetEl = $(window.event.srcElement);
        }else{
            $targetEl = $(ev.target);
        }
        $('#cvs-overlay #dSearchResultsHdrTxt').html('<span>Search Results For:</span><br/>');
        if ($targetEl.data("storeid")) {
            var storeId = $targetEl.data("storeid");
            var storeDetails = CVSJS.StoreLoc.Services.getStoreDetails(storeId);
            if (storeDetails) {
                CVSJS.StoreLoc.StoreLocator.hideSuggestStoreId();
                CVSJS.StoreLoc.Data.stores = [];
                CVSJS.StoreLoc.Data.stores.push(storeDetails.sm);

                $('#cvs-overlay #dStoreList').html('');
                $.each( CVSJS.StoreLoc.Data.stores, function( index, value ) {
                    var storeEntry = CVSJS.StoreLoc.StoreLocator.renderStoreList(value);
                    $('#cvs-overlay #dStoreList').append(storeEntry);
                });
                $('#cvs-overlay #dChooseFavMsg').html('Details for CVS Store #' + storeId);
                if ($('#cvs-overlay #dSearchResultsHdr').css('display') === 'block'){
                    $('#cvs-overlay #dSearchResultsHdrTxt').html('Details for CVS Store #' + storeId);
                }else{
                    $('#cvs-overlay #dSearchResultsHdrTxt').html('<span>Search Results For:</span><br/>');
                }
                $('#cvs-overlay .storedistance').hide();
                CVSJS.StoreLoc.StoreLocator.showSearchResults();
            }
        } else {
            $("#cvs-overlay #iSearch").val($targetEl.html());
            CVSJS.StoreLoc.StoreLocator.findstores( ev, $targetEl.data("latitude"), $targetEl.data("longitude") );
        }
        CVSJS.StoreLoc.StoreLocator.hidesuggestsearch();
        return false;
    },
    renderErrorDiv: function(){
        var html= "<div id='formerrorswrapper'><div class='flxmsg_wrpper'><div class='topLeft_corner'></div><div class='topRight_corner'></div><div id='formerrors'><div class='errorPadd'><ol></ol></div></div><div class='bottomLeft_corner'></div><div class='bottomRight_corner'></div></div></div>";
        $('.storeselectoverlaywrapper').before(html);
    },
    renderNoResults: function(){
        if($("#cvs-overlay #formerrorswrapper").length == 0) {
            CVSJS.StoreLoc.StoreLocator.renderErrorDiv();
        }
        CVSJS.StoreLoc.StoreLocator.clearError();
        $("#cvs-overlay #dSearchResultsHdr").hide();
        $("#cvs-overlay #dFavStoresHdr").hide();
        $("#cvs-overlay #dStoreResultsLoading").hide();
        var errorMsg = CVSJS.StoreLoc.ErrorMsgs.sSorry + CVSJS.StoreLoc.ErrorMsgs.sSearchStoreNone;
        $("#cvs-overlay .storeselectorerror").show().html(errorMsg);
        CVSJS.StoreLoc.StoreLocator.tealiumChangeStoreError(errorMsg, 'SHOP: BOPUS: Store Selector Overlay: Error', 'BOPUS');
        return false;
    },
    renderErrorNoInfo: function() {
        if($("#cvs-overlay #formerrorswrapper").length == 0) {
            CVSJS.StoreLoc.StoreLocator.renderErrorDiv();
        }
        CVSJS.StoreLoc.StoreLocator.clearError();
        $("#cvs-overlay #dSearchResultsHdr").hide();
        $("#cvs-overlay #dFavStoresHdr").hide();
        $("#cvs-overlay #dStoreList").hide();
        $('#cvs-overlay #formerrorswrapper .errorPadd ol').html('<li>'+ CVSJS.StoreLoc.ErrorMsgs.sSearchStoreNoInfo + '</li>');
        CVSJS.StoreLoc.StoreLocator.tealiumChangeStoreError(CVSJS.StoreLoc.ErrorMsgs.sSearchStoreNoInfo, 'SHOP: BOPUS: Store Selector Overlay: Error', 'BOPUS');
        CVSJS.StoreLoc.StoreLocator.showError();
        return false;
    },
    renderErrorChangeAlert: function () {
        if(CVSJS.StoreLoc.Globals.changeStoreAlert) {
            if($("#cvs-overlay #formerrorswrapper").length == 0) {
                CVSJS.StoreLoc.StoreLocator.renderErrorDiv();
            }
            $('#cvs-overlay #formerrorswrapper .errorPadd ol').html('<li>'+ CVSJS.StoreLoc.ErrorMsgs.sChangeStoreAlert + '</li>');
            $('#cvs-overlay #formerrorswrapper').show();
            CVSJS.StoreLoc.StoreLocator.tealiumChangeStoreAlert();
        }

    },
    renderErrorGetFavStore: function() {
        if($("#cvs-overlay #formerrorswrapper").length == 0) {
            CVSJS.StoreLoc.StoreLocator.renderErrorDiv();
        }
        CVSJS.StoreLoc.StoreLocator.clearError();
        $("#cvs-overlay #dSearchResultsHdr").hide();
        $("#cvs-overlay #dFavStoresHdr").hide();
        $("#cvs-overlay #dStoreList").hide();
         $("#cvs-overlay .dModalContentBox").hide();
        $('#cvs-overlay #formerrorswrapper .errorPadd ol').html('<li>'+ CVSJS.StoreLoc.ErrorMsgs.sSorry + CVSJS.StoreLoc.ErrorMsgs.sChangeStoreError + CVSJS.StoreLoc.ErrorMsgs.solTryAgain + '</li>');
        CVSJS.StoreLoc.StoreLocator.showError();
        return false;
    },
    renderStoreList: function(store, index) {
        var storeEntry = '';
        storeEntry += '<div class="storedetails">';
        if(index == '0') {
            storeEntry +='<div class="currentstoremsg"><span class="mycvs">myCVS</span></div>';
        } else {
            storeEntry += '<div class="storedt"><span class="not-bold">' + store.dt +' mi</span></div>';
        }
        storeEntry += '<div class="srAddress">' + store.ad +'<br>' + store.ci +', ' + store.st +' ' + store.zp +'<br><span class="not-bold">' + store.ph +' | Store #' + store.id +'</span></div><form action="#" name="storeid-' + store.id +'"><button title="Shop Store Deals" alt="Shop Store Deals" name="makeCVSStore" type="button" class="cvsbtn btn-gray-med mt10 mb10 shopstorelink" data-id="' + store.id +'"><span class="left"></span><span class="center">Make This myCVS Store</span><span class="right"></span></button></form></div>';
        return storeEntry;
    },
    renderFavStores: function() {
        var storeEntry = '';
        $.each( CVSJS.StoreLoc.Data.favstores, function( index, value ) {
            storeEntry += CVSJS.StoreLoc.StoreLocator.renderStoreList(value, index);
        });
        $("#cvs-overlay #dSearchResultsHdr").hide();
        return storeEntry;
    },
    render: function() {
        if(CVSJS.StoreLoc.StoreLocator.renderFavStores()) {
            var renderedFavStores = CVSJS.StoreLoc.StoreLocator.renderFavStores(),
                myStore = CVSJS.StoreLoc.Data.mystore,
                storeEntry = '';
                CVSJS.StoreLoc.Globals.myStoreId = myStore.id;
            storeEntry += myStore.ad + '<br>'+ myStore.ci + ', ' + myStore.st + ' ' + myStore.zp + '<br>';
            storeEntry += '<span class="not-bold capitalize">' + myStore.ph  + ' | ' + ' Store #'+ CVSJS.StoreLoc.Globals.myStoreId + '</span>';
            $('#cvs-overlay .dModalContentBox .srAddress').html(storeEntry);
        } else {
            var showGetStoreError = true;
        }
        var checkStoreListTimer = setInterval( function(){
            if(i >= 20) {
                // Took longer than 10 seconds to show
                clearTimeout(checkStoreListTimer);
            }
            if($('#cvs-overlay #dStoreList').length > 0) {
                clearTimeout(checkStoreListTimer);
                CVSJS.StoreLoc.Globals.myCvsSpuInd = $('#cvs-overlay .dModalContentBox .srAddress .spuInd').text();
                CVSJS.StoreLoc.StoreLocator.tealiumChangeStoreViewed(CVSJS.StoreLoc.Globals.myCvsSpuInd, CVSJS.StoreLoc.Globals.myStoreId, 'SHOP: BOPUS: Store Selector Overlay', 'BOPUS');
                $('#cvs-overlay  #dStoreList').html('');
                $('#cvs-overlay  #dStoreList').append(renderedFavStores);
                $('#cvs-overlay .dModalContentBox .srAddress').html(storeEntry);
                CVSJS.StoreLoc.StoreLocator.renderErrorChangeAlert();
                CVSJS.StoreLoc.StoreLocator.checkforChangeStoreAlert();
                if(showGetStoreError) {
                    CVSJS.StoreLoc.StoreLocator.renderErrorGetFavStore();
                }
            } else {
                i++;
            }

        }, 500);
    },
    checkforChangeStoreAlert: function () {
        if($("#formerrors li").hasClass("changeAlert")) {
            CVSJS.StoreLoc.StoreLocator.tealiumChangeStoreAlert();
        }
    },
    tealiumChangeStoreViewed: function (eligible, cvsId, pageName, pageCat) {
        utag.view({ bopus_eligible_store_flag: eligible, my_cvs_store_id: cvsId, page_name: pageName, page_category: pageCat });
    },
    tealiumChangeStoreError: function (errorMsg, pageName, pageCat) {
        utag.view({ field_errors: errorMsg, page_name: pageName, page_category: pageCat });
    },
    tealiumChangeStoreAlert: function () {
         utag.view({ field_errors: "Please note before changing myCVS store: Store pickup items already in your basket may not be available at the new store you select.", page_name: "SHOP: BOPUS: Store Selector Overlay: Alert", page_category: "BOPUS" });
    }
}

/* Appending Additional variables to Base tealium tagging */
function appendBaseUDO(keyName, ValueName) {
    utag_data[keyName] =  ValueName;
}


// Document Ready. Load up any functions to be used.
$( document ).ready( function() {
	if (document.cookie.indexOf("favorite_store") == -1 && $("#glfs-dMyCVS").length) {
		$("#dMyCVS").html('<div class="cvs-storepickup-icon"><span class="textR bold">myCVS<sup>&reg;</sup></span><span class="bold">Store</span></div><div class="cvs_store_logo_selector">No store selected. <a href="/store-locator/landing" title="Choose Your Store." id="aNoStoreSelected">Choose Your Store.</a></div>');
	};
    $('.storeSelectOverlay').live('click', function(ev) {
        CVSJS.StoreLoc.StoreLocator.load(ev.target);
        utag.link( $(this).data('info') );
        $('#cvs-overlay').addClass('changeStore');
    });
    $('#aNoStoreSelected').click( function(ev) {
        utag.link( $(this).data('info') );
    });
    $('#cvs-overlay #overlayClose').click( function(ev) {
        $('#cvs-overlay').removeClass('changeStore');
    });
    $('.dMyPastPurch a').click(function(ev) {
    	utag.link({
    		event_name:'Homepage:Header:MyPurchasesLink',
    		event_category: 'EasyReorder'
    	});
    });
    $('#signInOverlayPP').click( function(ev) {
        var signInPP = setInterval(function() {
        	$("#cvs-overlay #loginSuccInp").val( "/account/previous-purchases" );
        }, 500);
        setTimeout(function( ) { clearInterval(signInPP); }, 5000);
    });

    $('#navWrapper  #dMyCVS.selected, #dNavWrapper #dMyCVS.selected').css('display', 'table');
});

//--------------------------------------------------------------------------------------------------------------------
//------------------- End of Store Locator ---------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
