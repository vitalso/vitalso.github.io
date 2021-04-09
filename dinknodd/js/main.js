$(window).on('load' , function(){

  setTimeout(removeLoader, 1500);

  function removeLoader() {
    $( ".preloader" ).fadeOut(500);
    $('body').removeClass('overflow-y');
  }

})

$(document).ready(function() {

  // Mobile menu
  $('.toggle-nav').on('click' , function(){
    $(this).toggleClass('open');
    $('.nav-mobile').toggleClass('open');
  });

  // Scroll to section
  $('.scroll-btn').on('click' , function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, 100);
  });

  // Product slider
  $('.products-slider , .category-slider , .popular-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false
  });

  $('.products-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    // finally let's do this after changing slides
    //$('.slider-count #current').html(currentSlide+1);
    if (currentSlide >= 1) {
      $('.products-mobile .product-slider-nav .prev-slide').addClass('active');
    } else {
      $('.products-mobile .product-slider-nav .prev-slide').removeClass('active');
    }

    if (currentSlide >= 5) {
      $('.products-mobile .product-slider-nav .next-slide').removeClass('active');
    } else {
      $('.products-mobile .product-slider-nav .next-slide').addClass('active');
    }

  });

  $('.products-mobile .product-slider-nav .prev-slide').click(function(e) {
    $('.products-slider').slick('slickPrev');
  });

  $('.products-mobile .product-slider-nav .next-slide').click(function(e) {
    $('.products-slider').slick('slickNext');
  });

  $('.category-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    // finally let's do this after changing slides
    //$('.slider-count #current').html(currentSlide+1);
    if (currentSlide >= 1) {
      $('.category-mobile .product-slider-nav .prev-slide').addClass('active');
    } else {
      $('.category-mobile .product-slider-nav .prev-slide').removeClass('active');
    }

    if (currentSlide >= 8) {
      $('.category-mobile .product-slider-nav .next-slide').removeClass('active');
    } else {
      $('.category-mobile .product-slider-nav .next-slide').addClass('active');
    }

  });

  $('.category-mobile .product-slider-nav .prev-slide').click(function(e) {
    $('.category-slider').slick('slickPrev');
  });

  $('.category-mobile .product-slider-nav .next-slide').click(function(e) {
    $('.category-slider').slick('slickNext');
  });

  $('.popular-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    // finally let's do this after changing slides
    //$('.slider-count #current').html(currentSlide+1);
    if (currentSlide >= 1) {
      $('.popular-mobile .product-slider-nav .prev-slide').addClass('active');
    } else {
      $('.popular-mobile .product-slider-nav .prev-slide').removeClass('active');
    }

    if (currentSlide >= 5) {
      $('.popular-mobile .product-slider-nav .next-slide').removeClass('active');
    } else {
      $('.popular-mobile .product-slider-nav .next-slide').addClass('active');
    }

  });

  $('.popular-mobile .product-slider-nav .prev-slide').click(function(e) {
    $('.popular-slider').slick('slickPrev');
  });

  $('.popular-mobile .product-slider-nav .next-slide').click(function(e) {
    $('.popular-slider').slick('slickNext');
  });

  $('.faq-item').on('click' , function() {
    $(this).toggleClass('open');
  });

})
