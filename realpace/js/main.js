$(function () {

  // Language dropdown
  $('.current-language').on('click' , function(e){
    e.preventDefault();
    $(this).next('.list-language').toggle();
  });

  $('.list-language a').on('click' , function(e){
    e.preventDefault();
    $(this).closest('.list-language').hide();
  });

  // Mobile toggle menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('header nav').toggleClass('open');
    $('body').toggleClass('overflow-hidden');
  });

  // Scroll on button 'See more'
  $('.see-more').on('click' , function(e){
    e.preventDefault();

    $('html, body').animate({scrollTop: $('.hero-section').outerHeight()}, 300);
  });

  // Slider in Team section
  $('.team-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  $('.team-slider').on('beforeChange', function (event, slick, currentSlide) {
    $('.team').addClass('ms-3');
  })

  // Portfolio popup
  $('.full-portfolio').magnificPopup({
    delegate: 'a',
    type: 'inline',
    mainClass: 'mfp-zoom-in',
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    },
    callbacks: {
      close: function(){
        $('.portfolio-slider').slick('unslick');
      }
    }
  });

  // Show popup with current portfolio item
  $('.full-portfolio .portfolio-item a').on('click' , function(e) {
    e.preventDefault();

    var slideNumber = $(this).data('slide');
    // Portfolio popup slider
    $('.portfolio-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: slideNumber - 1,
      dots: false,
      arrows: true,
    });

  });

  // Partner page intro text slider
  $('.text-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: 'linear',
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  // Full-section slider on Partner page
  $('.section-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    adaptiveHeight: true
  });

  $('.section-slider').on('wheel', (function(e) {
    e.preventDefault();

    if (e.originalEvent.deltaY < 0) {
      $(this).slick('slickNext');
    } else {
      $(this).slick('slickPrev');
    }
  }));

  // Fade in transition for numbers
  if ($('body').find('.fade-in').length !== 0) {
    var top_position = $('.fade-in').closest('section').offset().top - 100;
  }
  if ($('body').find('.eco-system').length !== 0) {
    var top_position_out = $('.eco-system').offset().top - 100;
  }
  var hero_height = $('.hero-section').height();

  $(window).on('scroll' , function() {

    if ( $(window).scrollTop() >=  top_position ) {
      $('.number-wrap , .our-facts').addClass('transition');
    }

    if ( $(window).scrollTop() > top_position_out ) {
      $('.eco-system').addClass('transition');
    }

    // Sticky header
    if ( $(window).scrollTop() >= hero_height ) {
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }

  });

});
