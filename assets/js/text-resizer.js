var TextResizer = (function (window, undefined, $) {
    var TextResizer = function (options) {
        this.listClass = options.listClass || "text-resizer";
        this.normalBtnId = options.normalBtnId || "normal-text";
        this.largeBtnId = options.largeBtnId || "large-text";
        this.largestBtnId = options.largestBtnId || "largest-text";
        this.mainContainerId = options.mainContainerId || "main-content";


        var largeTextClass = 'large-text',
            largestTextClass = 'largest-text',
            $mainContainer = $("#" + this.mainContainerId),
            existsLocalStorage = typeof (Storage) !== "undefined";

        var getPreference = function () {
            return existsLocalStorage && localStorage.getItem("size");
        },
        initialize = function () {
            var preference = getPreference();
            if (preference) {
                $mainContainer.addClass(preference);
            }
        },
        removePreference = function () {
            localStorage.removeItem("size");
        },
        savePreference = function (size) {
            if (existsLocalStorage) {
                localStorage.setItem("size", size);
            }
        };

        /*Text Resizer Events*/
        $(document).on('click', '#' + this.normalBtnId, function (e) {
            e.preventDefault();
            
            $mainContainer.removeClass(largeTextClass + " " + largestTextClass);
            
            removePreference();
        });

        $(document).on('click', '#' + this.largeBtnId, function (e) {
            e.preventDefault();

            $mainContainer.removeClass(largestTextClass)
                .addClass(largeTextClass);

            savePreference(largeTextClass);
        });

        $(document).on('click', '#' + this.largestBtnId, function (e) {
            e.preventDefault();

            $mainContainer.removeClass(largeTextClass)
                .addClass(largestTextClass);

            savePreference(largestTextClass);
        });


        initialize();

    };

    return TextResizer;
})(window, undefined, jQuery);