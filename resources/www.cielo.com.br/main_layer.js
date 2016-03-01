/** Licensed Materials - Property of IBM, 5724-E76 and 5724-E77, (C) Copyright IBM Corp. 2011, 2012 - All Rights reserved.  **/
(function(){
var w=window,i$=function(){
if(i$.qel){
return i$.qel.apply(this,arguments);
}
};
w.i$=i$;
i$.global=w;
if(typeof (console)=="undefined"){
var f=function(){
};
console={log:f,debug:f,info:f,warn:f,error:f,assert:f};
}
i$.partial=function(f){
var _1=i$.toArray(arguments).slice(1);
return function(){
var _2=_1.slice(0),_3=i$.toArray(arguments),i=0;
for(;i<_2.length;i++){
if(_2[i]===undefined){
_2[i]=_3.shift();
}
}
_2.push.apply(_2,_3);
return f.apply(this,_2);
};
};
i$.scope=function(s,f){
var of=f;
f=function(){
return (i$.isString(of)?s[of]:of).apply(s,arguments);
};
return i$.partial.apply(this,i$.toArray(arguments).slice(1));
};
i$.error=function(_4,_5){
console.error(_5||new Error(_4));
};
i$.forEach=function(_6,f,_7){
if(_7==null){
_7=0;
}
for(var i=(_7>=0)?_7:0;i<_6.length;i++){
f(_6[i],i,_6);
}
};
i$.forIn=function(o,f){
for(var i in o){
f(o[i],i,o);
}
};
i$.each=function(o,f,s){
if(s){
f=i$.scope(s,f);
}
if(o){
if(o instanceof Array||typeof o.length==="number"){
i$.forEach(o,f);
}else{
i$.forIn(o,f);
}
}
};
i$.some=function(a,f,s){
if(s){
f=i$.scope(s,f);
}
for(var i=0;i<a.length;i++){
if(f(a[i])){
return true;
}
}
return false;
};
i$.every=function(o,f,s){
if(s){
f=i$.scope(s,f);
}
return !i$.some(o,function(_8){
return !f(_8);
});
};
i$.wrap=function(o,n,f){
var fn=o[n];
o[n]=function(){
return f.call(this,fn,arguments);
};
o[n]._wrapped=fn;
return o[n];
};
i$.unwrap=function(o,n){
var fn=o[n];
if(fn&&fn._wrapped){
o[n]=fn._wrapped;
}
return o[n];
};
i$.copyShallow=function(o){
var r=i$.isArrayLike(o)?[]:{};
i$.forIn(o,function(v,k){
r[k]=v;
});
return r;
};
var _9=function(_a,_b,_c,_d){
if(_c||_b[_d]===undefined){
_b[_d]=function(){
return this[_a][_d].apply(this[_a],arguments);
};
}
},_e=function(_f,_10,_11,_12){
if(_11||_10[_12]===undefined){
_10[_12]=function(){
return _f[_12].apply(_f,arguments);
};
}
};
i$.shadow=function(s,t,_13,_14){
i$.each(_13,i$.partial(i$.isString(s)?_9:_e,s,t,_14));
};
var _15=function(_16,c,s){
var i,p,ts=s||i$.global;
for(i=0;ts!=null,i<_16.length,p=_16[i];i++){
if(ts[p]==null){
if(c){
ts[p]={};
}else{
ts=null;
break;
}
}
ts=ts[p];
}
return ts;
};
i$.fromPath=function(n,c,s){
var _17=n.split(".");
return _15(_17,c,s);
};
i$.toPath=function(n,v,s){
var _18=n.split("."),p=_18.pop(),o=_15(_18,true,s);
o[p]=v;
return v;
};
i$.cachedFn=function(f,s){
var val;
var fn=function(){
if(!fn.called){
fn.called=true;
val=f.apply(s,arguments);
}
return val;
};
return fn;
};
i$.xhrFmts={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(xhr.responseText.replace(/"(\\.|[^"\\])*"/g,"")))&&eval("("+xhr.responseText+")");
},xml:function(xhr){
return xhr.responseXML;
},javascript:function(xhr){
if((/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(str.replace(/"(\\.|[^"\\])*"/g,"")))){
throw new SyntaxError("Invalid characters in javascript object");
}else{
return eval("("+xhr.responseText+")");
}
}};
})();
(function(){
(function(ua){
var _19=function(_1a){
return parseFloat(_1a);
},_1b=[["IE",/MSIE\s*([\S]+)*/],["FF",/Firefox\/([\S]+)*/],["Opera",/Opera[\s\/]([\S]+)*/],["Safari",/Version\/([\S]+)*[\s\S]*Safari/],["Chrome",/Chrome\/([\S]+)*/],["WebKit",/AppleWebKit\/([\S]+)*/]];
i$.each(_1b,function(_1c){
var m=_1c[1].exec(ua);
if(m&&m.length>1){
i$["is"+_1c[0]]=_19(m[1]);
}
});
})(navigator.userAgent);
var _1d=document.documentMode;
if(_1d&&_1d!=5&&Math.floor(i$.isIE)!=_1d){
i$.isIE=_1d;
}
i$.isNode=function(o){
return typeof o==="object"&&typeof o.nodeType==="number"&&typeof o.nodeName==="string";
};
i$.isFunction=function(o){
return typeof o==="function"||o instanceof Function;
};
i$.isObject=function(o){
return typeof o==="object";
};
i$.isArray=function(o){
return o instanceof Array;
};
i$.isString=function(o){
return typeof o==="string";
};
i$.isNumber=function(o){
return typeof o==="number";
};
i$.isBoolean=function(o){
return typeof o==="boolean";
};
i$.isLikeArray=function(o){
return o instanceof Array||typeof o.length==="number";
};
i$.toArray=function(o){
return Array.prototype.slice.call(o);
};
if(i$.isIE){
var _1e=i$.toArray;
i$.toArray=function(o){
try{
return _1e(o);
}
catch(err){
var a=new Array(o.length);
for(var i=0;i<o.length;i++){
a[i]=o[i];
}
return a;
}
};
}
var _1f=(document.readyState==="complete"),_20=[],_21=[];
i$._initPage=function(){
var fn;
_1f=true;
if(window.detachEvent){
window.detachEvent("onload",i$._initPage);
}
while(_20.length>0){
if(fn=_20.shift()){
try{
fn();
}
catch(err){
console.log(err);
}
}
}
};
i$._exitPage=function(){
var fn;
while(_21.length>0){
if(fn=_21.shift()){
try{
fn();
}
catch(err){
console.log(err);
}
}
}
};
i$._addEvent=function(e,f,o){
var w=o?o:window;
var s=w.attachEvent?e:e.substring(2);
var a=w.attachEvent||w.addEventListener;
a(s,function(){
f.apply(w,arguments);
},false);
};
if(!_1f){
i$._addEvent("onload",i$._initPage);
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",i$._initPage,false);
}
}
i$._addEvent("onunload",i$._exitPage);
i$.addOnLoad=function(f,o){
if(o){
f=i$.scope(o,f);
}
if(_1f){
f();
}else{
_20.push(f);
}
};
i$.addOnUnload=function(f,o){
if(o){
f=i$.scope(o,f);
}
_21.push(f);
};
var mx=function(o,m){
for(var p in m){
if(m.hasOwnProperty(p)){
o[p]=m[p];
}
}
},mxn=function(o,m,_22){
i$.forEach(_22,function(p){
if(m.hasOwnProperty(p)){
o[p]=m[p];
}
});
};
i$.mash=function(o){
i$.forEach(arguments,function(v){
mx(o,v);
},1);
return o;
};
i$.mashSpec=function(n,o){
i$.forEach(arguments,function(v){
mxn(o,v,n);
},2);
return o;
};
i$.augment=function(f){
var r=f;
if(f&&f.prototype){
f=f.prototype;
i$.mash.apply(i$,arguments);
}
return r;
};
i$.make=(function(){
var l=function(){
};
return function(o){
l.prototype=o;
o=new l();
return i$.mash.apply(i$,arguments);
};
})();
var _23=/^\s+/g;
i$.trim=function(str){
str=str.replace(_23,"");
var i=str.length-1;
while(str.charAt(i)==" "||str.charAt(i)=="\t"||str.charAt(i)=="\n"||str.charAt(i)=="\r"){
i--;
}
return str.substring(0,i+1);
};
var _24=i$.isArray,_25=i$.isObject;
i$.merge=function(_26,_27,_28){
var _28=_28||[],v,c;
_27=_27||i$.global;
if(_24(_26)&&_24(_27)){
_27.push.apply(_27,_26);
}else{
for(var x in _26){
if(_26.hasOwnProperty(x)){
v=_26[x],c=_27[x];
if(c!=null&&((_24(v)&&_24(c))||(_25(v)&&_25(c)))){
_27[x]=i$.merge(v,c,_28.concat(x));
}else{
_27[x]=v;
}
}
}
}
return _27;
};
var _29;
i$.isRTL=function(_2a){
if(!_29){
_29=i$.fromPath("ibmCfg.themeConfig.RTLMap");
}
var _2b=_29||{"iw":1,"he":1,"ar":1};
return (_2a.substring(0,2) in _2b);
};
})();

