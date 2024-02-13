$(function () {

    // Price function
    var priceSlider = $('#priceSlider');
    var priceValue = $('.priceValue');
    var resultPrice = $('.resultPrice b');

    priceSlider.on('input' , function(){
        priceValue.text($(this).val());
        resultPrice.text(calcPrice($(this).val()));
    });

    function calcPrice(volume) {
        let pricePerItem;
      
        if (volume >= 10000) {
          pricePerItem = 14.9;
        } else if (volume >= 7500) {
          pricePerItem = 15.9;
        } else if (volume >= 5000) {
          pricePerItem = 16.9;
        } else if (volume >= 2500) {
          pricePerItem = 18.9;
        } else if (volume >= 1000) {
          pricePerItem = 21.9;
        } else if (volume >= 999) {
          pricePerItem = 24.9;
        } else {
          pricePerItem = 26.9;
        }
      
        return pricePerItem;
      }

})