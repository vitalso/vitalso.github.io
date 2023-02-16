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
    adaptiveHeight: true
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
  var showBags = $('.show-bags');
  var bags = numberResult.find('#bags');
  var liter = numberResult.find('#liter');

  $('.calc-form').on('submit' , function(e){
    e.preventDefault();

    var form = $(this);
    var height = form.find('input[name="height"]').val();
    var width = form.find('input[name="width"]').val();
    var long = form.find('input[name="long"]').val();

    if ( height.length !== 0 || width.length !== 0 || long.length !== 0 ) {
      var square = height*width*long;
      var bagsResult = parseInt(square*5.33+1); // 5.33 it's count of bugs for one square meter
      var literResult = parseFloat(square*0.32); // 0.32 it's count of liters for one square meter

      bags.text(bagsResult);
      liter.text(literResult);
      showBags.text(bagsResult);
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
