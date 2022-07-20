$(function () {

  // Blog slider on index page
  $('.blog-slider').slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1
    /*responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]*/
  });

  // History slider
  $('.history-slider').slick({
    infinite: true,
    arrows: true,
    dots: false,
    centerMode: true,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.prev'),
    nextArrow: $('.next')
    /*responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]*/
  });

  // AOS scroll animation
  AOS.init();

});
