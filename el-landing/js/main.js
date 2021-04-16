$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
  });

  // Parallax effect for inner intro section
  $(window).on('scroll' , function() {

    // Change position of image intro
    $('.hero-person').css('top' , - $(window).scrollTop()*0.3);
    $('.hero-bg').css('top' , - $(window).scrollTop()*0.2);

  });

  var movementStrength = 25;
  var height = movementStrength / $(window).height();
  var width = movementStrength / $(window).width();
  $(".intro").mousemove(function(e){
            var pageX = e.pageX - ($(window).width() / 2);
            var pageY = e.pageY - ($(window).height() / 2);
            var newvalueX = width * pageX * -1;
            var newvalueY = height * pageY * -1;
            $('.hero-person').css("top", newvalueX+"px");
            $('.hero-person').css("left", newvalueY+"px");

            $('.hero-bg').css("top", newvalueX*1.2+"px");
            $('.hero-bg').css("right", newvalueY*1.2+"px");
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
