$(function () {

    // Scroll to anchor
    $('.nav-list a').on('click' , function(e){
        e.preventDefault();

        // close menu modal if click on link in menu
        $('#menuModal').modal('hide');

        var target = $(this).attr('href');
        $('html , body').animate({scrollTop: $(target).offset().top} , 300); // scroll to anchor

    });

    // AOS scroll animation
    AOS.init({
        once: true
    });

    // Team slider
    $('.team').slick({
        infinite: true,
        arrows: false,
        dots: false,
        variableWidth: true,
        autoplay: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        touchThreshold: 9,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1
            }
          }
        ]
    });

    // SVG animation
    // Line animation
    if ( $('#line').length != 0 ) {
        const myLine = new Vivus('line', {duration: 300 , start: 'manual'});

        const offsetScreen = 400;
        const offset = $('.we-create').offset().top - offsetScreen;
        $(window).on('scroll' , function(){

            if ($(window).scrollTop() > offset) {
                myLine.play(0);
            }

        });
    }

    // Process animation
    if ( $('#lineProcess').length != 0 ) {
        const myProcess = new Vivus('lineProcess', {duration: 300 , start: 'manual'});

        //const offsetScreen = 400;
        const offsetProcess = $('.our-approach').offset().top;
        $(window).on('scroll' , function(){

            if ($(window).scrollTop() > offsetProcess) {
                myProcess.play(0);
            }

        });
    }

});
