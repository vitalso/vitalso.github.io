(function ($) {
    "use strict";

    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

    function navbarFixed() {
        if ($(".header_area").length) {
            $(window).scroll(function () {
                var scroll = $(window).scrollTop();
                if (scroll) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        }
    }
    navbarFixed();

    function offcanvasActivator() {
        if ($(".bar_menu").length) {
            $(".bar_menu").on("click", function () {
                $("#menu").toggleClass("show-menu");
            });
            $(".close_icon").on("click", function () {
                $("#menu").removeClass("show-menu");
            });
        }
    }
    offcanvasActivator();

    $(".offcanfas_menu .dropdown").on("show.bs.dropdown", function (e) {
        $(this).find(".dropdown-menu").first().stop(true, true).slideDown(400);
    });
    $(".offcanfas_menu .dropdown").on("hide.bs.dropdown", function (e) {
        $(this).find(".dropdown-menu").first().stop(true, true).slideUp(500);
    });

    /*-------------------------------------------------------------------------------
	  mCustomScrollbar js
	-------------------------------------------------------------------------------*/
    $(window).on("load", function () {
        if ($(".mega_menu_two .scroll").length) {
            $(".mega_menu_two .scroll").mCustomScrollbar({
                mouseWheelPixels: 50,
                scrollInertia: 0,
            });
        }
    });

    /*-------------------------------------------------------------------------------
	  WOW js
	-------------------------------------------------------------------------------*/
    function wowAnimation() {
        new WOW({
            offset: 100,
            animateClass: "animated",
            mobile: true,
        }).init();
    }
    wowAnimation();

    /* Partner logo slider */
    function partnerSlider() {
        var reviews_slider2 = $(".partner_logo");
        if (reviews_slider2.length) {
            reviews_slider2.owlCarousel({
                loop: true,
                margin: 0,
                items: 5,
                nav: true,
                dots: false,
                autoplay: false,
                smartSpeed: 1000,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 4,
                        nav: false,
                    },
                    992: {
                        items: 5,
                        nav: true,
                    },
                },
                //navContainer: ".partner_logo_nav",
                //navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>']
            });
        }
    }
    partnerSlider();
    /* Partner logo slider */

    /*-------------------------------------------------------------------------------
	  service_carousel js
	-------------------------------------------------------------------------------*/
    function serviceSlider() {
        var service_slider = $(".service_carousel");
        if (service_slider.length) {
            service_slider.owlCarousel({
                loop: true,
                margin: 15,
                items: 4,
                autoplay: true,
                smartSpeed: 2000,
                responsiveClass: true,
                nav: true,
                dots: false,
                stagePadding: 100,
                navText: [, '<i class="ti-arrow-left"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 0,
                    },
                    578: {
                        items: 2,
                        stagePadding: 0,
                    },
                    992: {
                        items: 3,
                        stagePadding: 0,
                    },
                    1200: {
                        items: 3,
                    },
                },
            });
        }
    }
    serviceSlider();

    /*-------------------------------------------------------------------------------
	  about_img_slider js
	-------------------------------------------------------------------------------*/
    function aboutSlider() {
        var reviews_slider2 = $(".about_img_slider");
        if (reviews_slider2.length) {
            reviews_slider2.owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                nav: false,
                autoplay: false,
                smartSpeed: 2000,
                responsiveClass: true,
            });
        }
    }
    aboutSlider();

    /*-------------------------------------------------------------------------------
	  pos_slider js
	-------------------------------------------------------------------------------*/
    function posSlider() {
        var posS = $(".pos_slider");
        if (posS.length) {
            posS.owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: false,
                nav: false,
                autoplay: true,
                slideSpeed: 300,
                mouseDrag: false,
                animateIn: "fadeIn",
                animateOut: "fadeOut",
                responsiveClass: true,
            });
        }
    }
    posSlider();

    /*-------------------------------------------------------------------------------
	  feedback_slider js
	-------------------------------------------------------------------------------*/
    function feedbackSlider() {
        var feedback_slider = $(".feedback_slider");
        if (feedback_slider.length) {
            feedback_slider.owlCarousel({
                loop: true,
                margin: 25,
                items: 3,
                nav: false,
                center: true,
                autoplay: false,
                smartSpeed: 2000,
                stagePadding: 0,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    776: {
                        items: 2,
                        stagePadding: 0,
                    },
                    1199: {
                        items: 3,
                        stagePadding: 0,
                    },
                },
            });
        }
    }
    feedbackSlider();

    function EventSlider() {
        var event_slider = $(".event_team_slider");
        if (event_slider.length) {
            event_slider.owlCarousel({
                loop: true,
                margin: 25,
                items: 3,
                nav: false,
                autoplay: false,
                smartSpeed: 2000,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                    1199: {
                        items: 3,
                    },
                },
            });
        }
    }
    EventSlider();

    /*-------------------------------------------------------------------------------
	  feedback_slider two js
	-------------------------------------------------------------------------------*/
    function feedbackSlider_two() {
        var feedback_sliders = $("#fslider_two");
        if (feedback_sliders.length) {
            feedback_sliders.owlCarousel({
                loop: true,
                margin: 0,
                items: 2,
                nav: true,
                autoplay: false,
                smartSpeed: 2000,
                stagePadding: 0,
                responsiveClass: true,
                navText: [
          '<i class="ti-angle-left"></i><i class="ti-angle-right"></i>',
        ],
                responsive: {
                    0: {
                        items: 1,
                    },
                    776: {
                        items: 2,
                    },
                    1199: {
                        items: 2,
                    },
                },
            });
        }
    }
    feedbackSlider_two();

    /*-------------------------------------------------------------------------------
	  fslider_three js
	-------------------------------------------------------------------------------*/
    function feedbackSlider_three() {
        var feedback_sliders_three = $("#fslider_three");
        if (feedback_sliders_three.length) {
            feedback_sliders_three.owlCarousel({
                loop: true,
                margin: 0,
                items: 2,
                nav: true,
                center: true,
                autoplay: false,
                smartSpeed: 2000,
                stagePadding: 0,
                responsiveClass: true,
                navText: [
          '<i class="ti-angle-left"></i>',
          '<i class="ti-angle-right"></i>',
        ],
                responsive: {
                    0: {
                        items: 1,
                    },
                    776: {
                        items: 2,
                    },
                    1199: {
                        items: 3,
                    },
                },
            });
        }
    }
    feedbackSlider_three();

    /*-------------------------------------------------------------------------------
	  erp_testimonial_info js
	-------------------------------------------------------------------------------*/
    function erpTestimonial() {
        var erpT = $(".erp_testimonial_info");
        if (erpT.length) {
            erpT.owlCarousel({
                loop: true,
                margin: 0,
                items: 2,
                nav: true,
                dots: false,
                autoplay: false,
                smartSpeed: 2000,
                stagePadding: 0,
                responsiveClass: true,
                navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                    },
                    776: {
                        items: 2,
                    },
                    1199: {
                        items: 2,
                    },
                },
            });
        }
    }
    erpTestimonial();

    /*-------------------------------------------------------------------------------
	  testimonial_slider js
	-------------------------------------------------------------------------------*/
    function testimonialSlider() {
        var testimonialSlider = $(".testimonial_slider");
        if (testimonialSlider.length) {
            testimonialSlider.owlCarousel({
                loop: true,
                margin: 10,
                items: 1,
                autoplay: false,
                smartSpeed: 500,
                autoplaySpeed: false,
                responsiveClass: true,
                nav: true,
                dots: false,
                stagePadding: 0,
                navContainer: ".agency_testimonial_info",
                navText: [
          '<i class="ti-arrow-left"></i>',
          '<i class="ti-arrow-right"></i>',
        ],
            });
        }
    }
    testimonialSlider();

    /*-------------------------------------------------------------------------------
	  app_testimonial_slider js
	-------------------------------------------------------------------------------*/
    function app_testimonialSlider() {
        var app_testimonialSlider = $(".app_testimonial_slider");
        if (app_testimonialSlider.length) {
            app_testimonialSlider.owlCarousel({
                loop: true,
                margin: 10,
                items: 1,
                autoplay: true,
                smartSpeed: 2000,
                autoplaySpeed: true,
                responsiveClass: true,
                nav: true,
                dot: true,
                navText: [
          '<i class="ti-arrow-left"></i>',
          '<i class="ti-arrow-right"></i>',
        ],
                navContainer: ".nav_container",
            });
        }
    }
    app_testimonialSlider();

    /*-------------------------------------------------------------------------------
	  app_screenshot_slider js
	-------------------------------------------------------------------------------*/
    function appScreenshot() {
        var app_screenshotSlider = $(".app_screenshot_slider");
        if (app_screenshotSlider.length) {
            app_screenshotSlider.owlCarousel({
                loop: true,
                margin: 10,
                items: 5,
                autoplay: false,
                smartSpeed: 2000,
                responsiveClass: true,
                nav: true,
                dots: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    650: {
                        items: 2,
                    },
                    776: {
                        items: 4,
                    },
                    1199: {
                        items: 5,
                    },
                },
            });
        }
    }
    appScreenshot();

    /*-------------------------------------------------------------------------------
	  pr_slider js
	-------------------------------------------------------------------------------*/
    function prslider() {
        var p_Slider = $(".pr_slider");
        if (p_Slider.length) {
            p_Slider.owlCarousel({
                loop: true,
                margin: 10,
                items: 1,
                autoplay: true,
                smartSpeed: 1000,
                responsiveClass: true,
                nav: true,
                dots: false,
                navText: [
          '<i class="ti-angle-left"></i>',
          '<i class="ti-angle-right"></i>',
        ],
                navContainer: ".pr_slider",
            });
        }
    }
    prslider();

    /*-------------------------------------------------------------------------------
	  app_testimonial_slider js
	-------------------------------------------------------------------------------*/
    function tslider() {
        var tSlider = $(".testimonial_slider_four");
        if (tSlider.length) {
            tSlider.owlCarousel({
                loop: true,
                margin: 10,
                items: 1,
                autoplay: true,
                smartSpeed: 1000,
                responsiveClass: true,
                nav: true,
                dots: false,
                navText: [
          '<i class="ti-angle-left"></i>',
          '<i class="ti-angle-right"></i>',
        ],
                navContainer: ".testimonial_title",
            });
        }
    }
    tslider();

    /*-------------------------------------------------------------------------------
	  case_studies_slider js
	-------------------------------------------------------------------------------*/
    function caseStudies() {
        var CSlider = $(".case_studies_slider");
        if (CSlider.length) {
            CSlider.owlCarousel({
                loop: true,
                margin: 0,
                items: 3,
                autoplay: true,
                smartSpeed: 1000,
                responsiveClass: true,
                nav: false,
                dots: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    650: {
                        items: 2,
                    },
                    776: {
                        items: 3,
                    },
                    1199: {
                        items: 3,
                    },
                },
            });
        }
    }
    caseStudies();

    /*-------------------------------------------------------------------------------
	  app_testimonial_slider js
	-------------------------------------------------------------------------------*/
    function videoslider() {
        var dSlider = $(".digital_video_slider");
        if (dSlider.length) {
            dSlider.owlCarousel({
                loop: true,
                margin: 30,
                items: 1,
                center: true,
                autoplay: true,
                smartSpeed: 1000,
                stagePadding: 200,
                responsiveClass: true,
                nav: false,
                dots: false,
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 0,
                    },
                    575: {
                        items: 1,
                        stagePadding: 100,
                    },
                    768: {
                        items: 1,
                        stagePadding: 40,
                    },
                    992: {
                        items: 1,
                        stagePadding: 100,
                    },
                    1250: {
                        items: 1,
                        stagePadding: 200,
                    },
                },
            });
        }
    }
    videoslider();

    /*-------------------------------------------------------------------------------
	  Saasslider js
	-------------------------------------------------------------------------------*/
    function Saasslider() {
        var SSlider = $(".saas_banner_area_three");
        if (SSlider.length) {
            SSlider.owlCarousel({
                loop: true,
                margin: 30,
                items: 1,
                animateOut: "fadeOut",
                autoplay: true,
                smartSpeed: 1000,
                responsiveClass: true,
                nav: false,
                dots: true,
            });
        }
    }
    Saasslider();

    /*-------------------------------------------------------------------------------
	  price tab js
	-------------------------------------------------------------------------------*/
    function tab_hover() {
        var tab = $(".price_tab");
        if ($(window).width() > 450) {
            if ($(tab).length > 0) {
                tab.append('<li class="hover_bg"></li>');
                if ($(".price_tab li a").hasClass("active_hover")) {
                    var pLeft = $(".price_tab li a.active_hover").position().left,
                        pWidth = $(".price_tab li a.active_hover").css("width");
                    $(".hover_bg").css({
                        left: pLeft,
                        width: pWidth,
                    });
                }
                $(".price_tab li a").on("click", function () {
                    $(".price_tab li a").removeClass("active_hover");
                    $(this).addClass("active_hover");
                    var pLeft = $(".price_tab li a.active_hover").position().left,
                        pWidth = $(".price_tab li a.active_hover").css("width");
                    $(".hover_bg").css({
                        left: pLeft,
                        width: pWidth,
                    });
                });
            }
        }
    }
    tab_hover();

    /*-------------------------------------------------------------------------------
	  selectpickers js
	-------------------------------------------------------------------------------*/
    if ($(".selectpickers").length > 0) {
        $(".selectpickers").niceSelect();
    }

    /*-------------------------------------------------------------------------------
	  pr_slider js
	-------------------------------------------------------------------------------*/
    function pr_slider() {
        var pr_image = $(".pr_image");
        if (pr_image.length) {
            pr_image.owlCarousel({
                loop: true,
                items: 1,
                autoplay: true,
                dots: false,
                thumbs: true,
                thumbImage: true,
            });
        }
    }
    pr_slider();

    /*-------------------------------------------------------------------------------
	  cart js
	-------------------------------------------------------------------------------*/
    $(".ar_top").on("click", function () {
        var getID = $(this).next().attr("id");
        var result = document.getElementById(getID);
        var qty = result.value;
        $(".proceed_to_checkout .update-cart").removeAttr("disabled");
        if (!isNaN(qty)) {
            result.value++;
        } else {
            return false;
        }
    });

    $(".ar_down").on("click", function () {
        var getID = $(this).prev().attr("id");
        var result = document.getElementById(getID);
        var qty = result.value;
        $(".proceed_to_checkout .update-cart").removeAttr("disabled");
        if (!isNaN(qty) && qty > 0) {
            result.value--;
        } else {
            return false;
        }
    });

    /*-------------------------------------------------------------------------------
	  Portfolio isotope js
	-------------------------------------------------------------------------------*/
    function portfolioMasonry() {
        var portfolio = $("#work-portfolio");
        if (portfolio.length) {
            portfolio.imagesLoaded(function () {
                // images have loaded
                // Activate isotope in container
                portfolio.isotope({
                    // itemSelector: ".portfolio_item",
                    layoutMode: "masonry",
                    filter: "*",
                    animationOptions: {
                        duration: 1000,
                    },
                    transitionDuration: "0.5s",
                    masonry: {},
                });

                // Add isotope click function
                $("#portfolio_filter div").on("click", function () {
                    $("#portfolio_filter div").removeClass("active");
                    $(this).addClass("active");

                    var selector = $(this).attr("data-filter");
                    portfolio.isotope({
                        filter: selector,
                        animationOptions: {
                            animationDuration: 750,
                            easing: "linear",
                            queue: false,
                        },
                    });
                    return false;
                });
            });
        }
    }
    portfolioMasonry();

    /*-------------------------------------------------------------------------------
	  jobFilter js
	-------------------------------------------------------------------------------*/
    function jobFilter() {
        var jobsfilter = $("#tab_filter");
        if (jobsfilter.length) {
            jobsfilter.imagesLoaded(function () {
                // images have loaded
                // Activate isotope in container
                jobsfilter.isotope({
                    itemSelector: ".item",
                });

                // Add isotope click function
                $("#job_filter div").on("click", function () {
                    $("#job_filter div").removeClass("active");
                    $(this).addClass("active");

                    var selector = $(this).attr("data-filter");
                    jobsfilter.isotope({
                        filter: selector,
                        animationOptions: {
                            animationDuration: 750,
                            easing: "linear",
                            queue: false,
                        },
                    });
                    return false;
                });
            });
        }
    }
    jobFilter();

    /*---------gallery isotope js-----------*/
    function productMasonry() {
        if ($('#pr_gallery').length) {
            $('#pr_gallery').imagesLoaded(function () {
                // images have loaded
                // Activate isotope in container
                $("#pr_gallery").isotope({
                    filter: '.tops',
                    layoutMode: 'masonry',
                    animationOptions: {
                        duration: 750,
                        easing: 'linear'
                    }
                });

                // Add isotope click function
                $("#pr_filter div").on('click', function () {
                    $("#pr_filter div").removeClass("active");
                    $(this).addClass("active");

                    var selector = $(this).attr("data-filter");
                    $("#pr_gallery").isotope({
                        filter: selector,
                        animationOptions: {
                            animationDuration: 750,
                            easing: 'linear',
                            queue: false
                        }
                    })
                    return false;
                })
            })
        }
    }
    productMasonry();

    /*-------------------------------------------------------------------------------
	  blogMasonry js
	-------------------------------------------------------------------------------*/
    function blogMasonry() {
        var blog = $("#blog_masonry");
        if (blog.length) {
            blog.imagesLoaded(function () {
                blog.isotope({
                    layoutMode: "masonry",
                });
            });
        }
    }
    blogMasonry();

    function featuredMasonry() {
        var gallery = $(".featured_gallery");
        if (gallery.length) {
            gallery.imagesLoaded(function () {
                gallery.isotope({
                    layoutMode: "masonry",
                    masonry: {
                        columnWidth: 1
                    },
                    percentPosition: true,
                });
            });
        }
    }
    featuredMasonry();


    function homeMasonry() {
        var gallery = $("#home_pr_masonry");
        if (gallery.length) {
            gallery.imagesLoaded(function () {
                gallery.isotope({
                    layoutMode: "masonry",
                    originLeft: false,
                    masonry: {
                        columnWidth: '.grid-sizer'
                    },
                    percentPosition: true,
                });
            });
        }
    }
    homeMasonry();

    if ($(".height-emulator").length) {
        $(".height-emulator").css({
            height: $("footer").outerHeight(true)
        });
    }
    
//    if ($(".personal_description_area").length) {
//         var count = $('.personal_description_area').data("count");
//        $(".personal_description_area").css({
//            height: $(".text").height() * count
//        });
//    }


    /*-------------------------------------------------------------------------------
	  popup js
	-------------------------------------------------------------------------------*/
    function popupGallery() {
        if ($(".img_popup,.image-link").length) {
            $(".img_popup,.image-link").each(function () {
                $(".img_popup,.image-link").magnificPopup({
                    type: "image",
                    tLoading: "Loading image #%curr%...",
                    removalDelay: 300,
                    mainClass: "mfp-with-zoom mfp-img-mobile",
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1], // Will preload 0 - before current, and 1 after the current image,
                    },
                });
            });
        }
        if ($(".popup-youtube").length) {
            $(".popup-youtube").magnificPopup({
                disableOn: 700,
                type: "iframe",
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false,
                mainClass: "mfp-with-zoom mfp-img-mobile",
            });
//            $(".popup-youtube").magnificPopup({
//                disableOn: 700,
//                type: "iframe",
//                mainClass: "mfp-fade",
//                removalDelay: 160,
//                preloader: false,
//                fixedContentPos: false,
//            });
        }
    }
    popupGallery();

    /*-------------------------------------------------------------------------------
	  mapBox js
	-------------------------------------------------------------------------------*/
    if ($("#mapBox").length) {
        var $lat = $("#mapBox").data("lat");
        var $lon = $("#mapBox").data("lon");
        var $zoom = $("#mapBox").data("zoom");
        var $marker = $("#mapBox").data("marker");
        var $info = $("#mapBox").data("info");
        var $markerLat = $("#mapBox").data("mlat");
        var $markerLon = $("#mapBox").data("mlon");
        var map = new GMaps({
            el: "#mapBox",
            lat: $lat,
            lng: $lon,
            scrollwheel: false,
            scaleControl: true,
            streetViewControl: false,
            panControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            zoom: $zoom,
        });
        map.addMarker({
            lat: $markerLat,
            lng: $markerLon,
            icon: $marker,
            infoWindow: {
                content: $info,
            },
        });
    }

    /*-------------------------------------------------------------------------------
	  MAILCHIMP js
	-------------------------------------------------------------------------------*/
    if ($(".mailchimp").length > 0) {
        $(".mailchimp").ajaxChimp({
            callback: mailchimpCallback,
            url: "http://droitlab.us15.list-manage.com/subscribe/post?u=0fa954b1e090d4269d21abef5&id=a80b5aedb0", //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
        });
    }
    if ($(".mailchimp_two").length > 0) {
        $(".mailchimp_two").ajaxChimp({
            callback: mailchimpCallback,
            url: "https://droitthemes.us19.list-manage.com/subscribe/post?u=5d334217e146b083fe74171bf&amp;id=0e45662e8c", //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
        });
    }
    $(".memail").on("focus", function () {
        $(".mchimp-errmessage").fadeOut();
        $(".mchimp-sucmessage").fadeOut();
    });
    $(".memail").on("keydown", function () {
        $(".mchimp-errmessage").fadeOut();
        $(".mchimp-sucmessage").fadeOut();
    });
    $(".memail").on("click", function () {
        $(".memail").val("");
    });

    function mailchimpCallback(resp) {
        if (resp.result === "success") {
            $(".mchimp-errmessage").html(resp.msg).fadeIn(1000);
            $(".mchimp-sucmessage").fadeOut(500);
        } else if (resp.result === "error") {
            $(".mchimp-errmessage").html(resp.msg).fadeIn(1000);
        }
    }

    /*-------------------------------------------------------------------------------
	  Parallax Effect js
	-------------------------------------------------------------------------------*/
    function parallaxEffect() {
        if ($(".parallax-effect,#apps_craft_animation").length) {
            $(".parallax-effect,#apps_craft_animation").parallax();
        }
    }
    parallaxEffect();

    /*-------------------------------------------------------------------------------
	  Counter js
	-------------------------------------------------------------------------------*/
    function counterUp() {
        if ($(".counter").length) {
            $(".counter").counterUp({
                delay: 1,
                time: 500,
            });
        }
    }

    counterUp();

    /*-------------------------------------------------------------------------------
	  progress bar js
	-------------------------------------------------------------------------------*/
    function circle_progress() {
        if ($(".circle").length) {
            $(".circle").each(function () {
                $(".circle").appear(
                    function () {
                        $(".circle").circleProgress({
                            startAngle: -14.1,
                            size: 200,
                            duration: 9000,
                            easing: "circleProgressEase",
                            emptyFill: "#f1f1fa ",
                            lineCap: "round",
                            thickness: 10,
                        });
                    }, {
                        triggerOnce: true,
                        offset: "bottom-in-view",
                    }
                );
            });
        }
    }
    circle_progress();

    /*-------------------------------------------------------------------------------
	  progress bar js
	-------------------------------------------------------------------------------*/
    $(".progress-element").each(function () {
        $(this).waypoint(
            function () {
                var progressBar = $(".progress-bar");
                progressBar.each(function (indx) {
                    $(this).css("width", $(this).attr("aria-valuenow") + "%");
                });
            }, {
                triggerOnce: true,
                offset: "bottom-in-view",
            }
        );
    });

    /*-------------------------------------------------------------------------------
	  preloader js
	-------------------------------------------------------------------------------*/
    function loader() {
        $(window).on("load", function () {
            $("#ctn-preloader").addClass("loaded");
            // Una vez haya terminado el preloader aparezca el scroll

            if ($("#ctn-preloader").hasClass("loaded")) {
                // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
                $("#preloader")
                    .delay(900)
                    .queue(function () {
                        $(this).remove();
                    });
            }
        });
    }
    loader();

    /*-------------------------------------------------------------------------------
	  tooltip js
	-------------------------------------------------------------------------------*/
    if ($('[data-toggle="tooltip"]').length) {
        $('[data-toggle="tooltip"]').tooltip();
    }
    /*-------------------------------------------------------------------------------
	  Pricing Filter js
	-------------------------------------------------------------------------------*/
    if ($("#slider-range").length) {
        $("#slider-range").slider({
            range: true,
            min: 5,
            max: 150,
            values: [5, 100],
            slide: function (event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            },
        });
        $("#amount").val(
            "$" +
            $("#slider-range").slider("values", 0) +
            " - $" +
            $("#slider-range").slider("values", 1)
        );
    }

    /*-------------------------------------------------------------------------------
	  search js
	-------------------------------------------------------------------------------*/
    $(".search-btn").on("click", function () {
        $("body").addClass("open");
        setTimeout(function () {
            $(".search-input").focus();
        }, 500);
        return false;
    });
    $(".close_icon").on("click", function () {
        $("body").removeClass("open");
        return false;
    });

    /*-------------------------------------------------------------------------------
	  develor tab js
	-------------------------------------------------------------------------------*/
    if ($(".develor_tab li a").length > 0) {
        $(".develor_tab li a").click(function () {
            var tab_id = $(this).attr("data-tab");
            $(".tab_img").removeClass("active");
            $("#" + tab_id).addClass("active");
        });
    }

    /*-------------------------------------------------------------------------------
	  alert js
	-------------------------------------------------------------------------------*/
    $(".alert_close").on("click", function (e) {
        $(this).parent().hide();
    });

    /*-------------------------------------------------------------------------------
	  active dropdown
	-------------------------------------------------------------------------------*/
    function active_dropdown() {
        if ($(window).width() < 992) {
            $(".menu li.submenu > a").on("click", function (event) {
                event.preventDefault();
                $(this).parent().find("ul").first().toggle(700);
                $(this).parent().siblings().find("ul").hide(700);
            });
        }
    }
    active_dropdown();

    /*-------------------------------------------------------------------------------
	  hamberger menu
	-------------------------------------------------------------------------------*/
    function hamberger_menu() {
        if ($(".burger_menu").length) {
            $(".burger_menu").on("click", function () {
                $(this).toggleClass("open");
                $("body").removeClass("menu-is-closed").addClass("menu-is-opened");
            });
            $(".close, .click-capture").on("click", function () {
                $("body").removeClass("menu-is-opened").addClass("menu-is-closed");
            });
        }
    }
    hamberger_menu();

    /*-------------------------------------------------------------------------------
	  Full screen sections 
	-------------------------------------------------------------------------------*/
    if ($(".pagepiling").length > 0) {
        $(".pagepiling").pagepiling({
            scrollingSpeed: 280,
            loopBottom: true,
            // anchors: ['first', 'second', 'third', 'four','five'],
            // menu: '#menu',
            navigation: {
                position: "right_position",
            },
        });
        $.fn.pagepiling.setAllowScrolling(true);
    }

    function ppTestislider() {
        if ($(".pp_testimonial_slider").length > 0) {
            var PSlider = $(".pp_testimonial_slider");
            if (PSlider.length) {
                PSlider.slick({
                    autoplay: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000,
                    speed: 1000,
                    vertical: true,
                    dots: false,
                    arrows: true,
                    prevArrow: ".prev",
                    nextArrow: ".next",
                });
            }
        }
    }
    ppTestislider();


    function trendingSlider() {
        if ($(".trending_product_slider").length > 0) {
            var PSlider = $(".trending_product_slider");
            if (PSlider.length) {
                PSlider.slick({
                    autoplay: true,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '85px',
                    autoplaySpeed: 3000,
                    speed: 1000,
                    dots: false,
                    arrows: true,
                    prevArrow: ".prev",
                    nextArrow: ".next",
                    responsive: [
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 4,
                            },
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                        {
                            breakpoint: 650,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                            },
                        }
                    ],
                });
            }
        }
    }
    trendingSlider();


    var heading = $(".typed");
    if (heading.length) {
        heading.typed({
            strings: ["Startups", "Business", "Agencies"],
            // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
            stringsElement: null,
            typeSpeed: 100,
            startDelay: 500,
            backSpeed: 100,
            backDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: "|",
        });
    }

    if ($(".slick.marquee").length > 0) {
        $(".slick.marquee").slick({
            speed: 8000,
            autoplay: true,
            autoplaySpeed: 1000,
            centerMode: true,
            cssEase: "linear",
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
            initialSlide: 1,
            arrows: false,
            pauseOnHover: true,
            buttons: false,
        });
    }


    function slider() {
        if ($(".utility_slider").length > 0) {
            $(".utility_slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: "40px",
                arrows: false,
                dots: false,
                speed: 1000,
                autoplay: true,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 570,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerPadding: "0px",
                        },
                        },
                    ],
            });
        }
    }
    slider();


    function sliderTwo() {
        if ($(".shop_slider").length > 0) {
            $(".shop_slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
            });
        }
    }
    sliderTwo();

    function BlogSlider() {
        if ($(".blog_slider").length > 0) {
            $(".blog_slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrow: false,
                cssEase: "linear",
                rows: 0,
                fade: true,
                infinite: true,
                prevArrow: ".prev",
                nextArrow: ".next",
            });
        }
    }
    BlogSlider();

    function portfolioSlider() {
        if ($(".portfolio_slider").length > 0) {
            $(".portfolio_slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrow: true,
                centerMode: true,
                centerPadding: "450px",
                speed: 800,
                autoplay: true,
                infinite: true,
                prevArrow: ".prevs",
                nextArrow: ".nexts",
                responsive: [
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerPadding: "250px",
                        },
                    },
                    {
                        breakpoint: 1008,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerPadding: "150px",
                        },
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerPadding: "50px",
                        },
                    },
                ],
            });
        }
    }
    portfolioSlider();

    function portfolioSliderTwo() {
        if ($(".portfolio_slider_two").length > 0) {
            $(".portfolio_slider_two").slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
                arrow: false,
                centerMode: true,
                centerPadding: "200px",
                infinite: true,
                autoplay: true,
                autoplaySpeed: 1000,
                responsive: [
                    {
                        breakpoint: 1100,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            centerPadding: "100px",
                        },
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerPadding: "150px",
                        },
                    },
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            centerPadding: "0px",
                        },
                    },
                    {
                        breakpoint: 577,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerPadding: "0px",
                        },
                    },
                ],
            });
        }
    }
    portfolioSliderTwo();

    if ($("#testimonial_demo_slider").length > 0) {
        $("#testimonial_demo_slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrow: true,
            centerMode: true,
            centerPadding: "400px",
            speed: 1000,
            autoplay: true,
            infinite: true,
            lazyLoad: "ondemand",
            pauseOnHover: true,
            prevArrow: ".tprevs",
            nextArrow: ".tnexts",
            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: "400px",
                    },
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: "80px",
                    },
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: "0px",
                    },
                },
            ],
        });
    }

    /*---------------navbar js ---------------*/
    $("#landing_page ul li a,.scrolls,.menu_top").on("click", function (event) {
        var $anchor = $(this);
        $("html, body")
            .stop()
            .animate({
                    scrollTop: $($anchor.attr("href")).offset().top - 75,
                },
                1000,
                "easeInOutExpo"
            );
        event.preventDefault();
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $("#landing_page ul .nav-item:not(.dropdown) .nav-link").on(
        "click",
        function () {
            $(".navbar-collapse").collapse("hide");
        }
    );

    function fAqactive() {
        $(".faq_accordian_two .card").on("click", function () {
            $(".faq_accordian_two .card").removeClass("active");
            $(this).addClass("active");
        });
    }
    fAqactive();


    if ($(".gadget_features_slider").length > 0) {
        $(".gadget_features_slider").slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: false,
            centerMode: true,
            centerPadding: "300px",
            rows: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        centerPadding: "180px",
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        centerPadding: "60px",
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: "170px",
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: "70px",
                    },
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: false,
                        centerPadding: "15px",
                    },
                },
            ],
        });
    }

    $(".gadget_slider_area").on("init", function (e, slick) {
        var $firstAnimatingElements = $("div.slider_item:first-child").find(
            "[data-animation]"
        );
        doAnimations($firstAnimatingElements);
    });
    $(".gadget_slider_area").on("beforeChange", function (
        e,
        slick,
        currentSlide,
        nextSlide
    ) {
        var $animatingElements = $(
            'div.slider_item[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
    });
    if ($(".gadget_slider_area").length > 0) {
        $(".gadget_slider_area").slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            fade: true,
            rows: false,
            arrows: false,
        });
    }

    function doAnimations(elements) {
        var animationEndEvents =
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        elements.each(function () {
            var $this = $(this);
            var $animationDelay = $this.data("delay");
            var $animationType = "animated " + $this.data("animation");
            $this.css({
                "animation-delay": $animationDelay,
                "-webkit-animation-delay": $animationDelay,
            });
            $this.addClass($animationType).one(animationEndEvents, function () {
                $this.removeClass($animationType);
            });
        });
    }

    /*---------  SPLITTING TEXT -----------*/
    if ($(".gadget_slider_area").length) {
        Splitting();
    }

    /*---------  data background -----------*/
    if ($('[data-background]').length > 0) {
        $('[data-background]').each(function () {
            $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
        });
    }



    /*---------  grid -----------*/
    var $grid = $('.grid').imagesLoaded(function () {
        $grid.masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer'
        });
    });

    /*---------  testimonial_carousel -----------*/
    $('.agency_testimonial_carousel').owlCarousel({
        items: 1,
        margin: 30,
        nav: false,
        dots: true,
        loop: true,
        dotsData: true,
        autoplay: true,
        smartSpeed: 1000,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });

    if ($(".showcase_slider").length) {
        const sliders = $('.showcase_slider');
        sliders.on("init", function (e, slick) {
            var $firstAnimatingElements = $("div.slider:first-child").find(
                "[data-animation]"
            );
            doAnimations($firstAnimatingElements);
        });
        sliders.on("beforeChange", function (
            e,
            slick,
            currentSlide,
            nextSlide
        ) {
            var $animatingElements = $(
                'div.slider[data-slick-index="' + nextSlide + '"]'
            ).find("[data-animation]");
            doAnimations($animatingElements);
        });

        function onSliderAfterChange(event, slick, currentSlide) {
            $(event.target).data('current-slide', currentSlide);
        }

        function onSliderWheel(e) {
            var deltaY = e.originalEvent.deltaY,
                $currentSlider = $(e.currentTarget),
                currentSlickIndex = $currentSlider.data('current-slide') || 0;

            if (
                // check when you scroll up
                (deltaY < 0 && currentSlickIndex == 0) ||
                // check when you scroll down
                (deltaY > 0 && currentSlickIndex == $currentSlider.data('slider-length') - 1)
            ) {
                return;
            }

            e.preventDefault();

            if (e.originalEvent.deltaY < 0) {
                $currentSlider.slick('slickPrev');
            } else {
                $currentSlider.slick('slickNext');
            }
        }

        sliders.each(function (index, element) {
                var $element = $(element);
                $element.data('slider-length', $element.children().length);
            })
            .slick({
                infinite: false,
                slidesToShow: 1,
                vertical: true,
                verticalSwiping: true,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        verticalSwiping: false,
                        vertical: false,
                    },
                },
//                {
//                    breakpoint: 767,
//                    settings: {
//                        slidesToShow: 1,
//                        slidesToScroll: 1,
//                        centerPadding: "70px",
//                    },
//                },
//                {
//                    breakpoint: 576,
//                    settings: {
//                        slidesToShow: 1,
//                        slidesToScroll: 1,
//                        centerMode: false,
//                        centerPadding: "15px",
//                    },
//                },
            ],
            
            })
            .on('afterChange', onSliderAfterChange)
            .on('wheel', onSliderWheel);

        function doAnimations(elements) {
            var animationEndEvents =
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data("delay");
                var $animationType = "animated " + $this.data("animation");
                $this.css({
                    "animation-delay": $animationDelay,
                    "-webkit-animation-delay": $animationDelay,
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    }

    // Vitalso update
    $('.to-top').on('click' , function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 2000);

    });

    /* Tab features slider */
    function top_featureSlider() {
        var top_feature_slider = $(".first-feature-tab");
        if (top_feature_slider.length) {
            top_feature_slider.owlCarousel({
                loop: false,
                margin: 0,
                items: 6,
                nav: true,
                dots: false,
                autoplay: false,
                smartSpeed: 100,
                responsiveClass: true,
                mouseDrag: false,
                responsive: {
                    0: {
                        items: 2,
                    },
                    576: {
                        items: 3,
                    },
                    992: {
                        items: 4,
                    },
                    1200: {
                        items: 5,
                    },
                    1550: {
                        items: 6,
                    },
                },
                //navContainer: ".partner_logo_nav",
                //navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>']
            });
        }
    }
    top_featureSlider();
    /* Partner logo slider */

    function top_featureSlider2() {
        var top_feature_slider2 = $(".second-feature-tab");
        if (top_feature_slider2.length) {
            top_feature_slider2.owlCarousel({
                loop: false,
                margin: 0,
                items: 4,
                nav: true,
                dots: false,
                autoplay: false,
                smartSpeed: 100,
                responsiveClass: true,
                mouseDrag: false,
                responsive: {
                    0: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                },
                //navContainer: ".partner_logo_nav",
                //navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>']
            });
        }
    }
    top_featureSlider2();

    /* Signup review slider */
    function ReviewSlider() {
        var signup_review_slider = $(".review-slider");
        if (signup_review_slider.length) {
            signup_review_slider.owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                nav: false,
                dots: true,
                autoplay: false,
                smartSpeed: 100,
                responsiveClass: true,
                mouseDrag: false,
                //navContainer: ".partner_logo_nav",
                //navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>']
            });
        }
    }
    ReviewSlider();
    
    // About us review
    function AboutReviewSlider() {
        var about_review_slider = $(".review");
        if (about_review_slider.length) {
            about_review_slider.owlCarousel({
                loop: false,
                margin: 0,
                items: 3,
                nav: true,
                dots: false,
                autoplay: false,
                smartSpeed: 100,
                responsiveClass: true,
                mouseDrag: false,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 3,
                    },
                },
                navText: [
                '<i class="ti-arrow-left"></i>',
                '<i class="ti-arrow-right"></i>',
                ],
            });
        }
    }
    AboutReviewSlider();

    // Feature tab slider
    if ($('.feature-slider').length > 0) {
        $('.feature-slider').slick({
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 3000,
            speed: 1000,
            dots: false,
            arrows: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            fade: true,
            cssEase: 'linear',
        });
    }

    $(".top-feature-tab .nav-link").on("click" , function(){
        $(".top-feature-tab .nav-link").removeClass("active show");
        $(this).addClass("active show");

        $(".top-feature-content .tab-pane").removeClass("active show");
        $(".top-feature-content").find(".tab-pane[id=" + $(this).attr('href').replace('#', '') + "] ").addClass("active show");
    });

    // Price nav mobile
    $(".price-nav-mobile a").on("click" , function(e){
        e.preventDefault();

        $(".price-nav-mobile a").removeClass("active");
        $(this).addClass("active");
        
        $(".price_content .row").find(".col-12").addClass("d-none").removeClass("d-block");
        $(".price_content .row").find(".col-12[id="+ $(this).attr('href').replace('#', '') +"]").removeClass("d-none").addClass("d-block");

    });

    // FAQ
    $('.accordion-item').on('click' , function(){
        
        if ( $(this).is('.active') ) {
            $('.accordion-item').removeClass('active');
            $(this).removeClass('active');
        } else {
            $('.accordion-item').removeClass('active');
            $(this).addClass('active');
        }

    });

    // Demo page form
    $('.form-page li').on('click' , function(){
        $('.form-page li p').removeClass('active');
        
        if ( $(this).index() == 0 ) {
            $(this).find('p').addClass('active');
            $('.intro-form').find('.form-page-1').removeClass('d-none');
            $('.intro-form').find('.form-page-2').addClass('d-none');
        }

        if ( $(this).index() == 1 ) {
            $(this).find('p').addClass('active');
            $('.intro-form').find('.form-page-2').removeClass('d-none');
            $('.intro-form').find('.form-page-1').addClass('d-none');
        }

    });
    /*$('.form-demo button.bg-danger').on('click' , function(){

        $('.form-page-1').addClass('d-none');
        $('.form-page-2').removeClass('d-none');
        $('.form-demo button.bg-success').removeClass('d-none').addClass('d-block');
        $(this).addClass('d-none').removeClass('d-block');
        $('.form-demo button[type="submit"]').removeClass('d-none').addClass('d-block');

        $('.form-page li p').removeClass('active');
        $('.form-page li:last-child p').addClass('active');
    });

    $('.form-demo button.bg-success').on('click' , function(){
        $('.form-page-1').removeClass('d-none');
        $('.form-page-2').addClass('d-none');
        $(this).addClass('d-none').removeClass('d-block');
        $('.form-demo button.bg-danger').removeClass('d-none').addClass('d-block');
        $('.form-demo button[type="submit"]').addClass('d-none').removeClass('d-block');
    });*/

    // Slider on landing page
    if ($('.lp-slider').length > 0) {
        $('.lp-slider').slick({
            autoplay: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 3000,
            speed: 1000,
            dots: false,
            arrows: true,
            pauseOnFocus: false,
            pauseOnHover: false,
            prevArrow: '<button type="button" class="prev-arrow"><i class="ti-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="next-arrow"><i class="ti-arrow-right"></i></button>',
            responsive: {
                768: {
                    arrows: false
                }
            },
        });
    }

    // Start free trial form
    $('.form-free-trial input[type="email"] , .form-article-email input[type="email"]').on('keydown' , function(){
        if ( $(this).val().length >= 3 ) {
            $(this).closest('form').find('.legal-checkbox').removeClass('d-none');
        } else {
            $(this).closest('form').find('.legal-checkbox').addClass('d-none');
        }
    });

    $('.form-free-trial input[type="email"] , .form-article-email input[type="email"]').on('change' , function(){
        if ( $(this).val().length >= 3 ) {
            $(this).closest('form').find('.legal-checkbox').removeClass('d-none');
        } else {
            $(this).closest('form').find('.legal-checkbox').addClass('d-none');
        }
    });

    $('#form-free-trial').on('submit' , function(e) {
        e.preventDefault();

        var email = $(this).find('input[type="email"]').val();
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if ( testEmail.test(email) ) {
            localStorage.setItem('userEmail', email);
            window.location.href = 'sign-up.html';
        } else {
            $(this).find('input[type="email"]').addClass('border-danger');
        }
        //alert(localStorage.getItem('userEmail'));
    });

    // Insert email from LocalStorage
    $('.signup-form input[type="email"]').val(localStorage.getItem('userEmail'));

    // Price select
    $('#price-select').on('change' , function(){
        var val = $(this).find('option:selected').val();
        $('.choose-price').next('p').addClass('d-none');

        if ( val == 2000 ) {
            $('.price-year-count').text('21 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('25 €');
        }

        if ( val == 10000 ) {
            $('.price-year-count').text('41 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('49 €');
        }

        if ( val == 25000 ) {
            $('.price-year-count').text('67 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('79 €');
        }

        if ( val == 50000 ) {
            $('.price-year-count').text('84 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('99 €');
        }

        if ( val == 75000 ) {
            $('.price-year-count').text('101 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('119 €');
        }

        if ( val == 100000 ) {
            $('.price-year-count').text('126 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('149 €');
        }

        if ( val == 125000 ) {
            $('.price-year-count').text('143 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('169 €');
        }

        if ( val == 150000 ) {
            $('.price-year-count').text('169 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('199 €');
        }

        if ( val == 200000 ) {
            $('.price-year-count').text('194 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('229 €');
        }

        if ( val == 250000 ) {
            $('.price-year-count').text('211 €');
            $('.price-save-count').text('15 %');
            $('.price-month-count').text('249 €');
        }

    });

    // Check if selected price form dropdown
    $('.choose-price').on('click' , function(e) {
        e.preventDefault();

        if ( $('#price-select option:selected').val() == 0 ) {
            $(this).next('p').removeClass('d-none');
        }
    });

    // Get in touch form
    $('#get-in-touch-form').submit(function(e){

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                //alert(data); // show response from the php script.
                form.hide();
                $('.success-message').removeClass('d-none');
            },
            error: function(response) {
                //alert('not sent');
                form.hide();
                $('.error-message').removeClass('d-none');
            }
        });

    });

    // Contact form
    $('#contact-form').submit(function(e){

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                //alert(data); // show response from the php script.
                form.hide();
                $('.success-message').removeClass('d-none');
            },
            error: function(response) {
                //alert('not sent');
                form.hide();
                $('.error-message').removeClass('d-none');
            }
        });

    });

    $('#article-email-form , #article-email').submit(function(e){

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                //alert(data); // show response from the php script.
                form.hide();
                $('.success-message').removeClass('d-none');
            },
            error: function(response) {
                //alert('not sent');
                form.hide();
                $('.error-message').removeClass('d-none');
            }
        });

    });

    // First part demo form
    $('#demo-form').submit(function(e){

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                //alert(data); // show response from the php script.
                form.hide();
                //$('.intro-form .success-message').removeClass('d-none');
                $('.intro-form').find('.form-page-2').removeClass('d-none');
                $('.intro-form').find('.form-page-1').addClass('d-none');
                $('.form-page li p').removeClass('active');
                $('.form-page li:eq(1) p').addClass('active');
            },
            error: function(response) {
                //alert('not sent');
                form.hide();
                //$('.intro-form .error-message').removeClass('d-none');
                $('.intro-form').find('.form-page-2').removeClass('d-none');
                $('.intro-form').find('.form-page-1').addClass('d-none');
                $('.form-page li p').removeClass('active');
                $('.form-page li:eq(1) p').addClass('active');
            }
        });

    });

    // Second part demo form
    $('#demo-form-2').submit(function(e){

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                //alert(data); // show response from the php script.
                form.hide();
                $('.intro-form .success-message').removeClass('d-none');
            },
            error: function(response) {
                //alert('not sent');
                form.hide();
                $('.intro-form .error-message').removeClass('d-none');
            }
        });

    });

    // Sign up form
    $('#signup-form').submit(function(e){
        e.preventDefault();
                
        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                //alert(data); // show response from the php script.
                form.hide();
                //$('.success-message').removeClass('d-none');
                form.closest('.signup-form').find('.input-group-1').hide();
                form.closest('.signup-form').find('.input-group-2').removeClass('d-none');
            },
            error: function(response) {
                //alert('not sent');
                form.hide();
                //$('.error-message').removeClass('d-none');
                form.closest('.signup-form').find('.input-group-1').hide();
                form.closest('.signup-form').find('.input-group-2').removeClass('d-none');
            }
        });

    });

    $('#signup-form-2').submit(function(e){
        e.preventDefault();
                
        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                //alert(data); // show response from the php script.
                form.hide();
                $('.after-form-info').removeClass('d-none');
                $('.sign-up-form-info').addClass('d-none').removeClass('d-flex');
                $('.signup-form .success-message').removeClass('d-none');
            },
            error: function(response) {
                //alert('not sent');
                form.hide();
                $('.after-form-info').removeClass('d-none');
                $('.sign-up-form-info').addClass('d-none').removeClass('d-flex');
                $('.signup-form .error-message').removeClass('d-none');
            }
        });

    });

    // Dropdown language
    $('.dropdown-language .dropdown-menu a').on('click' , function(e){
        e.preventDefault();

        var lang = $(this).data('lang');
        var langTitle = $(this).text();

        var pathname = window.location.pathname;
        var location = window.location.origin;
        var fullLocation = window.location.href;

        $(this).closest('.dropdown').find('button').text(langTitle);

        if (lang == 'de') {
            window.location.replace(location + '/de' + pathname);
        } else {
            window.location.replace( fullLocation.replace('/de' , ''));
        }

    });

    // Toggle accordion
    $('.toggle').on('click' , function(){
        $('#accordion .collapse').each(function(){
            //$(this).collapse('toggle');
            $(this).toggleClass('show');
        });
    });

    // Account table
    $('.select-all-account').on('click' , function(){
        $('#account-table').find('input[type="checkbox"]').prop('checked' , true);
    });

    // Tabs on Index page click and show slider from first slide
    $('.top-features .nav-pills a').on('click' , function(e){
        e.preventDefault();

        $('.feature-slider').slick('slickGoTo', 0);

        // Show elements without additional scroll
        $('.tab-pane.active .col-md-5.wow').addClass("wow fadeInLeft animated");
        $('.tab-pane.active .col-md-5.wow').attr("style","visibility: visible; animation-name: fadeInLeft;");

        $('.tab-pane.active .col-md-7.wow').addClass("wow fadeInRight animated");
        $('.tab-pane.active .col-md-7.wow').attr("style","visibility: visible; animation-name: fadeInRight;");
    });

    // Feature large image
    $('.feature-lg-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

    // Scroll on blog
    // Cache selectors
    var lastId="",
    topMenu = $(".contents-list"),
    topHeader = $(".header_area"),
    topMenuHeight = topHeader.outerHeight()+1,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
    var indexItm = $(this).attr('href').indexOf('#');
    var str = $(this).attr('href').substring(indexItm);
    var item = $(str);
    if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
    menuItems.parent().removeClass('active');
    $(this).parent().addClass('active');
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 850);
    e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href*="+id+"]").parent().addClass("active");
    }
    });

    // Table of Contents toggle
    $('.blog-accordion p').on('click' , function(){
        $(this).closest('div').toggleClass('open');
    });

})(jQuery);