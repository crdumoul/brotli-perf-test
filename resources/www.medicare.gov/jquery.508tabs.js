/*
* Dual licensed under the MIT and GPL licenses (same as jQuery): http://www.opensource.org/licenses/mit-license.php http://www.gnu.org/licenses/gpl.html
*/

//Generic 508 Compliant Method for creating a Jquery tab structure
//The GenerateTabs function options are:
//numberoftabs: Sets the number of tabs to generate
//tabHeadings: Sets the default tab headings they should match number of tabs
//tabDivIDs: Sets the ID's of the divs containg the tab content if FIFO order.
//cssClass: Sets the default tab class.
//anchorable: Determines if tabs should be anchored or not.
//collapsible: Determines if tabs should collapse or not.
//sortable: Determines if should drag and drop sort.
//selected: Sets the default tab.

(function ($) {
    $.fn.GenerateTabs = function (options) {

        //Default Jquery tab settings
        var defaultTabSettings = {
            numberoftabs: 1,
            tabHeadings: "",
            tabDivIDs: "",
            cssClass: "DefaultTabClass",
            anchorable: true,
            collapsible: false,
            sortable: false,
            selected: 0
        }


        var extendedOptions = $.extend({}, defaultTabSettings, options);

        var ul = jQuery('<ul/>', { id: "tabs-ul" });
        var contentDiv = "";
        for (var i = 0; i < extendedOptions["numberoftabs"]; i++) {
            //Using Corner js because the CSS3 attribute for rounding corners does not work in legacy browsers.
            var li = jQuery('<li/>', { id: "tab" + i });

            ul.append(li);
            if (i === extendedOptions["selected"]) {
                //To start the default tab should say selected
                //Need anchor links in Hrefs to ensure keyboard navigation and proper focus shift upon selection.
                li.append(jQuery('<a/>', { href: "#contentTab" + (i + 1) }).html(extendedOptions["tabHeadings"].split(',')[i]));
                li.children("a:eq(0)").append("<span class='HiddenText 508State'>- Tab selected</span>");

                //IE7 quirk with setting css class for an element, the word class is a reserved word in IE so put it in qoutes and don't use the attribute.
                contentDiv = jQuery('<div/>', { id: "contentTab" + (i + 1), "class": extendedOptions["cssClass"] }).html("<a name =" + "contentTab" + (i + 1) + "></a>" + "<p class='HiddenText 508SelectedMsg'>You have selected " + extendedOptions["tabHeadings"].split(',')[i] + ".</p>");
                var DefaultTab = $("#" + extendedOptions["tabDivIDs"].split(',')[i]).html();
                contentDiv.append(DefaultTab);
            }
            else {
                //All other tabs should be hidden with display "none" until selected, in order to hide the content from the screen reader.
                li.append(jQuery('<a/>', { href: "#contentTab" + (i + 1) }).html(extendedOptions["tabHeadings"].split(',')[i]));
                contentDiv = jQuery('<div/>', { id: "contentTab" + (i + 1), style: "display:none;", "class": extendedOptions["cssClass"] }).html("<a name =" + "contentTab" + (i + 1) + "></a><p class='HiddenText 508SelectedMsg'></p>");
                li.children("a:eq(0)").append("<span class='HiddenText 508State'>- Tab</span>");
                var DefaultTabs = $("#" + extendedOptions["tabDivIDs"].split(',')[i]).html();
                contentDiv.append(DefaultTabs);
            }
            this.append(contentDiv);
        }

        ul.prependTo(this)



        //Default Jquery Instantiation of Tabs
        this.tabs({
            collapsible: extendedOptions["collapsible"],
            sortable: extendedOptions["sortable"],
            select: function (event, ul) {
                var selectedIndex = ul.index;
                var stateMsg;
                var listItems = $(this).children("ul").eq(0).children("li");
                for (var k = 0; k < listItems.length; k++) {
                    stateMsg = listItems.eq(k).children("a:eq(0)").children("span.508State");
                    if (k === selectedIndex) {
                        stateMsg.html("- Tab selected");
                    }
                    else {
                        stateMsg.html("- Tab");
                    }
                }

                for (var j = 0; j < $(this).children("div").length; j++) {
                    if (j === selectedIndex) {
                        $(this).children("div").eq(j).css("display", "")
                            .find(".508SelectedMsg").first().html("You have selected " + extendedOptions["tabHeadings"].split(',')[j] + ".");

                        //If anchor set to true set anchor tag for better keyboard navigation.
                        if (extendedOptions["anchorable"]) {
                            var TabURL = document.location.href.split("#")[0];
                            window.location.href = TabURL + "#contentTab" + (j + 1);
                        }
                    }
                    else {
                        $(this).children("div").eq(j).css("display", "none")
                            .find(".508SelectedMsg").first().html("");
                    }
                }

            }
        });

    }
})(jQuery);