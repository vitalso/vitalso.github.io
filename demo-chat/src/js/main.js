$(function () {

    var screenText = $('#screenText');
    var serverSay = $('#serverSay');
    var chatBox = $('#chat-box');
    var codeForm = $('#codeForm');
    var formAnswer = $('#chat-form');

    //var clientCode = '4RXPDLJPDI';
    var deviceCode = Cookies.get('deviceCode');
    var url = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&web=Y&deviceCode='+deviceCode+'&event=Launch&requestType=LaunchRequest&turn=0';

    if ( deviceCode == null ) {
        $('.chat-item').addClass('hidden');
        codeForm.removeClass('hidden');
        console.log('none');
    } else {
        $('.chat-item').removeClass('hidden');
        codeForm.addClass('hidden');
        console.log(deviceCode);
        getInfo(url);
        //$('#loading-icon').addClass('hidden');
        //$('#chat-icon').removeClass('hidden');
    };
    //var url = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&web=Y&deviceCode=4RXPDLJPDI&event=Launch&requestType=LaunchRequest&turn=0';

    codeForm.on('submit' , function(e){
        e.preventDefault();
  
        var deviceCodeValue = $(this).find('input').val();
        Cookies.set('deviceCode', deviceCodeValue , { sameSite: 'strict' });
  
        $(this).addClass('hidden');
        $('.chat-item').removeClass('hidden');
        deviceCode = Cookies.get('deviceCode');
        var urlWithCode = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&web=Y&deviceCode='+deviceCode+'&event=Launch&requestType=LaunchRequest&turn=0';

        getInfo(urlWithCode);
  
    });

    $('#open-chat').on('click' , function(){
        $('#loading-icon').removeClass('hidden');
        $('#chat-icon').addClass('hidden');

        chatBox.removeClass('hidden');
        
    });

    $('#close-chat').on('click' , function(){
        chatBox.addClass('hidden');
        Cookies.remove('clientCode', { sameSite: 'strict' });
    });

    function getInfo(url) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: {
            },
            success: function (result) {
                $('#loading-icon').addClass('hidden');
                $('#chat-icon').removeClass('hidden');

                //console.log(result);
                //console.log(result.screenText);
                //console.log(resp);
                
                screenText.text(result.screenText);
                serverSay.text(result.serverSays);
                var resp = result.expect_resp_arr;
                for (i=0; i < resp.length; i++){
                    console.log(i, resp[i]);
                    $('.chat-answer form').prepend("<div class='mb-3'><input type='radio' name='question' id="+i+" value="+resp[i]+"><label for="+i+"> "+resp[i]+"</label></div>");
                }
            },
            error: function () {
                console.log("error");
            }
        });
    };

    /*$('input[type="radio"]').on('change' , function(){
        var value = $(this).filter(':checked').val();
        //console.log(value);
        alert(value);
    });*/

    $('#sendAnswer').on('click' , function(){

        var value = $('input[name="question"]').filter(':checked').val();
        var valueID = $('input[name="question"]').filter(':checked').attr('id');
        console.log(value , valueID);
        //alert(value);

        var urlPOST = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&web=Y&stamp=1663119408&lastDialogID=26&event=CustomerIntent&ShouldEndSession=false&heard='+value+'&respID='+valueID+'&deviceCode=4RXPDLJPDI&rego=Y&node=node18';

        $.ajax({
            url: urlPOST,
            type: "POST",
            dataType: "json",
            data: {},
            //data: formAnswer.serialize(),
            success: function (result) {

                console.log(result);
                screenText.text(result.screenText);
                serverSay.text(result.serverSays);
                var resp = result.expect_resp_arr;
                
                $('.chat-answer form').html('');
                
                for (i=0; i < resp.length; i++){
                    console.log(i, resp[i]);
                    $('.chat-answer form').prepend("<div class='mb-3'><input type='radio' name='question' id="+i+" value="+resp[i]+"><label for="+i+"> "+resp[i]+"</label></div>");
                }
                
                //console.log(heard , respID);
                
            },
            error: function () {
                console.log("error");
            }
        });
    });

    Cookies.remove('deviceCode' , { sameSite: 'strict' });

});