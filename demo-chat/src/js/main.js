$(function () {

    var screenText = $('#screenText');
    var serverSay = $('#serverSay');
    var chatBox = $('#chat-box');
    var codeForm = $('#codeForm');
    var formAnswer = $('#chat-form');
    var chatMedia = $('#chat-media');

    //var clientCode = '4RXPDLJPDI';
    //var cliendCode = '00XPDLJPDI';
    var deviceCode = Cookies.get('deviceCode');
    var url = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&deviceCode='+deviceCode+'&event=Launch&requestType=LaunchRequest&turn=0';

    if ( deviceCode == null ) {
        $('.chat-item').addClass('hidden');
        codeForm.removeClass('hidden');
        $('#chat-loading').addClass('hidden');
        console.log('none');
    } else {
        codeForm.addClass('hidden');
        $('#chat-loading').removeClass('hidden');
        console.log(deviceCode);
        getInfo(url);
    };

    codeForm.on('submit' , function(e){
        e.preventDefault();
  
        var deviceCodeValue = $(this).find('input').val();
        Cookies.set('deviceCode', deviceCodeValue , { sameSite: 'strict' });
  
        $(this).addClass('hidden');
        $('.chat-item').removeClass('hidden');
        deviceCode = Cookies.get('deviceCode');
        var urlWithCode = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&deviceCode='+deviceCode+'&event=Launch&requestType=LaunchRequest&turn=0';

        getInfo(urlWithCode);
  
    });

    $('#open-chat').on('click' , function(){

        $(this).addClass('hidden');
        chatBox.removeClass('hidden');
        
    });

    $('#close-chat').on('click' , function(){
        chatBox.addClass('hidden');
        $('#open-chat').removeClass('hidden');
        Cookies.remove('deviceCode', { sameSite: 'strict' });
    });

    $('#close-media').on('click' , function(){
        chatMedia.addClass('hidden');
    });

    $('#openResponse input').on('input' , function(){
        if ( $(this).val().length > 1 ) {
            $(this).next('button').removeClass('hidden');
            $(this).next('button').attr('data-value' , $(this).val());
        } else {
            $(this).next('button').addClass('hidden');
            $(this).next('button').attr('data-value' , '');
        }
    });

    function getInfo(url) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: {
            },
            beforeSend: function() {
                $('.chat-item').addClass('hidden');
                $('#chat-loading').removeClass('hidden');
            },
            success: function (result) {
                $('.chat-item').removeClass('hidden');
                $('#chat-loading').addClass('hidden');

                //console.log(result.screenText);
                console.log(result);

                Cookies.set('stamp', result.stamp , { sameSite: 'strict' });
                Cookies.set('display', result.display , { sameSite: 'strict' });
                Cookies.set('rego', result.rego , { sameSite: 'strict' });
                Cookies.set('clientID', result.clientID , { sameSite: 'strict' });
                Cookies.set('clientName', result.clientName , { sameSite: 'strict' });
                Cookies.set('dialogID', result.dialogID , { sameSite: 'strict' });
                Cookies.set('smartHeartID', result.dialogID , { sameSite: 'strict' });
                Cookies.set('lastDialogID', result.dialogID , { sameSite: 'strict' });

                screenText.text(result.screenText);
                if ( result.serverSays !== '' ) {
                    serverSay.closest('div').removeClass('hidden');
                    serverSay.text(result.serverSays);
                } else {
                    serverSay.closest('div').addClass('hidden');
                }

                if ( result.serverPic !== '' ) {
                    var serverImage = result.serverPic;
                    if ( !$('#serverPic').length ) {
                        chatMedia.append("<div id='serverPic' class='h-full'></div>");
                    }

                    chatMedia.find('#serverPic').css({
                        'background-image': 'url('+serverImage+')',
                        'background-position': 'center top',
                        'background-repeat': 'no-repeat',
                        'background-size': 'contain'
                    });

                    chatMedia.removeClass('hidden');

                }

                //var template = $.parseJSON('https://stepsforward.com.au/buddylink/2/assets/apl/apl_imageNoText.json');

                var resp = result.expect_resp_arr;
                for (i=0; i < resp.length; i++){
                    console.log(i, resp[i]);
                    //$('#chat-form').prepend("<div class='mb-3'><input type='radio' name='question' id="+i+" value="+resp[i]+"><label for="+i+"> "+resp[i]+"</label></div>");
                    formAnswer.append("<div class='mb-3'><button data-value="+resp[i]+" data-id="+i+" class='w-full py-3 text-slate-700 bg-slate-300 rounded-lg font-bold hover:bg-slate-200 active:bg-slate-600 active:text-white transition-all capitalize'>"+resp[i]+"</button></div>")
                }

                var template = result.apl_arr;

                switch (result.screenJSN) { 
                    case 'apl_imageNoText.json':
                        var templateTitle = template.datasources.imageTemplateData.properties.title;
                        var templateUrl = template.datasources.imageTemplateData.properties.logoUrl;
                        break;
                    case 'apl_screentext_1.json':
                        var templateTitle = template.datasources.longTextTemplateData.properties.title;
                        var templateUrl = template.datasources.longTextTemplateData.properties.logoUrl;
                        break;
                    case 'apl_movie2.json':
                        var templateTitle = template.datasources.data20.title;
                        var templateUrl = template.datasources.data20.logoUrl;
                        break;
                    default:
                        var templateTitle = template.datasources.imageTemplateData.properties.title;
                        var templateUrl = template.datasources.imageTemplateData.properties.logoUrl;
                }

                if ( !$('#screenLogo').length ) {
                    $('#chat-header').append("<div id='screenLogo' class='w-10 h-10 rounded-lg bg-white'><img src='' alt='logo'></div>");
                }
                $('#chat-header').find('#screenLogo img').attr('src' , templateUrl);

                if ( !$('#screenTitle').length ) {
                    $('#chat-header').append("<h5 id='screenTitle' class='text-base font-bold'></h5>");
                }
                $('#chat-header').find('#screenTitle').text(templateTitle);

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

    $(document).on('click' , '#chat-form button , #openResponse button' , function(){

        //var value = $('input[name="question"]').filter(':checked').val();
        //var valueID = $('input[name="question"]').filter(':checked').attr('id');

        var value = $(this).attr('data-value');
        var valueID = $(this).attr('data-id');
        console.log(value , valueID);

        //var urlPOST = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&web=Y&stamp=1663119408&lastDialogID=26&event=CustomerIntent&ShouldEndSession=false&heard='+value+'&respID='+valueID+'&deviceCode=4RXPDLJPDI&rego=Y&node=node18';
        var urlPOST = 'https://stepsforward.com.au/buddylink/2/control/interactions.php?action=getinfo&stamp=1670535819&turn=0&lastDialogID=39&state=1&event=AMAZON.YesIntent&ShouldEndSession=false&requestType=Amazon&deviceCode='+deviceCode+'&rego=Y&node=node1&heard='+value+'&respID='+valueID+'';

        $.ajax({
            url: urlPOST,
            type: "POST",
            dataType: "json",
            data: {},
            beforeSend: function() {
                $('.chat-item').addClass('hidden');
                $('#chat-loading').removeClass('hidden');
            },
            success: function (result) {

                $('.chat-item').removeClass('hidden');
                $('#chat-loading').addClass('hidden');

                $('#openResponse input').val('');
                $('#openResponse input').next('button').addClass('hidden');

                //console.log(Cookies.get());

                screenText.text(result.screenText);
                if ( result.serverSays !== '' ) {
                    serverSay.closest('div').removeClass('hidden');
                    serverSay.text(result.serverSays);
                } else {
                    serverSay.closest('div').addClass('hidden');
                }
                
                var resp = result.expect_resp_arr;

                // Check if answer have the image
                if ( result.serverPic !== '' ) {
                    var serverImage = result.serverPic;

                    if ( !$('#serverPic').length ) {
                        chatMedia.append("<div id='serverPic' class='h-full'></div>");
                    }

                    chatMedia.find('#serverPic').css({
                        'background-image': 'url('+serverImage+')',
                        'background-position': 'center top',
                        'background-repeat': 'no-repeat',
                        'background-size': 'contain'
                    });

                    chatMedia.removeClass('hidden');
                } else {
                    chatMedia.find('#serverPic').remove();
                }
                
                // Check if answer have the video
                if ( result.serverVid !== '' ) {
                    var serverVideo = result.serverVid;
                    
                    if ( !$('#serverVid').length ) {
                        chatMedia.append("<div id='serverVid' class='h-full'><video src='' controls autoplay></video></div>");
                    }

                    chatMedia.find('#serverVid video').attr('src' , serverVideo);
                    
                    chatMedia.removeClass('hidden');
                } else {
                    chatMedia.find('#serverVid').remove();
                }

                // Check if we have URL
                if ( result.url !== '' ) {
                    var serverUrl = result.url;
                    
                    if ( !$('#serverUrl').length ) {
                        chatMedia.append("<div id='serverUrl' class='h-full'><iframe width='100%' height='100%' src='' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>");
                    }

                    chatMedia.find('#serverUrl iframe').attr('src' , serverUrl);
                    
                    chatMedia.removeClass('hidden');
                } else {
                    chatMedia.find('#serverUrl').remove();
                }

                // Remove element with media
                if ( result.serverPic == '' && result.serverVid == '' && result.url == '' ) {
                    chatMedia.addClass('hidden');
                }
                
                // Clear the form
                formAnswer.html('');

                if ( resp == null ) {
                    console.log('null')
                } else {
                
                    for (i=0; i < resp.length; i++){
                        console.log(i, resp[i]);
                        if ( resp[i] == 'PLAYEND' ) {
                            formAnswer.append("<div class='mb-3'><button data-value="+resp[i]+" data-id="+i+" class='w-full py-3 text-slate-700 bg-slate-300 rounded-lg font-bold hover:bg-slate-200 active:bg-slate-600 active:text-white transition-all capitalize'>CONTINUE</button></div>")
                        } else {
                            formAnswer.append("<div class='mb-3'><button data-value="+resp[i]+" data-id="+i+" class='w-full py-3 text-slate-700 bg-slate-300 rounded-lg font-bold hover:bg-slate-200 active:bg-slate-600 active:text-white transition-all capitalize'>"+resp[i]+"</button></div>")
                        }
                    }

                }

                console.log(result);

                var template = result.apl_arr;

                switch (result.screenJSN) { 
                    case 'apl_imageNoText.json':
                        var templateTitle = template.datasources.imageTemplateData.properties.title;
                        var templateUrl = template.datasources.imageTemplateData.properties.logoUrl;
                        break;
                    case 'apl_screentext_1.json':
                        var templateTitle = template.datasources.longTextTemplateData.properties.title;
                        var templateUrl = template.datasources.longTextTemplateData.properties.logoUrl;
                        break;
                    case 'apl_movie2.json':
                        var templateTitle = template.datasources.data20.title;
                        var templateUrl = template.datasources.data20.logoUrl;
                        break;
                    default:
                        var templateTitle = template.datasources.imageTemplateData.properties.title;
                        var templateUrl = template.datasources.imageTemplateData.properties.logoUrl;
                }

                if ( !$('#screenLogo').length ) {
                    $('#chat-header').append("<div id='screenLogo' class='w-10 h-10 rounded-lg bg-white'><img src='' alt='logo'></div>");
                }
                $('#chat-header').find('#screenLogo img').attr('src' , templateUrl);

                if ( !$('#screenTitle').length ) {
                    $('#chat-header').append("<h5 id='screenTitle' class='text-base font-bold'></h5>");
                }
                $('#chat-header').find('#screenTitle').text(templateTitle);
                
                //console.log(heard , respID);
                
            },
            error: function () {
                console.log("error");
            }
        });
    });

    Cookies.remove('deviceCode' , { sameSite: 'strict' });

});