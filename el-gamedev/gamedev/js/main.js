$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
  });

  // Parallax effect for inner intro section
  $(window).on('scroll' , function() {

    // Change position of image intro
    $('.hero-person').css('top' , - $(window).scrollTop()*0.3);
    //$('.hero-bg').css('top' , - $(window).scrollTop()*0.2);

  });

  var movementStrength = 25;
  var height = movementStrength / $(window).height();
  var width = movementStrength / $(window).width();
  $(".intro").mousemove(function(e){
            var pageX = e.pageX - ($(window).width() / 2);
            var pageY = e.pageY - ($(window).height() / 2);
            var newvalueX = width * pageX * -1;
            var newvalueY = height * pageY * -1;
            $('.hero-person').css("top", newvalueX+"px");
            $('.hero-person').css("left", newvalueY+"px");

            //$('.hero-bg').css("bottom", newvalueX*0.2+"px");
            $('.hero-bg').css("right", newvalueY*1.2+"px");

            $('.hero-figure').css("top", newvalueX*1.7+"px");
            $('.hero-figure').css("right", newvalueY*1.7+"px");
  });

  // Example of works slider
  $('.example-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
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

  // Custom carousel nav
  $('button.prev').click(function(){
    $('.example-slider').slick('slickPrev');
    //$(this).removeClass('active');
    //$('button.next').addClass('active');
  });

  $('button.next').click(function(){
    $('.example-slider').slick('slickNext');
    //$(this).removeClass('active');
    //$('button.prev').addClass('active');
  });

  // FAQ
  $('.faq-item').on('click' , function() {
    $(this).toggleClass('open');
    $(this).find('p').slideToggle();
  });

  // Popup with video
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true
  });

  $('.popup-modal').magnificPopup({
    type: 'inline',
    preloader: false,
    modal: false
  });

});
