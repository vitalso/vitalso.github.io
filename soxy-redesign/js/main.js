$(function () {

  // Mobile toggle menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('header .main-nav').toggleClass('open');
    $('body').toggleClass('overflow-hidden');
  });

  // Popup
  $('.open-popup').magnificPopup({
    type:'inline',
    fixedContentPos: true
  });

});
