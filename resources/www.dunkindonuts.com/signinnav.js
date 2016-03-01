(function($) {

    if ($("#signin")!=null) {
        //$("#signin").unbind();
    	$("#signin").on('click', function() {
            $('#myhiddenvalue').val($('#signinvalue').val());
            $(this).closest('form').submit();
        });
    }
    if ($("#signup")!=null) {
    //    $("#signup").unbind();
    $("#signup").on('click', function(e) {
    	e.preventDefault();
            $('#myhiddenvalue').val($('#signupvalue').val());
             $(this).closest('form').submit();
        });
   }
    $('input').keydown(function(e){
            if (e.keyCode == 13) {
                $(this).closest('form').submit();
                return false;
            }
     });
    
})(jQuery);

