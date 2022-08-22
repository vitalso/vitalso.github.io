const reviews = document.querySelector('.reviews'),
  reviewsSwiper = document.getElementById('reviews-swiper'),
  reviewsPrev = reviews.querySelector('.reviews__button-prev'),
  reviewsNext = reviews.querySelector('.reviews__button-next'),
  reviewsPagination = reviews.querySelector('.reviews__pagination');



document.addEventListener('DOMContentLoaded', () => {
  if (reviewsSwiper) {
    new Swiper(reviewsSwiper, {
      spaceBetween: 16,
      slidesPerView: 1,
      grid: {
        fill: 'row',
        rows: 2,
      },
      pagination: {
        el: reviewsPagination,
        clickable: true
      },
      navigation: {
        nextEl: reviewsNext,
        prevEl: reviewsPrev
      },
      breakpoints: {
        319: {
          // slidesPerView: 2,
          // slidesPerGroup: 4,
          spaceBetween: 12,
        },
        640: {
          // slidesPerView: 1,
          spaceBetween: 16,
        }
      },

    });
  }
});