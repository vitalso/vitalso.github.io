// Sidebar dropdown
const dropdown = document.getElementsByClassName('dropdown');

for (i=0; i<dropdown.length; i++) {
  dropdown[i].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.toggle('activeDropdown');
  })
}

// Sidebar on mobile
const sidebar = document.getElementById('sidebar');
const sidebarBtn = document.getElementById('toggleSidebarBtn');

// Toggle sidebar
const toggleSidebar = function() {
  sidebar.classList.toggle('-left-[248px]');
}

// Open/close sidebar when click at button
sidebarBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSidebar();
});

// Close sidebar when click at link
document.documentElement.addEventListener('click' , function(){
  if ( !sidebar.classList.contains('-left-[248px]') ) {
    toggleSidebar();
  }
});

// Table content
const tableContent = document.getElementById('tableContent');
const tableContentBtn = document.getElementById('tableContentBtn');
const tableContentBtnIcon = document.querySelector('#tableContentBtn svg');

const toggleTableContent = function() {
  tableContent.classList.toggle('hidden');
  tableContentBtnIcon.classList.toggle('rotate-90');
}

// Toggle table content
tableContentBtn.addEventListener('click' , function(e){
  e.stopPropagation();
  toggleTableContent();
  sidebar.classList.add('-left-[248px]');
});

document.documentElement.addEventListener('click' , function(){
  if ( !tableContent.classList.contains('hidden') ) {
    toggleTableContent();
  }
});