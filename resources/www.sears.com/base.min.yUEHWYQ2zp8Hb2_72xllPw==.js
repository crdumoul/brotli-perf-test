$(window).load(function(){if(typeof shc.chat!=="undefined"){var a=$("#spinDispPath").data("path");
shc.chat=$.extend(true,shc.chat,{navigationPath:a.replace(/\|/g,"_"),});
shc.chat.send(shc.chat.SCOPE.page,"navigationPath",shc.chat.navigationPath,shc.chat.EVENT.pageLoad)
}});