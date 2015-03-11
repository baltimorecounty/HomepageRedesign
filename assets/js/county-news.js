(function($) {
	 /*News Related Methods*/
    var createReadMoreLink = function ($newsItem, $link) {
        $newsItem.append($link.clone().html("Read More >>"));
    },
    getDisplayDate = function (date) {
        var Months = {
            "Jan": "January",
                "Feb": "February",
                "Mar": "March",
                "Apr": "April",
                "May": "May",
                "Jun": "June",
                "Jul": "July",
                "Aug": "August",
                "Sep": "September",
                "Oct": "October",
                "Nov": "November",
                "Dec": "December"
        },
        dateParts = date.split(" "),
            month = Months[dateParts[2]],
            day = dateParts[1];

        return month + " " + day;
    },
    setDisplayDate = function ($newsItem, date) {
        $('.title', $newsItem).after("<span class='pub-date'>" + date + "</span>");
    },
    showNewsSummary = function ($newsItemDesc) {
        $('p:not(:eq(1))', $newsItemDesc).hide();
    },
    showNewsSummaries = function () {
        var $newsItems = $('.item');

        $newsItems.each(function ($item) {
            var $newsItem = $(this),
                $newsItemDesc = $newsItem.find('.description'),
                $linkToEntry = $newsItem.find("h3").find("a"),
                pubDate = getDisplayDate($('.pubDate', $newsItem).text());


            //Create a read more linked based on the Blog Title's Anchor Href
            createReadMoreLink($newsItem, $linkToEntry);

            //Include the published date after the news title
            setDisplayDate($newsItem, pubDate);

            //Remove the body of the blog entry, only show the Summary
            showNewsSummary($newsItemDesc);

        });
    };

    //Hide the neccessary items to show the news summary
    //Used because Site Executive does not offer this feature
    showNewsSummaries();
})(jQuery);