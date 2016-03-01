(function(c){var b=new function(){var m=this;
var l,k,d,q,j;
var o=projectPath+"/admin/header.navigation-fragments.html";
var n=null;
var t=235;
m.init=function(){d=c(".header .search-container");
e();
if(c(window).width()>=980){h("mouseenter");
g("xlarge")
}else{h("click");
g("small")
}if(jQuery.browser.mobile||c(window).width()<980){p("click")
}else{p("mouseenter");
c(document).mousemove(function(A){var z=c(".item-l2");
if(!z.is(A.target)&&z.has(A.target).length===0){z.removeClass("selected");
z.next().removeClass("expanded")
}})
}if(jQuery.browser.mobile||c(window).width()<980){}else{var x=page_data;
if(x&&x!=="null"&&x!=="undefined"){var x=x.page_name.split("|");
var u="#484848";
var v;
var y;
var w;
if(x.length>1){if(x[0]=="personal-banking"){v=".main-nav ul.level-2.theme_orange a span";
u="#ed8726";
c(v).each(function(z,A){w=c(this).text().toLowerCase();
w=w.trim();
w=w.replace(/\s/g,"-");
w=w.replace(/&/g,"and");
if(w==x[1]){c(this).css("color",u)
}})
}else{if(x[0]=="small-business"){v=".main-nav ul.level-2.theme_green a span";
u="#6db33f";
c(v).each(function(z,A){w=c(this).text().toLowerCase();
w=w.trim();
w=w.replace(/\s/g,"-");
w=w.replace(/&/g,"and");
if(w==x[1]){c(this).css("color",u)
}})
}else{if(x[0]=="corporate-and-institutional"){v=".main-nav ul.level-2.theme_sky a span";
u="#0096d6";
c(v).each(function(z,A){w=c(this).text().toLowerCase();
w=w.trim();
w=w.replace(/\s/g,"-");
w=w.replace(/&/g,"and");
w=w.replace(/asset/g,"investment");
if(w==x[1]){c(this).css("color",u)
}})
}else{if(x[0]=="about-pnc"){v=".main-nav ul.level-2.theme_blue a span";
u="#0073b2";
c(v).each(function(z,A){w=c(this).text().toLowerCase();
w=w.trim();
w=w.replace(/\s/g,"-");
w=w.replace(/&/g,"and");
if(w==x[1]){c(this).css("color",u)
}})
}else{if(x[0]=="admin"){if(x[1]=="full-navigation"){jQuery(".aside-links li:nth-child(2) a").css("color","#ed8726")
}}}}}}}else{if(x.length==1){if(x[0]=="personal-banking"){v=".main-nav ul.level-2.theme_orange a span";
jQuery(v).css("color",u)
}else{if(x[0]=="small-business"){v=".main-nav ul.level-2.theme_green a span";
jQuery(v).css("color",u)
}else{if(x[0]=="corporate-and-institutional"){v=".main-nav ul.level-2.theme_sky a span";
jQuery(v).css("color",u)
}else{if(x[0]=="about-pnc"){v=".main-nav ul.level-2.theme_blue a span";
jQuery(v).css("color",u)
}else{if(x[0]=="customer-service"){jQuery(".aside-links li:nth-child(1) a").css("color","#ed8726")
}else{if(x[0]=="security-assurance"){jQuery(".aside-links li:nth-child(3) a").css("color","#ed8726")
}}}}}}}}}}c(document).mouseup(function(A){var z=c(".item-l2");
var B=c(".login-container");
if(!z.is(A.target)&&z.has(A.target).length===0){z.removeClass("selected");
z.next().removeClass("expanded")
}if(!B.is(A.target)&&B.has(A.target).length===0){B.removeClass("expanded")
}else{z.removeClass("selected");
z.next().removeClass("expanded")
}});
c(window).on("resolutionChange",function(A,z){s(z.resolution);
g(z.resolution)
});
c("#userId").focus()
};
var h=function(v){c(".level-1").each(function(){c(this).unbind()
});
var u=c(".level-2.expanded .item-l2",k).length;
k.attr("data-current-l2",u);
c(".level-1").each(function(){var x=c(this);
var w=c(this).next();
x.on(v,function(z){z.preventDefault();
if(x.hasClass("selected")){if(c(window).width()<980){x.removeClass("selected");
x.next().removeClass("expanded")
}}else{var y=c(".item-l2",c(w)).length;
d.attr("style","");
c(".item-l2:last-child",k).attr("style","");
c(".level-1").removeClass("selected");
if(c(window).width()<980){c(".level-2").removeClass("expanded");
x.next().addClass("expanded");
x.addClass("selected")
}}})
})
};
var p=function(u){c(".subitem",l).each(function(){c(this).unbind()
});
c(".subitem",l).each(function(){c(this).on(u,function(v){v.preventDefault();
var w=c(this).closest("li");
if(w.hasClass("selected")){w.removeClass("selected");
if(c(window).width()<980){}}else{c("ul.level-2 li",l).removeClass("selected");
c(this).closest("li").addClass("selected")
}})
})
};
var e=function(u){k=c(".header");
l=c(".main-nav");
d=c(".header .search-container");
q=c(".header .links-fragment");
j=c(".header .promos-fragment");
c(".nav-toggle").on("click",function(v){v.preventDefault();
l.toggleClass("expanded");
d.toggleClass("expanded")
});
c(".login-toggle").on("click",function(v){v.preventDefault();
c(this).parent().toggleClass("expanded");
l.removeClass("expanded");
d.removeClass("expanded")
});
if(c(window).width()>=980){f()
}};
var g=function(u){d=c(".header .search-container");
var v=d.width();
$text=c('input[type="text"]',d);
if(u=="xlarge"){$text.focus(function(){v=d.width();
d.animate({width:t},200);
if(parseInt(k.attr("data-current-l2"))==5){c(".item-l2:last-child",k).hide(200)
}});
$text.blur(function(){if(parseInt(k.attr("data-current-l2"))==5){d.animate({width:v},200);
c(".item-l2:last-child",k).show(200)
}})
}else{$text.unbind();
d.attr("style","")
}};
var f=function(){if(m.mainNavContent==null){m.mainNavContent=true;
c.ajax({url:o,success:function(u){m.mainNavContent=c.trim(u);
r(m.mainNavContent)
}})
}};
var r=function(w){var u=c(".header-wrapper .item-l2");
var v=c(".item-l2",c(w));
v.each(function(H){var A=v[H];
var z=u[H];
var y=c(".copy-text",A);
var G=c(".promos-fragment",z);
var I=c(".nav-promo-fragment",A);
var J=c(".nav-l3-fragment li:first-child",A);
J.addClass("title");
var C=c(".nav-l3-fragment li:last-child",A);
C.addClass("title");
var D=c(".level-3.first-column",z);
var F=c(".level-3.second-column",z);
var E=c(".see-all-link",J);
var B=c(".see-all-link",C);
var x=c('<li class="see-all"></li>').append(E);
var K=c('<li class="see-all"></li>').append(B);
D.prepend(J).append(x);
F.prepend(C).append(K);
c(".subitem",z).append(y);
G.append(I.html())
})
};
var s=function(u){if(u=="large"||u=="xlarge"){if(m.mainNavContent==null){f()
}else{l.removeClass("expanded");
d.removeClass("expanded")
}}if(c(window).width()>=980){h("mouseenter");
g("xlarge")
}else{h("click");
g("small")
}if(jQuery.browser.mobile||c(window).width()<980){p("click")
}else{p("mouseenter");
c(document).mousemove(function(w){var v=c(".item-l2");
if(!v.is(w.target)&&v.has(w.target).length===0){v.removeClass("selected");
v.next().removeClass("expanded")
}})
}}
};
c(function(){(function(f){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|android|ipad|playbook|silk|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(f)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(f.substr(0,4))
})(navigator.userAgent||navigator.vendor||window.opera);
b.init();
var d="";
jQuery("#navSearchForm").submit(function(g){g.preventDefault();
var f=jQuery("#navSearchField").val();
if(f!=""){c.ajax({async:false,type:"POST",url:"/bin/pnc/searchrail",data:{query:f},dataType:"text"}).done(function(h){console.log("done updating the rail values");
window.location="/en/search-results.html?q="+encodeURIComponent(f)
}).fail(function(h,k,j){console.log("there was an error"+k)
})
}});
var e=function(j,f){var k=jQuery("#searchField").val();
var h={q:j.term,client:"pnc-com-custom",format:"rich"},g="pnc-com-all";
if(g.length!==0){h.site=g
}jQuery.getJSON(GSA_HOST+"/suggest?callback=?",h,function(m){var l=[];
c.each(m.results,function(){l.push(this.name)
});
f(l)
})
};
if(jQuery("#navSearchField").length){jQuery("#navSearchField:not(.ui-autocomplete-input)").autocomplete({source:e,select:function(f,g){}});
jQuery("#navSearchField").on("autocompleteselect",function(f,g){window.location="/en/search-results.html?q="+encodeURIComponent(g.item.value)
})
}c(".signon-link").each(function(){var f=c("body").width();
if(f>=600){c(this).click(function(){setTimeout(function(){c(".login-container").addClass("expanded");
c("#userId").focus()
},200)
})
}else{c(this).attr("href","https://m.pnc.com")
}})
});
c(document).ajaxComplete(function(){if(c(".external-pop")){c(".external-pop").each(function(f){if(!c(this).attr("rel")){var d=c(this).attr("href");
c(this).attr("href","#");
c(this).attr("rel",d)
}})
}c(".external-pop").click(function(d){d.preventDefault();
exHref=c(d.currentTarget).attr("rel");
if(c("body #leaving-overlay").length==0){c("body").append("<div id='leaving-overlay'><img src='/content/dam/pnc-com/images/universal/pnc_main_logo.png' alt='PNC Bank' /> <h2>You are now leaving pnc.com</h2> <p><strong>Thanks for visiting.</strong></p><p>PNC provides links to third-party web sites as a convenience to our visitors.  We have no control over linked sites and make no representations about any content, products or services available at these locations.  Such sites may have different privacy, security and accessibility standards.  When you access another web site, we recommend that you review their terms and conditions, and privacy and security policies.</p><div style='width:200px;margin:0 auto;'><div class='btn-blue' id='continueBtn' style='float:left;cursor:pointer'><span><a>Continue</a></span></div><div class='btn-gray' id='canceleBtn' style='float:right;cursor:pointer'><span><a>Cancel</a></span></div></div></div>");
c("#continueBtn").on("click",function(f){window.open(exHref,"_blank");
jQuery.fancybox.close()
});
c("#canceleBtn").on("click",function(f){jQuery.fancybox.close()
})
}jQuery.fancybox.open({padding:30,openSpeed:150,closeSpeed:150,autoSize:false,height:300,helpers:{overlay:{css:{background:"transparent",filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#D2eeeeee,endColorstr=#D2eeeeee)",zoom:"1",background:"rgba(238, 238, 238, 0.85)"}}},href:"#leaving-overlay"})
});
c(".signon-link").each(function(){var d=c("body").width();
if(d>=600){c(this).click(function(){setTimeout(function(){c(".login-container").addClass("expanded");
c("#userId").focus()
},200)
})
}else{c(this).attr("href","https://m.pnc.com")
}});
a()
});
c(".login-flyout .uid-block #save-user-id").mouseenter(function(){c(".login-container .tooltip").fadeIn("fast")
});
c(".login-flyout .uid-block #save-user-id").mouseleave(function(){c(".login-container .tooltip").fadeOut("fast")
});
c("#save_user_id").change(function(){if(!c(this).is(":checked")){updateIDs();
if(c.cookie("pncsids")!=null){a()
}else{c("#userIdInput").html("<input type='text' name='userId' id='userId' placeholder='ENTER USER ID' autocomplete='off' />");
c("#save_user_id").prop("checked",false);
c("#save_user_id").prop("disabled",false)
}}});
function a(){if(c.cookie("pncsids")!=null){var g="<select name='userId' id='userId' onchange='updateLogin(this)'>";
var f=false;
if(c.cookie("pncsids").indexOf("~")!=-1){var e=c.cookie("pncsids").split("~");
for(i=0;
i<e.length;
i++){var d=e[i].split(":")[0];
if(i==0){g+="<option value='"+d+"' selected>"+d+"</option>"
}else{g+="<option value='"+d+"'>"+d+"</option>"
}}if(e.length==3){f=true
}}else{g+="<option value='"+c.cookie("pncsids").split(":")[0]+"' selected>"+c.cookie("pncsids").split(":")[0]+"</option>"
}if(f){g+="<option value='newLoginMax'>Enter Another User ID</option>"
}else{g+="<option value='newLogin'>Enter Another User ID</option>"
}g+="</select>";
c("#userIdInput").html(g);
c("#save_user_id").prop("checked",true);
c("#save_user_id").prop("disabled",false)
}}})(jq191);
function updateIDs(){if(!jq191("#save_user_id").prop("checked")&&!jq191("#userId").is("input:text")){if(jq191.cookie("pncsids")!=null){if(jq191.cookie("pncsids").indexOf("~")!=-1){var c="";
var b=jq191.cookie("pncsids").split("~");
for(i=0;
i<b.length;
i++){var d=b[i].split(":")[0];
if(jq191("#userId").val()!=d){if(c==""){c+=b[i]
}else{c+="~"+b[i]
}}else{removeToken(b[i].split(":")[1])
}}jq191.cookie.raw=true;
jq191.cookie("pncsids",c,{path:"/",domain:".pnc.com"})
}else{var d=jq191.cookie("pncsids").split(":")[0];
if(jq191("#userId").val()==d){removeToken(jq191.cookie("pncsids").split(":")[1]);
var a=jq191.removeCookie("pncsids",{path:"/",domain:".pnc.com"})
}}}}}function removeToken(b){var a=WBB_URL.replace("alservlet/OnlineBankingServlet","");
jq191.ajax({type:"POST",url:a+"alservlet/CookieTokenServlet",data:{token:b,userId:WBB_COOKIE_USER,password:WBB_COOKIE_PWD},success:function(){},error:function(e,c,d){}})
}function updateLogin(a){if(jQuery(a).val()=="newLogin"){jQuery("#userIdInput").html("<input type='text' name='userId' id='userId' placeholder='ENTER USER ID' autocomplete='off' />");
jQuery("#save_user_id").prop("checked",false);
jQuery("#save_user_id").prop("disabled",false)
}else{if(jQuery(a).val()=="newLoginMax"){jQuery("#userIdInput").html("<input type='text' name='userId' id='userId' placeholder='ENTER USER ID' autocomplete='off' />");
jQuery("#save_user_id").prop("checked",false);
jQuery("#save_user_id").prop("disabled",true)
}else{jQuery("#save_user_id").prop("checked",true);
jQuery("#save_user_id").prop("disabled",false)
}}};