$(window).on('load' , function(){
  //$( ".preloader" ).fadeOut(500);
  //$('body').removeClass('overflow-y');


  if (window.location.href.indexOf('how-we-build') > -1) {

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

  };

  // Run some function only on What you take page
  if (window.location.href.indexOf('what-you-take') > -1) {

    var position = $('.example-image').offset().top;
    var height = $('.example-image').height();
    var wHeight = $(window).height();
    var position_top = position - wHeight/2;
    var step = height / 6;

    var initialSrc = "images/canvas/1.jpg";
    var Img_1 = "images/canvas/2.jpg";
    var Img_2 = "images/canvas/3.jpg";
    var Img_3 = "images/canvas/4.jpg";
    var Img_4 = "images/canvas/5.jpg";
    var Img_5 = "images/canvas/6.jpg";

    $(window).on('scroll' , function(){

      if ($(window).scrollTop() > position_top) {
        //scrollVideoFours();

        $(window).scroll(function() {
          var value = $(window).scrollTop();

          if (value > position_top && value < position_top+step) {
            $(".example-image img").attr("src", initialSrc);
          } else if (value > position_top+step*2 && value < position_top+step*3) {
            $(".example-image img").attr("src", Img_1);
          } else if (value > position_top+step*3 && value < position_top+step*4) {
            $(".example-image img").attr("src", Img_2);
          } else if (value > position_top+step*4 && value < position_top+step*5) {
            $(".example-image img").attr("src", Img_3);
          } else if (value > position_top+step*5 && value < position_top+step*6) {
            $(".example-image img").attr("src", Img_4);
          } else if (value > position_top+step*6) {
            $(".example-image img").attr("src", Img_5);
          } else {
            $(".example-image img").attr("src", initialSrc);
          }

        });

      }

    })

  }


});

$(document).ready(function() {

  setTimeout(removeLoader, 3000);

  function removeLoader() {
    $( ".preloader" ).fadeOut(500);
    $('body').removeClass('overflow-y');
  }

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

  var lastScrollTop = 0;
  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st < lastScrollTop){
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }
    lastScrollTop = st;

    if (st < $('.intro').height()){
      $('header').removeClass('sticky');
    }
  });

  // Run some function only on Index page
  //if (window.location.href.indexOf('public') > -1 || window.location.href.indexOf('index') > -1) {
  if ($('body').hasClass('index')) {

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

    // Tree video position
    var video_index = $('.tree-video').get(0);
    var position_index = $('.tree-video').offset().top - $('.tree-video').height()*8;

    var position2 = $('.illustration-video-1').offset().top;
    var height2 = $('.illustration-video-1').height();
    var wHeight2 = $(window).height();
    var position_top2 = position2 - wHeight2/1.3;
    var step2 = height2 / 10;

    var initialSrc2 = "images/canvas-3/1.jpg";
    var Img_11 = "images/canvas-3/2.jpg";
    var Img_12 = "images/canvas-3/3.jpg";
    var Img_13 = "images/canvas-3/4.jpg";
    var Img_14 = "images/canvas-3/5.jpg";
    var Img_15 = "images/canvas-3/6.jpg";
    var Img_16 = "images/canvas-3/7.jpg";
    var Img_17 = "images/canvas-3/8.jpg";
    var Img_18 = "images/canvas-3/9.jpg";
    var Img_19 = "images/canvas-3/10.jpg";

    var position = $('.illustration-video-2').offset().top;
    var height = $('.illustration-video-2').height();
    var wHeight = $(window).height();
    var position_top = position - wHeight/1.3;
    var step = height / 10;

    var initialSrc = "images/canvas-2/1.jpg";
    var Img_1 = "images/canvas-2/2.jpg";
    var Img_2 = "images/canvas-2/3.jpg";
    var Img_3 = "images/canvas-2/4.jpg";
    var Img_4 = "images/canvas-2/5.jpg";
    var Img_5 = "images/canvas-2/6.jpg";
    var Img_6 = "images/canvas-2/7.jpg";
    var Img_7 = "images/canvas-2/8.jpg";
    var Img_8 = "images/canvas-2/9.jpg";
    var Img_9 = "images/canvas-2/10.jpg";

    // Prevelige position
    var prevelige_position = $('#preveliges').offset().top;

    $(window).on('scroll' , function(){

      if ($(window).scrollTop() > position_index) {
        scrollVideo();
      }

      var value = $(window).scrollTop();

      if ($(window).scrollTop() > position_top2) {

        if (value > position_top2 && value < position_top2+step2) {
          $(".illustration-video-1 img").attr("src", initialSrc2);
        } else if (value > position_top2+step2*2 && value < position_top2+step2*3) {
          $(".illustration-video-1 img").attr("src", Img_11);
        } else if (value > position_top2+step2*3 && value < position_top2+step2*4) {
          $(".illustration-video-1 img").attr("src", Img_12);
        } else if (value > position_top2+step2*4 && value < position_top2+step2*5) {
          $(".illustration-video-1 img").attr("src", Img_13);
        } else if (value > position_top2+step2*5 && value < position_top2+step2*6) {
          $(".illustration-video-1 img").attr("src", Img_14);
        } else if (value > position_top2+step2*6 && value < position_top2+step2*7) {
          $(".illustration-video-1 img").attr("src", Img_15);
        } else if (value > position_top2+step2*7 && value < position_top2+step2*8) {
          $(".illustration-video-1 img").attr("src", Img_16);
        } else if (value > position_top2+step2*8 && value < position_top2+step2*9) {
          $(".illustration-video-1 img").attr("src", Img_17);
        } else if (value > position_top2+step2*9 && value < position_top2+step2*10) {
          $(".illustration-video-1 img").attr("src", Img_18);
        } else if (value > position_top2+step2*10) {
          $(".illustration-video-1 img").attr("src", Img_19);
        } else {
          $(".illustration-video-1 img").attr("src", initialSrc2);
        }

      }

      if ($(window).scrollTop() > position_top) {
        //scrollVideoFours();

        if (value > position_top && value < position_top+step) {
          $(".illustration-video-2 img").attr("src", initialSrc);
        } else if (value > position_top+step*2 && value < position_top+step*3) {
          $(".illustration-video-2 img").attr("src", Img_1);
        } else if (value > position_top+step*3 && value < position_top+step*4) {
          $(".illustration-video-2 img").attr("src", Img_2);
        } else if (value > position_top+step*4 && value < position_top+step*5) {
          $(".illustration-video-2 img").attr("src", Img_3);
        } else if (value > position_top+step*5 && value < position_top+step*6) {
          $(".illustration-video-2 img").attr("src", Img_4);
        } else if (value > position_top+step*6 && value < position_top+step*7) {
          $(".illustration-video-2 img").attr("src", Img_5);
        } else if (value > position_top+step*7 && value < position_top+step*8) {
          $(".illustration-video-2 img").attr("src", Img_6);
        } else if (value > position_top+step*8 && value < position_top+step*9) {
          $(".illustration-video-2 img").attr("src", Img_7);
        } else if (value > position_top+step*9 && value < position_top+step*10) {
          $(".illustration-video-2 img").attr("src", Img_8);
        } else if (value > position_top+step*10) {
          $(".illustration-video-2 img").attr("src", Img_9);
        } else {
          $(".illustration-video-2 img").attr("src", initialSrc);
        }

      }

      // Rotate square colorful cards when scroll
      var currentScroll = Number(Math.trunc($(window).scrollTop() / 170));

      $('.square.first-orange').css({ transform: 'rotate(-' + (currentScroll - 17) + 'deg)' });
      $('.square.blue').css({ transform: 'rotate(-' + (currentScroll - 15 ) + 'deg)' });
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
    speed: 2500,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: true,
    arrows: false,
    vertical: true
    //verticalReverse: true
  });

  $('.side-scrolling.right ul').slick({
    autoplay: true,
    infinite: true,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    vertical: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 0,
    speed: 2500,
    cssEase: 'linear',
    useTransform: true,
    arrows: false
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

})
