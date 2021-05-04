$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
  });

  // Parallax effect for inner intro section
  var top_position = $('.how-study').offset().top - $('.how-study').height()*3-300;

  $(window).on('scroll' , function() {

    if ( $(window).scrollTop() >=  top_position) {
      $('.how-study').addClass('transition');
    } else {
      //$('.how-study').removeClass('transition');
    }

    // Change position of image intro
    //$('.hero-person').css('top' , - $(window).scrollTop()*0.3);
    //$('.hero-bg').css('top' , - $(window).scrollTop()*0.2);
    $('.teachers-img img').css({
        //'transform': 'rotate(' + ($(window).scrollTop() / $('.teachers').height() * 30) + 'deg)' , 'left' : $(window).scrollTop()*0.07 , 'top' : $(window).scrollTop()*0.01
        'transform': 'rotate(' + ($(window).scrollTop() / $('.teachers').height() * 290) + 'deg)'
    });

  });

  // Example of works slider
  $('.example-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Custom carousel nav
  $('button.prev').click(function(){
    $('.example-slider').slick('slickPrev');
    //$(this).removeClass('active');
    //$('button.next').addClass('active');
  });

  $('button.next').click(function(){
    $('.example-slider').slick('slickNext');
    //$(this).removeClass('active');
    //$('button.prev').addClass('active');
  });

  // FAQ
  $('.faq-item').on('click' , function() {
    $(this).toggleClass('open');
    $(this).find('p').slideToggle();
  });

  $('.popup-modal').magnificPopup({
    type: 'inline',
    preloader: false,
    fixedContentPos: false,
    modal: false
  });

  // Animation when scroll page
  /*var slideUp = {
    distance: '100%',
    origin: 'bottom',
    delay: '300',
    duration: '400',
    easing: 'ease-in',
    mobile: false,
    opacity: null
  };

  if ($(window).width() < 991) {
    sr.destroy()
  } else {
    ScrollReveal().reveal('.animated' , slideUp);
  }

  $(window).on('resize' , function(){
    if ($(window).width() < 991) {
      sr.destroy()
    }
  });*/

});
