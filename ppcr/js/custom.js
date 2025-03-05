$(document).ready(function() {
    var count = $('.hidden-accounts > div').length;
    $('.count-hidden-accounts').text(count)

    $('.more-accounts').on('click', function (e) {
        e.preventDefault();
        var box = $(this).closest('div');
        var button = $(this)
        var content = box.prev('.hidden-accounts');
        content.slideToggle(200);
        if (content.is(':visible')) {
            button.find('span').text('Less');
        } else {
            button.find('span').text('More');
        }
        setTimeout(function () {
            box.resize();
        }, 50);
    });
})