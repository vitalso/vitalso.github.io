$(function () {

    // Mobile menu button toggle
    $('.navbar-toggler').on('click' , function(){
      $(this).toggleClass('open');
    });

    // Hero section slider
    $('.hero-slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    // News slider
    $('.news-slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  vertical: true,
                  dots: false,
                  swipe: false
                }
              }
          ]
    });

    $('.news-slider-large').slick({
      infinite: true,
      arrows: false,
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                vertical: true,
                dots: false,
                swipe: false
              }
            }
        ]
  });

});
