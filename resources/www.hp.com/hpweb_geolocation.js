
var UsRedirect=false;function geoLocation(isonunload){if(UsRedirect==false){if((!isonunload)||(isonunload&&_Ck_.get('lang')!=null&&_Ck_.get('cc')!=null)){var langAttr=document.getElementsByTagName('html')[0].getAttribute('xml:lang')||document.getElementsByTagName('html')[0].getAttribute('lang');var lang_cc=langAttr.split("-");var country=lang_cc[1];var language=lang_cc[0]+"-"+lang_cc[1];if(country=="hans"||country=="hant"){country=hpAbsDir.split("/")[2];language=lang_cc[0]+"-"+country;_Ck_.set("lang",language);_Ck_.set("cc",country);}
else{_Ck_.set("lang",language);_Ck_.set("cc",country);}}}}
function USCookie(){_Ck_.set("lang",'en-us');_Ck_.set("cc",'us');UsRedirect=true;}
var metrics_cookie=_Ck_.get('lang');var hp_geolocated_page=false;var currentURL=window.location+'';currentURL=currentURL.split('#')[0];if(currentURL.match(/(https?\:\/\/)?(.*)\.hp\.com\/?($|country\/us\/en\/welcome.html)/gi)){var currentLang=document.getElementsByTagName('html')[0].getAttribute('lang').toLowerCase();if(currentLang!='en-us'){if(metrics_cookie==null){hp_geolocated_page="Browser";}
else
{hp_geolocated_page="Cookie";}}}
function USFlag(){if(typeof(currentLang)!="undefined"&&currentLang!='en-us'){if(document.getElementById("usLink"))document.getElementById("usLink").innerHTML='<div id="imgUSLink"><a onClick="USCookie();" href="http://welcome.hp.com/country/us/en/welcome.html" tabindex="1"><img src="http://welcome.hp-ww.com/country/us/en/img/us_flag.gif" alt="" border=0></a></div><div id="textUSLink"><a onClick="USCookie();" href="http://welcome.hp.com/country/us/en/welcome.html" tabindex="1"><span class="screenReading">Go to </span>HP USA</a></div>';}}
if(typeof(currentLang)!="undefined"&&currentLang!='en-us'){_Ck_.set("geoLocation",'redirection');}

/*
Date: 6/8/2012 5:47:58 PM
Non-published images:
/webdav/17%20United%20States-English%20Web/Building%20Blocks/System/00%20Shared/Content/CSS/i/http://welcome.hp-ww.com/country/us/en/img/us_flag.gif
*/