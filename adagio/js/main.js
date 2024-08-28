$(function () {

    $('.slider').slick({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-label',
    });

    $('.slider-label').slick({
        arrows: false,
        centerMode: true,
        //slidesToShow: 4,
        centerPadding: '20px',
        variableWidth: true,
        asNavFor: '.slider',
    });

    $('.next-btn').on('click' , function(){
        $('.slider').slick("slickNext");
    });

    $('.prev-btn').on('click' , function(){
        $('.slider').slick("slickPrev");
    });

    $('.slider-label .slick-slide').on('click' , function(){
        var slide = $(this).attr('data-slick-index');
        $('.slider').slick('slickGoTo' , slide);
    })

});