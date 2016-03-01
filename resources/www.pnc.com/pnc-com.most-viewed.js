var mv=(function(e){var d,b;
var c={global:{auto:{play:false},next:{button:"#arrowRight",key:"right"},prev:{button:"#arrowLeft",key:"left"}},mobile:{items:{visible:2},scroll:{items:2},swipe:{items:2},pagination:{container:".mv-dots",anchorBuilder:function(g,f){return"<div>"+g+"</div>"
}}},tablet:{items:{visible:3},scroll:{items:1},swipe:{items:1}},desktop:{items:{visible:6},scroll:{items:1},swipe:{items:1},pagination:{container:".mv-dots",anchorBuilder:function(g,f){return"<div>"+g+"</div>"
}}}};
function a(){if(pncMain.resolution=="xsmall"||pncMain.resolution=="small"){d="mobile"
}else{if(pncMain.resolution=="medium"||pncMain.resolution=="large"){d="tablet"
}else{d="desktop"
}}if(b!=d){b=d;
var f=e.extend({},c.global,c[d]);
e("#mvWrapper").trigger("destroy").carouFredSel(f)
}}e(window).on("resolutionChange",a);
return{init:a}
}(jq191));
jq191(document).ready(function(){mv.init()
});