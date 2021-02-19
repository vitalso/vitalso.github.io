$(document).ready(function() {

  // Toogle class button menu
  $('.toggle-nav').on('click' , function(){
    $('body').toggleClass('overflow-y');
    $(this).toggleClass('open');
    $('.nav').toggleClass('open');
  });

  // Phone input mask
  $("#phone-input").mask("+38(099)-999-99-99");

  // Run some function only on Index page
  if (window.location.pathname == "/" || window.location.href.indexOf("index") > -1) {

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

    // Scroll Reveal - effects when scroll page
    ScrollReveal().reveal('.animated' , { delay: 2000 , duration: 1300 , easing: 'ease' , distance: '100%' });

    function scrollVideo() {
      var video = $('.tree-video').get(0),
        videoLength = video.duration,
        scrollPosition = $(document).scrollTop();

      video.currentTime = ((scrollPosition*3) / ($(document).height() - $(window).height()*4)) * videoLength;

    };

    $(window).on('scroll' , function(){

      // Play video with tree when scroll
      scrollVideo();

      // Rotate square colorful cards when scroll
      var currentScroll = Number(Math.trunc($(window).scrollTop() / 170));

      $('.square.first-orange').css({ transform: 'rotate(-' + (currentScroll - 15) + 'deg)' });
      $('.square.blue').css({ transform: 'rotate(-' + (currentScroll - 10 ) + 'deg)' });
      $('.square.grey-color').css({ transform: 'rotate(' + (currentScroll - 5 ) + 'deg)' });
      $('.square.second-green').css({ transform: 'rotate(-' + (currentScroll - 13 ) + 'deg)' });
      $('.square.light-green').css({ transform: 'rotate(' + (currentScroll - 20 ) + 'deg)' });
      $('.square.last-orange').css({ transform: 'rotate(-' + (currentScroll - 15 ) + 'deg)' });

    });

    // Change background when scroll to section #Preveliges
    if ($(window).scrollTop() >= $('#preveliges').offset().top) {
      $('#preveliges').addClass('bg-change');
    }

  }

  // Scroll configure section
  /*$('.side-scrolling.left ul').slick({
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: false,
    arrows: false,
    vertical: true,
    verticalReverse: true
  });

  $('.side-scrolling.right ul').slick({
    autoplay: true,
    infinite: false,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: false,
    arrows: false,
    vertical: true
    //verticalReverse: true
  });*/

  /*$(".side-scrolling.right ul").on("beforeChange", function(event, slick, currentSlide) {

    rand = Math.floor( Math.random() * 4 );

    $(this).slick('slickGoTo', 1);

    console.log(rand);

  })*/



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

    // Step 2 position
    var step_2_position = $('#step-2').offset().top;

    // Step 3 position
    var step_3_position = $('#step-3').offset().top;

    // Step 4 position
    var step_4_position = $('#step-4').offset().top;

    // Step 5 position
    var step_5_position = $('#step-5').offset().top;

    if ($(window).width() > 768) {

      // Scrool
      $(window).on('scroll' , function() {

        // Change step when scroll
        if ($(window).scrollTop() >= (top_position - 100) && $(window).scrollTop() <= step_5_position) {
          //$('.step-list').addClass('sticky');
          $('.step-list').css('top' , ($(window).scrollTop() - top_position + 200));
        }

        if ($(window).scrollTop() >= step_1_position && $(window).scrollTop() <= step_2_position) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(0).addClass('current-step');
        } else if ($(window).scrollTop() >= step_2_position && $(window).scrollTop() <= step_3_position) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(1).addClass('current-step');
        } else if ($(window).scrollTop() >= step_3_position && $(window).scrollTop() <= step_4_position) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(2).addClass('current-step');
        } else if ($(window).scrollTop() >= step_4_position && $(window).scrollTop() <= step_5_position) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(3).addClass('current-step');
        } else if ($(window).scrollTop() >= step_5_position) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(4).addClass('current-step');
        } else if ($(window).scrollTop() >= step_5_position) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(5).addClass('current-step');
        } else if ($(window).scrollTop() >= step_5_position) {
          $('.step-list li').removeClass('current-step');
          $('.step-list li').eq(6).addClass('current-step');
        }

      });

    }

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

  // Form inputs add .checked class
  $(".rooms input").change(function() {
    $(".rooms input").parent().removeClass("checked");
    $(".rooms input:checked").parent().addClass("checked");
  });

  $(".type input").change(function() {
    $(".type input").closest("div").removeClass("checked");
    $(".type input:checked").closest("div").addClass("checked");
  });

})
