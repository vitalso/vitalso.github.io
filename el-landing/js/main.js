$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
  });

  // Parallax effect for inner intro section
  $(window).on('scroll' , function() {

    // Change position of image intro
    $('.hero-person').css('top' , - $(window).scrollTop()*0.2);
    $('.hero-bg').css('top' , - $(window).scrollTop()*0.1);

  });

  // Expert slider
  /*$('.experts-slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });*/

  // Example of works slider
  $('.example-slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // FAQ
  $('.faq-item').on('click' , function() {
    $(this).toggleClass('open');
  });

  // Popup with video
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true
  });

});
