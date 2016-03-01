(function(d){var e=window.location.hash;
var b;
d.fn.accordionify=function(){var f=this.length;
this.each(function(h){d(this).find(".subheading").append('<span class="toggle"/>').click(function(i){d(this).next().slideToggle("fast").parent().toggleClass("collapsed");
i.preventDefault()
});
var g=d(".accordion-content",d(this)).data("expanded");
if(!g){d(this).addClass("collapsed")
}})
};
d.fn.unaccordionify=function(){this.each(function(){d(this).removeClass("collapsed").find(".subheading").unbind("click").find(".toggle").remove();
d(this).find(".content").removeAttr("style")
})
};
d(document).ready(function(){d(".accordion-element").accordionify();
d(".accordion-reusable").accordionify();
d(".accordion-interactive").accordionify();
c();
a();
if(d("object").attr("data")){if(d("object").attr("data").indexOf("tools.pnc.com")>-1){d("object").attr("data",d("object").attr("data")+window.location.search)
}}});
d(document).ajaxComplete(function(){c();
a()
});
function a(f){d("a[href*=#]:not([href=#])").each(function(){d(this).click(function(){b=d(this).attr("href");
d("html, body").animate({scrollTop:d(b).offset().top},1000);
if(d(b).parent().hasClass("collapsed")){d(b).parent().removeClass("collapsed")
}d(b).siblings("div").attr("data-expanded","true");
d(b).siblings("div").css("display","block")
})
})
}function c(){if(d(e).parent().hasClass("collapsed")){d("html, body").animate({scrollTop:d(e).offset().top},1000);
if(d(e).parent().hasClass("collapsed")){d(e).parent().removeClass("collapsed")
}d(e).siblings("div").attr("data-expanded","true")
}}}(jq191));