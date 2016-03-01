//:[[ 2011/02/16 Angel, define url for multi-language site
var url = "/SearchSuggestion.aspx";
if (window.location.hostname == "athena.asus.com") url = '/' + getWebsite() + '/SearchSuggestion.aspx';
if (isMultipleLanguageWebsite()) url = '/' + getShortLanguage(getWebsite()) + '/SearchSuggestion.aspx';
//:]]

$(document).ready(function() {
    $(function() {
        asus.banner({
            click_back: "banner_left_btn",
            click_next: "banner_right_btn",
            auto_click_hide: true,
            auto_next_time: 7500,
            move_time: 1000,
            move_div: "thumbnails_container",
            in_className: "active",
            keyboard: false,
            Mask: true,
            loop: true,
            click_end_className: "no_next",
            n: 1,
            ease: 'Expo.easeInOut',
            //time_bar : "sec-bar",
            cut: "sb-cut-nav"
        });

        asus.banner({
            click_back: "news_left_btn",
            click_next: "news_right_btn",
            auto_next_time: 0,
            move_time: 350,
            move_div: "news_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            add_padding: 30,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "vote_left_btn",
            click_next: "vote_right_btn",
            auto_next_time: 0,
            move_time: 350,
            move_div: "vote_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            add_padding: 50,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "spotlight_left_btn",
            click_next: "spotlight_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "spotlight_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            n: 6,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "business_spotlight_left_btn",
            click_next: "business_spotlight_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "business_spotlight_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            n: 1,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "successful_left_btn",
            click_next: "successful_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "business_successfulcase_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            n: 1,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "ad_success_left_btn",
            click_next: "ad_success_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "ad_business_successfulcase_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            n: 1,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "media_left_btn",
            click_next: "media_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "media_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            add_padding: 50,
            random: true,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "product_media_left_btn",
            click_next: "product_media_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "product_media_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            add_padding: 25,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "accessories_left_btn",
            click_next: "accessories_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "product_accessory_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            add_padding: 0,
            ease: 'Expo.easeInOut'
        });

        asus.banner({
            click_back: "similar_left_btn",
            click_next: "similar_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "product_similar_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            add_padding: 0,
            ease: 'Expo.easeInOut'
        });
        /*
asus.banner({
    click_back: "video_left_btn",
    click_next: "video_right_btn",
    auto_next_time: 0,
    move_time: 500,
    move_div: "video_area",
    in_className: "active",
    keyboard: false,
    loop: false,
    click_end_className: "no_next",
    add_padding: 25,
    ease: 'Expo.easeInOut'
});
*/

        asus.banner({
            click_back: "wheretobuy_left_btn",
            click_next: "wheretobuy_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "where_to_buy_banner_area",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            add_padding: 25,
            ease: 'Expo.easeInOut'
        });
        asus.banner({
            click_back: "sc_left_btn",
            click_next: "sc_right_btn",
            auto_next_time: 0,
            move_time: 500,
            move_div: "sef-group",
            in_className: "active",
            keyboard: false,
            loop: false,
            click_end_className: "no_next",
            add_padding: 25,
            ease: 'Expo.easeInOut'
        });
        asus.autoComplete({
            search: url,
            method: "get",
            input: "searchinput",
            delag: "100",
            className: "selectbox",
            keywordclass: "keyword",
            selectclass: "select",
            autoposition: false,
            min_length: 2,
            click: function() {
                if (this.split('$')[0] == "1")
                    window.location.href = this.replace("1$", "");
                else
                    window.location.href = "product.aspx?P_ID=" + this.replace("0$", "");
            }
        });
asus.banner({
    click_back: "hp_left_btn",
    click_next: "hp_right_btn",
    auto_next_time: 0,
    move_time: 500,
    move_div: "hp-group",
    in_className: "active",
    keyboard: false,
    loop: false,
    click_end_className: "no_next",
    add_padding: 25,
    ease: 'Expo.easeInOut',
    resize : function(count){
    	        var size = $(window).width();
        if ((size <= 1300) && (size >= 940)){
            var ul_li_count = $('#hp-group ul:eq(0) li').length;
            if (ul_li_count == 3){ return count; }
       
            var li_html = Array();
            var lis = $('#hp-group li');
            for (var i = 0; i<lis.length ; i++){
                li_html[i] = lis.eq(i)[0].outerHTML;
            }
            $('#hp-group').html('');
            count = 0;
            var html = '';
            for (var i = 0; i<li_html.length ; i++){
                if (i%3 == 0){
                    html += '<ul class="silder-unit hps-unit">';
                    count++;
                }
                html += li_html[i];
                if (i%3 == 2){
                    html += '</ul>';
                }
            }
            if (i%3 != 2){
                html += '</ul>';
            }
            $('#hp-group').html(html);
            $('#hp-group').addClass('hp-box-3');
            
        }
        else {
            var ul_li_count = $('#hp-group ul:eq(0) li').length;
            if (ul_li_count == 4){ return count; }
            
            var li_html = Array();
            var lis = $('#hp-group li');
            for (var i = 0; i<lis.length ; i++){
                li_html[i] = lis.eq(i)[0].outerHTML;
            }
            $('#hp-group').html('');
            count = 0;
            var html = '';
            for (var i = 0; i<li_html.length ; i++){
                if (i%4 == 0){
                    html += '<ul class="silder-unit hps-unit">';
                    count++;
                }
                html += li_html[i];
                if (i%4 == 3){
                    html += '</ul>';
                }
            }
            if (i%4 != 3){
                html += '</ul>';
            }
            $('#hp-group').html(html);
            $('#hp-group').removeClass('hp-box-3');
        }
        return count;
    }
});
        /*
asus.imageZoom({
    tag : "left-story",
    zoom : 1.2 ,
    addclass : 'big_img'
});
*/
        asus.BTranslation({
            block: "test_all",
            width: 767,
            main_eq: 1,
            click_button: "button",
            move_time: 350
        });

        /*
asus.imageZoom({
    tag: "product-gallery-area",
    zoom: 1.05,
    addclass: 'big_img'
});
*/

        /*
asus.scroll({
    block: "vote_panel",
    scroll_css: { "position": "absolute", "right": "22px", "top": "80px",  "background": "#909090", "border-radius": "3px", "width": "7px", "height":"200px" },
    scroll_bar_css: { "background": "#F3F3F3", "cursor": "pointer", "border-radius": "2px", "width": "5px", "border": "1px solid #909090", "margin": "50px 0" },
    auto_hide: true,
    height: 200
});
*/
    });
});