$(function () {

    // Mobile menu button toggle
    $('.navbar-toggler').on('click' , function(){
      $(this).toggleClass('open');
    });

    // AOS scroll animation
    AOS.init({
      once: true
    });

    // Browser slider
    $('.how-item[data-slide]').click(function(e) {
      e.preventDefault();
      var slideno = $(this).data('slide');
      $('.browser-slider').slick('slickGoTo', slideno - 1);
      $('.how-item[data-slide]').removeClass('active').addClass('not-active');
      $(this).addClass('active').removeClass('not-active');
    });

    var element = $('#browser-step');
    if ( element.length ) {
      var topPosition = element.offset().top;

      $(window).on('scroll' , function(){
      
        if ( $(window).scrollTop() >= topPosition ) {
          $('.browser-slider').not('.slick-initialized').slick({
            infinite: false,
            arrows: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 500,
            speed: 800,
            pauseOnFocus: false,
            pauseOnHover: false,
            autoplay: true
          });
      
          $('.browser-slider').on('afterChange' , function(event , slick , currentSlide){
            var currentElement = $(this).slick('slickCurrentSlide');
            if (currentElement == 3) {
              $(this).slick('slickPause');
            }
          });

          AOS.init({
            once: true
          });
    
        }
      
      });

    };

});
