
var isProcessingCollection = false;
var inCollection = [];

$(function () {

    $.get('/manager/panel', {}, function (data) {
        $(data).prependTo('body');
    }, 'html');

});

function initAddCollectionClick(){
   
    for(let i = 0; i < inCollection.length;i++){
        let id = inCollection[i];
        $('.pcb[value="'+ id  +'"]').prop('checked', 'checked');
    }
    
    $('.pcb').on('click', function(){
        let id = $(this).val();
        let url = '/manager/collection/add';
        if(!$(this).is(':checked')){
            url = '/manager/collection/remove';
        }
        $.post(url,{id:id}, function(data){
            $('#processingCollection').find('.badge').html(data.count);
        }, 'json');
    });
}

function startCreateCollection(obj) {
    let name = prompt("Collection's name");
    if (name != "" && name != null) {
        $.blockUI();
        $.post('/manager/collection/start', {name:name}, function(data){
            $(obj).after('<a class="ml-1 btn btn-info" href="#" id="processingCollection">Processing:&nbsp;' + data.name + ' <span class="badge badge-success">0</span></a>');
            isProcessingCollection = true;
            initAddCollectionClick();
            $('#createCollection').hide();
            $('#finishCollection').show();
            $('#removeCollection').show();
            $.unblockUI();
        }, 'json');
       

    }
}

function finishCollection(){
    if(confirm('Finish edit collection ?')){
        $.post('/manager/collection/finish', {}, function(){
            document.location.reload();
        });
    }
}

function removeCollection(){
    if(confirm('Remove collection ?')){
        $.post('/manager/collection/delete', {}, function(){
            document.location.reload();
        });
    }
}