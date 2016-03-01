// if (CQ.WCM != undefined) {

var SUPPORT_TOOLS = {
    nodeContext: "",
    currentPage: "",
    buildMainList: function (data, itemtype) {
        var retHTML = "";
        for (var propt in data) {
            if (propt.substring(0,4) != "jcr:" && propt.substring(0,4) != "rep:") {
                if (data[propt]["jcr:content"]["sling:resourceType"] == "zig/components/page/support/entry") {
                    var entrytitle = data[propt]["jcr:content"]["jcr:title"];
                    var subtext = data[propt]["jcr:content"]["subtext"];
                    if (subtext == undefined) { subtext = ""; }
                    var id = data[propt]["jcr:content"]["jcr:uuid"];
                    retHTML += "\n<article class=\"" + itemtype + " support_topic_" + id + "\">\n";
                    retHTML += "<h2>" + entrytitle + "</h2>\n";
                    retHTML += subtext;
                    // insert sub topic here
                    for (var subpropt in data[propt]) {
                        if (subpropt.substring(0,4) != "jcr:") {
                            if (data[propt][subpropt]["jcr:content"]["sling:resourceType"] == "zig/components/page/support/entry") {
                                var subentrytitle = data[propt][subpropt]["jcr:content"]["jcr:title"];
                                var subentrytext = data[propt][subpropt]["jcr:content"]["subtext"];
                                if (subentrytext == undefined) { subentrytext = ""; }
                                retHTML += "<a class=\"topic_fold\">" +
                                    "<span class=\"nub\"></span>" +
                                    "<h2>" + subentrytitle + "</h2></a>" +
                                    " <section class=\"sub_topic\" style=\"display:none\">" + subentrytext;
                                // insert tertiary topic here
                                for (var tertiarypropt in data[propt][subpropt]) {
                                    if (tertiarypropt.substring(0,4) != "jcr:") {
                                        if (data[propt][subpropt][tertiarypropt]["jcr:content"]["sling:resourceType"] == "zig/components/page/support/entry") {
                                            var tertiaryentrytitle = data[propt][subpropt][tertiarypropt]["jcr:content"]["jcr:title"];
                                            var tertiaryentrytext = data[propt][subpropt][tertiarypropt]["jcr:content"]["subtext"];
                                            if (tertiaryentrytext == undefined) { tertiaryentrytext = ""; }
                                            retHTML += "<a class=\"topic_fold\">" +
                                                "<span class=\"nub\"></span>" +
                                                "<h2>" + tertiaryentrytitle + "</h2></a>" +
                                                "<section class=\"tertiary_topic\" style=\"display:none\">" +
                                                tertiaryentrytext + "</section>";
                                        }
                                    }
                                }
                                retHTML += "</section>";
                            }
                        }
                    }
                    retHTML += "\n</article>\n";
                }
            }
        }
        return retHTML;
    },

    buildSideNavList: function (data, itemtype, pagepath) {
        var retHTML = "";
        for (var propt in data) {
            if (propt.substring(0,4) != "jcr:" && propt.substring(0,4) != "rep:") {
                if (data[propt]["jcr:content"]["sling:resourceType"] == "zig/components/page/support/entry") {
                    var entrytitle = data[propt]["jcr:content"]["jcr:title"];
                    entrytitle = entrytitle.replace('| Cricket','');
                    var subtext = data[propt]["jcr:content"]["subtext"];
                    var id = data[propt]["jcr:content"]["jcr:uuid"];
                    if (isEmployeeOdd && SUPPORT_TOOLS.currentPage == (pagepath + "/" + propt)) {
                        retHTML += "<li class=\"odd selected\">";
                        isEmployeeOdd = false;
                    } else if (isEmployeeOdd) {
                        retHTML += "<li class=\"odd\">";
                        isEmployeeOdd = false;
                    } else if (SUPPORT_TOOLS.currentPage == (pagepath + "/" + propt)) {
                        retHTML += "<li class=\"even selected\">";
                        isEmployeeOdd = true;
                    } else {
                        retHTML += "<li class=\"even\">";
                        isEmployeeOdd = true;
                    }
                    var link = pagepath + "/" + propt + ".html";
                    link = link.replace('/content/aio/en/','/');
                    retHTML += '<a data-scroll-to=".support_topic_' + id + '" href="' + link + '">' +
                        entrytitle + "</a> </li>";
                }
            }
        }
        return retHTML;
    },


    initCategoryPage: function (employeeArticleList, customerArticleList, employeeArticles, customerArticles) {
        jQuery("#category-summary-list").html(employeeArticleList + customerArticleList);
        SUPPORT_TOOLS.initPage(employeeArticleList, customerArticleList, employeeArticles, customerArticles);
    },

    initDetailsPage: function (employeeArticleList, customerArticleList, employeeArticles, customerArticles) {
        if (CQ.WCM != undefined) {
            jQuery(".support_sub_nav .customer_info").show();
            jQuery(".support_sub_nav .employee_info").show();
        }
        if (customerArticles.length > 0) {
            jQuery("#customer-category-list").html(customerArticles);
            jQuery(".support_sub_nav .customer_info").show();
        } else {
            if (CQ.WCM == undefined) { 
                jQuery(".support_sub_nav .customer_info").hide();
            }
        }
        if (employeeArticles.length > 0) {
            jQuery("#employee-category-list").html(employeeArticles);
            jQuery(".employee_info_bkgd").height($(".employee_info_bkgd").parent().height() + 20);
            jQuery(".support_sub_nav .employee_info").show();
            jQuery("#section-title-h1").show();
        } else {
            if (CQ.WCM == undefined) { 
                jQuery(".support_sub_nav .employee_info").hide();
                jQuery("#section-title-h1").hide();
                jQuery(".customer_info h3").hide();
            }  
        }
    },

    initPage: function (employeeArticleList, customerArticleList, employeeArticles, customerArticles) {
        if (customerArticles.length > 0) {
            jQuery("#customer-category-list").html(customerArticles);
        } else {
            if (CQ.WCM == undefined) { 
                jQuery(".support_sub_nav .customer_info").hide();
            }
        }
        if (employeeArticles.length > 0) {
            jQuery("#employee-category-list").html(employeeArticles);
            jQuery(".employee_info_bkgd").height($(".employee_info_bkgd").parent().height() + 20);
        } else {
            if (CQ.WCM == undefined) { 
                jQuery(".support_sub_nav .employee_info").hide();
            }  
        }

        $('a.topic_fold').on('click', function() {
            var me = this;

            $(this).next().slideToggle(null, function() {

              if ($(me).find('span.nub').hasClass('expanded')) {
                $(me).find('span.nub').removeClass('expanded');
              } else {
                $(me).find('span.nub').addClass('expanded');
              }

            });

          });

          if ($(".support_sub_nav")[0]){
            var $sidebar   = $(".support_sub_nav"),
              $window    = $(window),
              offset     = $sidebar.offset(),
              topPadding = 100;
            $window.scroll(function() {
              if ($window.scrollTop() > offset.top) {
                  $sidebar.stop().animate({
                      marginTop: $window.scrollTop() - offset.top + topPadding
                  });
              } else {
                  $sidebar.stop().animate({
                      marginTop: 0
                  });
              }
            });
          }
    },

    recursiveStrategy: function (pagelist, employeeArticleList, customerArticleList, employeeArticles, customerArticles, isCategory) {
        if (pagelist.length > 0) {
            var userlevel = pagelist.shift();
            var pagetype = userlevel;
            if (userlevel.toLowerCase() == "customer") {
                jQuery.get(SUPPORT_TOOLS.nodeContext + pagetype + ".infinity.json", function(data) {
                    if (data instanceof Object) {
                        var itemtype = "customer_topic";
                        customerArticles += SUPPORT_TOOLS.buildSideNavList(data, itemtype, SUPPORT_TOOLS.nodeContext + pagetype);
                        if (isCategory) {
                            customerArticleList += SUPPORT_TOOLS.buildMainList(data, itemtype);
                        }
                    }

                    SUPPORT_TOOLS.recursiveStrategy(pagelist, employeeArticleList, customerArticleList, employeeArticles, customerArticles, isCategory);  
                    if(document.getElementById("support_base")) {                
                        document.getElementById("support_base").style.height=$('.support_sub_nav').height() + "px";
                    }
                    init_support_article_view();
                }).fail(function() {
                    SUPPORT_TOOLS.recursiveStrategy(pagelist, employeeArticleList, customerArticleList, employeeArticles, customerArticles, isCategory);
                });;
            } else {
                jQuery.get(SUPPORT_TOOLS.nodeContext + userlevel + ".infinity.json", function(data) {
                    if (data instanceof Object) {
                        var itemtype = "employee_topic";
                        employeeArticles += SUPPORT_TOOLS.buildSideNavList(data, itemtype, SUPPORT_TOOLS.nodeContext + pagetype);
                        if (isCategory) {
                            employeeArticleList += SUPPORT_TOOLS.buildMainList(data, itemtype);
                        }
                    }
                    SUPPORT_TOOLS.recursiveStrategy(pagelist, employeeArticleList, customerArticleList, employeeArticles, customerArticles, isCategory);
                    if(document.getElementById("support_base")) { 
                        document.getElementById("support_base").style.height=$('.support_sub_nav').height() + "px";
                    }
                    init_support_article_view();
                }).fail(function() {
                    SUPPORT_TOOLS.recursiveStrategy(pagelist, employeeArticleList, customerArticleList, employeeArticles, customerArticles), isCategory;
                });
            }
        } else if (isCategory) {
            SUPPORT_TOOLS.initCategoryPage(employeeArticleList, customerArticleList, employeeArticles, customerArticles);
        } else {
            SUPPORT_TOOLS.initDetailsPage(employeeArticleList, customerArticleList, employeeArticles, customerArticles);
        }
    }
}
jQuery(function($) {
    var form = $('#password-change-form');
    $(form).submit(function(evt) {
        var password = form.find('#change-password'),
            passwordConfirm = form.find('#change-password-confirm'),
            oldpassword = form.find('#old-password'),
            errorContainer = $('.error_container'),
            errors = [];

        // Reset everything
        errorContainer.empty();
        password.add(passwordConfirm).removeClass('error');

        if (password.val() == '') {
            errors.push({ sel: '#change-password', msg: 'You must enter a new password.' });
        }
        
        if (passwordConfirm.val() == '') {
            errors.push({ sel: '#change-password-confirm', msg: 'You must confirm your password.' });
        }

        if (password.val() != passwordConfirm.val()) {
            errors.push({ sel: '#change-password, #change-password-confirm', msg: 'The passwords don\'t seem to match.' });
        }

        console.log(errors);

        if (errors.length) {
            // Display errors
            var i;
            for (i = 0; i < errors.length; i++) {
                error = errors[i];

                if (error.sel == '') {
                    continue;
                }

                var errorElem = $('<div></div>', {
                        'class': 'flash error',
                        html : error.msg
                    })
                    .prepend($('<div></div>', {
                        'class': 'icon',
                        html: '!'
                    }))
                    .appendTo(errorContainer);

                $(error.sel).addClass('error');
                console.log(error.msg);
            }
            return false;
        } else {
            // TODO implement json for actually changing password
            var passwordObj = { 'password': password.val() };
            var oldpasswordObj = { 'old-password': oldpassword.val() };
            
            jQuery.post('/bin/aio/chpw', {'old-password': oldpassword.val(), 'password': password.val()}, function (data) {
                if (data["status"] == "success") {
                    document.location.href = GLOBAL_REDIRECT_PATH;
                } else {
                    console.log(data);
                    alert("Could not change password. Please review the error and try again.\n"+ data["message"]);
                }
            }, "json");
            return false;
        }
    });
});
