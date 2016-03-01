

function validateForm(event) {
    var eclubEmail = $('#eclub-email').val();
    $('#eclub-email').css("border", "none");
    console.log(eclubEmail);
    if (eclubEmail !== "" && !validateEmail(eclubEmail)) {
        $('#eclub-email').css("border", "solid 1px red");
        alert(window.eClubErrorMessage);
        event.preventDefault();
    }
    return true;
}

function validateEmail(email) {
    var re = /^([^@\s]+@[^@\s]+(\.)[^@\s]+)$/;
    return re.test(email);
}

if (navigator.userAgent.indexOf("MSIE 9") != -1) {
    onDocumentReady(addPlaceholderToInputFields);
}