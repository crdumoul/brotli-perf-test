// detect flash version via javascript

// this is the global variable that the iFlashVersion gets assigned to
// either from flashdetect.js (this file) or flashdetect.vbs
var iFlashVersion = 0;

// the minimum required version of flash
var iMinimumVersion = 6;

// the user-agent string (for sniffing various information)
var sAgent = navigator.userAgent.toLowerCase();

// assign the flash version if we can (if not then it should
// get assinged in flashdetect.vbs)
if (navigator.plugins != null && navigator.plugins.length > 0)
 {
   // grab the Flash plugin object
   var oFlashPlugin = navigator.plugins['Shockwave Flash'];

   // The only browsers we support are the ones that either
   // support the navigator plugin array or the activex flash
   // object (see "detect.vbs"). We do not support other browsers.
   if (typeof oFlashPlugin == 'object')
   {
     if (oFlashPlugin.description.indexOf('10.') != -1)
     {
       iFlashVersion = 10;
     }
     if (oFlashPlugin.description.indexOf('9.') != -1)
     {
       iFlashVersion = 9;
     }
     if (oFlashPlugin.description.indexOf('8.') != -1)
     {
       iFlashVersion = 8;
     }
     if (oFlashPlugin.description.indexOf('7.') != -1)
     {
       iFlashVersion = 7;
     }
     else if (oFlashPlugin.description.indexOf('6.') != -1)
     {
       iFlashVersion = 6;
     }
     else if (oFlashPlugin.description.indexOf('5.') != -1)
     {
       iFlashVersion = 5;
     }
     else if (oFlashPlugin.description.indexOf('4.') != -1)
     {
       iFlashVersion = 4;
     }
     else if (oFlashPlugin.description.indexOf('3.') != -1)
     {
       iFlashVersion = 3;
     }
   }
 }
 else
 {
   // Can't detect in all other cases
   iFlashVersion = -1;
 }

/**
 * Read the global variables "iFlashVersion" which should already be
 * assigned and return true/false based on the test results.
 * Note: this function should only be called by the pages onload event
 *
 * @param boolean debug whether to alert a debug statement or not, default = false
 * @return boolean whether the test was successful or not
 */
function testFlashVersion()
{
  // pass in a true argument to turn debugging on
  var debug = (arguments.length == 1) ? arguments[0] : false;

  // capture debugging details
  var detail = null;

  // capture the test result
  var result = false;

  // Redirect to the appropriate url
  if (iFlashVersion >= iMinimumVersion)
  {
    // all is good
    detail = 'test successful: v' + iFlashVersion + ' is installed';
    result = true;
  }
  else if (iFlashVersion > 0)
  {
    // they have flash, but the version isn't recent enough
    detail = 'test failed: flash needs upgraded to v' + iMinimumVersion + ', v' + iFlashVersion + ' is installed';
    result = false;
  }
  else if (iFlashVersion == 0)
  {
    // they don't have flash
    detail = 'test failed: flash is not installed';
    result = false;
  }
  else if (iFlashVersion == -1 || iFlashVersion == null)
  {
    // we were unable to detect which version of flash or
    // whether they even have flash on their system
    detail = 'test failed: unable to detect whether flash is installed or not';
    result = false;
  }
  else
  {
    // no clue what happened
    detail = 'test failed: unknown error';
    result = false;
  }

  // output debugging details (if applicable)
  if (debug) alert(detail);

  // return our findings
  return(result);
}

/**
 * A "simple as simple gets" cookie test
 *
 * @return boolean whether cookie support is enabled or not
 */
function testCookies()
{
  if (document.cookie.indexOf('testcookie=test') != -1)
  {
    // we already have a testcookie
    return(true);
  }
  else
  {
    // write it
    document.cookie = 'testcookie=test';

    // test it
    if (document.cookie.indexOf('testcookie=test') != -1)
    {
      return(true);
    }
    else
    {
      return(false);
    }
  }
}

/**
 * A wrapper detection function, mixes browser, flash and cookie test together
 * a redirection to system.jsp also occurs if false is to be returned (so false
 * is actually never returned)
 *
 * @return boolean whether the combined detection tests passed or not
 */
function detect()
{
  var bBrowser  = (document.getElementById) ? true : false;
  var bFlash            = (testFlashVersion()) ? true : false;
  //var bCookie         = (testCookies()) ? true : false;
  var aParam            = new Array();
  var sQuery            = null;

  if (!bBrowser || !bFlash)
  {
    aParam[aParam.length] = 'javascript=1';     // obviously this one is true
    aParam[aParam.length] = (!bBrowser) ? 'browser=0' : 'browser=1';
    //aParam[aParam.length] = (!bCookie) ? 'cookie=0' : 'cookie=1';
    aParam[aParam.length] = (!bFlash) ? 'flash=0' : 'flash=1';
    aParam[aParam.length] = 'flashversion=' + iFlashVersion;
    sQuery = aParam.join('&');

    // now do the redirect
    location.replace('/misc/page.jhtml?ref=outdoor_nonflash&' + sQuery);
    return(false);
  }
  else
  {
    // all is well
    return(true);
  }
}
