$(function () {

    // Show tracking in header on scroll
    var position = $('.hero-section').offset().top;
    var headerTracking = $('.header-tracking');
    
    $(window).on('scroll' , function(){

        if ( $(window).scrollTop() > position ) {
            headerTracking.removeClass('d-none');
            $('header').addClass('small');
        } else {
            headerTracking.addClass('d-none');
            $('header').removeClass('small');
        }

    });

    // Show input on mobile
    headerTracking.find('button').on('click' , function(){
        headerTracking.toggleClass('open');
    });

})