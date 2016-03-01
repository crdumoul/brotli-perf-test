var cxDataLayerEnv = function(){
d = document.domain
if (d == 'www.cathaypacific.com' || d == 'book.cathaypacific.com' || d == 'www.dragonair.com' || d == 'book.dragonair.com' || d == 'holidays.cathaypacific.com'){
	env = 'prod'
}else{
	env = 'qa'
}
return env;
}();
var cxDataLayer = cxDataLayer || {};
document.write('\x3Cscript src=//tags.tiqcdn.com/utag/cathaypacific/main/' + cxDataLayerEnv + "/utag.sync.js" + '>\x3C/script>');