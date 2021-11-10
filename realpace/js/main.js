$(function () {

  // Language dropdown
  $('.current-language').on('click' , function(e){
    e.preventDefault();
    $(this).next('.list-language').toggle();
  });

  $('.list-language a').on('click' , function(e){
    e.preventDefault();
    $(this).closest('.list-language').hide();
  });

  // Mobile toggle menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('header nav').toggleClass('open');
    $('body').toggleClass('overflow-hidden');
  });

  // Slider in Team section
  $('.team-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

});
