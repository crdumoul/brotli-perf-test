
var timerID = 0;

function showSelect(imageId, tabImg, activeTabImg, isActive, dropmenu) {

    if (!isActive) {
        var imageElement = document.getElementById(imageId);
        if (imageElement) {
            imageElement.src = activeTabImg;
        }
        
        // show drop menu
        var dropMenuElement = document.getElementById(dropmenu);
        if (dropMenuElement) {
            
            if (imageElement) {
                dropMenuElement.style.left = imageElement.offsetLeft + 'px';
                dropMenuElement.style.display = "block";
                dropMenuElement.style.zIndex = "9";
                
            }
        }
    }
}

function hideSelect(imageId, tabImg, activeTabImg, isActive, dropmenu) {

    if (!isActive) {
        
        var imageElement = document.getElementById(imageId);

        if (imageElement) {
            imageElement.src = tabImg;
        }
        
        // hide drop menu
        var dropMenuElement = document.getElementById(dropmenu);
        if (dropMenuElement) {
            dropMenuElement.style.display = "none";
            dropMenuElement.style.zIndex = "-1";
        }
    }
}

function PopUpWindow(mypage){
			var winl = (screen.width - 450 ) / 2;
			var wint = (screen.height - 400) / 2;
			winprops = 'height=300,width=350,top='+wint+',left='+winl+',scrollbars=yes,resizable';
			win = window.open(mypage, 'FAQ', winprops);
}