$(function () {

  // Mobile toggle menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('header nav').toggleClass('open');
    $('body').toggleClass('overflow-hidden');
  });

  // Smooth scroll
  $('header nav a').on('click' , function(){
    $('header nav , .toggle-nav').removeClass('open');
    $('body').removeClass('overflow-hidden');
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().top}, 500);
  });

  // Slick slider
  $('.index-slider').slick({
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });

});
