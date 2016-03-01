
(function(e){var t=function(e,t){return e<<t|e>>>32-t};var n=function(e,t){var n,r,i,s,o;i=e&2147483648;s=t&2147483648;n=e&1073741824;r=t&1073741824;o=(e&1073741823)+(t&1073741823);if(n&r)return o^2147483648^i^s;if(n|r){if(o&1073741824)return o^3221225472^i^s;else return o^1073741824^i^s}else{return o^i^s}};var r=function(e,t,n){return e&t|~e&n};var i=function(e,t,n){return e&n|t&~n};var s=function(e,t,n){return e^t^n};var o=function(e,t,n){return t^(e|~n)};var u=function(e,i,s,o,u,a,f){e=n(e,n(n(r(i,s,o),u),f));return n(t(e,a),i)};var a=function(e,r,s,o,u,a,f){e=n(e,n(n(i(r,s,o),u),f));return n(t(e,a),r)};var f=function(e,r,i,o,u,a,f){e=n(e,n(n(s(r,i,o),u),f));return n(t(e,a),r)};var l=function(e,r,i,s,u,a,f){e=n(e,n(n(o(r,i,s),u),f));return n(t(e,a),r)};var c=function(e){var t;var n=e.length;var r=n+8;var i=(r-r%64)/64;var s=(i+1)*16;var o=Array(s-1);var u=0;var a=0;while(a<n){t=(a-a%4)/4;u=a%4*8;o[t]=o[t]|e.charCodeAt(a)<<u;a++}t=(a-a%4)/4;u=a%4*8;o[t]=o[t]|128<<u;o[s-2]=n<<3;o[s-1]=n>>>29;return o};var h=function(e){var t="",n="",r,i;for(i=0;i<=3;i++){r=e>>>i*8&255;n="0"+r.toString(16);t=t+n.substr(n.length-2,2)}return t};var p=function(e){e=e.replace(/\x0d\x0a/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t};e.extend({solder:function(e){var t=Array();var r,i,s,o,d,v,m,g,y;var b=7,w=12,E=17,S=22;var x=5,T=9,N=14,C=20;var k=4,L=11,A=16,O=23;var M=6,_=10,D=15,P=21;e=p(e);t=c(e);v=1732584193;m=4023233417;g=2562383102;y=271733878;for(r=0;r<t.length;r+=16){i=v;s=m;o=g;d=y;v=u(v,m,g,y,t[r+0],b,3614090360);y=u(y,v,m,g,t[r+1],w,3905402710);g=u(g,y,v,m,t[r+2],E,606105819);m=u(m,g,y,v,t[r+3],S,3250441966);v=u(v,m,g,y,t[r+4],b,4118548399);y=u(y,v,m,g,t[r+5],w,1200080426);g=u(g,y,v,m,t[r+6],E,2821735955);m=u(m,g,y,v,t[r+7],S,4249261313);v=u(v,m,g,y,t[r+8],b,1770035416);y=u(y,v,m,g,t[r+9],w,2336552879);g=u(g,y,v,m,t[r+10],E,4294925233);m=u(m,g,y,v,t[r+11],S,2304563134);v=u(v,m,g,y,t[r+12],b,1804603682);y=u(y,v,m,g,t[r+13],w,4254626195);g=u(g,y,v,m,t[r+14],E,2792965006);m=u(m,g,y,v,t[r+15],S,1236535329);v=a(v,m,g,y,t[r+1],x,4129170786);y=a(y,v,m,g,t[r+6],T,3225465664);g=a(g,y,v,m,t[r+11],N,643717713);m=a(m,g,y,v,t[r+0],C,3921069994);v=a(v,m,g,y,t[r+5],x,3593408605);y=a(y,v,m,g,t[r+10],T,38016083);g=a(g,y,v,m,t[r+15],N,3634488961);m=a(m,g,y,v,t[r+4],C,3889429448);v=a(v,m,g,y,t[r+9],x,568446438);y=a(y,v,m,g,t[r+14],T,3275163606);g=a(g,y,v,m,t[r+3],N,4107603335);m=a(m,g,y,v,t[r+8],C,1163531501);v=a(v,m,g,y,t[r+13],x,2850285829);y=a(y,v,m,g,t[r+2],T,4243563512);g=a(g,y,v,m,t[r+7],N,1735328473);m=a(m,g,y,v,t[r+12],C,2368359562);v=f(v,m,g,y,t[r+5],k,4294588738);y=f(y,v,m,g,t[r+8],L,2272392833);g=f(g,y,v,m,t[r+11],A,1839030562);m=f(m,g,y,v,t[r+14],O,4259657740);v=f(v,m,g,y,t[r+1],k,2763975236);y=f(y,v,m,g,t[r+4],L,1272893353);g=f(g,y,v,m,t[r+7],A,4139469664);m=f(m,g,y,v,t[r+10],O,3200236656);v=f(v,m,g,y,t[r+13],k,681279174);y=f(y,v,m,g,t[r+0],L,3936430074);g=f(g,y,v,m,t[r+3],A,3572445317);m=f(m,g,y,v,t[r+6],O,76029189);v=f(v,m,g,y,t[r+9],k,3654602809);y=f(y,v,m,g,t[r+12],L,3873151461);g=f(g,y,v,m,t[r+15],A,530742520);m=f(m,g,y,v,t[r+2],O,3299628645);v=l(v,m,g,y,t[r+0],M,4096336452);y=l(y,v,m,g,t[r+7],_,1126891415);g=l(g,y,v,m,t[r+14],D,2878612391);m=l(m,g,y,v,t[r+5],P,4237533241);v=l(v,m,g,y,t[r+12],M,1700485571);y=l(y,v,m,g,t[r+3],_,2399980690);g=l(g,y,v,m,t[r+10],D,4293915773);m=l(m,g,y,v,t[r+1],P,2240044497);v=l(v,m,g,y,t[r+8],M,1873313359);y=l(y,v,m,g,t[r+15],_,4264355552);g=l(g,y,v,m,t[r+6],D,2734768916);m=l(m,g,y,v,t[r+13],P,1309151649);v=l(v,m,g,y,t[r+4],M,4149444226);y=l(y,v,m,g,t[r+11],_,3174756917);g=l(g,y,v,m,t[r+2],D,718787259);m=l(m,g,y,v,t[r+9],P,3951481745);v=n(v,i);m=n(m,s);g=n(g,o);y=n(y,d)}var H=h(v)+h(m)+h(g)+h(y);return H.toLowerCase()}})})(jQuery)

var badgeLoc;
var badgeHost;
var getBadgeScriptUrl;
var badgeHostRSA;
var threeSixtyFingerprint;
var badgeJs = 'badge-config-v';
var badgeFile = 'badge-v1.js';
var dlh;
var ieFix = false;
var badgeCookie = 'wwwLogin';
var badgeCookieSpec = { expires: 365, domain: '.capitalone.com', path: '/' };
var overrideBadgeMarkup = 0;
var envset;
var qaSet = 0;
var qaenv = '';
var chop3 = '';
var skipLoad = 1;
var resourceCount = 0;
var prot = location.protocol + '//';
var end;

$('script').each(function(){
    if($(this)[0].src.indexOf(badgeJs) > -1){
        badgeLoc = $(this)[0].src.substr(0,$(this)[0].src.indexOf('/resources'));
        prot = location.protocol + '//';
            if(badgeLoc.indexOf('kdc') > -1){
                    domain = '.kdc.capitalone.com';
            } else {
                    domain = '.capitalone.com';
            }

        if ($.browser.msie)
        {
            if (document.documentMode <= 7 || document.documentMode === undefined)
            {
		ieFix = true;
		badgeLoc = location.protocol + badgeLoc;
            }
        }
        chop2 = badgeLoc.substr(0,badgeLoc.indexOf(domain)).substr(window.prot.length,badgeLoc.substr(0,badgeLoc.indexOf(domain)).length);
    }
});

var gtmHost = 'login';
var eos_ssotgt = 'F2EOS';
var olb_ssotgt = 'PRODOLB';
var port = '';

var configLoad = '';

(function(e){e.InFieldLabels=function(t,n,r){var i=this;i.$label=e(t);i.label=t;i.$field=e(n);i.field=n;i.$label.data("InFieldLabels",i);i.showing=true;i.init=function(){var t;i.options=e.extend({},e.InFieldLabels.defaultOptions,r);if(i.options.className){i.$label.addClass(i.options.className)}setTimeout(function(){if(i.$field.val()!==""){i.$label.hide();i.showing=false}else{i.$label.show();i.showing=true}},200);i.$field.focus(function(){i.fadeOnFocus()}).blur(function(){i.checkForEmpty(true)}).bind("keydown.infieldlabel",function(e){i.hideOnChange(e)}).bind("paste",function(){i.setOpacity(0)}).change(function(){i.checkForEmpty()}).bind("onPropertyChange",function(){i.checkForEmpty()}).bind("keyup.infieldlabel",function(){i.checkForEmpty()});if(i.options.pollDuration>0){t=setInterval(function(){if(i.$field.val()!==""){i.$label.hide();i.showing=false;clearInterval(t)}},i.options.pollDuration)}};i.fadeOnFocus=function(){if(i.showing){i.setOpacity(i.options.fadeOpacity)}};i.setOpacity=function(e){i.$label.stop().animate({opacity:e},i.options.fadeDuration,function(){if(e===0){i.$label.hide()}});i.showing=e>0};i.checkForEmpty=function(e){if(i.$field.val()===""){i.prepForShow();i.setOpacity(e?1:i.options.fadeOpacity)}else{i.setOpacity(0)}};i.prepForShow=function(){if(!i.showing){i.$label.css({opacity:0}).show();i.$field.bind("keydown.infieldlabel",function(e){i.hideOnChange(e)})}};i.hideOnChange=function(e){if(e.keyCode===16||e.keyCode===9){return}if(i.showing){i.$label.hide();i.showing=false}i.$field.unbind("keydown.infieldlabel")};i.init()};e.InFieldLabels.defaultOptions={fadeOpacity:.5,fadeDuration:300,pollDuration:0,enabledInputTypes:["text","search","tel","url","email","password","number","textarea"],className:false};e.fn.inFieldLabels=function(t){var n=t&&t.enabledInputTypes||e.InFieldLabels.defaultOptions.enabledInputTypes;return this.each(function(){var r=e(this).attr("for"),i,s;if(!r){return}i=document.getElementById(r);if(!i){return}s=e.inArray(i.type,n);if(s===-1&&i.nodeName!=="TEXTAREA"){return}new e.InFieldLabels(this,i,t)})}})(jQuery)


var pageInitialized = false;
if (chop2.indexOf('login') == -1) {port = ':' + location.port;}
if (chop2.indexOf('beta') > -1){
    gtmHost = gtmHost + 'beta';
    eos_ssotgt = 'F2EOS_BETA';
    olb_ssotgt = 'BETAOLB';
}
if (chop2.indexOf('perf') > -1){gtmHost = gtmHost + '-perf';}

var aaProd = "https://" + gtmHost + '.capitalone.com' + port;
var aaProd_1 = "https://" + gtmHost + '1.capitalone.com' + port;
var aaProd_2 = "https://" + gtmHost + '2.capitalone.com' + port;

var cofBadge =
{
    'bc'            :
    {
        'ssotgt'        : eos_ssotgt,
        'ssotgt_olb'    : olb_ssotgt,
        'aaHost'        : aaProd,
        'aaHost_1'        : aaProd_1,
        'aaHost_2'        : aaProd_2,
        'wwwUSUrl'        : 'https://www.capitalone.com',
        'wwwCAUrl'        : 'https://www.capitalone.ca',
        'wwwUKUrl'        : 'https://www.capitalone.co.uk',
        'wwwUKOLUrl'    : 'https://www.capitaloneonline.co.uk',
        'olbvUrl'        : 'https://onlinebanking.capitalone.com',
        '360SecureUrl'	: 'https://secure.capitalone360.com',
		'360Url'		: 'https://home.capitalone360.com'
    },
    'seedSet'    :
    {
        '0'    :    '9c352ef371e840e028ddac2a0a467189',
        '1'    :    '9c63f46301c7ccdfb22ceb733bcd8026',
        '2'    :    'dc38959f1eebbf3d82e2fe2eea8e58ae',
        '3'    :    '310503e13cb7e5fcb27e0115e37c1dc6',
        '4'    :    '36039099aaa7c8ac9f1f864de877967f',
        '5'    :    'a75ebba247ac2ecc108cea1cc0ae7eea',
        '6'    :    'b583fdc4d4ef4511a2a1b69242f6dfca',
        '7'    :    '4d3cf3d9a60890e583cde6a7ffd0e999',
        '8'    :    '61202bd2f64078169a980e7d9b08f10c',
        '9'    :    '0d19a8653b5c9e3f568f0b802198cb45',
        '10'    :    '691a26d74a7b3e224f0e19b2c69fe7f6',
        '11'    :    '88b2d97c6865a2eec7518cb4d7f1176b',
        '12'    :    '511fd5dc6ef876a458035d0a34225a74',
        '13'    :    '45da6377d0dc72861dcf7bb5e58bcd17',
        '14'    :    '7812a370d61bd2abc902eaf93c01fd05',
        '15'    :    'ac1dee8fddd7fb3756b9416479d6df27',
        '16'    :    '942a15a9f60deb4a9de140a4ee5aaf24',
        '17'    :    '20baadc8ecbac5d18bf208e2f6df1b4a',
        '18'    :    '03943fe6f1443cca68bb4b603486f5a2',
        '19'    :    '2a3817e118101acc7092f40b947453d5',
        '20'    :    '5f923e16c659bb81003a870818608e43',
        '21'    :    'd5330d84b2bc1019d6c1332a217c9968',
        '22'    :    '221bd1a4147d9d45cb297786230099cd',
        '23'    :    '1c140d647d1ec93c4f0ce3dc02c14b94',
        '24'    :    'b694ae2ad21a814dafd1b003f4f5c108',
        '26'    :    '13a5f313f9e1a7e6fb71d0379c2cb68a',
        '27'	:	'992ab7d18105910816578f38ed5ac689',
        '28'	:	'b7b70098755b71d582fd0502c6289039',
        '29'	:	'bdcd44bc2f8d9a2c673133378f061531',
        '30'	:	'bde62c31d33f3d22a19a6581be49a32b',
        '31'	:	'b9b96e48d58af01bebc22daaec68891f',
        '32'	:	'2829e636091eaddba34b8a6a718ea6fb',
        '33'	:	'925cba08b7906817c02900db618792dd',
		'34'	:	'f0220b5d658162a9bff2524a16dfc6a6',
		'35'	:	'3af23d85ca4a1ce803bab7d56d7a3d0e',
		'36'	:	'81b0d7fd51732b0af9fd039d6ae0eaf9',
		'37'	:	'd44c68b1b2954407c2fd504274217af2',
		'38'    :   'e3dda28c84d2990614d1c0b8d6c1e9c1',
		'39'    :   '3336db509c1222b35441aaf0e5c71d7f'


    }
}

var bc = cofBadge['bc'];
var aaHost = bc['aaHost'];
var isso_region = bc['isso_region'];
var bll_region = bc['bll_region'];
var ssotgt = bc['ssotgt'];
var ssotgt_olb = bc['ssotgt_olb'];
var seedSet = cofBadge['seedSet'];

window.cofBadge =
{
    'bc'            :    bc,
    'aaHost'        :    aaHost,
    'isso-region'    :    isso_region,
    'bll-region'    :    bll_region,
    'ssotgt'        :    ssotgt,
    'ssotgt-olb'    :    ssotgt_olb,
    'seedSet'        :    seedSet,
    'dest'            :    '',
    'notice'        :
    {
        '20101'  : '<p><strong>Troubleshooting:</strong></p><p>Your browser does not meet our minimum requirements for use of Online Banking.  Please upgrade to a supported browser.</p>',
        '20102'  : '<p><strong>Troubleshooting:</strong></p><p>We\'ve detected that you do not allow cookies to be saved in your browser.  Please enable cookies to continue.</p>',
        '20103'  : '<p><strong>Troubleshooting:</strong></p><p>We\'ve detected that you have javascript disabled.  Please enable javascript to continue.</p>',
        '20104'  : '<p><strong>Come back soon!</strong></p><p>Your Online Banking session has timed out. To access your accounts, you must log in again.</p>',
        '20105'  : '<p><strong>Wrong User ID or Password</strong></p><p>Please try again. After too many failed login attempts, we lock your online account access for security reasons.  You can use the links on the left for more help logging in. (Ref. No. 1401)</p>',
        '20106'  : '<p><strong>Wrong User ID or Password</strong></p><p>Please try again. After too many failed login attempts, we lock your online auto account access for security reasons.  You can use the links on the left for more help logging in. (Ref. No. 1401)</p>',
        '20107'  : '<p><strong>Sorry for the setback.</strong></p><p>For security reasons, your Online Banking access has been disabled. Let\'s work together to get you logged in again. Please call us at 1-877-442-3764. (Ref. No. 1012)</p>',
        '20108'  : '<p><strong>Sorry for the setback.</strong></p><p>For security reasons, your Online Banking access has been disabled. Let\'s work together to get you logged in again to your auto loan. Please call us M-F, 8 a.m. to 9 p.m. ET at 1-800-946-0332. (Ref. No. 1012)</p>',
        '20109'  : '<p><strong>Sorry about that.</strong></p><p>Something went wrong in our system, but we\'re standing by to sort this out. To fix the problem, please call us for help any time at 1-877-442-3764. (Ref. No. 1011)</p>',
        '20110'  : '<p><strong>Sorry about that.</strong></p><p>Something went wrong in our system, but we\'re standing by to sort this out. To fix the problem, please call us for help M-F, 8 a.m. to 9 p.m. ET at 1-800-946-0332. (Ref. No. 1011)</p>',
        '20111'  : '<p><strong>Sorry about that.</strong></p><p>Something went wrong in our system. If the problem continues, you can call us for help any time at 1-877-442-3764. (Ref. No. 1010)</p>',
        '20112'  : '<p><strong>Sorry about that.</strong></p><p>Something went wrong in our system. If the problem continues, you can call us about your auto loan account M-F, 8 a.m. to 9 p.m. ET at 1-800-946-0332. (Ref. No. 1010)</p>',
        '20113'  : '<p><strong>Sorry for the setback.</strong></p><p>Your Online Banking access has been disabled. Let\'s work together to get you logged in again. Please call us at 1-877-442-3764. (Ref. No. 1412)</p>',
        '20114'  : '<p><strong>Sorry for the setback.</strong></p><p>Your Online Banking access has been disabled. Let\'s work together to get you logged in again to your auto loan. Please call us M-F, 8 a.m. to 9 p.m. ET at 1-800-946-0332.  (Ref. No. 1412)</p>',
        '20115'  : '<p><strong>Sorry about that.</strong></p><p>Something went wrong in our system. If the problem continues or you need help now, please call us at 1-877-442-3764. (Ref. No. 1011)</p>',
        '20116'  : '<p><strong>Sorry about that.</strong></p><p>Something went wrong in our system. If the problem continues, please call us about your auto loan account M-F, 8 a.m. to 9 p.m. ET at 1-800-946-0332. (Ref. No. 1002)</p>',
        '20117'  : '<p><strong>We\'ll be back shortly!</strong></p><p>We are working right now to move and improve your online experience for your auto loan. Come back soon to check out the changes and manage your auto loan account more easily than ever.  Need help? Call us M-F, 8 a.m. to 9 p.m. ET at 1-800-946-0332. (Ref. No. 1410)</p>',
        '20118'  : '<p><strong>Want to access your auto loan?</strong></p><p>Your auto loan is now parked in a new place.  To make the switch, please <a class="asset-link" href="https://secure.capitalone360.com/myaccount/banking/autoLoanEnrollmentMain?execution=e1s1&stateId=enrollmentLandingPage">enroll</a> your Auto Loan on our new Capital One 360 website.  If you\'ve already done that, just <a class="asset-link" href="https://secure.capitalone360.com/myaccount/banking/login.vm">sign in</a> to service your account.   <a class="asset-link" href="https://home.capitalone360.com/autoloan/update">Learn more</a> about the change, or call us with questions at 1-800-946-0332 Monday &#8211; Friday from 8 AM to 9 PM ET (Ref. No. 1411)</p>',
        '20119'  : '<p><strong>We\'ll be back shortly!</strong></p><p>We\'re working right now to set you up on our new and improved Online Banking site. Please sign in later and check out the changes! Need to manage your account now? Call us at 1-877-442-3764. (Ref. No. 1413)</p>',
        '20120'  : '<p><strong>Sorry about that.</strong></p><p>Something went wrong in our system.  If you need immediate assistance please call us at 1-877-442-3764. (Ref. No. 1414)</p>',
        '20121'  : '<p><strong>We\'ll be back shortly!</strong></p><p>We\'re working right now to set you up on our new and improved Online Banking site. Please sign in later and check out the changes! Need help now? Please call us at 1-877-442-3764.  (Ref. No. 1415)</p>',
        '20122'	 : '<p><strong>Oops!</strong></p><p>The information you entered doesn\'t match what we have on file. Please retry or click Forgot "User ID" or "Password" to retrieve or reset your login information.</p></br><p>For more help signing in, please call 1-877-442-3764.</p>',
        '20123'     : '<p><strong>Sorry, something went wrong</strong></p><p>We apologize for the inconvenience, but there seems to be an error with your request. Please call Customer Service at 1-877-442-3764 to resolve.</p>',
        '20124'  : '<p><strong>Want to access your auto loan?</strong></p><p>Your auto loan is now parked in a new place.  To make the switch, please <a class="asset-link" href="https://secure.capitalone360.com/myaccount/banking/autoLoanEnrollmentMain?execution=e1s1&stateId=enrollmentLandingPage">enroll</a> your Auto Loan on our new Capital One 360 website.  If you\'ve already done that, just <a class="asset-link" href="https://secure.capitalone360.com/myaccount/banking/login.vm">sign in</a> to service your account.   <a class="asset-link" href="https://home.capitalone360.com/autoloan/update">Learn more</a> about the change, or call us with questions at 1-800-946-0332 Monday &#8211; Friday from 8 AM to 9 PM ET (Ref. No. 1411)</p>',
        'default': '<p><strong>Oops!</strong></p><p>Please enter required information</p>'
    },
    'map-wwwLogin'    :
    {
        65535 : '',
            1 : 'credit cards',
            2 : 'credit cards ca',
            3 : 'uk accounts',
            4 : 'banking',
            5 : 'auto loans',
            6 : 'sb',
            7 : 'hl',
            8 : 'orange mortgages',
            9 : 'mortgage access',
           10 : 'home equity',
           11 : 'treasury optimizer',
           12 : 'rewards'
    }
};

function returnSuccess(data){return true;}
function returnError(){return true;}
function returnComplete(url){return true;}

function aaCheck() {
    prot = location.protocol + '//';
    if(badgeLoc.indexOf('kdc') > -1){domain = '.kdc.capitalone.com';}else{domain = '.capitalone.com';}
    chop2 = badgeLoc.substr(0,badgeLoc.indexOf(domain)).substr(window.prot.length,badgeLoc.substr(0,badgeLoc.indexOf(domain)).length);
    chop3 = chop2.substr(chop2.indexOf(gtmHost) + gtmHost.length,chop2.length);
    cofBadge['bc']['aaHost'] = badgeLoc;
}

function checkCookie()
{
    var isso_active = $.cookie('ISSO_DC');
    if (isso_active != null)
    {
        switch (isso_active.toLowerCase())
        {
           case 'a':cofBadge['aaHost'] = cofBadge['bc']['aaHost_1'];break;
           case 'b':cofBadge['aaHost'] = cofBadge['bc']['aaHost_2'];break;
        }
    } else {
        cofBadge['aaHost'] = cofBadge['bc']['aaHost_1'];
    }
}

function setBadgeMarkup(){
    var html = '<form action="" method="" id="login-go"></form><form action="" method="post" id="account-log-in" autocomplete="off"><h2>Account Sign In</h2><fieldset class="select-account"><legend><span>Select an Account Type</span></legend><button type="button" id="btnAccountType" name="btnAccountType" class="active-account">Select an account type&hellip;</button><ul class="account-types" role="menu"><li role="presentation"><input type="radio" id="rbCreditCards" name="rbAccountType" value="auth-credit-cards" /><label role="menuitemradio" for="rbCreditCards">Credit Cards</label></li><li role="presentation"><input type="radio" id="rbBanking" name="rbAccountType" value="auth-banking" /><label role="menuitemradio" for="rbBanking">Banking</label></li><li role="presentation"><input type="radio" id="rbAutoLoans" name="rbAccountType" value="auth-auto-loans" /><label role="menuitemradio" for="rbAutoLoans">Auto Loans</label></li><li role="presentation"><input type="radio" id="rbInvesting" name="rbAccountType" value="auth-sb" /><label role="menuitemradio" for="rbInvesting">Online Investing</label></li><li role="presentation"><input type="radio" id="rbHomeLoans" name="rbAccountType" value="auth-hl" /><label role="menuitemradio" for="rbHomeLoans">Home Loans</label></li><li role="presentation"><input type="radio" id="rbMoreProducts" name="rbAccountType" value="auth-more-products" /><label role="menuitemradio" for="rbMoreProducts" class="more-products">More Products</label></li><li role="presentation" class="off"><input type="radio" id="rbTreasury" name="rbAccountType" value="auth-treasury-optimizer" /><label role="menuitemradio" for="rbTreasury">Treasury Optimizer</label></li><li role="presentation" class="off"><input type="radio" id="rbRewards" name="rbAccountType" value="auth-rewards" /><label role="menuitemradio" for="rbRewards">Rewards</label></li><li role="presentation" class="off last"><a class="asset-link" data-href="no-account" role="menuitem" >Don\'t see your account?</a></li></ul><div class="auth-error account-type" id="auth-default-error-user"><p><strong>Oops!</strong></p><p>Please select an account type</p></div></fieldset><div id="auth-default" class="auth"><div class="field full"> <label for="default-uid">Username</label> <input type="text" id="default-uid" maxlength="50" name="default-uid" data-aria-describedby="auth-default-error-user" aria-required="true" /></div><input type="image" class="submit-btn" alt="Sign In" data-src="action-body-continue.png" id="default-btn" name="default-btn" /><p class="auth-help"> <span class="aria-help" id="lbl-default-user-forgot">Forgot Username link</span><strong>Forgot</strong> <a href="#" id="default-user-forgot" aria-describedby="lbl-default-user-forgot">Username</a>?<br><a href="#" class="asset-link" data-href="no-account">Enroll here</a></p><div class="additional-default"><a id="welcome-360" href="#"><img data-src="360.jpg" alt="Welcome ING Direct Savers" /></a></div></div><fieldset id="badge-region" class="region-select"><legend><span>Select Your Region</span></legend><span class="usa"><input type="radio" id="rbCardUS" name="rbCardRegion" value="US" checked="checked" class="auth-credit-cards-us" /><label for="rbCardUS" >US</label></span><span class="can"><input type="radio" id="rbCardCA" name="rbCardRegion" value="CA" class="auth-credit-cards-ca" /><label for="rbCardCA">Canada</label></span><span class="uk"><input type="radio" id="rbCardUK" name="rbCardRegion" value="UK" class="auth-uk-accounts"/><label for="rbCardUK">UK</label></span></fieldset><div id="auth-credit-cards-us" class="sub-auth"><div class="field"> <label for="us-credit-cards-uid">Username</label> <input type="text" id="us-credit-cards-uid" maxlength="32" name="us-credit-cards-uid" class="user-id has-rem" data-aria-describedby="credit-card-us-auth-error-user"/> <div class="auth-error" id="credit-card-us-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><div class="field last"> <label for="us-credit-cards-pw">Password</label> <input type="password" id="us-credit-cards-pw" maxlength="32" name="us-credit-cards-pw" class="password" data-aria-describedby="credit-card-us-auth-error-pass" /> <div class="auth-error" id="credit-card-us-auth-error-pass"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><div class="remember-un"> <input type="checkbox" id="cbCardRememberUS" name="cbCardRemember" value="remember" class="rem-checkbox" data-id="0" title="Want this computer to remember your username? Check this box. Not recommended for shared computers."> <label for="cbCardRememberUS" style="cursor:help;" title="Want this computer to remember your username? Check this box. Not recommended for shared computers.">Remember Me</label></div> <input type="image" class="submit-btn" alt="Sign In" data-src="action-body-sign-in.jpg" id="submit-card-us" name="submit-card-us" /><p class="auth-help"> <span class="aria-help" id="lbl-us-user-forgot">Forgot Username link</span> <span class="aria-help" id="lbl-us-password-forgot">Forgot Password link</span> <strong>Forgot</strong> <a class="asset-link" data-href="us-card-forgot-user" id="us-user-forgot" aria-describedby="lbl-us-user-forgot">Username</a> or <a id="us-password-forgot" class="asset-link" data-href="us-card-forgot-pass" aria-describedby="lbl-us-password-forgot">Password</a>?<br><a id="standaloneEnrollCOF" class="asset-link" data-href="us-card-enroll">Enroll here</a></p><p class="auth-welcome"> <a href="#"><img data-src="welcome_direct_btn.jpg" alt="Welcome ING Direct Savers"></a></p><div class="additional"> <p><a class="privacy asset-link" data-href="us-privacy">Privacy</a><a class="security asset-link" data-href="us-security">Security</a><a class="fraud asset-link" data-href="us-fraud">Fraud Prevention</a></p></div> </div><div id="auth-credit-cards-ca" class="sub-auth"><div class="field"> <label for="ca-credit-cards-uid">Username</label> <input type="text" id="ca-credit-cards-uid" maxlength="32" name="ca-credit-cards-uid" class="user-id has-rem" data-aria-describedby="credit-card-ca-auth-error-user" /> <div class="auth-error" id="credit-card-ca-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><div class="field last"> <label for="ca-credit-cards-pw">Password</label> <input type="password" id="ca-credit-cards-pw" maxlength="32" name="ca-credit-cards-pw" class="password" data-aria-describedby="credit-card-ca-auth-error-pass" /> <div class="auth-error" id="credit-card-ca-auth-error-pass" ><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><div class="remember-un"> <input type="checkbox" id="cbCardRememberCA" name="cbCardRemember" value="remember" class="rem-checkbox" data-id="1" title="Want this computer to remember your username? Check this box. Not recommended for shared computers."> <label for="cbCardRememberCA" style="cursor:help;" title="Want this computer to remember your username? Check this box. Not recommended for shared computers.">Remember Me</label></div><input type="image" class="submit-btn" alt="Sign In" data-src="action-body-sign-in.jpg" id="submit-card-ca" name="submit-card-ca" /><p class="auth-help"> <span class="aria-help" id="lbl-ca-user-forgot">Forgot Username link</span> <span class="aria-help" id="lbl-ca-password-forgot">Forgot Password link</span><strong>Forgot</strong> <a class="asset-link" data-href="ca-card-forgot-user" id="ca-user-forgot" aria-describedby="lbl-ca-user-forgot">Username</a> or <a id="ca-password-forgot" class="asset-link" data-href="us-card-forgot-pass" aria-describedby="lbl-ca-user-forgot">Password</a>?<br><a class="asset-link" data-href="ca-card-enroll">Enrol here</a></p><div class="additional"><p><a class="privacy asset-link" data-href="ca-privacy">Privacy</a><a class="security asset-link" data-href="ca-security">Security</a><a class="fraud asset-link" data-href="ca-fraud">Fraud Prevention</a></p></div></div><div id="auth-uk-accounts" class="sub-auth"><input type="image" class="submit-btn" alt="Continue" data-src="action-body-continue.png" id="submit-card-uk" name="submit-card-uk" /><span class="auth-help"> <p id="uk-forgot"><a class="asset-link" data-href="uk-card-register">Register here</a></p></span><div class="additional"> <p><a class="privacy card asset-link" data-href="uk-privacy">Privacy</a><a class="security card asset-link" data-href="uk-security">Security</a><a class="fraud card asset-link" data-href="uk-fraud">Fraud Prevention</a></p></div></div><div id="auth-banking" class="auth"><div id="sub-auth-banking-ask"><div class="field full"> <label for="banking-uid">User ID / Customer # / Saver ID</label> <input type="text" id="banking-uid" maxlength="50" name="banking-uid" class="user-id long" data-aria-describedby="banking-auth-error-user" /> <div class="auth-error" id="banking-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div> <img data-src="loader.gif" class="loader"></div></div><div id="sub-auth-banking-ask-footer"><input type="image" class="submit-btn" alt="Continue" data-src="action-body-continue.png" id="submit-bank" name="submit-bank" /><p class="auth-help"> <span class="aria-help" id="lbl-forgot-collision-id">Forgot ID or Customer Number link</span> <strong>Forgot</strong> <a class="asset-link" href="#" id="forgot-collision-id" aria-describedby="lbl-forgot-collision-id" >ID or Customer #</a>?<br/><a class="asset-link" data-href="banking-enroll">Enroll in Capital One Bank</a></p><div class="forgot-collision-popup collision" style="display: none;"> <p class="select">Select an account type...</p> <a class="asset-link nosubmit" data-href="banking-forgot-id"><img alt="Capital One Bank" data-src="option-2-btn.png" width="236" height="47"></a> <div class="option-divider"></div> <a class="asset-link nosubmit" data-href="ing-forgot"><img alt="Capital One 360" data-src="option-1-btn.png" width="236" height="64" ></a></div></div><div id="sub-auth-answer-hb" class="auth"><div class="field"> <label for="hb-uid">User ID</label> <input type="text" id="hb-uid" maxlength="50" name="hb-uid" class="user-id" data-aria-describedby="hb-auth-error-user" /> <div class="auth-error" id="hb-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><div class="field last"> <label for="hb-pw">Password</label> <input type="password" id="hb-pw" maxlength="50" name="hb-pw" class="password" data-aria-describedby="hb-auth-error-pass" /> <div class="auth-error" id="hb-auth-error-pass"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><input type="image" class="submit-btn" alt="Sign In" data-src="action-body-sign-in.jpg" id="submit-bank-hb" name="submit-bank-hb" /><p class="auth-help"> <span class="aria-help" id="lbl-forgot-pass-hb">Forgot ID or Customer Number link</span> <strong>Forgot</strong> <a class="asset-link" data-href="banking-forgot-pass" aria-describedby="lbl-forgot-pass-hb">Password</a>?</p><div class="additional"> <p><a class="privacy asset-link" data-href="us-privacy">Privacy</a><a class="security asset-link" data-href="us-security">Security</a><a class="fraud asset-link" data-href="us-fraud">Fraud Prevention</a></p></div></div><div id="sub-auth-answer-both" class="auth"><div class="collision" style="display: block;"> <p class="select">Select an account type...</p> <a id="option-2-btn" href="#" class="nosubmit"><img alt="Capital One Bank" data-src="option-2-btn.png" width="236" height="47"></a> <div class="option-divider">or</div> <a id="option-1-btn" href="#" class="nosubmit"><img alt="Capital One 360" data-src="option-1-btn.png" width="236" height="64"></a></div></div> </div><div id="auth-auto-loans" class="auth"> <div id="sub-auth-coaf-ask"><div class="field full"> <label for="auto-loans-uid">User ID / Customer # / Saver ID</label> <input type="text" id="auto-loans-uid" maxlength="50" name="auto-loans-uid" class="user-id long" data-aria-describedby="auto-auth-error-user" /> <div class="auth-error" id="auto-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div> <img data-src="loader.gif" class="loader"></div></div><div id="sub-auth-auto-ask-footer"><p class="auth-help"><span class="aria-help" id="lbl-forgot-un-coaf">Forgot User ID link</span> <span class="aria-help" id="lbl-forgot-pass-coaf">Forgot Password link</span><strong>Forgot</strong> <a class="asset-link" data-href="coaf-forgot-user" aria-describedby="lbl-forgot-un-coaf" >User ID / Customer # / Saver ID</a><br><a class="asset-link" data-href="ing-enroll">Sign up for online access</a> </p> <input type="image" class="submit-btn" alt="Continue" data-src="action-body-continue.png" id="submit-coaf" name="submit-coaf" /><div class="additional"><p><a class="privacy asset-link" data-href="us-privacy">Privacy</a><a class="security asset-link" data-href="us-security">Security</a><a class="fraud asset-link" data-href="us-fraud">Fraud Prevention</a></p></div></div><div id="sub-auth-answer-coaf" class="auth"><div class="field"><label for="auto-loans-hb-uid">User ID</label><input type="text" id="auto-loans-hb-uid" maxlength="50" name="auto-loans-hb-uid" class="user-id" data-aria-describedby="auto-loans-auth-error-user"/><div class="auth-error" id="auto-loans-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p></div></div><div class="field last"><label for="auto-loans-pw">Password</label><input type="password" id="auto-loans-pw" maxlength="50" name="auto-loans-pw" class="password" data-aria-describedby="auto-loans-auth-error-pass" /><div class="auth-error" id="auto-loans-auth-error-pass"><p><strong>Oops!</strong></p><p>Please enter required information</p></div></div><input type="image" class="submit-btn" alt="Log In" data-src="action-body-log-in.png" id="submit-auto" name="submit-auto" /><p class="auth-help" style="float: none;"><span class="aria-help" id="lbl-forgot-pass-coaf">Forgot Password link</span><strong>Forgot</strong> <a class="asset-link" data-href="coaf-forgot-pass" aria-describedby="lbl-forgot-pass-coaf">Password</a><br><a class="asset-link" data-href="ing-enroll">Enroll in Capital One Auto Loans</a></p><div class="additional"><p><a class="privacy asset-link" data-href="us-privacy">Privacy</a><a class="security asset-link" data-href="us-security">Security</a><a class="fraud asset-link" data-href="us-fraud">Fraud Prevention</a></p></div></div> <div id="sub-auth-not-migrated-coaf" class="auth"><div class="field"> <label for="auto-loans-notMig-uid">User ID</label> <input type="text" id="auto-loans-notMig-uid" maxlength="50" name="auto-loans-notMig-uid" class="user-id" data-aria-describedby="auto-loans-auth-error-user"/> <div class="auth-error" id="auto-loans-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><div class="field last"> <label for="auto-loans-notMig-pw">Password</label> <input type="password" id="auto-loans-notMig-pw" maxlength="50" name="auto-loans-notMig-pw" class="password" data-aria-describedby="auto-loans-auth-error-pass" /> <div class="auth-error" id="auto-loans-auth-error-pass"><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><input type="image" class="submit-btn" alt="Sign In" data-src="action-body-sign-in.jpg" id="submit-auto" name="submit-auto" /><p class="auth-help"><span class="aria-help" id="lbl-forgot-un-coaf">Forgot User ID link</span><span class="aria-help" id="lbl-forgot-pass-coaf">Forgot Password link</span><strong>Forgot</strong> <a class="asset-link" data-href="coaf-forgot-user" aria-describedby="lbl-forgot-un-coaf" >User ID</a> or <a class="asset-link" data-href="coaf-forgot-pass" aria-describedby="lbl-forgot-pass-coaf">Password</a><br><a class="asset-link" data-href="coaf-enroll">Enroll here</a></p><div class="additional"><p><a class="privacy asset-link" data-href="us-privacy">Privacy</a><a class="security asset-link" data-href="us-security">Security</a><a class="fraud asset-link" data-href="us-fraud">Fraud Prevention</a></p></div></div></div><div id="auth-sb" class="auth"><div class="field full"> <label for="investments-uid">Username</label> <input type="text" id="investments-uid" maxlength="50" name="investments-uid" class="user-id long" data-aria-describedby="sb-auth-error-user" /> <div class="auth-error" id="sb-auth-error-user" ><p><strong>Oops!</strong></p><p>Please enter required information</p> </div></div><input type="image" class="submit-btn" alt="Continue" data-src="action-body-continue.png" id="submit-sb" name="submit-sb" /><span class="auth-help"><p><strong>Forgot</strong> <a class="asset-link" data-href="share-forgot-user" aria-label="click here if you forgot your user ID" >Username</a>?</p></span></div><div id="auth-hl" class="auth"><fieldset class="hl-type"><legend><span>Select an account type...</span></legend><span><input type="radio" id="rb360Mortgage" name="rbHomeLoanType" value="auth-orange-mortgages" /><label for="rb360Mortgage">Capital One 360 Mortgage / Home Equity</label></span> <span><input type="radio" id="rbBankMortgage" name="rbHomeLoanType" value="auth-mortgage-access" /><label for="rbBankMortgage">Capital One Mortgage</label></span> <span><input type="radio" id="rbHomeEquity" name="rbHomeLoanType" value="auth-home-equity" /><label for="rbHomeEquity">Capital One Home Equity</label></span></fieldset><div id="auth-orange-mortgages" class="sub-auth"><div class="field full"><label for="hl-360-uid">Customer # / Saver ID</label><input type="text" class="user-id long" id="hl-360-uid" maxlength="50" name="hl-360-uid" data-aria-describedby="orange-mortgages-auth-error-user"/><div class="auth-error" id="orange-mortgages-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p></div> </div><input type="image" class="submit-btn" alt="Continue" data-src="action-body-continue.png" id="submit-orange-mortgages" name="submit-orange-mortgages" /><p class="auth-help"> <span class="aria-help" id="lbl-forgot-user-orange">Forgot Customer Number link</span><strong>Forgot</strong> <a class="asset-link" data-href="ing-forgot" aria-describedby="lbl-forgot-user-orange" >Customer #</a>?</p></div><div id="auth-mortgage-access" class="sub-auth"><input type="image" alt="Continue" data-src="action-body-continue.png" id="submit-mortgage-access" name="submit-mortgage-access" /> <div class="additional"><p><a class="privacy asset-link" data-href="us-privacy">Privacy</a><a class="security asset-link" data-href="us-security">Security</a><a class="fraud asset-link" data-href="us-fraud">Fraud Prevention</a></p> </div></div><div id="auth-home-equity" class="sub-auth"> <div class="field"><label for="hl-equity-uid">User ID</label><input type="text" id="hl-equity-uid" maxlength="50" name="" class="user-id" data-aria-describedby="hl-equity-auth-error-user"/><div class="auth-error" id="hl-equity-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p></div> </div> <div class="field last"><label for="hl-equity-pw">Password</label><input type="password" id="hl-equity-pw" maxlength="50" name="" class="password"data-aria-describedby="hl-equity-auth-error-pass"/><div class="auth-error" id="hl-equity-auth-error-pass"><p><strong>Oops!</strong></p><p>Please enter required information</p></div> </div> <input type="image" class="submit-btn" alt="Sign In" data-src="action-body-sign-in.jpg" id="submit-equity" name="submit-equity" /> <p class="auth-help"><span class="aria-help" id="lbl-forgot-user-equity">Forgot User ID link</span><span class="aria-help" id="lbl-forgot-pass-equity">Forgot Password link</span><strong>Forgot</strong> <a class="asset-link" data-href="banking-forgot-id" aria-describedby="lbl-forgot-user-equity" >User ID</a> or <a class="asset-link" data-href="banking-forgot-pass" aria-describedby="lbl-forgot-pass-equity">Password</a><br><a class="asset-link" data-href="banking-enroll">Enroll in Capital One Bank</a> </p> <div class="additional"><p><a class="privacy asset-link" data-href="us-privacy">Privacy</a><a class="security asset-link" data-href="us-security">Security</a><a class="fraud asset-link" data-href="us-fraud">Fraud Prevention</a></p> </div></div></div><div id="auth-treasury-optimizer" class="auth"><input type="image" class="submit-btn" alt="Continue" data-src="action-body-continue.png" id="submit-treasury" name="submit-treasury" /><p class="auth-help"></p><div class="additional"><p><a class="asset-link privacy" data-href="us-privacy">Privacy</a><a class="asset-link security" data-href="us-security">Security</a><a class="asset-link fraud" data-href="us-fraud">Fraud Prevention</a></p></div></div><div id="auth-rewards" class="auth"><input type="image" class="submit-btn" alt="Continue" data-src="action-body-continue.png" id="submit-rewards" name="submit-rewards" /><p class="auth-help"><a class="asset-link" data-href="rewards-enroll">Enroll here</a></p><div class="additional"> <p><a class="asset-link privacy" data-href="us-privacy">Privacy</a><a class="asset-link security" data-href="us-security">Security</a><a class="asset-link fraud" data-href="us-fraud">Fraud Prevention</a></p></div></div><div id="auth-prepaid-card" class="auth"><input type="image" class="submit-btn" alt="Continue" data-src="action-body-continue.png" id="submit-prepaid" name="submit-prepaid" /><p class="auth-help"></p><div class="additional"><p><a class="asset-link privacy" data-href="us-privacy">Privacy</a><a class="asset-link security" data-href="us-security">Security</a><a class="asset-link fraud" data-href="us-fraud">Fraud Prevention</a></p></div></div></form><div id="olbr-content" class="auth" style="display:none;"><div class="field"><label for="hb-uid">User ID</label><input type="text" id="hb-uid" maxlength="50" name="hb-uid" class="user-id" data-aria-describedby="hb-auth-error-user"><div class="auth-error" id="hb-auth-error-user"><p><strong>Oops!</strong></p><p>Please enter required information</p></div></div><div class="field last"><label for="hb-pw">Password</label><input type="password" id="hb-pw" maxlength="50" name="hb-pw" class="password" data-aria-describedby="hb-auth-error-pass"><div class="auth-error" id="hb-auth-error-pass"><p><strong>Oops!</strong></p><p>Please enter required information</p></div></div><input type="image" class="submit-btn" alt="Sign In" data-src="action-body-sign-in.jpg" id="submit-bank-hb" name="submit-bank-hb" /><p class="auth-help"><span class="aria-help" id="lbl-forgot-pass-hb">Forgot ID or Password link</span><strong>Forgot</strong> <a class="asset-link" data-href="olb-forgot-user">User ID</a> or <a class="asset-link" data-href="olb-forgot-pass" >Password</a>?<br><a class="asset-link" data-href="olb-enroll">Enroll here</a></p><p class="auth-welcome"><a href="#" data-href="ing-login" class="asset-link"><img data-src="welcome_direct_btn.jpg" alt="Welcome ING Direct Savers"></a></p><div class="additional"><p><a class="privacy asset-link" data-href="us-privacy">Privacy</a><a class="security asset-link" data-href="us-security">Security</a><a class="fraud asset-link" data-href="us-fraud">Fraud Prevention</a></p></div></div>';
    return html;
}

function set360FP(){threeSixtyFingerprint = coaf_360_deviceprint();return true;}

function processBadgeMarkup(){
    $('.log-in-badge').hide();
    var badgeMarkup = setBadgeMarkup();
    var imgPath = badgeLoc + '/resources/bll/images/';

    $('#log-in-badge').html(badgeMarkup);

    $('.log-in-badge img').each(function(){$(this).attr('src', imgPath + $(this).attr('data-src'));$(this).removeAttr('data-src');});
    $('.log-in-badge input[type=image]').each(function(){$(this).attr('src', imgPath + $(this).attr('data-src'));$(this).removeAttr('data-src');});

    $('.log-in-badge a.asset-link').each(function(){$(this).attr('href', cofBadge['dest'][$(this).attr('data-href')]);});
    return true;
}

function configureBadge()
{
    window.cofBadge =
    {
        'aaHost'        : cofBadge['aaHost'],
        'bc'            : cofBadge['bc'],
        'isso-region'    : cofBadge['aaHost'],
        'bll-region'    : cofBadge['aaHost'],
        'ssotgt'        : cofBadge['bc']['ssotgt'],
        'ssotgt-olb'    : cofBadge['bc']['ssotgt_olb'],
        'notice'        : cofBadge['notice'],
        'map-wwwLogin'    : cofBadge['map-wwwLogin'],
        'seedSet'        : cofBadge['seedSet']
    };

    window.cofBadge['img-path'] = cofBadge['bll-region'] + '/resources/bll/images/';
    window.cofBadge['bc']['aaHost'] = cofBadge['aaHost'];
    window.cofBadge['dest'] =
    {
        'us-card-login'        : '/loginweb/login/login.do',
        'us-card-forgot-user'    : cofBadge['aaHost'] + '/loginweb/forgotidm/forgotuser.do',
        'us-card-forgot-pass'    : cofBadge['aaHost'] + '/loginweb/forgotidm/forgotpass.do',
        'us-card-enroll'         : cofBadge['aaHost'] + '/loginweb/enrollidm/enrollWelcome.do?CountryCode=USA',
        'us-privacy'              : cofBadge['bc']['wwwUSUrl'] + '/identity-protection/privacy/',
        'us-security'             : cofBadge['bc']['wwwUSUrl'] + '/identity-protection/commitment/',
        'us-fraud'                : cofBadge['bc']['wwwUSUrl'] + '/identity-protection/security/',
        'olb-login'               : '/loginweb/login/login.do',
        'olb-forgot-user'         : cofBadge['aaHost'] + '/loginweb/enterpriseforgotidm/enterpriseforgotuser.do',
        'olb-forgot-pass'         : cofBadge['aaHost'] + '/loginweb/enterpriseforgotidm/enterpriseforgotpass.do',
        'olb-enroll'              : cofBadge['aaHost'] + '/enroll',
        'ing-login'             : cofBadge['bc']['360SecureUrl'] + '/myaccount/banking/login.vm',
        'ing-forgot'              : cofBadge['bc']['360SecureUrl'] + '/myaccount/banking/forgot_cif_input.vm',
        'auto-enroll'              : cofBadge['bc']['360Url'] + '/manageautoloan',
        'ing-enroll'              : cofBadge['bc']['360SecureUrl'] + '/myaccount/banking/autoLoanEnrollmentMain',
        'ca-card-login'           : '/loginweb/login/login.do',
        'ca-card-forgot-user'     : cofBadge['aaHost'] + '/loginweb/forgotidm/forgotuser.do?CountryCode=CA',
        'ca-card-forgot-pass'     : cofBadge['aaHost'] + '/loginweb/forgotidm/forgotpass.do?CountryCode=CA',
        'ca-card-enroll'          : cofBadge['aaHost'] + '/loginweb/enrollidm/enrollWelcome.do?CountryCode=CA',
        'ca-privacy'              : cofBadge['bc']['wwwCAUrl'] + '/about-us/privacy',
        'ca-security'             : cofBadge['bc']['wwwCAUrl'] + '/about-us/security',
        'ca-fraud'                : cofBadge['bc']['wwwCAUrl'] + '/credit-basics/fraud-protection',
        'uk-card-login'           : cofBadge['bc']['wwwUKOLUrl'] + '/CapitalOne_Consumer/Login.do',
        'uk-card-register'        : cofBadge['bc']['wwwUKOLUrl'] + '/CapitalOne_Consumer/EnrollStep1.do',
        'uk-privacy'              : cofBadge['bc']['wwwUKOLUrl'] + '/CapitalOne_Consumer/AcctPrivacyOutside.do',
        'uk-security'             : cofBadge['bc']['wwwUKUrl'] + '/support/security.jsf',
        'uk-fraud'                : cofBadge['bc']['wwwUKUrl'] + '/creditmadeclearer/credit-card-fraud-prevention.jsf',
        'banking-login'           : cofBadge['bc']['olbvUrl'] + '/Capitalone/login.aspx',
        'banking-forgot-id'       : cofBadge['aaHost'] + '/loginweb/enterpriseforgotidm/enterpriseforgotuser.do',
        'banking-forgot-pass'     : cofBadge['aaHost'] + '/loginweb/enterpriseforgotidm/enterpriseforgotpass.do',
        'banking-enroll'          : cofBadge['aaHost'] + '/enroll',
        'coaf-login'              : cofBadge['bc']['olbvUrl'] + '/Capitalone/Login.aspx?ori=coafPartner',
        'coaf-forgot-user'        : cofBadge['bc']['360Url'] + '/myaccount/banking/forgot_cif_input.vm',
        'coaf-forgot-pass'        : cofBadge['bc']['olbvUrl'] + '/Capitalone/ForgottenPassword/ForgotYourPassword.aspx?ori=COAFPARTNER',
        'coaf-enroll'             : cofBadge['bc']['olbvUrl'] + '/Capitalone/Enrollment.aspx?ori=COAFPARTNER',
        'share-login'             : 'https://www.capitaloneinvesting.com/main/authentication/signin.aspx?cmpid=COF_S_SIGNIN_BDG',
        'share-forgot-user'       : 'https://www.capitaloneinvesting.com/main/authentication/recovery.aspx?cmpid=COF_S_BDG_PWRESET',
        'treasury-login'          : 'https://top.capitalonebank.com/cashplus/',
        'treasury-enroll'         : cofBadge['bc']['olbvUrl'] + '/Capitalone/Enrollment.aspx',
        'rewards-login'           : 'http://www.capitalone.com/rewards/service-login.php',
        'rewards-enroll'          : 'https://nohasslerewards.capitalone.com/',
        'prepaid-login'           : 'https://www.mycapitaloneprepaid.com/acct/login/cap1/',
        'prepaid-enroll'          : 'https://www.mycapitaloneprepaid.com/acct/index.php?ls=cap1',
        'hl-cof-login'            : cofBadge['bc']['olbvUrl'] + '/Capitalone/login.aspx',
        'hl-ing-login'            : cofBadge['bc']['360SecureUrl'] + '/myaccount/banking/login.vm',
        'hl-mortgage'             : cofBadge['bc']['360SecureUrl'] + '/myaccount/banking/login.vm',
        'no-account'              : cofBadge['bc']['wwwUSUrl'] + '/sign-in/'
    };
}

function checkDom(source, fileName){
    var ref = '';
    resourceCount = 0;
    $(source).each(function(){
        switch(source)
        {
            case 'script':ref = this.src;break;
            case 'link':ref = this.href;break;
        }

        if(ref.indexOf(fileName) > -1){resourceCount = 1;return false;}
    });
}

function completeBadgeLoad(){

    badgeHost = cofBadge['aaHost'] + '/resources/bll/';
    badgeLoc = cofBadge['aaHost'];

    $('#section-2').attr('id','log-in-badge')
    $('#log-in-badge').addClass('log-in-badge');

    var seedSetArr = [];
    var array = $.map(cofBadge['seedSet'], function(value, index) {seedSetArr.push([value]);});

    $(seedSetArr).each(function()
    {
        if(this.toString().indexOf(dlh) > -1)
        {
            overrideBadgeMarkup = 0;
            return false;
        } else {
            overrideBadgeMarkup = 1;
        }
    });

    if(overrideBadgeMarkup == 1)
    {
        var cssBadge = badgeHost + 'css/badge.css';
        if (document.createStyleSheet)
        {
            document.createStyleSheet(cssBadge);
        }
        else
        {
            checkDom('link', cssBadge);
            if(resourceCount == 0){$("head").append($('<link rel="stylesheet" type="text/css" href="' + cssBadge + '" />'));}
        }

        processBadgeMarkup()

        if ($.browser.msie)
        {
            if (document.documentMode <= 7 || document.documentMode === undefined)
            {
                $.getScript(badgeHost + 'jscript/ie-fix.js');
            }

            if (parseInt($.browser.version) == 8)
            {
                $('#btnAccountType').css('margin-top','-1px');
            }
        }
    }

    callBadgeJs();

    var geteMFA = setInterval(function(){loadeMFA();clearInterval(geteMFA);},500);
}

function loadeMFA(){
    checkDom('script', 'eMFA.js');
    if(resourceCount == 0){
        $.ajax({
            url: badgeLoc + '/resources/jscript/eMFA.js',
            cache:true,
            dataType: 'script',
            success: function(data){
                $.ajax({
                    url: badgeLoc + "/loginweb/common/Get_Remote_Address.jsp",
                    dataType : 'jsonp',
                    async: false,
                    jsonpCallback: 'callback',
                    success: function(data){initEMFAData(data);}
                });
            }
        });
    }
}

function processNonProd(){
    setBadgeConfig(envset+chop3);
    processConfig();
}

function processConfig(){
    checkCookie();
    configureBadge();
    completeBadgeLoad();
}

function badgeJsComplete(){
    $('.log-in-badge a.asset-link').each(function(){$(this).attr('href', cofBadge['dest'][$(this).attr('data-href')]);});
    if (ieFix) {var zIndexNumber=1000;$(".log-in-badge div,.log-in-badge fieldset").each(function(){$(this).css("zIndex",zIndexNumber);zIndexNumber-=10});}
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        if(navigator.appVersion.indexOf('OS 5') != -1){
            $('.log-in-badge').css('overflow','auto');
        }
    }

    $('.log-in-badge #auth-auto-loans .auth-help').css('clear','none');
    $("#account-log-in label").inFieldLabels();
    $('.log-in-badge').show();
    $('.user-id').focus();
    $('body').on('keydown', '#log-in-badge input[type="text"], #log-in-badge input[type="password"]', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $('#account-log-in').submit();
        }
    });
}

function callBadgeJs()
{
    checkDom('script',badgeFile);
    if(resourceCount == 0){
        makeAjaxCall('jscript/'+ badgeFile, true, true, 'script', badgeJsComplete, returnError, returnComplete, '');
    }
}

function makeAjaxCall(url, setCache, setAsync, setDataType, successFn, errorFn, completeFn, callback)
{
    url = badgeHost + url;
    $.ajax({
        url : url,
        cache: setCache,
        async: setAsync,
        dataType: setDataType,
        jsonpCallback: callback,
        success: function(data) {successFn();},
        complete : function(){completeFn(url);},
        error : function() {errorFn();}
    });
}

function initialize() {
    $('script').each(function(){
        if($(this)[0].src.substr(0,$(this)[0].src.indexOf('/resources')) != aaProd && $(this)[0].src.indexOf(badgeJs) > -1) {
            var badgeSrc = $(this)[0].src.substr(0,$(this)[0].src.indexOf('/resources'));

	if ($.browser.msie)
        {
            if (document.documentMode <= 7 || document.documentMode === undefined)
            {
		if(badgeSrc.indexOf('http') == -1){
	                badgeSrc = location.protocol + badgeSrc;
		}
	    }
        }

            skipLoad = 0;
            if($(this)[0].src.substr(0,$(this)[0].src.indexOf('/resources')) != aaProd && $(this)[0].src.indexOf(badgeJs) > -1){
                configLoad = badgeSrc;
                return false;
            }
        }
    });

    if(skipLoad == 0) {
        if(configLoad != ''){
            badgeLoc = configLoad;
            badgeHost = badgeLoc + '/resources/bll/';
            badgeHostRSA = badgeLoc;

            if(configLoad != aaProd){
                var chop3 = '';

                if(badgeLoc.indexOf('loginqa') > -1) {
                    qaSet = 1;
                    aaCheck();
                    qaenv = 'qa';
                    envset = '';
                } else if (badgeLoc.indexOf('perf') > -1) {
                    qaSet = 1;
                    aaCheck();
                    qaenv = 'perf';
                    envset = '-perf';
                } else if(
                	badgeLoc.indexOf('login.capitalone.com') == -1 &&
                    badgeLoc.indexOf('login1.capitalone.com') == -1 &&
                    badgeLoc.indexOf('login2.capitalone.com') == -1 &&
                    badgeLoc.indexOf('loginbeta1.capitalone.com') == -1 &&
                    badgeLoc.indexOf('loginbeta2.capitalone.com') == -1)
                {
                    qaSet = 1;
                    qaenv = 'dev';

                    if (badgeLoc.indexOf('sso') > -1) {
                        envset = 'local';
                        qaenv = 'local';
                    } else {
                        if (badgeLoc.indexOf('perf') > -1) {
                            qaenv = 'perf';
                        }

                        var prot = location.protocol + '//';

                        if(badgeLoc.indexOf('kdc') > -1){
                            domain = '.kdc.capitalone.com';
                        } else {
                            domain = '.capitalone.com';
                        }
                        var chop2 = badgeLoc.substr(0,badgeLoc.indexOf(domain)).substr(window.prot.length,badgeLoc.substr(0,badgeLoc.indexOf(domain)).length);

                        envset = chop2;
                    }
                }
            }
        }
    }
    if (qaSet != 0){
    	makeAjaxCall('jscript/nonprod/badge-config-set-' + qaenv + '.js', true, false, 'script', processNonProd, returnError, returnComplete, '');
    } else {
    	processConfig();
    }
}

function relay(decNum) {
    var seed = 0;
    var pad = "00000";
    var binVal = [];
    var Nnum;
    for(seed; seed < decNum.join('').length; seed++)
    {
        Nnum = transFrom(decNum[seed]);
        if(Nnum == ''){Nnum = "0";}
        binVal.push(pad.substring(0, pad.length - Nnum.length) + Nnum);
    }
    return binVal.join('');
}

function transistor(x, y, base) {
  var z = [];
  var n = Math.max(x.length, y.length);
  var carry = 0;
  var i = 0;
  while (i < n || carry) {
    var xi = i < x.length ? x[i] : 0;
    var yi = i < y.length ? y[i] : 0;
    var zi = carry + xi + yi;
    z.push(zi % base);
    carry = Math.floor(zi / base);
    i++;
  }
  return z;
}

function rectifier(num, x, base) {
  if (num < 0) return null;
  if (num == 0) return [];
  var result = [];
  var power = x;
  while (true) {
    if (num & 1) {result = transistor(result, power, base);}
    num = num >> 1;
    if (num === 0) break;
    power = transistor(power, power, base);
  }
  return result;
}

function diode(str, base) {
  var digits = str.toString().split('');
  var ary = [];
  for (var i = digits.length - 1; i >= 0; i--) {var n = parseInt(digits[i], base);if (isNaN(n)) return null;ary.push(n);}
  return ary;
}

function fuse(str, fromBase, toBase) {
  var digits = diode(str, fromBase);
  if (digits === null) return null;

  var outArray = [];
  var power = [1];
  for (var i = 0; i < digits.length; i++) {

    if (digits[i]) {
      outArray = transistor(outArray, rectifier(digits[i], power, toBase), toBase);
    }
    power = rectifier(fromBase, power, toBase);
  }

  var out = '';
  for (var i = outArray.length - 1; i >= 0; i--) {
    out += outArray[i].toString(toBase);
  }
  return out;
}

function crystal(decStr) {var hex = fuse(decStr, 10, 16);return hex;}
function oscillator(hexStr) {
	if (hexStr.substring(0, 2) === '0x') hexStr = hexStr.substring(2);
	hexStr = hexStr.toLowerCase();
	return fuse(hexStr, 16, 10).split('');
}

function valve(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    hex = $.solder(crystal(relay(oscillator(hex))));
    end = new Date().getMilliseconds();
    return hex;
}

function transFrom(n){return resistor(n);}

function transTo(arr)
{
    var f=1,fprev=1,fnew,i,sum=0;
    for(i=0; i<arr.length; (arr[i]==1?sum+=f:0),fnew=f+fprev,fprev=f,f=fnew,i++);
    return sum
}

function resistor(n)
{
    var battery=new Array(0,1,1);
    var i=2;
    while(battery[i].toString().indexOf(".")==-1 &&(battery[i-1]%10+battery[i-2]%10)%10==battery[i]%10)
    {i++;battery[i]=battery[i-1]+battery[i-2];};

    var z="",i=2;
    while(battery[i]<=n)i++;
    for(i--; i > 1; i--){if(battery[i]>n){z="0"+z}else{z="1"+z;n-=battery[i]}};
    return z
};

$(document).ready(function(){
    dlh = valve(document.location.hostname);
    initialize();
});