try{

	/*Get top 3 product images displayed in results*/
	var product_img_url = "";
	var prod_img_count = 3;
	
	function dtmGetImgSrc(obj){
		var src = $(obj).find("img").attr("src"); 
		
		if(src != undefined && (src.indexOf("/images/products/") != -1 || src.indexOf("/is/image/EB/") != -1)){
			product_img_url += src + "|"; 
		}
		
		if(product_img_url == ""){
			var src = $(obj).attr("src");
			
			if(src != undefined && (src.indexOf("/images/products/") != -1 || src.indexOf("/is/image/EB/") != -1)){
				product_img_url += src + "|"; 
			}	
		}
			
	}
	
	if($(".accordionContent img").length > 0){
		
		$(".accordionContent").each(function(index){
			if(index < prod_img_count){
				$(this).find("img").each(function(){
					var src = $(this).attr("src"); 
					if(src.indexOf("/images/products/") != -1){
						product_img_url += src + "|"; 
					}
				});	
			}
			else{return;}	
		});
	}
	else{
		
		var img_selectors_array = ["#endeca_search_results li",".product_cell","[class*='outlet_col']","[class*='product_slot']",".accordionContent img",
								"[class*='product_slots']","[class*='products_slot']","[class*='top_sellers_slot']",".product_list_col li",
								".cat_product_slots","#hot_products li","#products .product",".item",
								"[class*='sellers_slots']",".home_prod_slots",".supercat_prod_slots","[class*='prod_slots']",
								".home_new li"];
		var img_selector = "";
		
		for(var i=0;i<img_selectors_array.length;i++){
			if($(img_selectors_array[i]).length > 0){
				img_selector = img_selectors_array[i];
				break;
			}
		}
		
		$(img_selector).each(function(index){     
			if(index < prod_img_count){
				dtmGetImgSrc($(this));		
			}
			else{return;}
		});
	}
	
	/*Get Breadcrum*/ 
	var breadcrum = "";
	if($(".breadcrumbs .goto").length > 0){          /*get breadcrum from endeca search*/
			
		$(".breadcrumbs .goto").each(function(){
			breadcrum += $.trim($(this).html()) + ":"; 
		});
	}
	else if($(".breadCrumb a").length > 0){
		var bc = $(".breadCrumb").text();
		breadcrum = bc.replace(/\s|\n/g,"");
	}
	
	dtm_img_url = (product_img_url != "")?product_img_url:dtm_img_url;
	dtm_cg = (breadcrum != "")?breadcrum:dtm_cg;
}
catch(err){}

var dtmSrc = window.location.protocol + "//login.dotomi.com/ucm/UCMController?dtm_com=28&dtm_fid=101&dtm_cid=2223&dtm_cmagic=04048a&dtm_format=5";
var dtmTag = new Array();
/* custom fields SUBSTITUTE DYNAMIC VALUES ONLY IN THIS BLOCK */
dtmTag.cli_promo_id = $.trim(dtm_promo_id);
dtmTag.dtm_user_id = $.trim(dtm_customer_id);
dtmTag.dtmc_department = $.trim(dtm_department);
dtmTag.dtmc_category = $.trim(dtm_category);
dtmTag.dtmc_sub_category = $.trim(dtm_sub_category);
dtmTag.dtmc_brand = $.trim(dtm_brand);
dtmTag.dtmc_gender = $.trim(dtm_gender);
dtmTag.dtmc_team = $.trim(dtm_team);
dtmTag.dtmc_product_id = $.trim(dtm_sku);
dtmTag.dtmc_prod_img = $.trim(dtm_img_url);
dtmTag.dtmc_loc = $.trim(dtm_loc);
dtmTag.dtmc_cg = $.trim(dtm_cg);
dtmTag.dtmc_source = "";
dtmTag.dtmc_matchback_id = $.trim(dtm_matchback_id);
dtmTag.dtmc_video_id = $.trim(dtm_video_id);
dtmTag.dtmc_video_name = $.trim(dtm_video_name);
dtmTag.dtmc_article_id = $.trim(dtm_article_id);
dtmTag.dtmc_article_name = $.trim(dtm_article_name);
dtmTag.dtmc_platform  = $.trim(dtm_platform);
/* custom fields end */

dtmTag.dtm_user_token = "";
dtmTag.dtmc_ref = document.referrer;
dtmTag.dtmc_loc = document.location.href;

function readCookieDotomi() {
    var name = "dtm_token";
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while(c.charAt(0) == ' ')
	    c = c.substring(1, c.length);
	    if(c.indexOf(nameEQ) == 0) {
		    var d = c.substring(nameEQ.length, c.length);
		    dtmTag.dtm_user_token = d;
			
	    }
    }
}

readCookieDotomi();

for (var item in dtmTag){
	if(typeof dtmTag[item] != "function" && typeof dtmTag[item] != "object")
		dtmSrc += "&" + item + "=" + escape(dtmTag[item]);
}   
setTimeout('timeOutDotomi()',4000);
//document.write('<div id="dtmdiv" style="display:none;"><iframe name="response_frame" src="' + dtmSrc + '"></iframe></div>');

$("#dtmdiv").remove();
$("body").prepend('<div id="dtmdiv" style="display:none;"><iframe id="response_frame" src="' + dtmSrc + '"></iframe></div>');
function timeOutDotomi() { document.getElementById("dtmdiv").innerHTML = "";}
