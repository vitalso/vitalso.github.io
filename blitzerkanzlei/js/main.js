// Fixed header on scroll
const siteHeader = document.getElementById('header');
const siteHeaderHeight = siteHeader.offsetHeight;

window.addEventListener('scroll', () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    if(top > siteHeaderHeight) {
        siteHeader.classList.add('fixed');
    } else {
        siteHeader.classList.remove('fixed');
    }
}, false);

// AOS animation
AOS.init();