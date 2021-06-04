$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $('.side-nav').addClass('open');
  });

  $('.close-side-nav').on('click' , function(){
    $('.side-nav').removeClass('open');
  });

  $('.side-nav ul a').on('click' , function(e){
    if ($(this).closest('li').hasClass('subnav')) {
      e.preventDefault();
      $(this).closest('li').find('.subnav-list').toggleClass('open');
      $(this).closest('li').find('a').eq(0).toggleClass('open');
    }
  })

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
  //$('#pagepiling').pagepiling();

  /*$('#pagepiling').pagepiling({
    menu: null,
    direction: 'vertical',
    verticalCentered: true,
    sectionsColor: [],
    anchors: [],
    scrollingSpeed: 700,
    easing: 'linear',
    loopBottom: false,
    loopTop: false,
    css3: true,
    navigation: {
        'textColor': '#000',
        'bulletsColor': '#000',
        'position': 'right',
        'tooltips': ['section1', 'section2', 'section3', 'section4']
    },
    normalScrollElements: null,
    normalScrollElementTouchThreshold: 5,
    touchSensitivity: 5,
    keyboardScrolling: true,
    sectionSelector: '.section',
    animateAnchor: false,

    //events
    onLeave: function(index, nextIndex, direction){},
    afterLoad: function(anchorLink, index){},
    afterRender: function(){},
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
    dots: true
  });

  // Intro scroll effect
  var position_gallery = $('.inner-gallery').offset().top + $('.intro-inner').outerHeight();
  $(window).on('scroll' , function(){

    if ($(window).scrollTop() >= position_gallery ) {
      $('.intro-inner').addClass('z-index');
      $('footer.inner').removeClass('z-index');
    } else {
      $('.intro-inner').removeClass('z-index');
      $('footer.inner').addClass('z-index');
    }

    console.log(position_gallery);

  });

});
