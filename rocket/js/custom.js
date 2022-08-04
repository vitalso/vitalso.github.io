$(function () {

    // Select plan in modal
    $('.plan-switcher input[type="radio"]').on('click' , function(){
        $('#modal-price .current-price').text($(this).val());
    });

    // Select plan on switch button
    var annuallyPrice = '30';
    var monthlyPrice = '40';

    $('#plan-price .current-price').text(annuallyPrice);
    $('#switch').on('change' , function(){
        if ( $(this).is(':checked') ) {
            $('.price-switcher .current-price').text(annuallyPrice);
            $('#change-plan').addClass('disabled').attr('href' , 'test.php?sub=annually');;
            $('.plan-switch').closest('.ibox-content').find('.alert').addClass('d-none');
        } else {
            $('.price-switcher .current-price').text(monthlyPrice);
            $('#change-plan').removeClass('disabled').attr('href' , 'test.php?sub=monthly');
            $('.plan-switch').closest('.ibox-content').find('.alert').removeClass('d-none');
        }
    });

});