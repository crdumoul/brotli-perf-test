var formComponentes = function()
{
	return { 
		init: function () {
			$("select").each(function(){ 
				$(this).selectmenu();				  
			});
		}
	};
	
}(); 

var inFieldLabel = function()
{
	return { 
		init: function () { 
			$(".inField").each(function(idx) {
                $(".inField:eq("+idx+"), .inField:eq("+idx+") + input").wrapAll("<span class='inFieldWrapper'/>");
            });
			
            $("label.inField").inFieldLabels();
		}
	};
	
}(); 