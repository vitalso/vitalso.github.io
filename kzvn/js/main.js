// Mobile menu
const button = document.getElementById('menuButton');
const target = document.getElementById('menu');

if ( button ) {
  button.addEventListener('click', function() {
    target.classList.toggle('!flex');
  })
}

// Close modal
const closeButton = document.getElementsByClassName('close');
const modal = document.getElementById('modal');

if ( closeButton.length > 0 ) {
  Array.from(closeButton).forEach(button => {
    button.addEventListener('click', function() {
      modal.classList.toggle('hidden');
    });
  });
}