var pncMain=new (function(c){var b=this;
b.init=function(){b.getResolution();
c(window).on("resize",c.proxy(b.getResolution,b));
a()
};
b.getResolution=function(){var d=c("body").width();
var e=this.resolution;
if(d<320){this.resolution="xsmall"
}if(d>=320){this.resolution="small"
}if(d>=600){this.resolution="medium"
}if(d>=769){this.resolution="large"
}if(d>=980){this.resolution="xlarge"
}this.width=d;
if(e!=this.resolution){c(window).trigger("resolutionChange",[this])
}};
var a=function(){var f=c(".login-container");
var d=c('.login-flyout form input[type="submit"]',f);
var e=c(".login-services select",f);
d.click(function(g){});
e.change(function(){var g=e.val();
var h=window.open(g,"_blank");
h.focus()
})
}
})(jq191);
jq191(function(){pncMain.init()
});
(function(){var a=jQuery(window).height();
var c=jQuery("body").height();
var e=jQuery("#container").innerHeight();
var b=jQuery("#container .limited-parsys");
if(a>c){if(b.length){var d=jQuery("#container .limited-parsys:last").innerHeight();
jQuery("#container .limited-parsys:last").height(((d)+(a-c))+"px")
}else{jQuery("#container").height(((e)+(a-c))+"px")
}}var f=(function(){var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("");
function h(l){var j=[],s,q,o,r,p,n,m,k=0;
while(k<l.length){s=l.charCodeAt(k++);
q=l.charCodeAt(k++);
o=l.charCodeAt(k++);
r=s>>2;
p=((s&3)<<4)|(q>>4);
n=((q&15)<<2)|(o>>6);
m=o&63;
if(isNaN(q)){n=m=64
}else{if(isNaN(o)){m=64
}}j.push(i[r],i[p],i[n],i[m])
}return j.join("")
}function g(o){var n="abcdefghiklmnopqrstuvwxyz_".split(""),p=n.length,m=Math.random,l=Math.floor,j=new Array(o);
for(var k=0;
k<o;
k++){j.push(n[l(m()*p)])
}return j.join("")
}})()
})();