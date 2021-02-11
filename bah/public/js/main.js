$(document).ready(function() {

  // Slick slider - Gallery pack
  $('.gallery-pack ul').slick({
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 10000,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: false,
    arrows: false
  });

  // Scroll Reveal - effects when scroll page
  ScrollReveal().reveal('.animated' , { delay: 500 , distance: '100px' });

  // Scroll configure section
  $('.side-scrolling.left ul').slick({
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: false,
    arrows: false,
    vertical: true
  });

  $('.side-scrolling.right ul').slick({
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: false,
    arrows: false,
    vertical: true
    //verticalReverse: true
  });

  // Toogle class button menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('.nav').toggleClass('open');
  });

  // Popup
  /*$('.phone-popup').magnificPopup({
    type: 'inline',
    preloader: false,
    modal: false
  });*/

  // Scrool
  $(window).on('scroll' , function() {

    // Change background when scroll to section #Preveliges
    if ($(window).scrollTop() >= $('#preveliges').offset().top) {
      $('#preveliges').addClass('bg-change');
    }

    // Rotate square colorful cards when scroll
    var currentScroll = Number(Math.trunc($(window).scrollTop() / 200));

    $('.square.first-orange').css({ transform: 'rotate(-' + (currentScroll - 15) + 'deg)' });
    $('.square.blue').css({ transform: 'rotate(-' + (currentScroll - 10 ) + 'deg)' });
    $('.square.grey-color').css({ transform: 'rotate(' + (currentScroll - 5 ) + 'deg)' });
    $('.square.second-green').css({ transform: 'rotate(-' + (currentScroll - 13 ) + 'deg)' });
    $('.square.light-green').css({ transform: 'rotate(' + (currentScroll - 20 ) + 'deg)' });
    $('.square.last-orange').css({ transform: 'rotate(-' + (currentScroll - 15 ) + 'deg)' });

  });

})
