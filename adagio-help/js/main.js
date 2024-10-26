const dropdown = document.getElementsByClassName('dropdown');

for (i=0; i<dropdown.length; i++) {
  dropdown[i].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.toggle('activeDropdown');
  })
}