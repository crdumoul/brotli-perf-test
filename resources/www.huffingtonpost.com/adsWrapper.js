var adsLo;
try {adsLo=top.location.href}
catch (e){}
if (!adsLo||adsLo==null){
try {adsLo=window.location.href}
catch (e){}
}
adsLo=adsLo||"";
var adsUAC=adsLo.search(/atwUAC=/i),adsUACD=adsLo.search(/atwUACD=/i),adsUACH,atwInfo=0;
if (adsLo.search(/atwInfo=/i)>-1)atwInfo=1;
function adsLoadUAC(){
	var u,x;
	if (adsUAC>0)x=adsLo.substring(adsUAC+7,adsLo.length).replace(/&.*$/,'').split(/\||;/)
	else if (adsUACD>0)x=adsLo.substring(adsUACD+8,adsLo.length).replace(/&.*$/,'').split(/\||;/);
	if (x[1]&&x[1]=='c')adsUACH='http://cdn.atwola.com/_media/uac/'
	else if (x[1]&&x[1]=='s')adsUACH='https://s.aolcdn.com/ads/'
	else adsUACH='http://browsertest.web.aol.com/ads/';
	u=x[0];
	if (/^[0-9A-Za-z\/.]+$/.test(unescape(u))){
   		if (adsUACD>0){
			var z=document.createElement('script');
			z.src=adsUACH+u;
			document.body.appendChild(z);
		} 
		else if (adsUAC>0){
			document.write('<script type="text/javascript" src="'+adsUACH+u+'"></scr','ipt>')
	   	}
	}	
}
if ((adsUAC>0||adsUACD>0)&&!window.adsUACH)adsLoadUAC()
else if (window.adsIn!=1){
adsIn=1;
var adsGUID=1,adsSecure=(location.protocol=='https:')?1:0,adsHt="",adsNt='5113.1',adsPl='221794',adsESN='',adsTp='J',
adsATOth='',adsTacOK=1,adsHashOK=1,adsD=new Date(),aolAdFdBkStr='',adsAddOn=1,adsAJAXAddOn=0,adsCo='us',
adsVal='',adsCp=0,adsMNS,adsTPS,adsExcV='',adsLNm=0,adsKV,adsSz,adsPing,adsFileless=0,
adsUA=navigator.userAgent.toLowerCase(),adsIE,adsIEGT9=0,adsIELT10=0,
adsNMSG='',adsTile=1,adsPage='',adsDivs=[],adsCA,adsCF=[],adsCW=[],adsCH=[],adsCAd=[],adsChn='',adsMOE='',adsOverS='',adsOverF='1',
adsScr=(window.s_265&&window.s_265.prop55)?window.s_265.prop55:adsD.getTime()%0x3b9aca00,adsRRDevil='',adsRRCalled='',
adsDev=(typeof window.onorientationchange!='undefined')?'1':'2',atwLoaded=0,atwReset=0,adsOverlay,adsCloseTime='8000',adsCloseTVar=0;
if ((adsUA.indexOf('mobile')>-1)||(/android|iphone|ipad|playbook|hp-tablet|kindle|silk|webos|blackberry|opera mini/i).test(navigator.appVersion))adsDev='1';
if (!adsDev)adsDev='2';
if (!window.ATW3_AdObj){
try {
if (parent.window.ATW3_AdObj){
var ATW3_AdObj=parent.window.ATW3_AdObj;
adsScr=ATW3_AdObj.scr;
}else{
var ATW3_AdObj=new Object();
ATW3_AdObj.scr=adsScr;
ATW3_AdObj.tile=0;
parent.window.ATW3_AdObj=ATW3_AdObj; 
}}
catch (e){
var ATW3_AdObj=new Object();
ATW3_AdObj.scr=adsScr;
ATW3_AdObj.tile=0;
}}
else{
adsScr=ATW3_AdObj.scr;
}
function adsOverlayAd(m,sz,dv,f,c,del){
var sp,dyn,w,h,d=adsGetObj(dv),x=document.createElement('iframe'),s;
x.setAttribute("itemscope","");
x.setAttribute("itemtype","https://schema.org/WPAdBlock");
if (adsUACH&&adsUACD>0)var x=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments)
else {
if (adsOverF)f=adsOverF;
if (del)adsOverDelay=del;
if (adsOverlay)m=adsOverlay;
if (c){adsCloseTime=parseInt(c)*1000;}
if (sz.indexOf(',')>0){
	sp=sz.split(',')[0].split('x');
	dyn=1;
}
else {
	sp=sz.split('x');
	dyn=0;
}
w=sp[0];
h=sp[1];
if (sz.toLowerCase()=='mm'){w='300';h='250';sz='300x250,320x480,300x600';dyn=1}
try {
	var l=localStorage.getItem('adsOverlay'),now=new Date();
	if (parseInt(l)>now.getTime()&&f!='0'){
		adsMOE='kvmoe=n;';
		return 0;
	}
	else {
		adsMOE='kvmoe=y;';
	}
}
catch (e){}
d.style.cssText='position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:7000000;display:none; overflow-y:scroll;-webkit-overflow-scrolling:touch;';
d.id='adsDisplayBox';
x.width='100%';
x.height='100%';
x.id='adsOverI';
x.style.overflowY='scroll';
d.appendChild(x);
s='<html><head><script type="text/javascript" src="http';
if (adsSecure)s+='s://s'
else s+='://o';
s+='.aolcdn.com/ads/adsWrapper.js"></script>';
s+='<style>body,html {margin:0;width:100%;height:100%;display:table;}\n';
s+='.adsOverLightBox {background-color:rgba(0,0,0,0.7);width:100%;height:100%;text-align:center;vertical-align:middle;display:table-cell;-webkit-transform:translateZ(0);}\n';
s+='.adsOverClose {position:absolute;right:8px;top:8px;}\n';
s+='.adsOverlayDiv {background-color:white;width:'+w+'px;height:'+h+'px;margin:auto;}</style></head><body>\n';
s+='<div class="adsOverLightBox"><a href="#" onclick="return parent.adsOverCloseFn(\'1\')" class="adsOverClose"><img src="http';
if (adsSecure)s+='s://s'
else s+='://o';
s+='.aolcdn.com/ads/closeButton.png" width=50 height=50></a>\n';
s+='<div class="adsOverlayDiv" id="adsOverlayDiv"></div>\n';
s+="<script type='text/javascript'>adsDisableTacoda('1');adsPage=parent.adsPage;adsMOE='kvmoe=y;';";
if (dyn==1)s+="htmlAdWHDyn('"+m+"','"+sz+"','f','adsOverlayDiv')";
else s+="htmlAdWH('"+m+"','"+w+"','"+h+"','f','adsOverlayDiv')";
s+='</script></div></body></html>'
adsOverS=s;
if (f!='0'){
	var dt=new Date();
	dt.setHours(dt.getHours()+(f*24));
	try {
		localStorage.setItem('adsOverlay',dt.getTime());
	}
	catch(e){}
}
}
}
function adsOverlayAdCall(s){
var i=document.getElementById('adsOverI');
i=(i.contentWindow)?i.contentWindow:(i.contentDocument.document)?i.contentDocument.document:i.contentDocument;
i.document.open();
i.document.write(s);
i.document.close();
}
function adsOverlayCloseOff(){
  adsCloseTVar=1;
}
function adsOverCloseFn(v){
if (v||adsCloseTVar!=1){
	var d=document.getElementById('adsDisplayBox');
	d.style.display='none';
	return false;
}
}
function adsDisableGUID(){adsGUID=0}
function adsGUIDFn(e){
if (e.origin==='http://cdn.at.atwola.com'||e.origin==='https://cdn.at.atwola.com'){
 var x=e.data.split('=');
 try {if (x.length==2&&x[0]=='guid')localStorage.setItem('adsGUID', x[1]);}
 catch(e){}
}
}
if (window.addEventListener)window.addEventListener("message",adsGUIDFn,false);
function adSet101x1(){}
function adSetMOAT(v,r){
if (adsUACH&&adsUACD>0)var x=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments)
else {
if (v&&v!='0'){
window.moatConfig=r||{};
var d=document,s=d.createElement("script"),h=d.getElementsByTagName("head")[0],sr;
if (String(window.moatConfig.moatHosted)==='true'){
 if (adsSecure)sr='https://z'
 else sr='http://s'
 sr+='.moatads.com/aolalways5fd2/moatuac.js';
}
else{
 if (adsSecure)sr='https://s'
 else sr='http://o'
 sr+='.aolcdn.com/os/moat/prod/moatuac.js';
}
s.src=sr;
h.appendChild(s); 
}
}
}
var adsLoadSync=0,adsSyncTime='',adsSyncDelay=0,adsAddOnMQ='',adsRePo='0',adsEAN=1;
function adsResizeImage(v){}
function adsResizePortrait(v){
if (adsUACH&&adsUACD>0){
	var x=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments);
}
else {
	adsRePo=v;
}
}
function adSetAddOnPl(v){
if (v)adsAddOnMQ=v;
}
function adSetSyncDelay(v){
 if (v)adsSyncDelay=parseInt(v)
 else adsSyncDelay=200;
} 
function adsLoadedSync(){
 var z=adsDivs.length,v;
 for (var i=0;i<z;i++){
  v=adsGetObj(adsDivs[i]);
  if (v.textAd!=1&&v.iframe!=1&&v.delayed)v.LoadAd();
 }
 adsLoadSync=1;
}
function atwInfoFn(){
try {
var df,sz,id,mnum,ft,sq,st,oth,mn,tt,fw,fh,da,di,c='',td='</td><td>';
var s='<style>table,.tableClass{border:solid 1px;}</style><table class="tableClass" width="100%" border=1><tr align="left"><th>Ad #</th><th>Magic Number</th><th>Orig Width</th><th>Orig Ht</th><th>Dyn Size</th><th>Actual Width</th><th>Actual Ht</th><th>AdId</th><th>MNUM</th><th>Format</th><th>SeqId</th><th>timeStamp</th><th>Devil Flag</th><th>Ad Call Type</th><th>Parms Sent</th></tr>';
for (var i=1;i<adsTile;i++){
df='n/a';sz='n/a';id='n/a';mnum='n/a';ft='n/a';sq='n/a';st='n/a';oth='n/a';mn='n/a';
tt='n/a';fw='n/a';fh='n/a';
if (atwUAC.adsInfo[i]){
 di=atwUAC.adsInfo[i];
 if (di.sz)sz=di.sz;
 if (di.ttype)tt=di.ttype
 if (di.other)oth=di.other
 if (adsDevilAd.ad[i]){
	da=adsDevilAd.ad[i];
 	if (da.adId)id=da.adId;
	if (da.mnum)mnum=da.mnum;
	if (da.aolFormat)ft=da.aolFormat;
	if (da.seqId)sq=da.seqId;
	if (da.timeStamp)st=da.timeStamp;
	if (da.width)fw=da.width;
	if (da.height)fh=da.height;
	if (da.aolDevilFlag&&da.aolDevilFlag!="undefined")df=da.aolDevilFlag;
 }
 s+='<tr><td>'+i+td+di.mn+td+di.origW+td+di.origH+td+sz+td+fw+td+fh+td+id+td+mnum +td+ft+td+sq+td+st+td+df+td+tt+td+oth+'</td></tr>';
}
}
s+='</table><div align="left">';
for (var i=1;i<adsTile;i++){
  if (atwUAC.adsInfo[i]){
     di=atwUAC.adsInfo[i];
     c=di.url.replace(/addyn/,'adiframe');
     s+='URL for Ad '+i+' '+di.url+' <a href="'+c+'" target=_blank>Click to View Ad</a><P>';
  }
}
s+='</div>';
var w=window.open('','atwInfoWin','resizable=yes,status=no,toolbar=no,location=no,menubar=no,status=no,titlebar=no,scrollbar=yes');
w.document.write(s);
}
catch (e){}
}
var atwSizeMsgFn,atwSizeMsgCount=0;
function atwSizeMsg(o){
	var z=0,m,w=0,h=0,x,m;
	if (!o){
		if (atwSizeMsgCount>10){
			clearInterval(atwSizeMsgFn);
		}
		else {
			atwSizeMsgCount++;
			z=1;
		}
	}
	if (o||z==1){
		try{
			if (document&&document.documentElement){
				w=document.documentElement.clientWidth;
				h=document.documentElement.clientHeight;
			}
		}
		catch(e){}
		m='aolResize;width='+w+';height='+h+';counter='+atwSizeMsgCount;
		if (o)m+=';reorient';
		for (var i=0;i<adsTile;i++){
			x=document.getElementById('adsF'+i);
			if (x&&x.width==1200&&x.height==800){
				x=x.contentWindow;
				x.postMessage(m,'*');
			}
		}
	}
}
function adsTacFn(){
var n=2,d=document,r=d.referrer,q=0,i,i1='',j,p='';
atwLoaded=1;
var t1='//cdn.atwola.com/_media/uac/tcodewads_at.html',t2='//cdn.at.atwola.com/_media/uac/tcode3.html';
if (adsDev=='1')atwSizeMsgFn=setInterval(atwSizeMsg,1000);
if (atwInfo)x=setTimeout("atwInfoFn()",3000);
if (adsGUID){
	i=d.createElement('iframe');
	i.style.display="none";
	i.id="localStorage";
	i.style.width='0px';
	i.style.height='0px';
	i.setAttribute("itemscope","");
	i.setAttribute("itemtype","https://schema.org/WPAdBlock");
	i.src='//cdn.at.atwola.com/_media/uac/guid.html';
	d.body.appendChild(i);
}
if (adsTacOK==2)n=1
if (adsTacOK){
	try {
		if (top.location.href!=location.href){
			if (parent.window.adsIn==1)q=1
		}
	}
	catch (e){}
	if (q!=1){
		for (j=0;j<n;j++){
			i=d.createElement('iframe');
			i.setAttribute("itemscope","");
			i.setAttribute("itemtype","https://schema.org/WPAdBlock");
			i.style.display="none";
			i.id="adTacFr"+j;
			i.style.width='0px';
			i.style.height='0px';
			if (j==0&&(adsESN||adsUA.indexOf("aol")!=-1)&&!adsSecure){
				i1=t1;
				if (adsESN)i1+="#"+adsESN;
			}
			if (j==1){
				var x='';
				if (adsHashOK==0)p+='&hashOK=0&';
				if (window.tacProp){
					for (var t in tacProp){x+="&"+t+"="+tacProp[t]}
				}
				p+=x
				if ((typeof(r)!='undefined')&&(r!='')){
					if (r.indexOf('mapquest')!=-1)r=r.replace(/[?#].*$/,'')
					p+="&tacref="+r;
				}
				if (adsATOth){
					var xx=adsATOth.replace(/;/g,'&');
					p+='&'+xx;
				}
				i1=(p)?t2+"#"+p:t2
			}
			if (i1){
				i.src=i1
				d.body.appendChild(i)
			}
		}
	}
}
}
function adsDisableTacoda(v){
if (v&&v.indexOf('aolws')!=-1)adsTacOK=2
else adsTacOK=0
}
function adUACInit(){
var w=window;
try {
if (document.readyState&&document.readyState=='complete'){
	adsTacFn();
}
else {
	if (w.addEventListener)w.addEventListener("load",adsTacFn,false);
	else if (w.attachEvent)w.attachEvent("onload",adsTacFn);
}
}
catch(e){}
try{
	if (w.addEventListener){
		w.addEventListener("orientationchange",function(){atwSizeMsg('1')},false);
	}
	else if (w.attachEvent){
		w.attachEvent("onorientationchange",function(){atwSizeMsg('1')});
	}
}
catch (e){}
try {
if (/(^|;)?RSP_COOKIE=.*?&name=(.*?)(&|;|$)/i.test(document.cookie))adsESN='&ESN='+unescape(RegExp.$2);
}
catch (e){}
var at=adsLo.search(/atwcrpr=/i),ip,l=adsLo.toLowerCase();
adsIE=((navigator.appName=="Microsoft Internet Explorer")||(adsUA.indexOf("trident/")>-1));
if (adsIE){
	var mo=document.documentMode;
	if (mo&&mo>9)adsIEGT9=1;
	if (mo&&mo<=9)adsIELT10=1;
}
if (adsLo.search(/atwdistcode/i)>0)adsDisableTacoda()
if (at>0){
adsCA=adsLo.substr(at+8).split(/\||;/);
adsCp=1;
var z=adsCA.length;
for (var i=0,k=0;i<z;i=i+4,k++){adsCF[k]=adsCA[i];adsCW[k]=adsCA[i+1];adsCH[k]=adsCA[i+2];adsCAd[k]=adsCA[i+3]}
}
adsMNS=(/(\?|&)atwmn=(.*?)(&|$)/.test(l))?(RegExp.$2).split(/\||;/):'';
if (!(/^[0-9A-Za-z,-.]+$/.test(unescape(adsMNS))))adsMNS='';
adsPing=(/(\?|&)atwping=(.*?)(&|$)/.test(l))?(RegExp.$2):'';
if (!(/^[0-9]+$/.test(unescape(adsPing))))adsPing='';
adsTPS=(/(\?|&)atwtp=(.*?)(&|$)/.test(l))?(RegExp.$2).split(/\||;/):'';
if (!(/^[0-9A-Za-z,-]+$/.test(unescape(adsTPS))))adsTPS='';
adsKV=(/(\?|&)atwkv=(.*?)(&|$)/.test(l))?escape(RegExp.$2):'';
if (!(/^[0-9A-Za-z,;=]+$/.test(unescape(adsKV))))adsKV='';
if (adsKV&&adsKV[adsKV.length-1]!=';')adsKV+=';'
if (adsKV)adsATOth+=adsKV;
adsExcV=(/(\?|&)atwexc=(.*?)(&|$)/.test(l))?(RegExp.$2):'';
ip=(/(\?|&)atwip=(.*?)(&|$)/.test(l))?(RegExp.$2):'';
if (ip&&(/^[0-9\.]+$/.test(unescape(ip))))adsATOth+='ip='+ip+';';
adsOverlay=(/(\?|&)atwover=(.*?)(&|$)/.test(l))?(RegExp.$2):'';
if (!(/^[0-9a-zA-Z-]+$/.test(unescape(adsOverlay))))adsOverlay='';
adsSZ=(/(\?|&)atwsz=(.*?)(&|$)/.test(l))?(RegExp.$2).split(/\||;/):'';
if (!(/^[0-9A-Za-z,]+$/.test(unescape(adsSZ))))adsSZ='';
adsOverDelay=(/(\?|&)atwdelay=(.*?)(&|$)/.test(l))?(RegExp.$2):'';
if (!adsOverDelay)adsOverDelay=1000;
adsOverF=(/(\?|&)atwfreq=(.*?)(&|$)/.test(l))?(RegExp.$2):'1';
adsFileless=(/(\?|&)atwfileless=(.*?)(&|$)/.test(l))?1:0;
}
adUACInit();
function adsCkCol(f,d){
var dv=document.getElementById(f.divName),i=d.getElementById('adDiv').innerHTML,z,s='http';
if (f.id[f.id.length-1]==adsPing-1) { 
  z=document.createElement('script');
  if (adsSecure)s+='s://s'
  else s+='://o'
  z.src=s+'.aolcdn.com/ads/blank.js';
  document.body.appendChild(z);
}
var x=((i.indexOf('AOL - HTML - Blank HTML Ad')!=-1)||(i.indexOf('ATCollapse.gif')!=-1)),x2=(i.indexOf('<\/script>\n<\/td><\/tr><\/tbody><\/table>')!=-1);
if (!x&&!x2&&f.divName=='adsOverlayDiv'){
	parent.document.getElementById('adsDisplayBox').style.display='inline';
	var t=setTimeout(parent.adsOverCloseFn,parent.adsCloseTime);
}
if (!x){
var v=f.parentNode;
if (adsEAN&&!((f.w=='61'&&f.h=='21')||(f.w=='290'&&f.h=='18')||(f.w=='386'&&f.h=='280')))adsWriteEAN(v,f,i);
}
if (dv&&dv.col){
if (!x){
f.width=f.w;
f.height=f.h;
f.style.display='inline';
f.style.visibility='visible';
}}
if (x){
f.style.width="0px"
f.style.height="0px"
dv.width=0
dv.height=0 
f.style.display='none'
adsDevilObj(f.divName,'1','1',f,d,'1');
return true
}
else {
 if (f.textAd!=1&&!dv.dynSz)adsDevilObj(f.divName,f.w,f.h,f,d,'0');
 return false
}
}
function atwDisplayText(dv,t,i){
	var x=adsGetObj(dv),f=x.getElementsByTagName('iframe')[0],d=f.contentWindow.document,z;
	if (!t)t=2
	else t=parseInt(t);
	if (!i)i=100
	else i=parseInt(i);
	t=t*(1000/i);
	if ((d.readyState&&d.readyState=='complete')||(f.textAdDelay>t)){
		f.textAdDelay=0;
		adsDoOnL(f,d,'1');
	}
	else {
		f.textAdDelay++;
		z=setTimeout(function(){return atwDisplayText(dv);},i);
	}
}
function adsDoOnL(f,d,c){
if (f&&(f.textAdDelay==0||c)){
	if (!adsCkCol(f,d)&&f.divName){
		var s=d.getElementById('adDiv').innerHTML,n=s.indexOf('\<\!--'),wi,h;
		if (n>0){
			var x=s.substr(n,s.length);
			if (c=='1'){
				var sc,z,re,arr=[],l;
				re=/aolTXT(.*?)[1-9]=["'](.*?)["']/ig;
				while (z=re.exec(x)){
					arr.push(z[1]);
					arr.push(z[2]);
				}
				l=arr.length;
				for (var i=0;i<l;i=i+2){
					if (arr[i+1]){
						if (arr[i]=='js'){
							sc=document.createElement('script');
							sc.src=arr[i+1];
							document.body.appendChild(sc);
						}
						else if (arr[i]=='imp'){
							sc=document.createElement('img');
							sc.src=arr[i+1];
						}
					}
				}
			}
		}
		if (s.indexOf('TextVendor')<0&&s.indexOf('TextCustom')<0){
			if (n>0){
				var x=s.substr(n,s.length),p=document.getElementById(f.divName),z=f.contentWindow.adComRedirect;
				if (z){
					adSetupDiv(f.w,f.h,z,f.divName,f.src,'text',f.mn,'0','0','0');
					adsDivs[adsDivs.length-1].LoadAd();
				}
				else {
					var xx='',ex=0;
					if (adsEAN&&!((f.w=='61'&&f.h=='21')||(f.w=='290'&&f.h=='18')||(f.w=='386'&&f.h=='280'))){
						xx+='<div style="position:relative;">';
						ex=1;
					}
					xx+=x;
					if (ex){
						xx+='<a style="position:absolute;outline:none;top:0;right:0;z-index:4999;" href="http://adinfo.aol.com/" target="_blank">';
						var se=(adsSecure)?'s://s':'://o';
						xx+='<img src="http'+se+'.aolcdn.com/ads/adchoicesi.png" style="border:none;margin:0px;width:19px;height:15px;vertical-align:top;" border=0 alt="AdChoices">';
						xx+='</a></div>';
					}
					p.innerHTML=xx;
					adsDevilObj(f.divName,f.w,f.h,f,d,'0');
				}
			}
		}
		else{
			if (/aolsize=["']([\d]*?)\|([\d]*)["']/i.test(s)){
				wi=unescape(RegExp.$1);
				h=unescape(RegExp.$2);
			}
			else{
				wi=f.w;
				h=f.h;
			}
			if (s.indexOf('TextCustom')>-1){
				f.style.width=wi+'px';
				f.style.height=h+'px';
				f.style.display='block';
				f.style.visibility='visible';
			}
			adsDevilObj(f.divName,wi,h,f,d,'1');
		}
	}
}
}
function adSetNetId(v){adsNt=v}
function adSetPlId(v){adsPl=v}
function adSetHtNm(){}
function adSetHtNmAT(v){
var p=location.protocol;
adsHt=(/^https?/i.test(v))?v:((/^\/\//.test(v))?p+v:p+'//'+v);
if (adsHt.charAt(adsHt.length-1)=='/')adsHt=adsHt.substring(0,adsHt.length-1);
}
function adSetAMS(){}
function adSetTarget(){}
function adSetSN(v){var c
if (v){
v=v.toString()
if ((v.indexOf('@aol.com')!=-1)||(v.indexOf('@aim.com')!=-1)){
v=v.split('@');
v=v[0];
}
if (window.btoa)c=btoa(v)
else{
var o="",c1,c2,c3,e1,e2,e3,e4,i=0,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
do {
c1=v.charCodeAt(i++)
c2=v.charCodeAt(i++)
c3=v.charCodeAt(i++)
e1=c1 >> 2
e2=((c1 & 3) << 4) | (c2 >> 4)
e3=((c2 & 15) << 2) | (c3 >> 6)
e4=c3 & 63
if (isNaN(c2))e3=e4=64
else if (isNaN(c3))e4=64
o=o+s.charAt(e1)+s.charAt(e2)+s.charAt(e3)+s.charAt(e4)
}
while (i<v.length);
c=o;
}
adsESN='&ESN='+c;}
}
function adSetWM(){}
function adSetOthAT(v,r){
if (adsUACH&&adsUACD>0)var x=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments)
else {
if (r)adsATOth='';
if (v){
 if (v.charAt(v.length-1)!=';')v+=';'
 var x=v.split(';'),l=x.length,y;
 for (i=0;i<l-1;i++){
  if (x[i].charAt(x[i].length-1)!='='){
    y=x[i].split('=');
    adsATOth+=escape(y[0])+"="+escape(y[1])+';';  
  }
 }
}
else if (v=='')adsATOth='';
try {ATW3_AdObj.adsATOth=adsATOth;}
catch(e){}
}
}
function adSetOthMob(){}
function adSetCo(v){
if (v)adsCo=v.toLowerCase();
}
function adSetAddOn(v){
if (adsAddOn!=2)adsAddOn=parseInt(v);
}
function adSetAJAXAddOn(v){
if (adsUACH&&adsUACD>0)var x=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments)
else adsAJAXAddOn=v
}
function adSetType(v){
if (adsUACH&&adsUACD>0)var x=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments)
else {
if (v=='')v='J'
adsTp=v.toUpperCase()
}
}
function adSetSearch(){}
function adSendTerms(){}
function adSetAdURL(u){
if (u=='fileless')adsFileless=1;
else if (adsFileless==1)u='fileless';
if (adsUACH&&adsUACD>0)var x=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments)
else adsPage=u;
}
function adsShowDiv(d){
var v=adsGetObj(d);
v.style.display="block"
}
function adsHideDiv(d){
var v=adsGetObj(d);
v.style.display="none"
}
function adsResetPg(){
adsTile=1;
adsDivs=[];
adsD=new Date();
adsScr=adsD.getTime()%0x3b9aca00;
adsATOth='';
adsAddOn=1;
atwReset=1;
adsRRDevil='';
aol_devil_flag='';
}
function adsReloadAll(){
adsD=new Date()
var z=adsDivs.length;
for (var i=0;i<z;i++)adsReloadAd(adsDivs[i],'','all')
}
function adsReloadAd(d,m,a){
	if (a!='all')adsD=new Date();
	var v=adsGetObj(d),s=v.adURL,dt=adsD.getTime()%0x3b9aca00;
	if (s){
		s=unescape(s);
		if (m)s=s.replace(/alias=(.*?);/,"alias="+m+";").replace(/kvmn=(.*?);/,"kvmn="+m+";");
		var i=s.indexOf(';grp='),u='';
		if (i==-1)u=s.replace(/ /, "")+" "
		else u=s.substring(0,i+5)+dt;
		u=u.replace(/kvgrp=[0-9]*;/,"kvgrp="+dt+";");
		if (s.indexOf('random=')>-1)u=u+';random='+dt;
		v.adURL=u;
		v.LoadAd();
	}
}
function adsReloadIframe(n,m,v){
var f='',s='';
try {f=document.getElementById(n)}
catch (e){}
if (f){
if (v!='all')adsD=new Date()
try {s=f.src}
catch (e){}
if (s){
s=unescape(s);
if (m)s=s.replace(/alias=(.*?);/,"alias="+m+";").replace(/kvmn=(.*?);/,"kvmn="+m+";")
var dt=adsD.getTime()%0x3b9aca00,i=s.indexOf(';grp=');
s=s.replace(/kvgrp=[0-9]*;/,"kvgrp="+dt+";")
try {f.src=s.substring(0,i+5)+dt}
catch(e){}}}
}
function adsReloadIframeAll(){
var n,f='';
adsD=new Date()
for (var i=0;i<adsTile;i++){
n='adsF'+i
try {f=document.getElementById(n)}
catch (e){break}
if (f)adsReloadIframe(n,'','all')}
}
function adSetOthDclk(v){}
function adSetDelay(){}
function adSetExt(){}
function adsGetAdURL(w){
var d=w.frameElement.parentNode;
return d.adURL
}
function adsDevilObj(d,w,h,f,doc,r){
var dv=document.getElementById(d),i=doc.getElementById('adDiv').innerHTML,n=dv.adNum+1;
var m=(/mnum=(.*?)\//i.test(i))?RegExp.$1:'',
a=(/aolAdId=("|')(.*?)("|')/i.test(i))?RegExp.$2:'|',
t=(/aolFormat=("|')(.*?)("|')/i.test(i))?RegExp.$2:'',
gu=(/aolGUID=("|')(.*?)("|')/i.test(i))?RegExp.$2:'',
tx=(f.textAd)?'1':'0',
st;
st=gu.split('|');
if (f.mn)aolAdFdBkStr+=f.mn+'|'+w+'|'+h+'|'+a+'|'+m+';';
if (a=='|')a='';
f.setAttribute('banId',a);
try {
window.adsDevilAd=window.adsDevilAd||{};
window.adsDevilAd.ad=window.adsDevilAd.ad||[];
adsDevilAd.ad[n]={
 divName:f.divName,
 mn:f.mn,
 adId:a,
 aolFormat:t,
 width:w,
 height:h,
 mnum:m,
 sz:f.sz,
 textAd:tx,
 seqId:st[1],
 timeStamp:st[0]
};
}
catch(e){}
try {
 adsDevilAd.ad[n].aolDevilFlag=top.aol_devil_flag;
 if (!adsRRDevil){
  if (f.sz=='300x250,300x600,300x1050'&&h!='1050')adsRRDevil='n';
  if (top.aol_devil_flag||(f.sz=='300x250,300x600,300x1050'&&h=='1050'))adsRRDevil='y'
 }
}
catch(e){}
try {
if (window.adsDevilAd.hasOwnProperty('resized'))adsDevilAd.resized(d,w,h);
if (window.adsDevilAd.hasOwnProperty('adinfo'))adsDevilAd.adinfo(n,d,w,h);
if (window.adsDevilAd.hasOwnProperty('adinfo2'))adsDevilAd.adinfo2(n,d,w,h);
if (window.adsDevilAd.hasOwnProperty('moat'))adsDevilAd.moat(n,d,w,h,tx);
if (window.atwUAC.hasOwnProperty('adLoaded'))atwUAC.adLoaded(n,adsDevilAd.ad[n]);
if (w=='300'){
 adsDevilAd.RRWidth=w;
 adsDevilAd.RRHeight=h;
}
}catch(e){}
}
function adsRMIFOnL(w,d){
var f=w.frameElement,v=f.parentNode,aD1=d.getElementById('adDiv').innerHTML,wi='',h='',z=0,a=0;
if (/ACE_AR(.*?)possible_size(.*?)[,}]/i.test(aD1)){
	a=1;
}
else if (/ACE_AR(.*?)Size(.*?)['"](.*?)['"]/i.test(aD1)){
	if (unescape(RegExp.$3).indexOf(',')>0){
		a=1;
	}
}
if ((/aolSize=["']([\d]*?)\|([\d]*)["']/i.test(aD1))&&(unescape(RegExp.$2)>1)){
 wi=unescape(RegExp.$1);
 h=unescape(RegExp.$2);
}
else{
 if (/ACE_AR(.*?)Size(.*?)[,}]/i.test(aD1)&&!a){
  var as=unescape(RegExp.$2).replace(/[^\d\+]/g,"");
  wi=parseInt(as.substring(0,3),10);
  h=parseInt(as.substring(3,as.length),10);
 }
 else {
    try{
     wi=f.contentWindow.document.body.scrollWidth;
     h=f.contentWindow.document.body.scrollHeight;
    }
    catch(e){}
 }
}
var vsz='';
if  (v.sz=='728x90,948x250,970x66,970x90,950x252,970x250,940x230'||v.sz=='728x90,948x250,950x252,940x230'){
	vsz='728x90,970x66,970x90,970x250,948x250';
}
else {
	vsz=v.sz;
}
if (wi&&h&&wi>1&&h>1&&!(v.w==wi&&v.h==h)&&v.sz){
	var s=vsz.split(','),l=s.length,x,lD=100,ma=0,di,i,zz;
	for (i=0;i<l;i++){
		x=s[i].split('x');
		di=Math.abs(x[0]-wi)+Math.abs(x[1]-h);
		if (di<lD){
			lD=di;
			ma=i;
		}
	}
	zz=s[ma].split('x');
	wi=zz[0];
	h=zz[1];
}
if (!a&&wi&&h&&wi>1&&h>1&&!(v.w==wi&&v.h==h)){
	z=1;
	f.width=wi;
	f.height=h;
}
adsDevilObj(v.divName,wi,h,f,d,z);
if (wi&&h&&f)f.className="uac_"+wi+"x"+h;
if (v.divName=='adsOverlayDiv'){
	v.style.width=wi+'px';
	v.style.height=h+'px';
}
if (!(v.w==wi)&&(document.getElementById(f.id+'EAN'))){
	var cw=document.documentElement.clientWidth,wid;
	if (cw<wi)wid=cw
	else wid=wi;
	document.getElementById(f.id+'EAN').style.width=wid+'px';
	document.getElementById(f.id+'EANA').style.right=0+'px';
}
}
function adsDisableEAN(v){
if (v=='0')adsEAN=1
else adsEAN=0
}
function adsWriteEAN(v,f,i){
	var c=0,wi=f.w;
	if (f.textAd&&(i.indexOf('TextVendor')>0||i.indexOf('TextCustom')>0)){
		c=1;
		if (f.divName){
			wi=document.getElementById(f.divName).offsetWidth;
		}
	}
	if (!f.textAd||c==1){
		var ean=document.createElement('div'),eans;
		ean.style.width=wi+'px';
		ean.style.height='15px';
		ean.style.top='0px';
		ean.style.left='0px';
		ean.style.margin='0 auto';
		ean.id=f.id+'EAN';
		ean.style.position='relative';
		var se=(adsSecure)?'s://s':'://o';
		if (c!=1){
			if (f.w<234||(f.w=='560'&&f.h=='35')){
				eans='<a id="'+f.id+'EANA" style="position:absolute;outline:none;left:'+(f.w-19)+'px;z-index:4999;margin:0 auto;width:19px;height:15px" href="http://adinfo.aol.com/" target="_blank"><img src="http'+se+'.aolcdn.com/ads/adchoicesi.png" style="border:none;width:19px;height:15px;vertical-align:top" alt="AdChoices"></a>';
			}
			else {
				eans='<a id="'+f.id+'EANA" style="position:absolute;outline:none;right:0px;z-index:4999;margin:0 auto;width:77px;height:15px" href="http://adinfo.aol.com/" target="_blank"><img src="http'+se+'.aolcdn.com/ads/adchoices.png" style="border:none;width:77px;height:15px;vertical-align:top" alt="AdChoices"></a>';
			}
			if (f.w=='560'&&f.h=='35'){
				ean.style.position='absolute';
				ean.style.width='auto';
			}
			ean.innerHTML=eans;
			v.appendChild(ean);
		}
		else {
			eans='<a id="'+f.id+'EANAT" style="position:absolute;outline:none;right:0px;z-index:4999;margin:0 auto;width:19px;height:15px" href="http://adinfo.aol.com/" target="_blank"><img src="http'+se+'.aolcdn.com/ads/adchoicesi.png" style="border:none;width:19px;height:15px;vertical-align:top" alt="AdChoices"></a>';
			ean.innerHTML=eans;
			v.insertBefore(ean,v.firstChild);
		}
	}
}	
function adsRmChildren(o){
var f=null;
while (o.childNodes.length>0){
var c=o.childNodes[0],i=c.id
if (i){
if (i.toString().indexOf("atwAdFrame")!=-1){
f=c
f.src="about:blank"}
c.i=""}
if (c.childNodes.length>0)adsRmChildren(c)
o.removeChild(c)}
}
function adsClrDiv(){adsRmChildren(this)}
function adsClrAd(d){
var o=adsGetObj(d);
adsRmChildren(o)
}
function adsGetObj(d){
var o;
if (typeof(d)!='object')o=document.getElementById(d)
else o=d
return o
}
function adsFilelessFn(i,u){
var i2=(i.contentWindow)?i.contentWindow:(i.contentDocument.document)?i.contentDocument.document:i.contentDocument;
i2.document.open();
var iStr='<html><head><script type="text/javascript">\n';
iStr+='function adsPageOnL(){var adFr=window.frameElement;\n';
iStr+=' if (adFr){if (adFr.textAd!=1){var collapse=parent.adsCkCol(adFr,document);\n';
iStr+=' if (!collapse&&adFr.divName){var parDiv=parent.document.getElementById(adFr.divName);\n';
iStr+=' if (parDiv&&(parDiv.dynSz==1)&&parent.adsRMIFOnL){parent.adsRMIFOnL(window,document)}}}else{parent.adsDoOnL(adFr,document)}}}\n';
iStr+='</script></head>\n';
iStr+='<body onload=\'setTimeout("adsPageOnL()",10)\' style="overflow: visible; border:0; background-color: transparent;">\n';
iStr+='<div id="adDiv" style="overflow: visible; border:0;">\n';
iStr+='<script type="text/javascript">\n';
iStr+='var inDapIF=true;inFIF=true;\n';
iStr+='</script>\n';
iStr+="<script type='text/javascript' src='"+u+"'></script>";	
iStr+='</script></div></body></html>';
i2.document.write(iStr);
if (adsIELT10)var z=setTimeout(function(){i2.document.close();},1000)
else i2.document.close();
}
function adsLoadAd(){
this.ClearAd()
var f=document.createElement('iframe');
f.setAttribute("itemscope","");
f.setAttribute("itemtype","https://schema.org/WPAdBlock");
f.textAd=this.textAd;
f.textAdDelay=this.textAdDelay;
if ((this.textAd==1)||(this.col)){
f.style.visibility='hidden';
if (adSetInV=='0')f.style.display='none';
f.width=0;  
f.height=0;
}else{
f.width=this.w
f.height=this.h
}
f.title="Ad"
f.marginWidth=0
f.marginHeight=0
f.setAttribute('allowtransparency','true')
f.frameBorder=0
f.scrolling="no"
f.w=this.w
f.h=this.h
f.mn=this.mn
f.divName=this.divName
f.sz=this.sz
f.inV=this.vis
f.adNum=this.adNum;
this.appendChild(f);
if (this.iframe){
	f.id="adsF"+this.adNum;
	if (adsEAN)adsWriteEAN(this,f,'');
	if (f.inV=='0'){
		f.src=this.adURL;
	}
	else {
 		this.adURL=this.adURL.replace(/kvmn=/,"kvvis=1;kvmn=");
		f.adURL=this.adURL;
 		f.url=this.adURL;
 		var z=setTimeout(function(){adsDelaySonar(f,adsSonarT);},100);
	}
}
else
{
	f.id="atwAdFrame"+this.adNum;
	if ((document.domain!=location.hostname)&&(this.adPage.indexOf('#')==-1))this.adPage=this.adPage+'#'+document.domain
	if (this.adPage||adsFileless==1){
		if (f.inV=='0'){
			if (adsFileless==1)adsFilelessFn(f,this.adURL)
			else f.src=this.adPage;
		}
		else{
 			f.url=this.adPage;
 			this.adURL=this.adURL.replace(/kvmn=/,"kvvis=1;kvmn=");
			f.adURL=this.adURL;
 			var z=setTimeout(function(){adsDelaySonar(f,adsSonarT);},100);
		}
	}
}
}
function adsDelaySonar(f,t){
if (atwLoaded&&(atwReset==0||adsRRDevil!='')){
 if (t){
  setTimeout(function(){adsDelaySonar(f,0);},t);
 }
 else if (f.inV!='D'||adsRRDevil=='n'||!adsRRCalled){
  if (adsSonar(f,function(){},{visibility:adsSonarV})){
   if (adsFileless==1)adsFilelessFn(f,f.adURL)
   else f.src=f.url;
  }
  else{ 
   adsSonar(f,function(){
    this.scrollin=false;
    if (f.inV!='D'||adsRRDevil=='n'||!adsRRCalled){
	if (adsFileless==1)adsFilelessFn(f,f.adURL)
	else f.src=f.url;
    };
    },
    {visibility:adsSonarV}
   )
  }
 }
 else {
	if (adsRRDevil=='')setTimeout(function(){adsDelaySonar(f,t);},100);
 }
}
else {
 setTimeout(function(){adsDelaySonar(f,t);},100);
}
}
function adSetupDiv(w,h,u,dv1,pg,ds,m,sz,c,v){
var s="adsDiv"+adsDivs.length,d,t=0;
if (ds=='textd'){
	ds='text';
	t=1;
}
if (!dv1||dv1==""){
document.write("<div id='"+s+"'></div>")
d=document.getElementById(s)
dv1=s;
if (ds!='text')d.style.fontSize='0px';
}
else d=adsGetObj(dv1)
if (typeof(dv1)=='object'){
 try {
  if (dv1.id==''){
   d.divName=s;
   d.id=s;
  }
  else d.divName=dv1.id
 }
 catch(e){}
}
else {
 d.divName=dv1
}
d.LoadAd=adsLoadAd
d.ClearAd=adsClrDiv
d.mn=m
if (ds=='text')d.textAd=1
else d.textAd=0;
if (ds&&ds!='text'&&ds!='iframe')d.dynSz=1
else d.dynSz=0;
if (sz)d.sz=sz
else d.sz=0;
d.w=w;d.h=h;
d.adURL=u
d.adPage=pg
d.adNum=adsDivs.length
d.col=c;
d.vis=v;
d.delayed=0;
if (t)d.textAdDelay=1
else d.textAdDelay=0;
if (ds=='iframe')d.iframe=1
else d.iframe=0;
adsDivs[adsDivs.length]=d
}
function adsCkPlg(){
var dF='no',n=navigator,a,d,p=n.plugins;
if (p&&p.length>0){
	var m=n.mimeTypes,fl=m['application/x-shockwave-flash'];
	if (m&&((fl&&fl.enabledPlugin&&(fl.suffixes.indexOf('swf')!=-1)))){
		var ds,f="Flash ",fS,l=p.length;
		for (var i=0;i<l;i++){
			ds=p[i].description;
			fS=ds.indexOf(f);
			if (fS!=-1){
				if (ds.substring(fS+6,fS+8)>=10){
					dF=ds.substring(fS+6,fS+8);
				}
			}
		}
	}
}
else {
	if (adsIE&&(adsUA.indexOf('win')!=-1)){
		try {
			a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			if (a){
				d=a.GetVariable("$version").split(" ")[1].split(",");
				if (d[0]>=10)dF=d[0]
			}
		}
		catch(e){}
	}
}
adsNMSG=dF;
}
function adsGetValues(){
var l=unescape(adsLo),p='',r='',s='',t='',v,x=0,re='',le,ln,n;
n=(/(\?|&)atw[Nn][Tt]=(.*?)(&|$)/.test(adsLo))?(RegExp.$2):'';
if (n)adsNt=n;
if (l.indexOf('&pLid')>0)v=l.match(/[?&]icid=.*?[|](.*?)[|](.*?)[|](.*?)&pLid=(.*?)($|\&|\|)/);
else v=l.match(/[?&]icid=.*?[|](.*?)[|](.*?)[|](.*?)[|](.*?)($|\&|\|)/);
if (v){
for (var i=1;i<=4;i++){
if (!(/^[0-9A-Za-z:\/._|\-]+$/.test(v[i]))){x=1;
break;
}
r+=v[i]+':'
}
if (!x)r='kvdl='+r.substring(0,r.length-1)+';';
else r='';
}
p=adsLo.substr(7).toLowerCase();
p=p.replace(/www\./,'');
p=p.replace(/\.com/,'');
p=p.replace(/[?#].*$/,'');
p=escape(p);
le=p.length;
if (le>48){
 p=p.substr(0,48);
 ln=p.length;
 if (p[ln-1]=='%')p=p.substr(0,47);
 else if (p[ln-2]=='%')p=p.substr(0,46);
}
p="kvpg="+p+";";
p=p.replace(/\/;$/,';');
p=p.replace(/\//g,'%2F');
if (adsATOth.indexOf('kvugc')==-1){
 s='kvugc=';
 if (window.adSetUGC==0)s+='0;'
 else if (window.adSetUGC==1)s+='1;'
 else{
  if (adsATOth.indexOf('cmsid')==-1)s+='0;'
  else s+='1;'
 }
}
try {
if (/(^|;)?UNAUTHID=(.*?)[.](.*?)[.]/i.test(document.cookie))t='kvui='+unescape(RegExp.$3)+';';
}
catch(e){}
var y1,g='kvh5lsid=0;';
try {
 y1=window.localStorage.getItem('adsGUID');
 if (y1){
   g=g.replace('0','1');
   g+='GUID='+y1+';';
 }
}
catch(e){}
try {
 var u=document.referrer;
 if (u){
   v=u.match(/https?\:\/\/(?:www.)?(.*?)(?:[\/?#]|$)/);
   re='kvrefd='+ RegExp.$1+';';
 }
}
catch(e){}
return p+r+s+t+g+re;
}
!function(e,t,o){"use strict";function n(t,n){var r;return function(){function l(){r=o,t.call(this)}r||(r=e.setTimeout(l,n))}}function r(t,o){return e.getComputedStyle?e.getComputedStyle(t).getPropertyValue(o):t.currentStyle?t.currentStyle[o]:void 0}function l(t,o,l){"object"==typeof o?l=o:"function"==typeof o&&(l?l.scrollin=o:l={scrollin:o});var a=l.parent;if(!a){for(var f,d=t;(d=d.parentNode)&&1===d.nodeType;)if(f=r(d,"overflow"),"auto"===f||"scroll"===f){a=d;break}a=a||e}if(l.parent=a===e?c:a,l.scrollin||l.scrollout){l.elem=t,u.push(l),s();var p=l.delay||13;a.sonarBound||(a.addEventListener?(a.addEventListener("scroll",n(s,p),!1),a.addEventListener("resize",n(s,p),!1)):e.attachEvent&&(a.attachEvent("onscroll",n(s,p)),a.attachEvent("onresize",n(s,p))),a.sonarBound=!0)}return i(t,l.distance,l.visibility,l.parent)}function i(e,n,r,l){a||(a=t.body),r||(r=0),n===o&&(n=0);var i=e,s=0,u=a.offsetHeight,f=l.clientHeight||0,d=l===c?a.scrollTop||c.scrollTop:l.scrollTop,p=e.offsetHeight||0;if(!e.sonarElemTop||e.sonarBodyHeight!==u){for(;i!==l&&i.offsetParent;)s+=i.offsetTop,i=i.offsetParent;e.sonarElemTop=s,e.sonarBodyHeight=u}return e.sonarElemTop+p-r*p>d-n&&e.sonarElemTop+r*p<d+f+n}function s(){var e,t,o;for(e in u)u.hasOwnProperty(e)&&(t=u[e],(t.scrollin||t.scrollout)&&(o=i(t.elem,t.distance,t.visibility,t.parent),o!==t.detected&&(o?t.scrollin&&t.scrollin.call(t,t.elem):t.scrollout&&t.scrollout.call(t,t.elem),t.detected=o)))}var a,c=t.documentElement,u=[];l.poll=s,e.adsSonar=l}(window,document);
function adSetSticky(v,t){}
var adSetInV='0',adsSonarT=0,adsSonarV=0;
function adSetInView(o,v,t){
if (adsUACH&&adsUACD>0)var x=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments)
else {
if (o)adSetInV=o; 
if (v)adsSonarV=parseFloat(v);
if (t)adsSonarT=parseInt(t);
}
}
function adsATWDelay(z,a){
adsUACH='';
switch(z){
	case 'htmlAdWH':
		htmlAdWH(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]);
		break;
	case 'adSetAdURL':
		adSetAdURL(a[0]);
		break;
	case 'adSetMOAT':
		adSetMOAT(a[0]);
		break;
	case 'adSetOthAT':
		adSetOthAT(a[0]);
		break;
	case 'adSetType':
		adSetType(a[0]);
		break;
	case 'adSetInView':
		adSetInView(a[0],a[1],a[2]);
		break;
	case 'adSetAJAXAddOn':
		adSetAJAXAddOn(a[0]);
		break;
	case 'adsOverlayAd':
		adSetAJAXAddOn(a[0],a[1],a[2]);
		break;
	case 'adsResizePortrait':
		adsResizePortrait(a[0]);
		break;

}
}
function htmlAdWHDyn(m,s,t,dv,fn,ds){htmlAdWH(m,'','',t,dv,fn,ds,s.toString())}
function htmlAdWH(m,w,h,t,dv,fn,ds,sz){
if (adsUACH&&adsUACD>0)
{
	var ti=setTimeout(adsATWDelay,3000,arguments.callee.name,arguments)
}
else {
if (m)m=m.toString()
else return 0;
var d=document,inc='',s,r=0,st="<script type='text/javascript' src='",sp1,ye=0,c=0,f=0,rr=0,wi=window,pr=location.protocol+'//',ow=w,oh=h,osz=(sz)?sz:'',cw=970,txt='text';
if (pr.indexOf('http')<0)pr='http://';
if (!adsVal)adsVal=adsGetValues();
if (!adsChn&&wi.s_265&&wi.s_265.channel)adsChn='kvoch='+escape(wi.s_265.channel)+';';
if (t){
	t=t.toLowerCase();
	if (t.indexOf('c')>0){c=1;t=t.substr(0,t.length-1)}
	if (t=='textd'){txt+='d';t='text'}
	else if (t=='filelesstext'){t='text';adsFileless=1;}
	else if (t=='filelessajax'){t='ajax';adsFileless=1;}
	else if (t=='filelesstextd'){t='text';txt+='d';adsFileless=1;}
}
if (t=='fileless')adsFileless=1;
if (adsTp=='F'||t=='ajax'||t=='f'||t=='fileless')f=1;
if (t=='text'||f){
	if (!fn||fn=='')fn=adsPage;
	if (adsPage=='fileless'||t=='fileless')adsFileless=1;
	if ((fn==''||(adsUA.indexOf('opera')>-1))&&(adsFileless!=1)){adsTp='J';t='',f=''}
}
try{if (document&&document.documentElement)cw=document.documentElement.clientWidth;}
catch(e){}
if (sz){
	sp1=sz.split(',')[0].split('x');
	w=sp1[0];
	h=sp1[1];
	if (f)ds='r';
	if (adsRePo=='1'&&cw<970&&t!='text'){
		var ss2,ss3,ss4='',ssL;
		ss2=sz.split(',');
		ssL=ss2.length;
		for (var i=0;i<ssL;i++){
			ss3=ss2[i].split('x');
			if (parseInt(ss3[0])<970)ss4+=ss2[i]+',';
		}
		if (ss4=='')return 0
		else sz=ss4.substring(0,ss4.length-1);
	}
}
else sz='';
if (adsSZ){
	var sL=adsSZ.length,ss;
	for (var i=0;i<sL;i=i+2){
		if (adsTile==adsSZ[i+1]){
			ss=adsSZ[i].split('x');
			w=ss[0];
			h=ss[1];
			break;
		}
	}
}
if (w=='RR'||w=='rr'){
	 w=300;h=250;
	 if (f)ds='r';
	 sz='300x250,300x600,300x1050';
	 rr=1;
	 adsRRCalled='1';
}
else if (w=='LB'||w=='lb'){
	w=728,h=90;
	if (f)ds='r';
	sz='728x90,948x250,950x252,940x230,101x1';
	if (adsRePo!='1'||cw>=970)sz+=',970x66,970x90,970x250';
}
else if (w=='MM'||w=='mm'){
	w=300,h=250;
	if (f)ds='r';
	sz='300x250,320x480,300x600,320x50';
}
else if (w>=970&&cw<970&&adsRePo=='1'&&t!='text'){
	return 0;
}
if (adsCp){
	var cl=adsCF.length;
	for (var i=0;i<cl;i++){
		if ((/http[s]{0,1}:\/\/[^\/]*?aol.com(:[0-9]*?){0,1}\//.test(adsCF[i]))&&(/^[0-9A-Za-z\/.:_\-]+$/.test(unescape(adsCF[i])))){
			if (sz){
				var sp2=sz.split(','),le=sp2.length,sp3;
				for (var j=0;j<le;j++){
					sp3=sp2[j].split('x');
					if (adsCW[i]==sp3[0]&&adsCH[i]==sp3[1])ye=1;
				}
			}
			if (ye||(adsCW[i]==w&&adsCH[i]==h)||(adsCAd[i]==adsTile)){
				if (adsTp=='I'||t=='iframe')s=adsCF[i]+'.html'
				else s=adsCF[i]+'.js';
				adsCW[i]=0;
				r=1;
				break; 
			}
		}
	}
}
if (adsMNS){
	var mL=adsMNS.length,wxh=w+'x'+h,num,all=0;
	for (var i=0;i<mL;i=i+2){
		num=adsMNS[i+1];
		if (num.indexOf('a')>0){
			num=num.replace('a','');
			all=1;
		}
		else {
			all=0;
		}
		if (num.indexOf('only')>-1){
			num=num.replace('only','');
			only=1;
		}
		else {
			only=0;
		}
		if ((adsTile==num)||(wxh==num)||(num=='RRxRR'&&rr==1)){
			m=adsMNS[i];
			if (!all)adsMNS[i+1]='';
			if (only)adsMNS[i+1]='only';
		}
		else if (only){
			m='0';
		}
	}
}
if (m=='0'){adsTile++;return 0}
var adsTpOrig=adsTp;
if (adsTPS){
	var tL=adsTPS.length;
	for (var i=0;i<tL;i=i+2){
		if (adsTile==adsTPS[i+1]){
			t=adsTPS[i].toLowerCase();
			if (t=='j'){adsTp='J';t=''}
			else if (t=='i'){adsTp='I';t=''}
			else if (t=='fileless')adsFileless=1
			else adsTp='';
			break;
		}
	}
}
if (r==0){
	if (!adsNMSG&&adsUA.indexOf('ipad')==-1&&adsUA.indexOf('iphone')==-1)adsCkPlg();
	if (!adsNMSG||adsNMSG=='no')inc='artexc=art_flash,art_rrflash;';
	var s1='',s2='';
	if (sz&&!rr)s2="allowedSizes="+sz+";"
	else if (ds!='r')s2="size="+w+"x"+h+";"
	s2+="noperf=1;";
	if (adsAddOnMQ){
		if (adsAddOnMQ=='y')s2+="noaddonpl=y;"
	}
	else {
		if ((t=='ajax'&&!adsAJAXAddOn)||adsAddOn==2){
			s2+="noaddonpl=y;";
			adsAddOn=2;
		}
		else{
			if (adsTile==1){
				if (adsAddOn==1)adsAddOn=2;
				else s2+="noaddonpl=y;";
			}
			else {
				if (adsAddOn!=1)s2+="noaddonpl=y;";
				else adsAddOn=2;
			}
		}
	}
	if (adsExcV=='blank')inc='artexc=all;'
	else if (adsExcV=='imgOnly')inc='artexc=all;artinc=art_image,art_img1x1,art_3pimg,art_rrimage,art_rrimg1x1,art_rr3pimg;';
	else if (adsExcV=='noflash')inc='artexc=art_flash,art_rrflash;'
	s1=adsATOth.toLowerCase()+adsVal+'kvmn='+m+';kvgrp='+adsScr+';kvismob='+adsDev+';'+adsChn+adsMOE+"extmirroring=0;kvtile="+adsTile+";target=_blank;aduho="+(-1*adsD.getTimezoneOffset())+";";
	s2+=inc+s1+"grp="+adsScr;
	if ((m.indexOf('-')>-1)&&(/^[0-9a-fm\-]+$/i.test(m))){
		if (m.substring(0,1).toLowerCase()=='m')m=m.substring(1,m.length);
		if (adsHt&&adsHt!='https://at.atwola.com')s=adsHt
		else {
			s=pr+'mads';
			if (adsCo!='us')s+='uk';
			s+='.at.atwola.com';
		}
		if (f)ds='r';
		var kf='kvmflash=',swh='',inI=false,inSD=true,pU,sd='',fl;
		if (adsNMSG&&adsNMSG!='no')fl=adsNMSG
		else fl='';
		if (fl)kf+='true;'
		else kf+='false;';
		if (wi.screen && wi.screen.width && wi.screen.height)swh='swh='+wi.screen.width+'x'+wi.screen.height+';screenwidth='+wi.screen.width+';screenheight='+wi.screen.height+';';
		try {
			if (wi.devicePixelRatio)sd='screendensity='+wi.devicePixelRatio+';';
			if (wi.top!==wi.self)inI=true;
			pU=wi.top.location.href.toString();
		}
		catch (e){}
		if (!pU||pU==="undefined"){
			inI=true;
			inSD=false;
		}
		var f1="f="+(inI?(inSD?"1":"2"):"0")+";",f2="fv="+(fl?fl:"0")+";";
		s+='/adcall?mpid='+m+';rettype=js;width='+w+';height='+h+';'  
		s+=s1+kf+swh+sd+f1+f2+'optn=1;grp='+adsScr+';random='+adsScr;
	}
	else {
		if (adsDev=='1'&&adsTp!='A0'&&adsTp!='A1'){
			var sm='alias='+m+';random='+adsScr+';sizeId=-1;';
			sm+=s2;
			s=pr;
			if (t=='iframe'||adsTp=='I'){
				sm+='|'+adsNt+'|'+adsPl+'|'+adsCo;
				sm=unescape(sm);
				if (adsSecure)s+='s'
				else s+='o';
				s+='.aolcdn.com/ads/mobileIframe.html?s='+escape(sm);
			}
			else {
				s+='mads';
				if (adsCo!='us')s+='uk';
				s+='.at.atwola.com/adcall?mpid=348-d-d-e;rettype=js;callProtocol=3.0;networkId='+adsNt+';placementid='+adsPl+';'+sm;
			}
		}
		else
		{
			if (adsHt)s=adsHt
			else s=pr+'at.atwola.com';
			s+="/addyn/3.0/"+adsNt+"/"+adsPl+"/0/-1/";
			s+=s2.replace(/noperf=1;/,'noperf=1;alias='+m+';');
		}
	}
}
if (t=='return'){
	adsTile++;
	adsTp=adsTpOrig;
	return s;
}
if (t!='text' && t!='ajax' && t!='f' && t!='iframe' && t!='fileless' && adsTp)t=adsTp
var ttype=''
if (t)ttype=t
else t=adsTp;
atwUAC.adsInfo[adsTile]={
 mn:m,
 url:s,
 origW:ow,
 origH:oh,
 sz:osz,
 other:adsATOth,
 ttype:t
}
if (t=='text'){
	adSetupDiv(w,h,s,dv,fn,txt,m,sz,c,adSetInV);
	adsDivs[adsDivs.length-1].LoadAd();
}
else if (t=='ajax'){
	adSetupDiv(w,h,s,dv,fn,ds,m,sz,c,adSetInV);
	if (!adsSyncDelay||adsDivs.length==1||adsLoadSync)adsDivs[adsDivs.length-1].LoadAd()
	else {
		adsDivs[adsDivs.length-1].delayed=1;
		if (!adsSyncTime)adsSyncTime=setTimeout(adsLoadedSync,adsSyncDelay);
	}
}
else if (t=='iframe'){
	adSetupDiv(w,h,s.replace(/addyn\/3.0/,"adiframe/3.0"),dv,fn,'iframe',m,sz,c,adSetInV);
	adsDivs[adsDivs.length-1].LoadAd();
}
else if (adsTp=='F'||t=='f'||t=='fileless'){
	adSetupDiv(w,h,s,dv,fn,ds,m,sz,c,adSetInV);
	if (!adsSyncDelay||adsDivs.length==1||adsLoadSync)adsDivs[adsDivs.length-1].LoadAd()
	else {
		adsDivs[adsDivs.length-1].delayed=1;
		if (!adsSyncTime)adsSyncTime=setTimeout(adsLoadedSync,adsSyncDelay);
	}
}
else if (adsTp=='A0'||adsTp=='A1'){
	var ai;
	if (adsTp=='A0')ai=d.getElementById('adsF0')
	else ai=d.getElementById('adsF1');
	adsD=new Date();
	dt=adsD.getTime()%0x3b9aca00;
	ai.src=s.replace(/addyn\/3.0/,"adiframe/3.0").replace(/grp=[0-9]*/,"grp="+dt);
}
else if (adsTp!='J'){
	d.write("<iframe title='Ad' name='adsF"+adsLNm+"' id='adsF"+adsLNm+"' src='"+s.replace(/addyn\/3.0/,"adiframe/3.0")+"' width='"+w+"' height='"+h+"'  scrolling=no frameborder=0 marginheight=0 marginwidth=0></iframe>");
	var xx=document.getElementById('adsF'+adsLNm);
	if (xx){
		x.setAttribute("itemscope","");
		x.setAttribute("itemtype","https://schema.org/WPAdBlock");
	}
	if (adsEAN){
		var se=(adsSecure)?'s://s':'://o';
		if (w<234){
			d.write('<BR><a id="adsF'+adsLNm+'EANA" style="position:absolute;outline:none;left:'+(w-19)+'px;z-index:4999;margin:0 auto;width:19px;height:15px" href="http://adinfo.aol.com/" target="_blank"><img src="http'+se+'.aolcdn.com/ads/adchoicesi.png" style="border:none;width:19px;height:15px;vertical-align:top" alt="AdChoices"></a>');
		}
		else {
			d.write('<BR><a id="adsF'+adsLNm+'EANA" style="position:absolute;outline:none;left:'+(w-77)+'px;z-index:4999;margin:0 auto;width:77px;height:15px" href="http://adinfo.aol.com/" target="_blank"><img src="http'+se+'.aolcdn.com/ads/adchoices.png" style="border:none;width:77px;height:15px;vertical-align:top" alt="AdChoices"></a>');
		}
	}
	adsLNm++;
}
else if (adsTp=='J'){
	if (dv==undefined||s.indexOf('//mads')>-1){d.write(st+s+"'></script>");}
	else {
		 s=s.replace(/allowedSizes=.*?;/,"size="+w+"x"+h+";");
		 if (s.indexOf('size=')==-1)s=s.replace(/\/0\/-1\//, "\/0\/-1\/size="+w+"x"+h+";");
		 var dv1=adsGetObj(dv),img=d.createElement('img'),li=document.createElement('a');
		 li.href=s.replace(/addyn/,"adlink");
		 li.target='_blank';
		 img.src=s.replace(/addyn/,"adserv");
		 img.alt='Ad';
		 img.height=h;
		 img.width=w;
		 li.appendChild(img);
		 dv1.appendChild(li);
	}
}
if (adsTile==1&&adsOverS!='')var tO=setTimeout(adsOverlayAdCall,adsOverDelay,adsOverS);
adsTile++;
adsTp=adsTpOrig;
}
}
function imageAdWH(){}
window.atwUAC=window.atwUAC||{};
atwUAC.adsInfo=atwUAC.adsInfo||{};
}