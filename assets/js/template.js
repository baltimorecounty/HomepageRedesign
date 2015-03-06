(function ($, Handlebars, TextResizer) {
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
        $('p:not(:nth-child(2))', $newsItemDesc).hide();
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

    /*Flick Photo Feeed*/
    var flickrTemplate = "{{#each this}}<div class='county-photo-container col-md-3 col-sm-3 hidden-xs'><img alt='{{title}}' class='county-photo-feed-item' src='http://farm{{farm}}.static.flickr.com/{{server}}/{{id}}_{{secret}}_q.jpg' /></div>{{/each}}",
        flickrUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photosets.photos%20where%20api_key%3D%22ee58ce6536e4b39a95ebdf000ae4adf3%22%20and%20photoset_id%3D%2272157649564338091%22%20limit%204&format=json&diagnostics=true&callback=";

    var loadFlickrFeed = function (url, $container) {
        $.getJSON(flickrUrl, function (data) {
            showFlickrFeed(data.query.results.photo, $container);
        });
    },
    showFlickrFeed = function (data, $container) {
        var htmlTemplate = Handlebars.compile(flickrTemplate),
            html = htmlTemplate(data);

        //Append the generated html to the container
        $container.html(html);
    };


    $(document).ready(function () {
        var $flickFeedContainer = $('.county-photo-feed');

        //Hide the neccessary items to show the news summary
        //Used because Site Executive does not offer this feature
        showNewsSummaries();

        //Load the flickr feed into the Baltimore County Now Section of the page
        //above the news
        loadFlickrFeed(flickrUrl, $flickFeedContainer);

        //Initialize the Slick Carousel for County Promotions
        $('.promotions').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            /*Show dot navigation*/
            nextArrow: "<img src='assets/img/carousel-arrow-right.png' class='slick-next' />",
            /*Starts on slide 4*/
            prevArrow: "<img src='assets/img/carousel-arrow-left.png'class='slick-prev' />"
        });

        /*Initialize teh Text Resizer*/
        var textResizer = new TextResizer({
            listClass: "resizer-list"
        });
    });

})(jQuery, Handlebars, TextResizer);