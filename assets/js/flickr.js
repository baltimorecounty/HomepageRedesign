var Flickr = (function(window, undefined, $, Handlebars) {
	var Flickr = function(options) {
		this.apiKey = options.apiKey || console.error("You need to specify an api key.");
		this.nsid = options.nsid || console.error("You need to specify an user NSID."); //56007743@N08, http://idgettr.com/
		this.searchTags = options.searchTags || "";
		this.template = options.template || console.error("You need to specify a template to display the data.");
		this.$container = options.$container || $('.flickr-feed');
		this.numberOfImages = options.numberOfImages || 4;

		var _this = this,
			buildUrl = function() {
				return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20api_key%3D%22" + _this.apiKey + "%22%20and%20user_id%20%3D%22" + _this.nsid + "%22%20and%20tags%3D%22" + _this.searchTags + "%22%20limit%204&format=json&diagnostics=true&callback=";
			},
			getData = function() {
				$.getJSON(buildUrl(), function (data) {
		            showFlickrFeed(data.query.results.photo);
		        });
			},
			init = function() {
				return getData();
			},
			showFlickrFeed = function (data) {

		        var htmlTemplate = Handlebars.compile(_this.template),
		            html = htmlTemplate(data);

		            console.log(html);

		        //Append the generated html to the container
		        //_this.$container.html(html);

		        console.log(_this.$container.html())

		        _this.$container.html("fart");

		        _this.$container.html(html);
		    };

		    init();

	};

	/*Flick Photo Feeed*/
    // var apiKey = "ee58ce6536e4b39a95ebdf000ae4adf3",
    //     photoSetId = "72157649564338091", 
    //     flickrTemplate = "{{#each this}}<div class='county-photo-container col-md-3 col-sm-3 hidden-xs'><a href='https://www.flickr.com/photos/baltimorecounty/{{id}}/in/set-" + photoSetId + "' title='View this photo on Baltimore County&apos;s Flickr Album'><img alt='{{title}}' class='county-photo-feed-item' src='http://farm{{farm}}.static.flickr.com/{{server}}/{{id}}_{{secret}}_q.jpg' alt='{{title}}' /></a></div>{{/each}}",
    //     flickrUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photosets.search%20where%20api_key%3D%22" + apiKey + "%22%20and%20tags%3D%22" + this.searchTags + "%22%20limit%204&format=json&diagnostics=true&callback=";

    // var loadFlickrFeed = function (url, $container) {
    //     $.getJSON(flickrUrl, function (data) {
    //         showFlickrFeed(data.query.results.photo, $container);
    //     });
    // },
    // showFlickrFeed = function (data, $container) {
    //     var htmlTemplate = Handlebars.compile(flickrTemplate),
    //         html = htmlTemplate(data);
    //         console.log(html);

    //     //Append the generated html to the container
    //     $container.html(html);
    // };

    return Flickr;
})(window, undefined, jQuery, Handlebars);