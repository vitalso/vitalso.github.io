var menuBtn = document.getElementById('menu-btn');
var closeBtn = document.getElementById('close-btn');

menuBtn.addEventListener('click' ,() => {

    document.querySelector('.sidebar').classList.toggle('!left-0');
    document.querySelector('.overlay').classList.toggle('!block');
    document.querySelector('.new-chat').classList.toggle('!left-0');
    document.querySelector('.mobile-user').classList.toggle('!left-0');
    
});

closeBtn.addEventListener('click' ,() => {

    document.querySelector('.sidebar').classList.toggle('!left-0');
    document.querySelector('.overlay').classList.toggle('!block');
    document.querySelector('.new-chat').classList.toggle('!left-0');
    document.querySelector('.mobile-user').classList.toggle('!left-0');
    
});