$(function () {

  // Mobile toggle menu
  $('.sidebar-nav a').on('click' , function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $('.submenu').toggleClass('open');
  });

});
