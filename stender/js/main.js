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

  // Blob animation
  /*var line1 = KUTE.fromTo('#line-1', { path: '#line-1' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-21' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line2 = KUTE.fromTo('#line-2', { path: '#line-2' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-22' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line3 = KUTE.fromTo('#line-3', { path: '#line-3' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-23' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line4 = KUTE.fromTo('#line-4', { path: '#line-4' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-24' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line5 = KUTE.fromTo('#line-5', { path: '#line-5' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-25' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line6 = KUTE.fromTo('#line-6', { path: '#line-6' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-26' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line7 = KUTE.fromTo('#line-7', { path: '#line-7' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-27' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line8 = KUTE.fromTo('#line-8', { path: '#line-8' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-28' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line9 = KUTE.fromTo('#line-9', { path: '#line-9' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-29' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line10 = KUTE.fromTo('#line-10', { path: '#line-10' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-30' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line11 = KUTE.fromTo('#line-11', { path: '#line-11' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-31' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line12 = KUTE.fromTo('#line-12', { path: '#line-12' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-32' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line13 = KUTE.fromTo('#line-13', { path: '#line-13' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-33' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line14 = KUTE.fromTo('#line-14', { path: '#line-14' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-34' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line15 = KUTE.fromTo('#line-15', { path: '#line-15' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-35' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line16 = KUTE.fromTo('#line-16', { path: '#line-16' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-36' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line17 = KUTE.fromTo('#line-17', { path: '#line-17' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-37' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line18 = KUTE.fromTo('#line-18', { path: '#line-18' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-38' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line19 = KUTE.fromTo('#line-19', { path: '#line-19' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-39' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  var line20 = KUTE.fromTo('#line-20', { path: '#line-20' , attr:{ fill: "transparent" , stroke: "#fff" } }, { path: '#line-40' ,  attr:{ fill: "transparent" , stroke: "#fff" } }, { duration: 2000, repeat: 9, yoyo: true });
  line1.start()
  line2.start()
  line3.start()
  line4.start()
  line5.start()
  line6.start()
  line7.start()
  line8.start()
  line9.start()
  line10.start()
  line11.start()
  line12.start()
  line13.start()
  line14.start()
  line15.start()
  line16.start()
  line17.start()
  line18.start()
  line19.start()
  line20.start()*/

});
