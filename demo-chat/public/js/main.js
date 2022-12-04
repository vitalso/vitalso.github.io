$(function () {

    var url = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&web=Y&deviceCode=4RXPDLJPDI&event=Launch&requestType=LaunchRequest&turn=0'
    var screenText = $('#screenText');
    var serverSay = $('#serverSay');
    //var resp = [];
    $('#open-chat').on('click' , function(){
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "GET", /* or type:"GET" or type:"PUT" */
            dataType: "json",
            data: {
            },
            success: function (result) {
                console.log(result);
                console.log(result.screenText);
                screenText.text(result.screenText);
                serverSay.text(result.serverSays);
                var resp = result.expect_resp_arr;
                console.log(resp);
                for (i=0; i < resp.length; i++){
                    console.log(i, resp[i]);
                    $('.chat-answer').append("<div class='mb-3'><input type='radio' name='radio' id="+i+"><label for="+i+">"+resp[i]+"</label></div>");
                }
            },
            error: function () {
                console.log("error");
            }
        });
    });


});