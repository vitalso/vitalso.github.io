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

    // Animate number
    if ( $(window).scrollTop() > $('#number-section').offset().top / 2.5 ) {
      count();
    }

  });

  // Count number
  function count() {
    $('.count').each(function() {
      var $this = $(this),
      countTo = $this.data('count');
      //$this.text('1');
      $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
      {
        duration: 3000,
        easing:'linear',
        step:function() {
          $this.text(Math.floor(this.countNum));
        },
        complete:function() {
          $this.text(this.countNum);
        }
      });
    });
  }

  // Blog slider on index page
  $('.blog-slider').slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
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
    nextArrow: $('.next'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          variableWidth: false
        }
      }
    ]
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

  // Scroll up
  $('.scroll-up').on('click' , function(){
    $("html, body").animate({ scrollTop: 0 } , 1000);
  });

  // AOS scroll animation
  AOS.init({
    once: true
  });

});
