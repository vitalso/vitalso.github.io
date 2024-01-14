
$(document).ready(function(){

    // Init the slider
    var slider = $('.interactive-slider');
    slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // Arrow slider
    $('.slider-arrow .slide-prev').on('click' , function(){
        slider.slick('slickPrev');
    });

    $('.slider-arrow .slide-next').on('click' , function(){
        slider.slick('slickNext');
    });

    // Click on items
    $('.interactive-list a').on('click' , function(e){
        e.preventDefault();
        
        var dataSlide = $(this).data('slide');
        slider.slick('slickGoTo' , dataSlide);
    });

});