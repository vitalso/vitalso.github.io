// Mobile menu
$('.btn-menu').on('click' , function(){
    $('header nav').toggleClass('d-md-none open');
    $(this).toggleClass('active');
});

// Scroll to Flower section
$('.flower-btn').on('click' , function(e){
    e.preventDefault();
    
    $('html, body').animate({
        scrollTop: $('#flower-section').offset().top
    }, 1000);
});