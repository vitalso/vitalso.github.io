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
    slidesToScroll: 1
  });

  section.on('mousewheel DOMMouseScroll wheel' , function(e){
    let deltaY = e.originalEvent.deltaY;
    //e.preventDefault();
    //e.stopPropagation();

    clearTimeout(blockTimeout);
    blockTimeout = setTimeout(function(){
      blocked = false;
    }, 50);

    
    if (deltaY > 0 && deltaY > prevDeltaY || deltaY < 0 && deltaY < prevDeltaY || !blocked) {
      blocked = true;
      prevDeltaY = deltaY;

      e.preventDefault();
      e.stopPropagation();

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

  })

});
