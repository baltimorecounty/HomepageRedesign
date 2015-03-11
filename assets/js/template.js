(function ($, Handlebars, TextResizer, Flickr) {
    $(document).ready(function () {
        var $flickFeedContainer = $('.county-photo-feed');

        //Load the flickr feed into the Baltimore County Now Section of the page
        //above the news
        var photoFeed = new Flickr({
            apiKey: "ee58ce6536e4b39a95ebdf000ae4adf3",
            nsid: "56007743@N08",
            searchTags: "bonefish", //comma seperated list
            template: "{{#each this}}<div class='county-photo-container col-md-3 col-sm-3 hidden-xs'><a href='https://www.flickr.com/photos/baltimorecounty/{{id}}/' title='View this photo on Baltimore County&apos;s Flickr Album'><img alt='{{title}}' class='county-photo-feed-item' src='http://farm{{farm}}.static.flickr.com/{{server}}/{{id}}_{{secret}}_q.jpg' alt='{{title}}' /></a></div>{{/each}}",
            $container: $flickFeedContainer
        });

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

    $(document).on('click', '.hamburger-btn', function(e) {
        e.preventDefault();

        $('.primary-nav, .secondary-nav').toggleClass('mobile-menu-visible');
    });

})(jQuery, Handlebars, TextResizer, Flickr);