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

});
