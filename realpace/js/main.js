$(function () {

  // Language dropdown
  $('.current-language').on('click' , function(e){
    e.preventDefault();
    $(this).next('.list-language').toggle();
  });

  $('.list-language a').on('click' , function(e){
    e.preventDefault();
    $(this).closest('.list-language').hide();
  });

  // Mobile toggle menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('header nav').toggleClass('open');
    $('body').toggleClass('overflow-hidden');
  });

  // Typewritter effect on hero section title
  /*var quoteArray = ["Visionär?"];
  var textPosition = 0;
  // speed in milliseconds
  var speed = 100;
  typewriter = () => {
    document.querySelector("#type").innerHTML = quoteArray[0].substring(0, textPosition);

    if(textPosition++ != quoteArray[0].length)
      setTimeout(typewriter, speed);
  }

  window.addEventListener("load", typewriter)*/

  // Fade in transition for numbers
  var top_position_number = $('.number-wrap').offset().top - 100;

  $(window).on('scroll' , function() {

    if ( $(window).scrollTop() >=  top_position_number) {
      $('.number-wrap').addClass('transition');
    }

    // Sticky header
    if ( $(window).scrollTop() >= 1 ) {
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }

  });

  // Slider in Team section
  $('.team-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  $('.team-slider').on('beforeChange', function (event, slick, currentSlide) {
    $('.team').addClass('ms-3');
  })

});
