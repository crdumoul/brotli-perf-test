//--------------------------------------------------------------
// <file name="Common.css">
//     <copyright>
//         Copyright (c) Dollar Thrifty Automotive Group.
//         All rights reserved.
//     </copyright>
// </file>
// <summary>
//     Common site javascript routines.	
// </summary>
// <history>
//     <change date="01/16/2007" ticket="">
//         <author>mgoppert</author>
//         <description>Initial version.</description>
//     </change>
//     <change date="04/16/2007" ticket="">
//         <author>marc mccann</author>
//         <description>Added NewWindow and PrintWindow functions.</description>
//     </change>
//     <change date="01/31/2008" ticket="">
//         <author>Doug Scott</author>
//         <description>Added SEOPanels Script for home page SEO content.</description>
//     </change>
//     <change date="08/15/2008" ticket="">
//         <author>Raja Kanapala</author>
//         <description>SEO optimization.</description>
//     </change>
// </history>
//-----------------------------------------------------------------

// Find element and show it
function Show(elementId)
{
    var ele = document.getElementById(elementId);

    if (ele.style.display == 'none' || ele.style.display == '')
        ele.style.display='block';
}

// Find element and hide it
function Hide(elementId)
{
    var ele = document.getElementById(elementId);
    
    if (ele.style.display == 'block')
        ele.style.display='none';
}

//-----------------------------------------------------------------
// Image Functions
//-----------------------------------------------------------------
function SwapImage(control, image)
{
    if (document.images)
    {
        control.src = image.src;
    }
}

// Find the element and update it's .src property
function SwapImageUrl(elementId, newUrl)
{
    var image = document.getElementById(elementId);
    
    if (image.src != newUrl) {
        // change menu item's image
        image.src = newUrl;            
        
    }
}

//-----------------------------------------------------------------
// Mouseover to act as hyperlink
//-----------------------------------------------------------------
var origColor;
function ShowAsLink(ele){
    document.getElementById(ele).style.textDecoration = "underline";
    document.getElementById(ele).style.cursor = "hand";
    origColor = document.getElementById(ele).style.color;
    document.getElementById(ele).style.color = "#0000ff";
}
function ShowAsReverseLink(ele){
    document.getElementById(ele).style.textDecoration = "underline";
    document.getElementById(ele).style.cursor = "hand";
    origColor = document.getElementById(ele).style.color;
    document.getElementById(ele).style.color = "#ffffff";
}
function ShowAsNoLink(ele){
    document.getElementById(ele).style.textDecoration = "none";
    document.getElementById(ele).style.cursor = "";
    document.getElementById(ele).style.color = origColor;
}
function ChangeItemStyle(ele, className)
{
    document.getElementById(ele).className = className;
}

function PrintWindow()
{   if (parseInt(navigator.appVersion) >= 4){window.print();}else{alert('Your browser does not support this function.');}
}

function NewWindow(pageURL, windowName, windowAttributes)
{
    if (windowAttributes == '')
    {
        var winl = (screen.width - 850 ) / 2;
	            
        winprops = 'width=850,height=850,top=30,left='+winl+',scrollbars=yes,resizable';
    }
    else
    {
        var winl = (screen.width - windowAttributes.substr(windowAttributes.indexOf("width")+6,3) ) / 2;
	    var wint = (screen.height - windowAttributes.substr(windowAttributes.indexOf("height")+7,3)) / 2;
        var scrollbars= (windowAttributes.substr(windowAttributes.indexOf("scrollbars")+11,1));
        var scroll = (scrollbars.toLowerCase()=="y")?"yes":"no";
        winprops = 'width=' + windowAttributes.substr(windowAttributes.indexOf("width")+6,3) + 
                   ',height=' + windowAttributes.substr(windowAttributes.indexOf("height")+7,3) +
                   ',top='+wint+',left='+winl+',scrollbars=' + scroll + ',resizable';
    }
    window.open(pageURL, windowName, winprops)
}

//-----------------------------------------------------------------
// Form control functions
//-----------------------------------------------------------------
function SetUniqueRadioButton(nameregex, current)
{
   re = new RegExp(nameregex);
   for(i = 0; i < document.forms[0].elements.length; i++)
   {
      elm = document.forms[0].elements[i]
      if (elm.type == 'radio')
      {
         if (re.test(elm.name))
         {
            elm.checked = false;
         }
      }
   }
   current.checked = true;
}

function TogglePanelVisibility(panelControlId, arrowControlId)
{
    var panelControl = document.all ? document.all[panelControlId] : document.getElementById(panelControlId);
    var imageControl = document.all ? document.all[arrowControlId] : document.getElementById(arrowControlId);
    if(panelControl.style.display == "none")
    {
        imageControl.src = "/Common/Images/ArrowDown.gif";
        panelControl.style.display = "inline";
    }
    else
    {
        imageControl.src = "/Common/Images/ArrowRight.gif";
        panelControl.style.display = "none";
    }
}

function ToggleControlVisibility(controlId)
{
    var control = document.all ? document.all[controlId] : document.getElementById(controlId);
    if(control.style.display == "none")
    {
        control.style.display = "inline";
    }
    else
    {
        control.style.display = "none";
    }
}

//-----------------------------------------------------------------
// String functions
//-----------------------------------------------------------------
function LTrim(value)
{
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}

function RTrim(value)
{
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}

function Trim(value)
{
	return LTrim(RTrim(value));
}

//-----------------------------------------------------------------
// Date functions
//-----------------------------------------------------------------
function UpdateDateDayControlValues(dayControlId, monthControlId, YearControlId)
{
    // Find client-side controls
    var dayCtrl = document.getElementById(dayControlId);
    var monthCtrl = document.getElementById(monthControlId);
    var yearCtrl = document.getElementById(YearControlId);
    
    // Determine days in month
    var day = parseInt(dayCtrl[dayCtrl.selectedIndex].value);
    var year = parseInt(yearCtrl[yearCtrl.selectedIndex].value);
    var month = parseInt(monthCtrl[monthCtrl.selectedIndex].value);
    var daysInMonth = 32 - new Date(year, month - 1, 32).getDate();

    // Check if day control has correct number of days
    if(dayCtrl.options.length != daysInMonth)
    {
        // Determine if too many or too few
        if(dayCtrl.options.length > daysInMonth)
        {
            // Remove days
            dayCtrl.options.length = daysInMonth;
        }
        else
        {
            // Add days
            var addDays = daysInMonth - dayCtrl.options.length;
            for(var day=dayCtrl.options.length + 1; day <= daysInMonth; day++)
            {
                var newDayOption = document.createElement('option');
                newDayOption.text = day;
                newDayOption.value = day;
                try
                {
                    dayCtrl.add(newDayOption, null); // standards compliant; doesn't work in IE
                }
                catch(ex)
                {
                    dayCtrl.add(newDayOption); // IE only
                }
            }
        }
    }
}


//-----------------------------------------------------------------
// SEOPanels Script
//-----------------------------------------------------------------
var isIE = (window.navigator.userAgent.indexOf("MSIE") > 0);

if (!isIE) 
{
    HTMLElement.prototype.__defineGetter__("innerText", 
        function () { return(this.textContent); });
    HTMLElement.prototype.__defineSetter__("innerText", 
        function () { return(this.textContent); });
}


function SwitchPanels(action, ID)
{
    var MainPanel = document.getElementById("ModulesPanel");      
    var SEOContainer = document.getElementById("SEOPanels");  
    var TitleContent = document.getElementById("SEOPanelTitles");
    var PanelTitleContent = document.getElementById("PanelTitleContent");
    var PanelBodyContent = document.getElementById("PanelBodyContent");
    var TitleArray = TitleContent.innerText.split(",");
    
    var SEOPanel = document.getElementById("SEOPanel" + ID);
    
    if (action == 'next' && ID == '1')
    {
        MainPanel.style.visibility = "hidden";
        MainPanel.style.display="none";
        
        SEOContainer.style.visibility = "visible";
        SEOContainer.style.display="block";
        PanelBodyContent.innerHTML = SEOPanel.innerHTML;
        
    }else if ((action == 'prev' && ID == '0') || (action == 'next' && ID == '6')){
        MainPanel.style.visibility = "visible";
        MainPanel.style.display="block";
        
        SEOContainer.style.visibility = "hidden";
        SEOContainer.style.display="none";
    }else{
        PanelBodyContent.innerHTML = SEOPanel.innerHTML;
    }
    
    if (TitleArray.length == 6)
    {
        PanelTitleContent.innerHTML = TitleArray[parseInt(ID)-1];
    }
    
}

function ReadCookie() 
{
   
    var userAgent = navigator.userAgent.toLowerCase();
    var agentList = "googlebot|slurp|msnbot|teoma";
    var agentArray = agentList.split("|");
    var isSpider = false;
    
    for (var i = 0; i < agentArray.length; i++)
    {
        if (userAgent.indexOf(agentArray[i]) > -1) 
        {
            isSpider = true;
            i = agentArray.length;
        }
    }
    
    if (!isSpider)
    {
        if(document.cookie.length == 0) 
        {   
            window.location = "/Help/BrowserCompatibility.aspx";
	        
        }
    }
} 
