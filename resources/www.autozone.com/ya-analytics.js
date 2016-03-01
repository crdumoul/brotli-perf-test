var yawa_baseUrl = "http://analytics.youramigo.com/yawa";
var yawa_baseSecUrl = "https://support.youramigo.com/yawa";
var yawa_cmds = yawa_cmds || [];
(function() {
var _yawa = document.createElement("script"); _yawa.type ="text/javascript";
_yawa.async = true;
yawa_baseUrl = ("https:" == document.location.protocol ?
yawa_baseSecUrl : yawa_baseUrl );
_yawa.src = yawa_baseUrl + "/84298920/yawa.min.js";
var _yawa_s = document.getElementsByTagName("script")[0];
_yawa_s.parentNode.insertBefore(_yawa, _yawa_s);
}());