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
  $('.has-drop-menu a').eq(0).on('click' , function(e){
    e.preventDefault();

    $(this).closest('li').find('.drop-menu').toggleClass('open');
  });

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
  $('.principle-list-item-title').on('click' , function(){
    $('.principle-list-item').removeClass('open');
    $(this).closest('.principle-list-item').addClass('open');
  });

  // Photo list
  $('.photo-list a').on('click' , function(e){
    e.preventDefault();

    $('.photo-list li').removeClass('open')

    $(this).closest('li').addClass('open');
    $(this).closest('ul').addClass('open');

  });

  // Footer toggle list
  $('footer.inner .title-for-list').on('click' , function(){
    $(this).toggleClass('open');
  });

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
          slidesToShow: 1
        }
      }
    ]
  });

  // Fullpage scrolling
  /*$.scrollify({
    section : ".section",
  });*/

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

  // Section scroll nav
  if ($('body').find('.section-nav')) {
    var about_us_position = $('#about-us').offset().top;

    $(window).on('scroll' , function(){
      if ($(window).scrollTop() > about_us_position) {
        $('.section-nav').addClass('open');
      } else {
        $('.section-nav').removeClass('open');
      }
    });
  }

  // History timeline scroll effect
  if ($('body').find('.history')) {

    var history_top = $('.history').offset().top - 500; // 500 just simple number ))

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
  $(window).on('scroll' , function(){

    if ($(window).scrollTop() >= position_gallery ) {
      $('.intro-inner').addClass('z-index');
    } else {
      $('.intro-inner').removeClass('z-index');
      //$('.wrap-fixed-elements').addClass('z-index');
    }

    if ($(window).scrollTop() >= position_gallery_height ) {
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
