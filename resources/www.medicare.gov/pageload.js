$(document).ready(function () {
	var item = $(this);
	var sectionName;
	var currentURL=window.location.pathname;	
	
	sectionName=getSectionName(currentURL);	
	
	switch(sectionName) {
     case "sign-up-change-plans":
        item = $('a[href="/sign-up-change-plans/index.html"]');
		item.parent().addClass("activesection");
        break;
		
     case "your-medicare-costs":
        item = $('a[href="/your-medicare-costs/index.html"]');
		item.parent().addClass("activesection");
        break;
     case "what-medicare-covers":
        item = $('a[href="/what-medicare-covers/index.html"]');
		item.parent().addClass("activesection");
        break;
     case "part-d":
        item = $('a[href="/part-d/index.html"]');
		item.parent().addClass("activesection");
        break;
     case "supplement-other-insurance":
        item = $('a[href="/supplement-other-insurance/index.html"]');
		item.parent().addClass("activesection");
        break;
     case "claims-and-appeals":
        item = $('a[href="/claims-and-appeals/index.html"]');
		item.parent().addClass("activesection");
        break;
     case "manage-your-health":
        item = $('a[href="/manage-your-health/index.html"]');
		item.parent().addClass("activesection");
        break;
     case "forms-help-and-resources":
        item = $('a[href="/forms-help-and-resources/index.html"]');
		item.parent().addClass("activesection");
        break;
		
	}
	
function getSectionName(currentURL)
{	
	var pathArray = currentURL.split('/');	
	var currentSection = pathArray[1];	
	return currentSection;
}
});

