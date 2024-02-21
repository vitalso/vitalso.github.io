$(function () {

  // Price function
  var priceSlider = $('#priceSlider');
  var priceValue = $('.priceValue');
  var resultPrice = $('.resultPrice b');

  var handWritted = $('.handWritted');
  var handWrittedPrice = handWritted.find('b').text();

  var stamp1 = $('.stamp1');
  var stamp2 = $('.stamp2');
  var stamp3 = $('.stamp3');
  var stamp4 = $('.stamp4');
  var stamp5 = $('.stamp5');
  var stamp6 = $('.stamp6');

  priceSlider.on('input' , function(){
      priceValue.text($(this).val());
      resultPrice.text(calcPrice($(this).val()));
      
      resultPrice.next('span').text('kr');
      
      handWritted.find('span').text('kr');

      stamp1.text(6.8 + ' kr');
      stamp2.text(15.3 + ' kr');
      stamp3.text(9.2 + ' kr');
      stamp4.text(6.8 + ' kr');
      stamp5.text(28.4 + ' kr');
      stamp6.text(15 + ' kr');
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

    // Convert currency
    var btn = $('.currency-btn');
    var convertedPrice = 0;

    var indexUSD = 0.096;
    var indexGBP = 0.076;
    var indexEUR = 0.084;

    var currentPrice = resultPrice.text();

    btn.on('click' , function(){
      
      var dataCurrency = $(this).data('currency');
      
      if ( dataCurrency == 'USD' ) {
        convertedPrice = (currentPrice * indexUSD).toFixed(2);
        resultPrice.text(convertedPrice);
        $('.resultPrice span').text('$');

        handWritted.find('b').text((handWrittedPrice * indexUSD).toFixed(2));
        handWritted.find('span').text('$');

        stamp1.text((6.8 * indexUSD).toFixed(2) + ' $');
        stamp2.text((15.3 * indexUSD).toFixed(2) + ' $');
        stamp3.text((9.2 * indexUSD).toFixed(2) + ' $');
        stamp4.text((6.8 * indexUSD).toFixed(2) + ' $');
        stamp5.text((28.4 * indexUSD).toFixed(2) + ' $');
        stamp6.text((15 * indexUSD).toFixed(2) + ' $');
      }
      
      if ( dataCurrency == 'EUR' ) {
        convertedPrice = (currentPrice * indexEUR).toFixed(2);
        resultPrice.text(convertedPrice);
        $('.resultPrice span').text('€');

        handWritted.find('b').text((handWrittedPrice * indexEUR).toFixed(2));
        handWritted.find('span').text('€');

        stamp1.text((6.8 * indexEUR).toFixed(2) + ' €');
        stamp2.text((15.3 * indexEUR).toFixed(2) + ' €');
        stamp3.text((9.2 * indexEUR).toFixed(2) + ' €');
        stamp4.text((6.8 * indexEUR).toFixed(2) + ' €');
        stamp5.text((28.4 * indexEUR).toFixed(2) + ' €');
        stamp6.text((15 * indexEUR).toFixed(2) + ' €');
      }

      if ( dataCurrency == 'GBP' ) {
        convertedPrice = (currentPrice * indexGBP).toFixed(2);
        resultPrice.text(convertedPrice);
        $('.resultPrice span').text('£');

        handWritted.find('b').text((handWrittedPrice * indexGBP).toFixed(2));
        handWritted.find('span').text('£');

        stamp1.text((6.8 * indexGBP).toFixed(2) + ' £');
        stamp2.text((15.3 * indexGBP).toFixed(2) + ' £');
        stamp3.text((9.2 * indexGBP).toFixed(2) + ' £');
        stamp4.text((6.8 * indexGBP).toFixed(2) + ' £');
        stamp5.text((28.4 * indexGBP).toFixed(2) + ' £');
        stamp6.text((15 * indexGBP).toFixed(2) + ' £');
      }

      
      console.log(resultPrice.text() , convertedPrice , dataCurrency);
    });

})