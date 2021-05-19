$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
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
    dots: false,
    arrows: false,
    infinite: true,
    cssEase: 'linear',
    variableWidth: true
    //variableHeight: true
  });

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
    variableWidth: true
    //variableHeight: true
  });

  $('#news-nav .btn-prev').on('click' ,function(){
    $('.news-slider').slick('slickPrev');
  });

  $('#news-nav .btn-next').click(function(){
    $('.news-slider').slick('slickNext');
  });

  // Custom slider nav
  $('#bottom-slider .btn-prev').on('click' ,function(){
    $('.bottom-nav-slider').slick('slickPrev');
  });

  $('#bottom-slider .btn-next').click(function(){
    $('.bottom-nav-slider').slick('slickNext');
  });

});
