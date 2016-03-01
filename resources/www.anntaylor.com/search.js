function trimTerm(term) {

    returnString = "";

    for (idx = 0; idx < term.length; idx++) {
        if ((term.charAt(idx) != " ") && (term.charAt(idx) != null)) {
            returnString = returnString + term.charAt(idx);
        }
    }

    return returnString;
}

function resetField(element) {

     if(element.value.length==0) {
        element.value="Search";
     }
}

function clearField(element) {
   if( element.value=="Search") {
    element.value="";
   }
}

function EndecaGlobalSearch() {

    var keywords = document.searchForm.searchTerm.value;

    if(keywords == "Search") {
        alert("Please provide a keyword or item #");
    }
    else {
        if(trimTerm(keywords) == "") {
            alert("Please provide a keyword or item #");
        }
        else {
            document.searchForm.submit();
        }
    }
    return false;
    
}function nextPage(pageNum, requestChainToken) {
      alert(pageNum);
      alert(requestChainToken);
      document.querySearchForm.requestChainToken.value = requestChainToken;
      document.querySearchForm.goToPage.value = pageNum;
      document.querySearchForm.submit();
      return false;
    }
function activate(obj) {
	if(obj.value == 'Search'){
		obj.value='';
	}
}