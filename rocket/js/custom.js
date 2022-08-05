$(function () {

    // Select plan in modal
    $('.plan-switcher input[type="radio"]').on('click' , function(){
        $('#modal-price .current-price').text($(this).val());

        if ( $(this).is(':checked') && $(this).attr('id') == 'pay-monthly' ) {
            $('#go-to-payment').attr('href' , 'test.php?sub=monthly');
        } else {
            $('#go-to-payment').attr('href' , 'test.php?sub=annually');
        }
    });

    // Select plan on switch button
    var annuallyPrice = '30';
    var monthlyPrice = '40';

    $('#plan-price .current-price').text(annuallyPrice);
    $('#switch').on('change' , function(){
        if ( $(this).is(':checked') ) {
            $('.price-switcher .current-price').text(annuallyPrice);
            $('#change-plan').addClass('disabled').attr('href' , 'test.php?sub=annually');
        } else {
            $('.price-switcher .current-price').text(monthlyPrice);
            $('#change-plan').removeClass('disabled').attr('href' , 'test.php?sub=monthly');
        }
    });

});