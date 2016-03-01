
function constructBffURL(url, info) {
    var month = "";
    try {
        var extradays = "21";
        var dateRange = info.match(/purchased by [0-9]{1,}\/[0-9]{1,}\/[0-9]{1,}/g);
        if (dateRange != null && dateRange.length > 0)
            month = dateRange[0].substr(13, dateRange[0].length - 13);

        var montharr = month.split('/');
        var d = new Date();
        var century = d.getFullYear().toString().substring(0, 2);
        d.setMonth(montharr[0] - 1);
        d.setDate(montharr[1]);

        if (montharr[2].length == 4)
            montharr[2] = montharr[2].replace(century, "");

        d.setFullYear(century + "" + montharr[2]);

        d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * extradays);
        month = parseInt(d.getMonth() + 1) + "/" + d.getDate() + "/" + montharr[2];
    }
    catch (e) { };

    url = url.replace("https://book.jetblue.com/B6/webqtrip.html", "/BestFareFinder/");
    if (month != "" && month.split('/').length == 3)
        url += "&departure=" + month;
    return url;
}