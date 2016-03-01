/** Licensed Materials - Property of IBM, 5724-E76 and 5724-E77, (C) Copyright IBM Corp. 2011, 2012 - All Rights reserved.  **/
(function(){
i$.Promise=function(){
this._cbs=[];
this._stat=-1;
};
i$.promise={};
i$.promise.Promise=i$.Promise;
i$.mash(i$.promise,{isPromise:function(o){
return o&&i$.isFunction(o.then);
},resolved:function(o){
var p=new i$.Promise();
p.resolve(o);
return p;
},rejected:function(_1){
var p=new i$.Promise();
p.reject(_1);
return p;
},join:function(_2){
var _3=new i$.Promise(),_4=new Array(_2.length),_5=0,_6=false,_7=function(){
if(++_5>=_4.length){
_3[_6?"reject":"resolve"](_4);
}
};
if(_2.length>0){
i$.each(_2,function(p,i){
p.then(function(v){
_4[i]=v;
_7();
},function(e){
_6=true;
_4[i]=e;
_7();
});
});
}else{
_3.resolve([]);
}
return _3;
}});
i$.mash(i$,{when:function(o){
return i$.promise.isPromise(o)?o:i$.promise.resolved(o);
},whenAll:function(o){
var a=[];
i$.each(arguments,function(p){
a.push(i$.when(p));
});
return i$.promise.join(a);
}});
i$.promise.when=i$.when;
i$.promise.whenAll=i$.whenAll;
i$.Promise.prototype={_fin:function(v,s){
if(this._stat!==-1){
throw new Error("Promise already resolved");
}
this._v=v;
this._stat=s;
this._cbk();
return this;
},_cbk:function(){
var st=this._stat,_8=this._cbs,v=this._v,f;
if(st===0){
if(i$.promise.isPromise(v)){
while(_8.length>0){
v.then.apply(v,_8.shift());
}
}
}
while(_8.length>0){
f=_8.shift()[st];
if(f){
try{
f(v);
}
catch(err){
}
}
}
},_delegate:function(fn){
var p=new i$.Promise();
this.then(i$.partial(fn,p),i$.scope(p,"reject"));
return p;
},resolve:function(v){
return this._fin(v,0);
},reject:function(e){
return this._fin(e,1);
},progress:function(p){
i$.each(this._cbs,function(_9){
if(_9[2]){
_9[2](p);
}
});
return this;
},then:function(_a,_b,_c){
var p=new i$.Promise();
this._cbs.push([function(v){
try{
if(_a){
var rv=_a(v);
if(rv!==undefined){
v=rv;
}
}
p.resolve(v);
}
catch(exc){
p.reject(exc);
}
},function(e){
var rv=e;
try{
if(_b){
rv=_b(e);
if(rv===undefined){
rv=e;
}
}
}
catch(exc){
rv=exc;
}
p.reject(rv);
},_c]);
if(this._stat!==-1){
this._cbk();
}
return p;
},call:function(_d,_e){
return this._delegate(function(p,_f){
if(_f&&i$.isFunction(_f[_d])){
p.resolve(_f[_d].apply(_f,_e));
}else{
p.reject(new Error(_d+" is not a function on "+o));
}
});
},get:function(_10){
return this._delegate(function(p,_11){
if(_11){
p.resolve(_11[_10]);
}else{
p.reject(new Error(_11+" is null or undefined"));
}
});
}};
})();
(function(){
i$.getXHR=typeof XMLHttpRequest!=="undefined"?function(){
return new XMLHttpRequest();
}:function(){
return new ActiveXObject("MSXML2.XMLHTTP.3.0");
};
i$.toQuery=function(o){
var q=[];
i$.each(o,function(v,k){
if(i$.isString(v)){
q.push(k+"="+v);
}else{
if(i$.isArray(v)){
i$.each(v,function(av,i){
q.push(k+"="+av);
});
}
}
});
return q.join("&");
};
i$.fromQuery=function(q){
var o={};
i$.each(q.split("&"),function(av,i){
var p=av.split("="),k=p[0],v=p[1],cv=o[k];
if(cv){
if(!i$.isArray(cv)){
cv=o[k]=[cv];
}
cv.push(v);
}else{
o[k]=v;
}
});
return o;
};
i$.xhr=function(_12,_13){
var _12=_12||"GET",_14=new i$.Promise(),url=_13.url||"",_15=_13.sync||false,cb=_13.callback||function(){
},_16=_13.responseType||"text",_17=_13.postData||null,xhr=i$.getXHR();
var _18=function(){
if(xhr.readyState===4){
try{
xhr.onreadystatechange=i$.isIE<=8?new Function():null;
}
catch(xhrERR){
}
if(xhr.status>=400){
var err=new Error(xhr.status+": "+xhr.responseText);
try{
cb(err,xhr);
}
finally{
_14.reject({data:err,xhr:xhr});
}
}else{
try{
var ret="";
if(i$.xhrFmts[_16]){
ret=i$.xhrFmts[_16](xhr);
}
}
catch(err){
cb(err,xhr);
return;
}
try{
cb(ret,xhr);
}
finally{
_14.resolve({data:ret,xhr:xhr});
}
}
}
};
if(!_15){
xhr.onreadystatechange=_18;
}
xhr.open(_12,url,!_15);
i$.each(_13.headers,function(v,k){
xhr.setRequestHeader(k,v);
});
xhr.send(_17);
if(_15){
_18();
}
return _14;
};
i$.each(["Get","Put","Post","Delete"],function(m){
i$["xhr"+m]=i$.partial(i$.xhr,m.toUpperCase());
});
i$.loadScript=function(_19){
var _1a=document.getElementsByTagName("head")[0],_1b=document.createElement("script"),_1c=new i$.Promise(),_1d=false,_1e=function(_1f,_20){
_1b.onreadystatechange=_1b.onload=null;
_1d=true;
_1c[_1f?"resolve":"reject"](_20);
if(_19.callback){
_19.callback(_1f,_20);
}
_1a.removeChild(_1b);
_1b=null;
};
_1b.type="text/javascript";
_1b.onreadystatechange=function(){
if(this.readyState==="loaded"||this.readyState==="complete"){
_1e(true);
}
};
_1b.onload=function(){
_1e(true);
};
i$.each(_19.scriptAttrs,function(v,k){
if(v!=null){
_1b.setAttribute(k,v);
}
});
_1b.src=_19.url;
_1a.appendChild(_1b);
if(_19.timeout){
setTimeout(function(){
if(!_1d){
_1e(false,new Error("Timeout exceeded"));
}
},_19.timeout);
}
return _1c;
};
})();
(function(){
if(typeof (JSON)!="undefined"&&JSON.parse){
i$.fromJson=function(str){
return JSON.parse(str);
};
i$.toJson=function(obj,_21){
return JSON.stringify(obj,null,_21?"\t":"");
};
}else{
i$.fromJson=function(str){
return eval(["(",str,")"].join(""));
};
var _22=function(str){
return ["\"",str.replace(/[\\]/g,"\\\\").replace(/["]/g,"\\\"").replace(/[\r]/g,"\\r").replace(/[\n]/g,"\\n").replace(/[\b]/g,"\\b").replace(/[\t]/g,"\\t").replace(/[\f]/g,"\\f"),"\""].join("");
},_23=function(obj,p,_24,_25){
var ap,_26;
if(_24){
_25=_25||"";
_26=_25+"\t";
}
if(obj===null){
p.push("null");
}else{
if(obj===undefined){
p.push("undefined");
}else{
if(i$.isBoolean(obj)||i$.isNumber(obj)){
p.push(obj);
}else{
if(i$.isString(obj)){
p.push(_22(obj));
}else{
if(i$.isFunction(obj.toJson)){
p.push(obj.toJson());
}else{
if(i$.isArray(obj)){
p.push("[");
ap=[];
i$.each(obj,function(el){
var _27=[];
_23(el,_27,_24,_26);
ap.push(_27.join(""));
});
if(ap.length>0){
if(_24){
p.push("\n"+_26);
}
p.push(ap.join(_24?",\n"+_26:","));
if(_24){
p.push("\n"+_25);
}
}
p.push("]");
}else{
if(i$.isObject(obj)){
p.push("{");
ap=[];
i$.each(obj,function(el,key){
var _28=[_22(key),": "];
_23(el,_28,_24,_26);
ap.push(_28.join(""));
});
if(ap.length>0){
if(_24){
p.push("\n"+_26);
}
p.push(ap.join(_24?",\n"+_26:","));
if(_24){
p.push("\n"+_25);
}
}
p.push("}");
}
}
}
}
}
}
}
};
i$.toJson=function(obj,_29){
var p=[];
_23(obj,p,_29);
return p.join("");
};
}
i$.xhrFmts.json=function(xhr){
return i$.fromJson(xhr.responseText);
};
})();
(function(){
var _2a=function(){
this._evts={};
},_2b=function(_2c,_2d){
return _2c._evts[_2d]||(_2c._evts[_2d]={l:[],b:[]});
},add=function(_2e,_2f,_30,fn){
var e=_2b(_2e,_2f),c=e[_30].push(fn);
return [_2f,_30,c-1];
},_31=function(_32,_33){
var e=_2b(_32,_33[0]);
delete e[_33[1]][_33[2]];
},_34=function(evt,_35,_36){
var _37=evt.b,_36=_36||0,b,r;
for(var i=_36;i<_37.length;i++){
b=_37[i];
if(b){
_35=typeof _35==="undefined"?[]:_35;
r=b.apply(null,_35||[]);
if(i$.promise.isPromise(r)){
return r.then(function(_38){
if(_38!==false){
return _34(evt,_35,i+1);
}
return _38;
});
}
}
}
},_39=function(evt,_3a){
var _3b=evt.l,l;
for(var i=0;i<_3b.length;i++){
l=_3b[i];
if(l){
l.apply(null,_3a||[]);
}
}
},_3c=function(_3d,_3e,_3f){
var e=_2b(_3d,_3e);
return i$.when(_34(e,_3f)).then(function(_40){
if(_40!==false){
_39(e,_3f);
}
return _40;
});
};
i$.augment(_2a,{addListener:function(_41,fn){
return add(this,_41,"l",fn);
},removeListener:function(_42){
return _31(this,_42);
},addBroker:function(_43,fn){
return add(this,_43,"b",fn);
},removeBroker:function(_44){
return _31(this,_44);
},fireEvent:function(_45,_46){
return _3c(this,_45,_46);
}});
var _47=new _2a();
i$.each(["addListener","removeListener","addBroker","removeBroker","fireEvent"],function(n){
i$[n]=i$.scope(_47,n);
});
})();
(function(){
var _48=document.createElement("div");
i$.byId=function(id){
if(i$.isNode(id)){
return id;
}else{
return document.getElementById(id);
}
};
i$.createDom=function(_49,_4a,_4b){
var el=document.createElement(_49);
i$.each(_4a,function(v,k){
el.setAttribute(k,v);
});
if(_4b){
_4b.appendChild(el);
}
return el;
};
var _4c=_48.addEventListener?function(n){
return n.indexOf("on")==0?n.substr(2):n;
}:function(n){
return n.indexOf("on")!=0?"on"+n:n;
},add=_48.addEventListener?function(_4d,_4e,f){
_4d.addEventListener(_4e,f,false);
}:function(_4f,_50,f){
_4f.attachEvent(_50,f);
},_51=_48.removeEventListener?function(_52,_53,f){
_52.removeEventListener(_53,f,false);
}:function(_54,_55,f){
_54.detachEvent(_55,f);
};
i$.isDescendant=function(_56,anc){
if(anc){
while(_56){
if(_56==anc){
return true;
}
_56=_56.parentNode;
}
}
return false;
};
i$.bindDomEvt=function(_57,_58,f){
_58=_4c(_58);
if((_58=="mouseleave"||_58=="mouseenter")&&!i$.isIE){
var fp=f;
_58=_58=="mouseleave"?"mouseout":"mouseover";
f=function(e){
if(!i$.isDescendant(e.relatedTarget,_57)){
return fp.call(this,e);
}
};
}
add(_57,_58,f);
return [_57,_58,f];
};
i$.unbindDomEvt=function(_59){
if(_59[0]){
_51(_59[0],_59[1],_59[2]);
}
_59.splice(0,3);
};
if("classList" in _48){
i$.mash(i$,{addClass:function(_5a,_5b){
_5a&&_5a.classList&&_5a.classList.add(_5b);
},removeClass:function(_5c,_5d){
_5c&&_5c.classList&&_5c.classList.remove(_5d);
},hasClass:function(_5e,_5f){
return _5e&&_5e.classList&&_5e.classList.contains(_5f);
},toggleClass:function(_60,_61){
_60&&_60.classList&&_60.classList.toggle(_61);
}});
}else{
var _62=function(str,_63){
if(!str){
return -1;
}
var len=_63.length,i=str.indexOf(_63),_64,_65;
while(i>-1){
_65=str.charAt(i+len);
_64=str.charAt(i-1);
if((!_65||_65==" ")&&(!_64||_64==" ")){
break;
}
i=str.indexOf(_63,i+1);
}
return i;
};
i$.mash(i$,{addClass:function(_66,_67){
if(!_66){
return;
}
if(_62(_66.className,_67)<0){
_66.className+=" "+_67;
}
},removeClass:function(_68,_69){
if(!_68){
return;
}
var str=_68.className,len=_69.length,i=_62(str,_69),val=[];
if(i>-1){
if(i>0){
val.push(str.substring(0,i));
}
if(str.length>i+len){
val.push(str.substr(i+len));
}
_68.className=i$.trim(val.join());
}
},hasClass:function(_6a,_6b){
if(!_6a){
return;
}
return _62(_6a.className,_6b)>-1;
},toggleClass:function(_6c,_6d){
if(!_6c){
return;
}
i$[i$.hasClass(_6c,_6d)?"removeClass":"addClass"](_6c,_6d);
}});
}
})();
(function(){
var _6e=/([^_]+)_([^_]+)_deferred_?([\d]+)?/,_6f=/alternate/i,_70=function(t){
return document.getElementsByTagName(t);
},_71=function(){
return _70("head")[0];
},_72=function(url){
i$.createDom("link",{rel:"stylesheet",type:"text/css",href:url},_71());
return i$.promise.resolved();
},_73=function(url){
return i$.loadScript({url:url});
},_74=function(mod){
return i$.xhrGet({url:mod.url,headers:{"X-IBM-XHR":"true"},responseType:"text"}).then(function(_75){
return {mod:mod,data:_75.data};
});
},_76=function(_77){
i$.each(_77,function(_78){
var m=_78.mod;
var _79=m.node.parentNode;
var _7a=m.p!="head"?m.node:null;
var _7b=document.createDocumentFragment(),tmp=i$.createDom("div");
tmp.innerHTML=_78.data;
while(tmp.firstChild){
_7b.appendChild(tmp.firstChild);
}
_79.insertBefore(_7b,_7a);
});
},_7c=function(_7d){
if(_6f.test(_7d.rel)){
var id=_7d.id,_7e=id.match(_6e);
if(_7e){
return {node:_7d,url:_7d.href,id:id,p:_7e[1],t:_7e[2],i:_7e[3]};
}
}
},_7f=function(){
var m={head:[],config:[]},_80={},_81={length:0},_82=_70("link"),_83=_70("a");
i$.each([_82,_83],function(_84){
i$.each(_84,function(_85){
var mod=_7c(_85);
if(mod&&!_80[mod.id]){
_80[mod.id]=mod;
if(!_81[mod.t]){
_81[mod.t]=[];
_81.length=_81.length+1;
}
_81[mod.t].push(mod);
}
});
});
return _81;
},_86=function(_87){
var _88=[];
var _89=[];
i$.each(_87["markup"],function(mod){
_89.push(_74(mod));
});
return i$.whenAll.apply(this,_89).then(function(_8a){
_88=_8a;
_89=[];
i$.each(_87["css"],function(mod){
_89.push(_72(mod.url));
});
return i$.whenAll.apply(this,_89);
},function(err){
console.log("Error: ",err);
}).then(function(_8b){
return _8c(_87["js"]);
}).then(function(){
_76(_88);
});
},_8c=function(_8d){
var m=_8d.shift(),p;
if(m){
p=_73(m.url);
}
return i$.when(p).then(function(){
return _8d.length>0?_8c(_8d):true;
},function(err){
console.log("Error: ",err);
});
},_8e=false,_8f=null,_90=false,_91=false,_92=new i$.Promise(),_93=function(cbk){
i$.addOnLoad(function(){
if(!_8e){
_8f=_7f();
_90=_8f.length>0?false:true;
if(_90){
_92.resolve();
}
_8e=true;
}
if(cbk){
cbk();
}
});
};
i$.modules={};
i$.mash(i$.modules,{areLoaded:function(){
return _90;
},areLoading:function(){
return _91;
},loadDeferred:function(){
if(_91){
return _92;
}
var cbk=function(){
if(!_90){
_91=true;
_86(_8f).then(function(){
_90=true;
_91=false;
_92.resolve();
},function(e){
_92.reject(e);
});
}
};
_93(cbk);
return _92;
},addAfterLoaded:function(f){
var cbk=function(){
_92.then(f);
};
_93(cbk);
}});
var _94=i$.addOnLoad,_95=[];
i$.addOnLoad=function(f,o){
if(_91){
if(o){
f=i$.scope(o,f);
}
_95.push(f);
}else{
_94(f,o);
}
};
i$.modules.addAfterLoaded(function(){
while(_95.length>0){
if(fn=_95.shift()){
fn();
}
}
});
})();
(function(){
i$.getCookie=function(n){
var cs=document.cookie.split(";"),c="",cn="",cv=null;
for(var i=0;i<cs.length;i++){
c=cs[i].split("=");
cn=i$.trim(c[0]);
if(cn==n){
if(c.length>1){
cv=i$.trim(c[1]);
}
return cv;
}
}
return null;
};
i$.setCookie=function(n,v,e,p,d,s){
if(!e){
var m=new Date().getTime();
m+=(1000*60*60*24*365*100);
e=new Date(m);
}
var c=n+"="+v+((e)?"; e="+e.toGMTString():"")+((p)?"; path="+p:"; path=/")+((d)?"; domain="+d:"")+((s)?"; secure":"");
document.cookie=c;
};
i$.deleteCookie=function(n,p,d){
if(i$.getCookie(n)){
document.cookie=n+"="+((p)?"; path="+p:"; path=/")+((d)?"; domain="+d:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT";
}
};
})();

