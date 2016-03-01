
$(document).ready (function() {
    var width = 0;
    var logos = document.getElementById("parnters_logos");
    var imgs = logos.getElementsByTagName("img");
    //alert('file img count = '+imgs.length);
    for (i=0; i<imgs.length; i++){
        width = width + imgs[i].offsetWidth + 10;
    }
    if(imgs.length>=1){
        //alert(width+" (file)  --> "+((980 - width)/2));
        //alert(width+" (file)  --> "+width);
        //imgs[0].style.marginLeft = (400 - width)/2 + "px";
        imgs[0].style.marginLeft = 88+ "px";
    }
}) 