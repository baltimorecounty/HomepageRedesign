var Flickr = (function(window, undefined, $, Handlebars) {
	$.support.cors = true;
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
				$.getJSON(buildUrl(), function (data, status) {
		            showFlickrFeed(data.query.results.photo);
		        }).done(function(){}).fail(function(jqXHR, textStatus, errorThrown) {
		        	//If there is an failure getting the images, hide the container.
		        	//_this.$container.hide(); //Need to hide heading as well
		        });
			},
			init = function() {
				return getData();
			},
			showFlickrFeed = function (data) {

		        var htmlTemplate = Handlebars.compile(_this.template),
		            html = htmlTemplate(data);

		        _this.$container.html(html);
		    };

		    init();

	};
    return Flickr;
})(window, undefined, jQuery, Handlebars);