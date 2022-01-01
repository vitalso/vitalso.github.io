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
