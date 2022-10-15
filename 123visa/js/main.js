$(function () {

    // Mobile menu button toggle
    $('.navbar-toggler').on('click' , function(){
      $(this).toggleClass('open');
    });

    // Dropdown behavior like a <select>
    $('.dropdown-select .dropdown-menu a').on('click' , function(e){
      e.preventDefault();

      let currentOption = $(this).text();
      $(this).closest('.dropdown-select').find('button[data-bs-toggle]').text(currentOption);

    });

    // News slider
    $('.reviews-slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 3,
        //centerMode: true,
        //centerPadding: '60px',
        //variableWidth: true,
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

    // Button collapse change the class
    $('.btn-collapse').on('click' , function(){
      $(this).toggleClass('show');
    });

});
