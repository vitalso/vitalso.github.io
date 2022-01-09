$(function () {

  // Mobile toggle menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('header nav').toggleClass('open');
    $('body').toggleClass('overflow-hidden');
  });

  // Smooth scroll
  $('header nav a').on('click' , function(){
    $('header nav , .toggle-nav').removeClass('open');
    $('body').removeClass('overflow-hidden');
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().top}, 500);
  });

  // Graphic effects
  var graphicTopPosition = $('#process').offset().top;
  var firstStep = $('.wrap-graphic ul li:nth-child(3)');
  $(window).on('scroll' , function(){

    if ( $(window).scrollTop() >= graphicTopPosition/2 ) {
      $('#process').addClass('animation');
      $(firstStep).delay(2500).queue('fx', function() { $(this).addClass('active'); $('.wrap-graphic ul li:nth-child(1)').addClass('scalling') });
    } else {
      $('#process').removeClass('animation');
    }

  });

  $('.wrap-graphic ul li').on('click' , function(){
    $(this).removeClass('scalling');
    $('.wrap-graphic .graphic-logo').addClass('active');
    $(this).toggleClass('active');
  });

  // Higlight number on scroll
  var countItem = $('.number-wrap .number-item').length;
  var heightItem = $('.number-wrap').height() / countItem - 50;
  var topPosition = $('.number-wrap').offset().top;

  $(window).on('scroll' , function(){

    var scroll = $(window).scrollTop();

    if ( scroll >= topPosition) {
      $('.number-wrap .number-item').removeClass('active');
      $('.number-wrap .number-item').eq(0).addClass('active');
    }

    if ( scroll >= (topPosition + heightItem) && scroll <= (topPosition + heightItem*2) ) {
      $('.number-wrap .number-item').removeClass('active');
      $('.number-wrap .number-item').eq(1).addClass('active');
    }

    if ( scroll >= (topPosition + heightItem*2) && scroll <= (topPosition + heightItem*3) ) {
      $('.number-wrap .number-item').removeClass('active');
      $('.number-wrap .number-item').eq(2).addClass('active');
    }

    if ( scroll >= (topPosition + heightItem*3) && scroll <= (topPosition + heightItem*4) ) {
      $('.number-wrap .number-item').removeClass('active');
      $('.number-wrap .number-item').eq(3).addClass('active');
    }

    if ( scroll >= (topPosition + heightItem*4) && scroll <= (topPosition + heightItem*5) ) {
      $('.number-wrap .number-item').removeClass('active');
      $('.number-wrap .number-item').eq(4).addClass('active');
    }

    if ( scroll >= (topPosition + heightItem*5) && scroll <= (topPosition + heightItem*6) ) {
      $('.number-wrap .number-item').removeClass('active');
      $('.number-wrap .number-item').eq(5).addClass('active');
    }

    if ( scroll >= (topPosition + heightItem*6) && scroll <= $('#about').offset().top ) {
      $('.number-wrap .number-item').removeClass('active');
      $('.number-wrap .number-item').eq(6).addClass('active');
    }

  });

});
