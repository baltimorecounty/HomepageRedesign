var ShowNews = (function($) {
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
    getExcerpt = function($newsItemDesc) {
        return $('p:eq(1)', $newsItemDesc);
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

            //Ensure that the exceprt text is not too long
            //For now we are limiting it to 50 words
            var $excerpt = getExcerpt($newsItemDesc);
            trimExceprtText($excerpt, 50);

            //Remove the body of the blog entry, only show the Summary
            showNewsSummary($newsItemDesc);
            
        });
    },
    trimExceprtText = function($excerpt, limit) {
        var text = $excerpt.text(),
            words = text.split(' '),
            newText = words.length < limit ? text : words.splice(0, limit).join(" ") + "...";

        $excerpt.text(newText);
    };
    //Hide the neccessary items to show the news summary
    //Used because Site Executive does not offer this feature
    $(document).ready(function() {

        $('.news-feed').find('.item').eq(2).css("clear", "both"); //Hack, adds cleafix to syndication module

       showNewsSummaries(); 
   });
    
})(jQuery);