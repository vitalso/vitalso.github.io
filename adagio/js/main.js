// Slider
const slideLabel = document.querySelectorAll('#sliderLabel input[type="radio"]');
const slideItem = document.querySelectorAll('#slider li');
let currentIndex = 0;
let autoPlayInterval;
const autoPlayDelay = 5000;

// Change active element
function changeSlide() {
  slideItem.forEach((item) => {
    item.classList.remove('!block');
  });
  slideLabel.forEach((label) => {
    label.checked = false;
  });

  // Show active element and set checked for input[radio]
  slideItem[currentIndex].classList.add('!block');
  slideLabel[currentIndex].checked = true;

  currentIndex = (currentIndex + 1) % slideItem.length;
}

changeSlide();

// When click on tab
function restartAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(changeSlide, autoPlayDelay);
}

autoPlayInterval = setInterval(changeSlide, autoPlayDelay);

// Show slide after click on tab
slideLabel.forEach((label, index) => {
  label.addEventListener('change', function () {
    currentIndex = index;
    changeSlide();
    restartAutoPlay();
  });
});

// FAQ toggle element
const items = document.querySelectorAll('.toggleElement');
const itemTitle = document.querySelectorAll('.toggleElement h4');

for (i=0; i<itemTitle.length; i++) {
  itemTitle[i].addEventListener('click', function () {

    if ( !this.parentNode.classList.contains('open') ) {
      items.forEach((item) => {
        item.classList.remove('open');
      });
      this.parentNode.classList.add('open');
    } else {
      this.parentNode.classList.remove('open');
    }
    
  })
}