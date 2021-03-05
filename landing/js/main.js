$(document).ready(function() {

  // Mobile menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('.nav').toggleClass('open');
  });

  // Scroll to section
  $('.nav a').on('click' , function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, 100);
  });

})
