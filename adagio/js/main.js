// Mobile menu
const button = document.getElementById('menu');
const target = document.getElementById('header');

if ( button ) {
  button.addEventListener('click', function() {
    target.classList.toggle('mobile-header');
  })
}

// Watch Demo popup
const watchDemoButton = document.getElementById('watch-demo');
const watchDemoPopup = document.getElementById('watch-demo-popup');
const iframe = document.querySelector('#watch-demo-popup iframe');

if ( watchDemoButton ) {
  watchDemoButton.addEventListener('click', function() {
    watchDemoPopup.classList.add('!visible' , '!opacity-100');
  })
}

if ( watchDemoPopup ) {
  watchDemoPopup.addEventListener('click', function(event) {
    if (event.target === watchDemoPopup) {
      stopVideo();
      watchDemoPopup.classList.remove('!visible', '!opacity-100');
    }
  })
}

function stopVideo() {
  const videoUrl = iframe.src;
  iframe.src = '';
  iframe.src = videoUrl;
}

// Toogle password for Signup/Login page
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
}

document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('.toggle-password');

  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      // this.textContent = type === 'password' ? 'Show' : 'Hide';
    });
  });
});

// Slider
const slideLabel = document.querySelectorAll('#sliderLabel input[type="radio"]');
const slideItem = document.querySelectorAll('#slider li');

if (slideLabel.length > 0 && slideItem.length > 0) {
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

}

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