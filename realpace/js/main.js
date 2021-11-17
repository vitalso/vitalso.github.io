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
    type: 'inline'
  });

  // Portfolio popup slider
  $('.portfolio-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
  });

  // Show popup with current portfolio item
  $('.full-portfolio .portfolio-item a').on('click' , function(e) {
    e.preventDefault()
    var slideNumber = $(this).data('slide');
    $('.portfolio-slider').slick('slickGoTo', slideNumber - 1);
  });

  // Fade in transition for numbers
  var top_position_number = $('.number-wrap').offset().top - 100;
  var hero_height = $('.hero-section').height();

  $(window).on('scroll' , function() {

    if ( $(window).scrollTop() >=  top_position_number) {
      $('.number-wrap').addClass('transition');
    }

    // Sticky header
    if ( $(window).scrollTop() >= hero_height ) {
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }

  });

});
