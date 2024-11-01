// FAQ toggle element
const faqItem = document.getElementsByClassName('toggleElement');

for (i=0; i<faqItem.length; i++) {
  faqItem[i].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    var toggleContent = this.getElementsByClassName('toggleContent')[0];
    var toggleIcon = this.querySelector('svg');
    
    toggleContent.classList.toggle('hidden');
    toggleIcon.classList.toggle('rotate-180');
  })
}