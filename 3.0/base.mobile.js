var baseMobileJS = {
    cdn: "https://dixeam.com/cdn",
    site_url: "",
    current_url: "",
    langCDN: "https://cdn.statically.io/gh/link2qaiser/basejs/master/3.0/lang/en.js",
    currentLocation: {},
    /*
    Some global methods
    */
    loadScript: function(url, callback) {
        jQuery.ajax({
            url: url,
            dataType: "script",
            success: callback,
            async: true,
        });
    },
    loadCSS: function(url, media, callback) {
        jQuery(document.createElement("link"))
            .attr({
                href: url,
                media: media || "screen",
                type: "text/css",
                rel: "stylesheet",
            })
            .appendTo("head")
            .on("load", callback);
    },

    UserAuth: {
        init: function() {
            $(document).on("submit", '[data-action="do-login"]', function(e) {
                e.preventDefault();
                var form = this;
                $.ajax({
                    type: "POST",
                    contentType: false,
                    cache: false,
                    processData: false,
                    dataType: "json",
                    url: $(form).attr("action"),
                    data: new FormData($(form)[0]),
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                    },
                    success: function(res) {
                        if (res.flag == true) {
                            baseMobileJS.Notification.showSucess(res.msg);
                            localStorage.setItem("isLogin", true);
                            localStorage.setItem("token", res.token);
                            localStorage.setItem("user", JSON.stringify(res.user));
                            window.location.href = $(form).attr("data-redirect");

                        } else {
                            baseMobileJS.Notification.showError(res.msg);
                        }
                    },
                });
            });
            $(document).on("click", '[data-action="do-logout"]', function(e) {
                e.preventDefault();
                localStorage.removeItem("isLogin");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = $(this).attr("data-redirect");

            });
        }
    },
    Notification: {
        continer: ".notif-container",
        init: function(param) {
            $("body").append('<div class="notif-container"><div class="notif"><div class="left"><i class="fas fa-check"></i></div><div class="right"><strong>Completed!</strong><div class="msg">Unable to login here</div></div><button>close</button></div></div>');
            $(document).on("click", baseMobileJS.Notification.continer + ' button', function(e) {
                $(baseMobileJS.Notification.continer).hide('fast');
            });

        },
        initMessage: function() {
            $(baseMobileJS.Notification.continer + " .notif").removeClass("success info warning error");
            $(baseMobileJS.Notification.continer).show();
            if ($(baseMobileJS.Notification.continer).is(":visible") == true) {
                setTimeout(function() {
                    $(baseMobileJS.Notification.continer).fadeOut('fast');
                }, 5000);
            }
        },
        showSucess: function(msg) {
            baseMobileJS.Notification.initMessage();
            $(baseMobileJS.Notification.continer + " .notif").addClass("success");
            $(baseMobileJS.Notification.continer + " strong").text("Completed!");
            $(baseMobileJS.Notification.continer + " .msg").html(msg);
        },
        showInfo: function(msg) {
            baseMobileJS.Notification.initMessage();
            $(baseMobileJS.Notification.continer + " .notif").addClass("info");
            $(baseMobileJS.Notification.continer + " strong").text("Notice!");
            $(baseMobileJS.Notification.continer + " .msg").html(msg);
        },
        showWarning: function(msg) {
            baseMobileJS.Notification.initMessage();
            $(baseMobileJS.Notification.continer + " .notif").addClass("warning");
            $(baseMobileJS.Notification.continer + " strong").text("Warning!");
            $(baseMobileJS.Notification.continer + " .msg").html(msg);
        },
        showError: function(msg) {
            baseMobileJS.Notification.initMessage();
            $(baseMobileJS.Notification.continer + " .notif").addClass("error");
            $(baseMobileJS.Notification.continer + " strong").text("Oops!");
            $(baseMobileJS.Notification.continer + " .msg").html(msg);
        },
    },
    UserLocation: {
        update(myCallback) {
            var successHandler = function(position) { 
                myCallback(position.coords); 
            };
            var errorHandler = function (errorObj) { 
               myCallback(false);
            }; 
            navigator.geolocation.getCurrentPosition(successHandler, errorHandler,{enableHighAccuracy: true, maximumAge: 10000});
            // const successCallback = (position) => {
            //     myCallback(position.coords);
            // };
            // const errorCallback = (error) => {
            //     myCallback(false);
            //     //baseMobileJS.UserLocation.error = true;
            // };
            // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        }
    },
    init(param) {
        /*
        Initailize the global variables
        */
        baseMobileJS.site_url = param.site_url;
        baseMobileJS.current_url = param.current_url;
        baseMobileJS.csrf_token = $('meta[name="csrf-token"]').attr("content");
        /*
        Default Initailize
        */
        baseMobileJS.Notification.init();
        baseMobileJS.UserAuth.init();

        
        baseMobileJS.loadScript(baseMobileJS.langCDN, function() {
            baseMobileJS.lang = param.lang;
        });
    }

};