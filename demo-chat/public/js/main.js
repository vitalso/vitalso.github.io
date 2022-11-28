$(function () {

    var url = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&deviceCode=4RXPDLJPDI&event=Launch&requestType=LaunchRequest&turn=0'
    $('#open-chat').on('click' , function(){
        /*$.getJSON("https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&deviceCode=4RXPDLJPDI&event=Launch&requestType=LaunchRequest&turn=0", function(result){
            //alert("Data: " + data + "\nStatus: " + status);

            console.log(result);
        });*/
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
            },
            error: function () {
                console.log("error");
            }
        });
    });


});