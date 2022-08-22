let header = document.getElementById('header'),
  ham = document.getElementById('ham'),
  classIsActive = 'is-active',
  headerItems = header.querySelectorAll('.header__item'),
  headerItemCurrent = null;


ham.addEventListener('click', () => {
  header.classList.toggle(classIsActive);
  ham.classList.toggle(classIsActive);
});

headerItems.forEach((headerItem) => {
  headerItem.addEventListener('click', () => {
    if (headerItemCurrent) {
      headerItemCurrent.classList.remove(classIsActive);
    }

    /*if (headerItemCurrent == headerItem) {
      headerItemCurrent = null;
      return false;
    }*/

    headerItemCurrent = headerItem;
    headerItemCurrent.classList.add(classIsActive);
  });
});

document.addEventListener('click', (e) => {
  if (headerItemCurrent && !e.target.closest('.header__item.is-active')) {
    headerItemCurrent.classList.remove(classIsActive);
    headerItemCurrent = null;
  }

  if (ham.classList.contains(classIsActive) && !e.target.closest('.header')) {
    header.classList.remove(classIsActive);
    ham.classList.remove(classIsActive);
  }
});