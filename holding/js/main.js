// Flower slider
$('.hero-slider').slick({
    dots: false,
    infinite: false,
    slidesToShow: 1,
    variableWidth: true,
    autoplay: true,

    prevArrow: $('.hero-slider-arrow .btn-prev'),
    nextArrow: $('.hero-slider-arrow .btn-next')
});