if(!window.CQ_Analytics){window.CQ_Analytics={}
}CQ_Analytics.Operator=(function(){return function(){}
})();
CQ_Analytics.Operator.IS="is";
CQ_Analytics.Operator.EQUALS="equals";
CQ_Analytics.Operator.NOT_EQUAL="notequal";
CQ_Analytics.Operator.GREATER="greater";
CQ_Analytics.Operator.GREATER_OR_EQUAL="greaterorequal";
CQ_Analytics.Operator.OLDER="older";
CQ_Analytics.Operator.OLDER_OR_EQUAL="olderorequal";
CQ_Analytics.Operator.LESS="less";
CQ_Analytics.Operator.LESS_OR_EQUAL="lessorequal";
CQ_Analytics.Operator.YOUNGER="younger";
CQ_Analytics.Operator.YOUNGER_OR_EQUAL="youngerorequal";
CQ_Analytics.Operator.CONTAINS="contains";
CQ_Analytics.Operator.BEGINS_WITH="beginswith";
CQ_Analytics.OperatorActions=function(){var mapping={};
var addOperator=function(name,text,operation){mapping[name]=[text,operation]
};
addOperator(CQ_Analytics.Operator.EQUALS,"equals","==");
addOperator(CQ_Analytics.Operator.IS,"is","==");
addOperator(CQ_Analytics.Operator.NOT_EQUAL,"is not equal to","!=");
addOperator(CQ_Analytics.Operator.GREATER,"is greater than",">");
addOperator(CQ_Analytics.Operator.GREATER_OR_EQUAL,"is equal to or greater than",">=");
addOperator(CQ_Analytics.Operator.OLDER,"is older than",">");
addOperator(CQ_Analytics.Operator.OLDER_OR_EQUAL,"is equal to or older than",">=");
addOperator(CQ_Analytics.Operator.LESS,"is less than","<");
addOperator(CQ_Analytics.Operator.LESS_OR_EQUAL,"is equal to or less than","<=");
addOperator(CQ_Analytics.Operator.YOUNGER,"is younger than","<");
addOperator(CQ_Analytics.Operator.YOUNGER_OR_EQUAL,"is equal to or younger than","<=");
addOperator(CQ_Analytics.Operator.CONTAINS,"contains",function(s1,s2){if(s1){if(s2){s1=""+s1;
s2=""+s2;
return s1.toLowerCase().indexOf(s2.toLowerCase())!=-1
}return true
}return false
});
addOperator(CQ_Analytics.Operator.BEGINS_WITH,"begins with",function(s1,s2){if(s1){if(s2){s1=""+s1;
s2=""+s2;
return s1.toLowerCase().indexOf(s2.toLowerCase())==0
}return true
}return false
});
var getByIndex=function(op,index){if(mapping[op]&&mapping[op][index]){return mapping[op][index]
}return""
};
var escapeQuote=function(str){if(str){str=str.replace(new RegExp("\\'","ig"),str)
}return str
};
return{getText:function(operator){return getByIndex(operator,0)
},setText:function(operator,newText){if(mapping[operator]&&mapping[operator][0]){mapping[operator][0]=newText
}},getOperation:function(operator){return getByIndex(operator,1)
},operate:function(object,property,operator,value,valueFormat){try{if(object&&object[property]){var toEval="";
var op=this.getOperation(operator);
op=op?op:operator;
var objectValue=CQ.shared.XSS.getXSSTablePropertyValue(object,property);
if(typeof op=="function"){return op.call(this,objectValue,value,valueFormat)
}else{if(valueFormat){toEval=valueFormat+"('"+objectValue+"') "+op+" "+valueFormat+"('"+value+"')"
}else{var s1=escapeQuote(objectValue);
var s2=escapeQuote(value);
toEval="'"+s1+"' "+op+" '"+s2+"'"
}var b=eval(toEval);
return b
}}}catch(e){}return false
}}
}();
CQ_Analytics.Utils=new function(){return{registerDocumentEventHandler:function(c,b){var a=window.document[c];
if(typeof window.document[c]!="function"){window.document[c]=b
}else{window.document[c]=function(d){if(a){a(d)
}b(d)
}
}},eventWrapper:function(a){return function(d){var c,b;
if(document.all){c=window.event.keyCode;
b=window.event
}else{c=(typeof(d.which)!="undefined")?d.which:0;
b=d
}if(b){a(b,c)
}}
},loadElement:function(a,b){$CQ("#"+b).load(a)
},loadTeaserElement:function(a,d){var e=$CQ("#"+d).css("height");
var f=$CQ("#"+d).height();
if(f>0){$CQ("#"+d).css("height",f)
}var g=function(m){if(m&&m!=""){var h=$CQ(m).css("display","none");
$CQ("#"+d).append(h);
h.fadeIn(function(){if(e&&e!="0px"){$CQ("#"+d).css("height",e)
}})
}else{if(e&&e!="0px"){$CQ("#"+d).css("height",e)
}}};
var j=function(h,m){if(!CQ_Analytics.Utils.teasersCache){CQ_Analytics.Utils.teasersCache={}
}CQ_Analytics.Utils.teasersCache[h]=m
};
var b=function(){if(CQ_Analytics.Utils.teasersCache&&CQ_Analytics.Utils.teasersCache[a]){g(CQ_Analytics.Utils.teasersCache[a])
}else{CQ_Analytics.Utils.teasersLoading=CQ_Analytics.Utils.teasersLoading||{};
if(CQ_Analytics.Utils.teasersLoading[a]){window.setTimeout(function(){CQ_Analytics.Utils.loadTeaserElement(a,d)
},100)
}else{CQ_Analytics.Utils.teasersLoading[a]=true;
k()
}}};
var k=function(){var m=a;
var h=location.href;
if(typeof CQ_CONTENT_PATH!="undefined"){h=CQ_CONTENT_PATH
}var n=CQ.shared.HTTP.getParameter(h,"wcmmode");
if(n){m+=(m.indexOf("?")>0?"&":"?")+"wcmmode="+n
}CQ.shared.HTTP.get(m,function(s,r,p){if(r){var q=p.body;
if(q){q=q.replace(new RegExp("\\n","ig"),"");
q=q.replace(new RegExp("\\r","ig"),"");
j(a,q);
delete CQ_Analytics.Utils.teasersLoading[a];
b()
}}else{j(a,"")
}})
};
var c=$CQ("#"+d).children().length;
if(c>0){var l=0;
$CQ("#"+d).children().fadeOut(function(){var h=$CQ(this);
window.setTimeout(function(){h.remove();
l++;
if(l>=c){b()
}},50)
})
}else{b()
}},clearElement:function(a){if(a){$CQ("#"+a).html("")
}},indexOf:function(d,c){for(var b=0,a=d.length;
b<a;
b++){if(d[b]==c){return b
}}return -1
},load:function(a,c,b){return CQ.shared.HTTP.get(a,c,b)
},post:function(a,d,c,b){return CQ.shared.HTTP.post(a,d,c,b)
},getPagePath:function(){return CQ.shared.HTTP.getPath()
},getPath:function(a){return CQ.shared.HTTP.getPath(a)
},addParameter:function(b,a,c){return CQ.shared.HTTP.addParameter(b,a,c)
},removeParameters:function(a){return CQ.shared.HTTP.removeParameters(a)
},removeAnchor:function(a){return CQ.shared.HTTP.removeAnchor(a)
},getSchemeAndAuthority:function(a){return CQ.shared.HTTP.getSchemeAndAuthority(a)
},internalize:function(a,b){return CQ.shared.HTTP.internalize(b)
},externalize:function(a,b){return CQ.shared.HTTP.externalize(a,b)
},encodePathOfURI:function(a){return CQ.shared.HTTP.encodePathOfURI(a)
},encodePath:function(a){return CQ.shared.HTTP.encodePath(a)
},getContextPath:function(){return CQ.shared.HTTP.getContextPath()
},detectContextPath:function(){return CQ.shared.HTTP.detectContextPath()
},urlEncode:function(h){if(!h){return""
}if(typeof h=="string"){return h
}var c=[];
for(var f in h){var e=h[f],b=encodeURIComponent(f);
var g=typeof e;
if(g=="undefined"){c.push(b,"=&")
}else{if(g!="function"&&g!="object"){c.push(b,"=",encodeURIComponent(e),"&")
}else{if(typeof e=="array"){if(e.length){for(var d=0,a=e.length;
d<a;
d++){c.push(b,"=",encodeURIComponent(e[d]===undefined?"":e[d]),"&")
}}else{c.push(b,"=&")
}}}}}c.pop();
return c.join("")
},getUID:function(){var a=Math.floor(Math.random()*(Math.pow(2,42)-1));
return this.getTimestamp().toString(16)+a.toString(16)
},getTimestamp:function(){var a=new Date();
return a.getTime()
},insert:function(d,c,b){if(!d||isNaN(c)||!b){return d
}var a="";
var f=0;
var e=c;
while(e<d.length){a+=d.substring(f,e)+b;
f+=c;
e+=c
}if(f<d.length){a+=d.substring(f)
}return a
},addListener:function(){if(window.addEventListener){return function(d,b,c,a){d.addEventListener(b,c,(a))
}
}else{if(window.attachEvent){return function(d,b,c,a){d.attachEvent("on"+b,c)
}
}else{return function(){}
}}},removeListener:function(){if(window.removeEventListener){return function(d,b,c,a){d.removeEventListener(b,c,(a))
}
}else{if(window.detachEvent){return function(c,a,b){c.detachEvent("on"+a,b)
}
}else{return function(){}
}}}}
};
CQ_Analytics.ClickstreamcloudRenderingUtils=new function(){return{createLink:function(f,d,b,a){var c=document.createElement("a");
c.href=a;
c.onclick=d;
c.innerHTML=f;
if(b){for(var e in b){if(b.hasOwnProperty(e)){c[e]=b[e]
}}}return c
},createStaticLink:function(d,a,c){var b=document.createElement("a");
b.href=a;
b.innerHTML=d;
b.title=c;
b.alt=c;
return b
},createNameValue:function(b,d,a,e){var c=document.createElement("span");
c.className=a||"ccl-data";
c.innerHTML=b+" = "+d;
c.title=e;
c.alt=e;
return c
},createText:function(d,a,c){var b=document.createElement("span");
b.className=a||"ccl-data";
if(d&&d.indexOf&&((d.indexOf("/home")!=-1&&d.indexOf("/image")!=-1)||(d.indexOf("/")!=-1&&d.indexOf(".png")!=-1))){b.innerHTML='<img src="'+d+'.prof.thumbnail.png" border="0">'
}else{if(d&&d.indexOf&&d.indexOf("www.gravatar.com")!=-1){b.innerHTML='<img src="'+d+'">'
}else{b.innerHTML=d
}}b.title=c;
b.alt=c;
return b
},createEditablePropertySpan:function(b,d){var a="var editSpan = this.nextSibling; this.style.display = 'none'; editSpan.style.display = 'block';";
var e="var editSpan = this.parentNode; var readSpan = this.parentNode.previousSibling;var newValue = this.value;editSpan.style.display = 'none'; readSpan.innerHTML = '"+b+" = '+value; readSpan.style.display = 'block';";
var c=document.createElement("span");
c.innerHTML='<span class="ccl-data" onclick="'+a+'">'+b+" = "+d+"</span>";
c.innerHTML+='<span class="ccl-data" style="display: none;">'+b+' = <input class="ccl-input" type="text" value="'+d+'" onblur="'+e+'"></span>';
c.className="ccl-data";
return c
}}
};
CQ_Analytics.ClientContextUtils=new function(){return{renderStoreProperty:function(f,c,b,d,e,a){if(CQ_Analytics&&CQ_Analytics.CCM){CQ_Analytics.CCM.onReady(function(){var g=function(){var h=CQ_Analytics.StoreRegistry.getStore(c);
if(h){var j=function(){var n=h.getProperty(b)||a;
var m=$CQ("#"+f);
if(m.attr("contenteditable")&&m.attr("contenteditable")!="inherit"){return
}if(typeof(n)=="string"&&((n.indexOf("/")==0&&(n.toLowerCase().indexOf(".png")!=-1||n.toLowerCase().indexOf(".jpg")!=-1||n.toLowerCase().indexOf(".gif")!=-1)||n.toLowerCase().indexOf("http")==0))){if(!n||n==""){m.children().remove();
if(CQ_Analytics.isUIAvailable){m.html(CQ.I18n.getMessage("No",null,"Ex: No address, No keywords")+" "+b)
}else{m.html("No "+b)
}}else{var k="";
if(m.parents(".cq-cc-thumbnail").length==0||n.toLowerCase().indexOf("http")==0||n.indexOf("/libs/wcm/mobile")==0){k=n.replace(new RegExp("&amp;","g"),"&")
}else{k="/etc/clientcontext/shared/thumbnail/content.png";
k=CQ.shared.HTTP.addParameter(k,"path",CQ_Analytics.Variables.replaceVariables(n))
}k=CQ_Analytics.Variables.replaceVariables(k);
var l=m.find("div").css("background-image")||"";
if(l.indexOf(k+")")===-1){if(h.fireEvent("beforepropertyrender",h,f)!==false){m.html("");
m.children().remove();
$CQ("<div>").addClass("cq-cc-thumbnail-img").css("background-image","url("+CQ.shared.HTTP.externalize(k)+")").appendTo(m);
h.fireEvent("propertyrender",h,f)
}}}}else{n=CQ_Analytics.Variables.replaceVariables(n);
if(CQ_Analytics.isUIAvailable){n=(!n||n=="")?CQ.I18n.getMessage("No",null,"Ex: No address, No keywords")+" "+b:n=d+n+e
}else{n=(!n||n=="")?"No "+b:n=d+n+e
}if(m.html()!=n){if(h.fireEvent("beforepropertyrender",h,f)!==false){m.html(n);
h.fireEvent("propertyrender",h,f)
}}}};
if(h.fireEvent("beforeinitialpropertyrender",h,f)!==false){j();
if(h.addListener){h.addListener("update",function(){j()
})
}h.fireEvent("initialpropertyrender",h,f)
}}};
CQ_Analytics.ClientContextUtils.onStoreRegistered(c,g)
})
}},renderStore:function(b,a){if(CQ_Analytics&&CQ_Analytics.CCM&&b&&a){CQ_Analytics.CCM.onReady(function(){var c=function(){var d=CQ_Analytics.StoreRegistry.getStore(a);
if(d){d.divId=b;
var e=function(){if(d.fireEvent("beforerender",d,d.divId)!==false){d.renderer(d,d.divId);
d.fireEvent("render",d,d.divId)
}};
if(d.fireEvent("beforeinitialrender",d,b)!==false){e();
if(d.addListener){d.addListener("update",function(){e()
})
}d.fireEvent("initialrender",d,b)
}}};
CQ_Analytics.ClientContextUtils.onStoreRegistered(a,c)
})
}},storesOptionsProvider:function(){var c=[];
var a=CQ_Analytics.StoreRegistry.getStores();
for(var b in a){c.push({value:b})
}return c
},storePropertiesOptionsProvider:function(c,e){var b=[];
var a=CQ_Analytics.StoreRegistry.getStore(c);
if(a){var g=a.getPropertyNames();
for(var d=0;
d<g.length;
d++){var f=g[d];
if(!CQ.shared.XSS.KEY_REGEXP.test(f)){var h={value:f};
if(e){h.text=f+" - "+a.getProperty(f)
}b.push(h)
}}}return b
},onStoreRegistered:function(b,c){if(c){var a=CQ_Analytics.StoreRegistry.getStore(b);
if(a){c.call(a,a)
}else{CQ_Analytics.CCM.addListener("storeregister",function(f,d){if(d.getName()==b){c.call(d,d)
}})
}}},onStoreInitialized:function(c,e,b){if(b===true){b=CQ_Analytics.ClientContextUtils.DEFAULT_INIT_DELAY
}var d=function(){var f=CQ_Analytics.StoreRegistry.getStore(c);
if(f.DELAYED_INIT_TIMEOUT){window.clearTimeout(f.DELAYED_INIT_TIMEOUT);
f.DELAYED_INIT_TIMEOUT=null
}if(b>0){f.DELAYED_INIT_TIMEOUT=window.setTimeout(function(){f.DELAYED_INIT_TIMEOUT=null;
e.call(f,"initialize",f)
},b)
}else{e.call(f,"initialize",f)
}};
var a=CQ_Analytics.StoreRegistry.getStore(c);
if(a){if(a.isInitialized()){d.call(a);
a.addListener("initialize",function(g,f){d.call(f)
})
}else{a.addListener("initialize",function(g,f){d.call(f)
})
}}else{CQ_Analytics.CCM.addListener("storeregister",function(g,f){if(f.getName()==c){CQ_Analytics.ClientContextUtils.onStoreInitialized(c,e,b)
}})
}},init:function(e,d,b){CQ_Analytics.ClientContextMgr.PATH=e;
CQ_Analytics.ClientContextMgr.loadConfig(b,true);
var a=CQ.shared.HTTP.externalize(e+"/content/jcr:content/stores.init.js");
a=CQ.shared.HTTP.addParameter(a,"path",d);
a=CQ.shared.HTTP.noCaching(a);
var c=CQ.shared.HTTP.get(a)
},initUI:function(c,a,b){CQ_Analytics.ClientContextUI.create(c,a,b)
}}
};
CQ_Analytics.ClientContextUtils.DEFAULT_INIT_DELAY=200;
CQ_Analytics.Variables=new function(){return{containsVariable:function(a){return CQ_Analytics.Variables.getVariables(a).length>0
},getVariables:function(b){if(!b||typeof(b)!="string"){return[]
}var a=b.match(new RegExp("\\$\\{([\\w/]*)\\}","ig"));
return a?a:[]
},replaceVariables:function(e){if(!e){return e
}var f="";
var d=e;
var g=CQ_Analytics.Variables.getVariables(e);
while(g.length>0&&f.indexOf(g.join())==-1){for(var c=0;
c<g.length;
c++){var b=CQ_Analytics.Variables.getPropertyPath(g[c]);
var a=CQ_Analytics.ClientContext.get(b)||"";
d=CQ_Analytics.Variables.replace(d,b,a)
}f+=g.join();
g=CQ_Analytics.Variables.getVariables(d)
}return d
},getPropertyPath:function(a){if(!a||a.length<2){return null
}return a.substring(2,a.length-1)
},getPropertyName:function(a){var c=CQ_Analytics.Variables.getPropertyPath(a);
if(c){var b=c.split("/");
if(b.length==3){return b[2]
}}return null
},getStoreName:function(a){var c=CQ_Analytics.Variables.getPropertyPath(a);
if(c){var b=c.split("/");
if(b.length>1){return b[1]
}}return null
},replace:function(a,b,c){return a.replace(new RegExp("\\$\\{"+b+"\\}","ig"),c)
}}
};
CQ_Analytics.SessionPersistence=CQ.shared.ClientSidePersistence;
CQ_Analytics.Cookie=CQ.shared.ClientSidePersistence.CookieHelper;
CQ_Analytics.Observable=function(){this.fireEvent=function(d){if(d&&this.listeners&&!this.suppressEvents){d=d.toLowerCase();
var b=Array.prototype.slice.call(arguments,0);
var e=this.listeners.slice(0);
for(var c=0;
c<e.length;
c++){var a=e[c];
if(d==a.event){if(a.fireFn.apply(a.scope||this||window,b)===false){return false
}}}}return true
}
};
CQ_Analytics.Observable.prototype.addListener=function(c,a,b){this.listeners=this.listeners||new Array();
if(c&&a){this.listeners.push({event:c.toLowerCase(),fireFn:a,scope:b})
}};
CQ_Analytics.Observable.prototype.removeListener=function(c,a){this.listeners=this.listeners||new Array();
if(c&&a){for(var b=0;
b<this.listeners.length;
b++){if(this.listeners[b].event==c&&this.listeners[b].fireFn==a){this.listeners.splice(b,1)
}}}};
CQ_Analytics.Observable.prototype.setSuppressEvents=function(a){this.suppressEvents=a
};
CQ_Analytics.Observable.prototype.listeners=null;
CQ_Analytics.Observable.prototype.suppressEvents=false;
if(!CQ_Analytics.StoreRegistry){CQ_Analytics.StoreRegistry=new function(){var a={};
return{register:function(b){if(b.STORENAME){a[b.STORENAME]=b
}},getStores:function(){return a
},getStore:function(b){return a[b]
}}
}()
}CQ_Analytics.SessionStore=function(){};
CQ_Analytics.SessionStore.prototype=new CQ_Analytics.Observable();
CQ_Analytics.SessionStore.prototype.setProperty=function(a,b){if(this.data==null){this.init()
}this.data[a]=b;
this.fireEvent("update",a)
};
CQ_Analytics.SessionStore.prototype.setProperties=function(b){if(this.data==null){this.init()
}var d=[];
for(var a in b){if(b.hasOwnProperty(a)){d.push(a);
var c=b[a];
this.data[a]=c
}}if(d.length>0){this.fireEvent("update",d)
}};
CQ_Analytics.SessionStore.prototype.initialized=false;
CQ_Analytics.SessionStore.prototype.init=function(){this.initialized=true;
this.fireEvent("initialize",this)
};
CQ_Analytics.SessionStore.prototype.getLabel=function(a){return a
};
CQ_Analytics.SessionStore.prototype.getLink=function(a){return a
};
CQ_Analytics.SessionStore.prototype.removeProperty=function(a){if(this.data==null){this.init()
}if(this.data[a]){delete this.data[a]
}this.fireEvent("update",a)
};
CQ_Analytics.SessionStore.prototype.getPropertyNames=function(a){if(this.data==null){this.init()
}a=a?a:[];
var b=new Array();
for(var c in this.data){if(CQ_Analytics.Utils.indexOf(a,c)==-1){b.push(c)
}}return b
};
CQ_Analytics.SessionStore.prototype.getSessionStore=function(){return this
};
CQ_Analytics.SessionStore.prototype.clear=function(){this.data=null
};
CQ_Analytics.SessionStore.prototype.getData=function(b){if(this.data==null){this.init()
}if(b){var a={};
for(var c in this.data){if(CQ_Analytics.Utils.indexOf(b,c)==-1){a[c]=this.data[c]
}}return a
}else{return this.data
}};
CQ_Analytics.SessionStore.prototype.reset=function(){if(this.data!=null){this.data=null;
this.fireEvent("update")
}};
CQ_Analytics.SessionStore.prototype.getProperty=function(b,a){if(this.data==null){this.init()
}var d=this.data[b];
if(!a){var c=CQ.shared.XSS.getXSSValue(d);
return c
}return d
};
CQ_Analytics.SessionStore.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.SessionStore.prototype.addInitProperty=function(a,b){if(!this.initProperty){this.initProperty={}
}this.initProperty[a]=b
};
CQ_Analytics.SessionStore.prototype.getInitProperty=function(a){return this.initProperty?this.initProperty[a]:null
};
CQ_Analytics.SessionStore.prototype.loadInitProperties=function(c,a){if(c){for(var b in c){this.addInitProperty(b,c[b]);
if(a&&this.data&&this.data[b]===undefined){this.setProperty(b,c[b])
}}}};
CQ_Analytics.SessionStore.prototype.isInitialized=function(){return this.initialized
};
CQ_Analytics.PersistedSessionStore=function(){};
CQ_Analytics.PersistedSessionStore.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.PersistedSessionStore.prototype.STOREKEY="key";
CQ_Analytics.PersistedSessionStore.prototype.setNonPersisted=function(a){if(!this.nonPersisted){this.nonPersisted={}
}this.nonPersisted[a]=true
};
CQ_Analytics.PersistedSessionStore.EXCLUDED_PROPERTIES_REGEX="^generated*";
CQ_Analytics.PersistedSessionStore.prototype.isPersisted=function(a){if(!this.nonPersisted){this.nonPersisted={}
}return this.nonPersisted[a]!==true&&!new RegExp(CQ_Analytics.PersistedSessionStore.EXCLUDED_PROPERTIES_REGEX,"ig").test(a)&&!$CQ.isFunction(this.data[a])&&(typeof this.data[a])!="object"
};
CQ_Analytics.PersistedSessionStore.prototype.getStoreKey=function(){return this.STOREKEY
};
CQ_Analytics.PersistedSessionStore.prototype.persist=function(){if(this.fireEvent("beforepersist")!==false){var a=new CQ_Analytics.SessionPersistence({container:"ClientContext"});
a.set(this.getStoreKey(),this.toString());
this.fireEvent("persist")
}};
CQ_Analytics.PersistedSessionStore.prototype.setProperty=function(a,b){if(this.data==null){this.init()
}this.data[a]=b;
if(this.isPersisted(a)){this.persist()
}this.fireEvent("update",a)
};
CQ_Analytics.PersistedSessionStore.prototype.setProperties=function(b){if(this.data==null){this.init()
}var d=[];
var e=false;
for(var a in b){if(b.hasOwnProperty(a)){d.push(a);
var c=b[a];
this.data[a]=c;
if(this.isPersisted(a)){e=true
}}}if(e){this.persist()
}if(d.length>0){this.fireEvent("update",d)
}};
CQ_Analytics.PersistedSessionStore.prototype.toString=function(){var b=null;
if(this.data){var a=function(e){if(!e||typeof(e)!="string"){return e
}var d=e;
d=d.replace(new RegExp(",","g"),"&#44;");
d=d.replace(new RegExp("=","g"),"&#61;");
d=d.replace(new RegExp("\\|","g"),"&#124;");
return d
};
for(var c in this.data){if(this.isPersisted(c)&&this.data.hasOwnProperty(c)){b=(b===null?"":b+",");
b+=(c+"="+a(this.data[c]))
}}}return b
};
CQ_Analytics.PersistedSessionStore.prototype.parse=function(e){var d=function(h){if(!h||typeof(h)!="string"){return h
}var g=h;
g=g.replace(new RegExp("&#44;","g"),",");
g=g.replace(new RegExp("&#61;","g"),"=");
g=g.replace(new RegExp("&#124;","g"),"|");
return g
};
var c={};
var f=e.split(",");
for(var a in f){if(f.hasOwnProperty(a)){var b=f[a].split("=");
if(b.length==2){c[b[0]]=d(b[1])
}}}return c
};
CQ_Analytics.PersistedSessionStore.prototype.reset=function(a){if(this.data!=null){this.data={};
this.persist();
this.data=null;
if(!a){this.fireEvent("update")
}}};
CQ_Analytics.PersistedSessionStore.prototype.removeProperty=function(a){if(this.data==null){this.init()
}if(this.data[a]){delete this.data[a];
if(this.isPersisted(a)){this.persist()
}}this.fireEvent("update",a)
};
CQ_Analytics.PersistedSessionStore.prototype.clear=function(){var a=new CQ_Analytics.SessionPersistence({container:"ClientContext"});
a.remove(this.getStoreKey());
this.data=null
};
if(!CQ_Analytics.ClientContextMgr){CQ_Analytics.ClientContextMgr=function(){this.clientcontext=null;
this.clientcontextToServer=null;
this.stores={};
this.data=null;
this.config=null;
this.isConfigLoaded=false;
this.areStoresLoaded=false
};
CQ_Analytics.ClientContextMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.ClientContextMgr.prototype.STOREKEY="CLIENTCONTEXT";
CQ_Analytics.ClientContextMgr.prototype.STORENAME="clientcontext";
CQ_Analytics.ClientContextMgr.prototype.INITIALIZATION_EVENT_TIMER=1000;
CQ_Analytics.ClientContextMgr.prototype.CONFIG_PATH=CQ_Analytics.Utils.externalize("/etc/clientcontext/legacy/config.json",true);
CQ_Analytics.ClientContextMgr.prototype.init=function(){if(!this.initialized){this.clientcontext={};
this.clientcontextToServer={}
}var a=new CQ_Analytics.SessionPersistence({container:"ClientContext"});
var b=a.get(this.getStoreKey());
if(b){this.data=this.parse(b)
}else{this.data={}
}this.initialized=true;
this.fireEvent("initialize",this)
};
CQ_Analytics.ClientContextMgr.prototype.getSessionId=function(){if(!this.data.sessionId){this.setSessionId(CQ_Analytics.Utils.getUID())
}return this.data.sessionId
};
CQ_Analytics.ClientContextMgr.prototype.setSessionId=function(a){if(a){this.setProperty("sessionId",a)
}};
CQ_Analytics.ClientContextMgr.prototype.getVisitorId=function(){return this.data.visitorId
};
CQ_Analytics.ClientContextMgr.prototype.setVisitorId=function(a){this.setProperty("visitorId",a)
};
CQ_Analytics.ClientContextMgr.prototype.getId=function(){var a=this.getVisitorId();
if(!a){return this.getSessionId()
}return a
};
CQ_Analytics.ClientContextMgr.prototype.isAnonymous=function(){var a=this.getVisitorId();
return(!a)
};
CQ_Analytics.ClientContextMgr.prototype.isMode=function(a){return CQ_Analytics.ClientContextMgr.ServerStorage.isMode(a)
};
CQ_Analytics.ClientContextMgr.prototype.get=function(a){if(this.clientcontext==null){this.init()
}if(a){return this.clientcontextToServer
}return this.clientcontext
};
CQ_Analytics.ClientContextMgr.prototype.register=function(c){if(this.clientcontext==null){this.init()
}var a=this;
this.clientcontext[c.getName()]=c.getData();
this.stores[c.getName()]=c;
CQ_Analytics.StoreRegistry.register(c);
var b=this.getStoreConfig(c.getName());
if(b.stats!==false&&b.stats!="false"){this.clientcontextToServer[c.getName()]=c.getData(b.excludedFromStats)
}if(this.initTimer){window.clearTimeout(this.initTimer);
this.initTimer=null
}var d=this.isConfigLoaded&&typeof this.config.initializationEventTimer!=="undefined"?this.config.initializationEventTimer:this.INITIALIZATION_EVENT_TIMER;
this.initTimer=window.setTimeout(function(){a.fireEvent("storesinitialize");
a.areStoresInitialized=true
},d);
c.addListener("update",function(){a.update(c)
});
CQ_Analytics.ClientContextMgr.ServerStorage.handleStoreRegistration(c);
this.addListener("clear",function(){c.clear()
});
this.fireEvent("storeregister",c);
this.fireEvent("storeupdate",c)
};
CQ_Analytics.ClientContextMgr.prototype.update=function(b){if(this.clientcontext==null){this.init()
}this.clientcontext[b.getName()]=b.getData();
var a=this.getStoreConfig(b.getName());
if(a.stats!==false&&a.stats!="false"){this.clientcontextToServer[b.getName()]=b.getData(a.excludedFromStats)
}this.fireEvent("storeupdate",b)
};
CQ_Analytics.ClientContextMgr.prototype.startPosting=function(){return CQ_Analytics.ClientContextMgr.ServerStorage.startPosting()
};
CQ_Analytics.ClientContextMgr.prototype.stopPosting=function(){return CQ_Analytics.ClientContextMgr.ServerStorage.stopPosting()
};
CQ_Analytics.ClientContextMgr.prototype.post=function(){return CQ_Analytics.ClientContextMgr.ServerStorage.post()
};
CQ_Analytics.ClientContextMgr.prototype.getCCMToJCR=function(){return CQ_Analytics.ClientContextMgr.ServerStorage.getCCMToJCR()
};
CQ_Analytics.ClientContextMgr.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.ClientContextMgr.prototype.clear=function(){this.clientcontext=null;
this.clientcontextToServer=null;
this.fireEvent("clear")
};
CQ_Analytics.ClientContextMgr.prototype.getRegisteredStore=function(a){return this.stores&&this.stores[a]?this.stores[a]:null
};
CQ_Analytics.ClientContextMgr.prototype.loadConfig=function(c,autoConfig){var setConfig=function(ccm,config){if(typeof config==="undefined"){config={}
}ccm.config=config;
ccm.isConfigLoaded=true;
ccm.fireEvent("configloaded");
ccm.fireEvent("storesloaded");
ccm.areStoresLoaded=true
};
if(c){setConfig(this,c)
}else{if(!autoConfig){var params={};
params.path=CQ_Analytics.Utils.getPagePath();
params.cq_ck=new Date().valueOf();
var url=this.CONFIG_PATH;
url+="?"+CQ_Analytics.Utils.urlEncode(params);
CQ_Analytics.Utils.load(url,function(data,status,response){var config={};
try{config=eval("config = "+response.responseText)
}catch(error){}setConfig(this,config)
},this)
}else{setConfig(this,{})
}}};
CQ_Analytics.ClientContextMgr.prototype.getConfig=function(){return this.config
};
CQ_Analytics.ClientContextMgr.prototype.getStoreConfig=function(a){if(this.config&&this.config.configs&&this.config.configs[a]&&this.config.configs[a]["store"]){return this.config.configs[a]["store"]
}return{}
};
CQ_Analytics.ClientContextMgr.prototype.getEditConfig=function(a){if(this.config&&this.config.configs&&this.config.configs[a]&&this.config.configs[a]["edit"]){return this.config.configs[a]["edit"]
}return{}
};
CQ_Analytics.ClientContextMgr.prototype.getUIConfig=function(a){if(this.config&&this.config.configs&&this.config.configs[a]&&this.config.configs[a]["ui"]){return this.config.configs[a]["ui"]
}return{}
};
CQ_Analytics.ClientContextMgr.prototype.getInitialData=function(a){if(this.config&&this.config.data&&this.config.data[a]){return this.config.data[a]
}return{}
};
CQ_Analytics.ClientContextMgr.prototype.getStores=function(){return this.stores
};
CQ_Analytics.ClientContextMgr.prototype.onReady=function(b,a){if(b){if(this.areStoresLoaded){b.call(a)
}else{this.addListener("storesloaded",b,a)
}}};
CQ_Analytics.ClientContextMgr=CQ_Analytics.CCM=new CQ_Analytics.ClientContextMgr();
CQ_Analytics.ClickstreamcloudMgr=CQ_Analytics.CCM;
CQ_Analytics.ContextCloudMgr=CQ_Analytics.CCM;
CQ_Analytics.ClientContextMgr.PATH=null;
CQ_Analytics.ClientContextMgr.getClientContextURL=function(a){return CQ_Analytics.ClientContextMgr.PATH+a
};
window.setTimeout(function(){CQ_Analytics.CCM.init()
},1);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var b in CQ_Analytics.ClientContextMgr){delete CQ_Analytics.ClientContextMgr[b]
}CQ_Analytics.ClientContextMgr=null
}catch(a){}CQ_Analytics.CCM=null
})
}if(CQ_Analytics.ClientContextMgr&&!CQ_Analytics.ClientContextMgr.ServerStorage){CQ_Analytics.ClientContextMgr.ServerStorage=function(){this.posting=false;
this.initialized=false
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_PAGELOAD=1;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_TIMER=2;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_DATAUPDATE=4;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_TIMER=600;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_PROCESS_TIMER=60;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE=6;
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_PATH="/var/statistics/";
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.init=function(){if(this.isMode(CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_TIMER)){var a=this;
var b=function(){a.timer=window.setInterval(function(){try{var d=parseInt(a.data.lastPost);
var f=false;
if(isNaN(d)){f=true
}else{var e=new Date().getTime();
if(e>d+CQ_Analytics.ClientContextMgr.ServerStorage.POST_TIMER*1000){f=true
}}}catch(c){}if(f){a.post()
}},CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER*1000)
};
b.call(this)
}this.initialized=true
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.isMode=function(a){return(CQ_Analytics.CCM.POST_MODE&a)>0
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.handleStoreRegistration=function(a){if(!this.initialized){this.init()
}if(this.isMode(CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_DATAUPDATE)){a.addListener("persist",function(){CQ_Analytics.ClientContextMgr.ServerStorage.post(a)
})
}};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.startPosting=function(){this.posting=true
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.stopPosting=function(){this.posting=false
};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.post=function(d,f){if(this.posting||f){try{var g=this.getCCMToJCR(d);
var e=CQ_Analytics.Utils.getTimestamp();
g["./jcr:primaryType"]="nt:unstructured";
g["./sessionId"]=CQ_Analytics.CCM.getSessionId();
var c=this.POST_PATH+"clientcontext/";
if(CQ_Analytics.CCM.isAnonymous()){var a=CQ_Analytics.Utils.insert(CQ_Analytics.CCM.getId(),2,"/");
c+="anonymous/"+a+"/"+e
}else{c+="users/"+CQ_Analytics.CCM.getId()+"/"+e
}CQ_Analytics.Utils.post(c,null,g);
this.lastPost=e
}catch(b){}}};
CQ_Analytics.ClientContextMgr.ServerStorage.prototype.getCCMToJCR=function(g){var c=CQ_Analytics.CCM.get(true);
var e={};
for(var j in c){if(!g||j==g){var a=c[j],b=encodeURIComponent(j);
var f=typeof a;
if(f=="object"){for(var d in a){var h=a[d];
d=d.replace(":","/");
e["./"+j+"/./"+d]=h
}}else{e["./"+j]=a
}}}return e
};
CQ_Analytics.ClientContextMgr.ServerStorage=new CQ_Analytics.ClientContextMgr.ServerStorage();
CQ_Analytics.ClickstreamcloudMgr.POST_MODE_PAGELOAD=CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_PAGELOAD;
CQ_Analytics.ClickstreamcloudMgr.POST_MODE_TIMER=CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_TIMER;
CQ_Analytics.ClickstreamcloudMgr.POST_MODE_DATAUPDATE=CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_DATAUPDATE;
CQ_Analytics.ClickstreamcloudMgr.POST_TIMER=CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER;
CQ_Analytics.ClickstreamcloudMgr.POST_PROCESS_TIMER=CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER;
CQ_Analytics.ClickstreamcloudMgr.POST_MODE=CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE;
CQ_Analytics.ClickstreamcloudMgr.POST_PATH=CQ_Analytics.ClientContextMgr.ServerStorage.POST_PATH
}CQ_Analytics.Percentile={};
CQ_Analytics.Percentile.matchesPercentiles=function(b){var d=ClientContext.get("/surferinfo/percentile");
if(!d){d=Math.round(Math.random()*100);
ClientContext.set("/surferinfo/percentile",d)
}for(var c=0;
c<b.length;
c++){var a=b[c];
if((a.start<=d)&&(d<a.end)){return true
}}return false
};
if(!CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr=function(){this.SEGMENTATION_ROOT="/etc/segmentation";
this.SEGMENT_SELECTOR=".segment.js";
this.SEGMENTATION_SCRIPT_LOADER="cq-segmentation-loader";
this.segments={};
this.boosts={};
var a=this;
this.fireUpdate=function(){a.fireEvent("update")
};
this.init()
};
CQ_Analytics.SegmentMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.SegmentMgr.prototype.STORENAME="segments";
CQ_Analytics.SegmentMgr.prototype.register=function(a,c,b){this.segments[a]=c;
if(this.rulesCache&&this.rulesCache[a]){this.rulesCache[a]=false
}this.boosts[a]=!isNaN(b)?parseInt(b):0;
this.fireUpdate()
};
CQ_Analytics.SegmentMgr.prototype.resolveArray=function(e,g,b){g=g||CQ_Analytics.ClientContextMgr.get();
if(!(e instanceof Array)){return this.resolve(e,g)
}b=(b=="AND"?"AND":"OR");
var a=(b=="AND");
for(var d=0;
d<e.length;
d++){var f=e[d];
var c=this.resolve(f,g);
if(b=="AND"){if(c!==true){return c
}}else{if(c===true){return true
}}}return a
};
CQ_Analytics.SegmentMgr.prototype.resolve=function(segmentPath,clientcontext){clientcontext=clientcontext||CQ_Analytics.ClientContextMgr.get();
if(!segmentPath){return false
}if(segmentPath instanceof Array){return this.resolveArray(segmentPath,clientcontext)
}if(segmentPath.indexOf(this.SEGMENTATION_ROOT)!=0){return false
}if(segmentPath==this.SEGMENTATION_ROOT){return true
}if(!this.segments[segmentPath]){return true
}var parent=segmentPath.substring(0,segmentPath.lastIndexOf("/"));
if(parent.indexOf(this.SEGMENTATION_ROOT)==0){var pres=this.resolve(parent,clientcontext);
if(pres!==true){return pres
}}var rules="function(clientcontext, contextcloud, clickstreamcloud) { return true ";
rules+=" && ( "+this.segments[segmentPath]+" ) ";
rules+=";}";
var res=true;
try{var f=null;
this.rulesCache=this.rulesCache||{};
if(this.rulesCache[segmentPath]){f=this.rulesCache[segmentPath]
}else{eval("f = "+rules+"");
this.rulesCache[segmentPath]=f
}var e=(f==null||f(clientcontext,clientcontext,clientcontext));
res=res&&(e===true)
}catch(error){return"Unresolved - Error while evaluating segment "+segmentPath+" : "+error.message
}return res
};
CQ_Analytics.SegmentMgr.prototype.getResolved=function(c){c=c||CQ_Analytics.ClientContextMgr.get();
var a=new Array();
for(var b in this.segments){if(this.resolve(b,c)===true){a.push(b)
}}return a
};
CQ_Analytics.SegmentMgr.prototype.getMaxBoost=function(e,g){if(!(e instanceof Array)){return this.getBoost(e)
}var c=0;
for(var d=0;
d<e.length;
d++){var f=e[d];
if(this.resolve(f,g)===true){var a=this.boosts[f]||0;
if(a>c){c=a
}}}return c
};
CQ_Analytics.SegmentMgr.prototype.getBoost=function(a){if(!(a instanceof Array)){a=[a]
}return this.boosts[a]||0
};
CQ_Analytics.SegmentMgr.prototype.reload=function(path){var url=path;
if(!url){url=this.SEGMENTATION_ROOT
}if(url){if(url.indexOf(this.SEGMENT_SELECTOR)==-1){url+=this.SEGMENT_SELECTOR
}try{CQ_Analytics.Utils.load(url,function(config,status,response){if(response&&response.responseText){eval(response.responseText)
}},this);
var response=CQ.HTTP.get(scripts[i].src)
}catch(err){}}};
CQ_Analytics.SegmentMgr.prototype.getSessionStore=function(){return this
};
CQ_Analytics.SegmentMgr.prototype.getProperty=function(a){return a
};
CQ_Analytics.SegmentMgr.prototype.getLink=function(a){return a+".html"
};
CQ_Analytics.SegmentMgr.prototype.getLabel=function(c){if(c){var b=c;
var a=b.lastIndexOf("/");
if(a!=-1){b=b.substring(a+1,b.length)
}var d=this.resolve(c);
if(d===true){return b
}else{if(d!==true){return'<span class="invalid" title="'+d+'" alt="'+d+'">'+b+"</span>"
}}}return c
};
CQ_Analytics.SegmentMgr.prototype.getPropertyNames=function(){return this.getResolved()
};
CQ_Analytics.SegmentMgr=new CQ_Analytics.SegmentMgr();
CQ_Analytics.SegmentMgr.loadSegments=function(a){CQ_Analytics.SegmentMgr.areSegmentsLoaded=false;
CQ.shared.HTTP.get(CQ.shared.HTTP.externalize(a+".segment.js"));
CQ_Analytics.SegmentMgr.areSegmentsLoaded=true;
this.fireEvent("segmentsload")
};
CQ_Analytics.SegmentMgr.renderer=function(a,c){if(a&&a.STORENAME==CQ_Analytics.SegmentMgr.STORENAME){var e=a.getPropertyNames();
var f=[];
f.push("<div>");
for(var d=0;
d<e.length;
d++){var b=e[d];
f.push('<span title="'+a.getProperty(b)+'" ><a href="'+CQ.shared.HTTP.externalize(a.getLink(b))+'"  title="'+a.getProperty(b)+'" >'+a.getLabel(b)+"</a></span>")
}f.push("</div>");
$CQ("#"+c).children().remove();
$CQ("#"+c).append(f.join(""))
}};
CQ_Analytics.ClientContextMgr.addListener("storeupdate",CQ_Analytics.SegmentMgr.fireUpdate);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var b in CQ_Analytics.SegmentMgr){delete CQ_Analytics.SegmentMgr[b]
}}catch(a){}CQ_Analytics.SegmentMgr=null
})
}if(!CQ_Analytics.StrategyMgr){CQ_Analytics.StrategyMgr=function(){this.strategies={}
};
CQ_Analytics.StrategyMgr.prototype={};
CQ_Analytics.StrategyMgr.prototype.isRegistered=function(a){return !!this.strategies[a]
};
CQ_Analytics.StrategyMgr.prototype.register=function(b,a){if(typeof a=="function"){this.strategies[b]=a
}};
CQ_Analytics.StrategyMgr.prototype.choose=function(b,a){if(a.length==1){return a[0]
}if(this.strategies[b]){return this.strategies[b].call(this,a)
}return null
};
CQ_Analytics.StrategyMgr=new CQ_Analytics.StrategyMgr()
}CQ_Analytics.StrategyMgr.register("clickstream-score",function(h){if(h.length==1){return h[0]
}var a=[];
if(CQ_Analytics.TagCloudMgr){var m=CQ_Analytics.TagCloudMgr.getTags();
m=m||{};
var l=-1;
for(var e=0;
e<h.length;
e++){var g=0;
var k=h[e].tags;
if(k){for(var d=0;
d<k.length;
d++){var f=k[d].tagID;
g+=parseInt(m[f])||0
}}if(g==l){a.push(h[e])
}else{if(g>l){a=[];
a.push(h[e]);
l=g
}}}}else{a=h
}if(a.length==1){return a[0]
}var b=null;
if(CQ_Analytics.PageDataMgr){b=CQ_Analytics.PageDataMgr.getProperty("random")
}if(!b){b=window.CQ_StrategyRandom
}if(!b){b=window.CQ_StrategyRandom=Math.random()
}if(parseFloat(b)>1){b=1/b
}if(parseFloat(b)==1){b=0
}var c=Math.floor(b*a.length);
return a[c]
});
CQ_Analytics.StrategyMgr.register("first",function(a){return a[0]
});
CQ_Analytics.StrategyMgr.register("random",function(c){var a=null;
if(CQ_Analytics.PageDataMgr){a=CQ_Analytics.PageDataMgr.getProperty("random")
}if(!a){a=window.CQ_StrategyRandom
}if(!a){a=window.CQ_StrategyRandom=Math.random()
}if(parseFloat(a)>1){a=1/a
}if(parseFloat(a)==1){a=0
}var b=Math.floor(a*c.length);
return c[b]
});
if(!CQ_Analytics.PageDataMgr){CQ_Analytics.PageDataMgr=function(){};
CQ_Analytics.PageDataMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.PageDataMgr.prototype.STORENAME="pagedata";
CQ_Analytics.PageDataMgr.prototype.FORCE_EXPERIENCE_COOKIE="cq-forceexperience";
CQ_Analytics.PageDataMgr.prototype.init=function(){this.data={};
for(var a in this.initProperty){this.data[a]=this.initProperty[a]
}this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.PageDataMgr.prototype.getLabel=function(a){return a
};
CQ_Analytics.PageDataMgr.prototype.getLink=function(a){return""
};
CQ_Analytics.PageDataMgr.prototype.setExperience=function(a){CQ.shared.HTTP.setCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE,a,"/")
};
CQ_Analytics.PageDataMgr.prototype.getExperience=function(){return CQ.shared.HTTP.getCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE,"/")
};
CQ_Analytics.PageDataMgr.prototype.clearExperience=function(){CQ.shared.HTTP.clearCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE,"/")
};
CQ_Analytics.PageDataMgr=new CQ_Analytics.PageDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.init();
CQ_Analytics.CCM.register(this)
},CQ_Analytics.PageDataMgr)
}CQ_Analytics.BrowserInfo=function(){var g=navigator.userAgent.toLowerCase();
var d=function(b){return b.test(g)
};
var f=function(){if(d(/opera/)){return{browserFamily:"Opera",browserVersion:""}
}if(d(/chrome/)){return{browserFamily:"Chrome",browserVersion:""}
}if(d(/safari/)){if(d(/applewebkit\/4/)){return{browserFamily:"Safari",browserVersion:"2"}
}if(d(/version\/3/)){return{browserFamily:"Safari",browserVersion:"3"}
}if(d(/version\/4/)){return{browserFamily:"Safari",browserVersion:"4"}
}if(d(/version\/5/)){return{browserFamily:"Safari",browserVersion:"5"}
}if(d(/version\/6/)){return{browserFamily:"Safari",browserVersion:"6"}
}return{browserFamily:"Safari",browserVersion:"7 or higher"}
}if(d(/webkit/)){return{browserFamily:"WebKit",browserVersion:""}
}if(d(/msie/)){if(d(/msie 6/)){return{browserFamily:"IE",browserVersion:"6"}
}if(d(/msie 7/)){return{browserFamily:"IE",browserVersion:"7"}
}if(d(/msie 8/)){return{browserFamily:"IE",browserVersion:"8"}
}if(d(/msie 9/)){return{browserFamily:"IE",browserVersion:"9"}
}if(d(/msie 10/)){return{browserFamily:"IE",browserVersion:"10"}
}return{browserFamily:"IE",browserVersion:"11 or higher"}
}if(d(/gecko/)){if(d(/rv:1\.8/)){return{browserFamily:"Firefox",browserVersion:"2"}
}if(d(/rv:1\.9/)){return{browserFamily:"Firefox",browserVersion:"3"}
}if(d(/rv:2.0/)){return{browserFamily:"Firefox",browserVersion:"4"}
}if(d(/rv:5./)){return{browserFamily:"Firefox",browserVersion:"5"}
}if(d(/rv:6./)){return{browserFamily:"Firefox",browserVersion:"6"}
}if(d(/rv:7./)){return{browserFamily:"Firefox",browserVersion:"7"}
}if(d(/rv:8./)){return{browserFamily:"Firefox",browserVersion:"8"}
}if(d(/rv:9./)){return{browserFamily:"Firefox",browserVersion:"9"}
}return{browserFamily:"Firefox",browserVersion:"10 or higher"}
}var b=d(/adobeair/);
if(b){return{browserFamily:"Adobe AIR",browserVersion:""}
}return{browserFamily:"Unresolved",browserVersion:"Unresolved"}
};
var e=function(){if(d(/windows 98|win98/)){return"Windows 98"
}if(d(/windows nt 5.0|windows 2000/)){return"Windows 2000"
}if(d(/windows nt 5.1|windows xp/)){return"Windows XP"
}if(d(/windows nt 5.2/)){return"Windows Server 2003"
}if(d(/windows nt 6.0/)){return"Windows Vista"
}if(d(/windows nt 6.1/)){return"Windows 7"
}if(d(/windows nt 4.0|winnt4.0|winnt/)){return"Windows NT 4.0"
}if(d(/windows me/)){return"Windows ME"
}if(d(/mac os x/)){if(d(/ipad/)||d(/iphone/)){return"iOS"
}return"Mac OS X"
}if(d(/macintosh|mac os/)){return"Mac OS"
}if(d(/android/)){return"Android"
}if(d(/linux/)){return"Linux"
}return"Unresolved"
};
var c=function(){if(d(/ipad/)){return"iPad"
}if(d(/iphone/)){return"iPhone"
}if(d(/mobi/)){return"Mobile"
}return"Desktop"
};
var a=f.call();
this.browserFamily=a.browserFamily;
this.browserVersion=a.browserVersion;
this.OSName=e.call();
this.deviceType=c.call();
this.ua=g;
var h=/^https/i.test(window.location.protocol);
this.screenResolution=screen.width+"x"+screen.height
};
CQ_Analytics.BrowserInfo.prototype={getBrowserName:function(){return this.browserFamily+" "+this.browserVersion
},getBrowserFamily:function(){return this.browserFamily
},getBrowserVersion:function(){return this.browserVersion
},getOSName:function(){return this.OSName
},getScreenResolution:function(){return this.screenResolution
},getDeviceType:function(){return this.deviceType
},getUserAgent:function(){return this.ua
},isMobile:function(a){if(!a){a=this.getDeviceType()
}a=a?a.toLowerCase():"desktop";
return a!="desktop"
},isIE:function(a){return this.getBrowserFamily()=="IE"&&(a?this.getBrowserVersion()==a:true)
},isIE6:function(){return this.isIE("6")
},isIE7:function(){return this.isIE("7")
},isIE8:function(){return this.isIE("8")
},isIE9:function(){return this.isIE("9")
}};
CQ_Analytics.BrowserInfoInstance=new CQ_Analytics.BrowserInfo();
if(!CQ_Analytics.MousePositionMgr){CQ_Analytics.MousePositionMgr=function(){this.position={x:0,y:0};
this.getPageX=function(c){var b=c.pageX;
if(!b&&0!==b){b=c.clientX||0
}return b
};
this.getPageY=function(b){var c=b.pageY;
if(!c&&0!==c){c=b.clientY||0
}return c
};
var a=this;
this.timer=null;
$CQ(document).bind("mousemove",function(h,g,f,l){var j=h||window.event;
if(j){if(!a.timer){var d=a.getPageX(j);
var k=a.getPageY(j);
a.timer=setTimeout(function(){a.setPosition(d,k);
a.timer=null
},500)
}}});
this.init()
};
CQ_Analytics.MousePositionMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.MousePositionMgr.prototype.STORENAME="mouseposition";
CQ_Analytics.MousePositionMgr.prototype.setPosition=function(a,b){this.position.x=a;
this.position.y=b;
this.fireEvent("update")
};
CQ_Analytics.MousePositionMgr.prototype.getProperty=function(a){return this.position[a]
};
CQ_Analytics.MousePositionMgr.prototype.getLabel=function(a){return a
};
CQ_Analytics.MousePositionMgr.prototype.getLink=function(a){return""
};
CQ_Analytics.MousePositionMgr.prototype.getPropertyNames=function(){var a=new Array();
for(var b in this.position){a.push(b)
}return a
};
CQ_Analytics.MousePositionMgr.prototype.getSessionStore=function(){return this
};
CQ_Analytics.MousePositionMgr.prototype.getData=function(a){return this.position
};
CQ_Analytics.MousePositionMgr.prototype.clear=function(){this.position={}
};
CQ_Analytics.MousePositionMgr=new CQ_Analytics.MousePositionMgr();
CQ_Analytics.CCM.register(CQ_Analytics.MousePositionMgr)
}if(!CQ_Analytics.EventDataMgr){CQ_Analytics.EventDataMgr=function(){};
CQ_Analytics.EventDataMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.EventDataMgr.prototype.STORENAME="eventdata";
CQ_Analytics.EventDataMgr.prototype.init=function(){this.data={};
for(var a in this.initProperty){this.data[a]=this.initProperty[a]
}this.initialized=true;
this.fireEvent("initialize",this);
if(typeof(this.initProperty)!="undefined"){this.fireEvent("update")
}};
CQ_Analytics.EventDataMgr.prototype.getLabel=function(a){return a
};
CQ_Analytics.EventDataMgr.prototype.getLink=function(a){return""
};
CQ_Analytics.EventDataMgr=new CQ_Analytics.EventDataMgr();
CQ_Analytics.EventDataMgr.init();
CQ_Analytics.CCM.register(CQ_Analytics.EventDataMgr)
}if(!window.CQ_Context){window.CQ_Context=function(){};
window.CQ_Context.prototype=new CQ_Analytics.Observable();
window.CQ_Context.prototype.getProfile=function(){return(function(){return{getUserId:function(){return this.getProperty("authorizableId")
},getDisplayName:function(){var a=this.getProperty("formattedName");
if(a){return a
}a=this.getProperty("displayName");
if(a){return a
}return this.getUserId()
},getFirstname:function(){return this.getProperty("givenName")
},getLastname:function(){return this.getProperty("familyName")
},getEmail:function(){return this.getProperty("email")
},getProperty:function(a){if(CQ_Analytics&&CQ_Analytics.ProfileDataMgr){return CQ_Analytics.ProfileDataMgr.getProperty(a)
}return""
},getProperties:function(){if(CQ_Analytics&&CQ_Analytics.ProfileDataMgr){return CQ_Analytics.ProfileDataMgr.getData()
}return{}
},getAvatar:function(){return this.getProperty("avatar")
},onUpdate:function(a,b){if(a&&CQ_Analytics&&CQ_Analytics.ProfileDataMgr){CQ_Analytics.ProfileDataMgr.addListener("update",a,b||this)
}}}
})()
};
window.CQ_Context=new window.CQ_Context()
}CQ_Analytics.Engine=function(){window.CQ_trackTeasersStats=true;
function l(){return !!(window.CQ&&CQ.WCM&&CQ.WCM.isEditMode())
}function a(){return !!(window.CQ&&CQ.WCM&&CQ.WCM.isPreviewMode())
}function e(p){var n=$CQ.Deferred();
var o=CQ.WCM.getEditable(p);
if(o){n.resolve(o)
}else{CQ.WCM.onEditableReady(p,function(q){n.resolve(q)
})
}return n.promise()
}function h(o,n){if(!CQ_Analytics.loadedTeasersStack){CQ_Analytics.loadedTeasersStack=[];
$CQ(window).unload(function(){try{var p=CQ_Analytics.loadedTeasersStack;
if(p){delete CQ_Analytics.loadedTeasersStack;
var r=n;
for(var s=0;
s<p.length;
s++){r=CQ.shared.HTTP.addParameter(r,"path",p[s])
}CQ.shared.HTTP.get(r,function(){})
}}catch(q){}})
}CQ_Analytics.loadedTeasersStack.push(o.path)
}function f(t,s,p){var r="",u;
function n(z,y,A,x){return'<a href="'+y+'" class="cq-teaser-segment-link"><img src="'+A+'" class="cq-teaser-decision-thumbnail '+(x?"cq-teaser-decision-match":"cq-teaser-decision-nomatch")+'"></a>'+z+"<br>"
}for(var q=0;
q<t.length;
q++){var o=t[q];
var w=CQ.shared.HTTP.externalize(o.teaser.path+".html");
if(o.hasOwnProperty("boost")){if(o.noSegment){u=CQ.I18n.getMessage("Experience: {0} - match (no segments, boost = {1})",[o.teaser.title,o.boost])
}else{u=CQ.I18n.getMessage("Experience: {0} - match (boost = {1})",[o.teaser.title,o.boost])
}var v=n(u,w,o.teaser.thumbnail,true);
if(s===o.teaser.path){r+="<b>"+v+"</b>"
}else{r+=v
}}else{if(o.unknownSegment){u=CQ.I18n.getMessage("Experience: {0} - no match (unknown segment)",[o.teaser.title])
}else{u=CQ.I18n.getMessage("Experience: {0} - no match",[o.teaser.title])
}r+=n(u,w,o.teaser.thumbnail,false)
}}r+="<br>";
if(p){r+=CQ.I18n.getMessage("Strategy <b>{0}</b> selected current teaser.",p)
}else{r+=CQ.I18n.getMessage("No strategy configured, used the first match.")
}r+="<br>";
return r
}function m(p,o,n,q){p.done(function(r){if(r.teaserToolTip){r.teaserToolTip.hide();
r.teaserToolTip.remove()
}r.teaserToolTip=new CQ.Ext.Tip({html:f(o,n,q),title:CQ.I18n.getMessage("Selection decision"),width:450,autoHide:false,closable:true,height:300,floating:true,autoHeight:false,bodyStyle:"overflow-y: scroll;"});
r.on(CQ.wcm.EditRollover.EVENT_SHOW_HIGHTLIGHT,function(s){if(!this.teaserInfoButton){this.teaserInfoButton=CQ.Ext.DomHelper.append("CQ",{tag:"div",cls:"x-tool x-tool-help cq-teaser-tooltip-tool"},true);
this.teaserInfoButton.position("absolute");
this.teaserInfoButton.on("click",function(){var t=this.getXY();
r.teaserToolTip.setPosition(t[0]-460,t[1]-100);
r.teaserToolTip.show()
})
}this.teaserInfoButton.anchorTo(s.frameBottom.getEl(),"tr",[-26,-15]);
this.teaserInfoButton.show()
});
r.on(CQ.wcm.EditRollover.EVENT_HIDE_HIGHTLIGHT,function(s){if(this.teaserInfoButton){this.teaserInfoButton.hide()
}})
})
}function k(n){n.done(function(o){if(o.teaserToolTip){o.teaserToolTip.hide();
o.teaserToolTip.remove();
o.teaserToolTip=null
}})
}function c(w,v){var r=[];
var t=0;
for(var p=0;
p<w.length;
p++){var o=w[p],s=o.segments;
var n;
if(v){n={teaser:o};
v.push(n)
}var q=!s||s.length===0;
if(q&&n){n.noSegment=true
}if(!q&&CQ_Analytics.SegmentMgr.resolve(s)){q=true;
if(s&&s.length>0){if(!CQ_Analytics.SegmentMgr.segments[s[0]]){q=false;
if(n){n.unknownSegment=true
}}}}if(q){var u=CQ_Analytics.SegmentMgr.getMaxBoost(s);
if(n){n.boost=u
}if(u===t){r.push(o)
}else{if(u>t){r=[];
r.push(o);
t=u
}}}}return r
}var b={};
function g(n,o){CQ_Analytics.Engine.stopTeaserLoader(n);
b[n]=o
}function d(p,o){if(!p||!o){return false
}if(p.length!==o.length){return false
}p.sort();
o.sort();
for(var n=0;
n<p.length;
n++){if(p[n]!==o[n]){return false
}}return true
}var j={};
return{stopTeaserLoader:function(o){var n=o.path||o;
if(!n){return
}var p=b[n];
if(p){CQ_Analytics.SegmentMgr.removeListener("update",p);
delete b[n]
}},resolveTeaser:function(q,p,n){var o=c(q,n);
if(o.length===0){return null
}return CQ_Analytics.StrategyMgr.choose(p,o)||o[0]
},loadTeaser:function(n){var q,p;
if(l()){p=CQ.WCM.getEditablePathFromDOM(document.getElementById(n.targetID));
q=e(p)
}var r=ClientContext.get("campaign");
if(r&&r.isCampaignSelected()&&!a){return
}var o=function(){var u=CQ_Analytics.PageDataMgr.getExperience();
if(u){CQ_Analytics.PageDataMgr.clearExperience();
var v="/_jcr_content/par.html";
if(l()){v+="?wcmmode=disabled"
}CQ_Analytics.Utils.loadElement(u+v,n.targetID);
return
}var t=null;
var s=function(){var J=null;
if(l()){J=[]
}var F=ClientContext.get("campaign"),M;
if(F&&F.isCampaignSelected()){var G=F.data.path,I=F.data["recipe/path"],x=F.data.campaigns,y={},L=n.teasers,H;
for(var D=0;
D<L.length;
D++){if(L[D].name==="default"){H=L[D]
}}if(j[n.targetID]&&j[n.targetID][I]){M=j[n.targetID][I]
}else{if(I==="DEFAULT"){M=H
}else{for(var D=0;
D<x.length;
D++){var A=x[D];
if(x[D]["path"]===G){var K=A.experiences;
for(var C=0;
C<K.length;
C++){if(K[C]["path"]===I){if(K[C].hasOwnProperty("segments")){var E=K[C]["segments"];
for(var z=0;
z<E.length;
z++){y[E[z]]=y
}}}}}}for(var D=0;
D<L.length;
D++){var B=L[D];
if(B.hasOwnProperty("segments")&&(B.segments.length===E.length)){if(d(E,B.segments)){M=L[D];
break
}}}}if(!M){M=H
}j[n.targetID]={experience:M}
}}else{M=CQ_Analytics.Engine.resolveTeaser(n.teasers,n.strategy,J)
}if(M){if(!t||t.path!==M.path){t=M;
var w=M.url;
if(l()){w+="?wcmmode=disabled"
}CQ_Analytics.Utils.loadTeaserElement(w,n.targetID);
if(window.CQ_trackTeasersStats&&n.trackingURL){h(M,n.trackingURL)
}if(q){m(q,J,t.path,n.strategy)
}}}else{if(q){k(q)
}CQ_Analytics.Utils.clearElement(n.targetID);
t=null
}};
s.call();
if(CQ_Analytics.SegmentMgr){if(p){g(p,s)
}CQ_Analytics.SegmentMgr.addListener("update",s)
}if(CQ_Analytics.CampaignMgr){if(CQ_Analytics.CampaignMgr){CQ_Analytics.CampaignMgr.addListener("update",s)
}}};
if(CQ_Analytics.CCM.areStoresInitialized){o.call(this)
}else{CQ_Analytics.CCM.addListener("storesinitialize",o)
}}}
}();
window.CQ_trackTeasersStats=true;
function initializeTeaserLoader(b,f,g,e,a,d){e=!!(CQ.Ext&&(e=="true"||e===true));
if(window.CQ_Analytics){var c=function(){var n="/_jcr_content/par.html";
if(e){n+="?wcmmode=disabled"
}var l=CQ_Analytics.PageDataMgr.getExperience();
if(l){CQ_Analytics.PageDataMgr.clearExperience();
CQ_Analytics.Utils.loadElement(l+n,g);
return
}var m=function(q){var s="";
var w=new Array();
if(CQ_Analytics.SegmentMgr){var u=0;
for(var r=0;
r<b.length;
r++){var t=CQ.shared.HTTP.externalize(b[r].path+".html");
if(!b[r]["segments"]||b[r]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(b[r]["segments"])===true){var o=CQ_Analytics.SegmentMgr.getMaxBoost(b[r]["segments"]);
var v=[b[r]["title"],o,b[r].thumbnail,t];
if(q==b[r].path){s+=CQ.I18n.getMessage('<b><a href="{3}" class="cq-teaser-segment-link"><img src="{2}" class="cq-teaser-decision-thumbnail cq-teaser-decision-match"></a>Experience: {0} - match ( boost = {1} )</b><br>',v)
}else{s+=CQ.I18n.getMessage('<a href="{3}" class="cq-teaser-segment-link"><img src="{2}" class="cq-teaser-decision-thumbnail cq-teaser-decision-match"></a>Experience: {0} - match ( boost = {1} )<br>',v)
}if(o==u){w.push(b[r])
}else{if(o>u){w=new Array();
w.push(b[r]);
u=o
}}}else{var v=[b[r]["title"],b[r].thumbnail,t];
s+=CQ.I18n.getMessage('<a href="{2}" class="cq-teaser-segment-link"><img src="{1}" class="cq-teaser-decision-thumbnail cq-teaser-decision-nomatch"></a>Experience: {0} - no match<br>',v)
}}}s+=CQ.I18n.getMessage("<br>Strategy <b>{0}</b> selected current teaser.<br>",f);
return s
};
var k=null;
var h=null;
var j=function(){var v=new Array();
if(CQ_Analytics.SegmentMgr){var t=0;
for(var r=0;
r<b.length;
r++){if(!b[r]["segments"]||b[r]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(b[r]["segments"])===true){var o=CQ_Analytics.SegmentMgr.getMaxBoost(b[r]["segments"]);
if(o==t){v.push(b[r])
}else{if(o>t){v=new Array();
v.push(b[r]);
t=o
}}}}}if(v.length>0){var u=v[0];
if(CQ_Analytics.StrategyMgr){var s=CQ_Analytics.StrategyMgr.choose(f,v);
if(s!=null){u=s
}}if(!k||k.path!=u.path){k=u;
var p=u.path+n;
p=CQ.shared.HTTP.addSelectors(p,CQ.shared.HTTP.getSelectors(window.location.href));
CQ_Analytics.Utils.loadTeaserElement(p,g);
if(window.CQ_trackTeasersStats&&a){if(!CQ_Analytics.loadedTeasersStack){CQ_Analytics.loadedTeasersStack=[];
$CQ(window).unload(function(){try{var w=CQ_Analytics.loadedTeasersStack;
if(w){delete CQ_Analytics.loadedTeasersStack;
var y=a;
for(var z=0;
z<w.length;
z++){y=CQ.shared.HTTP.addParameter(y,"path",w[z])
}CQ.shared.HTTP.get(y,function(){})
}}catch(x){}})
}CQ_Analytics.loadedTeasersStack.push(u.path)
}if(e){if(d){var q=CQ.WCM.getEditable(d);
if(q){if(q&&q.teaserToolTip){q.teaserToolTip.hide();
q.teaserToolTip.remove();
q.teaserToolTip=null
}else{q.on(CQ.wcm.EditRollover.EVENT_SHOW_HIGHTLIGHT,function(w){if(!this.teaserInfoButton){this.teaserInfoButton=CQ.Ext.DomHelper.append("CQ",{tag:"div",cls:"x-tool x-tool-help cq-teaser-tooltip-tool"},true);
this.teaserInfoButton.position("absolute");
this.teaserInfoButton.on("click",function(){if(!q.teaserToolTip){q.teaserToolTip=new CQ.Ext.Tip({html:m(k.path),title:CQ.I18n.getMessage("Selection decision"),width:450,autoHide:false,closable:true,height:300,floating:true,autoHeight:false,bodyStyle:"overflow-y: scroll;"})
}var x=this.getXY();
q.teaserToolTip.setPosition(x[0]-460,x[1]-100);
q.teaserToolTip.show()
})
}this.teaserInfoButton.anchorTo(w.frameBottom.getEl(),"tr",[-26,-15]);
this.teaserInfoButton.show()
});
q.on(CQ.wcm.EditRollover.EVENT_HIDE_HIGHTLIGHT,function(w){if(this.teaserInfoButton){this.teaserInfoButton.hide()
}})
}}}}}}else{if(e){var q=CQ.WCM.getEditable(d);
if(q&&q.teaserToolTip){q.teaserToolTip.hide();
q.teaserToolTip.remove();
q.teaserToolTip=null
}}CQ_Analytics.Utils.clearElement(g);
k=null
}};
j.call();
if(CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr.addListener("update",j)
}};
if(CQ_Analytics.CCM.areStoresInitialized){c.call(this)
}else{CQ_Analytics.CCM.addListener("storesinitialize",c)
}}}window.CQ_trackLandingPagesStats=true;
function initializeLandingPageLoader(f,d,e,c,a){c=CQ.Ext&&(c=="true"||c===true);
if(window.CQ_Analytics){var g=".html";
var b=function(){var j=null;
var h=function(){var l=new Array();
if(CQ_Analytics.SegmentMgr){var s=0;
for(var p=0;
p<f.length;
p++){if(!f[p]["segments"]||f[p]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(f[p]["segments"])===true){var v=CQ_Analytics.SegmentMgr.getMaxBoost(f[p]["segments"]);
if(v==s){l.push(f[p])
}else{if(v>s){l=new Array();
l.push(f[p]);
s=v
}}}}}if(l.length>0){var o=l[0];
if(CQ_Analytics.StrategyMgr){var t=CQ_Analytics.StrategyMgr.choose(d,l);
if(t!=null){o=t
}}if(!j||j.path!=o.path){var x=j;
j=o;
var n=CQ.shared.HTTP.get(o.path+g);
var y=n.responseText;
var q=function(K,A){var H="";
if(K&&K.indexOf('id="'+A+'"')!=-1){var G=K.indexOf('id="'+A+'"');
var B=K.substring(0,G).lastIndexOf("<div");
var F=K.substring(B);
var J=F.split(new RegExp("<div","ig"));
var D=0;
for(var E=0;
E<J.length;
E++){D++;
var I=J[E].split(new RegExp("</div","ig"));
for(var C=1;
C<I.length;
C++){D--;
if(D==1){var z=J[E].lastIndexOf("</div")+6;
z=F.indexOf(J[E])+z;
F=F.substring(0,z);
F=F.substring(F.indexOf(">")+1,F.lastIndexOf("</div"));
return F
}}}}return""
};
y=q(y,e);
var u=$CQ("#"+e)[0];
var r=function(B,z){if(c){var C=CQ.WCM.getEditables();
for(var D in C){var A=C[D];
if(!B||A.path.indexOf(B)!=-1){A.hide();
A.remove()
}}}};
var m=document.createElement("div");
m.innerHTML=y;
if(x){$CQ("object",u).parent().fadeOut("slow");
$CQ("img",u).fadeOut("slow");
$CQ(u).slideUp("slow",function(){r(x.path,false);
$CQ(u).children().remove();
var z=u.insertBefore(m,u.firstChild);
$CQ(u).slideDown("slow",function(){if(c){CQ.DOM.executeScripts(CQ.Ext.get(m))
}})
})
}else{var k=u.insertBefore(m,u.firstChild);
$CQ(u).slideDown("slow",function(){if(c){CQ.DOM.executeScripts(CQ.Ext.get(m))
}})
}try{if(window.CQ_trackLandingPagesStats&&a){if(!CQ_Analytics.loadedLandingPagesStack){CQ_Analytics.loadedLandingPagesStack=[];
$CQ(window).unload(function(){try{var C=CQ_Analytics.loadedLandingPagesStack;
if(C){delete CQ_Analytics.loadedLandingPagesStack;
var A=a;
for(var B=0;
B<C.length;
B++){A=CQ.shared.HTTP.addParameter(A,"path",C[B])
}CQ.shared.HTTP.get(A,function(){})
}}catch(z){}})
}CQ_Analytics.loadedLandingPagesStack.push(o.path)
}}catch(w){}}}else{CQ_Analytics.Utils.clearElement(e);
j=null
}};
h.call();
if(CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr.addListener("update",h)
}};
if(CQ_Analytics.ClickstreamcloudMgr){if(CQ_Analytics.ClickstreamcloudMgr.areStoresLoaded){b.call(this)
}else{CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded",b)
}}}}CQ_Analytics.PersistedJSONStore=function(){};
CQ_Analytics.PersistedJSONStore.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.PersistedJSONStore.prototype.STOREKEY="";
CQ_Analytics.PersistedJSONStore.prototype.STORENAME="";
CQ_Analytics.PersistedJSONStore.prototype.init=function(){var a=new CQ_Analytics.SessionPersistence({container:"ClientContext"});
var b=a.get(this.getStoreKey());
if(!b||b==""){this.data={};
for(var c in this.initProperty){this.data[c]=this.initProperty[c]
}}else{this.data=this.parse(b)
}this.persist();
this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.PersistedJSONStore.prototype.clear=function(){var a=new CQ_Analytics.SessionPersistence({container:"ClientContext"});
a.remove(this.getStoreKey());
this.data=null;
this.initProperty={}
};
CQ_Analytics.PersistedJSONStore.prototype.initJSON=function(b,c){if(!c){this.initProperty={}
}var a=function(g,d,f){for(var e in f){if(typeof f[e]=="object"){a(g,d?d+"/"+e:e,f[e])
}else{g[d?d+"/"+e:e]=f[e]
}}};
a(this.initProperty,null,b)
};
CQ_Analytics.PersistedJSONStore.prototype.getJSON=function(){var e=this.getData();
var c={};
for(var g in e){var d=g.split("/");
var f=c;
for(var b=0;
b<d.length;
b++){var a=d[b];
if(b==d.length-1){f[a]=e[g]
}else{f[a]=f[a]||{};
f=f[a]
}}}return c
};
CQ_Analytics.PersistedJSONStore.getInstance=function(a,c){var b=new CQ_Analytics.PersistedJSONStore();
b.STOREKEY=a.toUpperCase();
b.STORENAME=a;
b.initJSON(c);
return b
};
CQ_Analytics.PersistedJSONStore.registerNewInstance=function(a,b){var c=CQ_Analytics.PersistedJSONStore.getInstance(a,b);
c.init();
CQ_Analytics.CCM.register(c);
return c
};
CQ_Analytics.JSONStore=function(){};
CQ_Analytics.JSONStore.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.JSONStore.prototype.STOREKEY="";
CQ_Analytics.JSONStore.prototype.STORENAME="";
CQ_Analytics.JSONStore.prototype.init=function(){this.data={};
for(var a in this.initProperty){this.data[a]=this.initProperty[a]
}this.initialized=true;
this.fireEvent("initialize",this);
this.fireEvent("update")
};
CQ_Analytics.JSONStore.prototype.clear=function(){this.data=null;
this.initProperty={}
};
CQ_Analytics.JSONStore.prototype.initJSON=function(b,c){if(!c){this.initProperty={}
}var a=function(g,d,f){for(var e in f){if(typeof f[e]=="object"){a(g,d?d+"/"+e:e,f[e])
}else{g[d?d+"/"+e:e]=f[e]
}}};
a(this.initProperty,null,b)
};
CQ_Analytics.JSONStore.prototype.getJSON=function(){var e=this.getData();
var c={};
for(var g in e){var d=g.split("/");
var f=c;
for(var b=0;
b<d.length;
b++){var a=d[b];
if(b==d.length-1){f[a]=e[g]
}else{f[a]=f[a]||{};
f=f[a]
}}}return c
};
CQ_Analytics.JSONStore.getInstance=function(a,c){var b=new CQ_Analytics.JSONStore();
b.STOREKEY=a.toUpperCase();
b.STORENAME=a;
b.initJSON(c);
return b
};
CQ_Analytics.JSONStore.registerNewInstance=function(a,b){var c=CQ_Analytics.JSONStore.getInstance(a,b);
c.init();
CQ_Analytics.CCM.register(c);
return c
};
CQ_Analytics.PersistedJSONPStore=function(){};
CQ_Analytics.PersistedJSONPStore.prototype=new CQ_Analytics.PersistedJSONStore();
CQ_Analytics.PersistedJSONPStore.prototype.setServiceURL=function(a){this.serviceURL=a
};
CQ_Analytics.PersistedJSONPStore.prototype.getServiceURL=function(){return this.serviceURL
};
CQ_Analytics.PersistedJSONPStore.prototype.load=function(d,a,e){var c=this.getName();
if(!CQ_Analytics.PersistedJSONPStore.JSONPCallbacks[this.getName()]){CQ_Analytics.PersistedJSONPStore.JSONPCallbacks[c]=function(g){var f=CQ_Analytics.CCM.getRegisteredStore(c);
if(f){f.initJSON(g);
if(a){f.initJSON(a,true)
}}if(e){e.call(f)
}}
}if(d){this.setServiceURL(d)
}var b=this.serviceURL;
b=b.replace("${callback}","CQ_Analytics.PersistedJSONPStore.JSONPCallbacks."+c);
$CQ.getScript(b)
};
CQ_Analytics.PersistedJSONPStore.JSONPCallbacks={};
CQ_Analytics.PersistedJSONPStore.getInstance=function(e,f,b,a,d){if(e&&f){try{var g=new CQ_Analytics.PersistedJSONPStore();
g.STOREKEY=e.toUpperCase();
g.STORENAME=e;
if(f){g.setServiceURL(f)
}if(!a){g.load(f,b,d)
}return g
}catch(c){console.log("Cannot create the JSONP store",e,f,c)
}}return null
};
CQ_Analytics.PersistedJSONPStore.registerNewInstance=function(d,e,b,f){if(!e){return null
}if(!d){var a=CQ.shared.HTTP.getSchemeAndAuthority(e);
if(a){if(a.indexOf(".")!=-1){a=a.substring(0,a.lastIndexOf("."));
d=a.substring(a.lastIndexOf(".")+1)
}else{d=a.substring(a.lastIndexOf("/")+1)
}}else{d=e
}}var c=CQ_Analytics.PersistedJSONPStore.getInstance(d,e,b,false,function(){this.init();
this.reset();
if(f){f.call(this)
}});
if(c!=null){CQ_Analytics.CCM.register(c);
return c
}return null
};
CQ_Analytics.JSONPStore=function(){};
CQ_Analytics.JSONPStore.prototype=new CQ_Analytics.JSONStore();
CQ_Analytics.JSONPStore.prototype.setServiceURL=function(a){this.serviceURL=a
};
CQ_Analytics.JSONPStore.prototype.getServiceURL=function(){return this.serviceURL
};
CQ_Analytics.JSONPStore.prototype.load=function(d,a,e){var c=this.getName();
if(!CQ_Analytics.JSONPStore.JSONPCallbacks[this.getName()]){CQ_Analytics.JSONPStore.JSONPCallbacks[c]=function(g){var f=CQ_Analytics.CCM.getRegisteredStore(c);
if(f){f.initJSON(g);
if(a){f.initJSON(a,true)
}}if(e){e.call(f)
}}
}if(d){this.setServiceURL(d)
}var b=this.serviceURL;
b=b.replace("${callback}","CQ_Analytics.JSONPStore.JSONPCallbacks."+c);
$CQ.getScript(b)
};
CQ_Analytics.JSONPStore.JSONPCallbacks={};
CQ_Analytics.JSONPStore.getInstance=function(e,f,b,a,d){if(e){try{var g=new CQ_Analytics.JSONPStore();
g.STOREKEY=e.toUpperCase();
g.STORENAME=e;
if(f){g.setServiceURL(f);
if(!a){g.load(f,b,d)
}}return g
}catch(c){console.log("Cannot create the JSONP store",e,f,c)
}}return null
};
CQ_Analytics.JSONPStore.registerNewInstance=function(d,e,b,f){if(!d&&e){var a=CQ.shared.HTTP.getSchemeAndAuthority(e);
if(a){if(a.indexOf(".")!=-1){a=a.substring(0,a.lastIndexOf("."));
d=a.substring(a.lastIndexOf(".")+1)
}else{d=a.substring(a.lastIndexOf("/")+1);
d=d.replace(new RegExp(":","ig"),"_")
}}else{d=e
}}var c=CQ_Analytics.JSONPStore.getInstance(d,e,b,false,function(){this.init();
this.reset();
if(f){f.call(this)
}});
if(c!=null){CQ_Analytics.CCM.register(c);
return c
}return null
};
CQ_Analytics.storeData=function(e,w){var n=function(p,l){for(var k=0;
k<CQ_Analytics.Sitecatalyst.frameworkMappings.length;
k++){var j=CQ_Analytics.Sitecatalyst.frameworkMappings[k];
if(j[p]===l){return j
}}return null
};
var s=function(j){if(typeof j==="string"){return j.replace(/[,;=\|]/g,"")
}return j
};
for(var v in w){if(v!=="product"){var o=v.indexOf(".");
var r=(o>0)?v.substr(0,o-1):undefined;
var x=(o>0)?v.substr(o):v;
if(r&&CQ_Analytics.StoreRegistry.getStore(r)){e=CQ_Analytics.StoreRegistry.getStore(r)
}e.setProperty(x,w[v])
}else{var m=["category","sku","quantity","price","events","evars"];
var c=e.getProperty("products").split(",");
c=(c[0]=="")?new Array():c;
var w=(w[v] instanceof Array)?w[v]:[w[v]];
for(var h=0;
h<w.length;
h++){var q=w[h];
var b=new Array(6);
for(var u in q){var o=m.indexOf(u);
if(o>-1){if(o<4){b[o]=s(q[u])
}else{var f=[];
for(var t in q[u]){var d=e.getName()+"."+v+"."+u+"."+t;
var g=n("cqVar",d);
if(g){f.push(g.scVar+"="+s(q[u][t]));
var a=e.getProperty("events").split("\u2026");
if(a.indexOf(g.cqVar)<0){a.push(g.cqVar.replace(/.+\./,""));
e.setProperty("events",a.join("\u2026"))
}}}b[o]=f.join("|")
}}}c.push(b.join(";"))
}e.setProperty("products",c.join(","))
}}};
CQ_Analytics.record=function(b){if(b.collect){return[b.event,b.values]
}else{if(b.event){b.options=b.options||{};
try{CQ_Analytics.recordBeforeCallbacks.sort(function(f,e){return f.rank-e.rank
});
for(var d in CQ_Analytics.recordBeforeCallbacks){if(CQ_Analytics.recordBeforeCallbacks[d].func.call(this,b)){return
}}}catch(c){}var a=b.dataMgr||CQ_Analytics.EventDataMgr;
a.reset();
if(typeof b.event=="string"){a.setProperty("events",b.event)
}else{a.setProperty("events",b.event.join("\u2026"))
}if(b.values){CQ_Analytics.storeData(a,b.values)
}try{CQ_Analytics.recordAfterCallbacks.sort(function(f,e){return f.rank-e.rank
});
for(var d in CQ_Analytics.recordAfterCallbacks){if(CQ_Analytics.recordAfterCallbacks[d].func.call(this,b)){return
}}}catch(c){}}}};
CQ_Analytics.recordBeforeCallbacks=[];
CQ_Analytics.recordAfterCallbacks=[];
CQ_Analytics.registerBeforeCallback=function(b,a){CQ_Analytics.recordBeforeCallbacks.push({rank:a,func:b})
};
CQ_Analytics.registerAfterCallback=function(b,a){CQ_Analytics.recordAfterCallbacks.push({rank:a,func:b})
};
/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(d,c){"object"==typeof module&&"object"==typeof module.exports?module.exports=d.document?c(d,!0):function(b){if(!b.document){throw new Error("jQuery requires a window with a document")
}return c(b)
}:c(d)
}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0",n=function(a,b){return new n.fn.init(a,b)
},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()
};
n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)
},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)
},pushStack:function(a){var b=n.merge(this.constructor(),a);
return b.prevObject=this,b.context=this.context,b
},each:function(a,b){return n.each(this,a,b)
},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)
}))
},slice:function(){return this.pushStack(d.apply(this,arguments))
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},eq:function(a){var b=this.length,c=+a+(0>a?b:0);
return this.pushStack(c>=0&&b>c?[this[c]]:[])
},end:function(){return this.prevObject||this.constructor(null)
},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;
for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);
i>h;
h++){if(null!=(e=arguments[h])){for(d in e){a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c))
}}}return g
},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)
},noop:function(){},isFunction:function(a){return"function"===n.type(a)
},isArray:Array.isArray||function(a){return"array"===n.type(a)
},isWindow:function(a){return null!=a&&a==a.window
},isNumeric:function(a){return a-parseFloat(a)>=0
},isEmptyObject:function(a){var b;
for(b in a){return !1
}return !0
},isPlainObject:function(a){var b;
if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a)){return !1
}try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf")){return !1
}}catch(c){return !1
}if(l.ownLast){for(b in a){return j.call(a,b)
}}for(b in a){}return void 0===b||j.call(a,b)
},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a
},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)
})(b)
},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)
},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()
},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);
if(c){if(g){for(;
f>e;
e++){if(d=b.apply(a[e],c),d===!1){break
}}}else{for(e in a){if(d=b.apply(a[e],c),d===!1){break
}}}}else{if(g){for(;
f>e;
e++){if(d=b.call(a[e],e,a[e]),d===!1){break
}}}else{for(e in a){if(d=b.call(a[e],e,a[e]),d===!1){break
}}}}return a
},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)
}:function(a){return null==a?"":(a+"").replace(o,"")
},makeArray:function(a,b){var c=b||[];
return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c
},inArray:function(a,b,c){var d;
if(b){if(g){return g.call(b,a,c)
}for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;
d>c;
c++){if(c in b&&b[c]===a){return c
}}}return -1
},merge:function(a,b){var c=+b.length,d=0,e=a.length;
while(c>d){a[e++]=b[d++]
}if(c!==c){while(void 0!==b[d]){a[e++]=b[d++]
}}return a.length=e,a
},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;
g>f;
f++){d=!b(a[f],f),d!==h&&e.push(a[f])
}return e
},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];
if(h){for(;
g>f;
f++){d=b(a[f],f,c),null!=d&&i.push(d)
}}else{for(f in a){d=b(a[f],f,c),null!=d&&i.push(d)
}}return e.apply([],i)
},guid:1,proxy:function(a,b){var c,e,f;
return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))
},e.guid=a.guid=a.guid||n.guid++,e):void 0
},now:function(){return +new Date
},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()
});
function s(a){var b=a.length,c=n.type(a);
return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a
}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0
},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;
c>b;
b++){if(this[b]===a){return b
}}return -1
},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;
return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)
};
try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType
}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))
}:function(a,b){var c=a.length,d=0;
while(a[c++]=b[d++]){}a.length=c-1
}}
}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;
if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a){return d
}if(1!==(i=b.nodeType)&&9!==i){return[]
}if(n&&!e){if(f=Z.exec(a)){if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode){return d
}if(g.id===h){return d.push(g),d
}}else{if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h){return d.push(g),d
}}}else{if(f[2]){return G.apply(d,b.getElementsByTagName(a)),d
}if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName){return G.apply(d,b.getElementsByClassName(h)),d
}}}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;
while(j--){m[j]=q+pb(m[j])
}u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")
}if(v){try{return G.apply(d,u.querySelectorAll(v)),d
}catch(w){}finally{p||b.removeAttribute("id")
}}}}return xb(a.replace(P,"$1"),b,d,e)
}function eb(){var a=[];
function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e
}return b
}function fb(a){return a[s]=!0,a
}function gb(a){var b=l.createElement("div");
try{return !!a(b)
}catch(c){return !1
}finally{b.parentNode&&b.parentNode.removeChild(b),b=null
}}function hb(a,b){var c=a.split("|"),e=a.length;
while(e--){d.attrHandle[c[e]]=b
}}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);
if(d){return d
}if(c){while(c=c.nextSibling){if(c===b){return -1
}}}return a?1:-1
}function jb(a){return function(b){var c=b.nodeName.toLowerCase();
return"input"===c&&b.type===a
}
}function kb(a){return function(b){var c=b.nodeName.toLowerCase();
return("input"===c||"button"===c)&&b.type===a
}
}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;
while(g--){c[e=f[g]]&&(c[e]=!(d[e]=c[e]))
}})
})
}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a
}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;
return b?"HTML"!==b.nodeName:!1
},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;
return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()
},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()
})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")
}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length
}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length
}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length
}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);
return c&&c.parentNode?[c]:[]
}},d.filter.ID=function(a){var b=a.replace(ab,bb);
return function(a){return a.getAttribute("id")===b
}
}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);
return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");
return c&&c.value===b
}
}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0
}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);
if("*"===a){while(c=f[e++]){1===c.nodeType&&d.push(c)
}return d
}return f
},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0
},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")
}),gb(function(a){var b=e.createElement("input");
b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")
})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)
}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;
return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))
}:function(a,b){if(b){while(b=b.parentNode){if(b===a){return !0
}}}return !1
},z=b?function(a,b){if(a===b){return j=!0,0
}var d=!a.compareDocumentPosition-!b.compareDocumentPosition;
return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)
}:function(a,b){if(a===b){return j=!0,0
}var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];
if(!f||!g){return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0
}if(f===g){return ib(a,b)
}c=a;
while(c=c.parentNode){h.unshift(c)
}c=b;
while(c=c.parentNode){k.unshift(c)
}while(h[d]===k[d]){d++
}return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0
},e):l
},db.matches=function(a,b){return db(a,null,null,b)
},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b))){try{var d=q.call(a,b);
if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType){return d
}}catch(e){}}return db(b,l,null,[a]).length>0
},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)
},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);
var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;
return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null
},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)
},db.uniqueSort=function(a){var b,d=[],e=0,f=0;
if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++]){b===a[f]&&(e=d.push(f))
}while(e--){a.splice(d[e],1)
}}return i=null,a
},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;
if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent){return a.textContent
}for(a=a.firstChild;
a;
a=a.nextSibling){c+=e(a)
}}else{if(3===f||4===f){return a.nodeValue
}}}else{while(b=a[d++]){c+=e(b)
}}return c
},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)
},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a
},PSEUDO:function(a){var b,c=!a[5]&&a[2];
return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))
}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();
return"*"===a?function(){return !0
}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b
}
},CLASS:function(a){var b=w[a+" "];
return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")
})
},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);
return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0
}
},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;
return 1===d&&0===e?function(a){return !!a.parentNode
}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;
if(q){if(f){while(p){l=b;
while(l=l[p]){if(h?l.nodeName.toLowerCase()===r:1===l.nodeType){return !1
}}o=p="only"===a&&!o&&"nextSibling"
}return !0
}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];
while(l=++n&&l&&l[p]||(m=n=0)||o.pop()){if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];
break
}}}else{if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u){m=j[1]
}else{while(l=++n&&l&&l[p]||(m=n=0)||o.pop()){if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b)){break
}}}}return m-=e,m===d||m%d===0&&m/d>=0
}}
},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);
return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;
while(g--){d=I.call(a,f[g]),a[d]=!(c[d]=f[g])
}}):function(a){return e(a,0,c)
}):e
}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));
return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;
while(h--){(f=g[h])&&(a[h]=!(b[h]=f))
}}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()
}
}),has:fb(function(a){return function(b){return db(a,b).length>0
}
}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1
}
}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;
do{if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang")){return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-")
}}while((b=b.parentNode)&&1===b.nodeType);
return !1
}
}),target:function(b){var c=a.location&&a.location.hash;
return c&&c.slice(1)===b.id
},root:function(a){return a===m
},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)
},enabled:function(a){return a.disabled===!1
},disabled:function(a){return a.disabled===!0
},checked:function(a){var b=a.nodeName.toLowerCase();
return"input"===b&&!!a.checked||"option"===b&&!!a.selected
},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0
},empty:function(a){for(a=a.firstChild;
a;
a=a.nextSibling){if(a.nodeType<6){return !1
}}return !0
},parent:function(a){return !d.pseudos.empty(a)
},header:function(a){return X.test(a.nodeName)
},input:function(a){return W.test(a.nodeName)
},button:function(a){var b=a.nodeName.toLowerCase();
return"input"===b&&"button"===a.type||"button"===b
},text:function(a){var b;
return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())
},first:lb(function(){return[0]
}),last:lb(function(a,b){return[b-1]
}),eq:lb(function(a,b,c){return[0>c?c+b:c]
}),even:lb(function(a,b){for(var c=0;
b>c;
c+=2){a.push(c)
}return a
}),odd:lb(function(a,b){for(var c=1;
b>c;
c+=2){a.push(c)
}return a
}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;
--d>=0;
){a.push(d)
}return a
}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;
++d<b;
){a.push(d)
}return a
})}},d.pseudos.nth=d.pseudos.eq;
for(b in {radio:!0,checkbox:!0,file:!0,password:!0,image:!0}){d.pseudos[b]=jb(b)
}for(b in {submit:!0,reset:!0}){d.pseudos[b]=kb(b)
}function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;
function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];
if(k){return b?0:k.slice(0)
}h=a,i=[],j=d.preFilter;
while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));
for(g in d.filter){!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length))
}if(!c){break
}}return b?h.length:h?db.error(a):x(a,i).slice(0)
}function pb(a){for(var b=0,c=a.length,d="";
c>b;
b++){d+=a[b].value
}return d
}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;
return b.first?function(b,c,f){while(b=b[d]){if(1===b.nodeType||e){return a(b,c,f)
}}}:function(b,c,g){var h,i,j=[u,f];
if(g){while(b=b[d]){if((1===b.nodeType||e)&&a(b,c,g)){return !0
}}}else{while(b=b[d]){if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f){return j[2]=h[2]
}if(i[d]=j,j[2]=a(b,c,g)){return !0
}}}}}
}function rb(a){return a.length>1?function(b,c,d){var e=a.length;
while(e--){if(!a[e](b,c,d)){return !1
}}return !0
}:a[0]
}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;
i>h;
h++){(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h))
}return g
}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;
if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;
while(k--){(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))
}}if(f){if(e||a){if(e){j=[],k=r.length;
while(k--){(l=r[k])&&j.push(q[k]=l)
}e(null,r=[],j,i)
}k=r.length;
while(k--){(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))
}}}else{r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)
}})
}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b
},i,!0),l=qb(function(a){return I.call(b,a)>-1
},i,!0),m=[function(a,c,d){return !g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))
}];
f>j;
j++){if(c=d.relative[a[j].type]){m=[qb(rb(m),c)]
}else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;
f>e;
e++){if(d.relative[a[e].type]){break
}}return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))
}m.push(c)
}}return rb(m)
}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||0.1,x=v.length;
for(k&&(h=g!==l&&g);
q!==x&&null!=(m=v[q]);
q++){if(e&&m){n=0;
while(o=a[n++]){if(o(m,g,i)){j.push(m);
break
}}k&&(u=w)
}c&&((m=!o&&m)&&p--,f&&r.push(m))
}if(p+=q,c&&q!==p){n=0;
while(o=b[n++]){o(r,s,g,i)
}if(f){if(p>0){while(q--){r[q]||s[q]||(s[q]=E.call(j))
}}s=sb(s)
}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)
}return k&&(u=w,h=t),r
};
return c?fb(f):f
}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];
if(!f){b||(b=ob(a)),c=b.length;
while(c--){f=ub(b[c]),f[s]?d.push(f):e.push(f)
}f=y(a,vb(e,d))
}return f
};
function wb(a,b,c){for(var d=0,e=b.length;
e>d;
d++){db(a,b[d],c)
}return c
}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);
if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b){return e
}a=a.slice(i.shift().value.length)
}h=V.needsContext.test(a)?0:i.length;
while(h--){if(j=i[h],d.relative[k=j.type]){break
}if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a){return G.apply(e,f),e
}break
}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e
}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))
}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")
})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)
}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")
})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue
}),gb(function(a){return null==a.getAttribute("disabled")
})||hb(J,function(a,b,c){var d;
return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null
}),db
}(a);
n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;
var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;
function x(a,b,c){if(n.isFunction(b)){return n.grep(a,function(a,d){return !!b.call(a,d,a)!==c
})
}if(b.nodeType){return n.grep(a,function(a){return a===b!==c
})
}if("string"==typeof b){if(w.test(b)){return n.filter(b,a,c)
}b=n.filter(b,a)
}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c
})
}n.filter=function(a,b,c){var d=b[0];
return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType
}))
},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;
if("string"!=typeof a){return this.pushStack(n(a).filter(function(){for(b=0;
e>b;
b++){if(n.contains(d[b],this)){return !0
}}}))
}for(b=0;
e>b;
b++){n.find(a,d[b],c)
}return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c
},filter:function(a){return this.pushStack(x(this,a||[],!1))
},not:function(a){return this.pushStack(x(this,a||[],!0))
},is:function(a){return !!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length
}});
var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;
if(!a){return this
}if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b){return !b||b.jquery?(b||y).find(a):this.constructor(b).find(a)
}if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b)){for(c in b){n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c])
}}return this
}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2]){return y.find(a)
}this.length=1,this[0]=d
}return this.context=z,this.selector=a,this
}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))
};
B.prototype=n.fn,y=n(z);
var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};
n.extend({dir:function(a,b,c){var d=[],e=a[b];
while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c))){1===e.nodeType&&d.push(e),e=e[b]
}return d
},sibling:function(a,b){for(var c=[];
a;
a=a.nextSibling){1===a.nodeType&&a!==b&&c.push(a)
}return c
}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;
return this.filter(function(){for(b=0;
d>b;
b++){if(n.contains(this,c[b])){return !0
}}})
},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;
e>d;
d++){for(c=this[d];
c&&c!==b;
c=c.parentNode){if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);
break
}}}return this.pushStack(f.length>1?n.unique(f):f)
},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1
},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))
},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))
}});
function E(a,b){do{a=a[b]
}while(a&&1!==a.nodeType);
return a
}n.each({parent:function(a){var b=a.parentNode;
return b&&11!==b.nodeType?b:null
},parents:function(a){return n.dir(a,"parentNode")
},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)
},next:function(a){return E(a,"nextSibling")
},prev:function(a){return E(a,"previousSibling")
},nextAll:function(a){return n.dir(a,"nextSibling")
},prevAll:function(a){return n.dir(a,"previousSibling")
},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)
},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)
},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)
},children:function(a){return n.sibling(a.firstChild)
},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)
}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);
return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)
}
});
var F=/\S+/g,G={};
function H(a){var b=G[a]={};
return n.each(a.match(F)||[],function(a,c){b[c]=!0
}),b
}n.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):n.extend({},a);
var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;
h&&e>f;
f++){if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;
break
}}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())
},k={add:function(){if(h){var d=h.length;
!function f(b){n.each(b,function(b,c){var d=n.type(c);
"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)
})
}(arguments),b?e=h.length:c&&(g=d,j(c))
}return this
},remove:function(){return h&&n.each(arguments,function(a,c){var d;
while((d=n.inArray(c,h,d))>-1){h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)
}}),this
},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)
},empty:function(){return h=[],e=0,this
},disable:function(){return h=i=c=void 0,this
},disabled:function(){return !h
},lock:function(){return i=void 0,c||k.disable(),this
},locked:function(){return !i
},fireWith:function(a,c){return !h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this
},fire:function(){return k.fireWith(this,arguments),this
},fired:function(){return !!d
}};
return k
},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c
},always:function(){return e.done(arguments).fail(arguments),this
},then:function(){var a=arguments;
return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];
e[f[1]](function(){var a=g&&g.apply(this,arguments);
a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)
})
}),a=null
}).promise()
},promise:function(a){return null!=a?n.extend(a,d):d
}},e={};
return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];
d[f[1]]=g.add,h&&g.add(function(){c=h
},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this
},e[f[0]+"With"]=g.fireWith
}),d.promise(e),a&&a.call(e,e),e
},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)
}
},i,j,k;
if(e>1){for(i=new Array(e),j=new Array(e),k=new Array(e);
e>b;
b++){c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f
}}return f||g.resolveWith(k,c),g.promise()
}});
var I;
n.fn.ready=function(a){return n.ready.promise().done(a),this
},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)
},ready:function(a){if(a===!0?!--n.readyWait:!n.isReady){if(!z.body){return setTimeout(n.ready)
}n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(z,[n]),n.fn.trigger&&n(z).trigger("ready").off("ready"))
}}});
function J(){z.addEventListener?(z.removeEventListener("DOMContentLoaded",K,!1),a.removeEventListener("load",K,!1)):(z.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))
}function K(){(z.addEventListener||"load"===event.type||"complete"===z.readyState)&&(J(),n.ready())
}n.ready.promise=function(b){if(!I){if(I=n.Deferred(),"complete"===z.readyState){setTimeout(n.ready)
}else{if(z.addEventListener){z.addEventListener("DOMContentLoaded",K,!1),a.addEventListener("load",K,!1)
}else{z.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);
var c=!1;
try{c=null==a.frameElement&&z.documentElement
}catch(d){}c&&c.doScroll&&!function e(){if(!n.isReady){try{c.doScroll("left")
}catch(a){return setTimeout(e,50)
}J(),n.ready()
}}()
}}}return I.promise(b)
};
var L="undefined",M;
for(M in n(l)){break
}l.ownLast="0"!==M,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];
c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==L&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)
}),function(){var a=z.createElement("div");
if(null==l.deleteExpando){l.deleteExpando=!0;
try{delete a.test
}catch(b){l.deleteExpando=!1
}}a=null
}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;
return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b
};
var N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;
function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();
if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c
}catch(e){}n.data(a,b,c)
}else{c=void 0
}}return c
}function Q(a){var b;
for(b in a){if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b){return !1
}}return !0
}function R(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;
if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b){return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f
}}}function S(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;
if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;
while(e--){delete d[b[e]]
}if(c?!Q(d):!n.isEmptyObject(d)){return
}}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)
}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)
},data:function(a,b,c){return R(a,b,c)
},removeData:function(a,b){return S(a,b)
},_data:function(a,b,c){return R(a,b,c,!0)
},_removeData:function(a,b){return S(a,b,!0)
}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;
if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;
while(c--){d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d]))
}n._data(f,"parsedAttrs",!0)
}return e
}return"object"==typeof a?this.each(function(){n.data(this,a)
}):arguments.length>1?this.each(function(){n.data(this,a,b)
}):f?P(f,a,n.data(f,a)):void 0
},removeData:function(a){return this.each(function(){n.removeData(this,a)
})
}}),n.extend({queue:function(a,b,c){var d;
return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0
},dequeue:function(a,b){b=b||"fx";
var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)
};
"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()
},_queueHooks:function(a,b){var c=b+"queueHooks";
return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)
})})
}}),n.fn.extend({queue:function(a,b){var c=2;
return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);
n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)
})
},dequeue:function(a){return this.each(function(){n.dequeue(this,a)
})
},clearQueue:function(a){return this.queue(a||"fx",[])
},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])
};
"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";
while(g--){c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h))
}return h(),e.promise(b)
}});
var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)
},W=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;
if("object"===n.type(c)){e=!0;
for(h in c){n.access(a,b,h,c[h],!0,f,g)
}}else{if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)
})),b)){for(;
i>h;
h++){b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)))
}}}return e?a:j?b.call(a):i?b(a[0],c):f
},X=/^(?:checkbox|radio)$/i;
!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");
if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1
}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;
try{delete b.test
}catch(d){l.deleteExpando=!1
}}a=b=c=null
}(),function(){var b,c,d=z.createElement("div");
for(b in {submit:!0,change:!0,focusin:!0}){c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1)
}d=null
}();
var Y=/^(?:input|select|textarea)$/i,Z=/^key/,$=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,ab=/^([^.]*)(?:\.(.+)|)$/;
function bb(){return !0
}function cb(){return !1
}function db(){try{return z.activeElement
}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);
if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===L||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)
},k.elem=a),b=(b||"").match(F)||[""],h=b.length;
while(h--){f=ab.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0)
}a=null
}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);
if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;
while(j--){if(h=ab.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;
while(f--){g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g))
}i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])
}else{for(o in k){n.event.remove(a,o+b[j],c,d,!0)
}}}n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))
}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];
if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!_.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,_.test(i+p)||(h=h.parentNode);
h;
h=h.parentNode){o.push(h),l=h
}l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)
}m=0;
while((h=o[m++])&&!b.isPropagationStopped()){b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault())
}if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;
try{d[p]()
}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)
}return b.result
}},dispatch:function(a){a=n.event.fix(a);
var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};
if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;
while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;
while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped()){(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))
}}return k.postDispatch&&k.postDispatch.call(this,a),a.result
}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;
if(h&&i.nodeType&&(!a.button||"click"!==a.type)){for(;
i!=this;
i=i.parentNode||this){if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;
h>f;
f++){d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d)
}e.length&&g.push({elem:i,handlers:e})
}}}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g
},fix:function(a){if(a[n.expando]){return a
}var b,c,d,e=a.type,f=a,g=this.fixHooks[e];
g||(this.fixHooks[e]=g=$.test(e)?this.mouseHooks:Z.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;
while(b--){c=d[b],a[c]=f[c]
}return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a
},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a
}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;
return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a
}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==db()&&this.focus){try{return this.focus(),!1
}catch(a){}}},delegateType:"focusin"},blur:{trigger:function(){return this===db()&&this.blur?(this.blur(),!1):void 0
},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0
},_default:function(a){return n.nodeName(a.target,"a")
}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)
}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});
d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()
}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)
}:function(a,b,c){var d="on"+b;
a.detachEvent&&(typeof a[d]===L&&(a[d]=null),a.detachEvent(d,c))
},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?bb:cb):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void (this[n.expando]=!0)):new n.Event(a,b)
},n.Event.prototype={isDefaultPrevented:cb,isPropagationStopped:cb,isImmediatePropagationStopped:cb,preventDefault:function(){var a=this.originalEvent;
this.isDefaultPrevented=bb,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)
},stopPropagation:function(){var a=this.originalEvent;
this.isPropagationStopped=bb,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()
}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;
return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c
}}
}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;
c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0
}),n._data(c,"submitBubbles",!0))
})
},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))
},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")
}}),l.changeBubbles||(n.event.special.change={setup:function(){return Y.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)
}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)
})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;
Y.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)
}),n._data(b,"changeBubbles",!0))
})
},handle:function(a){var b=a.target;
return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0
},teardown:function(){return n.event.remove(this,"._change"),!Y.test(this.nodeName)
}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)
};
n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);
e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)
},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;
e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))
}}
}),n.fn.extend({on:function(a,b,c,d,e){var f,g;
if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);
for(f in a){this.on(f,b,c,a[f],e)
}return this
}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1){d=cb
}else{if(!d){return this
}}return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)
},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)
})
},one:function(a,b,c,d){return this.on(a,b,c,d,1)
},off:function(a,b,c){var d,e;
if(a&&a.preventDefault&&a.handleObj){return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this
}if("object"==typeof a){for(e in a){this.off(e,b,a[e])
}return this
}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=cb),this.each(function(){n.event.remove(this,a,c,b)
})
},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)
})
},triggerHandler:function(a,b){var c=this[0];
return c?n.event.trigger(a,b,c,!0):void 0
}});
function eb(a){var b=fb.split("|"),c=a.createDocumentFragment();
if(c.createElement){while(b.length){c.createElement(b.pop())
}}return c
}var fb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gb=/ jQuery\d+="(?:null|\d+)"/g,hb=new RegExp("<(?:"+fb+")[\\s/>]","i"),ib=/^\s+/,jb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,kb=/<([\w:]+)/,lb=/<tbody/i,mb=/<|&#?\w+;/,nb=/<(?:script|style|link)/i,ob=/checked\s*(?:[^=]|=\s*.checked.)/i,pb=/^$|\/(?:java|ecma)script/i,qb=/^true\/(.*)/,rb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,sb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},tb=eb(z),ub=tb.appendChild(z.createElement("div"));
sb.optgroup=sb.option,sb.tbody=sb.tfoot=sb.colgroup=sb.caption=sb.thead,sb.th=sb.td;
function vb(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==L?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==L?a.querySelectorAll(b||"*"):void 0;
if(!f){for(f=[],c=a.childNodes||a;
null!=(d=c[e]);
e++){!b||n.nodeName(d,b)?f.push(d):n.merge(f,vb(d,b))
}}return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f
}function wb(a){X.test(a.type)&&(a.defaultChecked=a.checked)
}function xb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a
}function yb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a
}function zb(a){var b=qb.exec(a.type);
return b?a.type=b[1]:a.removeAttribute("type"),a
}function Ab(a,b){for(var c,d=0;
null!=(c=a[d]);
d++){n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))
}}function Bb(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;
if(h){delete g.handle,g.events={};
for(c in h){for(d=0,e=h[c].length;
e>d;
d++){n.event.add(b,c,h[c][d])
}}}g.data&&(g.data=n.extend({},g.data))
}}function Cb(a,b){var c,d,e;
if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);
for(d in e.events){n.removeEvent(b,d,e.handle)
}b.removeAttribute(n.expando)
}"script"===c&&b.text!==a.text?(yb(b).text=a.text,zb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&X.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)
}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);
if(l.html5Clone||n.isXMLDoc(a)||!hb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ub.innerHTML=a.outerHTML,ub.removeChild(f=ub.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a))){for(d=vb(f),h=vb(a),g=0;
null!=(e=h[g]);
++g){d[g]&&Cb(e,d[g])
}}if(b){if(c){for(h=h||vb(a),d=d||vb(f),g=0;
null!=(e=h[g]);
g++){Bb(e,d[g])
}}else{Bb(a,f)
}}return d=vb(f,"script"),d.length>0&&Ab(d,!i&&vb(a,"script")),d=h=e=null,f
},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=eb(b),p=[],q=0;
m>q;
q++){if(f=a[q],f||0===f){if("object"===n.type(f)){n.merge(p,f.nodeType?[f]:f)
}else{if(mb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(kb.exec(f)||["",""])[1].toLowerCase(),k=sb[i]||sb._default,h.innerHTML=k[1]+f.replace(jb,"<$1></$2>")+k[2],e=k[0];
while(e--){h=h.lastChild
}if(!l.leadingWhitespace&&ib.test(f)&&p.push(b.createTextNode(ib.exec(f)[0])),!l.tbody){f="table"!==i||lb.test(f)?"<table>"!==k[1]||lb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;
while(e--){n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)
}}n.merge(p,h.childNodes),h.textContent="";
while(h.firstChild){h.removeChild(h.firstChild)
}h=o.lastChild
}else{p.push(b.createTextNode(f))
}}}}h&&o.removeChild(h),l.appendChecked||n.grep(vb(p,"input"),wb),q=0;
while(f=p[q++]){if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=vb(o.appendChild(f),"script"),g&&Ab(h),c)){e=0;
while(f=h[e++]){pb.test(f.type||"")&&c.push(f)
}}}return h=null,o
},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;
null!=(d=a[h]);
h++){if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events){for(e in g.events){m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle)
}}j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==L?d.removeAttribute(i):d[i]=null,c.push(f))
}}}}),n.fn.extend({text:function(a){return W(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))
},null,a,arguments.length)
},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);
b.appendChild(a)
}})
},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=xb(this,a);
b.insertBefore(a,b.firstChild)
}})
},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)
})
},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)
})
},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;
null!=(c=d[e]);
e++){b||1!==c.nodeType||n.cleanData(vb(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&Ab(vb(c,"script")),c.parentNode.removeChild(c))
}return this
},empty:function(){for(var a,b=0;
null!=(a=this[b]);
b++){1===a.nodeType&&n.cleanData(vb(a,!1));
while(a.firstChild){a.removeChild(a.firstChild)
}a.options&&n.nodeName(a,"select")&&(a.options.length=0)
}return this
},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)
})
},html:function(a){return W(this,function(a){var b=this[0]||{},c=0,d=this.length;
if(void 0===a){return 1===b.nodeType?b.innerHTML.replace(gb,""):void 0
}if(!("string"!=typeof a||nb.test(a)||!l.htmlSerialize&&hb.test(a)||!l.leadingWhitespace&&ib.test(a)||sb[(kb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(jb,"<$1></$2>");
try{for(;
d>c;
c++){b=this[c]||{},1===b.nodeType&&(n.cleanData(vb(b,!1)),b.innerHTML=a)
}b=0
}catch(e){}}b&&this.empty().append(a)
},null,a,arguments.length)
},replaceWith:function(){var a=arguments[0];
return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(vb(this)),a&&a.replaceChild(b,this)
}),a&&(a.length||a.nodeType)?this:this.remove()
},detach:function(a){return this.remove(a,!0)
},domManip:function(a,b){a=e.apply([],a);
var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);
if(q||k>1&&"string"==typeof p&&!l.checkClone&&ob.test(p)){return this.each(function(c){var d=m.eq(c);
q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)
})
}if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(vb(i,"script"),yb),f=g.length;
k>j;
j++){d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,vb(d,"script"))),b.call(this[j],d,j)
}if(f){for(h=g[g.length-1].ownerDocument,n.map(g,zb),j=0;
f>j;
j++){d=g[j],pb.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(rb,"")))
}}i=c=null
}return this
}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;
h>=d;
d++){c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get())
}return this.pushStack(e)
}
});
var Db,Eb={};
function Fb(b,c){var d=n(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:n.css(d[0],"display");
return d.detach(),e
}function Gb(a){var b=z,c=Eb[a];
return c||(c=Fb(a,b),"none"!==c&&c||(Db=(Db||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Db[0].contentWindow||Db[0].contentDocument).document,b.write(),b.close(),c=Fb(a,b),Db.detach()),Eb[a]=c),c
}!function(){var a,b,c=z.createElement("div"),d="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],a.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(a.style.opacity),l.cssFloat=!!a.style.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===c.style.backgroundClip,a=c=null,l.shrinkWrapBlocks=function(){var a,c,e,f;
if(null==b){if(a=z.getElementsByTagName("body")[0],!a){return
}f="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",c=z.createElement("div"),e=z.createElement("div"),a.appendChild(c).appendChild(e),b=!1,typeof e.style.zoom!==L&&(e.style.cssText=d+";width:1px;padding:1px;zoom:1",e.innerHTML="<div></div>",e.firstChild.style.width="5px",b=3!==e.offsetWidth),a.removeChild(c),a=c=e=null
}return b
}
}();
var Hb=/^margin/,Ib=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Jb,Kb,Lb=/^(top|right|bottom|left)$/;
a.getComputedStyle?(Jb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)
},Kb=function(a,b,c){var d,e,f,g,h=a.style;
return c=c||Jb(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),Ib.test(g)&&Hb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""
}):z.documentElement.currentStyle&&(Jb=function(a){return a.currentStyle
},Kb=function(a,b,c){var d,e,f,g,h=a.style;
return c=c||Jb(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ib.test(g)&&!Lb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"
});
function Mb(a,b){return{get:function(){var c=a();
if(null!=c){return c?void delete this.get:(this.get=b).apply(this,arguments)
}}}
}!function(){var b,c,d,e,f,g,h=z.createElement("div"),i="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",j="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
h.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",b=h.getElementsByTagName("a")[0],b.style.cssText="float:left;opacity:.5",l.opacity=/^0.5/.test(b.style.opacity),l.cssFloat=!!b.style.cssFloat,h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,b=h=null,n.extend(l,{reliableHiddenOffsets:function(){if(null!=c){return c
}var a,b,d,e=z.createElement("div"),f=z.getElementsByTagName("body")[0];
if(f){return e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=z.createElement("div"),a.style.cssText=i,f.appendChild(a).appendChild(e),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",b=e.getElementsByTagName("td"),b[0].style.cssText="padding:0;margin:0;border:0;display:none",d=0===b[0].offsetHeight,b[0].style.display="",b[1].style.display="none",c=d&&0===b[0].offsetHeight,f.removeChild(a),e=f=null,c
}},boxSizing:function(){return null==d&&k(),d
},boxSizingReliable:function(){return null==e&&k(),e
},pixelPosition:function(){return null==f&&k(),f
},reliableMarginRight:function(){var b,c,d,e;
if(null==g&&a.getComputedStyle){if(b=z.getElementsByTagName("body")[0],!b){return
}c=z.createElement("div"),d=z.createElement("div"),c.style.cssText=i,b.appendChild(c).appendChild(d),e=d.appendChild(z.createElement("div")),e.style.cssText=d.style.cssText=j,e.style.marginRight=e.style.width="0",d.style.width="1px",g=!parseFloat((a.getComputedStyle(e,null)||{}).marginRight),b.removeChild(c)
}return g
}});
function k(){var b,c,h=z.getElementsByTagName("body")[0];
h&&(b=z.createElement("div"),c=z.createElement("div"),b.style.cssText=i,h.appendChild(b).appendChild(c),c.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%",n.swap(h,null!=h.style.zoom?{zoom:1}:{},function(){d=4===c.offsetWidth
}),e=!0,f=!1,g=!0,a.getComputedStyle&&(f="1%"!==(a.getComputedStyle(c,null)||{}).top,e="4px"===(a.getComputedStyle(c,null)||{width:"4px"}).width),h.removeChild(b),c=h=null)
}}(),n.swap=function(a,b,c,d){var e,f,g={};
for(f in b){g[f]=a.style[f],a.style[f]=b[f]
}e=c.apply(a,d||[]);
for(f in b){a.style[f]=g[f]
}return e
};
var Nb=/alpha\([^)]*\)/i,Ob=/opacity\s*=\s*([^)]*)/,Pb=/^(none|table(?!-c[ea]).+)/,Qb=new RegExp("^("+T+")(.*)$","i"),Rb=new RegExp("^([+-])=("+T+")","i"),Sb={position:"absolute",visibility:"hidden",display:"block"},Tb={letterSpacing:0,fontWeight:400},Ub=["Webkit","O","Moz","ms"];
function Vb(a,b){if(b in a){return b
}var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ub.length;
while(e--){if(b=Ub[e]+c,b in a){return b
}}return d
}function Wb(a,b){for(var c,d,e,f=[],g=0,h=a.length;
h>g;
g++){d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=n._data(d,"olddisplay",Gb(d.nodeName)))):f[g]||(e=V(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))))
}for(g=0;
h>g;
g++){d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"))
}return a
}function Xb(a,b,c){var d=Qb.exec(b);
return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b
}function Yb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;
4>f;
f+=2){"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)))
}return g
}function Zb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Jb(a),g=l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,f);
if(0>=e||null==e){if(e=Kb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ib.test(e)){return e
}d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0
}return e+Yb(a,b,c||(g?"border":"content"),d,f)+"px"
}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Kb(a,"opacity");
return""===c?"1":c
}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;
if(b=n.cssProps[h]||(n.cssProps[h]=Vb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c){return g&&"get" in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]
}if(f=typeof c,"string"===f&&(e=Rb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set" in g&&void 0===(c=g.set(a,c,d))))){try{i[b]="",i[b]=c
}catch(j){}}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);
return b=n.cssProps[h]||(n.cssProps[h]=Vb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get" in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Kb(a,b,d)),"normal"===f&&b in Tb&&(f=Tb[b]),""===c||c?(e=parseFloat(f),c===!0||n.isNumeric(e)?e||0:f):f
}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Pb.test(n.css(a,"display"))?n.swap(a,Sb,function(){return Zb(a,b,d)
}):Zb(a,b,d):void 0
},set:function(a,c,d){var e=d&&Jb(a);
return Xb(a,c,d?Yb(a,b,d,l.boxSizing()&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)
}}
}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Ob.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?0.01*parseFloat(RegExp.$1)+"":b?"1":""
},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";
c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Nb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Nb.test(f)?f.replace(Nb,e):f+" "+e)
}}),n.cssHooks.marginRight=Mb(l.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},Kb,[a,"marginRight"]):void 0
}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];
4>d;
d++){e[a+U[d]+b]=f[d]||f[d-2]||f[0]
}return e
}},Hb.test(a)||(n.cssHooks[a+b].set=Xb)
}),n.fn.extend({css:function(a,b){return W(this,function(a,b,c){var d,e,f={},g=0;
if(n.isArray(b)){for(d=Jb(a),e=b.length;
e>g;
g++){f[b[g]]=n.css(a,b[g],!1,d)
}return f
}return void 0!==c?n.style(a,b,c):n.css(a,b)
},a,b,arguments.length>1)
},show:function(){return Wb(this,!0)
},hide:function(){return Wb(this)
},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()
})
}});
function $b(a,b,c,d,e){return new $b.prototype.init(a,b,c,d,e)
}n.Tween=$b,$b.prototype={constructor:$b,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")
},cur:function(){var a=$b.propHooks[this.prop];
return a&&a.get?a.get(this):$b.propHooks._default.get(this)
},run:function(a){var b,c=$b.propHooks[this.prop];
return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):$b.propHooks._default.set(this),this
}},$b.prototype.init.prototype=$b.prototype,$b.propHooks={_default:{get:function(a){var b;
return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]
},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now
}}},$b.propHooks.scrollTop=$b.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)
}},n.easing={linear:function(a){return a
},swing:function(a){return 0.5-Math.cos(a*Math.PI)/2
}},n.fx=$b.prototype.init,n.fx.step={};
var _b,ac,bc=/^(?:toggle|show|hide)$/,cc=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),dc=/queueHooks$/,ec=[jc],fc={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=cc.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&cc.exec(n.css(c.elem,a)),h=1,i=20;
if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;
do{h=h||".5",g/=h,n.style(c.elem,a,g+f)
}while(h!==(h=c.cur()/d)&&1!==h&&--i)
}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c
}]};
function gc(){return setTimeout(function(){_b=void 0
}),_b=n.now()
}function hc(a,b){var c,d={height:a},e=0;
for(b=b?1:0;
4>e;
e+=2-b){c=U[e],d["margin"+c]=d["padding"+c]=a
}return b&&(d.opacity=d.width=a),d
}function ic(a,b,c){for(var d,e=(fc[b]||[]).concat(fc["*"]),f=0,g=e.length;
g>f;
f++){if(d=e[f].call(c,b,a)){return d
}}}function jc(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&V(a),r=n._data(a,"fxshow");
c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()
}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()
})
})),1===a.nodeType&&("height" in b||"width" in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k=Gb(a.nodeName),"none"===j&&(j=k),"inline"===j&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==k?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]
}));
for(d in b){if(e=b[d],bc.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d]){continue
}q=!0
}o[d]=r&&r[d]||n.style(a,d)
}}if(!n.isEmptyObject(o)){r?"hidden" in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()
}),m.done(function(){var b;
n._removeData(a,"fxshow");
for(b in o){n.style(a,b,o[b])
}});
for(d in o){g=ic(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))
}}}function kc(a,b){var c,d,e,f,g;
for(c in a){if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand" in g){f=g.expand(f),delete a[d];
for(c in f){c in a||(a[c]=f[c],b[c]=e)
}}else{b[d]=e
}}}function lc(a,b,c){var d,e,f=0,g=ec.length,h=n.Deferred().always(function(){delete i.elem
}),i=function(){if(e){return !1
}for(var b=_b||gc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;
i>g;
g++){j.tweens[g].run(f)
}return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)
},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:_b||gc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);
return j.tweens.push(d),d
},stop:function(b){var c=0,d=b?j.tweens.length:0;
if(e){return this
}for(e=!0;
d>c;
c++){j.tweens[c].run(1)
}return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this
}}),k=j.props;
for(kc(k,j.opts.specialEasing);
g>f;
f++){if(d=ec[f].call(j,a,k,j.opts)){return d
}}return n.map(k,ic,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)
}n.Animation=n.extend(lc,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");
for(var c,d=0,e=a.length;
e>d;
d++){c=a[d],fc[c]=fc[c]||[],fc[c].unshift(b)
}},prefilter:function(a,b){b?ec.unshift(a):ec.push(a)
}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};
return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)
},d
},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)
},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=lc(this,n.extend({},a),f);
(e||n._data(this,"finish"))&&b.stop(!0)
};
return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)
},stop:function(a,b,c){var d=function(a){var b=a.stop;
delete a.stop,b(c)
};
return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);
if(e){g[e]&&g[e].stop&&d(g[e])
}else{for(e in g){g[e]&&g[e].stop&&dc.test(e)&&d(g[e])
}}for(e=f.length;
e--;
){f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1))
}(b||!c)&&n.dequeue(this,a)
})
},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;
for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;
b--;
){f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1))
}for(b=0;
g>b;
b++){d[b]&&d[b].finish&&d[b].finish.call(this)
}delete c.finish
})
}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];
n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(hc(b,!0),a,d,e)
}
}),n.each({slideDown:hc("show"),slideUp:hc("hide"),slideToggle:hc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)
}
}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;
for(_b=n.now();
c<b.length;
c++){a=b[c],a()||b[c]!==a||b.splice(c--,1)
}b.length||n.fx.stop(),_b=void 0
},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()
},n.fx.interval=13,n.fx.start=function(){ac||(ac=setInterval(n.fx.tick,n.fx.interval))
},n.fx.stop=function(){clearInterval(ac),ac=null
},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);
c.stop=function(){clearTimeout(d)
}
})
},function(){var a,b,c,d,e=z.createElement("div");
e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null
}();
var mc=/\r/g;
n.fn.extend({val:function(a){var b,c,d,e=this[0];
if(arguments.length){return d=n.isFunction(a),this.each(function(c){var e;
1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""
})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set" in b&&void 0!==b.set(this,e,"value")||(this.value=e))
})
}if(e){return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get" in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(mc,""):null==c?"":c)
}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");
return null!=b?b:n.text(a)
}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;
h>i;
i++){if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f){return b
}g.push(b)
}}return g
},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;
while(g--){if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0){try{d.selected=c=!0
}catch(h){d.scrollHeight
}}else{d.selected=!1
}}return c||(a.selectedIndex=-1),e
}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0
}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value
})
});
var nc,oc,pc=n.expr.attrHandle,qc=/^(?:checked|selected)$/i,rc=l.getSetAttribute,sc=l.input;
n.fn.extend({attr:function(a,b){return W(this,n.attr,a,b,arguments.length>1)
},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)
})
}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;
if(a&&3!==f&&8!==f&&2!==f){return typeof a.getAttribute===L?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?oc:nc)),void 0===c?d&&"get" in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set" in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);
if(f&&1===a.nodeType){while(c=f[e++]){d=n.propFix[c]||c,n.expr.match.bool.test(c)?sc&&rc||!qc.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(rc?c:d)
}}},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;
return a.setAttribute("type",b),c&&(a.value=c),b
}}}}}),oc={set:function(a,b,c){return b===!1?n.removeAttr(a,c):sc&&rc||!qc.test(c)?a.setAttribute(!rc&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c
}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=pc[b]||n.find.attr;
pc[b]=sc&&rc||!qc.test(b)?function(a,b,d){var e,f;
return d||(f=pc[b],pc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,pc[b]=f),e
}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null
}
}),sc&&rc||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void (a.defaultValue=b):nc&&nc.set(a,b,c)
}}),rc||(nc={set:function(a,b,c){var d=a.getAttributeNode(c);
return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0
}},pc.id=pc.name=pc.coords=function(a,b,c){var d;
return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null
},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);
return c&&c.specified?c.value:void 0
},set:nc.set},n.attrHooks.contenteditable={set:function(a,b,c){nc.set(a,""===b?!1:b,c)
}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0
}}
})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0
},set:function(a,b){return a.style.cssText=b+""
}});
var tc=/^(?:input|select|textarea|button|object)$/i,uc=/^(?:a|area)$/i;
n.fn.extend({prop:function(a,b){return W(this,n.prop,a,b,arguments.length>1)
},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]
}catch(b){}})
}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;
if(a&&3!==g&&8!==g&&2!==g){return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set" in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get" in e&&null!==(d=e.get(a,b))?d:a[b]
}},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");
return b?parseInt(b,10):tc.test(a.nodeName)||uc.test(a.nodeName)&&a.href?0:-1
}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)
}}
}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;
return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null
}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this
}),l.enctype||(n.propFix.enctype="encoding");
var vc=/[\t\r\n\f]/g;
n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;
if(n.isFunction(a)){return this.each(function(b){n(this).addClass(a.call(this,b,this.className))
})
}if(j){for(b=(a||"").match(F)||[];
i>h;
h++){if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):" ")){f=0;
while(e=b[f++]){d.indexOf(" "+e+" ")<0&&(d+=e+" ")
}g=n.trim(d),c.className!==g&&(c.className=g)
}}}return this
},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;
if(n.isFunction(a)){return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))
})
}if(j){for(b=(a||"").match(F)||[];
i>h;
h++){if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(vc," "):"")){f=0;
while(e=b[f++]){while(d.indexOf(" "+e+" ")>=0){d=d.replace(" "+e+" "," ")
}}g=a?n.trim(d):"",c.className!==g&&(c.className=g)
}}}return this
},toggleClass:function(a,b){var c=typeof a;
return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)
}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];
while(b=f[d++]){e.hasClass(b)?e.removeClass(b):e.addClass(b)
}}else{(c===L||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")
}})
},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;
d>c;
c++){if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(vc," ").indexOf(b)>=0){return !0
}}return !1
}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)
}
}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)
},bind:function(a,b,c){return this.on(a,null,b,c)
},unbind:function(a,b){return this.off(a,null,b)
},delegate:function(a,b,c,d){return this.on(b,a,c,d)
},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)
}});
var wc=n.now(),xc=/\?/,yc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
n.parseJSON=function(b){if(a.JSON&&a.JSON.parse){return a.JSON.parse(b+"")
}var c,d=null,e=n.trim(b+"");
return e&&!n.trim(e.replace(yc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")
}))?Function("return "+e)():n.error("Invalid JSON: "+b)
},n.parseXML=function(b){var c,d;
if(!b||"string"!=typeof b){return null
}try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))
}catch(e){c=void 0
}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c
};
var zc,Ac,Bc=/#.*$/,Cc=/([?&])_=[^&]*/,Dc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ec=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Fc=/^(?:GET|HEAD)$/,Gc=/^\/\//,Hc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ic={},Jc={},Kc="*/".concat("*");
try{Ac=location.href
}catch(Lc){Ac=z.createElement("a"),Ac.href="",Ac=Ac.href
}zc=Hc.exec(Ac.toLowerCase())||[];
function Mc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");
var d,e=0,f=b.toLowerCase().match(F)||[];
if(n.isFunction(c)){while(d=f[e++]){"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)
}}}
}function Nc(a,b,c,d){var e={},f=a===Jc;
function g(h){var i;
return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);
return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)
}),i
}return g(b.dataTypes[0])||!e["*"]&&g("*")
}function Oc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};
for(d in b){void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d])
}return c&&n.extend(!0,a,c),a
}function Pc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;
while("*"===i[0]){i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"))
}if(e){for(g in h){if(h[g]&&h[g].test(e)){i.unshift(g);
break
}}}if(i[0] in c){f=i[0]
}else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;
break
}d||(d=g)
}f=f||d
}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0
}function Qc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();
if(k[1]){for(g in a.converters){j[g.toLowerCase()]=a.converters[g]
}}f=k.shift();
while(f){if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift()){if("*"===f){f=i
}else{if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g){for(e in j){if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));
break
}}}if(g!==!0){if(g&&a["throws"]){b=g(b)
}else{try{b=g(b)
}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}
}}}}}}}return{state:"success",data:b}
}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ac,type:"GET",isLocal:Ec.test(zc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Oc(Oc(a,n.ajaxSettings),b):Oc(n.ajaxSettings,a)
},ajaxPrefilter:Mc(Ic),ajaxTransport:Mc(Jc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};
var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;
if(2===t){if(!j){j={};
while(b=Dc.exec(f)){j[b[1].toLowerCase()]=b[2]
}}b=j[a.toLowerCase()]
}return null==b?null:b
},getAllResponseHeaders:function(){return 2===t?f:null
},setRequestHeader:function(a,b){var c=a.toLowerCase();
return t||(a=s[c]=s[c]||a,r[a]=b),this
},overrideMimeType:function(a){return t||(k.mimeType=a),this
},statusCode:function(a){var b;
if(a){if(2>t){for(b in a){q[b]=[q[b],a[b]]
}}else{v.always(a[v.status])
}}return this
},abort:function(a){var b=a||u;
return i&&i.abort(b),x(0,b),this
}};
if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||Ac)+"").replace(Bc,"").replace(Gc,zc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(c=Hc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===zc[1]&&c[2]===zc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(zc[3]||("http:"===zc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),Nc(Ic,k,b,v),2===t){return v
}h=k.global,h&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Fc.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(xc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Cc.test(e)?e.replace(Cc,"$1_="+wc++):e+(xc.test(e)?"&":"?")+"_="+wc++)),k.ifModified&&(n.lastModified[e]&&v.setRequestHeader("If-Modified-Since",n.lastModified[e]),n.etag[e]&&v.setRequestHeader("If-None-Match",n.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Kc+"; q=0.01":""):k.accepts["*"]);
for(d in k.headers){v.setRequestHeader(d,k.headers[d])
}if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t)){return v.abort()
}u="abort";
for(d in {success:1,error:1,complete:1}){v[d](k[d])
}if(i=Nc(Jc,k,b,v)){v.readyState=1,h&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")
},k.timeout));
try{t=1,i.send(r,x)
}catch(w){if(!(2>t)){throw w
}x(-1,w)
}}else{x(-1,"No Transport")
}function x(a,b,c,d){var j,r,s,u,w,x=b;
2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Pc(k,v,c)),u=Qc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(n.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))
}return v
},getJSON:function(a,b,c){return n.get(a,b,c,"json")
},getScript:function(a,b){return n.get(a,void 0,b,"script")
}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})
}
}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)
}
}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})
},n.fn.extend({wrapAll:function(a){if(n.isFunction(a)){return this.each(function(b){n(this).wrapAll(a.call(this,b))
})
}if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);
this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;
while(a.firstChild&&1===a.firstChild.nodeType){a=a.firstChild
}return a
}).append(this)
}return this
},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))
}:function(){var b=n(this),c=b.contents();
c.length?c.wrapAll(a):b.append(a)
})
},wrap:function(a){var b=n.isFunction(a);
return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)
})
},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)
}).end()
}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!l.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||n.css(a,"display"))
},n.expr.filters.visible=function(a){return !n.expr.filters.hidden(a)
};
var Rc=/%20/g,Sc=/\[\]$/,Tc=/\r?\n/g,Uc=/^(?:submit|button|image|reset|file)$/i,Vc=/^(?:input|select|textarea|keygen)/i;
function Wc(a,b,c,d){var e;
if(n.isArray(b)){n.each(b,function(b,e){c||Sc.test(a)?d(a,e):Wc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)
})
}else{if(c||"object"!==n.type(b)){d(a,b)
}else{for(e in b){Wc(a+"["+e+"]",b[e],c,d)
}}}}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)
};
if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a)){n.each(a,function(){e(this.name,this.value)
})
}else{for(c in a){Wc(c,a[c],b,e)
}}return d.join("&").replace(Rc,"+")
},n.fn.extend({serialize:function(){return n.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");
return a?n.makeArray(a):this
}).filter(function(){var a=this.type;
return this.name&&!n(this).is(":disabled")&&Vc.test(this.nodeName)&&!Uc.test(a)&&(this.checked||!X.test(a))
}).map(function(a,b){var c=n(this).val();
return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Tc,"\r\n")}
}):{name:b.name,value:c.replace(Tc,"\r\n")}
}).get()
}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return !this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&$c()||_c()
}:$c;
var Xc=0,Yc={},Zc=n.ajaxSettings.xhr();
a.ActiveXObject&&n(a).on("unload",function(){for(var a in Yc){Yc[a](void 0,!0)
}}),l.cors=!!Zc&&"withCredentials" in Zc,Zc=l.ajax=!!Zc,Zc&&n.ajaxTransport(function(a){if(!a.crossDomain||l.cors){var b;
return{send:function(c,d){var e,f=a.xhr(),g=++Xc;
if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields){for(e in a.xhrFields){f[e]=a.xhrFields[e]
}}a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");
for(e in c){void 0!==c[e]&&f.setRequestHeader(e,c[e]+"")
}f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;
if(b&&(e||4===f.readyState)){if(delete Yc[g],b=void 0,f.onreadystatechange=n.noop,e){4!==f.readyState&&f.abort()
}else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);
try{i=f.statusText
}catch(k){i=""
}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404
}}j&&d(h,i,j,f.getAllResponseHeaders())
},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Yc[g]=b:b()
},abort:function(){b&&b(void 0,!0)
}}
}});
function $c(){try{return new a.XMLHttpRequest
}catch(b){}}function _c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")
}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a
}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)
}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=z.head||n("head")[0]||z.documentElement;
return{send:function(d,e){b=z.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))
},c.insertBefore(b,c.firstChild)
},abort:function(){b&&b.onload(void 0,!0)
}}
}});
var ad=[],bd=/(=)\?(?=&|$)|\?\?/;
n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=ad.pop()||n.expando+"_"+wc++;
return this[a]=!0,a
}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(bd.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&bd.test(b.data)&&"data");
return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(bd,"$1"+e):b.jsonp!==!1&&(b.url+=(xc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]
},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments
},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,ad.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0
}),"script"):void 0
}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a){return null
}"boolean"==typeof b&&(c=b,b=!1),b=b||z;
var d=v.exec(a),e=!c&&[];
return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))
};
var cd=n.fn.load;
n.fn.load=function(a,b,c){if("string"!=typeof a&&cd){return cd.apply(this,arguments)
}var d,e,f,g=this,h=a.indexOf(" ");
return h>=0&&(d=a.slice(h,a.length),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&n.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)
}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])
}),this
},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem
}).length
};
var dd=a.document.documentElement;
function ed(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1
}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};
"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using" in b?b.using.call(a,m):l.css(m)
}},n.fn.extend({offset:function(a){if(arguments.length){return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)
})
}var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;
if(f){return b=f.documentElement,n.contains(b,e)?(typeof e.getBoundingClientRect!==L&&(d=e.getBoundingClientRect()),c=ed(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d
}},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];
return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}
}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||dd;
while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position")){a=a.offsetParent
}return a||dd
})
}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);
n.fn[a]=function(d){return W(this,function(a,d,e){var f=ed(a);
return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void (f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)
},a,d,arguments.length,null)
}
}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Mb(l.pixelPosition,function(a,c){return c?(c=Kb(a,b),Ib.test(c)?n(a).position()[b]+"px":c):void 0
})
}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");
return W(this,function(b,c,d){var e;
return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)
},b,f?d:void 0,f,null)
}
})
}),n.fn.size=function(){return this.length
},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n
});
var fd=a.jQuery,gd=a.$;
return n.noConflict=function(b){return a.$===n&&(a.$=gd),b&&a.jQuery===n&&(a.jQuery=fd),n
},typeof b===L&&(a.jQuery=a.$=n),n
});
/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery){throw new Error("Bootstrap's JavaScript requires jQuery")
}+function(d){var c=d.fn.jquery.split(" ")[0].split(".");
if(c[0]<2&&c[1]<9||1==c[0]&&9==c[1]&&c[2]<1){throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}}(jQuery),+function(d){function c(){var f=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};
for(var g in e){if(void 0!==f.style[g]){return{end:e[g]}
}}return !1
}d.fn.emulateTransitionEnd=function(a){var h=!1,g=this;
d(this).one("bsTransitionEnd",function(){h=!0
});
var f=function(){h||d(g).trigger(d.support.transition.end)
};
return setTimeout(f,a),this
},d(function(){d.support.transition=c(),d.support.transition&&(d.event.special.bsTransitionEnd={bindType:d.support.transition.end,delegateType:d.support.transition.end,handle:function(a){return d(a.target).is(this)?a.handleObj.handler.apply(this,arguments):void 0
}})
})
}(jQuery),+function(g){function f(a){return this.each(function(){var d=g(this),b=d.data("bs.alert");
b||d.data("bs.alert",b=new j(this)),"string"==typeof a&&b[a].call(d)
})
}var k='[data-dismiss="alert"]',j=function(a){g(a).on("click",k,this.close)
};
j.VERSION="3.3.4",j.TRANSITION_DURATION=150,j.prototype.close=function(a){function n(){d.detach().trigger("closed.bs.alert").remove()
}var m=g(this),l=m.attr("data-target");
l||(l=m.attr("href"),l=l&&l.replace(/.*(?=#[^\s]*$)/,""));
var d=g(l);
a&&a.preventDefault(),d.length||(d=m.closest(".alert")),d.trigger(a=g.Event("close.bs.alert")),a.isDefaultPrevented()||(d.removeClass("in"),g.support.transition&&d.hasClass("fade")?d.one("bsTransitionEnd",n).emulateTransitionEnd(j.TRANSITION_DURATION):n())
};
var h=g.fn.alert;
g.fn.alert=f,g.fn.alert.Constructor=j,g.fn.alert.noConflict=function(){return g.fn.alert=h,this
},g(document).on("click.bs.alert.data-api",k,j.prototype.close)
}(jQuery),+function(f){function e(a){return this.each(function(){var j=f(this),c=j.data("bs.button"),b="object"==typeof a&&a;
c||j.data("bs.button",c=new h(this,b)),"toggle"==a?c.toggle():a&&c.setState(a)
})
}var h=function(a,c){this.$element=f(a),this.options=f.extend({},h.DEFAULTS,c),this.isLoading=!1
};
h.VERSION="3.3.4",h.DEFAULTS={loadingText:"loading..."},h.prototype.setState=function(a){var m="disabled",l=this.$element,k=l.is("input")?"val":"html",j=l.data();
a+="Text",null==j.resetText&&l.data("resetText",l[k]()),setTimeout(f.proxy(function(){l[k](null==j[a]?this.options[a]:j[a]),"loadingText"==a?(this.isLoading=!0,l.addClass(m).attr(m,m)):this.isLoading&&(this.isLoading=!1,l.removeClass(m).removeAttr(m))
},this),0)
},h.prototype.toggle=function(){var j=!0,d=this.$element.closest('[data-toggle="buttons"]');
if(d.length){var k=this.$element.find("input");
"radio"==k.prop("type")&&(k.prop("checked")&&this.$element.hasClass("active")?j=!1:d.find(".active").removeClass("active")),j&&k.prop("checked",!this.$element.hasClass("active")).trigger("change")
}else{this.$element.attr("aria-pressed",!this.$element.hasClass("active"))
}j&&this.$element.toggleClass("active")
};
var g=f.fn.button;
f.fn.button=e,f.fn.button.Constructor=h,f.fn.button.noConflict=function(){return f.fn.button=g,this
},f(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(b){var a=f(b.target);
a.hasClass("btn")||(a=a.closest(".btn")),e.call(a,"toggle"),b.preventDefault()
}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(a){f(a.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(a.type))
})
}(jQuery),+function(g){function f(a){return this.each(function(){var m=g(this),l=m.data("bs.carousel"),c=g.extend({},k.DEFAULTS,m.data(),"object"==typeof a&&a),b="string"==typeof a?a:c.slide;
l||m.data("bs.carousel",l=new k(this,c)),"number"==typeof a?l.to(a):b?l[b]():c.interval&&l.pause().cycle()
})
}var k=function(a,d){this.$element=g(a),this.$indicators=this.$element.find(".carousel-indicators"),this.options=d,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",g.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart" in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",g.proxy(this.pause,this)).on("mouseleave.bs.carousel",g.proxy(this.cycle,this))
};
k.VERSION="3.3.4",k.TRANSITION_DURATION=600,k.DEFAULTS={interval:5000,pause:"hover",wrap:!0,keyboard:!0},k.prototype.keydown=function(b){if(!/input|textarea/i.test(b.target.tagName)){switch(b.which){case 37:this.prev();
break;
case 39:this.next();
break;
default:return
}b.preventDefault()
}},k.prototype.cycle=function(a){return a||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(g.proxy(this.next,this),this.options.interval)),this
},k.prototype.getItemIndex=function(b){return this.$items=b.parent().children(".item"),this.$items.index(b||this.$active)
},k.prototype.getItemForDirection=function(m,l){var q=this.getItemIndex(l),p="prev"==m&&0===q||"next"==m&&q==this.$items.length-1;
if(p&&!this.options.wrap){return l
}var o="prev"==m?-1:1,n=(q+o)%this.$items.length;
return this.$items.eq(n)
},k.prototype.to=function(e){var d=this,l=this.getItemIndex(this.$active=this.$element.find(".item.active"));
return e>this.$items.length-1||0>e?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){d.to(e)
}):l==e?this.pause().cycle():this.slide(e>l?"next":"prev",this.$items.eq(e))
},k.prototype.pause=function(a){return a||(this.paused=!0),this.$element.find(".next, .prev").length&&g.support.transition&&(this.$element.trigger(g.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this
},k.prototype.next=function(){return this.sliding?void 0:this.slide("next")
},k.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")
},k.prototype.slide=function(v,u){var t=this.$element.find(".item.active"),s=u||this.getItemForDirection(v,t),r=this.interval,q="next"==v?"left":"right",p=this;
if(s.hasClass("active")){return this.sliding=!1
}var o=s[0],n=g.Event("slide.bs.carousel",{relatedTarget:o,direction:q});
if(this.$element.trigger(n),!n.isDefaultPrevented()){if(this.sliding=!0,r&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");
var c=g(this.$indicators.children()[this.getItemIndex(s)]);
c&&c.addClass("active")
}var a=g.Event("slid.bs.carousel",{relatedTarget:o,direction:q});
return g.support.transition&&this.$element.hasClass("slide")?(s.addClass(v),s[0].offsetWidth,t.addClass(q),s.addClass(q),t.one("bsTransitionEnd",function(){s.removeClass([v,q].join(" ")).addClass("active"),t.removeClass(["active",q].join(" ")),p.sliding=!1,setTimeout(function(){p.$element.trigger(a)
},0)
}).emulateTransitionEnd(k.TRANSITION_DURATION)):(t.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(a)),r&&this.cycle(),this
}};
var j=g.fn.carousel;
g.fn.carousel=f,g.fn.carousel.Constructor=k,g.fn.carousel.noConflict=function(){return g.fn.carousel=j,this
};
var h=function(o){var n,m=g(this),l=g(m.attr("data-target")||(n=m.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""));
if(l.hasClass("carousel")){var b=g.extend({},l.data(),m.data()),a=m.attr("data-slide-to");
a&&(b.interval=!1),f.call(l,b),a&&l.data("bs.carousel").to(a),o.preventDefault()
}};
g(document).on("click.bs.carousel.data-api","[data-slide]",h).on("click.bs.carousel.data-api","[data-slide-to]",h),g(window).on("load",function(){g('[data-ride="carousel"]').each(function(){var a=g(this);
f.call(a,a.data())
})
})
}(jQuery),+function(g){function f(a){var l,e=a.attr("data-target")||(l=a.attr("href"))&&l.replace(/.*(?=#[^\s]+$)/,"");
return g(e)
}function k(a){return this.each(function(){var l=g(this),d=l.data("bs.collapse"),b=g.extend({},j.DEFAULTS,l.data(),"object"==typeof a&&a);
!d&&b.toggle&&/show|hide/.test(a)&&(b.toggle=!1),d||l.data("bs.collapse",d=new j(this,b)),"string"==typeof a&&d[a]()
})
}var j=function(a,d){this.$element=g(a),this.options=g.extend({},j.DEFAULTS,d),this.$trigger=g('[data-toggle="collapse"][href="#'+a.id+'"],[data-toggle="collapse"][data-target="#'+a.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()
};
j.VERSION="3.3.4",j.TRANSITION_DURATION=350,j.DEFAULTS={toggle:!0},j.prototype.dimension=function(){var b=this.$element.hasClass("width");
return b?"width":"height"
},j.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var a,n=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");
if(!(n&&n.length&&(a=n.data("bs.collapse"),a&&a.transitioning))){var m=g.Event("show.bs.collapse");
if(this.$element.trigger(m),!m.isDefaultPrevented()){n&&n.length&&(k.call(n,"hide"),a||n.data("bs.collapse",null));
var l=this.dimension();
this.$element.removeClass("collapse").addClass("collapsing")[l](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;
var d=function(){this.$element.removeClass("collapsing").addClass("collapse in")[l](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")
};
if(!g.support.transition){return d.call(this)
}var c=g.camelCase(["scroll",l].join("-"));
this.$element.one("bsTransitionEnd",g.proxy(d,this)).emulateTransitionEnd(j.TRANSITION_DURATION)[l](this.$element[0][c])
}}}},j.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var a=g.Event("hide.bs.collapse");
if(this.$element.trigger(a),!a.isDefaultPrevented()){var l=this.dimension();
this.$element[l](this.$element[l]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;
var d=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
};
return g.support.transition?void this.$element[l](0).one("bsTransitionEnd",g.proxy(d,this)).emulateTransitionEnd(j.TRANSITION_DURATION):d.call(this)
}}},j.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()
},j.prototype.getParent=function(){return g(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(g.proxy(function(l,b){var a=g(b);
this.addAriaAndCollapsedClass(f(a),a)
},this)).end()
},j.prototype.addAriaAndCollapsedClass=function(e,d){var l=e.hasClass("in");
e.attr("aria-expanded",l),d.toggleClass("collapsed",!l).attr("aria-expanded",l)
};
var h=g.fn.collapse;
g.fn.collapse=k,g.fn.collapse.Constructor=j,g.fn.collapse.noConflict=function(){return g.fn.collapse=h,this
},g(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(m){var l=g(this);
l.attr("data-target")||m.preventDefault();
var c=f(l),b=c.data("bs.collapse"),a=b?"toggle":l.data();
k.call(c,a)
})
}(jQuery),+function(k){function j(a){a&&3===a.which||(k(o).remove(),k(n).each(function(){var g=k(this),c=q(g),b={relatedTarget:this};
c.hasClass("open")&&(c.trigger(a=k.Event("hide.bs.dropdown",b)),a.isDefaultPrevented()||(g.attr("aria-expanded","false"),c.removeClass("open").trigger("hidden.bs.dropdown",b)))
}))
}function q(a){var f=a.attr("data-target");
f||(f=a.attr("href"),f=f&&/#[A-Za-z]/.test(f)&&f.replace(/.*(?=#[^\s]*$)/,""));
var e=f&&k(f);
return e&&e.length?e:a.parent()
}function p(a){return this.each(function(){var e=k(this),b=e.data("bs.dropdown");
b||e.data("bs.dropdown",b=new m(this)),"string"==typeof a&&b[a].call(e)
})
}var o=".dropdown-backdrop",n='[data-toggle="dropdown"]',m=function(a){k(a).on("click.bs.dropdown",this.toggle)
};
m.VERSION="3.3.4",m.prototype.toggle=function(s){var r=k(this);
if(!r.is(".disabled, :disabled")){var c=q(r),b=c.hasClass("open");
if(j(),!b){"ontouchstart" in document.documentElement&&!c.closest(".navbar-nav").length&&k('<div class="dropdown-backdrop"/>').insertAfter(k(this)).on("click",j);
var a={relatedTarget:this};
if(c.trigger(s=k.Event("show.bs.dropdown",a)),s.isDefaultPrevented()){return
}r.trigger("focus").attr("aria-expanded","true"),c.toggleClass("open").trigger("shown.bs.dropdown",a)
}return !1
}},m.prototype.keydown=function(a){if(/(38|40|27|32)/.test(a.which)&&!/input|textarea/i.test(a.target.tagName)){var u=k(this);
if(a.preventDefault(),a.stopPropagation(),!u.is(".disabled, :disabled")){var t=q(u),s=t.hasClass("open");
if(!s&&27!=a.which||s&&27==a.which){return 27==a.which&&t.find(n).trigger("focus"),u.trigger("click")
}var r=" li:not(.disabled):visible a",f=t.find('[role="menu"]'+r+', [role="listbox"]'+r);
if(f.length){var c=f.index(a.target);
38==a.which&&c>0&&c--,40==a.which&&c<f.length-1&&c++,~c||(c=0),f.eq(c).trigger("focus")
}}}};
var l=k.fn.dropdown;
k.fn.dropdown=p,k.fn.dropdown.Constructor=m,k.fn.dropdown.noConflict=function(){return k.fn.dropdown=l,this
},k(document).on("click.bs.dropdown.data-api",j).on("click.bs.dropdown.data-api",".dropdown form",function(b){b.stopPropagation()
}).on("click.bs.dropdown.data-api",n,m.prototype.toggle).on("keydown.bs.dropdown.data-api",n,m.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',m.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',m.prototype.keydown)
}(jQuery),+function(f){function e(a,c){return this.each(function(){var j=f(this),d=j.data("bs.modal"),b=f.extend({},h.DEFAULTS,j.data(),"object"==typeof a&&a);
d||j.data("bs.modal",d=new h(this,b)),"string"==typeof a?d[a](c):b.show&&d.show(c)
})
}var h=function(a,d){this.options=d,this.$body=f(document.body),this.$element=f(a),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,f.proxy(function(){this.$element.trigger("loaded.bs.modal")
},this))
};
h.VERSION="3.3.4",h.TRANSITION_DURATION=300,h.BACKDROP_TRANSITION_DURATION=150,h.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},h.prototype.toggle=function(b){return this.isShown?this.hide():this.show(b)
},h.prototype.show=function(a){var j=this,c=f.Event("show.bs.modal",{relatedTarget:a});
this.$element.trigger(c),this.isShown||c.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',f.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){j.$element.one("mouseup.dismiss.bs.modal",function(d){f(d.target).is(j.$element)&&(j.ignoreBackdropClick=!0)
})
}),this.backdrop(function(){var d=f.support.transition&&j.$element.hasClass("fade");
j.$element.parent().length||j.$element.appendTo(j.$body),j.$element.show().scrollTop(0),j.adjustDialog(),d&&j.$element[0].offsetWidth,j.$element.addClass("in").attr("aria-hidden",!1),j.enforceFocus();
var b=f.Event("shown.bs.modal",{relatedTarget:a});
d?j.$dialog.one("bsTransitionEnd",function(){j.$element.trigger("focus").trigger(b)
}).emulateTransitionEnd(h.TRANSITION_DURATION):j.$element.trigger("focus").trigger(b)
}))
},h.prototype.hide=function(a){a&&a.preventDefault(),a=f.Event("hide.bs.modal"),this.$element.trigger(a),this.isShown&&!a.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),f(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),f.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",f.proxy(this.hideModal,this)).emulateTransitionEnd(h.TRANSITION_DURATION):this.hideModal())
},h.prototype.enforceFocus=function(){f(document).off("focusin.bs.modal").on("focusin.bs.modal",f.proxy(function(b){this.$element[0]===b.target||this.$element.has(b.target).length||this.$element.trigger("focus")
},this))
},h.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",f.proxy(function(b){27==b.which&&this.hide()
},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")
},h.prototype.resize=function(){this.isShown?f(window).on("resize.bs.modal",f.proxy(this.handleUpdate,this)):f(window).off("resize.bs.modal")
},h.prototype.hideModal=function(){var b=this;
this.$element.hide(),this.backdrop(function(){b.$body.removeClass("modal-open"),b.resetAdjustments(),b.resetScrollbar(),b.$element.trigger("hidden.bs.modal")
})
},h.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null
},h.prototype.backdrop=function(a){var l=this,k=this.$element.hasClass("fade")?"fade":"";
if(this.isShown&&this.options.backdrop){var j=f.support.transition&&k;
if(this.$backdrop=f('<div class="modal-backdrop '+k+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",f.proxy(function(b){return this.ignoreBackdropClick?void (this.ignoreBackdropClick=!1):void (b.target===b.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))
},this)),j&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!a){return
}j?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(h.BACKDROP_TRANSITION_DURATION):a()
}else{if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");
var c=function(){l.removeBackdrop(),a&&a()
};
f.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",c).emulateTransitionEnd(h.BACKDROP_TRANSITION_DURATION):c()
}else{a&&a()
}}},h.prototype.handleUpdate=function(){this.adjustDialog()
},h.prototype.adjustDialog=function(){var b=this.$element[0].scrollHeight>document.documentElement.clientHeight;
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&b?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!b?this.scrollbarWidth:""})
},h.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})
},h.prototype.checkScrollbar=function(){var d=window.innerWidth;
if(!d){var c=document.documentElement.getBoundingClientRect();
d=c.right-Math.abs(c.left)
}this.bodyIsOverflowing=document.body.clientWidth<d,this.scrollbarWidth=this.measureScrollbar()
},h.prototype.setScrollbar=function(){var b=parseInt(this.$body.css("padding-right")||0,10);
this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",b+this.scrollbarWidth)
},h.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)
},h.prototype.measureScrollbar=function(){var d=document.createElement("div");
d.className="modal-scrollbar-measure",this.$body.append(d);
var c=d.offsetWidth-d.clientWidth;
return this.$body[0].removeChild(d),c
};
var g=f.fn.modal;
f.fn.modal=e,f.fn.modal.Constructor=h,f.fn.modal.noConflict=function(){return f.fn.modal=g,this
},f(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(l){var k=f(this),j=k.attr("href"),b=f(k.attr("data-target")||j&&j.replace(/.*(?=#[^\s]+$)/,"")),a=b.data("bs.modal")?"toggle":f.extend({remote:!/#/.test(j)&&j},b.data(),k.data());
k.is("a")&&l.preventDefault(),b.one("show.bs.modal",function(c){c.isDefaultPrevented()||b.one("hidden.bs.modal",function(){k.is(":visible")&&k.trigger("focus")
})
}),e.call(b,a,this)
})
}(jQuery),+function(f){function e(a){return this.each(function(){var j=f(this),c=j.data("bs.tooltip"),b="object"==typeof a&&a;
(c||!/destroy|hide/.test(a))&&(c||j.data("bs.tooltip",c=new h(this,b)),"string"==typeof a&&c[a]())
})
}var h=function(d,c){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",d,c)
};
h.VERSION="3.3.4",h.TRANSITION_DURATION=150,h.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},h.prototype.init=function(a,p,o){if(this.enabled=!0,this.type=a,this.$element=f(p),this.options=this.getOptions(o),this.$viewport=this.options.viewport&&f(this.options.viewport.selector||this.options.viewport),this.$element[0] instanceof document.constructor&&!this.options.selector){throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!")
}for(var n=this.options.trigger.split(" "),m=n.length;
m--;
){var l=n[m];
if("click"==l){this.$element.on("click."+this.type,this.options.selector,f.proxy(this.toggle,this))
}else{if("manual"!=l){var k="hover"==l?"mouseenter":"focusin",j="hover"==l?"mouseleave":"focusout";
this.$element.on(k+"."+this.type,this.options.selector,f.proxy(this.enter,this)),this.$element.on(j+"."+this.type,this.options.selector,f.proxy(this.leave,this))
}}}this.options.selector?this._options=f.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()
},h.prototype.getDefaults=function(){return h.DEFAULTS
},h.prototype.getOptions=function(a){return a=f.extend({},this.getDefaults(),this.$element.data(),a),a.delay&&"number"==typeof a.delay&&(a.delay={show:a.delay,hide:a.delay}),a
},h.prototype.getDelegateOptions=function(){var a={},d=this.getDefaults();
return this._options&&f.each(this._options,function(b,c){d[b]!=c&&(a[b]=c)
}),a
},h.prototype.enter=function(a){var d=a instanceof this.constructor?a:f(a.currentTarget).data("bs."+this.type);
return d&&d.$tip&&d.$tip.is(":visible")?void (d.hoverState="in"):(d||(d=new this.constructor(a.currentTarget,this.getDelegateOptions()),f(a.currentTarget).data("bs."+this.type,d)),clearTimeout(d.timeout),d.hoverState="in",d.options.delay&&d.options.delay.show?void (d.timeout=setTimeout(function(){"in"==d.hoverState&&d.show()
},d.options.delay.show)):d.show())
},h.prototype.leave=function(a){var d=a instanceof this.constructor?a:f(a.currentTarget).data("bs."+this.type);
return d||(d=new this.constructor(a.currentTarget,this.getDelegateOptions()),f(a.currentTarget).data("bs."+this.type,d)),clearTimeout(d.timeout),d.hoverState="out",d.options.delay&&d.options.delay.hide?void (d.timeout=setTimeout(function(){"out"==d.hoverState&&d.hide()
},d.options.delay.hide)):d.hide()
},h.prototype.show=function(){var F=f.Event("show.bs."+this.type);
if(this.hasContent()&&this.enabled){this.$element.trigger(F);
var E=f.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);
if(F.isDefaultPrevented()||!E){return
}var D=this,C=this.tip(),B=this.getUID(this.type);
this.setContent(),C.attr("id",B),this.$element.attr("aria-describedby",B),this.options.animation&&C.addClass("fade");
var A="function"==typeof this.options.placement?this.options.placement.call(this,C[0],this.$element[0]):this.options.placement,z=/\s?auto?\s?/i,y=z.test(A);
y&&(A=A.replace(z,"")||"top"),C.detach().css({top:0,left:0,display:"block"}).addClass(A).data("bs."+this.type,this),this.options.container?C.appendTo(this.options.container):C.insertAfter(this.$element);
var x=this.getPosition(),w=C[0].offsetWidth,v=C[0].offsetHeight;
if(y){var u=A,t=this.options.container?f(this.options.container):this.$element.parent(),s=this.getPosition(t);
A="bottom"==A&&x.bottom+v>s.bottom?"top":"top"==A&&x.top-v<s.top?"bottom":"right"==A&&x.right+w>s.width?"left":"left"==A&&x.left-w<s.left?"right":A,C.removeClass(u).addClass(A)
}var c=this.getCalculatedOffset(A,x,w,v);
this.applyPlacement(c,A);
var a=function(){var b=D.hoverState;
D.$element.trigger("shown.bs."+D.type),D.hoverState=null,"out"==b&&D.leave(D)
};
f.support.transition&&this.$tip.hasClass("fade")?C.one("bsTransitionEnd",a).emulateTransitionEnd(h.TRANSITION_DURATION):a()
}},h.prototype.applyPlacement=function(z,y){var x=this.tip(),w=x[0].offsetWidth,v=x[0].offsetHeight,u=parseInt(x.css("margin-top"),10),t=parseInt(x.css("margin-left"),10);
isNaN(u)&&(u=0),isNaN(t)&&(t=0),z.top=z.top+u,z.left=z.left+t,f.offset.setOffset(x[0],f.extend({using:function(b){x.css({top:Math.round(b.top),left:Math.round(b.left)})
}},z),0),x.addClass("in");
var s=x[0].offsetWidth,r=x[0].offsetHeight;
"top"==y&&r!=v&&(z.top=z.top+v-r);
var q=this.getViewportAdjustedDelta(y,z,s,r);
q.left?z.left+=q.left:z.top+=q.top;
var p=/top|bottom/.test(y),o=p?2*q.left-w+s:2*q.top-v+r,a=p?"offsetWidth":"offsetHeight";
x.offset(z),this.replaceArrow(o,x[0][a],p)
},h.prototype.replaceArrow=function(j,d,k){this.arrow().css(k?"left":"top",50*(1-j/d)+"%").css(k?"top":"left","")
},h.prototype.setContent=function(){var d=this.tip(),c=this.getTitle();
d.find(".tooltip-inner")[this.options.html?"html":"text"](c),d.removeClass("fade in top bottom left right")
},h.prototype.hide=function(a){function l(){"in"!=k.hoverState&&j.detach(),k.$element.removeAttr("aria-describedby").trigger("hidden.bs."+k.type),a&&a()
}var k=this,j=f(this.$tip),c=f.Event("hide.bs."+this.type);
return this.$element.trigger(c),c.isDefaultPrevented()?void 0:(j.removeClass("in"),f.support.transition&&j.hasClass("fade")?j.one("bsTransitionEnd",l).emulateTransitionEnd(h.TRANSITION_DURATION):l(),this.hoverState=null,this)
},h.prototype.fixTitle=function(){var b=this.$element;
(b.attr("title")||"string"!=typeof b.attr("data-original-title"))&&b.attr("data-original-title",b.attr("title")||"").attr("title","")
},h.prototype.hasContent=function(){return this.getTitle()
},h.prototype.getPosition=function(a){a=a||this.$element;
var o=a[0],n="BODY"==o.tagName,m=o.getBoundingClientRect();
null==m.width&&(m=f.extend({},m,{width:m.right-m.left,height:m.bottom-m.top}));
var l=n?{top:0,left:0}:a.offset(),k={scroll:n?document.documentElement.scrollTop||document.body.scrollTop:a.scrollTop()},j=n?{width:f(window).width(),height:f(window).height()}:null;
return f.extend({},m,k,j,l)
},h.prototype.getCalculatedOffset=function(k,j,m,l){return"bottom"==k?{top:j.top+j.height,left:j.left+j.width/2-m/2}:"top"==k?{top:j.top-l,left:j.left+j.width/2-m/2}:"left"==k?{top:j.top+j.height/2-l/2,left:j.left-m}:{top:j.top+j.height/2-l/2,left:j.left+j.width}
},h.prototype.getViewportAdjustedDelta=function(v,u,t,s){var r={top:0,left:0};
if(!this.$viewport){return r
}var q=this.options.viewport&&this.options.viewport.padding||0,p=this.getPosition(this.$viewport);
if(/right|left/.test(v)){var o=u.top-q-p.scroll,n=u.top+q-p.scroll+s;
o<p.top?r.top=p.top-o:n>p.top+p.height&&(r.top=p.top+p.height-n)
}else{var m=u.left-q,l=u.left+q+t;
m<p.left?r.left=p.left-m:l>p.width&&(r.left=p.left+p.width-l)
}return r
},h.prototype.getTitle=function(){var j,d=this.$element,k=this.options;
return j=d.attr("data-original-title")||("function"==typeof k.title?k.title.call(d[0]):k.title)
},h.prototype.getUID=function(b){do{b+=~~(1000000*Math.random())
}while(document.getElementById(b));
return b
},h.prototype.tip=function(){return this.$tip=this.$tip||f(this.options.template)
},h.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")
},h.prototype.enable=function(){this.enabled=!0
},h.prototype.disable=function(){this.enabled=!1
},h.prototype.toggleEnabled=function(){this.enabled=!this.enabled
},h.prototype.toggle=function(a){var d=this;
a&&(d=f(a.currentTarget).data("bs."+this.type),d||(d=new this.constructor(a.currentTarget,this.getDelegateOptions()),f(a.currentTarget).data("bs."+this.type,d))),d.tip().hasClass("in")?d.leave(d):d.enter(d)
},h.prototype.destroy=function(){var b=this;
clearTimeout(this.timeout),this.hide(function(){b.$element.off("."+b.type).removeData("bs."+b.type)
})
};
var g=f.fn.tooltip;
f.fn.tooltip=e,f.fn.tooltip.Constructor=h,f.fn.tooltip.noConflict=function(){return f.fn.tooltip=g,this
}
}(jQuery),+function(f){function e(a){return this.each(function(){var j=f(this),c=j.data("bs.popover"),b="object"==typeof a&&a;
(c||!/destroy|hide/.test(a))&&(c||j.data("bs.popover",c=new h(this,b)),"string"==typeof a&&c[a]())
})
}var h=function(d,c){this.init("popover",d,c)
};
if(!f.fn.tooltip){throw new Error("Popover requires tooltip.js")
}h.VERSION="3.3.4",h.DEFAULTS=f.extend({},f.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),h.prototype=f.extend({},f.fn.tooltip.Constructor.prototype),h.prototype.constructor=h,h.prototype.getDefaults=function(){return h.DEFAULTS
},h.prototype.setContent=function(){var j=this.tip(),d=this.getTitle(),k=this.getContent();
j.find(".popover-title")[this.options.html?"html":"text"](d),j.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof k?"html":"append":"text"](k),j.removeClass("fade top bottom left right in"),j.find(".popover-title").html()||j.find(".popover-title").hide()
},h.prototype.hasContent=function(){return this.getTitle()||this.getContent()
},h.prototype.getContent=function(){var d=this.$element,c=this.options;
return d.attr("data-content")||("function"==typeof c.content?c.content.call(d[0]):c.content)
},h.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")
};
var g=f.fn.popover;
f.fn.popover=e,f.fn.popover.Constructor=h,f.fn.popover.noConflict=function(){return f.fn.popover=g,this
}
}(jQuery),+function(f){function e(b,a){this.$body=f(document.body),this.$scrollElement=f(f(b).is(document.body)?window:b),this.options=f.extend({},e.DEFAULTS,a),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",f.proxy(this.process,this)),this.refresh(),this.process()
}function h(a){return this.each(function(){var j=f(this),c=j.data("bs.scrollspy"),b="object"==typeof a&&a;
c||j.data("bs.scrollspy",c=new e(this,b)),"string"==typeof a&&c[a]()
})
}e.VERSION="3.3.4",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)
},e.prototype.refresh=function(){var a=this,k="offset",j=0;
this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),f.isWindow(this.$scrollElement[0])||(k="position",j=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var c=f(this),l=c.data("target")||c.attr("href"),d=/^#./.test(l)&&f(l);
return d&&d.length&&d.is(":visible")&&[[d[k]().top+j,l]]||null
}).sort(function(d,c){return d[0]-c[0]
}).each(function(){a.offsets.push(this[0]),a.targets.push(this[1])
})
},e.prototype.process=function(){var k,j=this.$scrollElement.scrollTop()+this.options.offset,p=this.getScrollHeight(),o=this.options.offset+p-this.$scrollElement.height(),n=this.offsets,m=this.targets,l=this.activeTarget;
if(this.scrollHeight!=p&&this.refresh(),j>=o){return l!=(k=m[m.length-1])&&this.activate(k)
}if(l&&j<n[0]){return this.activeTarget=null,this.clear()
}for(k=n.length;
k--;
){l!=m[k]&&j>=n[k]&&(void 0===n[k+1]||j<n[k+1])&&this.activate(m[k])
}},e.prototype.activate=function(a){this.activeTarget=a,this.clear();
var k=this.selector+'[data-target="'+a+'"],'+this.selector+'[href="'+a+'"]',j=f(k).parents("li").addClass("active");
j.parent(".dropdown-menu").length&&(j=j.closest("li.dropdown").addClass("active")),j.trigger("activate.bs.scrollspy")
},e.prototype.clear=function(){f(this.selector).parentsUntil(this.options.target,".active").removeClass("active")
};
var g=f.fn.scrollspy;
f.fn.scrollspy=h,f.fn.scrollspy.Constructor=e,f.fn.scrollspy.noConflict=function(){return f.fn.scrollspy=g,this
},f(window).on("load.bs.scrollspy.data-api",function(){f('[data-spy="scroll"]').each(function(){var a=f(this);
h.call(a,a.data())
})
})
}(jQuery),+function(g){function f(a){return this.each(function(){var c=g(this),b=c.data("bs.tab");
b||c.data("bs.tab",b=new k(this)),"string"==typeof a&&b[a]()
})
}var k=function(a){this.element=g(a)
};
k.VERSION="3.3.4",k.TRANSITION_DURATION=150,k.prototype.show=function(){var a=this.element,q=a.closest("ul:not(.dropdown-menu)"),p=a.data("target");
if(p||(p=a.attr("href"),p=p&&p.replace(/.*(?=#[^\s]*$)/,"")),!a.parent("li").hasClass("active")){var o=q.find(".active:last a"),n=g.Event("hide.bs.tab",{relatedTarget:a[0]}),m=g.Event("show.bs.tab",{relatedTarget:o[0]});
if(o.trigger(n),a.trigger(m),!m.isDefaultPrevented()&&!n.isDefaultPrevented()){var l=g(p);
this.activate(a.closest("li"),q),this.activate(l,l.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:a[0]}),a.trigger({type:"shown.bs.tab",relatedTarget:o[0]})
})
}}},k.prototype.activate=function(a,o,n){function m(){l.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),a.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),c?(a[0].offsetWidth,a.addClass("in")):a.removeClass("fade"),a.parent(".dropdown-menu").length&&a.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),n&&n()
}var l=o.find("> .active"),c=n&&g.support.transition&&(l.length&&l.hasClass("fade")||!!o.find("> .fade").length);
l.length&&c?l.one("bsTransitionEnd",m).emulateTransitionEnd(k.TRANSITION_DURATION):m(),l.removeClass("in")
};
var j=g.fn.tab;
g.fn.tab=f,g.fn.tab.Constructor=k,g.fn.tab.noConflict=function(){return g.fn.tab=j,this
};
var h=function(a){a.preventDefault(),f.call(g(this),"show")
};
g(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',h).on("click.bs.tab.data-api",'[data-toggle="pill"]',h)
}(jQuery),+function(f){function e(a){return this.each(function(){var j=f(this),c=j.data("bs.affix"),b="object"==typeof a&&a;
c||j.data("bs.affix",c=new h(this,b)),"string"==typeof a&&c[a]()
})
}var h=function(a,c){this.options=f.extend({},h.DEFAULTS,c),this.$target=f(this.options.target).on("scroll.bs.affix.data-api",f.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",f.proxy(this.checkPositionWithEventLoop,this)),this.$element=f(a),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()
};
h.VERSION="3.3.4",h.RESET="affix affix-top affix-bottom",h.DEFAULTS={offset:0,target:window},h.prototype.getState=function(t,s,r,q){var p=this.$target.scrollTop(),o=this.$element.offset(),n=this.$target.height();
if(null!=r&&"top"==this.affixed){return r>p?"top":!1
}if("bottom"==this.affixed){return null!=r?p+this.unpin<=o.top?!1:"bottom":t-q>=p+n?!1:"bottom"
}var m=null==this.affixed,l=m?p:o.top,k=m?n:s;
return null!=r&&r>=p?"top":null!=q&&l+k>=t-q?"bottom":!1
},h.prototype.getPinnedOffset=function(){if(this.pinnedOffset){return this.pinnedOffset
}this.$element.removeClass(h.RESET).addClass("affix");
var d=this.$target.scrollTop(),c=this.$element.offset();
return this.pinnedOffset=c.top-d
},h.prototype.checkPositionWithEventLoop=function(){setTimeout(f.proxy(this.checkPosition,this),1)
},h.prototype.checkPosition=function(){if(this.$element.is(":visible")){var a=this.$element.height(),p=this.options.offset,o=p.top,n=p.bottom,m=f(document.body).height();
"object"!=typeof p&&(n=o=p),"function"==typeof o&&(o=p.top(this.$element)),"function"==typeof n&&(n=p.bottom(this.$element));
var l=this.getState(m,a,o,n);
if(this.affixed!=l){null!=this.unpin&&this.$element.css("top","");
var k="affix"+(l?"-"+l:""),c=f.Event(k+".bs.affix");
if(this.$element.trigger(c),c.isDefaultPrevented()){return
}this.affixed=l,this.unpin="bottom"==l?this.getPinnedOffset():null,this.$element.removeClass(h.RESET).addClass(k).trigger(k.replace("affix","affixed")+".bs.affix")
}"bottom"==l&&this.$element.offset({top:m-a-n})
}};
var g=f.fn.affix;
f.fn.affix=e,f.fn.affix.Constructor=h,f.fn.affix.noConflict=function(){return f.fn.affix=g,this
},f(window).on("load",function(){f('[data-spy="affix"]').each(function(){var b=f(this),a=b.data();
a.offset=a.offset||{},null!=a.offsetBottom&&(a.offset.bottom=a.offsetBottom),null!=a.offsetTop&&(a.offset.top=a.offsetTop),e.call(b,a)
})
})
}(jQuery);
!function(d,c){"object"==typeof exports&&"undefined"!=typeof module?module.exports=c():"function"==typeof define&&define.amd?define(c):d.moment=c()
}(this,function(){function dy(){return eQ.apply(null,arguments)
}function dx(b){eQ=b
}function dw(b){return"[object Array]"===Object.prototype.toString.call(b)
}function dv(b){return b instanceof Date||"[object Date]"===Object.prototype.toString.call(b)
}function du(f,e){var h,g=[];
for(h=0;
h<f.length;
++h){g.push(e(f[h],h))
}return g
}function ds(d,c){return Object.prototype.hasOwnProperty.call(d,c)
}function dq(e,d){for(var f in d){ds(d,f)&&(e[f]=d[f])
}return ds(d,"toString")&&(e.toString=d.toString),ds(d,"valueOf")&&(e.valueOf=d.valueOf),e
}function dp(f,e,h,g){return bu(f,e,h,g,!0).utc()
}function dm(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}
}function dk(b){return null==b._pf&&(b._pf=dm()),b._pf
}function di(d){if(null==d._isValid){var c=dk(d);
d._isValid=!(isNaN(d._d.getTime())||!(c.overflow<0)||c.empty||c.invalidMonth||c.invalidWeekday||c.nullInput||c.invalidFormat||c.userInvalidated),d._strict&&(d._isValid=d._isValid&&0===c.charsLeftOver&&0===c.unusedTokens.length&&void 0===c.bigHour)
}return d._isValid
}function dh(d){var c=dp(NaN);
return null!=d?dq(dk(c),d):dk(c).userInvalidated=!0,c
}function dg(g,f){var k,j,h;
if("undefined"!=typeof f._isAMomentObject&&(g._isAMomentObject=f._isAMomentObject),"undefined"!=typeof f._i&&(g._i=f._i),"undefined"!=typeof f._f&&(g._f=f._f),"undefined"!=typeof f._l&&(g._l=f._l),"undefined"!=typeof f._strict&&(g._strict=f._strict),"undefined"!=typeof f._tzm&&(g._tzm=f._tzm),"undefined"!=typeof f._isUTC&&(g._isUTC=f._isUTC),"undefined"!=typeof f._offset&&(g._offset=f._offset),"undefined"!=typeof f._pf&&(g._pf=dk(f)),"undefined"!=typeof f._locale&&(g._locale=f._locale),dB.length>0){for(k in dB){j=dB[k],h=f[j],"undefined"!=typeof h&&(g[j]=h)
}}return g
}function df(a){dg(this,a),this._d=new Date(null!=a._d?a._d.getTime():NaN),cN===!1&&(cN=!0,dy.updateOffset(this),cN=!1)
}function c9(b){return b instanceof df||null!=b&&null!=b._isAMomentObject
}function c8(b){return 0>b?Math.ceil(b):Math.floor(b)
}function c6(e){var d=+e,f=0;
return 0!==d&&isFinite(d)&&(f=c8(d)),f
}function c5(j,h,o){var n,m=Math.min(j.length,h.length),l=Math.abs(j.length-h.length),k=0;
for(n=0;
m>n;
n++){(o&&j[n]!==h[n]||!o&&c6(j[n])!==c6(h[n]))&&k++
}return k+l
}function c3(){}function c1(b){return b?b.toLowerCase().replace("_","-"):b
}function cZ(h){for(var g,m,l,k,j=0;
j<h.length;
){for(k=c1(h[j]).split("-"),g=k.length,m=c1(h[j+1]),m=m?m.split("-"):null;
g>0;
){if(l=cY(k.slice(0,g).join("-"))){return l
}if(m&&m.length>=g&&c5(k,m,!0)>=g-1){break
}g--
}j++
}return null
}function cY(e){var d=null;
if(!cw[e]&&"undefined"!=typeof module&&module&&module.exports){try{d=es._abbr,require("./locale/"+e),cX(d)
}catch(f){}}return cw[e]
}function cX(e,d){var f;
return e&&(f="undefined"==typeof d?cV(e):cW(e,d),f&&(es=f)),es._abbr
}function cW(d,c){return null!==c?(c.abbr=d,cw[d]=cw[d]||new c3,cw[d].set(c),cX(d),cw[d]):(delete cw[d],null)
}function cV(d){var c;
if(d&&d._locale&&d._locale._abbr&&(d=d._locale._abbr),!d){return es
}if(!dw(d)){if(c=cY(d)){return c
}d=[d]
}return cZ(d)
}function cT(e,d){var f=e.toLowerCase();
cf[f]=cf[f+"s"]=cf[d]=e
}function eq(b){return"string"==typeof b?cf[b]||cf[b.toLowerCase()]:void 0
}function en(f){var e,h,g={};
for(h in f){ds(f,h)&&(e=eq(h),e&&(g[e]=f[h]))
}return g
}function el(a,d){return function(b){return null!=b?(ei(this,a,b),dy.updateOffset(this,d),this):ej(this,a)
}
}function ej(d,c){return d._d["get"+(d._isUTC?"UTC":"")+c]()
}function ei(e,d,f){return e._d["set"+(e._isUTC?"UTC":"")+d](f)
}function eh(e,d){var f;
if("object"==typeof e){for(f in e){this.set(f,e[f])
}}else{if(e=eq(e),"function"==typeof this[e]){return this[e](d)
}}return this
}function ef(h,g,m){var l=""+Math.abs(h),k=g-l.length,j=h>=0;
return(j?m?"+":"":"-")+Math.pow(10,Math.max(0,k)).toString().substr(1)+l
}function d8(g,f,k,j){var h=j;
"string"==typeof j&&(h=function(){return this[j]()
}),g&&(aV[g]=h),f&&(aV[f[0]]=function(){return ef(h.apply(this,arguments),f[1],f[2])
}),k&&(aV[k]=function(){return this.localeData().ordinal(h.apply(this,arguments),g)
})
}function d7(b){return b.match(/\[[\s\S]/)?b.replace(/^\[|\]$/g,""):b.replace(/\\/g,"")
}function d5(f){var e,h,g=f.match(bP);
for(e=0,h=g.length;
h>e;
e++){aV[g[e]]?g[e]=aV[g[e]]:g[e]=d7(g[e])
}return function(b){var a="";
for(e=0;
h>e;
e++){a+=g[e] instanceof Function?g[e].call(b,f):g[e]
}return a
}
}function d3(d,c){return d.isValid()?(c=d1(c,d.localeData()),bh[c]=bh[c]||d5(c),bh[c](d)):d.localeData().invalidDate()
}function d1(f,e){function h(b){return e.longDateFormat(b)||b
}var g=5;
for(by.lastIndex=0;
g>=0&&by.test(f);
){f=f.replace(by,h),by.lastIndex=0,g-=1
}return f
}function d0(b){return"function"==typeof b&&"[object Function]"===Object.prototype.toString.call(b)
}function dZ(e,d,f){cI[e]=d0(d)?d:function(b){return b&&f?f:d
}
}function dY(d,c){return ds(cI,d)?cI[d](c._strict,c._locale):new RegExp(dX(d))
}function dX(b){return b.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(g,f,k,j,h){return f||k||j||h
}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")
}function dW(f,e){var h,g=e;
for("string"==typeof f&&(f=[f]),"number"==typeof e&&(g=function(b,d){d[e]=c6(b)
}),h=0;
h<f.length;
h++){cr[f[h]]=g
}}function dU(d,c){dW(d,function(b,h,g,f){g._w=g._w||{},c(b,g._w,g,f)
})
}function dT(e,d,f){null!=d&&ds(cr,e)&&cr[e](d,f._a,f,e)
}function dR(d,c){return new Date(Date.UTC(d,c+1,0)).getUTCDate()
}function dP(b){return this._months[b.month()]
}function dN(b){return this._monthsShort[b.month()]
}function dM(h,g,m){var l,k,j;
for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),l=0;
12>l;
l++){if(k=dp([2000,l]),m&&!this._longMonthsParse[l]&&(this._longMonthsParse[l]=new RegExp("^"+this.months(k,"").replace(".","")+"$","i"),this._shortMonthsParse[l]=new RegExp("^"+this.monthsShort(k,"").replace(".","")+"$","i")),m||this._monthsParse[l]||(j="^"+this.months(k,"")+"|^"+this.monthsShort(k,""),this._monthsParse[l]=new RegExp(j.replace(".",""),"i")),m&&"MMMM"===g&&this._longMonthsParse[l].test(h)){return l
}if(m&&"MMM"===g&&this._shortMonthsParse[l].test(h)){return l
}if(!m&&this._monthsParse[l].test(h)){return l
}}}function dL(e,d){var f;
return"string"==typeof d&&(d=e.localeData().monthsParse(d),"number"!=typeof d)?e:(f=Math.min(e.date(),dR(e.year(),d)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](d,f),e)
}function dK(a){return null!=a?(dL(this,a),dy.updateOffset(this,!0),this):ej(this,"Month")
}function dJ(){return dR(this.year(),this.month())
}function eN(e){var d,f=e._a;
return f&&-2===dk(e).overflow&&(d=f[bI]<0||f[bI]>11?bI:f[br]<1||f[br]>dR(f[b3],f[bI])?br:f[a5]<0||f[a5]>24||24===f[a5]&&(0!==f[aO]||0!==f[ax]||0!==f[e8])?a5:f[aO]<0||f[aO]>59?aO:f[ax]<0||f[ax]>59?ax:f[e8]<0||f[e8]>999?e8:-1,dk(e)._overflowDayOfYear&&(b3>d||d>br)&&(d=br),dk(e).overflow=d),e
}function dC(a){dy.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)
}function eM(e,d){var f=!0;
return dq(function(){return f&&(dC(e+"\n"+(new Error).stack),f=!1),d.apply(this,arguments)
},d)
}function eg(d,c){dD[d]||(dC(c),dD[d]=!0)
}function dt(g){var f,k,j=g._i,h=cO.exec(j);
if(h){for(dk(g).iso=!0,f=0,k=cx.length;
k>f;
f++){if(cx[f][1].exec(j)){g._f=cx[f][0];
break
}}for(f=0,k=cg.length;
k>f;
f++){if(cg[f][1].exec(j)){g._f+=(h[6]||" ")+cg[f][0];
break
}}j.match(eJ)&&(g._f+="Z"),a1(g)
}else{g._isValid=!1
}}function cL(a){var d=bQ.exec(a._i);
return null!==d?void (a._d=new Date(+d[1])):(dt(a),void (a._isValid===!1&&(delete a._isValid,dy.createFromInputFallback(a))))
}function cu(k,j,q,p,o,n,m){var l=new Date(k,j,q,p,o,n,m);
return 1970>k&&l.setFullYear(k),l
}function b8(d){var c=new Date(Date.UTC.apply(null,arguments));
return 1970>d&&c.setUTCFullYear(d),c
}function bN(b){return bw(b)?366:365
}function bw(b){return b%4===0&&b%100!==0||b%400===0
}function bf(){return bw(this.year())
}function aT(h,g,m){var l,k=m-g,j=m-h.day();
return j>k&&(j-=7),k-7>j&&(j+=7),l=a8(h).add(j,"d"),{week:Math.ceil(l.dayOfYear()/7),year:l.year()}
}function aC(b){return aT(b,this._week.dow,this._week.doy).week
}function ag(){return this._week.dow
}function eW(){return this._week.doy
}function ez(d){var c=this.localeData().week(this);
return null==d?c:this.add(7*(d-c),"d")
}function dI(d){var c=aT(this,1,4).week;
return null==d?c:this.add(7*(d-c),"d")
}function cU(r,q,p,o,n){var m,l=6+n-o,k=b8(r,0,1+l),j=k.getUTCDay();
return n>j&&(j+=7),p=null!=p?1*p:n,m=1+l+7*(q-1)-j+p,{year:m>0?r:r-1,dayOfYear:m>0?m:bN(r-1)+m}
}function cC(d){var c=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/86400000)+1;
return null==d?c:this.add(d-c,"d")
}function cl(e,d,f){return null!=e?e:null!=d?d:f
}function bV(d){var c=new Date;
return d._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]
}function bE(h){var g,m,l,k,j=[];
if(!h._d){for(l=bV(h),h._w&&null==h._a[br]&&null==h._a[bI]&&bn(h),h._dayOfYear&&(k=cl(h._a[b3],l[b3]),h._dayOfYear>bN(k)&&(dk(h)._overflowDayOfYear=!0),m=b8(k,0,h._dayOfYear),h._a[bI]=m.getUTCMonth(),h._a[br]=m.getUTCDate()),g=0;
3>g&&null==h._a[g];
++g){h._a[g]=j[g]=l[g]
}for(;
7>g;
g++){h._a[g]=j[g]=null==h._a[g]?2===g?1:0:h._a[g]
}24===h._a[a5]&&0===h._a[aO]&&0===h._a[ax]&&0===h._a[e8]&&(h._nextDay=!0,h._a[a5]=0),h._d=(h._useUTC?b8:cu).apply(null,j),null!=h._tzm&&h._d.setUTCMinutes(h._d.getUTCMinutes()-h._tzm),h._nextDay&&(h._a[a5]=24)
}}function bn(k){var j,q,p,o,n,m,l;
j=k._w,null!=j.GG||null!=j.W||null!=j.E?(n=1,m=4,q=cl(j.GG,k._a[b3],aT(a8(),1,4).year),p=cl(j.W,1),o=cl(j.E,1)):(n=k._locale._week.dow,m=k._locale._week.doy,q=cl(j.gg,k._a[b3],aT(a8(),n,m).year),p=cl(j.w,1),null!=j.d?(o=j.d,n>o&&++p):o=null!=j.e?j.e+n:n),l=cU(q,p,o,m,n),k._a[b3]=l.year,k._dayOfYear=l.dayOfYear
}function a1(r){if(r._f===dy.ISO_8601){return void dt(r)
}r._a=[],dk(r).empty=!0;
var q,p,o,n,m,l=""+r._i,j=l.length,a=0;
for(o=d1(r._f,r._locale).match(bP)||[],q=0;
q<o.length;
q++){n=o[q],p=(l.match(dY(n,r))||[])[0],p&&(m=l.substr(0,l.indexOf(p)),m.length>0&&dk(r).unusedInput.push(m),l=l.slice(l.indexOf(p)+p.length),a+=p.length),aV[n]?(p?dk(r).empty=!1:dk(r).unusedTokens.push(n),dT(n,p,r)):r._strict&&!p&&dk(r).unusedTokens.push(n)
}dk(r).charsLeftOver=j-a,l.length>0&&dk(r).unusedInput.push(l),dk(r).bigHour===!0&&r._a[a5]<=12&&r._a[a5]>0&&(dk(r).bigHour=void 0),r._a[a5]=aK(r._locale,r._a[a5],r._meridiem),bE(r),eN(r)
}function aK(f,e,h){var g;
return null==h?e:null!=f.meridiemHour?f.meridiemHour(e,h):null!=f.isPM?(g=f.isPM(h),g&&12>e&&(e+=12),g||12!==e||(e=0),e):e
}function ao(h){var g,m,l,k,j;
if(0===h._f.length){return dk(h).invalidFormat=!0,void (h._d=new Date(NaN))
}for(k=0;
k<h._f.length;
k++){j=0,g=dg({},h),null!=h._useUTC&&(g._useUTC=h._useUTC),g._f=h._f[k],a1(g),di(g)&&(j+=dk(g).charsLeftOver,j+=10*dk(g).unusedTokens.length,dk(g).score=j,(null==l||l>j)&&(l=j,m=g))
}dq(h,m||g)
}function e4(d){if(!d._d){var c=en(d._i);
d._a=[c.year,c.month,c.day||c.date,c.hour,c.minute,c.second,c.millisecond],bE(d)
}}function eH(d){var c=new df(eN(b6(d)));
return c._nextDay&&(c.add(1,"d"),c._nextDay=void 0),c
}function b6(d){var c=d._i,f=d._f;
return d._locale=d._locale||cV(d._l),null===c||void 0===f&&""===c?dh({nullInput:!0}):("string"==typeof c&&(d._i=c=d._locale.preparse(c)),c9(c)?new df(eN(c)):(dw(f)?ao(d):f?a1(d):dv(c)?d._d=c:bL(d),d))
}function bL(a){var c=a._i;
void 0===c?a._d=new Date:dv(c)?a._d=new Date(+c):"string"==typeof c?cL(a):dw(c)?(a._a=du(c.slice(0),function(b){return parseInt(b,10)
}),bE(a)):"object"==typeof c?e4(a):"number"==typeof c?a._d=new Date(c):dy.createFromInputFallback(a)
}function bu(h,g,m,l,k){var j={};
return"boolean"==typeof m&&(l=m,m=void 0),j._isAMomentObject=!0,j._useUTC=j._isUTC=k,j._l=m,j._i=h,j._f=g,j._strict=l,eH(j)
}function a8(f,e,h,g){return bu(f,e,h,g,!1)
}function aR(f,c){var h,g;
if(1===c.length&&dw(c[0])&&(c=c[0]),!c.length){return a8()
}for(h=c[0],g=1;
g<c.length;
++g){(!c[g].isValid()||c[g][f](h))&&(h=c[g])
}return h
}function aA(){var b=[].slice.call(arguments,0);
return aR("isBefore",b)
}function fg(){var b=[].slice.call(arguments,0);
return aR("isAfter",b)
}function eU(v){var u=en(v),t=u.year||0,s=u.quarter||0,r=u.month||0,q=u.week||0,p=u.day||0,o=u.hour||0,n=u.minute||0,m=u.second||0,l=u.millisecond||0;
this._milliseconds=+l+1000*m+60000*n+3600000*o,this._days=+p+7*q,this._months=+r+3*s+12*t,this._data={},this._locale=cV(),this._bubble()
}function ex(b){return b instanceof eU
}function dG(d,c){d8(d,0,0,function(){var b=this.utcOffset(),e="+";
return 0>b&&(b=-b,e="-"),e+ef(~~(b/60),2)+c+ef(~~b%60,2)
})
}function cR(g){var f=(g||"").match(eJ)||[],k=f[f.length-1]||[],j=(k+"").match(aj)||["-",0,0],h=+(60*j[1])+c6(j[2]);
return"+"===j[0]?h:-h
}function cA(a,h){var g,d;
return h._isUTC?(g=h.clone(),d=(c9(a)||dv(a)?+a:+a8(a))-+g,g._d.setTime(+g._d+d),dy.updateOffset(g,!1),g):a8(a).local()
}function cj(b){return 15*-Math.round(b._d.getTimezoneOffset()/15)
}function bT(a,h){var g,f=this._offset||0;
return null!=a?("string"==typeof a&&(a=cR(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&h&&(g=cj(this)),this._offset=a,this._isUTC=!0,null!=g&&this.add(g,"m"),f!==a&&(!h||this._changeInProgress?d9(this,cp(a-f,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,dy.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?f:cj(this)
}function bC(d,c){return null!=d?("string"!=typeof d&&(d=-d),this.utcOffset(d,c),this):-this.utcOffset()
}function bl(b){return this.utcOffset(0,b)
}function aZ(b){return this._isUTC&&(this.utcOffset(0,b),this._isUTC=!1,b&&this.subtract(cj(this),"m")),this
}function aI(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(cR(this._i)),this
}function am(b){return b=b?a8(b).utcOffset():0,(this.utcOffset()-b)%60===0
}function e2(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()
}function eF(){if("undefined"!=typeof this._isDSTShifted){return this._isDSTShifted
}var d={};
if(dg(d,this),d=b6(d),d._a){var c=d._isUTC?dp(d._a):a8(d._a);
this._isDSTShifted=this.isValid()&&c5(d._a,c.toArray())>0
}else{this._isDSTShifted=!1
}return this._isDSTShifted
}function dV(){return !this._isUTC
}function c7(){return this._isUTC
}function cG(){return this._isUTC&&0===this._offset
}function cp(j,f){var o,n,m,l=j,k=null;
return ex(j)?l={ms:j._milliseconds,d:j._days,M:j._months}:"number"==typeof j?(l={},f?l[f]=j:l.milliseconds=j):(k=eZ.exec(j))?(o="-"===k[1]?-1:1,l={y:0,d:c6(k[br])*o,h:c6(k[a5])*o,m:c6(k[aO])*o,s:c6(k[ax])*o,ms:c6(k[e8])*o}):(k=eC.exec(j))?(o="-"===k[1]?-1:1,l={y:bZ(k[2],o),M:bZ(k[3],o),d:bZ(k[4],o),h:bZ(k[5],o),m:bZ(k[6],o),s:bZ(k[7],o),w:bZ(k[8],o)}):null==l?l={}:"object"==typeof l&&("from" in l||"to" in l)&&(m=at(a8(l.from),a8(l.to)),l={},l.ms=m.milliseconds,l.M=m.months),n=new eU(l),ex(j)&&ds(j,"_locale")&&(n._locale=j._locale),n
}function bZ(e,d){var f=e&&parseFloat(e.replace(",","."));
return(isNaN(f)?0:f)*d
}function et(e,d){var f={milliseconds:0,months:0};
return f.months=d.month()-e.month()+12*(d.year()-e.year()),e.clone().add(f.months,"M").isAfter(d)&&--f.months,f.milliseconds=+d-+e.clone().add(f.months,"M"),f
}function at(e,d){var f;
return d=cA(d,e),e.isBefore(d)?f=et(e,d):(f=et(d,e),f.milliseconds=-f.milliseconds,f.months=-f.months),f
}function eL(d,c){return function(h,g){var b,a;
return null===g||isNaN(+g)||(eg(c,"moment()."+c+"(period, number) is deprecated. Please use moment()."+c+"(number, period)."),a=h,h=g,g=a),h="string"==typeof h?+h:h,b=cp(h,g),d9(this,b,d),this
}
}function d9(a,o,n,m){var l=o._milliseconds,k=o._days,j=o._months;
m=null==m?!0:m,l&&a._d.setTime(+a._d+l*n),k&&ei(a,"Date",ej(a,"Date")+k*n),j&&dL(a,ej(a,"Month")+j*n),m&&dy.updateOffset(a,k||j)
}function dr(h,g){var m=h||a8(),l=cA(m,this).startOf("day"),k=this.diff(l,"days",!0),j=-6>k?"sameElse":-1>k?"lastWeek":0>k?"lastDay":1>k?"sameDay":2>k?"nextDay":7>k?"nextWeek":"sameElse";
return this.format(g&&g[j]||this.localeData().calendar(j,this,a8(m)))
}function cK(){return new df(this)
}function ct(e,d){var f;
return d=eq("undefined"!=typeof d?d:"millisecond"),"millisecond"===d?(e=c9(e)?e:a8(e),+this>+e):(f=c9(e)?+e:+a8(e),f<+this.clone().startOf(d))
}function b7(e,d){var f;
return d=eq("undefined"!=typeof d?d:"millisecond"),"millisecond"===d?(e=c9(e)?e:a8(e),+e>+this):(f=c9(e)?+e:+a8(e),+this.clone().endOf(d)<f)
}function bM(e,d,f){return this.isAfter(e,f)&&this.isBefore(d,f)
}function bv(e,d){var f;
return d=eq(d||"millisecond"),"millisecond"===d?(e=c9(e)?e:a8(e),+this===+e):(f=+a8(e),+this.clone().startOf(d)<=f&&f<=+this.clone().endOf(d))
}function a9(j,h,o){var n,m,l=cA(j,this),k=60000*(l.utcOffset()-this.utcOffset());
return h=eq(h),"year"===h||"month"===h||"quarter"===h?(m=aS(this,l),"quarter"===h?m/=3:"year"===h&&(m/=12)):(n=this-l,m="second"===h?n/1000:"minute"===h?n/60000:"hour"===h?n/3600000:"day"===h?(n-k)/86400000:"week"===h?(n-k)/604800000:n),o?m:c8(m)
}function aS(h,g){var m,l,k=12*(g.year()-h.year())+(g.month()-h.month()),j=h.clone().add(k,"months");
return 0>g-j?(m=h.clone().add(k-1,"months"),l=(g-j)/(j-m)):(m=h.clone().add(k+1,"months"),l=(g-j)/(m-j)),-(k+l)
}function aB(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
}function af(){var b=this.clone().utc();
return 0<b.year()&&b.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():d3(b,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):d3(b,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
}function eV(a){var d=d3(this,a||dy.defaultFormat);
return this.localeData().postformat(d)
}function ey(d,c){return this.isValid()?cp({to:this,from:d}).locale(this.locale()).humanize(!c):this.localeData().invalidDate()
}function dH(b){return this.from(a8(),b)
}function cS(d,c){return this.isValid()?cp({from:this,to:d}).locale(this.locale()).humanize(!c):this.localeData().invalidDate()
}function cB(b){return this.to(a8(),b)
}function ck(d){var c;
return void 0===d?this._locale._abbr:(c=cV(d),null!=c&&(this._locale=c),this)
}function bU(){return this._locale
}function bD(b){switch(b=eq(b)){case"year":this.month(0);
case"quarter":case"month":this.date(1);
case"week":case"isoWeek":case"day":this.hours(0);
case"hour":this.minutes(0);
case"minute":this.seconds(0);
case"second":this.milliseconds(0)
}return"week"===b&&this.weekday(0),"isoWeek"===b&&this.isoWeekday(1),"quarter"===b&&this.month(3*Math.floor(this.month()/3)),this
}function bm(b){return b=eq(b),void 0===b||"millisecond"===b?this:this.startOf(b).add(1,"isoWeek"===b?"week":b).subtract(1,"ms")
}function a0(){return +this._d-60000*(this._offset||0)
}function aJ(){return Math.floor(+this/1000)
}function an(){return this._offset?new Date(+this):this._d
}function e3(){var b=this;
return[b.year(),b.month(),b.date(),b.hour(),b.minute(),b.second(),b.millisecond()]
}function eG(){var b=this;
return{years:b.year(),months:b.month(),date:b.date(),hours:b.hours(),minutes:b.minutes(),seconds:b.seconds(),milliseconds:b.milliseconds()}
}function b4(){return di(this)
}function bJ(){return dq({},dk(this))
}function bs(){return dk(this).overflow
}function a6(d,c){d8(0,[d,d.length],0,c)
}function aP(e,d,f){return aT(a8([e,11,31+d-f]),d,f).week
}function ay(d){var c=aT(this,this.localeData()._week.dow,this.localeData()._week.doy).year;
return null==d?c:this.add(d-c,"y")
}function e9(d){var c=aT(this,1,4).year;
return null==d?c:this.add(d-c,"y")
}function eS(){return aP(this.year(),1,4)
}function ev(){var b=this.localeData()._week;
return aP(this.year(),b.dow,b.doy)
}function dE(b){return null==b?Math.ceil((this.month()+1)/3):this.month(3*(b-1)+this.month()%3)
}function cP(d,c){return"string"!=typeof d?d:isNaN(d)?(d=c.weekdaysParse(d),"number"==typeof d?d:null):parseInt(d,10)
}function cy(b){return this._weekdays[b.day()]
}function ch(b){return this._weekdaysShort[b.day()]
}function bR(b){return this._weekdaysMin[b.day()]
}function bA(f){var e,h,g;
for(this._weekdaysParse=this._weekdaysParse||[],e=0;
7>e;
e++){if(this._weekdaysParse[e]||(h=a8([2000,1]).day(e),g="^"+this.weekdays(h,"")+"|^"+this.weekdaysShort(h,"")+"|^"+this.weekdaysMin(h,""),this._weekdaysParse[e]=new RegExp(g.replace(".",""),"i")),this._weekdaysParse[e].test(f)){return e
}}}function bj(d){var c=this._isUTC?this._d.getUTCDay():this._d.getDay();
return null!=d?(d=cP(d,this.localeData()),this.add(d-c,"d")):c
}function aX(d){var c=(this.day()+7-this.localeData()._week.dow)%7;
return null==d?c:this.add(d-c,"d")
}function aG(b){return null==b?this.day()||7:this.day(this.day()%7?b:b-7)
}function ak(d,c){d8(d,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),c)
})
}function e0(d,c){return c._meridiemParse
}function eD(b){return"p"===(b+"").toLowerCase().charAt(0)
}function dS(e,d,f){return e>11?f?"pm":"PM":f?"am":"AM"
}function c4(d,c){c[e8]=c6(1000*("0."+d))
}function cF(){return this._isUTC?"UTC":""
}function co(){return this._isUTC?"Coordinated Universal Time":""
}function bY(b){return a8(1000*b)
}function ep(){return a8.apply(null,arguments).parseZone()
}function ar(f,e,h){var g=this._calendar[f];
return"function"==typeof g?g.call(e,h):g
}function eK(e){var d=this._longDateFormat[e],f=this._longDateFormat[e.toUpperCase()];
return d||!f?d:(this._longDateFormat[e]=f.replace(/MMMM|MM|DD|dddd/g,function(b){return b.slice(1)
}),this._longDateFormat[e])
}function d6(){return this._invalidDate
}function dn(b){return this._ordinal.replace("%d",b)
}function cJ(b){return b
}function cs(g,f,k,j){var h=this._relativeTime[k];
return"function"==typeof h?h(g,f,k,j):h.replace(/%d/i,g)
}function b5(e,d){var f=this._relativeTime[e>0?"future":"past"];
return"function"==typeof f?f(d):f.replace(/%s/i,d)
}function bK(e){var d,f;
for(f in e){d=e[f],"function"==typeof d?this[f]=d:this["_"+f]=d
}this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)
}function bt(h,g,m,l){var k=cV(),j=dp().set(l,g);
return k[m](j,h)
}function a7(j,h,o,n,m){if("number"==typeof j&&(h=j,j=void 0),j=j||"",null!=h){return bt(j,h,o,m)
}var l,k=[];
for(l=0;
n>l;
l++){k[l]=bt(j,l,o,m)
}return k
}function aQ(d,c){return a7(d,c,"months",12,"month")
}function az(d,c){return a7(d,c,"monthsShort",12,"month")
}function ff(d,c){return a7(d,c,"weekdays",7,"day")
}function eT(d,c){return a7(d,c,"weekdaysShort",7,"day")
}function ew(d,c){return a7(d,c,"weekdaysMin",7,"day")
}function dF(){var b=this._data;
return this._milliseconds=c0(this._milliseconds),this._days=c0(this._days),this._months=c0(this._months),b.milliseconds=c0(b.milliseconds),b.seconds=c0(b.seconds),b.minutes=c0(b.minutes),b.hours=c0(b.hours),b.months=c0(b.months),b.years=c0(b.years),this
}function cQ(g,f,k,j){var h=cp(f,k);
return g._milliseconds+=j*h._milliseconds,g._days+=j*h._days,g._months+=j*h._months,g._bubble()
}function cz(d,c){return cQ(this,d,c,1)
}function ci(d,c){return cQ(this,d,c,-1)
}function bS(b){return 0>b?Math.floor(b):Math.ceil(b)
}function bB(){var r,q,p,o,n,m=this._milliseconds,l=this._days,k=this._months,j=this._data;
return m>=0&&l>=0&&k>=0||0>=m&&0>=l&&0>=k||(m+=86400000*bS(aY(k)+l),l=0,k=0),j.milliseconds=m%1000,r=c8(m/1000),j.seconds=r%60,q=c8(r/60),j.minutes=q%60,p=c8(q/60),j.hours=p%24,l+=c8(p/24),n=c8(bk(l)),k+=n,l-=bS(aY(n)),o=c8(k/12),k%=12,j.days=l,j.months=k,j.years=o,this
}function bk(b){return 4800*b/146097
}function aY(b){return 146097*b/4800
}function aH(f){var e,h,g=this._milliseconds;
if(f=eq(f),"month"===f||"year"===f){return e=this._days+g/86400000,h=this._months+bk(e),"month"===f?h:h/12
}switch(e=this._days+Math.round(aY(this._months)),f){case"week":return e/7+g/604800000;
case"day":return e+g/86400000;
case"hour":return 24*e+g/3600000;
case"minute":return 1440*e+g/60000;
case"second":return 86400*e+g/1000;
case"millisecond":return Math.floor(86400000*e)+g;
default:throw new Error("Unknown unit "+f)
}}function al(){return this._milliseconds+86400000*this._days+this._months%12*2592000000+31536000000*c6(this._months/12)
}function e1(b){return function(){return this.as(b)
}
}function eE(b){return b=eq(b),this[b+"s"]()
}function b2(b){return function(){return this._data[b]
}
}function bH(){return c8(this.days()/7)
}function bq(g,f,k,j,h){return h.relativeTime(f||1,!!k,g,j)
}function a4(v,u,t){var s=cp(v).abs(),r=av(s.as("s")),q=av(s.as("m")),p=av(s.as("h")),o=av(s.as("d")),n=av(s.as("M")),m=av(s.as("y")),l=r<e6.s&&["s",r]||1===q&&["m"]||q<e6.m&&["mm",q]||1===p&&["h"]||p<e6.h&&["hh",p]||1===o&&["d"]||o<e6.d&&["dd",o]||1===n&&["M"]||n<e6.M&&["MM",n]||1===m&&["y"]||["yy",m];
return l[2]=u,l[3]=+v>0,l[4]=t,bq.apply(null,l)
}function aN(d,c){return void 0===e6[d]?!1:void 0===c?e6[d]:(e6[d]=c,!0)
}function aw(e){var d=this.localeData(),f=a4(this,!e,d);
return e&&(f=d.pastFuture(+this,f)),d.postformat(f)
}function e7(){var z,y,x,w=eP(this._milliseconds)/1000,v=eP(this._days),u=eP(this._months);
z=c8(w/60),y=c8(z/60),w%=60,z%=60,x=c8(u/12),u%=12;
var t=x,s=u,r=v,q=y,p=z,o=w,n=this.asSeconds();
return n?(0>n?"-":"")+"P"+(t?t+"Y":"")+(s?s+"M":"")+(r?r+"D":"")+(q||p||o?"T":"")+(q?q+"H":"")+(p?p+"M":"")+(o?o+"S":""):"P0D"
}var eQ,es,dB=dy.momentProperties=[],cN=!1,cw={},cf={},bP=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,by=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,bh={},aV={},aE=/\d/,ai=/\d\d/,eY=/\d{3}/,eB=/\d{4}/,dQ=/[+-]?\d{6}/,c2=/\d\d?/,cE=/\d{1,3}/,cn=/\d{1,4}/,bX=/[+-]?\d{1,6}/,em=/\d+/,aq=/[+-]?\d+/,eJ=/Z|[+-]\d\d:?\d\d/gi,d4=/[+-]?\d+(\.\d{1,3})?/,dl=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,cI={},cr={},b3=0,bI=1,br=2,a5=3,aO=4,ax=5,e8=6;
d8("M",["MM",2],"Mo",function(){return this.month()+1
}),d8("MMM",0,0,function(b){return this.localeData().monthsShort(this,b)
}),d8("MMMM",0,0,function(b){return this.localeData().months(this,b)
}),cT("month","M"),dZ("M",c2),dZ("MM",c2,ai),dZ("MMM",dl),dZ("MMMM",dl),dW(["M","MM"],function(d,c){c[bI]=c6(d)-1
}),dW(["MMM","MMMM"],function(g,f,k,j){var h=k._locale.monthsParse(g,j,k._strict);
null!=h?f[bI]=h:dk(k).invalidMonth=g
});
var eR="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),eu="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),dD={};
dy.suppressDeprecationWarnings=!1;
var cO=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,cx=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],cg=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],bQ=/^\/?Date\((\-?\d+)/i;
dy.createFromInputFallback=eM("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(b){b._d=new Date(b._i+(b._useUTC?" UTC":""))
}),d8(0,["YY",2],0,function(){return this.year()%100
}),d8(0,["YYYY",4],0,"year"),d8(0,["YYYYY",5],0,"year"),d8(0,["YYYYYY",6,!0],0,"year"),cT("year","y"),dZ("Y",aq),dZ("YY",c2,ai),dZ("YYYY",cn,eB),dZ("YYYYY",bX,dQ),dZ("YYYYYY",bX,dQ),dW(["YYYYY","YYYYYY"],b3),dW("YYYY",function(a,d){d[b3]=2===a.length?dy.parseTwoDigitYear(a):c6(a)
}),dW("YY",function(a,d){d[b3]=dy.parseTwoDigitYear(a)
}),dy.parseTwoDigitYear=function(b){return c6(b)+(c6(b)>68?1900:2000)
};
var bz=el("FullYear",!1);
d8("w",["ww",2],"wo","week"),d8("W",["WW",2],"Wo","isoWeek"),cT("week","w"),cT("isoWeek","W"),dZ("w",c2),dZ("ww",c2,ai),dZ("W",c2),dZ("WW",c2,ai),dU(["w","ww","W","WW"],function(f,e,h,g){e[g.substr(0,1)]=c6(f)
});
var bi={dow:0,doy:6};
d8("DDD",["DDDD",3],"DDDo","dayOfYear"),cT("dayOfYear","DDD"),dZ("DDD",cE),dZ("DDDD",eY),dW(["DDD","DDDD"],function(e,d,f){f._dayOfYear=c6(e)
}),dy.ISO_8601=function(){};
var aW=eM("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var b=a8.apply(null,arguments);
return this>b?this:b
}),aF=eM("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var b=a8.apply(null,arguments);
return b>this?this:b
});
dG("Z",":"),dG("ZZ",""),dZ("Z",eJ),dZ("ZZ",eJ),dW(["Z","ZZ"],function(e,d,f){f._useUTC=!0,f._tzm=cR(e)
});
var aj=/([\+\-]|\d\d)/gi;
dy.updateOffset=function(){};
var eZ=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,eC=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
cp.fn=eU.prototype;
var b0=eL(1,"add"),bF=eL(-1,"subtract");
dy.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";
var bo=eM("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(b){return void 0===b?this.localeData():this.locale(b)
});
d8(0,["gg",2],0,function(){return this.weekYear()%100
}),d8(0,["GG",2],0,function(){return this.isoWeekYear()%100
}),a6("gggg","weekYear"),a6("ggggg","weekYear"),a6("GGGG","isoWeekYear"),a6("GGGGG","isoWeekYear"),cT("weekYear","gg"),cT("isoWeekYear","GG"),dZ("G",aq),dZ("g",aq),dZ("GG",c2,ai),dZ("gg",c2,ai),dZ("GGGG",cn,eB),dZ("gggg",cn,eB),dZ("GGGGG",bX,dQ),dZ("ggggg",bX,dQ),dU(["gggg","ggggg","GGGG","GGGGG"],function(f,e,h,g){e[g.substr(0,2)]=c6(f)
}),dU(["gg","GG"],function(a,h,g,f){h[f]=dy.parseTwoDigitYear(a)
}),d8("Q",0,0,"quarter"),cT("quarter","Q"),dZ("Q",aE),dW("Q",function(d,c){c[bI]=3*(c6(d)-1)
}),d8("D",["DD",2],"Do","date"),cT("date","D"),dZ("D",c2),dZ("DD",c2,ai),dZ("Do",function(d,c){return d?c._ordinalParse:c._ordinalParseLenient
}),dW(["D","DD"],br),dW("Do",function(d,c){c[br]=c6(d.match(c2)[0],10)
});
var a2=el("Date",!0);
d8("d",0,"do","day"),d8("dd",0,0,function(b){return this.localeData().weekdaysMin(this,b)
}),d8("ddd",0,0,function(b){return this.localeData().weekdaysShort(this,b)
}),d8("dddd",0,0,function(b){return this.localeData().weekdays(this,b)
}),d8("e",0,0,"weekday"),d8("E",0,0,"isoWeekday"),cT("day","d"),cT("weekday","e"),cT("isoWeekday","E"),dZ("d",c2),dZ("e",c2),dZ("E",c2),dZ("dd",dl),dZ("ddd",dl),dZ("dddd",dl),dU(["dd","ddd","dddd"],function(f,e,h){var g=h._locale.weekdaysParse(f);
null!=g?e.d=g:dk(h).invalidWeekday=f
}),dU(["d","e","E"],function(f,e,h,g){e[g]=c6(f)
});
var aL="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),au="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),e5="Su_Mo_Tu_We_Th_Fr_Sa".split("_");
d8("H",["HH",2],0,"hour"),d8("h",["hh",2],0,function(){return this.hours()%12||12
}),ak("a",!0),ak("A",!1),cT("hour","h"),dZ("a",e0),dZ("A",e0),dZ("H",c2),dZ("h",c2),dZ("HH",c2,ai),dZ("hh",c2,ai),dW(["H","HH"],a5),dW(["a","A"],function(e,d,f){f._isPm=f._locale.isPM(e),f._meridiem=e
}),dW(["h","hh"],function(e,d,f){d[a5]=c6(e),dk(f).bigHour=!0
});
var eO=/[ap]\.?m?\.?/i,eo=el("Hours",!0);
d8("m",["mm",2],0,"minute"),cT("minute","m"),dZ("m",c2),dZ("mm",c2,ai),dW(["m","mm"],aO);
var dz=el("Minutes",!1);
d8("s",["ss",2],0,"second"),cT("second","s"),dZ("s",c2),dZ("ss",c2,ai),dW(["s","ss"],ax);
var cM=el("Seconds",!1);
d8("S",0,0,function(){return ~~(this.millisecond()/100)
}),d8(0,["SS",2],0,function(){return ~~(this.millisecond()/10)
}),d8(0,["SSS",3],0,"millisecond"),d8(0,["SSSS",4],0,function(){return 10*this.millisecond()
}),d8(0,["SSSSS",5],0,function(){return 100*this.millisecond()
}),d8(0,["SSSSSS",6],0,function(){return 1000*this.millisecond()
}),d8(0,["SSSSSSS",7],0,function(){return 10000*this.millisecond()
}),d8(0,["SSSSSSSS",8],0,function(){return 100000*this.millisecond()
}),d8(0,["SSSSSSSSS",9],0,function(){return 1000000*this.millisecond()
}),cT("millisecond","ms"),dZ("S",cE,aE),dZ("SS",cE,ai),dZ("SSS",cE,eY);
var cv;
for(cv="SSSS";
cv.length<=9;
cv+="S"){dZ(cv,em)
}for(cv="S";
cv.length<=9;
cv+="S"){dW(cv,c4)
}var b9=el("Milliseconds",!1);
d8("z",0,0,"zoneAbbr"),d8("zz",0,0,"zoneName");
var bO=df.prototype;
bO.add=b0,bO.calendar=dr,bO.clone=cK,bO.diff=a9,bO.endOf=bm,bO.format=eV,bO.from=ey,bO.fromNow=dH,bO.to=cS,bO.toNow=cB,bO.get=eh,bO.invalidAt=bs,bO.isAfter=ct,bO.isBefore=b7,bO.isBetween=bM,bO.isSame=bv,bO.isValid=b4,bO.lang=bo,bO.locale=ck,bO.localeData=bU,bO.max=aF,bO.min=aW,bO.parsingFlags=bJ,bO.set=eh,bO.startOf=bD,bO.subtract=bF,bO.toArray=e3,bO.toObject=eG,bO.toDate=an,bO.toISOString=af,bO.toJSON=af,bO.toString=aB,bO.unix=aJ,bO.valueOf=a0,bO.year=bz,bO.isLeapYear=bf,bO.weekYear=ay,bO.isoWeekYear=e9,bO.quarter=bO.quarters=dE,bO.month=dK,bO.daysInMonth=dJ,bO.week=bO.weeks=ez,bO.isoWeek=bO.isoWeeks=dI,bO.weeksInYear=ev,bO.isoWeeksInYear=eS,bO.date=a2,bO.day=bO.days=bj,bO.weekday=aX,bO.isoWeekday=aG,bO.dayOfYear=cC,bO.hour=bO.hours=eo,bO.minute=bO.minutes=dz,bO.second=bO.seconds=cM,bO.millisecond=bO.milliseconds=b9,bO.utcOffset=bT,bO.utc=bl,bO.local=aZ,bO.parseZone=aI,bO.hasAlignedHourOffset=am,bO.isDST=e2,bO.isDSTShifted=eF,bO.isLocal=dV,bO.isUtcOffset=c7,bO.isUtc=cG,bO.isUTC=cG,bO.zoneAbbr=cF,bO.zoneName=co,bO.dates=eM("dates accessor is deprecated. Use date instead.",a2),bO.months=eM("months accessor is deprecated. Use month instead",dK),bO.years=eM("years accessor is deprecated. Use year instead",bz),bO.zone=eM("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",bC);
var bx=bO,bg={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},aU={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},aD="Invalid date",ah="%d",eX=/\d{1,2}/,eA={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dO=c3.prototype;
dO._calendar=bg,dO.calendar=ar,dO._longDateFormat=aU,dO.longDateFormat=eK,dO._invalidDate=aD,dO.invalidDate=d6,dO._ordinal=ah,dO.ordinal=dn,dO._ordinalParse=eX,dO.preparse=cJ,dO.postformat=cJ,dO._relativeTime=eA,dO.relativeTime=cs,dO.pastFuture=b5,dO.set=bK,dO.months=dP,dO._months=eR,dO.monthsShort=dN,dO._monthsShort=eu,dO.monthsParse=dM,dO.week=aC,dO._week=bi,dO.firstDayOfYear=eW,dO.firstDayOfWeek=ag,dO.weekdays=cy,dO._weekdays=aL,dO.weekdaysMin=bR,dO._weekdaysMin=e5,dO.weekdaysShort=ch,dO._weekdaysShort=au,dO.weekdaysParse=bA,dO.isPM=eD,dO._meridiemParse=eO,dO.meridiem=dS,cX("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var d=e%10,f=1===c6(e%100/10)?"th":1===d?"st":2===d?"nd":3===d?"rd":"th";
return e+f
}}),dy.lang=eM("moment.lang is deprecated. Use moment.locale instead.",cX),dy.langData=eM("moment.langData is deprecated. Use moment.localeData instead.",cV);
var c0=Math.abs,cD=e1("ms"),cm=e1("s"),bW=e1("m"),ek=e1("h"),ap=e1("d"),eI=e1("w"),d2=e1("M"),dj=e1("y"),cH=b2("milliseconds"),cq=b2("seconds"),b1=b2("minutes"),bG=b2("hours"),bp=b2("days"),a3=b2("months"),aM=b2("years"),av=Math.round,e6={s:45,m:45,h:22,d:26,M:11},eP=Math.abs,er=eU.prototype;
er.abs=dF,er.add=cz,er.subtract=ci,er.as=aH,er.asMilliseconds=cD,er.asSeconds=cm,er.asMinutes=bW,er.asHours=ek,er.asDays=ap,er.asWeeks=eI,er.asMonths=d2,er.asYears=dj,er.valueOf=al,er._bubble=bB,er.get=eE,er.milliseconds=cH,er.seconds=cq,er.minutes=b1,er.hours=bG,er.days=bp,er.weeks=bH,er.months=a3,er.years=aM,er.humanize=aw,er.toISOString=e7,er.toString=e7,er.toJSON=e7,er.locale=ck,er.localeData=bU,er.toIsoString=eM("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",e7),er.lang=bo,d8("X",0,0,"unix"),d8("x",0,0,"valueOf"),dZ("x",aq),dZ("X",d4),dW("X",function(e,d,f){f._d=new Date(1000*parseFloat(e,10))
}),dW("x",function(e,d,f){f._d=new Date(c6(e))
}),dy.version="2.10.6",dx(a8),dy.fn=bx,dy.min=aA,dy.max=fg,dy.utc=dp,dy.unix=bY,dy.months=aQ,dy.isDate=dv,dy.locale=cX,dy.invalid=dh,dy.duration=cp,dy.isMoment=c9,dy.weekdays=ff,dy.parseZone=ep,dy.localeData=cV,dy.isDuration=ex,dy.monthsShort=az,dy.weekdaysMin=ew,dy.defineLocale=cW,dy.weekdaysShort=eT,dy.normalizeUnits=eq,dy.relativeTimeThreshold=aN;
var dA=dy;
return dA
});
!function(d,c){"function"==typeof define&&define.amd?define(["moment"],c):"object"==typeof exports?module.exports=c(require("moment")):c(d.moment)
}(this,function(af){function ae(b){return b>96?b-87:b>64?b-29:b-48
}function ad(r){var q,p=0,o=r.split("."),n=o[0],m=o[1]||"",l=1,k=0,b=1;
for(45===r.charCodeAt(0)&&(p=1,b=-1),p;
p<n.length;
p++){q=ae(n.charCodeAt(p)),k=60*k+q
}for(p=0;
p<m.length;
p++){l/=60,q=ae(m.charCodeAt(p)),k+=q*l
}return k*b
}function ac(d){for(var c=0;
c<d.length;
c++){d[c]=ad(d[c])
}}function ab(e,d){for(var f=0;
d>f;
f++){e[f]=Math.round((e[f-1]||0)+60000*e[f])
}e[d-1]=1/0
}function aa(f,e){var h,g=[];
for(h=0;
h<e.length;
h++){g[h]=f[e[h]]
}return g
}function Z(e){var d=e.split("|"),k=d[2].split(" "),j=d[3].split(""),f=d[4].split(" ");
return ac(k),ac(j),ac(f),ab(f,j.length),{name:d[0],abbrs:aa(d[1].split(" "),j),offsets:aa(k,j),untils:f}
}function Y(b){b&&this._set(Z(b))
}function X(b){return(b||"").toLowerCase().replace(/\//g,"_")
}function W(f){var e,h,g;
for("string"==typeof f&&(f=[f]),e=0;
e<f.length;
e++){h=f[e].split("|")[0],g=X(h),H[g]=f[e],F[g]=h
}}function V(f,e){f=X(f);
var h,g=H[f];
return g instanceof Y?g:"string"==typeof g?(g=new Y(g),H[f]=g,g):G[f]&&e!==V&&(h=V(G[f],V))?(g=H[f]=new Y,g._set(h),g.name=F[f],g):null
}function U(){var d,c=[];
for(d in F){F.hasOwnProperty(d)&&(H[d]||H[G[d]])&&F[d]&&c.push(F[d])
}return c.sort()
}function T(g){var f,k,j,h;
for("string"==typeof g&&(g=[g]),f=0;
f<g.length;
f++){k=g[f].split("|"),j=X(k[0]),h=X(k[1]),G[j]=h,F[j]=k[0],G[h]=j,F[h]=k[1]
}}function S(b){W(b.zones),T(b.links),M.dataVersion=b.version
}function R(b){return R.didShowError||(R.didShowError=!0,O("moment.tz.zoneExists('"+b+"') has been deprecated in favor of !moment.tz.zone('"+b+"')")),!!V(b)
}function Q(b){return !(!b._a||void 0!==b._tzm)
}function O(b){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(b)
}function M(a){var k=Array.prototype.slice.call(arguments,0,-1),j=arguments[arguments.length-1],h=V(j),g=af.utc.apply(null,k);
return h&&!af.isMoment(a)&&Q(g)&&g.add(h.parse(g),"minutes"),g.tz(j),g
}function K(b){return function(){return this._z?this._z.abbr(this):b.call(this)
}
}function J(b){return function(){return this._z=null,b.apply(this,arguments)
}
}if(void 0!==af.tz){return O("Moment Timezone "+af.tz.version+" was already loaded "+(af.tz.dataVersion?"with data from ":"without any data")+af.tz.dataVersion),af
}var I="0.4.0",H={},G={},F={},E=af.version.split("."),D=+E[0],P=+E[1];
(2>D||2===D&&6>P)&&O("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js "+af.version+". See momentjs.com"),Y.prototype={_set:function(b){this.name=b.name,this.abbrs=b.abbrs,this.untils=b.untils,this.offsets=b.offsets
},_index:function(f){var e,h=+f,g=this.untils;
for(e=0;
e<g.length;
e++){if(h<g[e]){return e
}}},parse:function(r){var q,p,o,n,m=+r,l=this.offsets,k=this.untils,j=k.length-1;
for(n=0;
j>n;
n++){if(q=l[n],p=l[n+1],o=l[n?n-1:n],p>q&&M.moveAmbiguousForward?q=p:q>o&&M.moveInvalidForward&&(q=o),m<k[n]-60000*q){return l[n]
}}return l[j]
},abbr:function(b){return this.abbrs[this._index(b)]
},offset:function(b){return this.offsets[this._index(b)]
}},M.version=I,M.dataVersion="",M._zones=H,M._links=G,M._names=F,M.add=W,M.link=T,M.load=S,M.zone=V,M.zoneExists=R,M.names=U,M.Zone=Y,M.unpack=Z,M.unpackBase60=ad,M.needsOffset=Q,M.moveInvalidForward=!0,M.moveAmbiguousForward=!1;
var N=af.fn;
af.tz=M,af.defaultZone=null,af.updateOffset=function(a,h){var g,f=af.defaultZone;
void 0===a._z&&(f&&Q(a)&&!a._isUTC&&(a._d=af.utc(a._a)._d,a.utc().add(f.parse(a),"minutes")),a._z=f),a._z&&(g=a._z.offset(a),Math.abs(g)<16&&(g/=60),void 0!==a.utcOffset?a.utcOffset(-g,h):a.zone(g,h))
},N.tz=function(a){return a?(this._z=V(a),this._z?af.updateOffset(this):O("Moment Timezone has no data for "+a+". See http://momentjs.com/timezone/docs/#/data-loading/."),this):this._z?this._z.name:void 0
},N.zoneName=K(N.zoneName),N.zoneAbbr=K(N.zoneAbbr),N.utc=J(N.utc),af.tz.setDefault=function(a){return(2>D||2===D&&9>P)&&O("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js "+af.version+"."),af.defaultZone=a?V(a):null,af
};
var L=af.momentProperties;
return"[object Array]"===Object.prototype.toString.call(L)?(L.push("_z"),L.push("_a")):L&&(L._z=null),S({version:"2015d",zones:["Africa/Abidjan|GMT|0|0|","Africa/Addis_Ababa|EAT|-30|0|","Africa/Algiers|CET|-10|0|","Africa/Bangui|WAT|-10|0|","Africa/Blantyre|CAT|-20|0|","Africa/Cairo|EET EEST|-20 -30|010101010|1Cby0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0","Africa/Casablanca|WET WEST|0 -10|01010101010101010101010101010101010101010|1Cco0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uo0 e00 DA0 11A0 rA0 e00 Jc0 WM0 m00 gM0 M00 WM0 jc0 e00 RA0 11A0 dA0 e00 Uo0 11A0 800 gM0 Xc0","Africa/Ceuta|CET CEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Africa/Johannesburg|SAST|-20|0|","Africa/Tripoli|EET CET CEST|-20 -10 -20|0120|1IlA0 TA0 1o00","Africa/Windhoek|WAST WAT|-20 -10|01010101010101010101010|1C1c0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0","America/Adak|HST HDT|a0 90|01010101010101010101010|1BR00 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1BQX0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Anguilla|AST|40|0|","America/Araguaina|BRT BRST|30 20|010|1IdD0 Lz0","America/Argentina/Buenos_Aires|ART|30|0|","America/Asuncion|PYST PYT|30 40|01010101010101010101010|1C430 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0","America/Atikokan|EST|50|0|","America/Bahia|BRT BRST|30 20|010|1FJf0 Rb0","America/Bahia_Banderas|MST CDT CST|70 50 60|01212121212121212121212|1C1l0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0","America/Belem|BRT|30|0|","America/Belize|CST|60|0|","America/Boa_Vista|AMT|40|0|","America/Bogota|COT|50|0|","America/Boise|MST MDT|70 60|01010101010101010101010|1BQV0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Campo_Grande|AMST AMT|30 40|01010101010101010101010|1BIr0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10","America/Cancun|CST CDT EST|60 50 50|010101010102|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0","America/Caracas|VET|4u|0|","America/Cayenne|GFT|30|0|","America/Chicago|CST CDT|60 50|01010101010101010101010|1BQU0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Chihuahua|MST MDT|70 60|01010101010101010101010|1C1l0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0","America/Creston|MST|70|0|","America/Dawson|PST PDT|80 70|01010101010101010101010|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Detroit|EST EDT|50 40|01010101010101010101010|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Eirunepe|AMT ACT|40 50|01|1KLE0","America/Glace_Bay|AST ADT|40 30|01010101010101010101010|1BQS0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Godthab|WGT WGST|30 20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","America/Goose_Bay|AST ADT|40 30|01010101010101010101010|1BQQ1 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Grand_Turk|EST EDT AST|50 40 40|0101010101012|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Guayaquil|ECT|50|0|","America/Guyana|GYT|40|0|","America/Havana|CST CDT|50 40|01010101010101010101010|1BQR0 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0","America/La_Paz|BOT|40|0|","America/Lima|PET|50|0|","America/Merida|CST CDT|60 50|01010101010101010101010|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0","America/Metlakatla|PST|80|0|","America/Miquelon|PMST PMDT|30 20|01010101010101010101010|1BQR0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Montevideo|UYST UYT|20 30|01010101010101010101010|1BQQ0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10","America/Noronha|FNT|20|0|","America/North_Dakota/Beulah|MST MDT CST CDT|70 60 60 50|01232323232323232323232|1BQV0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Paramaribo|SRT|30|0|","America/Port-au-Prince|EST EDT|50 40|0101010101010101010|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Santa_Isabel|PST PDT|80 70|01010101010101010101010|1C1m0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0","America/Santiago|CLST CLT CLT|30 40 30|010101010102|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0","America/Sao_Paulo|BRST BRT|20 30|01010101010101010101010|1BIq0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10","America/Scoresbysund|EGT EGST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1BQPv 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","Antarctica/Casey|CAST AWST|-b0 -80|0101|1BN30 40P0 KL0","Antarctica/Davis|DAVT DAVT|-50 -70|0101|1BPw0 3Wn0 KN0","Antarctica/DumontDUrville|DDUT|-a0|0|","Antarctica/Macquarie|AEDT MIST|-b0 -b0|01|1C140","Antarctica/Mawson|MAWT|-50|0|","Antarctica/McMurdo|NZDT NZST|-d0 -c0|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00","Antarctica/Rothera|ROTT|30|0|","Antarctica/Syowa|SYOT|-30|0|","Antarctica/Troll|UTC CEST|0 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Antarctica/Vostok|VOST|-60|0|","Asia/Aden|AST|-30|0|","Asia/Almaty|ALMT|-60|0|","Asia/Amman|EET EEST|-20 -30|010101010101010101010|1BVy0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0","Asia/Anadyr|ANAT ANAST ANAT|-c0 -c0 -b0|0120|1BWe0 1qN0 WM0","Asia/Aqtau|AQTT|-50|0|","Asia/Ashgabat|TMT|-50|0|","Asia/Baku|AZT AZST|-40 -50|01010101010101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Asia/Bangkok|ICT|-70|0|","Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1BWm0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0","Asia/Bishkek|KGT|-60|0|","Asia/Brunei|BNT|-80|0|","Asia/Calcutta|IST|-5u|0|","Asia/Chita|YAKT YAKST YAKT IRKT|-90 -a0 -a0 -80|01023|1BWh0 1qM0 WM0 8Hz0","Asia/Choibalsan|CHOT CHOST|-80 -90|0101010101010|1O8G0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0","Asia/Chongqing|CST|-80|0|","Asia/Dacca|BDT|-60|0|","Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1C0m0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0","Asia/Dili|TLT|-90|0|","Asia/Dubai|GST|-40|0|","Asia/Dushanbe|TJT|-50|0|","Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1BVW1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0","Asia/Hebron|EET EEST|-20 -30|0101010101010101010101010|1BVy0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0","Asia/Hong_Kong|HKT|-80|0|","Asia/Hovd|HOVT HOVST|-70 -80|0101010101010|1O8H0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0","Asia/Irkutsk|IRKT IRKST IRKT|-80 -90 -90|01020|1BWi0 1qM0 WM0 8Hz0","Asia/Istanbul|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Asia/Jakarta|WIB|-70|0|","Asia/Jayapura|WIT|-90|0|","Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1BVA0 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0","Asia/Kabul|AFT|-4u|0|","Asia/Kamchatka|PETT PETST PETT|-c0 -c0 -b0|0120|1BWe0 1qN0 WM0","Asia/Karachi|PKT|-50|0|","Asia/Kashgar|XJT|-60|0|","Asia/Kathmandu|NPT|-5J|0|","Asia/Khandyga|VLAT VLAST VLAT YAKT YAKT|-a0 -b0 -b0 -a0 -90|010234|1BWg0 1qM0 WM0 17V0 7zD0","Asia/Krasnoyarsk|KRAT KRAST KRAT|-70 -80 -80|01020|1BWj0 1qM0 WM0 8Hz0","Asia/Kuala_Lumpur|MYT|-80|0|","Asia/Magadan|MAGT MAGST MAGT MAGT|-b0 -c0 -c0 -a0|01023|1BWf0 1qM0 WM0 8Hz0","Asia/Makassar|WITA|-80|0|","Asia/Manila|PHT|-80|0|","Asia/Nicosia|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Asia/Novokuznetsk|KRAT NOVST NOVT NOVT|-70 -70 -60 -70|01230|1BWj0 1qN0 WM0 8Hz0","Asia/Novosibirsk|NOVT NOVST NOVT|-60 -70 -70|01020|1BWk0 1qM0 WM0 8Hz0","Asia/Omsk|OMST OMSST OMST|-60 -70 -70|01020|1BWk0 1qM0 WM0 8Hz0","Asia/Oral|ORAT|-50|0|","Asia/Pyongyang|KST|-90|0|","Asia/Qyzylorda|QYZT|-60|0|","Asia/Rangoon|MMT|-6u|0|","Asia/Sakhalin|SAKT SAKST SAKT|-a0 -b0 -b0|01020|1BWg0 1qM0 WM0 8Hz0","Asia/Samarkand|UZT|-50|0|","Asia/Singapore|SGT|-80|0|","Asia/Srednekolymsk|MAGT MAGST MAGT SRET|-b0 -c0 -c0 -b0|01023|1BWf0 1qM0 WM0 8Hz0","Asia/Tbilisi|GET|-40|0|","Asia/Tehran|IRST IRDT|-3u -4u|01010101010101010101010|1BTUu 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0","Asia/Thimbu|BTT|-60|0|","Asia/Tokyo|JST|-90|0|","Asia/Ulaanbaatar|ULAT ULAST|-80 -90|0101010101010|1O8G0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0","Asia/Ust-Nera|MAGT MAGST MAGT VLAT VLAT|-b0 -c0 -c0 -b0 -a0|010234|1BWf0 1qM0 WM0 17V0 7zD0","Asia/Vladivostok|VLAT VLAST VLAT|-a0 -b0 -b0|01020|1BWg0 1qM0 WM0 8Hz0","Asia/Yakutsk|YAKT YAKST YAKT|-90 -a0 -a0|01020|1BWh0 1qM0 WM0 8Hz0","Asia/Yekaterinburg|YEKT YEKST YEKT|-50 -60 -60|01020|1BWl0 1qM0 WM0 8Hz0","Asia/Yerevan|AMT AMST|-40 -50|01010|1BWm0 1qM0 WM0 1qM0","Atlantic/Azores|AZOT AZOST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Atlantic/Canary|WET WEST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Atlantic/Cape_Verde|CVT|10|0|","Atlantic/South_Georgia|GST|20|0|","Atlantic/Stanley|FKST FKT|30 40|010|1C6R0 U10","Australia/ACT|AEDT AEST|-b0 -a0|01010101010101010101010|1C140 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0","Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1C14u 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0","Australia/Brisbane|AEST|-a0|0|","Australia/Darwin|ACST|-9u|0|","Australia/Eucla|ACWST|-8J|0|","Australia/LHI|LHDT LHST|-b0 -au|01010101010101010101010|1C130 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu","Australia/Perth|AWST|-80|0|","Chile/EasterIsland|EASST EAST EAST|50 60 50|010101010102|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0","Eire|GMT IST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Etc/GMT+1|GMT+1|10|0|","Etc/GMT+10|GMT+10|a0|0|","Etc/GMT+11|GMT+11|b0|0|","Etc/GMT+12|GMT+12|c0|0|","Etc/GMT+2|GMT+2|20|0|","Etc/GMT+3|GMT+3|30|0|","Etc/GMT+4|GMT+4|40|0|","Etc/GMT+5|GMT+5|50|0|","Etc/GMT+6|GMT+6|60|0|","Etc/GMT+7|GMT+7|70|0|","Etc/GMT+8|GMT+8|80|0|","Etc/GMT+9|GMT+9|90|0|","Etc/GMT-1|GMT-1|-10|0|","Etc/GMT-10|GMT-10|-a0|0|","Etc/GMT-11|GMT-11|-b0|0|","Etc/GMT-12|GMT-12|-c0|0|","Etc/GMT-13|GMT-13|-d0|0|","Etc/GMT-14|GMT-14|-e0|0|","Etc/GMT-2|GMT-2|-20|0|","Etc/GMT-3|GMT-3|-30|0|","Etc/GMT-4|GMT-4|-40|0|","Etc/GMT-5|GMT-5|-50|0|","Etc/GMT-6|GMT-6|-60|0|","Etc/GMT-7|GMT-7|-70|0|","Etc/GMT-8|GMT-8|-80|0|","Etc/GMT-9|GMT-9|-90|0|","Etc/UCT|UCT|0|0|","Etc/UTC|UTC|0|0|","Europe/Belfast|GMT BST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Europe/Kaliningrad|EET EEST FET|-20 -30 -30|01020|1BWo0 1qM0 WM0 8Hz0","Europe/Minsk|EET EEST FET MSK|-20 -30 -30 -30|01023|1BWo0 1qM0 WM0 8Hy0","Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0","Europe/Samara|SAMT SAMST SAMT|-40 -40 -30|0120|1BWm0 1qN0 WM0","Europe/Simferopol|EET EEST MSK MSK|-20 -30 -40 -30|01010101023|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0","HST|HST|a0|0|","Indian/Chagos|IOT|-60|0|","Indian/Christmas|CXT|-70|0|","Indian/Cocos|CCT|-6u|0|","Indian/Kerguelen|TFT|-50|0|","Indian/Mahe|SCT|-40|0|","Indian/Maldives|MVT|-50|0|","Indian/Mauritius|MUT|-40|0|","Indian/Reunion|RET|-40|0|","Kwajalein|MHT|-c0|0|","MET|MET MEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","NZ-CHAT|CHADT CHAST|-dJ -cJ|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00","Pacific/Apia|SST SDT WSDT WSST|b0 a0 -e0 -d0|01012323232323232323232|1Dbn0 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00","Pacific/Bougainville|PGT BST|-a0 -b0|01|1NwE0","Pacific/Chuuk|CHUT|-a0|0|","Pacific/Efate|VUT|-b0|0|","Pacific/Enderbury|PHOT|-d0|0|","Pacific/Fakaofo|TKT TKT|b0 -d0|01|1Gfn0","Pacific/Fiji|FJST FJT|-d0 -c0|01010101010101010101010|1BWe0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 xA0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1SM0","Pacific/Funafuti|TVT|-c0|0|","Pacific/Galapagos|GALT|60|0|","Pacific/Gambier|GAMT|90|0|","Pacific/Guadalcanal|SBT|-b0|0|","Pacific/Guam|ChST|-a0|0|","Pacific/Kiritimati|LINT|-e0|0|","Pacific/Kosrae|KOST|-b0|0|","Pacific/Marquesas|MART|9u|0|","Pacific/Midway|SST|b0|0|","Pacific/Nauru|NRT|-c0|0|","Pacific/Niue|NUT|b0|0|","Pacific/Norfolk|NFT|-bu|0|","Pacific/Noumea|NCT|-b0|0|","Pacific/Palau|PWT|-90|0|","Pacific/Pohnpei|PONT|-b0|0|","Pacific/Port_Moresby|PGT|-a0|0|","Pacific/Rarotonga|CKT|a0|0|","Pacific/Tahiti|TAHT|a0|0|","Pacific/Tarawa|GILT|-c0|0|","Pacific/Tongatapu|TOT|-d0|0|","Pacific/Wake|WAKT|-c0|0|","Pacific/Wallis|WFT|-c0|0|"],links:["Africa/Abidjan|Africa/Accra","Africa/Abidjan|Africa/Bamako","Africa/Abidjan|Africa/Banjul","Africa/Abidjan|Africa/Bissau","Africa/Abidjan|Africa/Conakry","Africa/Abidjan|Africa/Dakar","Africa/Abidjan|Africa/Freetown","Africa/Abidjan|Africa/Lome","Africa/Abidjan|Africa/Monrovia","Africa/Abidjan|Africa/Nouakchott","Africa/Abidjan|Africa/Ouagadougou","Africa/Abidjan|Africa/Sao_Tome","Africa/Abidjan|Africa/Timbuktu","Africa/Abidjan|America/Danmarkshavn","Africa/Abidjan|Atlantic/Reykjavik","Africa/Abidjan|Atlantic/St_Helena","Africa/Abidjan|Etc/GMT","Africa/Abidjan|Etc/GMT+0","Africa/Abidjan|Etc/GMT-0","Africa/Abidjan|Etc/GMT0","Africa/Abidjan|Etc/Greenwich","Africa/Abidjan|GMT","Africa/Abidjan|GMT+0","Africa/Abidjan|GMT-0","Africa/Abidjan|GMT0","Africa/Abidjan|Greenwich","Africa/Abidjan|Iceland","Africa/Addis_Ababa|Africa/Asmara","Africa/Addis_Ababa|Africa/Asmera","Africa/Addis_Ababa|Africa/Dar_es_Salaam","Africa/Addis_Ababa|Africa/Djibouti","Africa/Addis_Ababa|Africa/Juba","Africa/Addis_Ababa|Africa/Kampala","Africa/Addis_Ababa|Africa/Khartoum","Africa/Addis_Ababa|Africa/Mogadishu","Africa/Addis_Ababa|Africa/Nairobi","Africa/Addis_Ababa|Indian/Antananarivo","Africa/Addis_Ababa|Indian/Comoro","Africa/Addis_Ababa|Indian/Mayotte","Africa/Algiers|Africa/Tunis","Africa/Bangui|Africa/Brazzaville","Africa/Bangui|Africa/Douala","Africa/Bangui|Africa/Kinshasa","Africa/Bangui|Africa/Lagos","Africa/Bangui|Africa/Libreville","Africa/Bangui|Africa/Luanda","Africa/Bangui|Africa/Malabo","Africa/Bangui|Africa/Ndjamena","Africa/Bangui|Africa/Niamey","Africa/Bangui|Africa/Porto-Novo","Africa/Blantyre|Africa/Bujumbura","Africa/Blantyre|Africa/Gaborone","Africa/Blantyre|Africa/Harare","Africa/Blantyre|Africa/Kigali","Africa/Blantyre|Africa/Lubumbashi","Africa/Blantyre|Africa/Lusaka","Africa/Blantyre|Africa/Maputo","Africa/Cairo|Egypt","Africa/Casablanca|Africa/El_Aaiun","Africa/Ceuta|Arctic/Longyearbyen","Africa/Ceuta|Atlantic/Jan_Mayen","Africa/Ceuta|CET","Africa/Ceuta|Europe/Amsterdam","Africa/Ceuta|Europe/Andorra","Africa/Ceuta|Europe/Belgrade","Africa/Ceuta|Europe/Berlin","Africa/Ceuta|Europe/Bratislava","Africa/Ceuta|Europe/Brussels","Africa/Ceuta|Europe/Budapest","Africa/Ceuta|Europe/Busingen","Africa/Ceuta|Europe/Copenhagen","Africa/Ceuta|Europe/Gibraltar","Africa/Ceuta|Europe/Ljubljana","Africa/Ceuta|Europe/Luxembourg","Africa/Ceuta|Europe/Madrid","Africa/Ceuta|Europe/Malta","Africa/Ceuta|Europe/Monaco","Africa/Ceuta|Europe/Oslo","Africa/Ceuta|Europe/Paris","Africa/Ceuta|Europe/Podgorica","Africa/Ceuta|Europe/Prague","Africa/Ceuta|Europe/Rome","Africa/Ceuta|Europe/San_Marino","Africa/Ceuta|Europe/Sarajevo","Africa/Ceuta|Europe/Skopje","Africa/Ceuta|Europe/Stockholm","Africa/Ceuta|Europe/Tirane","Africa/Ceuta|Europe/Vaduz","Africa/Ceuta|Europe/Vatican","Africa/Ceuta|Europe/Vienna","Africa/Ceuta|Europe/Warsaw","Africa/Ceuta|Europe/Zagreb","Africa/Ceuta|Europe/Zurich","Africa/Ceuta|Poland","Africa/Johannesburg|Africa/Maseru","Africa/Johannesburg|Africa/Mbabane","Africa/Tripoli|Libya","America/Adak|America/Atka","America/Adak|US/Aleutian","America/Anchorage|America/Juneau","America/Anchorage|America/Nome","America/Anchorage|America/Sitka","America/Anchorage|America/Yakutat","America/Anchorage|US/Alaska","America/Anguilla|America/Antigua","America/Anguilla|America/Aruba","America/Anguilla|America/Barbados","America/Anguilla|America/Blanc-Sablon","America/Anguilla|America/Curacao","America/Anguilla|America/Dominica","America/Anguilla|America/Grenada","America/Anguilla|America/Guadeloupe","America/Anguilla|America/Kralendijk","America/Anguilla|America/Lower_Princes","America/Anguilla|America/Marigot","America/Anguilla|America/Martinique","America/Anguilla|America/Montserrat","America/Anguilla|America/Port_of_Spain","America/Anguilla|America/Puerto_Rico","America/Anguilla|America/Santo_Domingo","America/Anguilla|America/St_Barthelemy","America/Anguilla|America/St_Kitts","America/Anguilla|America/St_Lucia","America/Anguilla|America/St_Thomas","America/Anguilla|America/St_Vincent","America/Anguilla|America/Tortola","America/Anguilla|America/Virgin","America/Argentina/Buenos_Aires|America/Argentina/Catamarca","America/Argentina/Buenos_Aires|America/Argentina/ComodRivadavia","America/Argentina/Buenos_Aires|America/Argentina/Cordoba","America/Argentina/Buenos_Aires|America/Argentina/Jujuy","America/Argentina/Buenos_Aires|America/Argentina/La_Rioja","America/Argentina/Buenos_Aires|America/Argentina/Mendoza","America/Argentina/Buenos_Aires|America/Argentina/Rio_Gallegos","America/Argentina/Buenos_Aires|America/Argentina/Salta","America/Argentina/Buenos_Aires|America/Argentina/San_Juan","America/Argentina/Buenos_Aires|America/Argentina/San_Luis","America/Argentina/Buenos_Aires|America/Argentina/Tucuman","America/Argentina/Buenos_Aires|America/Argentina/Ushuaia","America/Argentina/Buenos_Aires|America/Buenos_Aires","America/Argentina/Buenos_Aires|America/Catamarca","America/Argentina/Buenos_Aires|America/Cordoba","America/Argentina/Buenos_Aires|America/Jujuy","America/Argentina/Buenos_Aires|America/Mendoza","America/Argentina/Buenos_Aires|America/Rosario","America/Atikokan|America/Cayman","America/Atikokan|America/Coral_Harbour","America/Atikokan|America/Jamaica","America/Atikokan|America/Panama","America/Atikokan|EST","America/Atikokan|Jamaica","America/Belem|America/Fortaleza","America/Belem|America/Maceio","America/Belem|America/Recife","America/Belem|America/Santarem","America/Belize|America/Costa_Rica","America/Belize|America/El_Salvador","America/Belize|America/Guatemala","America/Belize|America/Managua","America/Belize|America/Regina","America/Belize|America/Swift_Current","America/Belize|America/Tegucigalpa","America/Belize|Canada/East-Saskatchewan","America/Belize|Canada/Saskatchewan","America/Boa_Vista|America/Manaus","America/Boa_Vista|America/Porto_Velho","America/Boa_Vista|Brazil/West","America/Boise|America/Cambridge_Bay","America/Boise|America/Denver","America/Boise|America/Edmonton","America/Boise|America/Inuvik","America/Boise|America/Ojinaga","America/Boise|America/Shiprock","America/Boise|America/Yellowknife","America/Boise|Canada/Mountain","America/Boise|MST7MDT","America/Boise|Navajo","America/Boise|US/Mountain","America/Campo_Grande|America/Cuiaba","America/Chicago|America/Indiana/Knox","America/Chicago|America/Indiana/Tell_City","America/Chicago|America/Knox_IN","America/Chicago|America/Matamoros","America/Chicago|America/Menominee","America/Chicago|America/North_Dakota/Center","America/Chicago|America/North_Dakota/New_Salem","America/Chicago|America/Rainy_River","America/Chicago|America/Rankin_Inlet","America/Chicago|America/Resolute","America/Chicago|America/Winnipeg","America/Chicago|CST6CDT","America/Chicago|Canada/Central","America/Chicago|US/Central","America/Chicago|US/Indiana-Starke","America/Chihuahua|America/Mazatlan","America/Chihuahua|Mexico/BajaSur","America/Creston|America/Dawson_Creek","America/Creston|America/Hermosillo","America/Creston|America/Phoenix","America/Creston|MST","America/Creston|US/Arizona","America/Dawson|America/Ensenada","America/Dawson|America/Los_Angeles","America/Dawson|America/Tijuana","America/Dawson|America/Vancouver","America/Dawson|America/Whitehorse","America/Dawson|Canada/Pacific","America/Dawson|Canada/Yukon","America/Dawson|Mexico/BajaNorte","America/Dawson|PST8PDT","America/Dawson|US/Pacific","America/Dawson|US/Pacific-New","America/Detroit|America/Fort_Wayne","America/Detroit|America/Indiana/Indianapolis","America/Detroit|America/Indiana/Marengo","America/Detroit|America/Indiana/Petersburg","America/Detroit|America/Indiana/Vevay","America/Detroit|America/Indiana/Vincennes","America/Detroit|America/Indiana/Winamac","America/Detroit|America/Indianapolis","America/Detroit|America/Iqaluit","America/Detroit|America/Kentucky/Louisville","America/Detroit|America/Kentucky/Monticello","America/Detroit|America/Louisville","America/Detroit|America/Montreal","America/Detroit|America/Nassau","America/Detroit|America/New_York","America/Detroit|America/Nipigon","America/Detroit|America/Pangnirtung","America/Detroit|America/Thunder_Bay","America/Detroit|America/Toronto","America/Detroit|Canada/Eastern","America/Detroit|EST5EDT","America/Detroit|US/East-Indiana","America/Detroit|US/Eastern","America/Detroit|US/Michigan","America/Eirunepe|America/Porto_Acre","America/Eirunepe|America/Rio_Branco","America/Eirunepe|Brazil/Acre","America/Glace_Bay|America/Halifax","America/Glace_Bay|America/Moncton","America/Glace_Bay|America/Thule","America/Glace_Bay|Atlantic/Bermuda","America/Glace_Bay|Canada/Atlantic","America/Havana|Cuba","America/Merida|America/Mexico_City","America/Merida|America/Monterrey","America/Merida|Mexico/General","America/Metlakatla|Pacific/Pitcairn","America/Noronha|Brazil/DeNoronha","America/Santiago|Antarctica/Palmer","America/Santiago|Chile/Continental","America/Sao_Paulo|Brazil/East","America/St_Johns|Canada/Newfoundland","Antarctica/McMurdo|Antarctica/South_Pole","Antarctica/McMurdo|NZ","Antarctica/McMurdo|Pacific/Auckland","Asia/Aden|Asia/Baghdad","Asia/Aden|Asia/Bahrain","Asia/Aden|Asia/Kuwait","Asia/Aden|Asia/Qatar","Asia/Aden|Asia/Riyadh","Asia/Aqtau|Asia/Aqtobe","Asia/Ashgabat|Asia/Ashkhabad","Asia/Bangkok|Asia/Ho_Chi_Minh","Asia/Bangkok|Asia/Phnom_Penh","Asia/Bangkok|Asia/Saigon","Asia/Bangkok|Asia/Vientiane","Asia/Calcutta|Asia/Colombo","Asia/Calcutta|Asia/Kolkata","Asia/Chongqing|Asia/Chungking","Asia/Chongqing|Asia/Harbin","Asia/Chongqing|Asia/Macao","Asia/Chongqing|Asia/Macau","Asia/Chongqing|Asia/Shanghai","Asia/Chongqing|Asia/Taipei","Asia/Chongqing|PRC","Asia/Chongqing|ROC","Asia/Dacca|Asia/Dhaka","Asia/Dubai|Asia/Muscat","Asia/Hong_Kong|Hongkong","Asia/Istanbul|Europe/Istanbul","Asia/Istanbul|Turkey","Asia/Jakarta|Asia/Pontianak","Asia/Jerusalem|Asia/Tel_Aviv","Asia/Jerusalem|Israel","Asia/Kashgar|Asia/Urumqi","Asia/Kathmandu|Asia/Katmandu","Asia/Kuala_Lumpur|Asia/Kuching","Asia/Makassar|Asia/Ujung_Pandang","Asia/Nicosia|EET","Asia/Nicosia|Europe/Athens","Asia/Nicosia|Europe/Bucharest","Asia/Nicosia|Europe/Chisinau","Asia/Nicosia|Europe/Helsinki","Asia/Nicosia|Europe/Kiev","Asia/Nicosia|Europe/Mariehamn","Asia/Nicosia|Europe/Nicosia","Asia/Nicosia|Europe/Riga","Asia/Nicosia|Europe/Sofia","Asia/Nicosia|Europe/Tallinn","Asia/Nicosia|Europe/Tiraspol","Asia/Nicosia|Europe/Uzhgorod","Asia/Nicosia|Europe/Vilnius","Asia/Nicosia|Europe/Zaporozhye","Asia/Pyongyang|Asia/Seoul","Asia/Pyongyang|ROK","Asia/Samarkand|Asia/Tashkent","Asia/Singapore|Singapore","Asia/Tehran|Iran","Asia/Thimbu|Asia/Thimphu","Asia/Tokyo|Japan","Asia/Ulaanbaatar|Asia/Ulan_Bator","Atlantic/Canary|Atlantic/Faeroe","Atlantic/Canary|Atlantic/Faroe","Atlantic/Canary|Atlantic/Madeira","Atlantic/Canary|Europe/Lisbon","Atlantic/Canary|Portugal","Atlantic/Canary|WET","Australia/ACT|Australia/Canberra","Australia/ACT|Australia/Currie","Australia/ACT|Australia/Hobart","Australia/ACT|Australia/Melbourne","Australia/ACT|Australia/NSW","Australia/ACT|Australia/Sydney","Australia/ACT|Australia/Tasmania","Australia/ACT|Australia/Victoria","Australia/Adelaide|Australia/Broken_Hill","Australia/Adelaide|Australia/South","Australia/Adelaide|Australia/Yancowinna","Australia/Brisbane|Australia/Lindeman","Australia/Brisbane|Australia/Queensland","Australia/Darwin|Australia/North","Australia/LHI|Australia/Lord_Howe","Australia/Perth|Australia/West","Chile/EasterIsland|Pacific/Easter","Eire|Europe/Dublin","Etc/UCT|UCT","Etc/UTC|Etc/Universal","Etc/UTC|Etc/Zulu","Etc/UTC|UTC","Etc/UTC|Universal","Etc/UTC|Zulu","Europe/Belfast|Europe/Guernsey","Europe/Belfast|Europe/Isle_of_Man","Europe/Belfast|Europe/Jersey","Europe/Belfast|Europe/London","Europe/Belfast|GB","Europe/Belfast|GB-Eire","Europe/Moscow|Europe/Volgograd","Europe/Moscow|W-SU","HST|Pacific/Honolulu","HST|Pacific/Johnston","HST|US/Hawaii","Kwajalein|Pacific/Kwajalein","Kwajalein|Pacific/Majuro","NZ-CHAT|Pacific/Chatham","Pacific/Chuuk|Pacific/Truk","Pacific/Chuuk|Pacific/Yap","Pacific/Guam|Pacific/Saipan","Pacific/Midway|Pacific/Pago_Pago","Pacific/Midway|Pacific/Samoa","Pacific/Midway|US/Samoa","Pacific/Pohnpei|Pacific/Ponape"]}),af
});
if(typeof Object.create!=="function"){Object.create=function(b){function a(){}a.prototype=b;
return new a()
}
}(function(c,b,a){var d={init:function(e,f){var g=this;
g.$elem=c(f);
g.options=c.extend({},c.fn.owlCarousel.options,g.$elem.data(),e);
g.userOptions=e;
g.loadContent()
},loadContent:function(){var g=this,f;
function e(k){var h,j="";
if(typeof g.options.jsonSuccess==="function"){g.options.jsonSuccess.apply(this,[k])
}else{for(h in k.owl){if(k.owl.hasOwnProperty(h)){j+=k.owl[h].item
}}g.$elem.html(j)
}g.logIn()
}if(typeof g.options.beforeInit==="function"){g.options.beforeInit.apply(this,[g.$elem])
}if(typeof g.options.jsonPath==="string"){f=g.options.jsonPath;
c.getJSON(f,e)
}else{g.logIn()
}},logIn:function(){var e=this;
e.$elem.data("owl-originalStyles",e.$elem.attr("style"));
e.$elem.data("owl-originalClasses",e.$elem.attr("class"));
e.$elem.css({opacity:0});
e.orignalItems=e.options.items;
e.checkBrowser();
e.wrapperWidth=0;
e.checkVisible=null;
e.setVars()
},setVars:function(){var e=this;
if(e.$elem.children().length===0){return false
}e.baseClass();
e.eventTypes();
e.$userItems=e.$elem.children();
e.itemsAmount=e.$userItems.length;
e.wrapItems();
e.$owlItems=e.$elem.find(".owl-item");
e.$owlWrapper=e.$elem.find(".owl-wrapper");
e.playDirection="next";
e.prevItem=0;
e.prevArr=[0];
e.currentItem=0;
e.customEvents();
e.onStartup()
},onStartup:function(){var e=this;
e.updateItems();
e.calculateAll();
e.buildControls();
e.updateControls();
e.response();
e.moveEvents();
e.stopOnHover();
e.owlStatus();
if(e.options.transitionStyle!==false){e.transitionTypes(e.options.transitionStyle)
}if(e.options.autoPlay===true){e.options.autoPlay=5000
}e.play();
e.$elem.find(".owl-wrapper").css("display","block");
if(!e.$elem.is(":visible")){e.watchVisibility()
}else{e.$elem.css("opacity",1)
}e.onstartup=false;
e.eachMoveUpdate();
if(typeof e.options.afterInit==="function"){e.options.afterInit.apply(this,[e.$elem])
}},eachMoveUpdate:function(){var e=this;
if(e.options.lazyLoad===true){e.lazyLoad()
}if(e.options.autoHeight===true){e.autoHeight()
}e.onVisibleItems();
if(typeof e.options.afterAction==="function"){e.options.afterAction.apply(this,[e.$elem])
}},updateVars:function(){var e=this;
if(typeof e.options.beforeUpdate==="function"){e.options.beforeUpdate.apply(this,[e.$elem])
}e.watchVisibility();
e.updateItems();
e.calculateAll();
e.updatePosition();
e.updateControls();
e.eachMoveUpdate();
if(typeof e.options.afterUpdate==="function"){e.options.afterUpdate.apply(this,[e.$elem])
}},reload:function(){var e=this;
b.setTimeout(function(){e.updateVars()
},0)
},watchVisibility:function(){var e=this;
if(e.$elem.is(":visible")===false){e.$elem.css({opacity:0});
b.clearInterval(e.autoPlayInterval);
b.clearInterval(e.checkVisible)
}else{return false
}e.checkVisible=b.setInterval(function(){if(e.$elem.is(":visible")){e.reload();
e.$elem.animate({opacity:1},200);
b.clearInterval(e.checkVisible)
}},500)
},wrapItems:function(){var e=this;
e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
e.wrapperOuter=e.$elem.find(".owl-wrapper-outer");
e.$elem.css("display","block")
},baseClass:function(){var g=this,e=g.$elem.hasClass(g.options.baseClass),f=g.$elem.hasClass(g.options.theme);
if(!e){g.$elem.addClass(g.options.baseClass)
}if(!f){g.$elem.addClass(g.options.theme)
}},updateItems:function(){var g=this,f,e;
if(g.options.responsive===false){return false
}if(g.options.singleItem===true){g.options.items=g.orignalItems=1;
g.options.itemsCustom=false;
g.options.itemsDesktop=false;
g.options.itemsDesktopSmall=false;
g.options.itemsTablet=false;
g.options.itemsTabletSmall=false;
g.options.itemsMobile=false;
return false
}f=c(g.options.responsiveBaseWidth).width();
if(f>(g.options.itemsDesktop[0]||g.orignalItems)){g.options.items=g.orignalItems
}if(g.options.itemsCustom!==false){g.options.itemsCustom.sort(function(j,h){return j[0]-h[0]
});
for(e=0;
e<g.options.itemsCustom.length;
e+=1){if(g.options.itemsCustom[e][0]<=f){g.options.items=g.options.itemsCustom[e][1]
}}}else{if(f<=g.options.itemsDesktop[0]&&g.options.itemsDesktop!==false){g.options.items=g.options.itemsDesktop[1]
}if(f<=g.options.itemsDesktopSmall[0]&&g.options.itemsDesktopSmall!==false){g.options.items=g.options.itemsDesktopSmall[1]
}if(f<=g.options.itemsTablet[0]&&g.options.itemsTablet!==false){g.options.items=g.options.itemsTablet[1]
}if(f<=g.options.itemsTabletSmall[0]&&g.options.itemsTabletSmall!==false){g.options.items=g.options.itemsTabletSmall[1]
}if(f<=g.options.itemsMobile[0]&&g.options.itemsMobile!==false){g.options.items=g.options.itemsMobile[1]
}}if(g.options.items>g.itemsAmount&&g.options.itemsScaleUp===true){g.options.items=g.itemsAmount
}},response:function(){var g=this,f,e;
if(g.options.responsive!==true){return false
}e=c(b).width();
g.resizer=function(){if(c(b).width()!==e){if(g.options.autoPlay!==false){b.clearInterval(g.autoPlayInterval)
}b.clearTimeout(f);
f=b.setTimeout(function(){e=c(b).width();
g.updateVars()
},g.options.responsiveRefreshRate)
}};
c(b).resize(g.resizer)
},updatePosition:function(){var e=this;
e.jumpTo(e.currentItem);
if(e.options.autoPlay!==false){e.checkAp()
}},appendItemsSizes:function(){var g=this,e=0,f=g.itemsAmount-g.options.items;
g.$owlItems.each(function(h){var j=c(this);
j.css({width:g.itemWidth}).data("owl-item",Number(h));
if(h%g.options.items===0||h===f){if(!(h>f)){e+=1
}}j.data("owl-roundPages",e)
})
},appendWrapperSizes:function(){var f=this,e=f.$owlItems.length*f.itemWidth;
f.$owlWrapper.css({width:e*2,left:0});
f.appendItemsSizes()
},calculateAll:function(){var e=this;
e.calculateWidth();
e.appendWrapperSizes();
e.loops();
e.max()
},calculateWidth:function(){var e=this;
e.itemWidth=Math.round(e.$elem.width()/e.options.items)
},max:function(){var e=this,f=((e.itemsAmount*e.itemWidth)-e.options.items*e.itemWidth)*-1;
if(e.options.items>e.itemsAmount){e.maximumItem=0;
f=0;
e.maximumPixels=0
}else{e.maximumItem=e.itemsAmount-e.options.items;
e.maximumPixels=f
}return f
},min:function(){return 0
},loops:function(){var k=this,j=0,g=0,f,h,e;
k.positionsInArray=[0];
k.pagesInArray=[];
for(f=0;
f<k.itemsAmount;
f+=1){g+=k.itemWidth;
k.positionsInArray.push(-g);
if(k.options.scrollPerPage===true){h=c(k.$owlItems[f]);
e=h.data("owl-roundPages");
if(e!==j){k.pagesInArray[j]=k.positionsInArray[f];
j=e
}}}},buildControls:function(){var e=this;
if(e.options.navigation===true||e.options.pagination===true){e.owlControls=c('<div class="owl-controls"/>').toggleClass("clickable",!e.browser.isTouch).appendTo(e.$elem)
}if(e.options.pagination===true){e.buildPagination()
}if(e.options.navigation===true){e.buildButtons()
}},buildButtons:function(){var f=this,e=c('<div class="owl-buttons"/>');
f.owlControls.append(e);
f.buttonPrev=c("<div/>",{"class":"owl-prev",html:f.options.navigationText[0]||""});
f.buttonNext=c("<div/>",{"class":"owl-next",html:f.options.navigationText[1]||""});
e.append(f.buttonPrev).append(f.buttonNext);
e.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(g){g.preventDefault()
});
e.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(g){g.preventDefault();
if(c(this).hasClass("owl-next")){f.next()
}else{f.prev()
}})
},buildPagination:function(){var e=this;
e.paginationWrapper=c('<div class="owl-pagination"/>');
e.owlControls.append(e.paginationWrapper);
e.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(f){f.preventDefault();
if(Number(c(this).data("owl-page"))!==e.currentItem){e.goTo(Number(c(this).data("owl-page")),true)
}})
},updatePagination:function(){var l=this,f,k,j,h,g,e;
if(l.options.pagination===false){return false
}l.paginationWrapper.html("");
f=0;
k=l.itemsAmount-l.itemsAmount%l.options.items;
for(h=0;
h<l.itemsAmount;
h+=1){if(h%l.options.items===0){f+=1;
if(k===h){j=l.itemsAmount-l.options.items
}g=c("<div/>",{"class":"owl-page"});
e=c("<span></span>",{text:l.options.paginationNumbers===true?f:"","class":l.options.paginationNumbers===true?"owl-numbers":""});
g.append(e);
g.data("owl-page",k===h?j:h);
g.data("owl-roundPages",f);
l.paginationWrapper.append(g)
}}l.checkPagination()
},checkPagination:function(){var e=this;
if(e.options.pagination===false){return false
}e.paginationWrapper.find(".owl-page").each(function(){if(c(this).data("owl-roundPages")===c(e.$owlItems[e.currentItem]).data("owl-roundPages")){e.paginationWrapper.find(".owl-page").removeClass("active");
c(this).addClass("active")
}})
},checkNavigation:function(){var e=this;
if(e.options.navigation===false){return false
}if(e.options.rewindNav===false){if(e.currentItem===0&&e.maximumItem===0){e.buttonPrev.addClass("disabled");
e.buttonNext.addClass("disabled")
}else{if(e.currentItem===0&&e.maximumItem!==0){e.buttonPrev.addClass("disabled");
e.buttonNext.removeClass("disabled")
}else{if(e.currentItem===e.maximumItem){e.buttonPrev.removeClass("disabled");
e.buttonNext.addClass("disabled")
}else{if(e.currentItem!==0&&e.currentItem!==e.maximumItem){e.buttonPrev.removeClass("disabled");
e.buttonNext.removeClass("disabled")
}}}}}},updateControls:function(){var e=this;
e.updatePagination();
e.checkNavigation();
if(e.owlControls){if(e.options.items>=e.itemsAmount){e.owlControls.hide()
}else{e.owlControls.show()
}}},destroyControls:function(){var e=this;
if(e.owlControls){e.owlControls.remove()
}},next:function(f){var e=this;
if(e.isTransition){return false
}e.currentItem+=e.options.scrollPerPage===true?e.options.items:1;
if(e.currentItem>e.maximumItem+(e.options.scrollPerPage===true?(e.options.items-1):0)){if(e.options.rewindNav===true){e.currentItem=0;
f="rewind"
}else{e.currentItem=e.maximumItem;
return false
}}e.goTo(e.currentItem,f)
},prev:function(f){var e=this;
if(e.isTransition){return false
}if(e.options.scrollPerPage===true&&e.currentItem>0&&e.currentItem<e.options.items){e.currentItem=0
}else{e.currentItem-=e.options.scrollPerPage===true?e.options.items:1
}if(e.currentItem<0){if(e.options.rewindNav===true){e.currentItem=e.maximumItem;
f="rewind"
}else{e.currentItem=0;
return false
}}e.goTo(e.currentItem,f)
},goTo:function(e,j,g){var h=this,f;
if(h.isTransition){return false
}if(typeof h.options.beforeMove==="function"){h.options.beforeMove.apply(this,[h.$elem])
}if(e>=h.maximumItem){e=h.maximumItem
}else{if(e<=0){e=0
}}h.currentItem=h.owl.currentItem=e;
if(h.options.transitionStyle!==false&&g!=="drag"&&h.options.items===1&&h.browser.support3d===true){h.swapSpeed(0);
if(h.browser.support3d===true){h.transition3d(h.positionsInArray[e])
}else{h.css2slide(h.positionsInArray[e],1)
}h.afterGo();
h.singleItemTransition();
return false
}f=h.positionsInArray[e];
if(h.browser.support3d===true){h.isCss3Finish=false;
if(j===true){h.swapSpeed("paginationSpeed");
b.setTimeout(function(){h.isCss3Finish=true
},h.options.paginationSpeed)
}else{if(j==="rewind"){h.swapSpeed(h.options.rewindSpeed);
b.setTimeout(function(){h.isCss3Finish=true
},h.options.rewindSpeed)
}else{h.swapSpeed("slideSpeed");
b.setTimeout(function(){h.isCss3Finish=true
},h.options.slideSpeed)
}}h.transition3d(f)
}else{if(j===true){h.css2slide(f,h.options.paginationSpeed)
}else{if(j==="rewind"){h.css2slide(f,h.options.rewindSpeed)
}else{h.css2slide(f,h.options.slideSpeed)
}}}h.afterGo()
},jumpTo:function(e){var f=this;
if(typeof f.options.beforeMove==="function"){f.options.beforeMove.apply(this,[f.$elem])
}if(e>=f.maximumItem||e===-1){e=f.maximumItem
}else{if(e<=0){e=0
}}f.swapSpeed(0);
if(f.browser.support3d===true){f.transition3d(f.positionsInArray[e])
}else{f.css2slide(f.positionsInArray[e],1)
}f.currentItem=f.owl.currentItem=e;
f.afterGo()
},afterGo:function(){var e=this;
e.prevArr.push(e.currentItem);
e.prevItem=e.owl.prevItem=e.prevArr[e.prevArr.length-2];
e.prevArr.shift(0);
if(e.prevItem!==e.currentItem){e.checkPagination();
e.checkNavigation();
e.eachMoveUpdate();
if(e.options.autoPlay!==false){e.checkAp()
}}if(typeof e.options.afterMove==="function"&&e.prevItem!==e.currentItem){e.options.afterMove.apply(this,[e.$elem])
}},stop:function(){var e=this;
e.apStatus="stop";
b.clearInterval(e.autoPlayInterval)
},checkAp:function(){var e=this;
if(e.apStatus!=="stop"){e.play()
}},play:function(){var e=this;
e.apStatus="play";
if(e.options.autoPlay===false){return false
}b.clearInterval(e.autoPlayInterval);
e.autoPlayInterval=b.setInterval(function(){e.next(true)
},e.options.autoPlay)
},swapSpeed:function(f){var e=this;
if(f==="slideSpeed"){e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed))
}else{if(f==="paginationSpeed"){e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed))
}else{if(typeof f!=="string"){e.$owlWrapper.css(e.addCssSpeed(f))
}}}},addCssSpeed:function(e){return{"-webkit-transition":"all "+e+"ms ease","-moz-transition":"all "+e+"ms ease","-o-transition":"all "+e+"ms ease",transition:"all "+e+"ms ease"}
},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}
},doTranslate:function(e){return{"-webkit-transform":"translate3d("+e+"px, 0px, 0px)","-moz-transform":"translate3d("+e+"px, 0px, 0px)","-o-transform":"translate3d("+e+"px, 0px, 0px)","-ms-transform":"translate3d("+e+"px, 0px, 0px)",transform:"translate3d("+e+"px, 0px,0px)"}
},transition3d:function(f){var e=this;
e.$owlWrapper.css(e.doTranslate(f))
},css2move:function(f){var e=this;
e.$owlWrapper.css({left:f})
},css2slide:function(g,f){var e=this;
e.isCssFinish=false;
e.$owlWrapper.stop(true,true).animate({left:g},{duration:f||e.options.slideSpeed,complete:function(){e.isCssFinish=true
}})
},checkBrowser:function(){var k=this,g="translate3d(0px, 0px, 0px)",j=a.createElement("div"),h,f,l,e;
j.style.cssText="  -moz-transform:"+g+"; -ms-transform:"+g+"; -o-transform:"+g+"; -webkit-transform:"+g+"; transform:"+g;
h=/translate3d\(0px, 0px, 0px\)/g;
f=j.style.cssText.match(h);
l=(f!==null&&f.length===1);
e="ontouchstart" in b||b.navigator.msMaxTouchPoints;
k.browser={support3d:l,isTouch:e}
},moveEvents:function(){var e=this;
if(e.options.mouseDrag!==false||e.options.touchDrag!==false){e.gestures();
e.disabledEvents()
}},eventTypes:function(){var f=this,e=["s","e","x"];
f.ev_types={};
if(f.options.mouseDrag===true&&f.options.touchDrag===true){e=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]
}else{if(f.options.mouseDrag===false&&f.options.touchDrag===true){e=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]
}else{if(f.options.mouseDrag===true&&f.options.touchDrag===false){e=["mousedown.owl","mousemove.owl","mouseup.owl"]
}}}f.ev_types.start=e[0];
f.ev_types.move=e[1];
f.ev_types.end=e[2]
},disabledEvents:function(){var e=this;
e.$elem.on("dragstart.owl",function(f){f.preventDefault()
});
e.$elem.on("mousedown.disableTextSelect",function(f){return c(f.target).is("input, textarea, select, option")
})
},gestures:function(){var h=this,j={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};
h.isCssFinish=true;
function l(m){if(m.touches!==undefined){return{x:m.touches[0].pageX,y:m.touches[0].pageY}
}if(m.touches===undefined){if(m.pageX!==undefined){return{x:m.pageX,y:m.pageY}
}if(m.pageX===undefined){return{x:m.clientX,y:m.clientY}
}}}function k(m){if(m==="on"){c(a).on(h.ev_types.move,g);
c(a).on(h.ev_types.end,e)
}else{if(m==="off"){c(a).off(h.ev_types.move);
c(a).off(h.ev_types.end)
}}}function f(o){var n=o.originalEvent||o||b.event,m;
if(n.which===3){return false
}if(h.itemsAmount<=h.options.items){return
}if(h.isCssFinish===false&&!h.options.dragBeforeAnimFinish){return false
}if(h.isCss3Finish===false&&!h.options.dragBeforeAnimFinish){return false
}if(h.options.autoPlay!==false){b.clearInterval(h.autoPlayInterval)
}if(h.browser.isTouch!==true&&!h.$owlWrapper.hasClass("grabbing")){h.$owlWrapper.addClass("grabbing")
}h.newPosX=0;
h.newRelativeX=0;
c(this).css(h.removeTransition());
m=c(this).position();
j.relativePos=m.left;
j.offsetX=l(n).x-m.left;
j.offsetY=l(n).y-m.top;
k("on");
j.sliding=false;
j.targetElement=n.target||n.srcElement
}function g(p){var o=p.originalEvent||p||b.event,m,n;
h.newPosX=l(o).x-j.offsetX;
h.newPosY=l(o).y-j.offsetY;
h.newRelativeX=h.newPosX-j.relativePos;
if(typeof h.options.startDragging==="function"&&j.dragging!==true&&h.newRelativeX!==0){j.dragging=true;
h.options.startDragging.apply(h,[h.$elem])
}if((h.newRelativeX>8||h.newRelativeX<-8)&&(h.browser.isTouch===true)){if(o.preventDefault!==undefined){o.preventDefault()
}else{o.returnValue=false
}j.sliding=true
}if((h.newPosY>10||h.newPosY<-10)&&j.sliding===false){c(a).off("touchmove.owl")
}m=function(){return h.newRelativeX/5
};
n=function(){return h.maximumPixels+h.newRelativeX/5
};
h.newPosX=Math.max(Math.min(h.newPosX,m()),n());
if(h.browser.support3d===true){h.transition3d(h.newPosX)
}else{h.css2move(h.newPosX)
}}function e(q){var p=q.originalEvent||q||b.event,o,n,m;
p.target=p.target||p.srcElement;
j.dragging=false;
if(h.browser.isTouch!==true){h.$owlWrapper.removeClass("grabbing")
}if(h.newRelativeX<0){h.dragDirection=h.owl.dragDirection="left"
}else{h.dragDirection=h.owl.dragDirection="right"
}if(h.newRelativeX!==0){o=h.getNewPosition();
h.goTo(o,false,"drag");
if(j.targetElement===p.target&&h.browser.isTouch!==true){c(p.target).on("click.disable",function(r){r.stopImmediatePropagation();
r.stopPropagation();
r.preventDefault();
c(r.target).off("click.disable")
});
n=c._data(p.target,"events").click;
m=n.pop();
n.splice(0,0,m)
}}k("off")
}h.$elem.on(h.ev_types.start,".owl-wrapper",f)
},getNewPosition:function(){var f=this,e=f.closestItem();
if(e>f.maximumItem){f.currentItem=f.maximumItem;
e=f.maximumItem
}else{if(f.newPosX>=0){e=0;
f.currentItem=0
}}return e
},closestItem:function(){var g=this,h=g.options.scrollPerPage===true?g.pagesInArray:g.positionsInArray,e=g.newPosX,f=null;
c.each(h,function(k,j){if(e-(g.itemWidth/20)>h[k+1]&&e-(g.itemWidth/20)<j&&g.moveDirection()==="left"){f=j;
if(g.options.scrollPerPage===true){g.currentItem=c.inArray(f,g.positionsInArray)
}else{g.currentItem=k
}}else{if(e+(g.itemWidth/20)<j&&e+(g.itemWidth/20)>(h[k+1]||h[k]-g.itemWidth)&&g.moveDirection()==="right"){if(g.options.scrollPerPage===true){f=h[k+1]||h[h.length-1];
g.currentItem=c.inArray(f,g.positionsInArray)
}else{f=h[k+1];
g.currentItem=k+1
}}}});
return g.currentItem
},moveDirection:function(){var e=this,f;
if(e.newRelativeX<0){f="right";
e.playDirection="next"
}else{f="left";
e.playDirection="prev"
}return f
},customEvents:function(){var e=this;
e.$elem.on("owl.next",function(){e.next()
});
e.$elem.on("owl.prev",function(){e.prev()
});
e.$elem.on("owl.play",function(f,g){e.options.autoPlay=g;
e.play();
e.hoverStatus="play"
});
e.$elem.on("owl.stop",function(){e.stop();
e.hoverStatus="stop"
});
e.$elem.on("owl.goTo",function(g,f){e.goTo(f)
});
e.$elem.on("owl.jumpTo",function(g,f){e.jumpTo(f)
})
},stopOnHover:function(){var e=this;
if(e.options.stopOnHover===true&&e.browser.isTouch!==true&&e.options.autoPlay!==false){e.$elem.on("mouseover",function(){e.stop()
});
e.$elem.on("mouseout",function(){if(e.hoverStatus!=="stop"){e.play()
}})
}},lazyLoad:function(){var k=this,h,f,j,g,e;
if(k.options.lazyLoad===false){return false
}for(h=0;
h<k.itemsAmount;
h+=1){f=c(k.$owlItems[h]);
if(f.data("owl-loaded")==="loaded"){continue
}j=f.data("owl-item");
g=f.find(".lazyOwl");
if(typeof g.data("src")!=="string"){f.data("owl-loaded","loaded");
continue
}if(f.data("owl-loaded")===undefined){g.hide();
f.addClass("loading").data("owl-loaded","checked")
}if(k.options.lazyFollow===true){e=j>=k.currentItem
}else{e=true
}if(e&&j<k.currentItem+k.options.items&&g.length){k.lazyPreload(f,g)
}}},lazyPreload:function(e,f){var j=this,h=0,k;
if(f.prop("tagName")==="DIV"){f.css("background-image","url("+f.data("src")+")");
k=true
}else{f[0].src=f.data("src")
}function g(){e.data("owl-loaded","loaded").removeClass("loading");
f.removeAttr("data-src");
if(j.options.lazyEffect==="fade"){f.fadeIn(400)
}else{f.show()
}if(typeof j.options.afterLazyLoad==="function"){j.options.afterLazyLoad.apply(this,[j.$elem])
}}function l(){h+=1;
if(j.completeImg(f.get(0))||k===true){g()
}else{if(h<=100){b.setTimeout(l,100)
}else{g()
}}}l()
},autoHeight:function(){var h=this,j=c(h.$owlItems[h.currentItem]).find("img"),g;
function e(){var k=c(h.$owlItems[h.currentItem]).height();
h.wrapperOuter.css("height",k+"px");
if(!h.wrapperOuter.hasClass("autoHeight")){b.setTimeout(function(){h.wrapperOuter.addClass("autoHeight")
},0)
}}function f(){g+=1;
if(h.completeImg(j.get(0))){e()
}else{if(g<=100){b.setTimeout(f,100)
}else{h.wrapperOuter.css("height","")
}}}if(j.get(0)!==undefined){g=0;
f()
}else{e()
}},completeImg:function(e){var f;
if(!e.complete){return false
}f=typeof e.naturalWidth;
if(f!=="undefined"&&e.naturalWidth===0){return false
}return true
},onVisibleItems:function(){var f=this,e;
if(f.options.addClassActive===true){f.$owlItems.removeClass("active")
}f.visibleItems=[];
for(e=f.currentItem;
e<f.currentItem+f.options.items;
e+=1){f.visibleItems.push(e);
if(f.options.addClassActive===true){c(f.$owlItems[e]).addClass("active")
}}f.owl.visibleItems=f.visibleItems
},transitionTypes:function(e){var f=this;
f.outClass="owl-"+e+"-out";
f.inClass="owl-"+e+"-in"
},singleItemTransition:function(){var f=this,h=f.outClass,l=f.inClass,k=f.$owlItems.eq(f.currentItem),j=f.$owlItems.eq(f.prevItem),n=Math.abs(f.positionsInArray[f.currentItem])+f.positionsInArray[f.prevItem],m=Math.abs(f.positionsInArray[f.currentItem])+f.itemWidth/2,g="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
f.isTransition=true;
f.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":m+"px","-moz-perspective-origin":m+"px","perspective-origin":m+"px"});
function e(o){return{position:"relative",left:o+"px"}
}j.css(e(n,10)).addClass(h).on(g,function(){f.endPrev=true;
j.off(g);
f.clearTransStyle(j,h)
});
k.addClass(l).on(g,function(){f.endCurrent=true;
k.off(g);
f.clearTransStyle(k,l)
})
},clearTransStyle:function(f,e){var g=this;
f.css({position:"",left:""}).removeClass(e);
if(g.endPrev&&g.endCurrent){g.$owlWrapper.removeClass("owl-origin");
g.endPrev=false;
g.endCurrent=false;
g.isTransition=false
}},owlStatus:function(){var e=this;
e.owl={userOptions:e.userOptions,baseElement:e.$elem,userItems:e.$userItems,owlItems:e.$owlItems,currentItem:e.currentItem,prevItem:e.prevItem,visibleItems:e.visibleItems,isTouch:e.browser.isTouch,browser:e.browser,dragDirection:e.dragDirection}
},clearEvents:function(){var e=this;
e.$elem.off(".owl owl mousedown.disableTextSelect");
c(a).off(".owl owl");
c(b).off("resize",e.resizer)
},unWrap:function(){var e=this;
if(e.$elem.children().length!==0){e.$owlWrapper.unwrap();
e.$userItems.unwrap().unwrap();
if(e.owlControls){e.owlControls.remove()
}}e.clearEvents();
e.$elem.attr("style",e.$elem.data("owl-originalStyles")||"").attr("class",e.$elem.data("owl-originalClasses"))
},destroy:function(){var e=this;
e.stop();
b.clearInterval(e.checkVisible);
e.unWrap();
e.$elem.removeData()
},reinit:function(g){var f=this,e=c.extend({},f.userOptions,g);
f.unWrap();
f.init(e,f.$elem)
},addItem:function(h,f){var g=this,e;
if(!h){return false
}if(g.$elem.children().length===0){g.$elem.append(h);
g.setVars();
return false
}g.unWrap();
if(f===undefined||f===-1){e=-1
}else{e=f
}if(e>=g.$userItems.length||e===-1){g.$userItems.eq(-1).after(h)
}else{g.$userItems.eq(e).before(h)
}g.setVars()
},removeItem:function(f){var g=this,e;
if(g.$elem.children().length===0){return false
}if(f===undefined||f===-1){e=-1
}else{e=f
}g.unWrap();
g.$userItems.eq(e).remove();
g.setVars()
}};
c.fn.owlCarousel=function(e){return this.each(function(){if(c(this).data("owl-init")===true){return false
}c(this).data("owl-init",true);
var f=Object.create(d);
f.init(e,this);
c.data(this,"owlCarousel",f)
})
};
c.fn.owlCarousel.options={items:5,itemsCustom:false,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:false,itemsMobile:[479,1],singleItem:false,itemsScaleUp:false,slideSpeed:200,paginationSpeed:800,rewindSpeed:1000,autoPlay:false,stopOnHover:false,navigation:false,navigationText:["prev","next"],rewindNav:true,scrollPerPage:false,pagination:true,paginationNumbers:false,responsive:true,responsiveRefreshRate:200,responsiveBaseWidth:b,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:false,lazyFollow:true,lazyEffect:"fade",autoHeight:false,jsonPath:false,jsonSuccess:false,dragBeforeAnimFinish:true,mouseDrag:true,touchDrag:true,addClassActive:false,transitionStyle:false,beforeUpdate:false,afterUpdate:false,beforeInit:false,afterInit:false,beforeMove:false,afterMove:false,afterAction:false,startDragging:false,afterLazyLoad:false}
}(jQuery,window,document));
/*! jQuery Validation Plugin - v1.13.1 - 10/14/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(b){"function"==typeof define&&define.amd?define(["jquery"],b):b(jQuery)
}(function(e){e.extend(e.fn,{validate:function(a){if(!this.length){return void (a&&a.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."))
}var g=e.data(this[0],"validator");
return g?g:(this.attr("novalidate","novalidate"),g=new e.validator(a,this[0]),e.data(this[0],"validator",g),g.settings.onsubmit&&(this.validateDelegate(":submit","click",function(c){g.settings.submitHandler&&(g.submitButton=c.target),e(c.target).hasClass("cancel")&&(g.cancelSubmit=!0),void 0!==e(c.target).attr("formnovalidate")&&(g.cancelSubmit=!0)
}),this.submit(function(c){function h(){var j,b;
return g.settings.submitHandler?(g.submitButton&&(j=e("<input type='hidden'/>").attr("name",g.submitButton.name).val(e(g.submitButton).val()).appendTo(g.currentForm)),b=g.settings.submitHandler.call(g,g.currentForm,c),g.submitButton&&j.remove(),void 0!==b?b:!1):!0
}return g.settings.debug&&c.preventDefault(),g.cancelSubmit?(g.cancelSubmit=!1,h()):g.form()?g.pendingRequest?(g.formSubmitted=!0,!1):h():(g.focusInvalid(),!1)
})),g)
},valid:function(){var a,g;
return e(this[0]).is("form")?a=this.validate().form():(a=!0,g=e(this[0].form).validate(),this.each(function(){a=g.element(this)&&a
})),a
},removeAttrs:function(a){var h={},g=this;
return e.each(a.split(/\s/),function(j,c){h[c]=g.attr(c),g.removeAttr(c)
}),h
},rules:function(r,q){var p,o,n,m,l,k,a=this[0];
if(r){switch(p=e.data(a.form,"validator").settings,o=p.rules,n=e.validator.staticRules(a),r){case"add":e.extend(n,e.validator.normalizeRule(q)),delete n.messages,o[a.name]=n,q.messages&&(p.messages[a.name]=e.extend(p.messages[a.name],q.messages));
break;
case"remove":return q?(k={},e.each(q.split(/\s/),function(g,h){k[h]=n[h],delete n[h],"required"===h&&e(a).removeAttr("aria-required")
}),k):(delete o[a.name],n)
}}return m=e.validator.normalizeRules(e.extend({},e.validator.classRules(a),e.validator.attributeRules(a),e.validator.dataRules(a),e.validator.staticRules(a)),a),m.required&&(l=m.required,delete m.required,m=e.extend({required:l},m),e(a).attr("aria-required","true")),m.remote&&(l=m.remote,delete m.remote,m=e.extend(m,{remote:l})),m
}}),e.extend(e.expr[":"],{blank:function(a){return !e.trim(""+e(a).val())
},filled:function(a){return !!e.trim(""+e(a).val())
},unchecked:function(a){return !e(a).prop("checked")
}}),e.validator=function(a,g){this.settings=e.extend(!0,{},e.validator.defaults,a),this.currentForm=g,this.init()
},e.validator.format=function(a,g){return 1===arguments.length?function(){var b=e.makeArray(arguments);
return b.unshift(a),e.validator.format.apply(this,b)
}:(arguments.length>2&&g.constructor!==Array&&(g=e.makeArray(arguments).slice(1)),g.constructor!==Array&&(g=[g]),e.each(g,function(b,h){a=a.replace(new RegExp("\\{"+b+"\\}","g"),function(){return h
})
}),a)
},e.extend(e.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:e([]),errorLabelContainer:e([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(b){this.lastActive=b,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,b,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(b)))
},onfocusout:function(b){this.checkable(b)||!(b.name in this.submitted)&&this.optional(b)||this.element(b)
},onkeyup:function(g,c){(9!==c.which||""!==this.elementValue(g))&&(g.name in this.submitted||g===this.lastElement)&&this.element(g)
},onclick:function(b){b.name in this.submitted?this.element(b):b.parentNode.name in this.submitted&&this.element(b.parentNode)
},highlight:function(a,h,g){"radio"===a.type?this.findByName(a.name).addClass(h).removeClass(g):e(a).addClass(h).removeClass(g)
},unhighlight:function(a,h,g){"radio"===a.type?this.findByName(a.name).removeClass(h).addClass(g):e(a).removeClass(h).addClass(g)
}},setDefaults:function(a){e.extend(e.validator.defaults,a)
},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:e.validator.format("Please enter no more than {0} characters."),minlength:e.validator.format("Please enter at least {0} characters."),rangelength:e.validator.format("Please enter a value between {0} and {1} characters long."),range:e.validator.format("Please enter a value between {0} and {1}."),max:e.validator.format("Please enter a value less than or equal to {0}."),min:e.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function a(j){var m=e.data(this[0].form,"validator"),l="on"+j.type.replace(/^validate/,""),k=m.settings;
k[l]&&!this.is(k.ignore)&&k[l].call(m,this[0],j)
}this.labelContainer=e(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||e(this.currentForm),this.containers=e(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();
var h,g=this.groups={};
e.each(this.settings.groups,function(j,k){"string"==typeof k&&(k=k.split(/\s/)),e.each(k,function(b,l){g[l]=j
})
}),h=this.settings.rules,e.each(h,function(c,j){h[c]=e.validator.normalizeRule(j)
}),e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",a).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",a),this.settings.invalidHandler&&e(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")
},form:function(){return this.checkForm(),e.extend(this.submitted,this.errorMap),this.invalid=e.extend({},this.errorMap),this.valid()||e(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()
},checkForm:function(){this.prepareForm();
for(var g=0,c=this.currentElements=this.elements();
c[g];
g++){this.check(c[g])
}return this.valid()
},element:function(a){var j=this.clean(a),h=this.validationTargetFor(j),g=!0;
return this.lastElement=h,void 0===h?delete this.invalid[j.name]:(this.prepareElement(h),this.currentElements=e(h),g=this.check(h)!==!1,g?delete this.invalid[h.name]:this.invalid[h.name]=!0),e(a).attr("aria-invalid",!g),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),g
},showErrors:function(a){if(a){e.extend(this.errorMap,a),this.errorList=[];
for(var g in a){this.errorList.push({message:a[g],element:this.findByName(g)[0]})
}this.successList=e.grep(this.successList,function(b){return !(b.name in a)
})
}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()
},resetForm:function(){e.fn.resetForm&&e(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
},numberOfInvalids:function(){return this.objectLength(this.invalid)
},objectLength:function(h){var g,j=0;
for(g in h){j++
}return j
},hideErrors:function(){this.hideThese(this.toHide)
},hideThese:function(b){b.not(this.containers).text(""),this.addWrapper(b).hide()
},valid:function(){return 0===this.size()
},size:function(){return this.errorList.length
},focusInvalid:function(){if(this.settings.focusInvalid){try{e(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")
}catch(a){}}},findLastActive:function(){var a=this.lastActive;
return a&&1===e.grep(this.errorList,function(b){return b.element.name===a.name
}).length&&a
},elements:function(){var a=this,g={};
return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return !this.name&&a.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in g||!a.objectLength(e(this).rules())?!1:(g[this.name]=!0,!0)
})
},clean:function(a){return e(a)[0]
},errors:function(){var a=this.settings.errorClass.split(" ").join(".");
return e(this.settings.errorElement+"."+a,this.errorContext)
},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=e([]),this.toHide=e([]),this.currentElements=e([])
},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)
},prepareElement:function(b){this.reset(),this.toHide=this.errorsFor(b)
},elementValue:function(a){var j,h=e(a),g=a.type;
return"radio"===g||"checkbox"===g?e("input[name='"+a.name+"']:checked").val():"number"===g&&"undefined"!=typeof a.validity?a.validity.badInput?!1:h.val():(j=h.val(),"string"==typeof j?j.replace(/\r/g,""):j)
},check:function(r){r=this.validationTargetFor(this.clean(r));
var q,p,o,n=e(r).rules(),m=e.map(n,function(g,c){return c
}).length,l=!1,k=this.elementValue(r);
for(p in n){o={method:p,parameters:n[p]};
try{if(q=e.validator.methods[p].call(this,k,r,o.parameters),"dependency-mismatch"===q&&1===m){l=!0;
continue
}if(l=!1,"pending"===q){return void (this.toHide=this.toHide.not(this.errorsFor(r)))
}if(!q){return this.formatAndAdd(r,o),!1
}}catch(a){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+r.id+", check the '"+o.method+"' method.",a),a
}}if(!l){return this.objectLength(n)&&this.successList.push(r),!0
}},customDataMessage:function(a,g){return e(a).data("msg"+g.charAt(0).toUpperCase()+g.substring(1).toLowerCase())||e(a).data("msg")
},customMessage:function(h,g){var j=this.settings.messages[h];
return j&&(j.constructor===String?j:j[g])
},findDefined:function(){for(var b=0;
b<arguments.length;
b++){if(void 0!==arguments[b]){return arguments[b]
}}return void 0
},defaultMessage:function(a,g){return this.findDefined(this.customMessage(a.name,g),this.customDataMessage(a,g),!this.settings.ignoreTitle&&a.title||void 0,e.validator.messages[g],"<strong>Warning: No message defined for "+a.name+"</strong>")
},formatAndAdd:function(a,j){var h=this.defaultMessage(a,j.method),g=/\$?\{(\d+)\}/g;
"function"==typeof h?h=h.call(this,j.parameters,a):g.test(h)&&(h=e.validator.format(h.replace(g,"{$1}"),j.parameters)),this.errorList.push({message:h,element:a,method:j.method}),this.errorMap[a.name]=h,this.submitted[a.name]=h
},addWrapper:function(b){return this.settings.wrapper&&(b=b.add(b.parent(this.settings.wrapper))),b
},defaultShowErrors:function(){var h,g,j;
for(h=0;
this.errorList[h];
h++){j=this.errorList[h],this.settings.highlight&&this.settings.highlight.call(this,j.element,this.settings.errorClass,this.settings.validClass),this.showLabel(j.element,j.message)
}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success){for(h=0;
this.successList[h];
h++){this.showLabel(this.successList[h])
}}if(this.settings.unhighlight){for(h=0,g=this.validElements();
g[h];
h++){this.settings.unhighlight.call(this,g[h],this.settings.errorClass,this.settings.validClass)
}}this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()
},validElements:function(){return this.currentElements.not(this.invalidElements())
},invalidElements:function(){return e(this.errorList).map(function(){return this.element
})
},showLabel:function(a,p){var o,n,m,l=this.errorsFor(a),k=this.idOrName(a),j=e(a).attr("aria-describedby");
l.length?(l.removeClass(this.settings.validClass).addClass(this.settings.errorClass),l.html(p)):(l=e("<"+this.settings.errorElement+">").attr("id",k+"-error").addClass(this.settings.errorClass).html(p||""),o=l,this.settings.wrapper&&(o=l.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(o):this.settings.errorPlacement?this.settings.errorPlacement(o,e(a)):o.insertAfter(a),l.is("label")?l.attr("for",k):0===l.parents("label[for='"+k+"']").length&&(m=l.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),j?j.match(new RegExp("\\b"+m+"\\b"))||(j+=" "+m):j=m,e(a).attr("aria-describedby",j),n=this.groups[a.name],n&&e.each(this.groups,function(g,h){h===n&&e("[name='"+g+"']",this.currentForm).attr("aria-describedby",l.attr("id"))
}))),!p&&this.settings.success&&(l.text(""),"string"==typeof this.settings.success?l.addClass(this.settings.success):this.settings.success(l,a)),this.toShow=this.toShow.add(l)
},errorsFor:function(a){var j=this.idOrName(a),h=e(a).attr("aria-describedby"),g="label[for='"+j+"'], label[for='"+j+"'] *";
return h&&(g=g+", #"+h.replace(/\s+/g,", #")),this.errors().filter(g)
},idOrName:function(b){return this.groups[b.name]||(this.checkable(b)?b.name:b.id||b.name)
},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name)),e(a).not(this.settings.ignore)[0]
},checkable:function(b){return/radio|checkbox/i.test(b.type)
},findByName:function(a){return e(this.currentForm).find("[name='"+a+"']")
},getLength:function(a,g){switch(g.nodeName.toLowerCase()){case"select":return e("option:selected",g).length;
case"input":if(this.checkable(g)){return this.findByName(g.name).filter(":checked").length
}}return a.length
},depend:function(g,c){return this.dependTypes[typeof g]?this.dependTypes[typeof g](g,c):!0
},dependTypes:{"boolean":function(b){return b
},string:function(a,g){return !!e(a,g.form).length
},"function":function(g,c){return g(c)
}},optional:function(a){var g=this.elementValue(a);
return !e.validator.methods.required.call(this,g,a)&&"dependency-mismatch"
},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,this.pending[b.name]=!0)
},stopRequest:function(a,g){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[a.name],g&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(e(this.currentForm).submit(),this.formSubmitted=!1):!g&&0===this.pendingRequest&&this.formSubmitted&&(e(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)
},previousValue:function(a){return e.data(a,"previousValue")||e.data(a,"previousValue",{old:null,valid:!0,message:this.defaultMessage(a,"remote")})
}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(a,g){a.constructor===String?this.classRuleSettings[a]=g:e.extend(this.classRuleSettings,a)
},classRules:function(a){var h={},g=e(a).attr("class");
return g&&e.each(g.split(" "),function(){this in e.validator.classRuleSettings&&e.extend(h,e.validator.classRuleSettings[this])
}),h
},attributeRules:function(a){var m,l,k={},j=e(a),h=a.getAttribute("type");
for(m in e.validator.methods){"required"===m?(l=a.getAttribute(m),""===l&&(l=!0),l=!!l):l=j.attr(m),/min|max/.test(m)&&(null===h||/number|range|text/.test(h))&&(l=Number(l)),l||0===l?k[m]=l:h===m&&"range"!==h&&(k[m]=!0)
}return k.maxlength&&/-1|2147483647|524288/.test(k.maxlength)&&delete k.maxlength,k
},dataRules:function(a){var k,j,h={},g=e(a);
for(k in e.validator.methods){j=g.data("rule"+k.charAt(0).toUpperCase()+k.substring(1).toLowerCase()),void 0!==j&&(h[k]=j)
}return h
},staticRules:function(a){var h={},g=e.data(a.form,"validator");
return g.settings.rules&&(h=e.validator.normalizeRule(g.settings.rules[a.name])||{}),h
},normalizeRules:function(a,g){return e.each(a,function(h,c){if(c===!1){return void delete a[h]
}if(c.param||c.depends){var b=!0;
switch(typeof c.depends){case"string":b=!!e(c.depends,g.form).length;
break;
case"function":b=c.depends.call(g,g)
}b?a[h]=void 0!==c.param?c.param:!0:delete a[h]
}}),e.each(a,function(c,b){a[c]=e.isFunction(b)?b(g):b
}),e.each(["minlength","maxlength"],function(){a[this]&&(a[this]=Number(a[this]))
}),e.each(["rangelength","range"],function(){var b;
a[this]&&(e.isArray(a[this])?a[this]=[Number(a[this][0]),Number(a[this][1])]:"string"==typeof a[this]&&(b=a[this].replace(/[\[\]]/g,"").split(/[\s,]+/),a[this]=[Number(b[0]),Number(b[1])]))
}),e.validator.autoCreateRanges&&(null!=a.min&&null!=a.max&&(a.range=[a.min,a.max],delete a.min,delete a.max),null!=a.minlength&&null!=a.maxlength&&(a.rangelength=[a.minlength,a.maxlength],delete a.minlength,delete a.maxlength)),a
},normalizeRule:function(a){if("string"==typeof a){var g={};
e.each(a.split(/\s/),function(){g[this]=!0
}),a=g
}return a
},addMethod:function(a,h,g){e.validator.methods[a]=h,e.validator.messages[a]=void 0!==g?g:e.validator.messages[a],h.length<3&&e.validator.addClassRules(a,e.validator.normalizeRule(a))
},methods:{required:function(a,j,h){if(!this.depend(h,j)){return"dependency-mismatch"
}if("select"===j.nodeName.toLowerCase()){var g=e(j).val();
return g&&g.length>0
}return this.checkable(j)?this.getLength(a,j)>0:e.trim(a).length>0
},email:function(g,c){return this.optional(c)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(g)
},url:function(g,c){return this.optional(c)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(g)
},date:function(g,c){return this.optional(c)||!/Invalid|NaN/.test(new Date(g).toString())
},dateISO:function(g,c){return this.optional(c)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(g)
},number:function(g,c){return this.optional(c)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(g)
},digits:function(g,c){return this.optional(c)||/^\d+$/.test(g)
},creditcard:function(j,h){if(this.optional(h)){return"dependency-mismatch"
}if(/[^0-9 \-]+/.test(j)){return !1
}var o,n,m=0,l=0,k=!1;
if(j=j.replace(/\D/g,""),j.length<13||j.length>19){return !1
}for(o=j.length-1;
o>=0;
o--){n=j.charAt(o),l=parseInt(n,10),k&&(l*=2)>9&&(l-=9),m+=l,k=!k
}return m%10===0
},minlength:function(a,j,h){var g=e.isArray(a)?a.length:this.getLength(a,j);
return this.optional(j)||g>=h
},maxlength:function(a,j,h){var g=e.isArray(a)?a.length:this.getLength(a,j);
return this.optional(j)||h>=g
},rangelength:function(a,j,h){var g=e.isArray(a)?a.length:this.getLength(a,j);
return this.optional(j)||g>=h[0]&&g<=h[1]
},min:function(h,g,j){return this.optional(g)||h>=j
},max:function(h,g,j){return this.optional(g)||j>=h
},range:function(h,g,j){return this.optional(g)||h>=j[0]&&h<=j[1]
},equalTo:function(a,j,h){var g=e(h);
return this.settings.onfocusout&&g.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){e(j).valid()
}),a===g.val()
},remote:function(a,m,l){if(this.optional(m)){return"dependency-mismatch"
}var k,j,h=this.previousValue(m);
return this.settings.messages[m.name]||(this.settings.messages[m.name]={}),h.originalMessage=this.settings.messages[m.name].remote,this.settings.messages[m.name].remote=h.message,l="string"==typeof l&&{url:l}||l,h.old===a?h.valid:(h.old=a,k=this,this.startRequest(m),j={},j[m.name]=a,e.ajax(e.extend(!0,{url:l,mode:"abort",port:"validate"+m.name,dataType:"json",data:j,context:k.currentForm,success:function(o){var n,g,c,b=o===!0||"true"===o;
k.settings.messages[m.name].remote=h.originalMessage,b?(c=k.formSubmitted,k.prepareElement(m),k.formSubmitted=c,k.successList.push(m),delete k.invalid[m.name],k.showErrors()):(n={},g=o||k.defaultMessage(m,"remote"),n[m.name]=h.message=e.isFunction(g)?g(a):g,k.invalid[m.name]=!0,k.showErrors(n)),h.valid=b,k.stopRequest(m,b)
}},l)),"pending")
}}}),e.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."
};
var d,f={};
e.ajaxPrefilter?e.ajaxPrefilter(function(g,c,j){var h=g.port;
"abort"===g.mode&&(f[h]&&f[h].abort(),f[h]=j)
}):(d=e.ajax,e.ajax=function(c){var b=("mode" in c?c:e.ajaxSettings).mode,a=("port" in c?c:e.ajaxSettings).port;
return"abort"===b?(f[a]&&f[a].abort(),f[a]=d.apply(this,arguments),f[a]):d.apply(this,arguments)
}),e.extend(e.fn,{validateDelegate:function(a,h,g){return this.bind(h,function(j){var b=e(j.target);
return b.is(a)?g.apply(b,arguments):void 0
})
}})
});
+function(e){var c=function(g,f){this.$element=e(g);
this.$elementBody=e(".discovery-body",this.$element);
this.options=f;
this.$contentList=this.$element.find(".discovery-body > .tile");
this.$items=this.$contentList;
this.resizeTimer=this.matrix=this.colCount=0;
this.colCountPrev=0;
this.resize=this.$window=e(window);
this.$window.on("resize.qvc.discovery.data-api",e.proxy(this.checkPositionWithEventLoop,this)).on("orientationchange.qvc.discovery.data-api",e.proxy(this.checkPositionWithEventLoop,this));
this.init()
};
c.TRANSITION_DURATION=300;
c.TIMER_DURATION=300;
c.DEFAULTS={animation:true,sort:true,viewport:{selector:"body",padding:0}};
c.prototype.init=function(){this.$viewport=this.options.viewport&&e(this.options.viewport.selector||this.options.viewport);
var f=e(".tile-title, .tile-video",this.$element);
if(this.options.sort&&f.length==2){f.wrapAll('<div class="tile tile-block"/>');
this.$contentList=this.$element.find(".discovery-body > .tile");
this.$items=this.$contentList
}this.handleUpdate()
};
c.prototype.checkPositionWithEventLoop=function(f){clearTimeout(this.resizeTimer);
this.resizeTimer=setTimeout(e.proxy(this.handleUpdate,this),c.TIMER_DURATION)
};
c.prototype.getMatrix=function(){var k=this;
var g=a(this.$items);
var m=this.$items.outerHeight(true);
var n=this.$elementBody.width()/g;
k.colCount=Math.round(n);
var l=new Array();
for(var j=0;
j<k.colCount;
j++){l[j]=0
}var f=[];
var h=function(o){return Math.min.apply({},o)
};
k.$contentList.each(function(){var p=Math.ceil(this.offsetTop/m);
for(j=k.colCount-1;
j>-1;
j--){if(l[j]==h(l)){var o=j
}}if(!f[p]){o=0
}if(!f[p]){f[p]=[]
}f[p].push(e(this));
l[o]+=e(this).outerHeight(true)
});
return f
};
c.prototype.handleUpdate=function(){var j=this;
var h=0;
var g=a(this.$items);
var f=this.$elementBody.width();
var l=Math.round(f/g);
var k="start";
j.colCountPrev=j.colCount;
j.colCount=Math.round(l);
if(j.colCount==j.colCountPrev){return
}this.$items.each(function(){var n=e(this);
var o=n.index();
var m=n.index()*10;
var p=n.next().outerWidth(true);
if(j.colCountPrev==0&&!n.data("start")){j.$contentList.eq(o).data("start",o)
}h+=n.outerWidth(true);
if(l>2){k="start";
return
}j.$contentList.eq(o).data("order",o);
if(Math.round(f/h)==1){h=0
}else{if(p&&((p+h)>f)){if(o==1){return
}j.$contentList.eq(o).data("order",1000+o);
k="order"
}}});
j.sortTile(k)
};
c.prototype.sortTile=function(f){var g=this;
this.$contentList.sort(function(j,h){return +e(j).data(f)-+e(h).data(f)
}).prependTo(g.$elementBody);
g.updateStyle()
};
c.prototype.updateStyle=function(){var g=this.getMatrix();
var j=g.length;
this.$contentList.removeClass("b-top b-left-white");
for(var k=0;
k<j;
k++){if(!g[k]){continue
}for(var h=0;
h<g[k].length;
h++){var f=g[k][h];
if(k!=0){f.addClass("b-top")
}if(h==0){f.addClass("b-left-white")
}}}return
};
c.prototype.getPosition=function(g){if(!g){return
}var h=g[0];
var f=h.tagName=="BODY";
return e.extend({},(typeof h.getBoundingClientRect=="function")?h.getBoundingClientRect():null,{scroll:f?document.documentElement.scrollTop||document.body.scrollTop:g.scrollTop(),width:f?e(window).width():g.outerWidth(),height:f?e(window).height():g.outerHeight(),index:g.index(),tile:g},f?{top:0,left:0}:g.offset())
};
c.prototype.getItem=function(f){var g=this;
if(f>=this.$contentList.length||f==-1){return
}return e(g.$contentList[f])
};
function a(g){var f=e(window).width();
g.each(function(){var h=e(this);
if(h.outerWidth(true)<f){f=h.outerWidth(true)
}});
return f
}function d(f){return this.each(function(){var j=e(this);
var h=j.data("qvc.discovery");
var g=e.extend({},c.DEFAULTS,j.data(),typeof f=="object"&&f);
if(!h){j.data("qvc.discovery",(h=new c(this,g)))
}if(typeof f=="string"){h[f]()
}})
}var b=e.fn.discovery;
e.fn.discovery=d;
e.fn.discovery.Constructor=c;
e.fn.discovery.noConflict=function(){e.fn.discovery=b;
return this
};
e(window).on("load",function(){e('[data-ride="discovery"]').each(function(){var f=e(this);
f.discovery(f.data())
})
})
}(jQuery);
+function(b){var c=function(e,d){this.options=b.extend({},c.DEFAULTS,d);
this.$element=b(e);
this.isShown=null;
this.relatedTarget=this.$element.data("target");
if(this.relatedTarget){b(this.relatedTarget).on("keydown",b.proxy(this.show,this)).on("blur",b.proxy(this.hide,this));
this.$element.addClass("lable-toogle").addClass("out").attr("aria-hidden",true)
}};
c.DEFAULTS={animation:true};
c.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in")){return
}var e=b.Event("show.qvc.label");
this.$element.trigger(e);
if(e.isDefaultPrevented()){return
}this.$element.removeClass("out").addClass("collapsing");
this.transitioning=1;
var d=function(f){if(f&&f.target!=this.$element[0]){this.$element.one(b.support.transition.end,b.proxy(d,this));
return
}this.$element.removeClass("collapsing").addClass("in");
this.transitioning=0;
this.$element.trigger("shown.qvc.label")
};
if(!b.support.transition){return d.call(this)
}this.$element.one(b.support.transition.end,b.proxy(d,this)).emulateTransitionEnd(350);
this.isShown=true
};
c.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in")){return
}var e=b.Event("hide.qvc.label");
this.$element.trigger(e);
if(e.isDefaultPrevented()){return
}this.$element.addClass("collapsing").removeClass("in");
this.transitioning=1;
var d=function(f){if(f&&f.target!=this.$element[0]){this.$element.one(b.support.transition.end,b.proxy(d,this));
return
}this.transitioning=0;
this.$element.trigger("hide.qvc.label").removeClass("collapsing").addClass("out")
};
if(!b.support.transition){return d.call(this)
}this.$element.one(b.support.transition.end,b.proxy(d,this)).emulateTransitionEnd(350);
this.isShown=false
};
c.prototype.keydown=function(d){if(!/(38|40|27)/.test(d.keyCode)){return
}};
var a=b.fn.label;
b.fn.label=function(d){return this.each(function(){var g=b(this);
var f=g.data("qvc.label");
var e=b.extend({},c.DEFAULTS,g.data(),typeof d=="object"&&d);
if(!f){g.data("qvc.label",(f=new c(this,e)))
}if(typeof d=="string"){f[d]()
}})
};
b.fn.label.Constructor=c;
b.fn.label.noConflict=function(){b.fn.label=a;
return this
};
b(window).on("load",function(){b('[data-toogle="label"]').each(function(){var d=b(this);
d.label(d.data())
})
})
}(jQuery);
+function(c){var b=function(e,d){this.$element=c(e);
this.options=c.extend({},b.DEFAULTS,d);
this.search=c('[role="search"]',this.$element).data();
this.$body=c(document.body);
this.$rowCanvas=c(".row-offcanvas");
this.$sidebarLeft=c("#sidebar-left");
this.$navbarSearch=c(".navbar-search",this.element);
this.$navbarSearchMobile=c(".navbar-search-mobile",this.element);
this.$navCollapsePromo=c("#navbar-collapse-container-promo",this.element);
this.$navCollapseCat=c("#navbar-collapse-container-categories",this.element);
this.$btnShowAllCat=c(".btn-show-all-cat",this.element);
this.$btnNavbarToogle=c(".btn-show-sidebar",this.element);
this.$btnScrollUp=c(".btn-scroll-up");
this.$modals=c(".modal");
this.ddClick=false;
this.searchKey="";
this.changeHeaderOn=50;
this.resizeTimer=this.currentTarget=this.$backdrop=this.isSidebarShown=null;
this.isSearchMobile=false;
this.$modals=c(".modal");
this.$window=c(window).on("scroll.qvc.navigation.data-api",c.proxy(this.checkPositionWithEventLoop,this)).on("orientationchange.qvc.live.data-api",c.proxy(this.checkOrientation,this));
this.$element.on("click",".btn-search",c.proxy(this.searchSubmit,this)).on("click",".btn-scroll-up",c.proxy(this.scrollUp,this)).on("keyup",".nav-search-control",c.proxy(this.searchKeyupEvent,this)).on("keydown",".nav-search-control",c.proxy(this.searchSubmit,this));
this.init()
};
b.SIDEBAR_TRANSITION_DURATION=250;
b.DEFAULTS={pagination:true,navigation:false,items:3,searchMinDigits:3,backdrop:true};
b.prototype.init=function(){var d=this;
c("form[role=search]").on("submit",c.proxy(d.searchSubmit,this));
c(".nav-signin, .nav-cart").click(function(f){d.collapseHeaderElements();
d.$navbarSearch.removeClass("open");
if(d.$body.hasClass("with-sidebar")&&c(f.currentTarget).hasClass("nav-signin")){d.toggleSidebar()
}d.ddClick=true
});
d.$btnNavbarToogle.on("click",function(h){var g=d.$element&&d.$element.find("> .panel > .in");
if(g&&g.length){var f=g.data("bs.collapse");
if(f&&f.transitioning){return
}g.collapse("hide");
f||g.data("bs.collapse",null);
g.one(c.support.transition.end,function(){d.toggleSidebar()
})
}else{d.toggleSidebar()
}});
d.$navbarSearch.on("hidden.bs.dropdown",function(f){d.searchKey=""
});
d.$modals.on("hidden.bs.modal",function(h){var f=c(this).find("form");
if(f.length){f.find(".text-ctr-error").addClass("hide");
f.find("input").not('[type="hidden"]').val("");
var g=f.validate();
if(g){g.resetForm();
f.find(".form-group").removeClass("has-error")
}}});
d.$btnScrollUp.on("click",c.proxy(this.scrollUp,this));
d.$navbarSearchMobile.on("shown.bs.collapse",c.proxy(this.checkMiniSearch,this)).on("hide.bs.collapse",c.proxy(this.resetMiniSearch,this))
};
b.prototype.scrollUp=function(){var g=window.scrollY,j=Math.PI/(1000/15),e=g/2;
var f=0,d;
if(!window.requestAnimationFrame){window.scrollTo(0,0);
return
}requestAnimationFrame(h);
function h(){setTimeout(function(){if(window.scrollY!=0){requestAnimationFrame(h);
f=f+1;
d=e-e*Math.cos(f*j);
window.scrollTo(0,(g-d))
}},15)
}};
b.prototype.checkMiniSearch=function(){this.isSearchMobile=true;
var e=c(".dropdown-menu",this.$navbarSearch);
var f=this.$element.height();
var d=c(window).height()-f;
e.css({height:d,overflow:"auto"})
};
b.prototype.resetMiniSearch=function(){this.isSearchMobile=false;
this.$body.removeClass("minisearch-open");
c(".dropdown-menu",this.$navbarSearch).css({height:"initial",overflow:"initial"})
};
b.prototype.searchSubmit=function(h){var g=c(".nav-search-control-lg").is(":visible")?"lg":"sm";
var f=c(".nav-search-control-"+g);
var d=c.trim(f.val());
if(h.keyCode&&h.keyCode!=13){d+=c.trim(String.fromCharCode(h.keyCode))
}if(d.length<this.options.searchMinDigits&&h.keyCode==13){return false
}else{if(d.length>=this.options.searchMinDigits){if((h.keyCode==13||c(h.currentTarget).hasClass("btn"))&&g=="sm"){this.$navbarSearchMobile.submit()
}else{if(h.keyCode==13||c(h.currentTarget).hasClass("btn")&&g=="lg"){c(".navbar-form").submit()
}}}}};
b.prototype.searchKeyupEvent=function(h){var g=this;
var d=c(h.currentTarget);
var j=d.val();
var f=g.search.resourcePath.replace(".html","")+".minisearch.json?search-term=";
if(g.$navCollapsePromo.hasClass("in")){g.$navCollapsePromo.collapse("hide")
}if(j.length>=g.options.searchMinDigits){if(j==g.searchKey){return false
}c.get(f+j,function(n){if(n){var p=n.products.product;
var l=n.navigation.refinements;
var e=n.paging.recsPerPage;
var r=[];
var m=c(".navbar-form",g.$element).attr("action");
g.searchKey=n.searchTerm.replace(/\*/g,"");
var o=[".list-group-product-category",".list-group-product-brand-name",".list-group-products"];
c.each(o,function(){var s=this.replace(".list-group-","#navbar-search-");
c(this,g.$element).addClass("hide").find(s).html("")
});
c.each(l,function(u,w){var v="";
var s=w.name;
s="#navbar-search-"+s.replace(/\./g,"-");
var t=w.refinementValues;
c.each(t,function(y,z){if(y>e){return
}var A=document.createElement("a");
A.setAttribute("href",m+z.navigationState.replace(/(\?|&)size=[^&]*&?/,"$1"));
A.setAttribute("class","list-group-item");
var x=document.createTextNode(z.name);
A.appendChild(x);
v+=A.outerHTML
});
c(s).html(v)
});
var q="";
c.each(p,function(u,x){if(u>3){return
}var t=x.imgUrl||"/etc/designs/qvc-commerce/clientlib/qvc-ui/images/placeholder.png";
var s=x.url||"";
var w=c('<a href="'+s+'" class="thumbnail"></a>');
var v=c('<img src="'+t+'?wid=70">');
var y=c('<div class="caption text-center"><h6>'+x.brandName+" "+x.name+"</h6></div>");
v.appendTo(w);
y.appendTo(w);
if(u%2!=0){w.addClass("col-border-left")
}q+=w[0].outerHTML
});
c("#navbar-search-products").html(q);
var k=false;
c.each(o,function(){var u=this.replace(".list-group-","#navbar-search-");
var t=c(u,g.$element);
var s=t.children().length;
if(s>0){c(this,g.$element).removeClass("hide");
k=true
}});
g.$navbarSearch[k?"addClass":"removeClass"]("open");
if(g.isSearchMobile){g.$body.addClass("minisearch-open")
}}})
}};
b.prototype.checkPositionWithEventLoop=function(d){clearTimeout(this.resizeTimer);
this.resizeTimer=setTimeout(c.proxy(this.checkPosition,this),10)
};
b.prototype.collapseHeaderElements=function(){var e=this.$element&&this.$element.find("> .panel > .in");
if(e&&e.length){var d=e.data("bs.collapse");
if(d&&d.transitioning){return
}if(d&&d.options.search&&c(".dropdown",this.$element).hasClass("open")||this.isSearchMobile){return
}e.collapse("hide");
d||e.data("bs.collapse",null)
}};
b.prototype.checkPosition=function(){var d=this;
var e=d.scrollY();
d.$btnShowAllCat[(e>=d.changeHeaderOn)?"addClass":"removeClass"]("in");
d.$element[(e>=d.changeHeaderOn)?"addClass":"removeClass"]("navbar-shrink");
d.$btnScrollUp[(e>=d.changeHeaderOn)?"addClass":"removeClass"]("in");
if(e==0){if(!d.$navCollapseCat.hasClass("in")){d.$navCollapseCat.removeClass("collapsing").addClass("collapse in")["height"]("")
}return
}else{if(e>=d.changeHeaderOn){if(d.$navCollapseCat.hasClass("in")){d.$navCollapseCat.collapse("hide")
}d.collapseHeaderElements()
}else{if(e<d.changeHeaderOn){if(!d.$navCollapseCat.hasClass("in")){d.$navCollapseCat.collapse("show")
}}}}if(!this.isSearchMobile&&d.ddClick==false){c(".dropdown",this.$element).removeClass("open")
}d.ddClick=false
};
b.prototype.checkOrientation=function(){if(this.isSidebarShown){}};
b.prototype.scrollY=function(){return window.pageYOffset||document.documentElement.scrollTop
};
b.prototype.toggleSidebar=function(){this[this.$body.hasClass("with-sidebar")?"hideSidebar":"showSidebar"]()
};
b.prototype.hideSidebar=function(){var e=this;
var d=c.Event("hide.qvc.sidebar.left");
e.$sidebarLeft.trigger(d);
e.isSidebarShown=false;
e.backdrop(function(){e.transitioning=1;
e.$body.removeClass("with-sidebar");
var f=function(){e.$rowCanvas.removeClass("correct");
e.transitioning=0;
e.$sidebarLeft.trigger("hiden.qvc.sidebar.left")
};
if(!c.support.transition){return f.call(e)
}c(".row-offcanvas .row-offcanvas-wrap").one("bsTransitionEnd",c.proxy(f,e)).emulateTransitionEnd(b.SIDEBAR_TRANSITION_DURATION)
})
};
b.prototype.showSidebar=function(){if(this.transitioning||this.$body.hasClass("with-sidebar")){return
}var e=this;
var d=c.Event("show.qvc.sidebar-left");
e.$sidebarLeft.trigger(d);
if(d.isDefaultPrevented()){return
}e.isSidebarShown=true;
e.$rowCanvas.addClass("correct");
e.backdrop(function(){e.transitioning=1;
var f=function(){e.$body.addClass("with-sidebar");
e.transitioning=0;
e.$sidebarLeft.trigger("shown.qvc.sidebar.left")
};
if(!c.support.transition){return f.call(e)
}c(".row-offcanvas .row-offcanvas-wrap").one("bsTransitionEnd",c.proxy(f,e)).emulateTransitionEnd(b.SIDEBAR_TRANSITION_DURATION)
})
};
b.prototype.backdrop=function(e){var d=this;
if(this.isSidebarShown&&this.options.backdrop){d.$backdrop=c('<div class="navigation-backdrop fade" />').appendTo(c(".row-offcanvas-wrap")).on("click",c.proxy(d.hideSidebar,this));
if(!e){return
}e()
}else{if(!this.isSidebarShown&&d.$backdrop){d.removeBackdrop();
e()
}else{if(e){e()
}}}};
b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove();
this.$backdrop=null
};
var a=c.fn.navigation;
c.fn.navigation=function(d){return this.each(function(){var g=c(this);
var f=g.data("qvc.navigation");
var e=c.extend({},b.DEFAULTS,g.data(),typeof d=="object"&&d);
if(!f){g.data("qvc.navigation",(f=new b(this,e)))
}})
};
c.fn.navigation.Constructor=b;
c.fn.navigation.noConflict=function(){c.fn.navigation=a;
return this
};
c(document).ready(function(){c('[data-ride="navbar"]').each(function(){var e=c(this);
var d=e.data();
e.navigation(d)
})
})
}(jQuery);
+function(d){var b=function(g,f){this.$element=d(g);
this.options=d.extend({},b.DEFAULTS,f);
this.closest=this.$element.parent();
var e=this.closest.find('[data-toggle="buttons"] .btn');
if(e.length){e.on("click.qvc.owl.data-api",d.proxy(this.toggleView,this))
}this.carousel=this.$element.owlCarousel(this.options)
};
b.DEFAULTS={pagination:true,navigation:false,items:3,itemsDesktop:[1199,3],itemsTablet:[991,2],itemsTabletSmall:[768,1],itemsMobile:[479,1],afterInit:a};
b.prototype.toggleView=function(h){var f=h?d(h.currentTarget):this;
var g=f.data("target");
if(g=="grid"){this.grid()
}else{if(g=="list"){this.list()
}}};
b.prototype.grid=function(){this.carousel=this.$element.owlCarousel(this.options);
this.$element.removeClass("discovery-list")
};
b.prototype.list=function(){d(this.carousel).data("owlCarousel").destroy();
this.$element.removeClass("owl-carousel").removeClass("owl-theme");
this.$element.addClass("discovery-list")
};
function a(){var e=this.$elem.parent();
if(e.hasClass("spinner")){e.removeClass("spinner")
}this.$elem.removeClass("hide")
}var c=d.fn.owl;
d.fn.owl=function(e){var f=this;
return this.each(function(){var j=d(this);
var h=j.data("qvc.owl");
var g=d.extend({},b.DEFAULTS,j.data(),typeof e=="object"&&e);
if(!h){j.data("qvc.owl",(h=new b(this,g)))
}})
};
d.fn.owl.Constructor=b;
d.fn.owl.noConflict=function(){d.fn.owl=c;
return this
};
d(document).ready(function(){d('[data-ride="owl"]').each(function(){var e=d(this);
var f=e.data();
e.owl(f)
})
})
}(jQuery);
function Preview(b,a){this.$item=b;
this.$items=this.options=$.extend({},Preview.DEFAULTS,a);
this.current=-1;
this.$window=$(window);
this.$body=$("html, body");
this.expandedIdx=this.$item.index();
this.$expandedItem=this.scrollExtra=0,this.marginExpanded=10;
this.create();
this.update()
}Preview.DEFAULTS={minHeight:340,speed:350,easing:"ease",template:""};
Preview.prototype.create=function(){this.$loading=$('<div class="og-loading"></div>');
this.$details=$('<div class="og-details"></div>').append(this.$loading);
this.$closePreview=$('<span class="og-close"></span>');
this.$previewInner=$('<div class="og-expander-inner"></div>').append(this.$closePreview,this.$details);
this.$previewEl=$('<div class="og-expander"></div>').append(this.$previewInner);
this.setTransition()
};
Preview.prototype.update=function(b){if(b){this.$item=b
}if(this.current!==-1){var d=this.$expandedItem;
d.removeClass("og-expanded");
this.$item.addClass("og-expanded");
this.positionPreview()
}this.current=this.$item.index();
var c=this.$item.children("a");
var a=this;
if(typeof a.$currentDetails!="undefined"){a.$currentDetails.remove()
}this.$loading.show();
$("<div/>").load(c.attr("href"),function(){var e=$(this);
a.$loading.hide();
a.$details.find("div").remove();
a.$currentDetails=e.fadeIn(350);
a.$details.append(a.$currentDetails)
})
};
Preview.prototype.open=function(){var b=this;
this.transitioning=1;
b.$expandedItem=b.$item;
b.$item.addClass("og-expanded");
var a=function(c){if(c&&c.target!=this.$item[0]){this.$item.one($.support.transition.end,$.proxy(a,this));
return
}this.transitioning=0
};
if(!$.support.transition){return a.call(this)
}this.calcHeight();
this.$previewEl.css("height",this.height);
this.$item.one($.support.transition.end,$.proxy(a,this)).emulateTransitionEnd(350);
this.positionPreview()
};
Preview.prototype.close=function(){var b=this;
b.transitioning=1;
b.$item.removeClass("og-expanded");
var a=function(c){if(c&&c.target!=this.$item[0]){this.$item.one($.support.transition.end,$.proxy(a,this));
return
}b.$previewEl.remove();
b.transitioning=0
};
if(!$.support.transition){return a.call(this)
}b.$previewEl.css("height",0);
b.$item.one($.support.transition.end,$.proxy(a,this)).emulateTransitionEnd(350);
return false
};
Preview.prototype.calcHeight=function(){var b=this.getWinSize().height-this.$item.data("height")-this.marginExpanded,a=this.getWinSize().height;
if(b<Preview.DEFAULTS.minHeight){b=Preview.DEFAULTS.minHeight;
a=Preview.DEFAULTS.minHeight+this.$item.data("height")+this.marginExpanded
}this.height=b;
this.itemHeight=a
};
Preview.prototype.positionPreview=function(){var b=this.$item.data("offsetTop"),a=this.$previewEl.offset().top-this.scrollExtra,c=this.height+this.$item.data("height")+this.marginExpanded<=this.getWinSize().height?b:this.height<this.getWinSize().height?a-(this.getWinSize().height-this.height):a;
this.$body.animate({scrollTop:c},Preview.DEFAULTS.speed)
};
Preview.prototype.setTransition=function(){this.$previewEl.css("transition","height "+Preview.DEFAULTS.speed+"ms "+Preview.DEFAULTS.easing)
};
Preview.prototype.getEl=function(){return this.$previewEl
};
Preview.prototype.getWinSize=function(){return{width:this.$window.width(),height:this.$window.height()}
}+function(c){var b=function(e,d){this.$element=c(e);
this.options=c.extend({},b.DEFAULTS,d);
this.type=this.$items=null;
this.width=c(".container",c(e)).width();
this.init()
};
b.DEFAULTS={animation:true,selector:'input[type="checkbox"]',pagination:false,items:5,itemsDesktop:[1000,5],itemsDesktopSmall:[900,4],itemsTablet:[600,3],navigation:false};
b.prototype.init=function(){var d=this.$element.parent();
this.type=this.options.type;
if(!this.type){this.type=d.attr("class")
}this[this.type]()
};
b.prototype.meta=function(){var d=this;
d.items=d.$element.find('[data-toggle="menu"]');
d.items.on("click",function(j){j.preventDefault();
var h=c(this);
var f=h.attr("href");
if(c(f).hasClass("in")){c(f).collapse("hide");
h.removeClass("active");
return false
}d.$actives=d.$element&&d.$element.find(".in");
if(d.$actives&&d.$actives.length){d.$actives.collapse("hide");
var g=function(k){if(!c.support.transition){d.items.removeClass("active");
h.toggleClass("active")
}c(f).collapse("show")
};
if(!c.support.transition){return g.call(this)
}d.$actives.one(c.support.transition.end,c.proxy(g,this)).emulateTransitionEnd(350)
}else{c(f).collapse("show")
}d.items.removeClass("active");
h.toggleClass("active")
})
};
b.prototype.links=function(){console.log("Toolbar.prototype.links()");
var d=c(".nav",this.$element);
d.owlCarousel(this.options)
};
b.prototype.products=function(){var e=this;
var f=c(this.options.parent);
if(!f){f=e.$element.parent()
}e.$element.on("click",".dropdown-menu a",function(h){var g=c(this);
var j=g.html();
c(".toolbar-sort-by a strong",e.$element).html(j);
h.preventDefault()
});
var d=e.$parent&&e.$parent.find("> .list-group > .show-more");
c('[data-toggle="collapse"]',f).on("click",function(l){var o="";
var g=c(this);
var p=g.attr("href");
p=p&&p.replace(/.*(?=#[^\s]*$)/,"");
var n=p.replace(/\-/g,".").replace(/\#/g,"");
var m="."+p+"-group";
m=m.replace(/\#/g,"");
var j=c(m).data("ref");
var h=c(m).data("moreIds");
if(!j&&!h){c(m).data("loaded",true)
}j=j+h;
if(c(p).hasClass("in")&&!j){c(p).collapse("hide");
return false
}if(c(m).data("loaded")==true){c(p).collapse("show");
return false
}var k=c("<span/>",{"class":"spinner spinner-xs"});
c(m).append(k);
c.get(j,function(s){var r="";
var u=s.navigation.refinements;
var t=false;
var q=[];
c.each(u,function(v,w){q=w.refinementValues;
t=w.multiSelect;
if(n==w.name&&n!="product-category"&&q.length){o=(w.showMoreIds)?w.showMoreIds.value:"";
c.each(q,function(z,A){if(!c("#"+A.id,f).length){var B=c("<input>").attr("type","checkbox").attr("name",n).attr("value",A.name).attr("id",A.id).attr("data-nav",A.navigationState).attr("class","ctr-refinement");
var x=c("<label>");
x.addClass("media text-truncate");
x.append(B);
x.append(Granite.I18n.get(A.name));
var y=c("<div>");
y.addClass("list-group-item col-sm-4 col-md-12");
y.append(x);
r+=y[0].outerHTML
}});
c(p).append(r);
c(m).data("loaded",true);
if(o==""){g.removeClass("collapsed");
c(m).removeData();
c(m).removeAttr("data-ref");
c(m).removeAttr("data-more-ids")
}}});
c(p).collapse("show").on("shown.bs.collapse",function(){if(o!=""){g.addClass("collapsed");
c(m).data("loaded",false).data("moreIds",o)
}});
c(k,m).remove()
});
return false
});
if(f.is(":visible")||!e.$element.hasClass("open")){e.$element.addClass("expanded")
}e.$element.on("click",'[data-toggle="collapse"]',function(){e.$element.toggleClass("expanded")
})
};
b.prototype.FiltersshowMoreIDs=function(){};
b.prototype.setFilter=function(k){var g=this;
var e="tb-filter-"+k.data("item");
var f=c("."+e);
var h=k.text()||k.val();
if(f.length!=0){return f.remove()&&k.prop("checked",false)
}var d=c("#toolbar-filters-list");
var j=c("<span>");
j.text(h).addClass(" btn btn-sm btn-filter").addClass(e).append('<span class="remove glyphicon glyphicon-remove" aria-hidden="true"></span>');
j.on("click",function(){g.hide(k)
});
d.append(j)
};
b.prototype.checkSizeFiltersArea=function(){};
b.prototype.show=function(g){if(this.transitioning||g.hasClass("active")){return
}var f=c.Event("show.filter.qvc.toolbar."+this.type);
this.$element.trigger(f);
if(f.isDefaultPrevented()){return
}var h=this;
var e=g;
e.addClass("active");
this.transitioning=1;
var d=function(j){if(j&&j.target!=e[0]){e.one(c.support.transition.end,c.proxy(d,this));
return
}h.setFilter(e);
e.addClass("in");
this.transitioning=0;
this.$element.trigger("shown.filter.qvc.toolbar."+h.type)
};
if(!c.support.transition){return d.call(this)
}e.one(c.support.transition.end,c.proxy(d,this)).emulateTransitionEnd(350)
};
b.prototype.hide=function(g){if(this.transitioning||(!g.hasClass("active"))){return
}var f=c.Event("hide.filter.qvc.toolbar."+this.type);
this.$element.trigger(f);
if(f.isDefaultPrevented()){return
}var h=this;
var e=g;
c(".glyphicon",e).remove();
e.removeClass("active");
this.transitioning=1;
var d=function(j){if(j&&j.target!=e[0]){e.one(c.support.transition.end,c.proxy(d,this));
return
}h.setFilter(e);
e.removeClass("in");
this.transitioning=0;
this.$element.trigger("hidden.filter.qvc.toolbar."+h.type)
};
if(!c.support.transition){return d.call(this)
}e.one(c.support.transition.end,c.proxy(d,this)).emulateTransitionEnd(350)
};
b.prototype.toggle=function(f){var d=f?c(f.currentTarget):this;
d.hasClass("in")?this.hide(d):this.show(d)
};
var a=c.fn.toolbar;
c.fn.toolbar=function(d){return this.each(function(){var g=c(this);
var f=g.data("qvc.toolbar");
var e=c.extend({},b.DEFAULTS,g.data(),typeof d=="object"&&d);
if(!f){g.data("qvc.toolbar",(f=new b(this,e)))
}})
};
c.fn.toolbar.Constructor=b;
c.fn.toolbar.noConflict=function(){c.fn.navigation=a;
return this
};
c(window).on("load",function(){c('[data-ride="toolbar"]').each(function(){var e=c(this);
var d=e.data();
e.toolbar(d)
})
})
}(jQuery);
+function(f){var e='[data-ride="video"]';
function b(h,g){this.baseURL="//players.brightcove.net";
this.options=f.extend({},b.DEFAULTS,g);
this.$element=f(h);
this.$body=f("body");
this.$container=f('<div class="modal modal-video fade"><div class="modal-dialog modal-lg modal-vertical-centered"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><div class="modal-content bg-black"></div></div></div>');
this.$player=this.isEmbedded=false;
this.srcLoaded=false;
this.scrollTimer=this.$window=f(window)
}b.DEFAULTS={autoplay:false,reload:false,ratio:"embed-responsive-16by9"};
b.prototype.getEmbedCode=function(){var g,h;
g='<iframe class="embed-responsive-item fade" src="'+this.getPlayerUrl()+'"" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
h=f('<div class="embed-responsive '+this.options.ratio+'">'+g+"</div>");
return h
};
b.prototype.getPlayerUrl=function(){return this.baseURL+"/"+this.options.accountId+"/"+this.options.playerId+"_default/index.html"
};
b.prototype.getVideoID=function(){return this.videoID=this.videoID||this.options.videoID
};
b.prototype.isModal=function(){var g=this.$element.data("theme");
if(!g||g=="modal"){return true
}return false
};
b.prototype.modal=function(){var g=this;
var h=this.$element;
this.$body.addClass("modal-video-in");
this.$container.on("click.dismiss.bs.modal",f.proxy(this.stop,this)).one("embedded.qvc.video",f.proxy(this.load,this));
if(this.videoID){return this.$container.modal("show")
}g.isEmbedded=false;
f(".modal-content",this.$container).empty();
this.$container.find(".modal-content").append(this.getEmbedCode());
this.$container.modal(g.options).one("hidden.bs.modal",function(){g.stop();
h.is(":visible")&&h.trigger("focus");
g.$body.removeClass("modal-video-in")
});
this.$container.on("shown.bs.modal",function(){if(g.isEmbedded){return g.play()
}g.isEmbedded=true;
var j=f.Event("embedded.qvc.video");
g.$container.trigger(j);
if(j.isDefaultPrevented()){return
}})
};
b.prototype.inline=function(){if((this.transitioning||this.$container.hasClass("embed")||this.$container.hasClass("embedded"))&&!this.options.reload){return
}var j=this;
j.isEmbedded=false;
j.$container=c(this.$element);
j.$container.removeClass("embedded").addClass("embed").one("embedded.qvc.video",f.proxy(this.load,this));
var h=f.Event("embed.qvc.video");
j.$container.trigger(h);
if(h.isDefaultPrevented()){return
}this.transitioning=1;
var g=function(l){if(l&&l.target!=j.$container[0]){j.$container.one(f.support.transition.end,f.proxy(g,this));
return
}var k=f("iframe",j.$container);
var m=k.attr("src");
if(!k.length){j.$container.append(j.getEmbedCode())
}m=(!m||m=="")?j.getPlayerUrl():m.substring(0,m.indexOf("?"));
k.attr("src",m);
j.isEmbedded=true;
this.transitioning=0;
j.$container.addClass("embedded").removeClass("embed");
j.$container.trigger("embedded.qvc.video")
};
if(!f.support.transition){return g.call(this)
}j.$container.one(f.support.transition.end,f.proxy(g,this)).emulateTransitionEnd(350)
};
b.prototype.load=function(){var g=this;
var h=f("iframe",g.$container);
var j=h.attr("src")+"?videoId="+g.getVideoID();
h.src=h.attr("src",j);
h.one("load",function(){var k=f.Event("shown.qvc.video");
g.$player=f("iframe",g.$container);
g.$container.trigger(k);
g.play()
})
};
b.prototype.show=function(){this.$element.trigger(f.Event("show.qvc.video"));
this[this.isModal()?"modal":"inline"]()
};
b.prototype.play=function(h){if(!this.isEmbedded){return this.show()
}var g=this;
if(this.options.autoplay){f("iframe",g.$container).each(function(){var k=f(this);
var j=this.contentWindow;
j.postMessage("playVideo","*");
k.addClass("in")
});
if(!h){return
}h()
}else{if(h){h()
}}};
b.prototype.stop=function(){this.$element.trigger(f.Event("stop.qvc.video"));
f("iframe",this.$container).each(function(){var g=this.contentWindow;
g.postMessage("stopVideo","*")
})
};
b.prototype.scrollIntoView=function(){this.$window.on("scroll.qvc.navigation.data-api",f.proxy(this.checkPositionWithEventLoop,this));
this.$element.on("click.play.qvc.video.autoplay",f.proxy(this.videoControlsHandler,this))
};
b.prototype.checkPositionWithEventLoop=function(){clearTimeout(this.scrollTimer);
this.scrollTimer=setTimeout(f.proxy(this.checkPosition,this),1)
};
b.prototype.checkPosition=function(){var g=this;
g.$container=c(g.$element);
g.$player=f("iframe",g.$container);
var h=function(){var m=g.$window.scrollTop();
var l=m+g.$window.height();
var j=g.$container.offset().top;
var k=j+g.$container.height();
return((k>=m)&&(j<=l)&&(k<=l)&&(j>=m))
};
if(h()){if(g.$player.length){g.$player.each(function(){if(g.$container.hasClass("stop")){g.$container.removeClass("stop").addClass("play");
var j=this.contentWindow;
j.postMessage("playVideo","*")
}})
}else{g.$element.video("show");
g.$container.on("shown.qvc.video",function(j){f("iframe",g.$container).each(function(){var l=this.contentWindow;
var k=f(this);
l.postMessage("mutedVideoTrue","*");
l.postMessage("playVideo","*");
g.$container.addClass("play").addClass("mute");
g.$player=k;
g.$player.addClass("in")
})
})
}}else{if(g.$container.hasClass("mute")){g.$player.each(function(){if(g.$container.hasClass("play")){g.$container.removeClass("play").addClass("stop");
var j=this.contentWindow;
j.postMessage("stopVideo","*")
}})
}}};
b.prototype.videoControlsHandler=function(k){var h=this;
var j=f(k.currentTarget);
if(j.is("a")){k.preventDefault()
}var g=function(){var l=f(document).find("iframe.embed-responsive-item").not(h.$player);
l.each(function(){var m=this.contentWindow;
var n=f(this).closest("div.play");
if(n.hasClass("play")){m.postMessage("mutedVideoTrue","*");
m.postMessage("stopVideo","*");
n.removeClass("play").addClass("stop").addClass("mute")
}});
h.$player.addClass("in");
h.$player.each(function(){var m=this.contentWindow;
m.postMessage("mutedVideoFalse","*");
m.postMessage("playVideo","*")
});
h.$container.removeClass("stop").removeClass("mute").addClass("play")
};
if(!h.$player){h.show();
h.$container.on("shown.qvc.video",function(){g()
})
}else{g()
}};
b.prototype.getUID=function(g){do{g+=~~(Math.random()*1000000)
}while(document.getElementById(g));
return g
};
function c(j){var g=j.attr("data-parent");
if(!g){g=j.attr("href");
g=g&&/#[A-Za-z]/.test(g)&&g.replace(/.*(?=#[^\s]*$)/,"")
}var h=g&&f(g);
return h&&h.length?h:j.parent()
}function d(g){return this.each(function(){var m=f(this),h;
var k=m.data("qvc.video");
var l=m.attr("data-target")||(h=m.attr("href"));
var j=f.extend({},{videoID:l},m.data());
if(!k){m.data("qvc.video",(k=new b(this,j)))
}if(typeof g=="string"){k[g]()
}})
}var a=f.fn.video;
f.fn.video=d;
f.fn.video.Constructor=b;
f.fn.video.noConflict=function(){f.fn.video=a;
return this
};
f(document).on("click.qvc.video.data-api",'[data-role="video"]',function(h){var g=f(this);
if(g.is("a")){h.preventDefault()
}d.call(g,"show")
});
f(window).on("load",function(g){f('[data-role="video-auto-play"]').each(function(){var h=f(this);
if(h.is("a")){g.preventDefault()
}h.data("theme","inline");
d.call(h,"scrollIntoView")
})
})
}(jQuery);
+function(d){var j='[data-ride="product"]';
function e(l,k){this.product=this.options=d.extend({},e.DEFAULTS,k);
this.$element=d(l);
this.$body=d("body");
this.$formGroup=this.selectVariant=[];
this.variantAxis=[];
this.variantSelected=this.stockPhaseSummary=this.installmentEligible=false;
this.splitValue=false;
this.flags=[];
this.isSellable=true;
this.popoverTimer=false;
this.productData=null;
this.productTypeVariants=null;
this.selectFields=[];
this.selectTypes=[];
this.mostImportantField=null;
this.variantCorrelation=[];
this.currentMasterCodeSelected=null;
this.currentMasterType=this.numberOfVariants=0;
this.selectedSku=null;
this.firstInstallment=null;
this.standardInstallment=null;
this.optionSelectSlave=null;
this.tsvTimer=this.$modal=d('<div class="modal modal-addto-cart fade"><div class="modal-dialog"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><div class="modal-content"><div class="modal-body"></div></div></div></div>')
}e.DEFAULTS={selectors:{oldPrice:".old-price .price strong",specialPrice:".price-qvc .price strong"},mapSelectLabel:{SIZE2:"Size",COLOR:"Color",DEFAULT:"Variant",SIZE3:"Size",SIZE:"Size",BEDSIZE:"Size",FLAVOUR:"Variant",GENERIC:"Variant",SHAPE:"Shape",TEXTURE:"Variant",JEWELRY:"Material"},mapStockPhase:{INSTOCK:"In stock",ADVANCEORDER:"Advance order",WAITLIST:"Waitlist",SOLDOUT:"Sold out"}};
e.prototype.addToWishlist=function(n){var m=this,l=m.$element.find(".btn-wishlist"),k=d(".popover");
k.remove();
var p=function(t){var s={placement:m.options.placement||"top",content:t.message,container:"body"};
l.popover(s).popover("show");
if(!t.error){l.toggleClass("active")
}l.on("shown.bs.popover",function(){clearTimeout(m.popoverTimer);
m.popoverTimer=setTimeout(function(){l.popover("destroy");
k.remove()
},3000)
})
};
if(!n||n==""){p({content:Granite.I18n.get("It has not be possible to add the product to your wishlist")});
return false
}var q=m.options.resourcePath,o=l.hasClass("active"),r={skn:n,"delete":o};
d.ajax({url:q+".wishlist.json",type:"POST",data:r,success:function(t){var s=t.code;
if(s=="1.1"){d(document).trigger(d.Event("login.qvc.account.data-api"))
}else{p(t)
}},error:function(s){d(document).trigger(d.Event("login.qvc.account.data-api"))
}})
};
e.prototype.countdown=function(){var o=this;
if(!o.options.availableTo||!o.options.timezone){return
}function n(u,t){var x=u,s,v,w,r;
var q=false;
o.tsvTimer=setInterval(function(){var y=x;
v=parseInt(y%60);
y/=60;
s=parseInt(y%60,10);
y/=60;
r=parseInt(y%24,10);
y/=24;
w=parseInt(y,10);
r=r<10?"0"+r:r;
s=s<10?"0"+s:s;
v=v<10?"0"+v:v;
t.html(r+":"+s+":"+v);
if(!q){o.$element.addClass("in");
q=true
}if(--x<0){o.$element.removeClass("in");
clearTimeout(o.tsvTimer)
}},1000)
}var l=moment().tz(o.options.timezone).format("x");
var p=o.options.availableTo;
var k=(p-l)/1000;
var m=d(".timing",o.$element);
n(k,m)
};
e.prototype.details=function(){var m=d('meta[name="data-product-details"]',this.$element).attr("content");
if(!m){return
}var n=jQuery.parseJSON(m);
this.productData=n;
this.stockPhaseSummary=n.stockPhaseSummary;
this.flags=n.flags;
this.isSellable=g(this.flags);
if(!this.isSellable){this.renderNotSellable();
return
}if(n.price.length==0){d(".price-box",this.$element).addClass("hide")
}this.renderQpayOption();
this.showIfItemOnAir();
this.createOrderedSelects();
if(this.numberOfVariants==0){this.renderProductWithoutVariants()
}else{var l=this.$variatMaster.length?this.$variatMaster:this.$variatSlave;
if(d("option",l).length==2){var o=d("option",l).eq(1).val();
l.val(o).trigger("change");
if(l.hasClass("master")&&d("option",this.$variatSlave).length==2){var k=d("option",this.$variatSlave).eq(1).val();
this.$variatSlave.val(k).trigger("change")
}}}};
e.prototype.renderNotSellable=function(){d(".product-options .inventory",this.$element).removeClass("alert alert-stock alert-success hide").addClass("availability small text-uppercase text-primary").text(Granite.I18n.get("Product not available"));
d("#collapseAddToCart",this.$element).collapse("show")
};
e.prototype.createOrderedSelects=function(){var k=this;
this.productTypeVariants=this.productData.variantAxis;
this.productTypeVariants.sort(this.sortByRanking);
d.each(k.productTypeVariants,function(){if(this.variantType!=undefined){k.numberOfVariants+=1;
if(!k.mostImportantField){k.mostImportantField=this.variantType
}}});
d.each(this.productData.sku,function(){var l=this.variantAxis;
var m=this;
if(this.variantAxis){d.each(this.variantAxis,function(){if(g(m.flags)){var n=d(this)[0];
k.selectFields.push({variantType:n.variantType,variantCode:n.variantCode,variantName:n.variantName,variantRanking:n.ranking,inventory:m.inventory.stockPhase,inventoryHtml:k.inventoryHtml(m.inventory.stockPhase,m.inventory.advancedOrderDate),sku:m.sku,price:m.price});
k.updateSelectTypes(k.selectTypes,n,m)
}})
}if(k.productTypeVariants.length>=1){k.correlationOfSelects(l,m)
}});
if(k.numberOfVariants>=1){k.notShowVariantsIfAllSoldOut()
}if(k.numberOfVariants>=1&&k.selectFields.length==0){this.isSellable=false;
d(".product-qty",this.$element).remove();
this.renderNotSellable();
return
}this.renderSelects();
this.onChangeSelect();
this.hideCodeOnlyOneVariantSelect();
this.showInventory()
};
e.prototype.notShowVariantsIfAllSoldOut=function(){var l=this;
var m=0;
if(l.numberOfVariants>1){for(var k in l.variantCorrelation){d.each(l.variantCorrelation[k],function(){if(this.inventory==null||this.inventory.toUpperCase()!="SOLDOUT"){m+=1
}})
}if(m==0){l.hideAddToCart()
}}};
e.prototype.variantAlreadyPresent=function(m,l){var n=this;
var k=d.grep(l,function(o){return o.code==m.variantCode
});
return k.length>0
};
e.prototype.updateSelectTypes=function(n,l,k){var m=this;
if(!n[l.variantType]){n[l.variantType]=[]
}if(!m.variantAlreadyPresent(l,n[l.variantType])){n[l.variantType].push({type:l.variantType,code:l.variantCode,name:l.variantName,ranking:l.ranking,inventory:k.inventory.stockPhase,inventoryHtml:m.inventoryHtml(k.inventory.stockPhase,k.inventory.advancedOrderDate),sku:k.sku,price:k.price})
}};
e.prototype.sortByRanking=function(m,l){var k=m.ranking,n=l.ranking;
if(k==n){return 0
}return k<n?-1:1
};
e.prototype.renderSelects=function(){var l=this;
var k="";
l.optionSelectSlave=new Array();
d.each(l.productTypeVariants,function(){if(this.variantType!=undefined){var m=(this.variantType!=l.mostImportantField||l.numberOfVariants<2)?"slave":"master";
l.$formGroup=d('<div class="form-group"></div>',l.$element);
d("<label>").text(Granite.I18n.get("Select")+" "+l.mappingSelectLabel(this.variantType)).appendTo(l.$formGroup);
var o=d("<select>").addClass("form-control "+m).attr("name","product-variant-"+m).data("variantType",this.variantType).appendTo(l.$formGroup);
d("<option>").text(Granite.I18n.get("Select an option")).attr("value","SELECT").appendTo(o);
var n=l.selectTypes[this.variantType].sort(l.sortByRanking);
if(this.variantType==l.mostImportantField){d.each(n,function(){if(l.numberOfVariants>1){var p=0;
d.each(l.variantCorrelation[this.code],function(){if(this.inventory&&this.inventory.toUpperCase()!="SOLDOUT"){p++
}});
if(p>0){d("<option>").text(this.name).attr("value",this.code).appendTo(o)
}}else{d("<option>").text(this.name).attr("value",this.code).appendTo(o)
}})
}else{d.each(n,function(){l.optionSelectSlave.push(this.code)
})
}d("#product-option-variants",l.$element).append(l.$formGroup)
}});
this.$variatMaster=d('[name="product-variant-master"]',l.$element);
this.$variatSlave=d('[name="product-variant-slave"]',l.$element);
if(this.$variatMaster.length>0){this.$variatSlave.attr("disabled","disabled")
}d("#collapseAddToCart",l.$element).collapse("show")
};
e.prototype.renderSlaveSelects=function(k,l){var m=this;
d('[name="product-variant-slave"] option',m.$element).remove();
this.$variatSlave=d('[name="product-variant-slave"]',m.$element);
d("<option>").text(Granite.I18n.get("Select an option")).attr("value","SELECT").appendTo(m.$variatSlave);
d.each(k,function(){if(d.inArray(this.code,l)!=-1&&(this.inventory&&this.inventory.toUpperCase()!="SOLDOUT")){d("<option>").text(this.name).attr("value",this.code).appendTo(m.$variatSlave)
}})
};
e.prototype.renderProductWithoutVariants=function(){var k=this;
d.each(this.productData.sku,function(){if(this.inventory==null||this.inventory.stockPhase.toUpperCase()!="SOLDOUT"){d(".inventory",k.$element).html(k.inventoryHtml(this.inventory.stockPhase,this.inventory.advancedOrderDate)).removeClass("hide");
d(".input-ctr-product-sku",k.$element).val(this.sku)
}else{k.hideAddToCart()
}})
};
e.prototype.correlationOfSelects=function(l,m){var n=this;
var k="";
d.each(l,function(){if(n.variantCorrelation&&this.variantType==n.mostImportantField){if(!n.variantCorrelation[this.variantCode]){n.variantCorrelation[this.variantCode]=[]
}k=this.variantCode
}});
d.each(l,function(){if(n.variantCorrelation[k]&&this.variantType!=n.mostImportantField){var o={type:this.variantType,code:this.variantCode,name:this.variantName,ranking:this.ranking,inventory:m.inventory.stockPhase,inventoryHtml:n.inventoryHtml(m.inventory.stockPhase,m.inventory.advancedOrderDate),sku:m.sku};
if(n.productData.additionalProperties.splitValue==true){o.price=this.price||m.price
}n.variantCorrelation[k].push(o)
}})
};
e.prototype.inventoryHtml=function(q,m){var o=this;
var k;
var s=Granite.I18n.get(o.options.mapStockPhase[q.toUpperCase()]);
if(q.toUpperCase()=="ADVANCEORDER"&&m){var l=new Date(m);
var r=l.getDate()<10?"0"+l.getDate():l.getDate();
var p=(l.getMonth()+1)<10?"0"+(l.getMonth()+1):(l.getMonth()+1);
var n=r+"/"+p+"/"+l.getFullYear();
k="<strong>"+Granite.I18n.get("Availability:")+"</strong> <span>"+s+" ("+Granite.I18n.get("Delivery from: ")+n+")</span>"
}else{k="<strong>"+Granite.I18n.get("Availability:")+"</strong> <span>"+s+"</span>"
}return k
};
e.prototype.onChangeSelect=function(){var k=this;
d("select.master",k.$element).on("change",function(){d(".popover",k.$element).popover("destroy");
k.currentMasterCodeSelected=d(this).find(":selected").val();
var l=d(".slave :selected").val();
d(document).trigger(d.Event("variant.change.qvc.product",{dataVariants:{type:k.mostImportantField,master:k.currentMasterCodeSelected,slave:l||"SELECT"}}));
var o=false;
var m=k.variantCorrelation[k.currentMasterCodeSelected];
d(".inventory",k.$element).addClass("hide");
if(k.optionSelectSlave.length>0&&k.currentMasterCodeSelected!="SELECT"){k.renderSlaveSelects(k.variantCorrelation[k.currentMasterCodeSelected],k.optionSelectSlave);
var n=d(".slave>option").map(function(){return d(this).val()
});
d.each(m,function(){if(this.code==l){d(".slave",k.$element).val(this.code).trigger("click");
o=this.inventory;
d(".input-ctr-product-sku",k.$element).val(this.sku);
if(k.productData.installmentEligible==true){k.loadQpay(this.price)
}}});
k.$variatSlave.val("SELECT").trigger("click").removeAttr("disabled")
}else{k.$variatSlave.val("SELECT").trigger("click").attr("disabled","disabled")
}})
};
e.prototype.showInventory=function(){var k=this;
d(".slave",k.$element).on("change",function(){d(".popover",k.$element).popover("destroy");
d(".inventory",k.$element).addClass("hide");
var l=d(this).find(":selected").val();
var p="";
var o="";
var m=[];
var n=undefined;
d(document).trigger(d.Event("variant.change.qvc.product",{dataVariants:{type:k.mostImportantField,master:k.currentMasterCodeSelected||"SELECT",slave:l}}));
if(k.variantCorrelation[k.currentMasterCodeSelected]){m=k.variantCorrelation[k.currentMasterCodeSelected];
n=l
}else{m=k.selectTypes[k.mostImportantField];
n=l
}d.each(m,function(){if(this.code==n){o=this.price;
d(".input-ctr-product-sku",k.$element).val(this.sku);
if(k.productData.installmentEligible==true){k.loadQpay(this.price)
}d(".inventory",k.$element).html(this.inventoryHtml).removeClass("hide")
}});
if(o&&o.length>0){k.changePrice(o)
}})
};
e.prototype.isValidAddToCart=function(){var k=this;
var m=true;
var l=d(".product-options .form-control",k.$element);
if(l.length>0){d.each(l,function(){var p=d(this);
var q=p.val();
if(q!="SELECT"){m=true
}else{m=false;
var o=Granite.I18n.get("Please select variant {0}",[k.mappingSelectLabel(p.data("variantType"))]);
var n=d(".btn-add-to-cart").popover({placement:"top",content:Granite.I18n.get(o)});
n.on("show.bs.popover",function(){var r=d(this);
var s=r.data("bs.popover").tip();
s.addClass("popover-danger")
});
n.popover("show");
return false
}})
}return m
};
e.prototype.hideCodeOnlyOneVariantSelect=function(){var l=this;
var m=0;
if(l.numberOfVariants==1){for(var k in l.selectFields){if(l.selectFields[k].inventory==null||l.selectFields[k].inventory.toUpperCase()=="SOLDOUT"){d('.slave option[value="'+l.selectFields[k].variantCode+'"]',l.$element).remove()
}else{m+=1
}}if(m==0){l.hideAddToCart()
}}};
e.prototype.hideAddToCart=function(){d(".product-options",this.$element).html('<div class="alert alert-stock alert-danger "><strong>'+Granite.I18n.get("Availability:")+" </strong><span>"+Granite.I18n.get("Out of stock")+"</span></div>");
d(".product-add-to-cart",this.$element).hide();
d(".product-qty",this.$element).hide();
if(d(".modal-ctr-add-to-cart").length>0){d(".modal-ctr-add-to-cart .button-ctr-text").addClass("ctr-product-out-of-sock")
}};
e.prototype.renderQpayOption=function(){var l=this;
var k=l.productData.installmentEligible;
if(k==true){l.loadQpay(l.productData.price)
}};
e.prototype.loadQpay=function(l){var k=this;
if(!l){l=k.productData.price
}d.each(l,function(){if(this.installmentPlans!=undefined){if(this.installmentPlans["0"].numberOfInstallments>0){d(".ctr-"+this.typeCode).addClass("QpayId_"+this.installmentPlans["0"].id);
if(k.productData.price.length>1){if(this.typeCode!="QVC"){k.generateTextQpay(this)
}}else{k.generateTextQpay(this)
}}}});
d(".span-ctr-qpay",k.$element).show()
};
e.prototype.generateTextQpay=function(n){var m=this;
var k=n.installmentPlans["0"].additionalProperties.firstInstallmentFormatted||null;
var l=n.installmentPlans["0"].additionalProperties.otherInstallmentFormatted||"";
var o=n.installmentPlans["0"].numberOfInstallments||"";
if(k!=l){var p=Granite.I18n.get("Available in {0} installments, the first of {1} and the others of {2} each.",[o,k,l])
}else{var p=Granite.I18n.get("Available in {0} installments of {1} each.",[o,l])
}d(".span-ctr-qpay",m.$element).find(".small-ctr-installment").text(p);
d(".span-ctr-qpay",m.$element).find("label").attr("data-qpay",n.installmentPlans["0"].id)
};
e.prototype.showIfItemOnAir=function(){var l=this;
var k=d(".div-ctr-itemonair-skn",l.$element);
d.each(k,function(){if(l.productData.skn==d(this).attr("data-item-on-air-skn")){d(".label-ctr-onair",l.$element).removeClass("hide")
}})
};
e.prototype.toogleAddToCart=function(){var l=this;
var k=0;
d.each(d(".product-variants select",l.$element),function(){if(d(this).val()=="SELECT"){k+=1
}});
if(k>0){d(".input-ctr-product-sku",l.$element).val("")
}else{}};
e.prototype.mappingSelectLabel=function(k){var l=this;
var m=l.options.mapSelectLabel[k];
if(m){return Granite.I18n.get(m)
}return Granite.I18n.get(l.mappingSelectLabel.GENERIC)
};
e.prototype.changePrice=function(l){var k=this;
if(l.length>1){d(k.options.selectors.oldPrice,k.$element).html(l[0].additionalProperties.formattedValue);
d(k.options.selectors.specialPrice,k.$element).html(l[1].additionalProperties.formattedValue)
}else{d(k.options.selectors.specialPrice,k.$element).html(l[0].additionalProperties.formattedValue)
}};
e.prototype.showModal=function(n){var n=n||this.options.skn;
n=n.toString();
if(n.length<6){return
}var o=n.slice(0,1);
var k=n.slice(1,3);
var m=d(".product-ctr-base-path").data("product-page");
var l=m+"/"+o+"/"+k+"/"+n+".add-to-cart-modal.html";
if(this.$modal.length){d(".modal-body",this.$modal).empty();
d(this.$modal,"body").remove()
}this.$modal.modal({remote:l}).one("loaded.bs.modal",function(){d(".modal-content > div",d(this)).addClass("modal-body");
var p=d('[data-ride="product"]',d(this));
p.product("details")
})
};
function f(k){d('<div class="spinner-container"><div class="spinner-backdrop"></div><div class="spinner spinner-lg"></div></div>').appendTo("body")
}function c(k){if(d(".spinner-container").length){d(".spinner-container").remove()
}}function g(k){var l=k&&k.sellable&&k.webEligible&&(k.deletion!=undefined&&k.deletion==false)&&k.deliverable;
return l
}function h(k){return this.each(function(){var o=d(this),l;
var n=o.data("qvc.product");
var m=d.extend({},e.DEFAULTS,o.data(),typeof k=="object"&&k);
if(!n){o.data("qvc.product",(n=new e(this,m)))
}if(typeof k=="string"){n[k]()
}})
}var b=d.fn.product;
d.fn.product=h;
d.fn.product.Constructor=e;
d.fn.product.noConflict=function(){d.fn.product=b;
return this
};
var a=function(p){var l;
var o=d(this);
var k=o.closest(o.attr("data-target"));
if(k.length==0){return
}var m=d.extend({},k.data(),o.data());
var n=o.attr("data-skn");
h.call(k,m);
if(n){k.data("qvc.product").addToWishlist(n)
}p.preventDefault()
};
d(document).on("click.qvc.wishlist.data-api",".btn-wishlist",a);
d(document).on("ready",function(){d('[data-ride="product"]').each(function(){var k=d(this);
h.call(k,k.data());
k.data("qvc.product").details()
})
});
d(document).on("ready",function(){d('[data-countdown="true"]').each(function(){var k=d(this);
h.call(k,k.data());
k.data("qvc.product").countdown()
})
})
}(jQuery);
+function(d){var c=function(e){this.$element=d(e)
};
c.VERSION="1.0.0";
c.prototype.expandable=function(){var f=this;
var e=f.$element[0];
if(e.scrollHeight<=e.offsetHeight){return
}var g=e.scrollHeight;
var h=d('<div class="text-expandable-indicator">');
h.appendTo(f.$element);
f.$element.on("click",h,function(){if(f.transitioning||f.$element.hasClass("expanded")){return
}var k=d.Event("expand.qvc.text");
f.$element.trigger(k);
this.transitioning=1;
var j=function(l){if(l&&l.target!=f.$element[0]){f.$element.one(d.support.transition.end,d.proxy(j,this));
return
}f.transitioning=0;
f.$element.trigger("expanded.qvc.text").addClass("expanded");
h.remove()
};
f.$element.css({height:g});
if(!d.support.transition){return j.call(this)
}f.$element.one(d.support.transition.end,d.proxy(j,f)).emulateTransitionEnd(350)
})
};
function b(e){return this.each(function(){var g=d(this);
var f=g.data("qvc.text");
if(!f){g.data("qvc.text",(f=new c(this)))
}if(typeof e=="string"){f[e]()
}})
}var a=d.fn.qtext;
d.fn.qtext=b;
d.fn.qtext.Constructor=c;
d.fn.qtext.noConflict=function(){d.fn.qtext=a;
return this
};
d(window).on("load",function(){d(".text-expandable").each(function(){b.call(d(this),"expandable")
})
})
}(jQuery);
$(".ctr-phoneNumberGroup").on("change",".ctr-phonePrefix,.ctr-phoneNumber",function(c){var a=$(c.delegateTarget);
var b=$.trim($(".ctr-phoneNumber",a).val());
if(b&&b.length>0){$(".ctr-phoneNumberAgg",a).val($(".ctr-phonePrefix",a).val()+b.replace(/[\s\+-]*/g,""))
}});
(function(){function b(){var g;
var f=document.getElementsByTagName("html")[0];
if(f.lang){g=f.lang
}return g
}function a(){var g;
var f={it:"it",fr:"fr"};
var h=location.hostname.substring(location.hostname.lastIndexOf(".")+1);
if(f[h]){g=f[h]
}return g
}function e(){var f;
if(f=b()){return f
}else{if(f=a()){return f
}}return"en"
}var d=e();
var c={preferences:{language:d}};
CQ.shared.User.init(c,false);
Granite.I18n.setUrlPrefix("/libs/qvc/dict.")
}());
QVC={};
QVC.CookieStore=function(){};
QVC.CookieStore.prototype=new CQ_Analytics.PersistedSessionStore();
QVC.CookieStore.MODE_COOKIE=CQ_Analytics.SessionPersistence.MODE_COOKIE;
QVC.CookieStore.MODE_COOKIE.COOKIE_NAME="qp";
QVC.CookieStore.prototype.persist=function(){if(this.fireEvent("beforepersist")!==false){var a=new CQ_Analytics.SessionPersistence({container:"ClientContext",mode:QVC.CookieStore.MODE_COOKIE});
a.set(this.getStoreKey(),this.toString());
this.fireEvent("persist")
}};
QVC.CookieStore.prototype.init=function(){this.initialized=true;
this.fireEvent("initialize",this);
if(this.data==null){this.data={}
}var b=new CQ_Analytics.SessionPersistence({container:"ClientContext",mode:QVC.CookieStore.MODE_COOKIE});
if(b){var a=b.get(this.getStoreKey());
if(a){this.setProperties(this.parse(a))
}}};
$.fn.serializeObject=function(c){var d={};
var b=c.serializeArray();
$.each(b,function(){if(d[this.name]!==undefined){if(!d[this.name].push){d[this.name]=[d[this.name]]
}d[this.name].push(this.value||"")
}else{d[this.name]=this.value||""
}});
return d
};
function sanitizeObject(a){var b={};
$.each(a,function(d,e){var c=d.replace("]","").replace("[","_").replace("-","_");
b[c]=e
});
return b
}function getQueryStringParam(a){if(a=(new RegExp("[?&]"+encodeURIComponent(a)+"=([^&]*)")).exec(location.search)){return decodeURIComponent(a[1])
}}function stripHtmlTags(b){var a=document.createElement("DIV");
a.innerHTML=b;
return a.textContent||a.innerText||""
}(function(){function d(e){return/^\s*([a-zA-Z \u00C0-\u00F6\u00F9-\u017E\u0027-]+\s+)*[a-zA-Z\u00C0-\u00F6\u00F9-\u017E\u0027-]+\s*$/.test(b(e))
}function c(e){return/^[a-zA-Z0-9\u00C0-\u00F6\u00F9-\u017E \/.\u0027\\-]*$/.test(b(e))
}function b(e){return e.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ")
}function a(h,g){var j=5;
var m=$(g);
var f=$("#"+m.data("group")||m.closest(".show-hide-form"));
var l=f.attr("id");
var k=l.split("-")[0];
var e=$("#"+k+"-customer-nation",f).val();
if(e&&(e=="LU"||e=="BE")){j=4
}return j
}$.validator.addMethod("min-length",function(f,e){},function(f,e){return"The field cannot be less than than "+e.data("min")+" length."
});
$.validator.addMethod("validemail",function(f,e){return f.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
},Granite.I18n.get("Please enter a valid email"));
$.validator.addMethod("nameValidation",function(f,e){return this.optional(e)||(d($.trim(f))&&$.trim(f).length<=50)
},Granite.I18n.get("Name is not valid. It should contain up to 50 characters. Only alphabetical characters and spaces are allowed."));
$.validator.addMethod("surnameValidation",function(f,e){return this.optional(e)||(d($.trim(f))&&$.trim(f).length<=50)
},Granite.I18n.get("Surname is not valid. It should contain up to 50 characters. Only alphabetical characters and spaces are allowed."));
$.validator.addMethod("creditCardHolderNameValidation",function(f,e){return this.optional(e)||(d($.trim(f))&&$.trim(f).length<=50)
},Granite.I18n.get("Holder name is not valid. It should contain up to 50 characters. Only alphabetical characters and spaces are allowed."));
$.validator.addMethod("addressValidation",function(f,e){return this.optional(e)||(c(f)&&b(f).length<=45)
},Granite.I18n.get("Address is not valid. It should contain up to 45 characters. Only alphanumeric characters and spaces are allowed."));
$.validator.addMethod("doorCodeValidation",function(f,e){return this.optional(e)||(c(f)&&b(f).length<=10)
},Granite.I18n.get("Digicode is not valid. It should contain up to 10 characters. Only alphanumeric characters and spaces are allowed."));
$.validator.addMethod("zipCodeValidation",function(f,e){return this.optional(e)||(/^[0-9]*$/.test(b(f))&&b(f).length==a(this.$form,e))
},function(f,e){return Granite.I18n.get("Zip code is not valid. Only digits are allowed. Length must be equals to "+a(this.$form,e)+".")
});
$.validator.addMethod("addressNumberValidation",function(f,e){return this.optional(e)||(/^[\?a-zA-Z0-9\u00C0-\u00F6\u00F9-\u017E \/.\u0027\\-]*$/.test(b(f))&&b(f).length<=5)
},Granite.I18n.get("Address number is not valid. Only alphanumeric values and spaces are allowed. Length must be up to 5."));
$.validator.addMethod("cityValidation",function(f,e){return this.optional(e)||(c($.trim(f))&&$.trim(f).length<=45)
},Granite.I18n.get("City name is not valid. Only alphabetic and accented characters are allowed. Length must be up to 45."));
$.validator.addMethod("validatePhoneNumber",function(f,e){return !$.trim(f)||/^\d{5,11}$/.test(f)
},Granite.I18n.get("Phone number is not correct. Only numbers will be recorded."));
$.validator.addMethod("additionalAddressValidation",function(f,e){return this.optional(e)||(c(f)&&b(f).length<=38)
},Granite.I18n.get("Additional address is not correct. Maximum length is 38 characters. Only alphabetical characters and spaces are allowed."));
$.validator.setDefaults({showErrors:function(e,f){$.each(f,function(h,g){g.message=Granite.I18n.get(g.message)
});
this.defaultShowErrors()
}});
$.validator.addMethod("creditCardNumberValidation",function(f,e){return $.payment.validateCardNumber(f)
},Granite.I18n.get("Credit card number invalid."));
$.validator.addMethod("creditCardExpiryValidation",function(g,e){var j=g.replace(/ /g,"").split("/");
if(j.length==2){var h=j[0];
var f=j[1];
return $.payment.validateCardExpiry(h,f)&&new Date(f,h+1)>new Date()&&0<h<13
}else{return false
}},Granite.I18n.get("Please enter a valid date. It should be in the format MM/YYYY."));
$.validator.addMethod("creditCardCvcValidation",function(f,e){return $.payment.validateCardCVC(f,$.payment.cardType($("#card-number").val()))
},Granite.I18n.get("Credit card cvc invalid."))
}());
(function(a){if(window.CartCountdown===undefined){window.CartCountdown=function(c,b){this._init(c,b)
};
window.CartCountdown.prototype={interval:undefined,remainingSeconds:undefined,secondsToAlert:undefined,millisToAlert:undefined,minutesMissingAlert:undefined,offset:undefined,minutesThresholdFirstAlert:".ctr-minutes-threshold-first-alert",_init:function(f,d){var b=this;
if(f!=undefined){var c=new Date(f).getTimezoneOffset();
b.offset=(c/60)*(-1);
b.minutesMissingAlert=parseInt(a(b.minutesThresholdFirstAlert).attr("data-alert"));
b.remainingSeconds=parseInt((f-d)/1000);
b.secondsToAlert=parseInt(b.remainingSeconds-((b.minutesMissingAlert*60000)/1000));
b._createTimerDom();
b._countdown();
b.interval=setInterval(function(){b._countdown()
},1000)
}else{var e=Granite.I18n.get("Your cart is expired");
a(".timer-box-ctr").html("<span>"+e+"</span>");
miniCart.cartCore._deleteCart(function(){location.reload()
})
}},_countdown:function(){var b=this;
if(b.remainingSeconds>0){if(b.secondsToAlert==0){var c=Granite.I18n.get("Cart will expire in")+" "+b.minutesMissingAlert+" "+Granite.I18n.get("minutes",null,"cart countdown");
b._showModal(c,false)
}b._updateView(b.remainingSeconds);
b.remainingSeconds--;
b.secondsToAlert--
}else{clearInterval(b.interval);
var d=Granite.I18n.get("Your cart is expired");
a(".timer-box-ctr").html("<span>"+d+"</span>");
b._showModal(d,true);
miniCart.cartCore._deleteCart(function(){location.reload()
})
}},_getCurrentDate:function(){var b=this;
var c=new Date();
var d=c.getTime()+(c.getTimezoneOffset()*60000);
var e=new Date(d+(3600000*b.offset));
return e
},_updateView:function(e){var c=this;
var d=c._formatTime(Math.floor(e/60)%60);
var f=c._formatTime(Math.floor(e%60));
var b=a(".cart-countdown");
b.find(".minutes").text(d);
b.find(".seconds").text(f)
},_clearCountdown:function(){var b=this;
clearInterval(b.interval)
},_formatTime:function(b){return b>9?""+b:"0"+b
},_createTimerDom:function(){var b="<span class='minutes'>00</span>:<span class='seconds'>00</span>";
a(".timer-box-ctr .cart-countdown").html(b)
},_showModal:function(f,e){var d=this;
var c=a(".modal.in");
if(c.length){return
}a(".modal-ctr-countdown-message").text(f);
var b=a(".modal-ctr-countdown");
b.modal("show");
if(e){b.on("hide.bs.modal",function(){miniCart.cartCore._deleteCart(function(){location.reload()
})
})
}}}
}})(jQuery);
(function(a){if(window.CartCore===undefined){window.CartCore=function(b){this._init(b)
};
window.CartCore.prototype={servletUrl:undefined,url:undefined,resourcePath:a(".container-ctr-cart").data("resourcePath"),selectors:{modalAddToCart:".modal-addto-cart"},$spinner:null,$modal:a('<div class="modal modal-message fade"><div class="modal-dialog"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><div class="modal-content"><div class="modal-body"></div></div></div></div>'),_init:function(c){var b=this;
b.url=c;
b.servletUrl=b.url+".commerce.cart.json";
b._setTotalProducts()
},addToCart:function(g,e,l,c,j,h,f){var k=this;
var d="";
var b={};
a.each(e.serializeArray(),function(m,n){b[n.name]=n.value
});
if(l!=""){d="&credit-terms-code="+l;
if(f&&b["product-from"]!="cart"){d+="&index="+f
}}a(document).trigger(a.Event("add.qvc.cart",{formData:e}));
a.ajax({url:k.servletUrl,type:"POST",data:a(e).serialize()+d,success:function(m){a(document).trigger(a.Event("added.qvc.cart",{dataCart:m}));
k._checkAllocatedQuantity(m,j,function(){if(b["product-from"]=="remembered"){var p=b["product-skn"];
k._deleteItemCallRememberAfterToCart(p,function(){a(document).trigger(a.Event("load.qvc."+h))
})
}else{if(b["product-from"]=="cart"){var q=b["product-sku-previous"];
var o=b["product-index"];
k._deleteItemCall({sku:q,index:o,type:h},function(){})
}else{if(b["product-from"]=="wishlist"){a(document).trigger(a.Event("load.qvc.mini",{openMinicart:true}))
}else{var n={openMinicart:(h=="mini")?true:false};
a(document).trigger(a.Event("load.qvc."+h,n))
}}}})
},error:function(m){a(document).trigger(a.Event("error.qvc.cart",{dataCart:m.responseJSON}));
var m=m.responseJSON.errorMessage;
k._showModalWithMessage(m)
}})
},_modifyCart:function(j,f,d,b,h){var c=this;
var e="";
if(d!=""){e=d
}var g={"product-sku":j,"product-quantity":f,"credit-terms-code":e,modifyCart:true};
a(document).trigger(a.Event("modify.qvc.cart"));
a.ajax({type:"POST",url:c.servletUrl,data:g,success:function(k){a(document).trigger(a.Event("modified.qvc.cart",{dataCartItem:k.modifySuccess.sku})).trigger(a.Event("load.qvc.cart"));
c._checkAllocatedQuantity(k,h,function(){})
},error:function(k){a(document).trigger(a.Event("error.qvc.cart",{dataCart:k.responseJSON}));
var k=k.responseJSON.errorMessage;
c._showModalWithMessage(k)
}})
},_modifyQpay:function(j,f,e,b,g){var c=this;
var h="";
if(e!=""){h="&credit-terms-code="+e+"&active="+b
}var d="product-sku="+j+"&index="+f+h;
a(document).trigger(a.Event("modify.qvc.cart"));
a.ajax({type:"POST",url:c.servletUrl,data:d,success:function(k){a(document).trigger(a.Event("modified.qvc.cart")).trigger(a.Event("load.qvc.cart"));
if(a(c.selectors.modalAddToCart)&&g){a(c.selectors.modalAddToCart).modal("hide")
}},error:function(k){a(document).trigger(a.Event("error.qvc.cart",{dataCart:k.responseJSON}));
var k=k.responseJSON.errorMessage;
c._showModalWithMessage(k)
}})
},_deleteItem:function(d,b,e){var c=this;
a(d).off().on("click",function(f){f.preventDefault();
f.stopPropagation();
var h=a(this);
var g=a.extend({},h.data(),h.closest(b).data());
c._deleteItemCall(g,e)
})
},_deleteItemCall:function(d,e){var b=this;
var c=d.cart||"cart";
if(!d.sku&&!d.skn){a(document).trigger(a.Event("error.qvc."+c));
return
}var f=d.skn||d.sku;
var d={"product-sku":f,index:d.index,doDelete:true};
a(document).trigger(a.Event("delete.qvc."+c));
a.ajax({url:b.servletUrl,data:d,type:"POST",success:function(){a(document).trigger(a.Event("deleted.qvc."+c,{dataCartItem:this.data.replace(/\+/g," ").split("&")[0].split("=")[1]}));
a(document).trigger(a.Event("load.qvc."+c))
},error:function(g){console.log("Error: "+g);
a(document).trigger(a.Event("error.qvc.cart",{dataCart:g.responseJSON}))
}})
},_deleteItemRemember:function(d,b,e){var c=this;
a(d).off().on("click",function(f){var h=a(this);
var g=a.extend({},h.data(),h.closest(b).data());
c._deleteItemCallRemember(g.skn,e);
f.preventDefault()
})
},_deleteItemCallRemember:function(c,e){var b=this;
var d={skn:c,isProductRememberForYou:"true","delete":"true"};
a(document).trigger(a.Event("delete.qvc.remmeber"));
a.ajax({url:b.resourcePath+".wishlist.json",data:d,type:"POST",success:function(f){a(document).trigger(a.Event("deleted.qvc.remmeber"));
a('.list-group-remember [data-skn="'+c+'"]').remove();
b._showModalWithMessage(f.message);
e()
},error:function(f){a(document).trigger(a.Event("error.qvc.cart",{dataCart:d}));
b._showModalWithMessage(d.message)
}})
},_deleteItemCallRememberAfterToCart:function(c,e){if(!c){return
}var b=this;
var d={skn:c,isProductRememberForYou:"true","delete":"true"};
a.ajax({url:b.resourcePath+".wishlist.json",data:d,type:"POST",success:function(f){a('.list-group-remember [data-skn="'+c+'"]').remove();
e()
},error:function(f){var g=0
}})
},_getCart:function(b,f,e){var c=this;
var d=c.url+"/jcr:content/cart."+e+".html";
a.get(d,function(g){a(b).html(g);
a(document).trigger(a.Event("loaded.qvc."+e,{dataCart:g}));
f();
c._setTotalProducts();
c._setCountdown()
})
},_deleteCart:function(d){var b=this;
var c=b._getCookieValueOf("cartid");
a.ajax({url:b.servletUrl+"?"+a.param({"cart-id":c,"delete-cart":true,doDelete:true}),type:"POST",success:d,error:function(e){a(document).trigger(a.Event("error.qvc.cart",{dataCart:data}));
console.log("Error: "+e)
}})
},_loadCountdown:function(c,b){if(window.cartCountdown!=null){window.cartCountdown._clearCountdown()
}window.cartCountdown=new CartCountdown(c,b)
},_setCountdown:function(){var c=this;
var f=parseInt(c._getCookieValueOf("totalProducts"));
var d=parseInt(c._getCookieValueOf("targetdate"));
var b=parseInt(c._getCookieValueOf("currentdate"));
if(f>0&&d!=undefined&&b!=undefined&&d>b){c._loadCountdown(d,b)
}else{var e=Granite.I18n.get("Your cart is expired");
a(".timer-box-ctr").html("<span>"+e+"</span>")
}},_getCookieValueOf:function(b){var d=decodeURIComponent(document.cookie.match(new RegExp("qc=([^;]+)")));
var c=d.split(b+":=");
var e=null;
if(c[1]!=undefined){e=c[1].split("|");
e=e[0]
}return e==null?"":e
},_setTotalProducts:function(){var b=this;
var c=b._getCookieValueOf("totalProducts");
if(c!=undefined&&c!="0"&&c!=""){a("#totalProducts").text(c)
}else{a("#totalProducts").text("")
}},_showModalWithMessage:function(c){var b=a(this.selectors.modalAddToCart);
a(".spinner-container").remove();
if(!b.length){b=this.$modal;
b.one("hidden.bs.modal",function(){a(this).remove()
})
}b.find(".modal-body").empty().html('<p class="row-space-top-2 row-space-2 text-center">'+c+"</p>");
b.modal("show")
},_checkAllocatedQuantity:function(c,e,d){var b=this;
if(c.allocatedQuantity!=undefined){if(c.allocatedQuantity==0){b._showModalWithMessage(Granite.I18n.get("It was not possible to add this product to your cart. Please contact our customer service for assistance."))
}else{a(document).trigger(a.Event("success.qvc.cart"));
b._showModalWithMessage(Granite.I18n.get("Only")+" "+c.allocatedQuantity+" "+e+" "+Granite.I18n.get("has been added to the cart."));
d()
}}else{a(document).trigger(a.Event("success.qvc.cart"));
if(a(b.selectors.modalAddToCart)){a(b.selectors.modalAddToCart).modal("hide");
d()
}}}}
}})(jQuery);
(function(a){if(a.Cart===undefined){window.Cart=function(b,c){this._init(b,c)
};
window.Cart.prototype={selectors:{deleteItem:".btn-ctr-delete",deleteItemRemember:".close.btn-ctr-delete-remember",updateCart:".btn-ctr-update-cart",cartContainer:".container-ctr-cart",QPayOption:".btn-crt-qpay"},cartCore:undefined,productModal:undefined,_init:function(c,d){var b=this;
b.cartCore=d;
b.productModal=new ProductModal(b,c);
b.productModal.isCart=a(".container-ctr-cart").length?true:false;
b.productModal.initAddToCart();
b._initializeListeners();
a(document).on("load.qvc.cart",a.proxy(this.loadCart,this)).on("modify.qvc.cart add.qvc.cart delete.qvc.cart delete.qvc.remmeber",b.showSpinner).on("hide.qvc.spinner loaded.qvc.cart error.qvc.cart deleted.qvc.remmeber",b.hideSpinner);
$cart=a('[data-ride="cart"]');
if($cart.length){a(".navbar-qvc").addClass("nav-cart-disabled")
}},showSpinner:function(){if(a("body .spinner-container").length){return
}this.$spinner=a('<div class="spinner-container"><div class="spinner-backdrop"></div><div class="spinner spinner-lg"></div></div>').appendTo("body")
},hideSpinner:function(){this.$spinner&&this.$spinner.remove();
this.$spinner=null
},_initializeListeners:function(){var b=this;
b._initDeleteItemListener();
b._initDeleteItemRemember();
b._initModifyItemListener();
b._initQpayListener()
},_initQpayListener:function(){var b=this;
a(b.selectors.QPayOption).off().on("change",function(d){var c=a(this).closest(".list-group-item");
var e=c.data();
var f=!c.find("label").hasClass("active");
b.cartCore._modifyQpay(e.sku,e.index,e.creditTerms,f,false,function(){},"");
d.preventDefault()
})
},_initModifyItemListener:function(){var b=this;
a(b.selectors.updateCart).off().on("click",function(e){var d=a(this).closest(".list-group-item");
var f=d.data();
var h=d.find(".div-ctr-item-name").html();
var c="";
if(d.find("label").hasClass("active")){c=d.find("label").attr("data-qpay")
}var g=a(this).hasClass("ctr-add")?1:-1;
b.cartCore._modifyCart(f.sku,g,c,function(){},h);
e.preventDefault()
})
},_initDeleteItemListener:function(){this.cartCore._deleteItem(this.selectors.deleteItem,"li",function(){})
},_initDeleteItemRemember:function(){var b=this;
b.cartCore._deleteItemRemember(b.selectors.deleteItemRemember,"li",function(){b._initializeListeners()
})
},loadCart:function(b){that=this;
that.showSpinner();
that.cartCore._getCart(this.selectors.cartContainer,function(){that.hideSpinner();
that._initializeListeners()
},"cart")
}}
}})(jQuery);
(function(a){if(a.MiniCart===undefined){window.MiniCart=function(b,c){this._init(b,c)
};
window.MiniCart.prototype={selectors:{deleteItem:".nav-cart .remove",},cartCore:undefined,_init:function(c,d){var b=this;
b.cartCore=d;
b._initializeListeners();
b.cartCore._setCountdown();
a(document).on("load.qvc.mini",a.proxy(this.loadCart,this)).on("delete.qvc.mini",b.showSpinner).on("loaded.qvc.mini",b.hideSpinner).on("error.qvc.cart",b.hideSpinner);
a(".nav-cart").on("shown.bs.dropdown",a.proxy(this.loadCart,this))
},showSpinner:function(){if(a(".container-ctr-minicart .spinner-container").length){return
}this.$spinner=a('<div class="spinner-container in"><div class="spinner-backdrop"></div><div class="spinner spinner-small"></div></div>').appendTo(".container-ctr-minicart")
},hideSpinner:function(){this.$spinner&&this.$spinner.remove();
this.$spinner=null
},loadCart:function(b){that=this;
that.showSpinner();
that.cartCore._getCart(".container-ctr-minicart",function(){that._initDeleteItemListener();
if(b.openMinicart){a(".nav-cart").addClass("open")
}},"mini")
},_initializeListeners:function(){this._initDeleteItemListener()
},_initDeleteItemListener:function(){this.cartCore._deleteItem(".nav-cart .remove","tr",function(){})
}}
}})(jQuery);
(function(a){if(a.ProductModal===undefined){window.ProductModal=function(c,b){this._init(c,b)
};
window.ProductModal.prototype={errorMessage:"We are sorry, there was en error while processing your request. Please try again later or call our Customer Service",selectors:{addToCart:".ctr-add-to-cart",isPageCartDetail:"#isPageCartDetail",resourceDeleteItemRemember:".container-ctr-cart",deleteItemRemember:".btn-ctr-delete-remember"},cartCore:undefined,cart:undefined,prevSku:undefined,prevQuantity:undefined,prevQpay:undefined,productType:undefined,index:undefined,isCart:false,options:{from:"page"},$container:a('<div class="modal modal-addto-cart fade">   <div class="modal-dialog">       <button type="button" class="close" data-dismiss="modal" aria-label="Close">       <span aria-hidden="true">×</span>       </button>       <div class="modal-content"></div>   </div></div>'),_init:function(c,b){this.cartCore=new CartCore(b)
},initAddToCart:function(){var c=this;
var b=(this.isCart)?this.clickAddToCartCartHandler:this.clickAddToCartHandler;
a(document).delegate(".ctr-modify-cart","click.editcart.qvc.data-api",a.proxy(this.clickEditProductCartHandler,this)).delegate(".btn-ctr-addtocart-modal","click.qvc.modal.data-api",a.proxy(this.clickOpenModalHandler,this)).delegate(".button-ctr-add-to-cart","click.addtocart.qvc.data-api",a.proxy(b,this))
},clickEditProductCartHandler:function(j){var g=this;
var d=a(j.currentTarget);
var f=d.closest(".list-group-item");
var h=f.data();
g.prevSku=h.sku||h.skn;
g.prevQuantity=h.qty;
g.index=h.index;
g.from=h.from||g.options.from;
g.prevQpay=f.find("label");
var b=f.find(".media-body .variant-ctr-code");
var c=Granite.I18n.get("Modify");
g.showModalProduct(c,function(){var e=a(".panel-product");
a(".form-ctr-quantity",e).val(g.prevQuantity).trigger("click");
a.each(b,function(){var k=a(this).attr("data-variant-ctr-code");
a('.product-variants select [value="'+k+'"]',e).parent().val(k).trigger("change")
});
if(g.prevQpay&&g.prevQpay.hasClass("active")){e.find(".btn-qpay").addClass("active")
}else{e.find(".btn-qpay").removeClass("active")
}a('input[name="product-sku"]',e).val(g.prevSku);
a('input[name="product-from"]',e).val(g.from);
a('input[name="product-index"]',e).val(g.index);
a('input[name="product-sku-previous"]',e).val(g.prevSku)
});
j.preventDefault()
},clickOpenModalHandler:function(d){var b=a(d.currentTarget);
var c=b.data("skn");
var f=b.data("from")||this.options.from;
this.prevSku=c.toString();
this.showModalProduct("Add to cart",function(){var e=a(".panel-product");
a('input[name="product-from"]',e).val(f)
});
d.preventDefault()
},clickAddToCartHandler:function(g){var f=this;
var h=a(g.currentTarget);
if(h.hasClass("disabled")){return
}var b=h.closest("div.panel-product");
var l=b.data("qvc.product");
if(!l.isValidAddToCart()){return
}var d=a("form",b);
f.prevSku=a(".input-ctr-product-skn",b).val();
var k=a(".panel-ctr-title",b).text();
var c="";
var j=false;
if(a(".btn-qpay",b).is(":visible")){c=a(".btn-qpay",b).attr("data-qpay");
j=a(".btn-qpay",b).hasClass("active");
if(j==false){c=""
}}this.cartCore.addToCart(function(){},d,c,j,k,type="mini");
g.preventDefault()
},clickAddToCartCartHandler:function(t){var h=this;
var g=a(t.currentTarget);
var c=g.closest("div.panel-product");
var b=c.data("qvc.product");
if(!b.isValidAddToCart()){return
}var f=a(".btn-qpay",c);
var q=a("form",c);
var j=parseInt(a(".form-control-qty :selected",q).val());
var u=a(".panel-ctr-title",c).text();
var d=a(".input-ctr-product-sku",c).val();
var l=f.data("qpay")||"";
var s=f.hasClass("active");
var k=true;
var p=a("input[name=product-from]").val();
var m=h.prevQuantity||0;
var o=m!=j;
var r=h.prevQpay&&f.hasClass("active")!=h.prevQpay.hasClass("active");
if(h.prevSku==d&&p!="remembered"){if(o){k=false;
var n=j-m;
h.cartCore._modifyCart(h.prevSku,n,l,s,u)
}if(r){if(!l){return
}h.cartCore._modifyQpay(h.prevSku,h.index,l,s,k,u)
}}else{l=(s==true)?l:"";
h.cartCore.addToCart(function(){},q,l,s,u,type="cart",h.index)
}event.preventDefault()
},showModalProduct:function(c,j){var g=this;
var f=g.prevSku.slice(0,6);
var h=g.prevSku.slice(0,1);
var b=g.prevSku.slice(1,3);
var e=a(".product-ctr-base-path").data("product-page");
var d=e+"/"+h+"/"+b+"/"+f+".add-to-cart-modal.html";
a(".modal-content",g.$container).empty().append('<div class="modal-body"><div class="spinner-container in"><div class="spinner-backdrop"></div><div class="spinner spinner-small"></div></div><div class="spinner-modal-spacer row-space-top-6 row-space-3"></div></div>');
g.$container.modal("show");
a.ajax({url:d,success:function(k){a(".modal-content",g.$container).html(k);
var l=a('[data-ride="product"]',a(g.$container));
l.product("details");
j()
},error:function(){var k='<div class="modal-body"><p class="row-space-top-2 row-space-2 text-center">'+Granite.I18n.get(g.errorMessage)+"</p></div>";
a(".modal-content",g.$container).html(k)
}})
},_initDeleteItemRemember:function(){var b=this;
a(b.selectors.deleteItemRemember).off().on("click",function(d){d.preventDefault();
var c=a(this).data("skn");
a.ajax({url:a(b.selectors.resourceDeleteItemRemember).data("resource-path")+".wishlist.json",type:"POST",data:{skn:c},success:function(){b._init()
},error:function(e){var e=e.responseText;
console.log(e)
}})
})
}}
}})(jQuery);
QVC.PersonalizationCookieStore=function(){this.STOREKEY="qp";
this.STORENAME="qp"
};
QVC.PersonalizationCookieStore.prototype=new QVC.CookieStore();
QVC.PersonalizationCookieStore.prototype.setLastVisit=function(a){this.setProperty("lastVisit",a)
};
QVC.PersonalizationCookieStore.prototype.getLastVisit=function(){return this.getProperty("lastVisit")
};
(function(a){if(a.Personalization===undefined){a.Personalization=function(){try{this.init()
}catch(b){console.log(b.message,b)
}};
a.Personalization.prototype={DEFAULTS:{devices:[{label:"xs",minWidth:0,maxWidth:799},{label:"sm",minWidth:800,maxWidth:959},{label:"md",minWidth:960,maxWidth:1199},{label:"lg",minWidth:1200}]},topBannerTimeout:10000,init:function(){this.$topBanerCollapsibleElement=a("#navbar-collapse-container-promo");
if(document.cookie.search("(^|; )wcmmode=edit($|;)")===-1){var b=this;
b.showTopBanner();
b.setLastVisit()
}},showTopBanner:function(){var b=this;
if(this.isFirstVisitToday()&&this.isScreenEligible()){this.$topBanerCollapsibleElement.collapse("show");
setTimeout(function(){b.$topBanerCollapsibleElement.collapse("hide")
},this.topBannerTimeout)
}},isScreenEligible:function(){var f=a(".navbar-promo [data-auto-open]").data("autoOpen");
if(f){var e=window.innerWidth?window.innerWidth:document.documentElement.clientWidth;
var g="";
for(var d=0;
d<this.DEFAULTS.devices.length;
d++){var c=this.DEFAULTS.devices[d];
if((!c.minWidth||e>c.minWidth)&&(!c.maxWidth||e<c.maxWidth)){g=c.label
}}var b=f.split(",");
return b.indexOf(g)>=0
}return false
},isFirstVisitToday:function(){var d=new Date();
var c=this._getPersonalizationCookieStore().getLastVisit();
if(c==null||c==""){return true
}var b=new Date(parseInt(c));
if(b instanceof Date&&d instanceof Date){return b.toDateString()!=d.toDateString()
}return false
},setLastVisit:function(){var b=this._getPersonalizationCookieStore();
b.setLastVisit(this.getTimestamp())
},getTimestamp:function(){var b=new Date();
return b.getTime()
},_getPersonalizationCookieStore:function(){var c=new QVC.PersonalizationCookieStore();
var b=CQ_Analytics.ClientContextMgr.getRegisteredStore(c.getStoreKey());
if(b){return b
}if(CQ_Analytics.ClientContextMgr){CQ_Analytics.ClientContextMgr.register(c)
}return c
}}
}a(function(){window.QVC.Personalization=new a.Personalization()
})
})(jQuery);
+function(b){var a=function(){this.selectors={containerElement:".ctr-container-grid",insertInGridElement:".ctr-insert-add-more",addMoreElement:".btn-ctr-addmore",filterElement:".ctr-refinement",sortByToolbarElement:".toolbar-sort-by",sortByItemElement:".ctr-sortby-item",searchPageElement:".title-ctr-search"};
this.paging={recsPerPage:0,currPage:0};
this.refinements="";
this.searchTerm="";
this.sortBy="";
this.$spinner=null;
this.resourcePath=b(this.selectors.containerElement).data("path");
this.productGridSelector="productgrid";
if(b(this.selectors.containerElement).length>0){this.init();
this.initPushState()
}};
a.prototype.init=function(){console.log("Made with ♥ in Milan");
this.$el=b(this.selectors.containerElement);
this.initSearchParams();
this.toggleMoreButton();
b(document).on("mouseleave",".toolbar-sort-by.open",function(d){b(this).removeClass("open")
});
this.$el.on("click",this.selectors.filterElement,b.proxy(this.filterHandler,this)).on("click",this.selectors.addMoreElement,b.proxy(this.moreHandler,this));
b(this.selectors.sortByItemElement).on("click",b.proxy(this.sortHandler,this));
if(b(".title-ctr-search").data("title-inserted")==false){var c=b(".ctr-search-term").data("search-term");
b(".title-ctr-search").data("title-inserted",true);
b(".title-ctr-search").text(c)
}};
a.prototype.initPushState=function(){if(history.replaceState){history.replaceState({magicGrid:true},"")
}b(document).on("loaded.qvc.magic-grid",this.onMagicGridLoadedPushState);
b(window).on("popstate",b.proxy(this.onPopState,this))
};
a.prototype.initSearchParams=function(){this.searchTerm=b(this.selectors.containerElement).data("search-term");
this.paging.recsPerPage=b(this.selectors.addMoreElement).data("size");
this.paging.currPage=1;
this.sortBy=b(this.selectors.sortByToolbarElement).data("sortby");
this.refinements=b(this.selectors.containerElement).data("refinements")
};
a.prototype.filterHandler=function(d){d.preventDefault();
var c=this;
var f=b(d.currentTarget);
f.prop("checked",true);
b(c.selectors.containerElement).data("search-term",f.data("nav"));
c.initSearchParams();
var e=c._buildSearchUrl();
c.reloadMagicGridFromUrl(e)
};
a.prototype.moreHandler=function(d){d.preventDefault();
var c=this;
b(document).trigger(b.Event("load.qvc.magic-grid"));
c.showSpinner();
c.paging.currPage++;
var e=c._buildSearchUrl(c.productGridSelector);
b.ajax({url:e,success:function(f){b(c.selectors.insertInGridElement).before(f);
c.toggleMoreButton();
c.$el.trigger(b.Event("loaded.qvc.magic-grid",{trigger:"more",size:c.paging.recsPerPage,page:c.paging.currPage,url:e}));
c.hideSpinner()
},error:function(g,h,f){console.log("Error: "+f);
c.hideSpinner()
}})
};
a.prototype.sortHandler=function(e){e.preventDefault();
var c=this;
b(document).trigger(b.Event("load.qvc.magic-grid"));
var d=b(e.currentTarget).data("sort");
if(!d){d=""
}b(c.selectors.sortByToolbarElement).data("sortby",d);
c.initSearchParams();
b(".list-group-body input").each(function(g,h){if(b(h).data("nav").indexOf("&sort=")>0){b(h).data("nav",b(h).data("nav").replace(/&sort=([^&]+)/,function(j,k){return"&sort="+d
}))
}else{b(h).data("nav",b(h).data("nav")+"&sort="+d)
}});
var f=c._buildSearchUrl(c.productGridSelector);
b.ajax({url:f,success:function(j){b(c.selectors.insertInGridElement).siblings(".tile-product").remove();
b(c.selectors.insertInGridElement).before(j);
var h=c.sortBy.split("%7C")[0];
var g=c.sortBy.split("%7C")[1];
c.$el.trigger(b.Event("loaded.qvc.magic-grid",{trigger:"sort",sort_type:h,order:g,size:c.paging.recsPerPage,page:c.paging.currPage,url:f}))
},error:function(h,j,g){console.log("Error: "+g)
}})
},a.prototype.reloadMagicGridFromUrl=function(d){var c=this;
b(document).trigger(b.Event("load.qvc.magic-grid"));
c.showSpinner();
b.ajax({url:d,success:function(g){b(c.selectors.containerElement).parent().html(g);
c.init();
c.hideSpinner();
var f=b(".toolbar-products");
var e=f.data();
f.toolbar(e);
c.$el.trigger(b.Event("loaded.qvc.magic-grid",{trigger:"filter",filter_name:"",filter_type:"",size:c.paging.recsPerPage,page:c.paging.currPage,url:d}))
},error:function(f,g,e){console.log("Error: "+e)
}})
};
a.prototype.showSpinner=function(){this.$spinner=b('<div class="spinner-container"><div class="spinner-backdrop"></div><div class="spinner spinner-lg"></div></div>').appendTo("body")
};
a.prototype.hideSpinner=function(){this.$spinner&&this.$spinner.remove();
this.$spinner=null
};
a.prototype.toggleMoreButton=function(){var c=this;
if(c.paging.currPage>=b(c.selectors.addMoreElement).data("count-pages")){b(c.selectors.addMoreElement).hide()
}};
a.prototype.onMagicGridLoadedPushState=function(f){if((f.trigger!="filter"&&f.trigger!="sort")||!f.url){return
}var c=document.createElement("a");
c.href=f.url;
var d=location.search?location.href.replace(location.search,c.search):location.href+c.search;
if(location.href==d){return
}if(history.pushState){history.pushState({magicGrid:true},"",d)
}else{location.href=d
}};
a.prototype.onPopState=function(c){if(c.originalEvent.state&&c.originalEvent.state.magicGrid){this.reloadMagicGridFromUrl(this._buildSearchUrlFromLocation())
}};
a.prototype._buildSearchQueryStr=function(){var c;
if(b(this.selectors.searchPageElement).length==0){c="?refinement="+this.searchTerm
}else{if(this.refinements){c="?refinement="+this.refinements+"&search-term="+this.searchTerm
}else{c="?search-term="+this.searchTerm
}}c=c+"&size="+this.paging.recsPerPage+"&page="+this.paging.currPage;
if(this.sortBy!=""){c=c+"&sort="+this.sortBy
}return c
};
a.prototype._buildSearchUrl=function(c){var d=this.resourcePath+(c?"."+c:"")+".html";
if(this._isQueryString(this.searchTerm)){return d+this.searchTerm+"&page="+this.paging.currPage
}else{return d+this._buildSearchQueryStr()
}};
a.prototype._buildSearchUrlFromLocation=function(){return this.resourcePath+".html"+location.search
};
a.prototype._isQueryString=function(c){return(c.toString().indexOf("?")===0)
};
b(document).ready(function(){window.QvcMagicGrid=new a()
})
}(jQuery);
+function(h){function l(){this.PRODUCT_IMPRESSIONS_SELECTOR=":not(.nav.navbar-nav.navbar-categories .thumbnail-product).thumbnail-product .ctr-product-data,.thumbnail-product-small .ctr-product-data";
this.HEADER_IMPRESSIONS_SELECTOR=".nav.navbar-nav.navbar-categories .thumbnail-product .ctr-product-data";
this.tealiumData=null;
h(document).on("send.qvc.tealium.data-api",h.proxy(C,this));
h(document).on("modified.qvc.cart deleted.qvc.cart",h.proxy(u,this)).on("loaded.qvc.cart",h.proxy(o,this)).on("loaded.qvc.magic-grid",c).on("add.qvc.cart",h.proxy(w,this)).on("add.qvc.review",h.proxy(B,this)).on("submit",".navbar-ctr-search",y).on("submitted.qvc.checkout",D).on("click.qvc.wishlist.data-api",".btn-wishlist",h.proxy(k,this)).on("click",".btn-show-cart",F).on("click.delete.qvc.wishlist.data-api",".btn-ctr-delete-wishlist",h.proxy(b,this)).on("click.login.qvc.account.data-api",".btn-ctr-login",x).on("click.logout.qvc.account.data-api",".btn-ctr-logout",H).on("click.registration-link.qvc.account.data-api",".btn-ctr-registration-link",m).on("successful.login.qvc.account",e).on("successful.registration.qvc.account",d).on("click",'.thumbnail-product a[href][href != "#"], .thumbnail-product-small a[href][href != "#"], .media-product a[href][href != "#"]',h.proxy(t,this)).on("shown.bs.tab",".tabpanel .nav-tabs-product .nav-tabs a",h.proxy(E,this)).on("click",".btn-ctr-checkout",s).on("click",".btn-ctr-cart",j).on("submitted.qvc.checkout-data-request",r);
h("[data-promotion-id]").parent().on("click","a",h.proxy(v,this));
h(document).on("loaded.qvc.magic-grid",h.proxy(a,this));
this.pendingEvents=[];
this.queueEvent=function(J){this.pendingEvents.push(J)
};
this.processEvents=function(){for(var J=0;
J<this.pendingEvents.length;
J++){h(document).trigger(this.pendingEvents[J])
}}
}function C(Q){if(typeof utag!=="undefined"){var L=Q.tealiumData;
var P=Q.addImpressions;
var K=Q.impressionsSelector;
if(L){if(P){if(!L.event){L.event="pageView"
}var N=K?h(K):h(this.PRODUCT_IMPRESSIONS_SELECTOR);
A(L,N);
q(L)
}if(L.event=="pageView"){if(typeof tealiumAdditionalPropertiesJSON!=="undefined"&&tealiumAdditionalPropertiesJSON){try{var J=JSON.parse(tealiumAdditionalPropertiesJSON);
for(var M=0;
M<J.length;
M++){var O=J[M];
L[O.key]=O.value
}}catch(Q){}}utag.view(L);
this.tealiumData=L
}else{utag.link(L)
}}}else{this.queueEvent(Q)
}}function s(J){if(typeof utag!=="undefined"){utag.link({event_category:"Conversions",event_action:"click",event_label:"initiateCheckout"})
}}function j(J){if(typeof utag!=="undefined"){utag.link({event_category:"Conversions",event_action:"click",event_label:"initiateCart"})
}}function d(J){if(typeof utag!=="undefined"){utag.link({event_category:"Conversions",event_action:"done",event_label:"signUpSuccess"})
}}function e(J){if(typeof utag!=="undefined"){utag.link({event_category:"Conversions",event_action:"done",event_label:"signInSuccess"})
}}function m(J){if(typeof utag!=="undefined"){utag.link({event_category:"Interactions",event_action:"click",event_label:"signUp"})
}}function H(J){if(typeof utag!=="undefined"){utag.link({event_category:"Interactions",event_action:"done",event_label:"signOut",})
}}function F(J){if(typeof utag!=="undefined"){utag.link({event_category:"Conversions",event_action:"click",event_label:"initiateCart"})
}}function y(J){if(typeof utag!=="undefined"){utag.link({event_category:"Interactions",event_action:"click",event_label:"search",event_context:h(J.currentTarget).parent().find("input").val()})
}}function x(J){if(typeof utag!=="undefined"){utag.link({event_category:"Interactions",event_action:"click",event_label:"signIn"})
}}function v(N){var J=h(N.delegateTarget).find("[data-promotion-id]");
var K=J.data("promotionId");
if(K&&this.tealiumData){var M={enh_action:"promo_click",enh_promo_id:[K]};
if(this.tealiumData.enh_promo_id){for(var L=0;
L<this.tealiumData.enh_promo_id.length;
L++){if(this.tealiumData.enh_promo_id[L]==K){M.enh_promo_name=[this.tealiumData.enh_promo_name?this.tealiumData.enh_promo_name[L]:null];
M.enh_promo_creative=[this.tealiumData.enh_promo_creative?this.tealiumData.enh_promo_creative[L]:null];
M.enh_promo_position=[this.tealiumData.enh_promo_position?this.tealiumData.enh_promo_position[L]:null]
}}}if(typeof utag!="undefined"){utag.link(M)
}}}function b(L){var K=h(L.currentTarget).parents("[data-cart='wishlist']").data();
var J={event_category:"Conversions",event_action:"remove",event_label:"wishList",event_position:(h(".btn-ctr-delete-wishlist").index(h(L.currentTarget))+1).toString(),event_location:"My Wishlist",event_product_name:K.name,event_product_id:K.skn?K.skn.toString():"",event_product_price:K.price?K.price.toString():""};
if(typeof utag!="undefined"){utag.link(J)
}}function t(N){var L=h(N.currentTarget).filter(".ctr-product-data");
var K=L.data("skn");
if(K&&L.length>0&&this.tealiumData){var M=G(this.tealiumData,K);
if(!M.enh_impression_name){var O=I(h(this.HEADER_IMPRESSIONS_SELECTOR));
M=G(O,K)
}var J={event_position:M.enh_impression_position,event_location:M.enh_impression_list,event_product_category_name:M.enh_impression_category,event_product_vendor_name:M.enh_impression_brand,event_product_name:M.enh_impression_name,event_product_id:K,event_product_price:M.enh_impression_price,enh_action:"product_click",product_action_list:M.enh_impression_list,enh_product_id:[K],enh_product_name:[M.enh_impression_name],enh_product_brand:[M.enh_impression_brand],enh_product_category:[M.enh_impression_category],enh_product_unit_price:[M.enh_impression_price],enh_product_position:[M.enh_impression_position]};
if(typeof utag!="undefined"){utag.link(J)
}}}function E(K){if(h(".product-view").length>0){var J={event_category:"Interactions",event_action:"switch",event_label:"tab",event_context:K.currentTarget.innerHTML};
if(this.tealiumData){J.event_product_category_name=this.tealiumData.enh_impression_category;
J.event_product_vendor_name=this.tealiumData.product_vendor_name;
J.event_product_vendor_id=this.tealiumData.product_vendor_id;
J.event_product_name=this.tealiumData.product_name;
J.event_product_id=this.tealiumData.product_id;
J.event_product_price=this.tealiumData.product_price_local
}if(typeof utag!="undefined"){utag.link(J)
}}}function B(K){var J={event_category:"Interactions",event_action:"add",event_label:"review"};
if(this.tealiumData){J.event_product_category_name=this.tealiumData.enh_impression_category;
J.event_product_vendor_name=this.tealiumData.product_vendor_name;
J.event_product_vendor_id=this.tealiumData.product_vendor_id;
J.event_product_name=this.tealiumData.product_name;
J.event_product_id=this.tealiumData.product_id;
J.event_product_price=this.tealiumData.product_price_local
}if(typeof utag!="undefined"){utag.link(J)
}}function w(O){var R;
var K=O.formData;
if(K){var P=K.find(".product-info");
if(P.microdata().length>0){R=P.microdata()[0]
}}if(R&&K){var L="";
if(K.find(".form-control.master option:selected").length>0){L+=K.find(".form-control.master option:selected").value()
}if(K.find(".form-control.slave option:selected").length>0){L+=L.length>0?"||"+K.find(".form-control.slave option:selected").value():K.find(".form-control.slave option:selected").value()
}var J="";
if(this.tealiumData){J=this.tealiumData.page_type;
var M=G(this.tealiumData,R.productID);
if(M&&M.enh_impression_list){J=M.enh_impression_list
}}var N=h.fn.serializeObject(K);
var Q={event_position:"1",event_location:J,event_product_category_name:R.category,event_product_vendor_name:R.brand.name,event_product_vendor_id:P.additionalProperty("brandId"),event_product_name:R.name,event_product_id:R.productID,event_product_price:R.offers.price,enh_action:"add",product_action_list:J,enh_product_name:[R.name],enh_product_brand:[R.brand.name],enh_product_category:[R.category],enh_product_position:["1"],enh_product_variant:[L],enh_product_unit_price:[R.offers.price],enh_product_quantity:[N["product-quantity"]],enh_product_id:[R.productID]};
if(typeof utag!="undefined"){utag.link(Q)
}}}function k(N){var M={event_category:"Conversions",event_action:"add",event_label:"wishList",event_position:"1"};
var J=h(N.currentTarget).parents(".product-view");
if(J.length>0){if(this.tealiumData){M.event_location=this.tealiumData.page_type;
M.event_product_category_name=this.tealiumData.enh_product_category;
M.event_product_vendor_name=this.tealiumData.product_vendor_name;
M.event_product_vendor_id=this.tealiumData.product_vendor_id;
M.event_product_name=this.tealiumData.product_name;
M.event_product_id=this.tealiumData.product_id;
M.event_product_price=this.tealiumData.product_price_local
}}else{var O=h(N.currentTarget).parents(".thumbnail-product, .thumbnail-product-small").find(".ctr-product-data");
var K=O.data("skn");
if(K&&O.length>0&&this.tealiumData){var L=G(this.tealiumData,K);
M.event_location=L.enh_impression_list;
M.event_product_category_name=L.enh_impression_category;
M.event_product_vendor_name=L.enh_impression_brand;
M.event_product_name=L.enh_impression_name;
M.event_product_id=L.enh_impression_id;
M.event_product_price=L.enh_impression_price
}}if(M.event_product_id&&typeof utag!="undefined"){utag.link(M)
}}function c(O){if(O.trigger!="more"&&O.trigger!="sort"&&O.trigger!="filter"){return
}var K=O.target;
var M=h(O.target).find(".tile-product .ctr-product-data");
var L=O.size*(O.page-1);
var N=M.slice(L,M.length);
if(O.trigger=="more"){var R={event_category:"Interactions",event_action:"click",event_label:"moreProducts"}
}else{if(O.trigger=="sort"){if(O.order!=="undefined"&&O.order=="0"){O.order="asc"
}else{if(O.order!=="undefined"&&O.order=="1"){O.order="desc"
}}var R={event_category:"Interactions",event_action:"apply",event_label:"Sort",event_context:O.order,event_position:O.sort_type}
}else{if(O.trigger=="filter"){var Q=h(K).find("input[type='checkbox']:checked").closest("label");
h.merge(Q,h(K).find("a.ctr-refinement"));
var P=new Array();
var J=new Array();
h.each(Q,function(S,U){var T=h(U).parents(".list-group").find(".list-group-heading");
P.push(h(U).text());
J.push(h(T).text())
});
var R={event_category:"Interactions",event_action:"apply",event_label:"Filters",event_context:P.join("||"),event_position:J.join("||")}
}}}A(R,N,L);
if(typeof utag!="undefined"){utag.link(R)
}}function r(J){var K=h("#tv-source").find(":selected").value();
if(typeof utag!="undefined"){utag.link({event_category:"Conversions",event_action:"click",event_label:"clientSource",event_context:K})
}}function D(L){if(typeof utag!=="undefined"){var J=L.tealiumData;
var K=L.Overrides_corder;
h.extend(J,{event_category:"Conversions",event_action:"done",event_label:"orderSuccess",order_type:"web",Overrides_corder:K,Overrides_cstore:"website",enh_action:"purchase"});
if(typeof J!=="undefined"){utag.link(J)
}}}function u(N){var M=N.type;
var L=N.dataCartItem;
var K=h(N.currentTarget.activeElement).attr("class");
if(typeof K=="undefined"){return
}var J=K.indexOf("ctr-remove")!=-1?true:false;
this.cartModificationDeferred=h.Deferred();
h.when(this.cartModificationDeferred).done(h.proxy(f,this,M,L,J,h("li[data-sku='"+L+"']").data()))
}function o(J){if(this.cartModificationDeferred){this.cartModificationDeferred.resolve()
}}function f(O,M,K,P){var N=(O=="deleted"?P:h("li[data-sku='"+M+"']").data());
var L=g(N.sku);
if(N&&O&&(O=="modified"||O=="deleted")){var J={event_product_vendor_name:N.brandName,event_product_name:N.name,event_product_id:L,event_product_price:N.price,enh_product_name:[N.name],enh_product_brand:[N.brandName],enh_product_unit_price:[N.price],enh_product_id:[L],enh_product_variant:[N.variant]};
if(O=="modified"){J.event_amount=h("[data-sku='"+M+"'] [value]")?h("[data-sku='"+M+"'] [value]").attr("value"):"";
J.enh_action=K?"remove":"add";
J.enh_product_position=[(N.index+1).toString()];
J.enh_product_quantity=[h("[data-sku='"+M+"'] [value]")?h("[data-sku='"+M+"'] [value]").attr("value"):""];
J.product_action_list=this.tealiumData.page_type
}else{if(O=="deleted"){J.enh_action="remove";
J.event_amount="0";
J.enh_product_quantity=["0"]
}}if(typeof utag!=="undefined"){utag.link(J)
}}}function a(O){if(O.order!=="undefined"&&O.order=="0"){O.order="asc"
}else{if(O.order!=="undefined"&&O.order=="1"){O.order="desc"
}}var L=[];
var N=h(O.target).find(".list-group.product-category-group").find(".ctr-refinement");
if(N.length>0&&N.text()){L.push(N.text())
}h(O.target).find("input[type='checkbox']:checked").closest("label").each(function(P,Q){L.push(h(Q).text())
});
var K=null;
var M=h(".btn-ctr-addmore").data("size");
if(M){K=Math.floor((h(".magicgrid .thumbnail-product .ctr-product-data").length-1)/M)+1
}var J={page_type:this.tealiumData&&this.tealiumData.page_type?this.tealiumData.page_type:window.tealiumPageType,product_quantity_total:h(".magicgrid nav").data("total-products"),search_sort_type:O.sort_type,search_sort_context:O.order,event:"pageView"};
if(window.tealiumPageType=="BrandCatalog"){h.extend(J,{product_vendor_name:window.product_vendor_name,product_vendor_id:window.product_vendor_id,product_group_name:window.product_group_name,catalog_list:"grid",page_number:K,is_catalog_filter:1,catalog_filter_name:L.join("||"),})
}else{if(window.tealiumPageType=="SearchResults"){h.extend(J,{customer_search_terms:window.customer_search_terms,system_search_terms:window.system_search_terms,})
}else{if(window.tealiumPageType=="CategoryCatalog"){h.extend(J,{product_category_name:window.product_category_name,product_category_id:window.product_category_id,product_group_name:window.product_group_name,product_group_id:window.product_group_id,catalog_list:"grid",page_number:K,is_catalog_filter:1,catalog_filter_name:L.join("||"),})
}}}h(document).trigger(h.Event("send.qvc.tealium.data-api",{tealiumData:J,addImpressions:true}))
}function g(K){var J=K.split(" ");
return J[0]
}function q(J){var K=h("[data-promotion-id]");
if(K.length>0){var L={enh_promo_id:[],enh_promo_name:[],enh_promo_creative:[],enh_promo_position:[]};
var M=0;
var N=0;
h.each(K,function(P,Q){var O=h(Q);
L.enh_promo_id.push(O.data("promotionId"));
L.enh_promo_name.push(O.data("promotionName"));
L.enh_promo_creative.push(O.data("promotionCreative"));
if(O.parents("nav").length>0){L.enh_promo_position.push("header_"+M++)
}else{L.enh_promo_position.push("body_"+N++)
}});
h.extend(J,L)
}}function A(K,M,N){var J=K.page_type;
var L=z(M,N,J);
h.extend(K,L)
}function z(M,N,K){var L={enh_impression_id:[],enh_impression_name:[],enh_impression_price:[],enh_impression_brand:[],enh_impression_category:[],enh_impression_position:[],enh_impression_list:[]};
var J=[];
h.each(M,function(P,Q){var R=h(Q).data();
if(R){var O=p(h(Q),K);
L.enh_impression_list.push(O);
L.enh_impression_id.push(R.skn?R.skn.toString():"");
L.enh_impression_name.push(R.name?R.name.toString():"");
L.enh_impression_price.push(R.price?R.price.toString():"");
L.enh_impression_brand.push(R.brand?R.brand.toString():"");
L.enh_impression_category.push(R.category?R.category.toString():"");
J[O]=(J[O]?J[O]:0)+1;
L.enh_impression_position.push(((N?N:0)+J[O]))
}});
return L
}function I(L){var K={enh_impression_id:[],enh_impression_name:[],enh_impression_price:[],enh_impression_brand:[],enh_impression_category:[],enh_impression_position:[],enh_impression_list:[]};
var J=[];
h.each(L,function(N,O){var P=h(O).data();
if(P){var M="header_"+h(O).parents("[data-dropdown-title]").data("dropdownTitle");
K.enh_impression_list.push(M);
K.enh_impression_id.push(P.skn?P.skn.toString():"");
K.enh_impression_name.push(P.name?P.name.toString():"");
K.enh_impression_price.push(P.price?P.price.toString():"");
K.enh_impression_brand.push(P.brand?P.brand.toString():"");
K.enh_impression_category.push(P.category?P.category.toString():"");
J[M]=(J[M]?J[M]:0)+1;
K.enh_impression_position.push(J[M])
}});
return K
}function p(J,K){var L=J.parents("section").find(":header");
var M=n(L);
if(M){M=h(M).text()
}else{M=K
}return h.trim(M)
}function n(J,L){if(typeof L==="undefined"){return n(J,1)
}else{if(L>6||J==="undefined"){return null
}else{var K=J.filter("h".concat(L.toString()));
if(K.length>0){return K[0]
}else{return n(J,L+1)
}}}}function G(K,M){var L={enh_impression_id:null,enh_impression_name:null,enh_impression_category:null,enh_impression_brand:null,enh_impression_price:null,enh_impression_position:null,enh_impression_list:null};
if(K.enh_impression_id){for(var J=0;
J<K.enh_impression_id.length;
J++){if(K.enh_impression_id[J]==M){L.enh_impression_id=K.enh_impression_id?K.enh_impression_id[J]:null;
L.enh_impression_name=K.enh_impression_name?K.enh_impression_name[J]:null;
L.enh_impression_category=K.enh_impression_category?K.enh_impression_category[J]:null;
L.enh_impression_brand=K.enh_impression_brand?K.enh_impression_brand[J]:null;
L.enh_impression_price=K.enh_impression_price?K.enh_impression_price[J]:null;
L.enh_impression_position=K.enh_impression_position?K.enh_impression_position[J]:null;
L.enh_impression_list=K.enh_impression_list?K.enh_impression_list[J]:null;
break
}}}return L
}window.QvcTealium=new l()
}(jQuery);
+function(a){if(a.login===undefined){a.login=function(){};
a.login.prototype={selectors:{loginElement:"a.btn-ctr-login",profilePictureElement:"img.img-ctr-profile",logoutElement:"a.btn-ctr-logout",accountMenuNameElement:".nav-signin .ctr-name",formElement:"#loginForm",formErrorElement:"#loginForm .text-ctr-error",linkValidateElement:"a.ctr-validate"},isModal:(a("body").find("#qvcLogin").length)?true:false,userDataStorageName:"qi",authenticationStorageName:"qa",isLoggedIn:false,$modal:a('<div class="modal fade" id="qvcLogin" tabindex="-1" role="dialog" aria-labelledby="Login" aria-hidden="true">   <div class="modal-dialog modal-lg">       <button type="button" class="close" data-dismiss="modal" aria-label="Close">       <span aria-hidden="true">×</span>       </button>       <div class="modal-content">       </div>   </div></div>'),showSpinner:function(){if(a("#qvcLogin .spinner-container").length){return
}this.$spinner=a('<div class="spinner-container"><div class="spinner-backdrop"></div><div class="spinner spinner-lg"></div></div>').appendTo("#qvcLogin .modal-content")
},hideSpinner:function(){this.$spinner&&this.$spinner.remove();
this.$spinner=null
},init:function(){var d=this;
a(document).on("successful.login.qvc.account",d.qvcLoginEventHandler);
d.validateForm();
d.initLoginForm();
var f=new CookieHandler(d.userDataStorageName);
var e=f.getValues();
var b=e.firstName;
var c=e.profilePicture;
if(c&&c.substr(0,5)=="http:"&&c.indexOf("twimg.com")!=-1){c="https"+c.substr(4)
}a(document).on("login.qvc.account.data-api",a.proxy(this.loginModaHandler,this));
if(b||c){a(".btn-ctr-login").off("click.login.qvc.account.data-api");
d.initAccountButton(b,c)
}else{d.initLoginButton()
}},initLoginButton:function(){a(".btn-ctr-login").on("click.login.qvc.account.data-api",a.proxy(this.loginModaHandler,this))
},loginModaHandler:function(c){var b=this;
var d=a(".btn-ctr-login").data("url");
if(!a(b.selectors.modalElement).length){b.$modal.modal({remote:d});
b.$modal.on("loaded.bs.modal",a.proxy(b.showModalHandler,b));
b.$modal.on("hidden.bs.modal",a.proxy(b.hiddenModalHandler,b))
}else{b.$modal.modal("show")
}},showModalHandler:function(f){var c=this;
var d=a(f.currentTarget);
a("input:hidden[name=j_validate]",d).val("true");
var b=a(f.relatedTarget);
c.validateForm();
c.initLoginForm()
},hiddenModalHandler:function(f){var d=this;
var b=a(f.currentTarget).find("form");
if(b.length){b.find(".text-ctr-error").addClass("hide");
b.find("input").not('[type="hidden"]').val("");
var c=b.validate();
if(c){c.resetForm();
b.find(".form-group").removeClass("has-error")
}}},initAccountButton:function(c,b){if(c){this.setFirstName(c);
this.setProfilePicture(b);
a(this.selectors.loginElement).addClass("customer-logged dropdown-toggle").attr("href","#").attr("data-toggle","dropdown").attr("data-target",null)
}},setFirstName:function(c){if(c){var b="";
if(!this.isLoggedIn){b+=Granite.I18n.get("You are not")+" "+c+"? "
}b+=Granite.I18n.get("Logout");
a(this.selectors.accountMenuNameElement).html(c);
a(this.selectors.logoutElement).text(b)
}},setProfilePicture:function(b){if(b&&b.length>0&&b!="null"){a(this.selectors.profilePictureElement).attr("src",b)
}},initLoginForm:function(){var c=this;
var d=(c.isModal)?this.$modal:a("body");
var b=a(c.selectors.formElement,d);
b.off("submit");
b.submit(function(e){e.preventDefault();
c.authenticate(a(e.currentTarget))
})
},initValidateLink:function(){var c=this;
var b=a(c.selectors.linkValidateElement);
b.click(function(e){e.preventDefault();
var d=a("#loginForm").data("resource-path")+".account.confirmation.json?mail="+a("#j_username").val();
var f=Granite.I18n.get("A problem occurred while sending the confirmation email.");
a.ajax({url:d,success:function(h){if(h){if(h.status==="OK"){f=Granite.I18n.get("We sent you an email with instructions on how to confirm your account.")
}var g=a(c.selectors.formErrorElement);
g.text(f);
g.show()
}},error:function(g){console.log("Error: "+g);
var g=a(c.selectors.formErrorElement);
g.text(f);
g.show()
}});
return false
})
},authenticate:function(d){var c=this;
var b=d.attr("action");
var f=d.serialize();
var e=getQueryStringParam("resource");
if(e){f=f.concat("&resource="+e)
}if(d.valid()){c.showSpinner();
a.ajax({url:b,type:"POST",data:f,success:function(h){c.hideSpinner();
if(h){if(h.status==="OK"){a(document).trigger(a.Event("successful.login.qvc.account",{responseData:h.data}))
}if(h.status==="KO"){var g=a(c.selectors.formErrorElement);
if(h.data.err){var j=g.text();
j=j+" "+h.data.err
}g.removeClass("hide")
}}},error:function(j,m,h){c.hideSpinner();
console.log("Error: "+h+" code="+j.responseText);
var g=a(c.selectors.formErrorElement);
if(g){if(j.responseText.indexOf("2.10")>=0){var l=Granite.I18n.get("Your account is not yet confirmed. Click here to send the confirmation email again.");
var k=l+' <a href="" class="ctr-validate">'+Granite.I18n.get("Send")+"</a>";
g.html(k);
c.initValidateLink()
}g.removeClass("hide")
}}})
}},validateForm:function(){var c=this;
var d=(c.isModal)?this.$modal:a("body");
var b=a(c.selectors.formElement,d);
b.validate({rules:{j_username:{required:true,maxlength:40,email:true,},j_password:{required:true,minlength:6,}},messages:{j_username:{required:Granite.I18n.get("Please enter your email"),email:Granite.I18n.get("Please enter a valid email address.")},j_password:{required:Granite.I18n.get("Please enter your password"),minlength:Granite.I18n.get("Your password must be at least 6 characters."),}},highlight:function(e){a(e).closest(".form-group").addClass("has-error")
},unhighlight:function(e){a(e).closest(".form-group").removeClass("has-error")
},errorElement:"span",errorClass:"help-block",errorPlacement:function(e,f){f.closest(".form-group").append(e)
}})
},qvcLoginEventHandler:function(c){a.login.prototype.init();
var b=c.responseData;
if(b&&b.redirect){window.location=b.redirect
}if(a("#qvcLogin").length>0){a("#qvcLogin").modal("hide")
}a(document).trigger(a.Event("load.qvc.mini"))
}}
}window.login=new a.login();
a(document).ready(function(){login.init()
})
}(jQuery);
(function(e){e.fn.items=function(g){return this.find("[itemscope]:not([itemprop])").filter(function(){return !g||e.inArray(g,b.call(this,"itemtype").get())!==-1
})
};
e.fn.property=function(g){return c.apply(this).filter(function(){return e.inArray(g,b.call(this,"itemprop").get())!==-1
})
};
e.fn.additionalProperty=function(g){var h;
e.each(this.property("additionalProperty").values(),function(j,k){if(k.name.indexOf(g)!==-1){h=k.value
}});
return h
};
e.fn.value=function(g){if(typeof g==="undefined"){return f.call(this)
}f.call(this,g)
};
e.fn.values=function(g){return this.map(function(){var h=e(this);
return h.is("[itemscope]")?a.call(h,g):f.call(h)
}).get()
};
e.fn.microdata=function(h){switch(typeof h){case"undefined":case"boolean":return this.map(function(){return a.call(e(this),h)
}).get();
case"string":if(arguments.length===1){return this.property(h).value()
}this.property(h).value(arguments[1]);
return this;
case"object":var g=this;
e.each(h,function(j,k){g.property(j).value(k)
});
return this
}};
var d=function(h){var g=h;
while(g.parentNode&&g.parentNode.nodeType===1){g=g.parentNode
}return e(g)
};
var c=function(){if(!this.length){return e([])
}var g=d(this.get(0));
var j=b.call(this,"itemref").map(function(k,l){return g.find("#"+l).get(0)
});
var h=e.merge(e(j),this);
return h.find("[itemprop]").not(h.find("[itemscope] [itemprop]"))
};
var b=function(g){return e(this).map(function(){return(this.getAttribute(g)||"").split(/\s+/)
}).filter(function(){return this.length
})
};
var f=function(j){var g=j==null;
if(this.is("[itemscope]")){if(!g){throw"Not allowed to set the value of an itemscope node"
}return this
}var h=this.get(0);
if(h){switch(h.nodeName){case"META":return g?e.trim(this.attr("content")):this.attr("content",j);
case"DATA":return g?e.trim(this.attr("value")):this.attr("value",j);
case"METER":return g?e.trim(this.attr("value")):this.attr("value",j);
case"TIME":if(g){if(this.attr("datetime")){return e.trim(this.attr("datetime"))
}return e.trim(this.text())
}return this.attr("datetime",j);
case"AUDIO":case"EMBED":case"IFRAME":case"IMG":case"SOURCE":case"TRACK":return g?h.src:this.attr("src",j);
case"A":case"AREA":case"LINK":return g?h.href:this.attr("href",j);
case"OBJECT":return g?h.data:this.attr("data",j);
default:return g?e.trim(this.text()):this.text(j)
}}};
var a=function(g){if(this.length>1){return this.map(function(){return a.call(e(this),g)
}).get()
}var h={type:g?b.call(this,"itemtype").get():b.call(this,"itemtype").get(0)};
c.call(this).map(function(){var j=e(this);
var k=j.value();
if(k instanceof jQuery){k=a.call(k,g)
}b.call(this,"itemprop").each(function(m,l){if(g){if(typeof h[l]=="undefined"){h[l]=[]
}h[l].push(k)
}else{if(typeof h[l]=="undefined"){h[l]=k
}else{if(e.isArray(h[l])){h[l].push(k)
}else{h[l]=[h[l],k]
}}}})
});
return h
}
}(jQuery));