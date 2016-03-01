window.asus = window.asus || {};
asus = asus || {};
(function() {
    asus.user = {
        touch :  "ontouchend" in document ? true : false
    };
    asus.url = {
        the_url :  document.location.href,
        top_url :  top.location.href
    };
    
    /** s */
    function asus_menu(){
        var in_nav = $("#asus-api-header .aai-nav li.aai-focus");
        var select_nav = in_nav;
        var lock = false;
        var lock_show = false;
        var temp_select = '';
        var open = false;
        var clear_all = function(){
            $("#asus-api-header .aai-nav li").off("mouseover",show_sub_menu);
            $("#asus-api-header .aai-nav li").off("mouseout",hide_sub_menu);
            $("#asus-api-header .aai-nav li").off("click",touch_menu);
            $(".aai-sub-inner").off("mouseenter",lock_show_over);
            $(".aai-sub-inner").off("mouseleave",lock_show_out);
            $(document).off('mousedown',close_menu);
            $("#asus-api-header .aai-sub-menu .asiaai-de-inner a").off("click",submenu);
            $('#asus-api-header .js_line').remove();
            $("#asus-api-header .aai-subNav").removeClass('open');
            $('.aai-sub-inner>div').removeClass('active');
            open= false;
            temp_select = '';
            lock_show = false;
            lock = false;
            select_nav = in_nav;
        };

        var lock_show_over = function(){ lock_show = true; };
        var lock_show_out = function(){ lock_show = false; };
        var show_sub_menu = function(){
            var tmp = this;
            select_nav = this;
            setTimeout(function(){
                if ((select_nav == tmp)&&(select_nav != temp_select)&&(open)) {
                    $(".aai-nav li").removeClass("aai-focus");
                    $('.aai-sub-inner>div').removeClass('active');
                    $(select_nav).addClass("aai-focus");
                    $('#'+$(select_nav).data("name")).addClass('active');
                    setTimeout(function(){temp_select = tmp;},500);
                    autoheight(false);
                    line(select_nav);
                }
            },500);
           // line(this);
            return false;
        };
        var hide_sub_menu = function(){
            select_nav = '';
        };
        var touch_menu = function(){
            if ($(this).data('link')) {
                if($(this).attr("target") == "_blank") window.open($(this).data('link'));
                else window.location.href = $(this).data('link');
                return false;
            }
            if ((temp_select != select_nav)&&(open)&&(!asus.user.touch)) { return false;}
         // $("#asus-api-header .aai-subNav").removeClass('open');
            $('#asus-api-header .js_line').height(($("#asus-api-header").height()-3) +'px');
            $(".aai-nav li").removeClass("aai-focus");
         // $('.aai-sub-inner>div').removeClass('active');
            $("#aai-main-search .selectbox").hide();
            if (asus.user.touch) {
                if ((temp_select != this)||(!temp_select)){
                    if (open) {$('.aai-sub-inner>div').removeClass('active');}
                    $(this).addClass("aai-focus");
                    $("#asus-api-header .aai-subNav").addClass('open');
                    $('#'+$(this).data("name")).addClass('active');
                    temp_select = this; 
                    open = true;
                    autoheight(false);
                    line(this);
                }
                else {
                    temp_select = ''; 
                    in_nav.addClass("aai-focus");
                    open = false;
                    autoheight(false,1);
                }
            }
            else if (open == false) {
                $(this).addClass("aai-focus");
                $("#asus-api-header .aai-subNav").addClass('open');
                $('#'+$(this).data("name")).addClass('active');
                temp_select = this; 
                open = true;
                autoheight(true);
                line(this);
            }
            else {
                temp_select = ''; 
                in_nav.addClass("aai-focus");
                open = false;
                autoheight(false,1);
                if (!$('#asus-api-header .aai-focus').eq(0)[0]){  $('#asus-api-header .js_line').stop().animate({'width':0,'left':0}); }
                else {line($('#asus-api-header .aai-focus').eq(0));}
            }
            
            return false;
        };
        var autoheight = function(has,hide){
            if (has) {
                $('.aai-subNav').height('auto');
                var height = $('.aai-subNav').height();
                $('.aai-subNav').css({'height':$("#asus-api-header").height()+'px','opacity':'0'}).stop().animate({'height':height+'px','opacity':'1'});
            }
            else {
                var old_height = $('.aai-subNav').height();
                $('.aai-subNav').height('auto');
                var height = $('.aai-subNav').height();
                $('.aai-subNav').height(old_height);
                $('.aai-subNav').stop().animate({'height':(hide == 1 ? $("#asus-api-header").height() : height)+'px','opacity':(hide == 1 ? '0' : '1')},300,function(){
                    if (hide) {
                        $("#asus-api-header .aai-subNav").removeClass('open'); 
                        $('.aai-sub-inner>div').removeClass('active');
                    }
                });
            }
        }
        var submenu = function(){
            $('#'+$(this).data("name")).siblings().removeClass('active');
            $('#'+$(this).data("name")).addClass('active');
        };
        var close_menu = function(){
            if ((lock_show == false)&&(temp_select)&&(!select_nav)) { 
             // $("#asus-api-header .aai-subNav").removeClass('open'); 
                $(".aai-nav li").removeClass("aai-focus");
             // $('.aai-sub-inner>div').removeClass('active');
                temp_select = ''; 
                open = false;
                autoheight(false,1);
                if (!$('#asus-api-header .aai-focus').eq(0)[0]){  $('#asus-api-header .js_line').stop().animate({'width':0,'left':0}); }
                else {line($('#asus-api-header .aai-focus').eq(0));}
            }
        };
        var line = function(obj){
            var width = $(obj).find('a').outerWidth(true);
            var offset = $(obj).find('a').offset().left - $('#asus-api-header .aai-inner').offset().left;
            $('#asus-api-header .js_line').stop().animate({'width':width+'px','left':offset+'px'},300,function(){
                if (temp_select != obj){
                    if ((temp_select)&&(!select_nav)) {/*line(temp_select);*/}
                    else if (!select_nav){ $('#asus-api-header .js_line').stop().animate({'width':0,'left':0}); }
                }
            });
        }
        var start = function(){
            if (asus.user.touch ) {
                $("#asus-api-header .aai-nav li").on("click",touch_menu);
            }
            else {
                $("#asus-api-header .aai-nav li").on("mouseover",show_sub_menu);
                $("#asus-api-header .aai-nav li").on("mouseout",hide_sub_menu);
                $("#asus-api-header .aai-nav li").on("click",touch_menu);
                $(".aai-sub-inner").on("mouseenter",lock_show_over);
                $(".aai-sub-inner").on("mouseleave",lock_show_out);
            }
            
            $("#asus-api-header .aai-sub-menu .asiaai-de-inner a").on("click",submenu);
            $('#asus-api-header .aai-inner').prepend('<div class="js_line" style="height: '+($("#asus-api-header").height()-3)+'px; position: absolute; z-index: -1;width: 0; left: 0; border-bottom: 3px solid #000;"></div>');
        
            $(document).on('mousedown',close_menu);
        };
        var status = false;
        var run = function(){
            if (($(window).width() > 719)&&(status == false)) { start(); status = true; }
            else if (($(window).width() <= 719)&&(status == true)) { clear_all(); status = false; }
            if ($(window).width() > 719){
                $('#asus-api-header .js_line').height(($("#asus-api-header").height()-3) +'px');
                if ($('#asus-api-header .aai-focus').eq(0)[0]){  line($('#asus-api-header .aai-focus').eq(0)); }
            }
        };
        run();
        $('.aai-sub-inner').prepend('<div style="width: 100%; height: 50px; margin-top: -50px;" id="aai-hover-box"></div>');
        $(window).on('resize',run);

    }

    /*
        RecentlyView
        update : 2014/03/17
        Angel 
    */
    asus.RecentlyView = {
        val: Array(),
        init: function () {
            var content = asus.cookie.get("recently");
            if (!content) { return; }
            var models = content.split(",");
            var count = 0;
            for (var intI = 0; intI < models.length; intI++) {
                var model = Array;
                if (intI < models.length) { model = models[intI].split("^"); }
                if (model[0] != '' && model[1] != '') {
                    asus.RecentlyView.val[count] = Array();
                    asus.RecentlyView.val[count][0] = model[0];
                    asus.RecentlyView.val[count][1] = model[1];
                    asus.RecentlyView.val[count][2] = model[2];
                    count++;
                    if (count == 10) { break; }
                }
            }
            asus.RecentlyView.init = function () { return; }
        },
        rehtml: function () {
            asus.RecentlyView.init();
            var count = 0;

            for (var intI = 0; intI < 10; intI++) {
                if (asus.RecentlyView.val[intI]) {
                    $("#viewed-list ul li").eq(intI).html('<a href="product.aspx?P_ID=' + asus.RecentlyView.val[intI][0] + '"><img src="' + asus.RecentlyView.val[intI][2] + '" alt="Recently' + intI + '" /></a><a href="#" class="removebutton"></a><span class="list-product-name">' + asus.RecentlyView.val[intI][1] + '</span>');
                    count++;
                }
                else {
                    $("#viewed-list ul li").eq(intI).html('<img src="/media/img/p_130_rull.jpg">');
                }
            }
            $("#viewed-list .removebutton").each(function (i) {
                $(this).attr("remove_i", i);
                $(this).on("click", function () { asus.RecentlyView.reset($(this)); asus.RecentlyView.remove($(this).attr("remove_i")); return false; });
            });
            $("#num_viewed").html(count);
        },
        remove: function (i) {
            asus.RecentlyView.val.splice(i, 1);
            asus.RecentlyView.recookie();
        },
        recookie: function () {
            var str = '';
            for (var intI = 0; intI < asus.RecentlyView.val.length; intI++) {
                if (intI == 10) { break; }
                str += asus.RecentlyView.val[intI][0] + "^" + asus.RecentlyView.val[intI][1] + "^" + asus.RecentlyView.val[intI][2] + ",";
            }
            if (str) { asus.cookie.set("recently", str); }
            else { asus.cookie.del("recently"); }
        },
        add: function (id, name, src) {
            asus.RecentlyView.init();
            var count = asus.RecentlyView.val.length;
            count = count > 10 ? 10 : count;
            if (count > 0) {
                for (var intI = 0; intI < count; intI++) {
                    if (asus.RecentlyView.val[intI][0] == id) { return false; }
                }
            }
            var arr = Array();
            arr[0] = id;
            arr[1] = name;
            arr[2] = src.replace("_000_", "_fff_");
            asus.RecentlyView.val.unshift(arr);
            asus.RecentlyView.rehtml();
            asus.RecentlyView.recookie();
        },
        reset: function (t) {
            var $ul_parent = $(t).parent().parent(),
                $ul_list = $('#viewed-list .aai-vls');
            $(t).parent().remove();
            if ($ul_parent[0] === $ul_list[1]) {
                $('<li class="span-5col"><img src="/media/img/p_130_rull.jpg"></li>').appendTo($ul_parent);
            } else {
                if (asus.RecentlyView.val.length > 5) {
                    var $ct = $($ul_list[1]).find('li').eq(0);
                    $ct.appendTo($ul_list[0]);
                    $('<li class="span-5col"><img src="/media/img/p_130_rull.jpg"></li>').appendTo($($ul_list[1]));
                } else {
                    $('<li class="span-5col"><img src="/media/img/p_130_rull.jpg"></li>').appendTo($ul_parent);
                }
            }
            $("#num_viewed").html(asus.RecentlyView.val.length - 1);
        }
    }


    function apiheader() {
        var tag = false;
        var tag_id = $("#overview-top-nav");
        if (!tag_id[0]) { return; }
        var offset_top = tag_id.offset().top;
        var scroll_fn = function(){
            var scrollTop = $(this).scrollTop();  
            if (scrollTop >= offset_top){
                if (tag) { return true; } 
                if (offset_top == 0){ offset_top = tag_id.offset().top; return true; }
                tag = true;
                tag_id.css({  'top': 0 - tag_id.height() + 'px' }).addClass('fixed');
                tag_id.stop().animate({'top':'0'});
            }
            else {
                if (!tag) { return true; } 
                tag = false;

                tag_id.css({'top': ''}).removeClass('fixed');
            }
        }
        $(window).on("scroll", scroll_fn);
    }


    function gallery_resize(){
        var gallery_fn = function(){
            if ($("#product-gallery-area li").eq(3).hasClass('bigone')){
                $("#product-gallery-area li").eq(3).height((($("#product-gallery-area li").eq(2).height()+1)*2-1)+'px');
            }
            if ($("#product-gallery-area li").eq(4).hasClass('bigone2')){
                $("#product-gallery-area li").eq(4).css('margin-top',(-1-$("#product-gallery-area li").eq(0).height()) +'px');
                $("#product-gallery-area li").eq(4).height((($("#product-gallery-area li").eq(2).height()+1)*2-1)+'px');
            }
            if ($("#product-gallery-area li").eq(5).hasClass('after-big-1')){
                $("#product-gallery-area li").eq(5).css('margin-top',(-1-$("#product-gallery-area li").eq(0).height()) +'px');
            }
            if ($("#product-gallery-area ul").hasClass('has-video')){
                $("#product-gallery-area li").eq(0).height(($("#product-gallery-area li").eq(1).height()+$("#product-gallery-area li").eq(3).height()-1)+'px');
            }
            if ($("#product-gallery-area li").eq(9).hasClass('bigone')){
                $("#product-gallery-area li").eq(9).css('margin-top',(-1-$("#product-gallery-area li").eq(1).height()) +'px');
                $("#product-gallery-area li").eq(9).height(($("#product-gallery-area li").eq(1).height()+$("#product-gallery-area li").eq(3).height()-1)+'px');
            }
            if ($("#product-gallery-area li").eq(10).hasClass('bigone2')){
                $("#product-gallery-area li").eq(10).css('margin-top',(-1-$("#product-gallery-area li").eq(1).height()) +'px');
                $("#product-gallery-area li").eq(10).height(($("#product-gallery-area li").eq(1).height()+$("#product-gallery-area li").eq(3).height()-1)+'px');
            }
            if ($("#product-gallery-area li").eq(11).hasClass('after-big-1')){
                $("#product-gallery-area li").eq(11).css('margin-top',(-1-$("#product-gallery-area li").eq(1).height()) +'px');
            }
        };
        $(window).on('resize',gallery_fn)
    }


    function aai_right_more() {
        var obj = $("#asus-api-header");
        var in_tool = false;
        var out_click = function(){
            if (in_tool == false) { 
                obj.find('.aai-mm-item').removeClass('open');
            }
        };
        var aairightmore_open = function () {
            var origin_open_flag = ($(this).parent('li.aai-mm-item').hasClass('open'));
            obj.find('.aai-mm-item').removeClass('open');

            if ($(this).parent('li.aai-mm-item').attr("id") == "menu_msg") resetMessage();

            if (($(this).find('i').text() == '0' || $(this).find('i').text() == '') && $(this).hasClass("external_data")) return true;
            if (!origin_open_flag) $(this).parent('li.aai-mm-item').addClass('open');

            if ($(this).siblings('div.aai-mms-list')[0]) {
                $(this).siblings('div.aai-mms-list').find('.aai-tls-se').removeClass('active');
                $(this).siblings('div.aai-mms-list').find('div.aai-mst-header a').removeClass('active');

                //:default set Recently Viewed active
                $(this).siblings('div.aai-mms-list').find('.aai-tls-se:eq(0)').addClass('active');
                $(this).siblings('div.aai-mms-list').find('div.aai-mst-header a:eq(0)').addClass('active');

                $("div.aai-mst-header a:eq(0)").click();
            }

            if (obj.find('.aai-mm-item').hasClass('open')) {
                $('body').on('mousedown', out_click);
            }
            else { $('body').off('mousedown', out_click); }

            var link_id = $(this).data('id');
            var link_url = $(this).data('url');
            obj.find('.aai-more-tools').addClass('exp');
            obj.find('.aai-more-tools').animate({ 'width': $(".aai-inner").width() + 'px' });
            if (($('.aai-more-tools').hasClass('open')) || ($(window).width() <= 719)) {
                obj.find('.aai-more-inner').css({ 'width': ($(".aai-inner").width() - parseInt(obj.find('.aai-more-inner').css('padding-left')) - parseInt(obj.find('.aai-more-inner').css('padding-right'))) + 'px' });
            }
            if ($('.aai-more-tools').hasClass('exp')) {
                obj.find('.aai-more-tools').css({ 'width': $(".aai-inner").width() + 'px' });
            }
            if (link_url) {
                $('#' + link_id).find('iframe').attr('src', link_url);
            }
        };
        var set_scroll = function (obj_link) {
            var link_id = obj_link;
            if ($('#' + link_id)[0]) {
                $('#' + link_id).siblings().removeClass('active');
                $('#' + link_id).addClass('active');
                if ((!$('#' + link_id).find('.is_scroll')[0]) && (!$(this).data('url'))) {
                    asus.scroll({
                        block: link_id,
                        scroll_css: { "position": "absolute", "right": "20px", "top": "60px", "bottom": "50px", "background": "#909090", "border-radius": "3px", "width": "7px" },
                        scroll_bar_css: { "background": "#F3F3F3", "cursor": "pointer", "border-radius": "2px", "width": "5px", "border": "1px solid #909090", "margin": "50px 0" },
                        auto_hide: true,
                        height: obj.find('.aai-mms-list').height() - 100
                    });
                    $('#' + link_id).append('<div class="is_scroll"></div>');
                }
            }
            else { return true; }
        };

        var aaiinneropen = function () {
            var link_id = $(this).data('id');
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            set_scroll(link_id);
        };

        var resetMessage = function () {
            var msg_data = (asus.script.get_local() == "cn") ? '//www.asus.com.cn/message.aspx.aspx?lang=' + asus.script.get_local() :
                '//www.asus.com/message.aspx?lang=' + asus.script.get_local();

            $.ajax({
                url: msg_data,
                dataType: 'jsonp',
                jsonp: 'callback',
                cache: true,
                jsonpCallback: '_asus_resetmessage_fn',
                success: function (res) {
                    $("#menu_msg .aai-circle-num").text(res.data);

                    if (res.data == "0") $("#menu_msg .aai-circle-num").css({ 'display': 'none' });
                    else $("#menu_msg .aai-circle-num").css({ 'display': 'block' });
                },
                error: function () { }
            });
        };

        obj.find('.aai-mm-item>a').on("click", aairightmore_open);
        obj.find('.aai-mst-header a').on("click", aaiinneropen);
        obj.find('.aai-mm-sub,.aai-mm-btn').on("mouseenter", function () { in_tool = true; });
        obj.find('.aai-mm-sub,.aai-mm-btn').on("mouseleave", function () { in_tool = false; });
        
        var run = function(){
            if (($('.aai-more-tools').hasClass('open'))||($(window).width() <= 719)){
                obj.find('.aai-more-inner').css({'width':($(".aai-inner").width()-parseInt(obj.find('.aai-more-inner').css('padding-left'))-parseInt(obj.find('.aai-more-inner').css('padding-right')))+'px'});
            }

            if ($('.aai-more-tools').hasClass('exp')){
                obj.find('.aai-more-tools').css({'width':$(".aai-inner").width()+'px'});
            }

        };
        run();
        $(window).on('resize',run);
    }
    

    function postlink(obj){
        var postlink_fn = function() {

            var frm = $("<form>");
            frm.attr({'action':$(this).attr('href'), 'method': 'post'});
            frm.appendTo("body");
            var datas = $(this).data();
            for (var k in datas) {
                var input = $("<input>");
                if (k.match(/^js/)){input.attr({'name':k.replace(/^js/, ""), 'value': eval(datas[k])}); }
                else { input.attr({'name':k, 'value': datas[k]}); }
                input.appendTo(frm);
            }
            frm.submit();
            return false;
        };
        if (obj) {
            obj.find('.postlink').off("click");
            obj.find('.postlink').on("click",postlink_fn);
        }
        else {
            $('.postlink').on("click", postlink_fn);
        }
    }

    

    function phone_menu(){
        //if ($(window).width() > 719) { return false;}
        var sub1 = function(){
            $(this).siblings().removeClass('active'); 
            $(this).toggleClass('active');
            $('#overview-top-nav').removeClass('open');
            if ($(this).hasClass('aai-p-menu')){
                if ($('.aai-phone-back')[0]) {
                    $('.aai-menu').addClass("phone-show").removeClass('phone-show-out');
                    $('.aai-subNav').removeClass('open');
                    $('.aai-phone-back').remove();
                }
                $("#aai-main-search").removeClass("phone-show");
                $(".aai-menu").toggleClass("phone-show");
                if ($(".aai-menu").hasClass('phone-show')){
                    $('.aai-subNav').removeClass('open');
                    $('.aai-phone-back').remove();
                    $('.aai-sub-menu').removeClass("active");
                    $('.aai-sub-menu').find('h4').off('click',sub3); 
                    $(".aai-menu li").off("click",sub2);
                    $(".aai-menu li").on("click",sub2);
                } else {

                    $(".aai-menu li").off("click",sub2);
                }
            }
            else if ($(this).hasClass('aai-p-search')){
                $("#aai-main-search").toggleClass("phone-show");
                
                $(".aai-menu").removeClass("phone-show").removeClass("phone-show-out");
                $('.aai-subNav').removeClass('open');
                $('.aai-phone-back').remove();
                $(".aai-menu li").off("click",sub2);
            }
            return false;
        };
        var sub2 = function(){
            if ($(this).data('link')) { 
                window.location.href = $(this).data('link');
                return false;
            }
            if (($(this).find('a').attr('href').search("#") == -1) && ($(this).find('a').attr('href').search("javascript") == -1)) { return true; }
            var data = $(this).data('name');
            $('.aai-menu').removeClass("phone-show").addClass('phone-show-out');
            $('.aai-subNav').addClass('open');
            $('#'+data).addClass('active').prepend('<a class="aai-phone-back">'+$(this).text()+'</a>');
            $('.aai-phone-back').on('click',sub2_back);
            $('#'+data).find('h4').off('click',sub3);
            $('#'+data).find('h4').on('click',sub3);
            return false;
        };
        var sub2_back = function(){
            $('.aai-menu').addClass("phone-show").removeClass('phone-show-out');
            $('.aai-subNav').removeClass('open');
            $(this).parent().removeClass('active');
            $(this).parent().find('.sub-bottom-span').height('');
            $('.aai-phone-back').remove();

            return false;
        }
        var sub3 = function(){
            $(this).parent().height((($(this).nextAll().length+1)*$(this).next().outerHeight(true)+20)+'px');
            $(this).parent().siblings().height('');
            return false;
        }
        var start = function(){
            $("#aai-phone-menu a").on("click",sub1);
        };
        var status = false;
        var clear_all = function(){
            $("#aai-phone-menu a").off("click",sub1);
            $('.aai-subNav').removeClass('open');
            $('.aai-phone-back').remove();
            $('.aai-sub-menu').removeClass("active");
            $('.aai-sub-menu').find('h4').off('click',sub3); 
            $(".aai-menu li").off("click",sub2);
        };
        var run = function(){
            if (($(window).width() > 719)&&(status == true)) { clear_all(); status = false; }
            else if (($(window).width() <= 719)&&(status == false)) { start(); status = true; }
        };
        run();
        $(window).on('resize',run);
    }
    


    function phone_footer(){
        var show = function(){
            $(this).parent().siblings().height('').data('set',false);
            if ($(this).parent().data('set') == 1) { $(this).parent().height('').data('set',false); }
            else {$(this).parent().height(($(this).outerHeight(true)+$(this).next().outerHeight(true))+'px').data('set','1');}
        };
        var start = function(){
            $(".aai-footer-span h4").on("click",show);
        };
        var status = false;
        var clear_all = function(){
            $(".aai-footer-span h4").off("click",show);
            $('.aai-footer-span').height('');
        };
        var run = function(){
            if (($(window).width() > 719)&&(status == true)) { clear_all(); status = false; }
            else if (($(window).width() <= 719)&&(status == false)) { start(); status = true; }
        };
        run();
        $(window).on('resize',run);
    }
    

    function MemberLogout(){
        $("#anchorMemberLogout").on('click',function(){
            window.location.href = this.href + encodeURIComponent(asus.url.top_url);
            return false;
        });
    }
    

    function searchinput(){
        $('#searchinput').on('focus',function(){ 
            var obj = $("#asus-api-header");
            obj.find('.aai-more-tools').removeClass('open');
            obj.find('.aai-tl a').removeClass('active');
            obj.find('.aai-more-tools').removeClass('exp').width('248px');
        });
    }
    

    function menu_service(){
        $('#service-sub-nav .asiaai-de-inner a').on('click',function(){ 
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('#service-sub-nav .'+$(this).data('id')).siblings().removeClass('active');
            $('#service-sub-nav .'+$(this).data('id')).addClass('active');
        });
    }
    
    
    // youtube function
    function asus_youtube(){
        var html = '<div class="modal hide in a_videos" aria-hidden="false" style="display: block;" id="VideoModal">';
           html += '<div class="modal-header">';
           html += '<button class="close" data-dismiss="modal"><img src="/media/images/g_close.png"></button>';
           html += '<h3> </h3>';
           html += '</div>';
           html += '<div class="modal-body">';
           html += '<p> <iframe src="#" frameborder="0" allowfullscreen=""></iframe></p>';
           html += '</div>';
           html += '</div>';
        var open = function(){
            $('.a_videos').remove();
            var id = $(this).data('youtubeid');
            var title = $(this).data('youtubetitle');
            var time = $(this).data('youtubestarttime');
            if (!id) { return true; }
            var add_dom = $(html);
            var src = 'https://www.youtube.com/embed/' + id + '/'+ (time ? '?t='+time : '');
            add_dom.find('iframe').attr('src',src);
            add_dom.find('h3').html(title);
            add_dom.find('.close').on('click',function(){   
            $('.a_videos').html('');
            $('.a_videos').hide();$('.a_videos').remove();location.hash = '_';

            });
            $('body').append(add_dom);
            location.hash = id;
            return false;
        }
var mobiles = [
		"iphone", "android", "iPod", "sony", "samsung", "htc",
                "incognito", "webmate", "dream", "cupcake", "webos", "sgh", "gradi", "jb", "dddi", "moto",
                "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
                "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
                "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
                "phone", "cdm", "up.b", "audio", "sie-", "sec-",
                "mot-", "mitsu", "sagem", "alcatel", "lg", "eric", "vx",
                "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
                "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
                "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
                "s8000", "bada", "googlebot-mobile"
    ];
        var ua = navigator.userAgent.toLowerCase();
        var isMobile = false;
    for (var i = 0; i < mobiles.length; i++) {
        if (ua.indexOf(mobiles[i]) > 0) {
            isMobile = true;
            break;
        }
    }
if(isMobile){
	$(".asus_youtube").click(function(){
	var windowObjectReference;
	var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
  	windowObjectReference = window.open("http://www.youtube.com/watch?v="+$(this).data('youtubeid'), 	"CNN_WindowName", 	strWindowFeatures);
	});
}else{
        $('.asus_youtube').on('click', open);
        $(window).on('hashchange',function(){ 
            if (location.hash.slice(1) == ''){ 
            $('.a_videos').html('');
            $('.a_videos').hide();
            $('.a_videos').remove();
            }
            else if (!$('.a_videos')[0]) { $('.asus_youtube[data-youtubeid='+location.hash.slice(1)+']').eq(0).click(); }
        });
    }
    
}

    
    
    
    // sbs function
    function aua_sbs(){
        var html = '<div class="modal hide in" aria-hidden="false" style="display: block;overflow: hidden;">';
           html += '<a href="#" class="close" style="position: absolute;top: 9px;right: 15px;"><img src="/media/images/g_close.png" alt=""></a>';
           html += '<div class="totu-logo" style="position: absolute;top: 20px;left: 20px;"></div>';
           html += '<iframe src="#" frameborder="0" allowfullscreen="" width="100%" height="100%" scrolling="no"></iframe>';
           html += '</div>';
           

           
        var open = function(){
            var id = $(this).data('stepbystep_id');
            var skin = $(this).data('stepbystep_skin');
            if ((!id)||(!skin)) { return true; }
            var add_dom = $(html);
            var src = '';
            if ($(window).width() >= 798) {
                src = 'https://www.asus.com/support/utilities/sbs/tutorial.htm?view=iframe&tid=' + id + '&skin='+ skin;
            }
            else {
                src = 'https://www.asus.com/support/utilities/sbs/mobile.htm?view=iframe&tid=' + id + '&skin='+ skin;
            }
            add_dom.find('iframe').attr('src',src);

            add_dom.find('.close').on('click',function(){ add_dom.remove(); return false;});
            $('body').append(add_dom);
            return false;
        }
        $('.asus_stepbystep').on('click', open);
        // <a href="" class="asus_stepbystep" data-stepbystep_id="114"  data-stepbystep_skin="6">TEST</a>
        
                // <a href="" class="asus_youtube" data-youtubeid="114"  >TEST</a>
    }
    

    function index_banner(){
        /* 2014/06/13 move to banner page
        var onlink = false;
        var banner = $('#index-top-banner a').eq(0).attr('onclick');
        $('#index-top-banner a').eq(0).attr('onclick','');
        $('#index-top-banner a').eq(0).css({'cursor':'default'}).on('click',function(){ 
            return onlink;
        });
        $('#index-top-banner .banner-area').html('<i style="cursor: pointer;display: block;height:100%;margin: 0 auto;max-width: 1180px;"></i>');
        $('#index-top-banner i').on("mouseenter",function(){ $('#index-top-banner a').eq(0).attr('onclick',banner); onlink = true;});
        $('#index-top-banner i').on("mouseleave",function(){ $('#index-top-banner a').eq(0).attr('onclick','');  onlink = false;});
        
        var onclick = '';
        
        onclick = $('#AdvancedSearchBanner a').eq(0).attr('onclick');
        $('#AdvancedSearchBanner a').eq(0).attr('onclick','');
        
        $('#AdvancedSearchBanner a').eq(0).css({'cursor':'default'}).on('click',function(){ 
            return onlink;
        });
        $('#AdvancedSearchBanner a').html('<i style="cursor: pointer;display: block;height:100%;margin: 0 auto;max-width: 1180px;"></i>');
        $('#AdvancedSearchBanner i').on("mouseenter",function(){ $('#AdvancedSearchBanner a').eq(0).attr('onclick',onclick); onlink = true;});
        $('#AdvancedSearchBanner i').on("mouseleave", function () { $('#AdvancedSearchBanner a').eq(0).attr('onclick', ''); onlink = false; });
        */
    }
    
    // overview top nav
    function overviewnav(){
        var show = function(){
            $('#overview-top-nav').toggleClass('open');
        };
        var start = function(){
            $("#overview-top-nav h1").on("click",show);
        };
        var status = false;
        var clear_all = function(){
            $("#overview-top-nav h1").off("click",show);
        };
        var run = function(){
            if (($(window).width() > 719)&&(status == true)) { clear_all(); status = false; }
            else if (($(window).width() <= 719)&&(status == false)) { start(); status = true; }
        };
        run();
        $(window).on('resize',run);
    }
    
    // overview top nav
    function Androidapp() {
        if (asus.cookie.get("passAndroid") || (in_page != 'Index')) { return false; }
        //if ((asus.script.get_local() != 'tw') || asus.cookie.get("passAndroid") || (in_page != 'Index')) { return false; }
        if (typeof (localStorage) == 'undefined') { return false; }
        var userAgent = navigator.userAgent;  
        var download = 'http://qr.asus.com/myasus/tw_official_site_to_google_play';
        var android = userAgent.indexOf("Android");
        var mobile = userAgent.indexOf("Mobile");
        if ((android >= 0)&&(mobile >= 0)){  
            var androidVersion = parseFloat(userAgent.slice(android+8));   
            if (androidVersion >= 4) {
                $.ajax({
                    datatype: 'xml',
                    url: "/websites/AppPromotion.xml",
                    type: 'GET',
                    cache: true,
                    success: function (xml) {
                        var obj_tip = $(xml).find("website_" + asus.script.get_local());
                        if ($("title", obj_tip).text() != "") {
                            var html = '<div id="Androidapp" class="clearfix">';
                            html += '<a class="Androidclose" href="#"><img src="/media/images/androidclose.png" alt=""></a>';
                            html += '<div class="clearfix">';
                            html += '<img class="myasus-logo" src="/media/images/myasusLogo.png" alt="myASUS">';
                            html += '<div class="app-cont">';

                            html += '<h4>' + $("title", obj_tip).text() + '</h4>';
                            html += '<h5>' + $("subject", obj_tip).text() + '</h5>';
                            html += '<div class="app-starts"><i class="s-unit all"></i><i class="s-unit all"></i><i class="s-unit all"></i><i class="s-unit all"></i><i class="s-unit half"></i></div>'
                            html += '<a href="' + $("download_url", obj_tip).text() + '">' + $("download", obj_tip).text() + '</a>'
                            html += '</div></div></div>';

                            $("body").prepend(html);
                            if (getStorage('asus-version') == 'desktop') {
                                $('#asus-api-header').css({ 'top': 'auto' });
                                $('#overview-top-nav').css({ 'top': ($('#asus-api-header').offset().top + 89) + 'px' });
                            }
                            $("#Androidapp .Androidclose").on('click', function () {
                                $("#Androidapp").remove();
                                asus.cookie.set("passAndroid", '1', 7200);
                                $('#overview-top-nav').css({ 'top': '' });
                                $('#asus-api-header').css({ 'top': '' });
                                return false;
                            });

                            $(window).on('resize', function () {
                                $("#Androidapp").width(((window.innerWidth > 0) ? window.innerWidth : screen.width) + 'px');
                            });
                            $(window).on('scroll', function () {
                                $("#Androidapp").css({ 'left': $(this).scrollLeft() + 'px' });
                            });
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });
            }  
        }  
    }
    
    

    function amc(){
        var keycode = '';
        var fn = function(e){
            keycode = e.which + keycode;
            keycode = keycode.substr(0,14);
            if (keycode == '67666583858365'){
                $(window).off("keydown",fn);
                var s = document.getElementsByTagName('script')[0]; 
                var a1 = document.createElement('script'); 
                a1.type = 'text/javascript'; 
                a1.async = true;
                a1.src = 'http://ajax.aspnetcdn.com/ajax/knockout/knockout-3.0.0.js';
                
                s.parentNode.insertBefore(a1, s);
                
                var a2 = document.createElement('script'); 
                a2.type = 'text/javascript'; 
                a2.async = true;
                a2.src = 'http://html2canvas.hertzen.com/build/html2canvas.js';
                $(a2).on('load',function(){
                    html2canvas($("body")[0], {
                        onrendered: function(canvas) {
                            var $div = $("body");
                            $div.empty();
                            $("<img />", { src: canvas.toDataURL("image/png") }).appendTo($div);
                        }
                    });
                });
                s.parentNode.insertBefore(a2, s);

            }
        }
        $(window).on("keydown",fn);
        
    }
    
    var asus_is_run = false;
    function init_run(fn) {
        if (asus_is_run == true) { return; }
        asus_is_run = true;
        asus_menu();
        apiheader();
        gallery_resize();
        aai_right_more();
        postlink();
        asus.RecentlyView.rehtml();
        phone_menu();
        phone_footer();
        MemberLogout();
        searchinput();
        menu_service();
        asus_youtube();
        aua_sbs();
        index_banner();
        overviewnav();
        amc();
        Androidapp();
    }
    

    /** Start */
    $(document).ready(function () {
        init_run('ready');
    });

})();