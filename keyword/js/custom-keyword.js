$(document).ready(function(){

  // Start steps
  $("#wizard").steps();

  // Number input
   $("input[name='maxKeyword']").TouchSpin();

  // Wsitch input
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

  elems.forEach(function(html) {
    var switchery = new Switchery(html);
  });

  // iCheck radiobutton
  $('.icheck-input').iCheck({
    checkboxClass: 'icheckbox_square',
    radioClass: 'iradio_square-green',
    increaseArea: '20%' // optional
  });

  // Structure switch
  $('.structure-list li').on('click' , function(){
    $('.structure-list li').removeClass('active-structure');
    $('.structure-list li').find('.iradio_square-green').removeClass('checked');
    $(this).addClass('active-structure');
    $(this).find('.iradio_square-green').addClass('checked');
  });

  // Select Step 1 choose the campaign
  $('#choose-campaign').on('change' , function(){
    var $option = $(this).find('option:selected');
    var value = $option.val();

    $('.choosen-radio-group ul').addClass('d-none');
    $('.choosen-radio-group').find('#' + value).removeClass('d-none');
    console.log(value);
  });

});