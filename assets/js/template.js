(function ($) {
    var showNewsSummary = function () {
        var $newsItems = $('.item');

        $newsItems.each(function ($item) {
            var $newsItem = $(this),
                $newsItemDesc = $newsItem.find('.description').find('seml');

            $('p:not(:nth-child(2))', $newsItemDesc).hide();

        });
    };


    $(document).ready(function() {
    	//Hide the neccessary items to show the news summary
    	//Used because Site Executive does not offer this feature
	    showNewsSummary();

	    //Initialize the Slick Carousel for County Promotions
	    $('.carousel').slick({
	        dots: true
	    });
    });
    
})(jQuery);