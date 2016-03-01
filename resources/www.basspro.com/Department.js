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

if(typeof(DepartmentJS) == "undefined" || DepartmentJS == null || !DepartmentJS){

	DepartmentJS = { 	
					
	init: function(){

		dojo.query(".col8 > .deptContainer > li").forEach(function(node)
		{
			dojo.connect(node, "onclick", DepartmentJS, DepartmentJS._show);
			dojo.connect(node, "onclick", DepartmentJS, DepartmentJS._toggleDept);
			dojo.connect(node, "onclick", DepartmentJS, DepartmentJS._borderTog);
			dojo.connect(node, "onclick", DepartmentJS, DepartmentJS._swapGrad);
			
		});
		
		dojo.query("#departmentsDropdownBP3down > ul > li div.tabOpen").forEach(function(node)
		{
			dojo.connect(node, "onclick", DepartmentJS, DepartmentJS._expandDept);
			dojo.connect(node, "onclick", DepartmentJS, DepartmentJS._flipSign);	
		});	
		
		
		dojo.connect(dojo.byId("qLinkClose"), "onclick", DepartmentJS, DepartmentJS._closeqLinkDropDown);
		dojo.connect(dojo.byId("qLinkA"), "onclick", DepartmentJS, DepartmentJS._showQLink);		
		dojo.connect(dojo.byId("qLinkBC"), "onclick", DepartmentJS, DepartmentJS._showQLink);				
		
		dojo.connect(dojo.byId("navMore"), "onclick", DepartmentJS, DepartmentJS._showAllDeptDropDown);				
		dojo.connect(window, "onresize", DepartmentJS, DepartmentJS._reset);
		dojo.connect(window, "onresize", DepartmentJS, DepartmentJS._calculateWidth);
		
		dojo.connect(dojo.byId("navDepartments"), "onclick", DepartmentJS, DepartmentJS._showNavDeptDropDown);							
	},		
	
	_reset:function(evt){

		var srcElement = document.getElementById("deptContainerNode");		 	  	  		 	    			 
		srcElement.style.width = '';	
		
		if (window.matchMedia) {
			if (window.matchMedia("(max-width: 600px)").matches){
				DepartmentJS.clearAll();
			}else{
				DepartmentJS.close("departmentsDropdownBP3down");
				DepartmentJS.toggleOff('navDeptArrow');
			}
		}else{
			if (!(document.documentElement.clientWidth > 600)){
				DepartmentJS.clearAll();
			}else{
				DepartmentJS.close("departmentsDropdownBP3down");
				DepartmentJS.toggleOff('navDeptArrow');
			}
		}
		
	},
	
	_closeqLinkDropDown:function(evt){		

	    DepartmentJS.close('qLinkDropdown');
	    var quickLinkElement = document.getElementById("quickLinks");		
	    quickLinkElement.style.display == "block";
	      
	    
	  },
	
	
	_showQLink:function(evt){		
		var srcElement = document.getElementById("qLinkDropdown");				
	    if(srcElement != null) {
	      if(srcElement.style.display == "block") {
	    	DepartmentJS.close('searchDropdown');	        
	        srcElement.style.display= 'none';
	      }
	      else 
	      {
	    	dojo.query(".subDeptDropdown ").forEach(function(node){
	    		DepartmentJS.close(node.id);
	    	});
	    	DepartmentJS.close("departmentsDropdown");	
	    	DepartmentJS.close('mobileSearchDropdown');
	    	DepartmentJS.close('searchDropdown');
	    	DepartmentJS.close('qLinkDropdown');
	        srcElement.style.display='block';
	      }	      
	    }
		 DepartmentJS._toggleDrop('qLinkArrow');		 
	  },	    
	  
	 _showDeptLink:function(evt){		
		var srcElement = document.getElementById("navDropdownDepartments");				
	    if(srcElement != null) {
	      if(srcElement.style.display == "block") {
	    	  DepartmentJS.close('searchDropdown');
	        srcElement.style.display= 'none';
	      }
	      else 
	      {
	    	dojo.query(".subDeptDropdown ").forEach(function(node){
	    		DepartmentJS.close(node.id);
	    	});
	    	DepartmentJS.close("departmentsDropdown");	
	    	DepartmentJS.close('mobileSearchDropdown');
	    	DepartmentJS.close('searchDropdown');
	    	DepartmentJS.close('qLinkDropdown');	    	
	        srcElement.style.display='block';
	      }	      
	    }
	  },
	  
	  _showMobileSearchComponent:function(evt){		
			var srcElement = document.getElementById("mobileSearchDropdown");				
		    if(srcElement != null) {
		      if(srcElement.style.display == "block") {
		    	  DepartmentJS.close('searchDropdown');
		        srcElement.style.display= 'none';
		      }
		      else 
		      {
		    	dojo.query(".subDeptDropdown ").forEach(function(node){
		    		DepartmentJS.close(node.id);
		    	});
		    	DepartmentJS.close("departmentsDropdown");	
		    	DepartmentJS.close('mobileSearchDropdown');
		    	DepartmentJS.close('searchDropdown');
		    	DepartmentJS.close('qLinkDropdown');   	
		        srcElement.style.display='block';
		      }	      
		    }
		  },
		  	  
	_show:function(evt){	
						
		var deptDropdown = evt.currentTarget.id.replace("nav", "navDropdown");
		var position = evt.currentTarget.id.replace("nav", "");
		
		var columns = 0;
		var srcElement = document.getElementById(deptDropdown);				
	    if(srcElement != null) {
	      if(srcElement.style.display == "block") {
	    	DepartmentJS.close('searchDropdown');
	        srcElement.style.display= 'none';
	      }
	      else 
	      {
	    	dojo.query(".subDeptDropdown ").forEach(function(node){
	    		DepartmentJS.close(node.id);
	    	});
	    	
	    	dojo.query("#" + deptDropdown + " ul ").forEach(function(node){
	    		columns++;
	    	});
	    	
	    	//In the case that top category does not have any subcategory
	    	if (columns == 0){
	    		columns = 1;
	    	} 
	    	var curr_width = 27;
	    	for (var i=1; i<position; i++)
	    	{
	    		curr_width = document.getElementById("nav"+i).offsetWidth + curr_width + 4;
	    	}
	    		    	
	    	DepartmentJS.close("departmentsDropdown");	
	    	DepartmentJS.close('mobileSearchDropdown');
	    	DepartmentJS.close('searchDropdown');
	    	DepartmentJS.close('qLinkDropdown');    	
	        srcElement.style.display='block';
	        srcElement.style.width = 240*columns + 'px';
	        srcElement.style.left = curr_width + 'px';
	      }	      
	    }
	 },
	 
	 _expandDept:function(evt){	
			
			var deptDropdown = evt.currentTarget.id.replace("Tog", "Expand");
			var srcElement = document.getElementById(deptDropdown);				
		    if(srcElement != null) {
		      if(srcElement.style.display == "block") {
		    	DepartmentJS.close('searchDropdown');
		        srcElement.style.display= 'none';
		      }
		      else 
		      {
		    	dojo.query(".subDeptDropdown ").forEach(function(node){
		    		DepartmentJS.close(node.id);
		    	});
		    	
		    	DepartmentJS.close("departmentsDropdown");	
		    	DepartmentJS.close('mobileSearchDropdown');
		    	DepartmentJS.close('searchDropdown');
		    	DepartmentJS.close('qLinkDropdown');    	
		        srcElement.style.display='block';
		   }	      
		}
	  },
	
	 _calculateWidth:function(evt){
		 
		  
		 var div_width = 0;
		 var new_width = 0;		 
		 var srcElement = document.getElementById("deptContainerNode");
		 var deptContainerWidth = srcElement.offsetWidth;
		 var deptDropDown = document.getElementById("departmentsDropdown");		 
		 
		 dojo.query(".col8 > .deptContainer > li").forEach(function(node)
		 {
			 div_width = div_width + node.offsetWidth + 4;
			 if (div_width <= (srcElement.offsetWidth - 27)){
				 new_width = div_width; 				 
			 }
		 });		 
		 		  		 	    			 
		 srcElement.style.width = new_width + 2 + 'px';
		 deptDropDown.style.left = new_width + 23 + 'px';
		 if( new_width == 0)
		 {
			 deptDropDown.style.left = '';
		 }
	 },
	 
	 _showAllDeptDropDown: function(evt){	
		
		var srcElement = document.getElementById("departmentsDropdown");				
	    if(srcElement != null) {
	      if(srcElement.style.display == "block") {
	    	DepartmentJS.close('searchDropdown');
	        srcElement.style.display= 'none';
	      }
	      else 
	      {
	    	dojo.query(".subDeptDropdown ").forEach(function(node){
	    		DepartmentJS.close(node.id);
	    	});
	    	
	    	DepartmentJS.close("departmentsDropdown");	    	
	        srcElement.style.display='block';	        	        
	      }	      
	    }
	    DepartmentJS._toggleDrop('deptTog');
	    
	    srcElement = document.getElementById("deptBord");		    			
	    if(srcElement != null) {
	      if(srcElement.style.borderColor=='rgb(241, 243, 243)') {
	    	dojo.query(".col8 > ul > li > .navBorder").forEach(function(node)
	    	{	    		
	    		DepartmentJS.borderTogOff(node.id);	    		
	    	});
	    	srcElement.style.borderColor='#FBCC65';
	      }
	      else {
	        srcElement.style.borderColor='#f1f3f3';
	      }
	    }
	    
	    DepartmentJS._swapGrad(evt);
	},
	
	_showNavDeptDropDown: function(ele){	
		
		var srcElement = document.getElementById("departmentsDropdownBP3down");				
	    if(srcElement != null) {
	      if(srcElement.style.display == "block") {
	    	DepartmentJS.close('searchDropdown');
	        srcElement.style.display= 'none';
	      }
	      else 
	      {
	    	dojo.query(".subDeptDropdown ").forEach(function(node){
	    		DepartmentJS.close(node.id);
	    	});
	    	DepartmentJS.close('searchDropdown');
	    	DepartmentJS.close("departmentsDropdown");
	    	DepartmentJS.close('mobileSearchDropdown');
	    	DepartmentJS.close('qLinkDropdown'); 
	        srcElement.style.display='block';	        	        
	      }	      
	    }
	   
	   DepartmentJS._toggleDrop("navDeptArrow");
	},
		
	 close:function(ele) {
	    var srcElement = document.getElementById(ele);
	    if(srcElement != null) {
	      srcElement.style.display='none';
	    }
	  },
	  
	toggleOffAllDept:function(ele) {
		var srcElement = document.getElementById(ele);
		if(srcElement != null) {
		   srcElement.style.backgroundPosition= '-77px -1px';
		}
	},
	
	toggleOff: function(ele) {
		var srcElement = document.getElementById(ele);
	    if(srcElement != null) {
	      if(srcElement != document.getElementById('deptTog')) {
	        if(srcElement.style.backgroundPosition== '-241px -21px') {
	          srcElement.style.backgroundPosition= '-121px -1px';
	        }
	        else if(srcElement.style.backgroundPosition== '-281px -21px') {
	          srcElement.style.backgroundPosition= '-261px -21px';
	        }
	        else if(srcElement.style.backgroundPosition== '-21px -21px'){
	          srcElement.style.backgroundPosition= '-101px -1px';
	        }
	      }
	      else {
	        srcElement.style.backgroundPosition= '-121px -1px';
	      }
	    }
	 },	 	
	 
	 _toggleDept: function(evt) {	
		  var nodeId = evt.currentTarget.id;			
		  var togId = nodeId.replace("nav", "Tog");		  
		  DepartmentJS._toggleDrop(togId);
		  	  
	 },
	 
	 clearDropdownTog: function(ele) {
		 DepartmentJS.toggleOff('deptTog');
		 DepartmentJS.toggleOff('navSearchArrow');
		 dojo.query(".col8 > ul > li > .navBorder > .deptArrow").forEach(function(node)
		 {
			DepartmentJS.toggleOff(node.id);
		 });
		 DepartmentJS.toggleOff('qLinkArrow');
		 DepartmentJS.toggleOff('cartDropdown');
		 DepartmentJS.toggleOff('navDeptArrow');
	 },
	 
	 _toggleDrop: function(ele) {
		    var srcElement = document.getElementById(ele);
		    if(srcElement != null) {
		      if(srcElement != document.getElementById('deptTog')) {
		        if(srcElement.style.backgroundPosition== '-121px -1px') {
		        	DepartmentJS.clearDropdownTog();
		          srcElement.style.backgroundPosition= '-241px -21px';
		        }
		        else if(srcElement.style.backgroundPosition== '-241px -21px') {
		          srcElement.style.backgroundPosition= '-121px -1px';
		        }
		        else if(srcElement.style.backgroundPosition== '-261px -21px') {
		        	DepartmentJS.clearDropdownTog();
		          srcElement.style.backgroundPosition= '-281px -21px';
		        }
		        else if(srcElement.style.backgroundPosition== '-281px -21px') {
		          srcElement.style.backgroundPosition= '-261px -21px';
		        }
		        else if(srcElement.style.backgroundPosition== '-101px -1px') {
		        	DepartmentJS.clearDropdownTog();
		          srcElement.style.backgroundPosition= '-21px -21px';
		        }
		        else if(srcElement.style.backgroundPosition== '-21px -21px'){
		          srcElement.style.backgroundPosition= '-101px -1px';
		        }
		        else if(srcElement.style.backgroundPosition== '-201px -1px'){
		          srcElement.style.backgroundPosition= '-221px -1px';
		        }
		        else if(srcElement.style.backgroundPosition== '-221px -1px'){
		          srcElement.style.backgroundPosition= '-201px -1px';
		        }
		      }
		      else {
		        if(srcElement.style.backgroundPosition== '-121px -1px') {
		          DepartmentJS.clearDropdownTog();
		          srcElement.style.backgroundPosition= '-281px -21px';
		        }
		        else if(srcElement.style.backgroundPosition== '-281px -21px'){
		          srcElement.style.backgroundPosition= '-121px -1px';
		        }
		      }
		    }
	 },
	 
	_swapGrad:function(evt) {
		var nodeId = evt.currentTarget.id;
		var srcElement = document.getElementById(nodeId);
		if(srcElement != null) {
			if(srcElement.style.marginBottom == '4px') {
				dojo.query(".col8 > ul > li").forEach(function(node)
				{
					DepartmentJS.swapGradBack(node.id);
				});          
				if (dojo.isIE == 8) {
					return;
				}
				srcElement.className="selectedMenu";
				srcElement.style.marginBottom="0px";
			} else {
				if (dojo.isIE == 8) {
					return;
				}
				srcElement.className="";
				srcElement.style.marginBottom="4px";
			}
		}
	},  

	_borderTog:function(evt) {
		var nodeId = evt.currentTarget.id;
		var borderId = nodeId.replace("nav", "Bord");
		var srcElement = document.getElementById(borderId);		    			
	    if(srcElement != null) {
	      if(srcElement.style.borderColor=='rgb(241, 243, 243)') {
	    	dojo.query(".col8 > ul > li > .navBorder").forEach(function(node)
	    	{	    		
	    		DepartmentJS.borderTogOff(node.id);	    		
	    	});
	    	srcElement.style.borderColor='#FBCC65';
	      }
	      else {
	        srcElement.style.borderColor='#f1f3f3';
	      }
	    }
	},
	
	swapGradBack: function(ele) {
		var srcElement = document.getElementById(ele);
		if(srcElement != null) {
			if (dojo.isIE == 8) {
				return;
			}
			srcElement.className="";
			srcElement.style.marginBottom="4px";
		}
	},
	 
	borderTogOff: function(ele) {	
		   var srcElement = document.getElementById(ele);
		   if(srcElement != null) {
		       srcElement.style.borderColor='#f1f3f3';
		   }
	},
	
	_flipSign: function(evt) {
		
		var nodeId = evt.currentTarget.id;	
	    var srcElement = document.getElementById(nodeId);
	    if(srcElement != null) {
	      if (srcElement.innerHTML=="[ + ]") {
	    	  
	    	dojo.query("#departmentsDropdownBP3down > ul > a > li > div.tabOpen").forEach(function(node)
	    	{
	    		flipOff(node.id);
	    	});	
	        srcElement.innerHTML="[ &#8211 ]";
	      }
	      else {
	        srcElement.innerHTML="[ + ]";
	      }
	    }	   
	},
	

	flipOff: function(ele) {
	  var srcElement = document.getElementById(ele);
	  if(srcElement != null) {
	    srcElement.innerHTML="[ + ]";
	  }
	},
	
	clearAll: function() {
	      DepartmentJS.close('qLinkDropdown');
	      DepartmentJS.close('departmentsDropdown');
	      DepartmentJS.close('mobileSearchDropdown');
	      DepartmentJS.close('searchDropdown');
	      dojo.query(".subDeptDropdown ").forEach(function(node){
	    	DepartmentJS.close(node.id);
	      });
	      
	      dojo.query(".col8 > ul > li ").forEach(function(node)
		  {
			DepartmentJS.swapGradBack(node.id);
		 });	  
	      
	      dojo.query(".col8 > ul > li > .navBorder").forEach(function(node)
	  	  {	    		
	  	  	DepartmentJS.borderTogOff(node.id);
		  });	      
	     
	      DepartmentJS.toggleOff('navSearchArrow');
	      dojo.query(".col8 > ul > li > .navBorder > .deptArrow").forEach(function(node)
	      {
	    	DepartmentJS.toggleOff(node.id);
	      });
		DepartmentJS.toggleOff("deptTog");
	  }		
	  	
	};		
}
