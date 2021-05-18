$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
  });

  // Stream toggle cover
  $('.stream-list a').on('click' , function(e){
    e.preventDefault();
    var index = $(this).closest('li').index();
    $('.stream-list a').removeClass('current-item');
    $(this).addClass('current-item');
    $('.stream-cover').hide();
    $('.stream-cover').eq(index).show();
  });

  // Example of works slider
  $('.clients-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Play after click
  $('.video button').click(function(e){
    $('.video iframe')[0].src += '&autoplay=1';
    $('.img-cover').css('opacity' , 0);
    $(this).hide();
    e.preventDefault();
  });

});
