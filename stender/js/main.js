$(function () {

  // Fixed header
  var header = $('header');
  var headerHeight = header.outerHeight();
  $(window).scroll(function(){

    if ( $(window).scrollTop() >= headerHeight ) {
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
    }

  });

  // Blog slider on index page
  $('.blog-slider').slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1
    /*responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]*/
  });

  // History slider
  $('.history-slider').slick({
    infinite: true,
    arrows: true,
    dots: false,
    centerMode: true,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.prev'),
    nextArrow: $('.next')
    /*responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]*/
  });

  // Popup
  $('.popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

  // AOS scroll animation
  AOS.init({
    once: true
  });

});
