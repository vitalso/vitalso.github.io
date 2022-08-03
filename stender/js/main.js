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

    // Show roadmap line
    var scrollAmount = $(window).scrollTop();
    var roadmap = $('.roadmap');
    if ( roadmap.length ) {
      var offsetTop = roadmap.offset().top - 300;
    }

    // calculate the percentage the user has scrolled down the page
    var scrollPercent = scrollAmount - offsetTop;

    $('.roadmap-wrap-line').css({
        height: scrollPercent + 'px'
    });

    // Animate number
    var numberSection = $('#number-section');
    if ( numberSection.length ) {
      var numberTop = numberSection.offset().top / 2.5;
    }
    if ( $(window).scrollTop() > numberTop ) {
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

  $('.event-slider').slick({
    infinite: true,
    arrows: false,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: 1,
    variableWidth: true,
    touchThreshold: 7,
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

  // Gallery
  $('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		mainClass: 'mfp-img-mobile',
    gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
	});

  // Map
  $('.map .point').on('click' , function(){

    $(this).toggleClass('open');
    $(this).next('.point-desc').toggleClass('d-none');

  });

  // Filter vacancy list
  var $grid = $('.vacancy-grid').isotope({
    // options
    itemSelector: '.collapse-item',
    layoutMode: 'fitRows',
  });
  
  // change is-checked class on buttons
  var $buttonGroup = $('.vacancy-nav');
  $buttonGroup.on( 'click', 'a', function( event ) {
    event.preventDefault();
    $buttonGroup.find('.active').removeClass('active');
    var $button = $( event.currentTarget );
    $button.addClass('active');
    var filterValue = $button.attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  // AOS scroll animation
  AOS.init({
    once: true
  });

});
