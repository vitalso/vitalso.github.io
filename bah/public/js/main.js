$(window).on('load' , function(){
  setTimeout(removeLoader, 2000);
});

function removeLoader(){
  $( ".preloader" ).fadeOut(500);
  $('body').removeClass('overflow-y');
}

$(document).ready(function() {

  // Toogle class button menu
  $('.toggle-nav').on('click' , function(){
    $('body').toggleClass('overflow-y');
    $(this).closest('header').toggleClass('z-index');
    $(this).toggleClass('open');
    $('.nav').toggleClass('open');
  });

  // Phone input mask
  $("#phone-input").mask("+38(099)-999-99-99");

  // Scroll Reveal - effects when scroll page
    ScrollReveal().reveal('.animated' , { delay: 1000 , duration: 1300 , easing: 'ease' , distance: '150px' });

  // Parallax effect for inner intro section
  $(window).on('scroll' , function() {

    // Change position of image intro
    $('.intro-img img').css('top' , - $(window).scrollTop()*0.2);
    $('.intro-illustration img').css('top' , - $(window).scrollTop()*0.1);

  });

  // Run some function only on Index page
  if (window.location.pathname == "/" > -1 || window.location.href.indexOf("index") > -1 || window.location.href.indexOf("localhost") > -1) {

    // Slick slider - Gallery pack
    $('.gallery-pack ul').slick({
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      pauseOnHover: false,
      cssEase: 'linear',
      useTransform: false,
      arrows: false
    });

    function scrollVideo() {
      var video = $('.tree-video').get(0),
        videoLength = video.duration,
        scrollPosition = $(document).scrollTop()*7;

      video.currentTime = scrollPosition / ( $(document).height() ) * videoLength;

    };

    function scrollVideoSecond() {
      var video = $('.illustration-video-1').get(0);
        videoLength = video.duration,
        scrollPosition = $(document).scrollTop()*4;

      video.currentTime = scrollPosition / ( $(document).height() ) * videoLength;

    };

    function scrollVideoThird() {
      var video = $('.illustration-video-2').get(0);
        videoLength = video.duration,
        scrollPosition = $(document).scrollTop()*2.9;

      video.currentTime = scrollPosition / ( $(document).height() ) * videoLength;

    };

    // Tree video position
    var video_index = $('.tree-video').get(0);
    var position_index = $('.tree-video').offset().top - $('.tree-video').height()*8;

    // Illustration 1
    var video_illustration_1 = $('.illustration-video-1').get(0);
    var position_illustration_1 = $('.illustration-video-1').offset().top - $('.illustration-video-1').height()*5;

    // Illustration 2
    var video_illustration_2 = $('.illustration-video-2').get(0);
    var position_illustration_2 = $('.illustration-video-2').offset().top - $('.illustration-video-2').height()*4;

    /*$('.illustration-video-1 , .illustration-video-2').on('ended', function(){this.playedThrough = true;});
    $('.illustration-video-1 , .illustration-video-2').on('ended', function(){
      $('body').removeClass('overflow-y');
    });*/

    // Prevelige position
    var prevelige_position = $('#preveliges').offset().top;

    $(window).on('scroll' , function(){

      //console.log($(window).scrollTop() , position_index , $('.tree-video').height());

      // Play video with tree when scroll
      //scrollVideo();

      if ($(window).scrollTop() > position_index) {
        scrollVideo();
      }

      if ($(window).scrollTop() > position_illustration_1) {
        scrollVideoSecond();
      }

      if ($(window).scrollTop() > position_illustration_2) {
        scrollVideoThird();
      }

      // Rotate square colorful cards when scroll
      var currentScroll = Number(Math.trunc($(window).scrollTop() / 170));

      $('.square.first-orange').css({ transform: 'rotate(-' + (currentScroll - 20) + 'deg)' });
      $('.square.blue').css({ transform: 'rotate(-' + (currentScroll - 20 ) + 'deg)' });
      $('.square.grey-color').css({ transform: 'rotate(' + (currentScroll - 20 ) + 'deg)' });
      $('.square.second-green').css({ transform: 'rotate(-' + (currentScroll - 27 ) + 'deg)' });
      $('.square.light-green').css({ transform: 'rotate(' + (currentScroll - 25 ) + 'deg)' });
      $('.square.last-orange').css({ transform: 'rotate(-' + (currentScroll - 20 ) + 'deg)' });

      // Change background when scroll to section #Preveliges
      if ($(window).scrollTop() >= prevelige_position) {
        $('#preveliges').addClass('bg-change');
      }

    });

    // Scroll configure section
  $('.side-scrolling.left ul').slick({
    autoplay: true,
    infinite: true,
    autoplaySpeed: 0,
    speed: 400,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 3,
    focusOnSelect: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: false,
    arrows: false,
    vertical: true
    //verticalReverse: true
  });

  $('.side-scrolling.right ul').slick({
    autoplay: true,
    infinite: true,
    centerMode: true,
    centerPadding: '0',
    //slidesToShow: 3,
    //slidesToScroll: 2,
    focusOnSelect: false,
    //pauseOnFocus: false,
    pauseOnHover: false,
    vertical: true,
    //verticalReverse: false
    //variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplaySpeed: 0,
    speed: 300,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: false,
    arrows: false
  });

  $('.side-scrolling.left ul').on('afterChange', function(event, slick, currentSlide, nextSlide){
    setInterval(function() {
      $('.side-scrolling.left ul').slick('slickPause');
    }, 4200);
  });

  $('.side-scrolling.left ul').on('afterChange', function(event, slick, currentSlide, nextSlide){
    setInterval(function() {
      $('.side-scrolling.left ul').slick('slickPlay');
    }, 5400);
  });

  $('.side-scrolling.right ul').on('afterChange', function(event, slick, currentSlide, nextSlide){
    setInterval(function() {
      $('.side-scrolling.right ul').slick('slickPause');
    }, 3000);
  });

  $('.side-scrolling.right ul').on('afterChange', function(event, slick, currentSlide, nextSlide){
    setInterval(function() {
      $('.side-scrolling.right ul').slick('slickPlay');
    }, 4200);
  });

}

  // Popup
  $('.consult').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $(document).on('click', '.close-popup', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });


  if (window.location.href.indexOf("how-we-build") > -1) {

    // Top position of block
    var top_position = $('.step-list').offset().top;

    // Step 1 position
    var step_1_position = $('#step-1').offset().top;

    // Step 5 position
    var step_5_position = $('#step-5').offset().top;

    // Full position
    var full_position = (step_5_position - step_1_position) / 7;
    //console.log(full_position);

    if ($(window).width() > 768) {

      // Scrool
      $(window).on('scroll' , function() {

        // Change step when scroll
        if ($(window).scrollTop() >= (top_position - 100) && $(window).scrollTop() <= step_5_position - 100) {
          $('.step-list').addClass('sticky');
          //$('.step-list').css('top' , ($(window).scrollTop() - top_position + 200));
        } else {
          $('.step-list').removeClass('sticky');
        }

        if ($(window).scrollTop() >= step_1_position && $(window).scrollTop() <= step_1_position + full_position) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(0).addClass('current-step');
        } else if ($(window).scrollTop() >= step_1_position + full_position && $(window).scrollTop() <= step_1_position + full_position * 2) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(1).addClass('current-step');
        } else if ($(window).scrollTop() >= step_1_position + full_position * 2 && $(window).scrollTop() <= step_1_position + full_position * 3) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(2).addClass('current-step');
        } else if ($(window).scrollTop() >= step_1_position + full_position * 3 && $(window).scrollTop() <= step_1_position + full_position * 4) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(3).addClass('current-step');
        } else if ($(window).scrollTop() >= step_1_position + full_position * 4 && $(window).scrollTop() <= step_1_position + full_position * 5) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(4).addClass('current-step');
        } else if ($(window).scrollTop() >= step_1_position + full_position * 5 && $(window).scrollTop() <= step_1_position + full_position * 6) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(5).addClass('current-step');
        } else if ($(window).scrollTop() >= step_1_position + full_position * 6) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(6).addClass('current-step');
        }

      });

    }

    var initialSrc = "images/15.png";
    var secondImg = "images/14.png";
    var thirdImg = "images/13.png";
    var foursImg = "images/12.png";

    $(window).scroll(function() {
      var value = $(window).scrollTop();

      if (value > 30 && value < 60) {
        $(".intro-build img").attr("src", secondImg);
      } else if (value > 60 && value < 90) {
        $(".intro-build img").attr("src", thirdImg);
      } else if (value > 90) {
        $(".intro-build img").attr("src", foursImg);
      } else {
        $(".intro-build img").attr("src", initialSrc);
      }

    });

  };

  if (window.location.href.indexOf("configuration") > -1) {

    $('.items.type .item').slick({
      infinite: false,
      centerMode: true,
      centerPadding: '0',
      slidesToShow: 4,
      slidesToScroll: 0,
      focusOnSelect: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      useTransform: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            variableWidth: true,
            infinite: true,
            initialSlide: 1,
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    });

  }

  // Run some function only on What you take page
  if (window.location.href.indexOf("what-you-take") > -1) {

    // Illustration 3
    var video_illustration_3 = $('.illustration-video-3').get(0);
    var position_illustration_3 = $('.illustration-video-3').offset().top - $('.illustration-video-3').height()/4;


    function scrollVideoFours() {
      var video = $('.illustration-video-3').get(0);
        videoLength = video.duration,
        scrollPosition = $(document).scrollTop();

      video.currentTime = scrollPosition / ( $(document).height() ) * videoLength;

    };

    $(window).on('scroll' , function(){

      if ($(window).scrollTop() > position_illustration_3) {
        scrollVideoFours();
      }

      /*if ($(window).scrollTop() > position_illustration_3) {
        if (!video_illustration_3.playedThrough) {
          video_illustration_3.play();
          $('body').addClass('overflow-y');
        } else {
          video_illustration_3.pause();
        }
      }*/

    })

  }

  // Form inputs add .checked class
  $(".rooms input").change(function() {
    $(".rooms input").parent().removeClass("checked");
    $(".rooms input:checked").parent().addClass("checked");
  });

  $(".type input").change(function() {
    $(".type input").closest("div").removeClass("checked");
    $(".type input:checked").closest("div").addClass("checked");
  });

  // Tabs
  $('.dark-tab').on('click', 'li:not(.current-percent)', function(e) {
    e.preventDefault();
    $(this)
      .addClass('current-percent').siblings().removeClass('current-percent')
      .closest('.component-costs').find('.payment-tab-section section').removeClass('current').eq($(this).index()).addClass('current');
  });

  // Change image on click by color scheme circle
  $('.color-list .previous , .color-list .current , .color-list .next').on('click' , function(){
    $('#color').fadeOut('fast').attr('src' , $(this).data('url')).fadeIn(300);
    $('.color-list li').removeClass('active');
    $(this).addClass('active');
  });

  var lastScrollTop = 0;
  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st < lastScrollTop){
      $('header.dark-link').addClass('sticky');
    } else {
      $('header.dark-link').removeClass('sticky');
    }
    lastScrollTop = st;
  });

})
