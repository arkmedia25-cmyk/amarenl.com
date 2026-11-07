require(["jquery", "app", "forms", "bootstrap", "bootstrap-hover-dropdown", "extensions", "idletimeout"], function ($, app, forms, bootstrap, dropdownHover) {
    $(function () {
        if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
            $('body').on("mousewheel", function () {
                //// remove default behavior
                //event.preventDefault();

                ////scroll without smoothing
                //var wheelDelta = event.wheelDelta;
                //var currentScrollPosition = window.pageYOffset;
                //window.scrollTo(0, currentScrollPosition - wheelDelta);
            });
        }

        $('body').on('click', function (e) {
            $('[data-toggle="popover"]').each(function () {
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false;
                }
            });
        });

        // Bind accordions to manage an active class
        $(document).on({
            'show.bs.collapse': function (event) {
                $(event.target).parents('.panel').addClass('active');
            },
            'hide.bs.collapse': function (event) {
                $(event.target).parents('.panel').removeClass('active');
            }
        });

        setTimeout((function () {
            // Auto-create popovers for all links configured to be popovers
            $(document).popover({
                selector: 'a[data-toggle="popover"]',
                html: true,
                placement: 'top'
            });

            // Make Bootstrap dropdowns hoverable
            $('.dropdown-toggle').dropdownHover(
                {
                    delay: 250,
                    instantlyCloseOthers: true,
                    hoverDelay: 0
                });
        }), 500);

        // Restrict appropriate field inputs by key
        forms.restrictInput('[data-restrict-input]');
    });

    var kioskmode = false;
    try {
        var display = getCookie("kioskmode");
        if (display == "1") {
            if (app.authenticated) {
                kioskmode = true;
            }
            else {
                var sPath = window.location.pathname.toLowerCase();
                var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
                if (sPage == 'register') {
                    kioskmode = true;
                }
            }
        }
    }
    catch (e) { }

    // Start an application timeout feature
    if (app.authenticated || kioskmode) {
        $(function () {

            // Ensure that we have everything wrapped up for the smudging
            //if ($('#__idlemask').length == 0) {
            //    $('body').wrapInner('<div id="__idlemask"></div>');
            //}

            // Inject the modal
            var modalHtml = [
                '<div class="modal" id="idletimeoutmodal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="idletimeoutmodalLabel" aria-hidden="true">',
                '<div class="modal-dialog">',
                '<div class="modal-content">',
                '<div class="modal-header">',
                '<h4 class="modal-title" id="idletimeoutmodalLabel">Are you still there?</h4>',
                '</div>',
                '<div class="modal-body">',
                '<p>We notice you\'ve been idle for a while. To keep your account safe, we will sign you out in <span id="idletimeoutcountdown" style="font-weight:bold"></span> seconds.</p>',
                '<p>Do you want to continue your session?</p>',
                '</div>',
                '<div class="modal-footer">',
                '<button type="button" class="btn btn-primary m-b-sm">Yes, keep working</button>',
                '<button type="button" class="btn btn-primary" style="margin-bottom: 10px!important;" data-dismiss="modal" onclick="$.idleTimeout.options.onTimeout.call(this);">No, sign out</button>',
                '</div>',
                '</div>',
                '</div>',
                '</div>'].join('');
            $('body').append(modalHtml);

            var pollingInterval = 59;
            var idleAfter = (app.sessiontimeout - 3) * 60;
            var warningLength = 60;
            var timeoutPath = "/corporate/en-us/account/logout";

            if (kioskmode) {
                pollingInterval = 5;
                idleAfter = 30;
                warningLength = 10;
                if (app.authenticated) {
                    timeoutPath = "/corporate/en-us/account/kiosklogout";
                }
                else {
                    timeoutPath = "/corporate/en-us/";
                }
            }

            // Start the idle timer
            $.idleTimeout('#idletimeoutmodal', '#idletimeoutmodal .modal-footer button:first', {
                keepAliveURL: app.path("app/keepalive"),
                serverResponseEquals: "OK",
                pollingInterval: pollingInterval,
                idleAfter: idleAfter,
                warningLength: warningLength,
                onTimeout: function () {
                    window.location = app.path(timeoutPath);
                },
                onIdle: function () {
                    $(this).modal("show");
                    $('.container-fluid').addClass('smudged');
                },
                onResume: function () {
                    $(this).modal("hide");
                    $('.container-fluid').removeClass('smudged');
                },
                onCountdown: function (counter) {
                    $("#idletimeoutcountdown").html(counter); // update the counter
                }
            });
        });
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
});