$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $('.side-nav').addClass('open');
    //$('body').append('<div class="overlay"></div>');
  });

  $('.close-side-nav').on('click' , function(){
    $('.side-nav').removeClass('open');
    //$('.overlay').remove();
  });

  $('.side-nav ul a').on('click' , function(e){
    if ($(this).closest('li').hasClass('subnav')) {
      e.preventDefault();
      $(this).closest('li').find('.subnav-list').toggleClass('open');
      $(this).closest('li').find('a').eq(0).toggleClass('open');
    }
  })

  // Drop menu
  /*$('.has-drop-menu').on('click' , function(e){
    e.stopPropagation();

    if ($(this).hasClass('open')) {
      $('nav li .drop-menu').removeClass('open');
      $(this).removeClass('open');
    } else {
      $('nav li .drop-menu , .has-drop-menu').removeClass('open');
      $(this).closest('li').find('.drop-menu').addClass('open');
      $(this).addClass('open');
    }

  });*/

  /*$('nav ul > li').mouseenter(function(e){
    $('.open').find('.drop-menu').removeClass('open');
    $(this).addClass('open').find('.drop-menu').addClass('open');
  });*/

  // Search form in header
  $('.header-search .open-search').on('click' , function(e){
    e.preventDefault();
    $(this).closest('.header-search').addClass('open');
  });

  $('.header-search .close-search').on('click' , function(e){
    e.preventDefault();
    $(this).closest('.header-search').removeClass('open');
  });

  // Header language
  $('.header-language .open-language').on('click' , function(e){
    e.preventDefault();
    $(this).closest('.header-language').find('.language-list').toggleClass('open');
    $(this).toggleClass('rotate');
  });

  // Toggle principle
  $('.principle-list-item').on('click' , function(){
    //$('.principle-list-item').removeClass('open');
    $(this).toggleClass('open');
  });

  // Photo list
  $('.photo-list a').on('click' , function(e){
    e.preventDefault();

    if ($(this).closest('li').hasClass('open')) {
      $(this).closest('li').removeClass('open');
      $(this).closest('ul').removeClass('open');
    } else {
      $(this).closest('li').addClass('open').siblings('.open').removeClass('open');
      $(this).closest('ul').addClass('open');
    }

  });

  // Footer toggle list
  $('footer.inner .title-for-list').on('click' , function(){
    $(this).toggleClass('open');
  });

  $('.footer-contact-list ul a').on('click' , function(){


    $(this).closest('li').find('.sub-info').toggleClass('open');
    $(this).toggleClass('open');

    return false;
  })

  // Scroll to Contact Us
  var contact_us = $('.contact-us.inner');
  if (contact_us.length) {
    $('.intro-inner .primary-btn').on('click' , function(e){
      e.preventDefault();

      $('html, body').animate({scrollTop: $(document).height()}, 1000);
    });
  }

  // Trademark list slider
  $('.trademark-list').slick({
    infinite: true,
    focusOnSelect: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    vertical: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: 'linear',
    useTransform: true,
    arrows: false,
    dots: true,
    swipe: true,
    verticalSwiping: true,
    touchMove: true,
    swipeToSlide: true,
    asNavFor: '.trademark-description',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          vertical: false,
          verticalSwiping: false,
          variableWidth: true
        }
      }
    ]
  });

  $('.trademark-list').on('click', '.slick-slide', function(event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data('slick-index');

    $('.trademark-description').slick('slickGoTo', goToSingleSlide);
  });

  $('.trademark-description').slick({
    infinite: true,
    focusOnSelect: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    vertical: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    cssEase: 'linear',
    useTransform: true,
    arrows: false,
    dots: false,
    swipe: true,
    verticalSwiping: true,
    touchMove: true,
    swipeToSlide: true,
    asNavFor: '.trademark-list',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          vertical: false,
          verticalSwiping: false
        }
      }
    ]
  });

  // Fullpage scrolling
  var pagescroll = $('.pagescroll');
  if (pagescroll.length) {
    $(".pagescroll").onepage_scroll({
       sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
       easing: "ease-in-out",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                        // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
       animationTime: 700,             // AnimationTime let you define how long each section takes to animate
       pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
       updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
       beforeMove: function(index) {
        $('.section-nav').removeClass('open');

        /*if (index == 6) {

          $('.pagescroll').moveTo(5);

          $('.section-5').on('wheel', function(e) {
            e.preventDefault();

            if (e.originalEvent.deltaY < 0) {
              activity_slider.slick('slickPrev');
            } else {
              activity_slider.slick('slickNext');
            }
          });
        }*/

       },  // This option accepts a callback function. The function will be called before the page moves.
       afterMove: function(index) {
        $('.section-nav ul li.active').removeClass('active');
        $('.section-nav ul li').eq(index-2).addClass('active');
        $('.section-nav').addClass('open');

        /*if (index == 5) {
          console.log('ok');

          $('.pagescroll').moveDown();

        }*/

       },   // This option accepts a callback function. The function will be called after the page moves.
       loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
       keyboard: true,                  // You can activate the keyboard controls
       responsiveFallback: 992,        // You can fallback to normal page scroll by defining the width of the browser in which
                                        // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                        // the browser's width is less than 600, the fallback will kick in.
       direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    });
  }

  $('.section-nav .chapter-link').on('click' , function(e){
    e.preventDefault();

    $(".pagescroll").moveTo($(this).data('index'));
  });

  $('.section-nav ul li a').on('click' , function(e){
    e.preventDefault();

    $('.section-nav ul li').removeClass('active');
    $(this).closest('li').addClass('active');

    $(".pagescroll").moveTo($(this).data('index'));
  });

  const activity_slider = $(".activity-slider");
  activity_slider.slick({
    dots: false,
    arrows: false,
    infinite:false,
    speed: 1300,
    variableWidth: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    asNavFor: '.activity-desc-slider'
  });

  $('.activity-desc-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    speed: 1300,
    fade: true,
    asNavFor: activity_slider
  });

  activity_slider.on('beforeChange', function(event, slick, currentSlide , nextSlide) {
    if (slick.$slides.length-1 == nextSlide) {
      console.log("Last slide");

      $('.pagescroll').moveDown();
    }
  });

  // Section bottom slider
  $('.bottom-nav-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false
  });

  $('.card-slider').slick({
    //centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: true,
    cssEase: 'linear',
    variableWidth: true
    //variableHeight: true
  });

  /*var count = $('.card-wrap .slick-dots').children('li').length;
  var width_count = $('.card-wrap .slick-dots').width() / count;
  $('.card-wrap .slick-dots li').width(width_count + '%');*/

  $('#card-nav .btn-prev').on('click' ,function(){
    $('.card-slider').slick('slickPrev');
  });

  $('#card-nav .btn-next').click(function(){
    $('.card-slider').slick('slickNext');
  });

  // News slider
  $('.news-slider').slick({
    //centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    cssEase: 'linear',
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true
        }
      }
    ]
  });

  $('#news-nav .btn-prev').on('click' ,function(){
    $(this).closest('.news-wrap').find('.news-slider').slick('slickPrev');
  });

  $('#news-nav .btn-next').click(function(){
    $(this).closest('.news-wrap').find('.news-slider').slick('slickNext');
  });

  // Custom slider nav
  $('#bottom-slider .btn-prev').on('click' ,function(){
    $('.bottom-nav-slider').slick('slickPrev');
  });

  $('#bottom-slider .btn-next').click(function(){
    $('.bottom-nav-slider').slick('slickNext');
  });

  // Gallery slider
  $('.gallery-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true
  });

  $('.gallery-slider img').on('click' , function(){
    $('.gallery-slider').slick('slickNext');
  });

  // Section scroll nav
  var about_us = $('#about-us');
  if (about_us.length) {
    console.log($('body .section_nav').length);
    var about_us_position = about_us.offset().top;

    $(window).on('scroll' , function(){
      if ($(window).scrollTop() > about_us_position) {
        $('.section-nav').addClass('open');
      } else {
        $('.section-nav').removeClass('open');
      }
    });
  };

  // History timeline scroll effect
  var history = $('.history');
  if (history.length) {

    var history_top = history.offset().top - 500; // 500 just simple number ))

    var count_item = $('.timeline-item').length;
    var one_item = $('.timeline').height() / count_item;

    $(window).on('scroll' , function(){

      if ($(window).scrollTop() >= history_top) {
        $('.timeline .vertical-line').css('height' , $(window).scrollTop() - history_top);
      }

      if ($('.vertical-line').height() >= 100) {
        $('.timeline-item').eq(0).addClass('active');
      } else {
        $('.timeline-item').eq(0).removeClass('active');
      }

      if ($('.vertical-line').height() >= one_item) {
        $('.timeline-item').eq(1).addClass('active');
      } else {
        $('.timeline-item').eq(1).removeClass('active');
      }

      if ($('.vertical-line').height() >= one_item*2) {
        $('.timeline-item').eq(2).addClass('active');
      } else {
        $('.timeline-item').eq(2).removeClass('active');
      }

      if ($('.vertical-line').height() >= one_item*3) {
        $('.timeline-item').eq(3).addClass('active');
      } else {
        $('.timeline-item').eq(3).removeClass('active');
      }

      if ($('.vertical-line').height() >= one_item*4) {
        $('.timeline-item').eq(4).addClass('active');
      } else {
        $('.timeline-item').eq(4).removeClass('active');
      }

      if ($('.vertical-line').height() >= one_item*5) {
        $('.timeline-item').eq(5).addClass('active');
      } else {
        $('.timeline-item').eq(5).removeClass('active');
      }

    });

  };

  // Intro scroll effect
  var position_gallery = $('.gallery').offset().top + $('.intro-inner').outerHeight();
  var position_gallery_height = $('.gallery').offset().top + $('.gallery').outerHeight();
  var main_top_position = $('main').height() - 800;
  $(window).on('scroll' , function(){

    if ($(window).scrollTop() >= position_gallery ) {
      $('.intro-inner').addClass('z-index');
    } else {
      $('.intro-inner').removeClass('z-index');
      //$('.wrap-fixed-elements').addClass('z-index');
    }

    if ($(window).scrollTop() >= main_top_position ) {
      $('.wrap-fixed-elements').removeClass('z-index');
    } else {
      $('.wrap-fixed-elements').addClass('z-index');
    }

  });


  if ($('body').find('.wrap-fixed-elements')) {
    var fixed_elements = $('.wrap-fixed-elements').outerHeight();

    $('body').css('padding-bottom' , fixed_elements);

  }

  if ($(window).width() <= 992) {
    $('body').css('padding-bottom' , 0);
  }

  $(window).on('resize' , function(){

    if ($('body').find('.wrap-fixed-elements')) {
      var fixed_elements = $('.wrap-fixed-elements').outerHeight();

      $('body').css('padding-bottom' , fixed_elements);

    }

    if ($(window).width() <= 992) {
      $('body').css('padding-bottom' , 0);
    }

  })

});
