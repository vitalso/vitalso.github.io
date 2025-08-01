// Mobile menu
const button = document.getElementById('menuButton');
const target = document.getElementById('menu');

if ( button ) {
  button.addEventListener('click', function() {
    target.classList.toggle('!flex');
  })
}