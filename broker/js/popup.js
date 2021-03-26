$(document).ready(function() {

  $('.close-popup').on('click' , function(e){
    e.preventDefault();

    $('.popup').hide();
  });

  //setTimeout($('.popup').hide(), 3000);

  var popup_timer = 30;
  setTimeout(countDown,1000);

  function countDown(){
    popup_timer--;
   if(popup_timer > 0){
      setTimeout(countDown,1000);
   } else {
    $('.popup').hide();
   }
   $('.popup-action span b').text(popup_timer);
  }

})
