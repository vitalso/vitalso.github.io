$(function () {

    // Mobile menu button toggle
    $('.navbar-toggler').on('click' , function(){
      $(this).toggleClass('open');
    });

    // Browser slider
    var topPosition = $('#browser-step').offset().top;
    $(window).on('scroll' , function(){
      if ( !topPosition.length ) {
        
        if ( $(window).scrollTop() >= topPosition ) {
          $('.browser-slider').slick({
            infinite: false,
            arrows: false,
            dots: false,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 800,
            speed: 200,
            pauseOnFocus: false,
            pauseOnHover: false,
            touchMove: false,
            autoplay: true
          });

          $('.browser-slider').on('afterChange' , function(event , slick , currentSlide){
            var currentElement = $(this).slick('slickCurrentSlide');
            //console.log(currentElement);
            if (currentElement == 3) {
              //$(this).slick('unslick');
              $(this).slick({
                autoplay: false,
                infinite: false
              });
              //$(this).slick('unslick');
            }
          });
    
        }
      
      }

    });

    // AOS scroll animation
    AOS.init({
      once: true
    });

});
