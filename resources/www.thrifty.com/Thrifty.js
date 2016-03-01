function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}
function MM_nbGroup(event, grpName) { //v3.0
  var i,img,nbArr,args=MM_nbGroup.arguments;
  if (event == "init" && args.length > 2) {
    if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
      img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
      nbArr[nbArr.length] = img;
      for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
        if (!img.MM_up) img.MM_up = img.src;
        img.src = img.MM_dn = args[i+1];
        nbArr[nbArr.length] = img;
    } }
  } else if (event == "over") {
    document.MM_nbOver = nbArr = new Array();
    for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = (img.MM_dn && args[i+2]) ? args[i+2] : args[i+1];
      nbArr[nbArr.length] = img;
    }
  } else if (event == "out" ) {
    for (i=0; i < document.MM_nbOver.length; i++) {
      img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
  } else if (event == "down") {
    if ((nbArr = document[grpName]) != null)
      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
    document[grpName] = nbArr = new Array();
    for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = img.MM_dn = args[i+1];
      nbArr[nbArr.length] = img;
  } }
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; 
  document.MM_sr=new Array; 
  for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
		
	
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; 
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
 var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
   var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
   if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

		function PopUp(mypage, myname, w, h, scroll){
					var winl = (screen.width - w ) / 2;
					var wint = (screen.height - h) / 2;
					winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable';
					win = window.open(mypage, myname, winprops);
		}
		
		function Popup(popupUrl, popupName, popupWidth, popupHeight, scroll, parentPageName){
					var winl = (screen.width - popupWidth ) / 2;
					var wint = (screen.height - popupHeight ) / 2;
					winprops = 'height=' + popupHeight + ',width=' + popupWidth + ',top=' + wint + ',left=' +winl + ',scrollbars=' + scroll + ',resizable';
					popupUrl = popupUrl + '?ParentPageName=' + parentPageName;
					win = window.open(popupUrl, popupName, winprops);
		}
		
		function BlueChipPasswordPopup(popupUrl, popupName, popupWidth, popupHeight, scroll, parentPageName, popupHiddenId){
					var winl = (screen.width - popupWidth ) / 2;
					var wint = (screen.height - popupHeight ) / 2;
					winprops = 'height=' + popupHeight + ',width=' + popupWidth + ',top=' + wint + ',left=' +winl + ',scrollbars=' + scroll + ',resizable';
					popupUrl = popupUrl + '?ParentPageName=' + parentPageName + '&PopupHiddenId=' + popupHiddenId;
					win = window.open(popupUrl, popupName, winprops);
		}
		
		function CalendarPopup(popupUrl, popupName, popupWidth, popupHeight, scroll, calendarType, parentPageName, controlPrefix, selectedDate){
					var winl = (screen.width - popupWidth ) / 2;
					var wint = (screen.height - popupHeight ) / 2;
					winprops = 'height=' + popupHeight + ',width=' + popupWidth + ',top=' + wint + ',left=' +winl + ',scrollbars=' + scroll + ',resizable';
					popupUrl = popupUrl + '?CalendarType=' + calendarType +'&ParentPageName=' + parentPageName + '&ControlPrefix=' + controlPrefix + '&selectedDate=' + selectedDate;
					win = window.open(popupUrl, popupName, winprops);
		}
		
		function LocationFinderPopup(popupUrl, popupName, popupWidth, popupHeight, scroll, parentPageName, targetControlNames){
			var winl = (screen.width - popupWidth ) / 2;
			var wint = (screen.height - popupHeight ) / 2;
			winprops = 'height=' + popupHeight + ',width=' + popupWidth + ',top=' + wint + ',left=' +winl + ',scrollbars=' + scroll + ',resizable=no';
			popupUrl = popupUrl + '?ParentPageName=' + parentPageName + '&TargetControlNames=' + targetControlNames;
			win = window.open(popupUrl, popupName, winprops);
		}
		
		function LocationFinderPopupErrorKey(popupUrl, popupName, popupWidth, popupHeight, scroll, parentPageName, targetControlNames, errorKey){
			var winl = (screen.width - popupWidth ) / 2;
			var wint = (screen.height - popupHeight ) / 2;
			winprops = 'height=' + popupHeight + ',width=' + popupWidth + ',top=' + wint + ',left=' +winl + ',scrollbars=' + scroll + ',resizable=no';
			popupUrl = popupUrl + '?ParentPageName=' + parentPageName + '&TargetControlNames=' + targetControlNames + '&ErrorKey=' + errorKey;
			win = window.open(popupUrl, popupName, winprops);
		}

//function to get the rollover effect for the header navigation bar*/
function handleFocusChange(divObj, focusStatus, leftImageID, rightImageID, hLinkID) {
	if (focusStatus == 'got') {
		document.getElementById(leftImageID).src="/images/tabedge-left-lightblue.gif";
		divObj.style.backgroundColor = '#0099FF';
		divObj.all[hLinkID].style.backgroundColor = '#0099FF';
		document.getElementById(rightImageID).src="/images/tabedge-right-lightblue.gif";
	}
	else {
		document.getElementById(leftImageID).src="/images/tabedge-left-blue.gif";
		divObj.style.backgroundColor = '#0066CC';
		divObj.all[hLinkID].style.backgroundColor = '#0066CC';
		document.getElementById(rightImageID).src="/images/tabedge-right-blue.gif";
	}
	return;
}


function LocationFinderNavFocusChange(divObj, focusStatus, leftImageID, rightImageID, cellId) {
	if (focusStatus == 'got') {
		document.getElementById(leftImageID).src="/images/tabedge-left-lightblue.gif";
		divObj.style.backgroundColor = '#0099FF';
		divObj.all[0].style.backgroundColor = '#0099FF';
		document.getElementById(cellId).style.backgroundColor = '#0099FF';
		document.getElementById(rightImageID).src="/images/tabedge-right-lightblue.gif";
	}
	else {
		document.getElementById(leftImageID).src="/images/tabedge-left-blue.gif";
		divObj.style.backgroundColor = '#0066CC';
		divObj.all[0].style.backgroundColor = '#0066CC';
		document.getElementById(cellId).style.backgroundColor = '#0066CC';
		document.getElementById(rightImageID).src="/images/tabedge-right-blue.gif";
	}
	return;
}
// error option functions
function openLocationFinder()
{
	LocationFinderPopup('/reservations/LocationFinder.aspx', 'LocationFinder', '520', '360', 'yes', 'Form1', 'reservations_controls_locationtime_ascx1_PickupLocationTextBox,reservations_controls_locationtime_ascx1_PickupLocationCodeHidden');
}

// open the location finder but accept an errorKey
function openLocationFinderErrorKey(errorKey)
{
	LocationFinderPopupErrorKey('/reservations/LocationFinder.aspx', 'LocationFinder', '520', '360', 'yes', 'Form1', 'reservations_controls_locationtime_ascx1_PickupLocationTextBox,reservations_controls_locationtime_ascx1_PickupLocationCodeHidden', errorKey);
}

function startOver()
{
	window.opener.location.href = '/reservations/index.aspx?PurgeRateInformation=true';
	self.close();
}
function changePickupLocation()
{
	self.close();
}

function changeCar()
{
	self.close();
}

function changeDates()
{
	self.close();
}

function changeDiscountNumber()
{
	self.close();
}

function changeIATA()
{
	self.close();
}

function changeValue()
{
	self.close();
}

function changeReturnLocationPickupLocation()
{
	self.close();
}

function changePromotionCode()
{
	self.close();
}

function continueWithoutDiscount()
{
	window.opener.location.href="index.aspx?SavedState=True&PromotionCode=empty&ControlTarget=VehicleRates"
	self.close();
}

function continueWithoutPromotionCode()
{
	window.opener.location.href="index.aspx?SavedState=True&PromotionCode=empty&ControlTarget=VehicleRates"
	self.close();
} 

function continueWithoutIATA()
{
	window.opener.location.href="index.aspx?SavedState=True&IATA=empty&ControlTarget=VehicleRates"
	self.close();
}

function continueWithoutDiscountIATA()
{
	window.opener.location.href="index.aspx?SavedState=True&IATA=empty&PromotionCode=empty&ControlTarget=VehicleRates"
	self.close();
}

function continueWithoutPickupChange()
{
	self.close();
}
function changePickupLocation()
{
	self.close();
}

function changeCreditCard()
{
	self.close();
}

// redirects to index, loads state and then purges the rate information
function reshop()
{
	window.opener.location.href='/reservations/index.aspx?SavedState=True&PurgeRateInformation=true&ControlTarget=VehicleRates';
	self.close();
}

function AlterHeaderTabBackgroundPosition(sender, yPosition)
{
	sender.style.backgroundPosition = '100% ' + yPosition + 'px';
	sender.childNodes[0].style.backgroundPosition = '0 ' + yPosition + 'px';
}

function AlterDynamicLinkButtonBackgroundImage(sender, newImage)
{
	sender.style.backgroundImage= newImage;
	sender.childNodes[0].style.backgroundImage = newImage;
}