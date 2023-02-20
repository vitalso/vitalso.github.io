$(function () {

  // Circle animation/slider
  const slider = $('.circle-slider');
  const section = $('#circle-section');
  let blocked = false;
  let blockTimeout = null;
  let prevDeltaY = 0;

  slider.slick({
    infinite: false,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear'
  });

  section.on('mousewheel DOMMouseScroll wheel' , function(e){
    let deltaY = e.originalEvent.deltaY;
    e.preventDefault();
    e.stopPropagation();

    clearTimeout(blockTimeout);
    blockTimeout = setTimeout(function(){
      blocked = false;
    }, 50);

    
    if (deltaY > 0 && deltaY > prevDeltaY || deltaY < 0 && deltaY < prevDeltaY || !blocked) {
      blocked = true;
      prevDeltaY = deltaY;

      //e.preventDefault();
      //e.stopPropagation();

      if (deltaY > 0) {
        slider.slick('slickNext');
        $('.wrap-circle-item').removeClass (function (index, className) {
          return (className.match (/\bslide-\S+/g) || []).join(' ');
        });
        $('.wrap-circle-item').addClass('slide-' + slider.find('.slick-current.slick-active').attr('data-slick-index'));
      } else {
        slider.slick('slickPrev');
        $('.wrap-circle-item').removeClass (function (index, className) {
          return (className.match (/\bslide-\S+/g) || []).join(' ');
        });
        $('.wrap-circle-item').addClass('slide-' + slider.find('.slick-current.slick-active').attr('data-slick-index'));
      }

    }

  });

  slider.on('afterChange', function(event, slick, currentSlide) {
    if (slick.$slides.length-1 == currentSlide) {
      $('html , body').animate({
        scrollTop: $("#section-after-circle").offset().top
      }, 300);
    }

    if (currentSlide == 0) {
      $('html , body').animate({
        scrollTop: $("#section-before-circle").offset().top
      }, 300);
    }

  })

  // Card slider
  $('.card-slider').slick({
    infinite: false,
    arrows: true,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: false
        }
      }
    ]
  });

  // Card small slider
  $('.card-small-slider').slick({
    infinite: true,
    arrows: false,
    dots: false,
    autoplayspeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    pauseOnFocus: false,
    pauseOnHover: false
  });

  $('.right-slider').slick({
    infinite: true,
    arrows: false,
    dots: false,
    autoplayspeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    rtl: true
  });

  // Calculate function
  var numberResult = $('.calc-result');
  var bagsItem = $('.bags-item');
  var showProduct_3 = $('.show-bags-product-3');
  var showProduct_2 = $('.show-bags-product-2');
  var showProduct_1 = $('.show-bags-product-1');
  var showProduct_4 = $('.show-bags-product-4');
  var bags = numberResult.find('#bags');
  var squareInfo = numberResult.find('#square');

  $('.calc-form').on('submit' , function(e){
    e.preventDefault();

    var form = $(this);
    var height = form.find('input[name="height"]').val();
    var width = form.find('input[name="width"]').val();
    var long = form.find('input[name="long"]').val();

    if ( height.length !== 0 || width.length !== 0 || long.length !== 0 ) {
      var square = height*width*long;
      var bagsResult_3 = parseInt(square*5.33+1); // 5.33 it's count of bugs for one square meter
      var bagsResult_2 = parseInt(square*8); // 8 it's count of bugs for one square meter
      var bagsResult_1 = parseInt(square*5.33+1); // 5.33 it's count of bugs for one square meter
      var bagsResult_4 = parseInt(square*1); // 1 it's count of bugs for one square meter
      
      //var squareResult = parseFloat(square*0.32); // 0.32 it's count of squares for one square meter

      bags.text(bagsResult_1 + bagsResult_2 + bagsResult_3 + bagsResult_4);
      squareInfo.text(square);
      showProduct_3.text(bagsResult_3);
      showProduct_2.text(bagsResult_2);
      showProduct_1.text(bagsResult_1);
      showProduct_4.text(bagsResult_4);
      
      numberResult.removeClass('d-none');
      bagsItem.removeClass('d-none');

      console.log(height , width , long , square);
    } else {
      console.log('error');
    }

    //console.log('okay');

  });

  // AOS scroll animation
  AOS.init({
    once: true
  });

});
