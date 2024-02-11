// Flower slider
$('.flower-slider').slick({
    dots: false,
    infinite: false,
    slidesToShow: 1,
    variableWidth: true,
    prevArrow: $('.flower-section-header .btn-prev'),
    nextArrow: $('.flower-section-header .btn-next')
});

// Reviews slider
$('.reviews-slider').slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow: $('.reviews-header .btn-prev'),
    nextArrow: $('.reviews-header .btn-next')
});

$('.photo-owners-slider').slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    variableWidth: true,
    prevArrow: $('.photo-owners-btn .btn-prev'),
    nextArrow: $('.photo-owners-btn .btn-next')
});