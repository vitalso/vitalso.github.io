// Mobile menu
$('.btn-menu').on('click' , function(){
    $('header nav').toggleClass('d-md-none open');
    $(this).toggleClass('active');
});