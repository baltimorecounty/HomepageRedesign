(function ($, TextResizer, Flickr) {
    $(document).ready(function () {
        /*Initialize the Text Resizer*/
        var textResizer = new TextResizer({
            listClass: "resizer-list"
        });
    });

    $(document).on('click', '.hamburger-btn', function(e) {
        e.preventDefault();

        $('.primary-nav, .secondary-nav').toggleClass('mobile-menu-visible');
    });

})(jQuery, TextResizer, Flickr);