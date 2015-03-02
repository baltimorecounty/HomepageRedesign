(function ($, Handlebars) {
    /*News Related Methods*/
    var createReadMoreLink = function ($newsItem, $link) {
        $newsItem.append($link.clone().html("Read More"));
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
    var flickrTemplate = "{{#each this}}<img alt='{{title}}' class='county-photo-feed-item' src='http://farm{{farm}}.static.flickr.com/{{server}}/{{id}}_{{secret}}_q.jpg' />{{/each}}",
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

    /*Text Resizer Methods*/
    var disableBtn = function ($btn) {
        $btn.attr('disabled', 'disabled');

        if ($btn.attr('id').indexOf("increase") > -1) {
            alert("Cannot increase text size.");
        }
        else {
            alert("Cannot decrease text size.");
        }
    },
    resizeText = function (multiplier, $btn) {
        var mainContent = document.getElementById('main-content'),
            currentFontSize = mainContent.style.fontSize,
            buttonName = $btn.attr('id');

        //Resizer is used for the first time or had been reset
        if (!currentFontSize) {
            mainContent.style.fontSize = parseFloat(1 + (multiplier * 0.2)) + "em";
        } else {
            var isMinFontSize = parseFloat(currentFontSize) === .7,
                isMaxFontSize = parseFloat(currentFontSize) >= 1.3;

            if (isMinFontSize && buttonName.indexOf("decrease") > -1 || isMaxFontSize && buttonName.indexOf("increase") > -1) {
                disableBtn($btn);
            }
            else {
                mainContent.style.fontSize = parseFloat(currentFontSize) + (multiplier * 0.2) + "em";
            }
        }

    },
    resetText = function () {
        var mainContent = document.getElementById('main-content');
        mainContent.style.fontSize = null;
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
    });


    /*Text Resizer Events*/
    $(document).on('click', '#increase-text:enabled', function (e) {
        e.preventDefault();
        $('#decrease-text').removeAttr("disabled");
        resizeText(.5, $(this));
    });

    $(document).on('click', '#decrease-text:enabled', function (e) {
        e.preventDefault();
        $('#increase-text').removeAttr("disabled");
        resizeText(-.5, $(this));
    });

    $(document).on('click', '#reset-text', function (e) {
        e.preventDefault();
        $('#increase-text, #decrease-text').removeAttr('disabled');
        resetText();
    });

})(jQuery, Handlebars);