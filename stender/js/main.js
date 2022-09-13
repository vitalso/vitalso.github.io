$(function () {

  // Fixed header
  var header = $('header');
  var headerHeight = header.outerHeight();

  $('.navbar-toggler').on('click' , function() {
    //header.removeClass('fixed');
    if ( header.is('.fixed') ) {
      $('.logo').toggleClass('open-menu');
    }
    //$('html').toggleClass('overflow-hidden');
  });

  // Article nav
  var articleNav = $('.article-nav');
  if ( articleNav.length ) {
    var offsetArticleNav = articleNav.offset().top;
  }
  
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
      var numberTop = numberSection.offset().top / 2;
    }
    if ( $(window).scrollTop() > numberTop ) {
      count();
    }

    if ( $(window).scrollTop() > offsetArticleNav ) {
      articleNav.addClass('sticky');
      //articleNav.css('top' , $(window).scrollTop());
    } else {
      articleNav.removeClass('sticky');
      //articleNav.css('top' , 'auto');
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
        duration: 1000,
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
    arrows: true,
    nextArrow:"<button type='button' class='blog-next'></button>",
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

  // Member modal
  $('.member-popup').magnificPopup({
		type: 'inline',
		preloader: false,
		modal: false
	});
	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

  // Filter vacancy list
  var $buttonGroup = $('.vacancy-nav');
  $buttonGroup.on( 'click', 'a', function( event ) {
    event.preventDefault();
    $buttonGroup.find('.active').removeClass('active');
    var $button = $( event.currentTarget );
    $button.addClass('active');
    var filterValue = $button.attr('data-filter');
    if ( filterValue == 'all' ) {
      $('.vacancy-grid .collapse-item').removeClass("d-none");  
    } else {
      $('.vacancy-grid .collapse-item').addClass("d-none");
      $('.vacancy-grid .collapse-item').filter('.'+filterValue).removeClass("d-none");
    }
  });

  // Article gallery slider
  $('.article-slider').slick({
    infinite: true,
    arrows: false,
    dots: false,
    centerMode: true,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });

  // Partner slider
  $('.partner-slider').slick({
    infinite: true,
    arrows: false,
    dots: true,
    centerMode: false,
    variableWidth: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });

  // Card slider
  $('.card-slider').slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  });

  // Scroll on blog
  // Cache selectors
  var lastId="",
  topMenu = $(".article-nav"),
  topHeader = $("header"),
  topMenuHeight = topHeader.outerHeight()+1,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function(){
  var indexItm = $(this).attr('href').indexOf('#');
  var str = $(this).attr('href').substring(indexItm);
  var item = $(str);
  if (item.length) { return item; }
  });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
  menuItems.parent().removeClass('current-chapter');
  $(this).parent().addClass('current-chapter');
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 500);
  e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
  // Get container scroll position
  var fromTop = $(this).scrollTop()+topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
      return this;
  });
  // Get the id of the current element
  cur = cur[cur.length-1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("current-chapter")
        .end().filter("[href*="+id+"]").parent().addClass("current-chapter");
  }
  });

  // AOS scroll animation
  AOS.init({
    once: true
  });

  // Cover video play on click button
  var iframe = document.getElementById('video');

  // $f == Froogaloop
  var player = $f(iframe);

  // bind events
  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", function() {
    player.api("play");
  });

  $('.cover-video .play-video').on('click' , function(){
    $(this).closest('.cover-video').addClass('play');
    $(this).hide();
  });

});
