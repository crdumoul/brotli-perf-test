//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011, 2013 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

if(typeof(ResponsiveJS) == "undefined" || ResponsiveJS == null || !ResponsiveJS){

	ResponsiveJS = { 	
			
	
	
	init: function(){	

		dojo.connect(dojo.byId("footerCustomerService"), "onclick", ResponsiveJS, ResponsiveJS._cSToggleAndShow);
		dojo.connect(dojo.byId("footerCorporateInfo"), "onclick", ResponsiveJS, ResponsiveJS._cIToggleAndShow);
		dojo.connect(dojo.byId("footerExplore"), "onclick", ResponsiveJS, ResponsiveJS._eToggleAndShow);
		dojo.connect(dojo.byId("footerFollowUs"), "onclick", ResponsiveJS, ResponsiveJS._FUToggleAndShow);
		
	},
		
	_cSToggleAndShow:function(evt){			
		this.toggle(dojo.byId("cSTog"));
		this.show(dojo.byId("expandCS"));
	},
	
	_cIToggleAndShow:function(evt){			
		this.toggle(dojo.byId("cITog"));
		this.show(dojo.byId("expandCI"));
	},
	
	_eToggleAndShow:function(evt){			
		this.toggle(dojo.byId("eTog"));
		this.show(dojo.byId("expandE"));
	},
	
	_FUToggleAndShow:function(evt){			
		this.toggle(dojo.byId("fUTog"));
		this.show(dojo.byId("expandFU"));
	},
	
	toggle:function(node){			 
		var srcElement = node;
		if(srcElement != null) {
		      if(srcElement.style.backgroundPosition== '-161px -1px') {
		        srcElement.style.backgroundPosition= '-181px -1px';
		        srcElement.style.width='12px';
		        srcElement.style.height='6px';
		        srcElement.style.left='6px';
		        srcElement.style.top='14px';
		      }
		      else {
		        srcElement.style.backgroundPosition= '-161px -1px';
		        srcElement.style.width='6px';
		        srcElement.style.height='12px';
		        srcElement.style.left='10px';
		        srcElement.style.top='10px';
		  }
		}
	},
	
	show:function(node){
		srcElement = node;
	    if(srcElement != null) {
	      if(srcElement.style.display == "block") {
	        close('searchDropdown');
	        srcElement.style.display= 'none';
	      }
	      else {	    	  
	    	dojo.query(".subDeptDropdown ").forEach(function(node){
	    		close(node.id);
		    });
		    close("departmentsDropdown");	
	        close('qLinkDropdown');	        
	        close('mobileSearchDropdown');
	        close('searchDropdown');
	        close('pageDropdown');	        
	        close('sortDropdown');
	        srcElement.style.display='block';
	      }	      
	    }
	}
	
		
 };
}
