// JavaScript Document
(function(){
    "use strict";
	window.BBApps = window.BBApps || {};
	window.BBApps.IE = function(){
		var outDatedIE,
			closeButton,
			messageContainerIE,
			bodyTag,
			alertContainerIE,
			outDatedIECopy = "Our website no longer supports your current web browser. You may proceed with your purchase, but some images may not appear as intended. For the best experience, please update or switch to a different browser.",
			referer = document.referrer;
		
		var _buildMessagingContainerIE = function(){
			var centerContent = document.createElement('div'),
				message = document.createElement('p');
				alertContainerIE = document.createElement('div');
				
				messageContainerIE = document.createElement('div'),
				closeButton = document.createElement('span');
				
			bodyTag = document.getElementsByTagName('body')[0];	
			
			alertContainerIE.id = "alertContainer";
			messageContainerIE.id = 'outDatedIEContainer';
			message.className = 'outDatedIECopy';
			closeButton.id = 'closeOutDatedIE';
			centerContent.className = 'centerContent';
			
			message.innerHTML = outDatedIECopy;
			alertContainerIE.appendChild(messageContainerIE);
			messageContainerIE.appendChild(centerContent);
			centerContent.appendChild(message);
			message.appendChild(closeButton);
			
			var wrapper;
			if(window.document.domain.indexOf('uk') >= 0){
				console.log("window.document.domain", window.document.domain.indexOf('uk'));
				wrapper = document.getElementById("cookiePolicyContainer");
			}else{
			 	wrapper = document.getElementById("bbv6_wrap") || document.getElementById("headerBB");
			}
			
			
			bodyTag.insertBefore(alertContainerIE, wrapper);
			_addEvents();
		}
		
		var _destroyMessageContainerIE = function(){
			alertContainerIE.removeChild(messageContainerIE);
		}
		
		var _addEvents = function(){
			$("#closeOutDatedIE").click(function(){
				sessionStorage.setItem('outDatedIE', 'false');
				_destroyMessageContainerIE();
			});
		}
		
		function isIE () {
 		 var myNav = navigator.userAgent.toLowerCase();
  			return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		}
		
		function init(){
			
			var outDatedIE = sessionStorage.getItem('outDatedIE');
			if(!outDatedIE || outDatedIE === "true" ){
				sessionStorage.setItem('outDatedIE', 'true');
				_buildMessagingContainerIE();
			}
		}
		
		if(isIE () && isIE () < 9) {
 			init();
		}
		
	}
})();

