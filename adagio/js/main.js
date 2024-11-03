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