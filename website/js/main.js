$(document).ready(function() {

  // Mobile menu
  $('.toggle-nav').on('click' , function(){
    $('.side-nav').addClass('open');
  });

  $('.close-side-nav').on('click' , function(){
    $('.side-nav').removeClass('open');
  });

  // Scroll to section
  /*$('.nav a').on('click' , function(e){
    e.preventDefault();
    $(this).closest('.nav').removeClass('open');
    var href = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, 100);
  });*/

  $('.close-coockie').on('click' , function(e){
    e.preventDefault();
    $(this).closest('.coockie').hide();
  });

  // Scroll section on Odds page
  $('.odds-lines').on('scroll', function () {
    $('.last-column , .odds-lines').scrollLeft($(this).scrollLeft());
  });

  // Mobile option in Odds
  $('.first .toggle').on('click' , function(){
    $(this).closest('.odds-row').find('.odds-mobile.first').toggleClass('open');
    $(this).toggleClass('open');
  });

  $('.second .toggle').on('click' , function(){
    $(this).closest('.odds-row').find('.odds-mobile.second').toggleClass('open');
    $(this).toggleClass('open');
  });

})
