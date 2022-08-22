const cookie = document.getElementById('cookie'),
  cookieBtnToggle = document.querySelector('.cookie-btn-toggle'),
  cookieClassShow = 'cookie_show',
  cookieLS = localStorage.getItem('cookie');


if (cookie) {
  if (!cookieLS) {
    cookie.classList.add(cookieClassShow);
  }

  cookieBtnToggle.addEventListener('click', () => {
    cookie.classList.remove(cookieClassShow);
    localStorage.setItem('cookie', new Date().getTime());
  });
}