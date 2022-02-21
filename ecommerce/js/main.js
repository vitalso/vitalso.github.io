$(function () {

  // Mobile toggle menu
  /*$('.toggle-nav').on('click' , function(){
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
  });*/

  // Validate form
  $('#login-form').validate({
    errorClass: "error error-label",
    messages : {
      login: {
        required: "Введено невірну адресу ел. пошти або номер телефону"
      },

      password: {
        required: "Поле обов`язкове для заповнення"
      }
    }
  });

  $('#signup-form').validate({
    errorClass: "error error-label",
    messages : {
      name: {
        required: "Введіть своє ім'я кирилицею"
      },

      surname: {
        required: "Введіть своє прізвище кирилицею"
      },

      phone: {
        required: "Введіть номер мобільного телефону"
      },

      phone: {
        required: "Введіть номер мобільного телефону"
      },

      email: {
        required: "Введіть свою ел. пошту"
      },

      password: {
        required: "Поле обов`язкове для заповнення"
      }
    }
  });

  // Slick slider
  $('.index-slider').slick({
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });

  // Popup
  $('.open-popup').magnificPopup({
    type:'inline',
    showCloseBtn: false
  });

  // Toogle input password
  $('.form-show-password').on('click' , function(e){
    e.preventDefault();

    let passwordInput = $(this).closest('div').find('input');

    if ( passwordInput.attr('type') == 'password' ) {
      passwordInput.prop('type' , 'text');
    } else {
      passwordInput.prop('type' , 'password');
    }

  });

});
