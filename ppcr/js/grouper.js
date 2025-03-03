$(document).ready(function() {

    showSimilaritySelectors();
    $('#grouperMethod').change(function(item) {
        showSimilaritySelectors();
    });

    function showSimilaritySelectors()
    {
        const $select = $('#grouperMethod');
        const $scoreContainer = $('#isSameMinScore').closest('.form-group');
        const $algorithmContainer = $('#algorithm').closest('.form-group');

        let value = parseInt($select.val());

        if (value === 2) {
            $scoreContainer.show();
            $algorithmContainer.show();
        } else {
            $scoreContainer.hide();
            $algorithmContainer.hide();
        }
    }

    $('.nav-link').click(function(){
        $(this).parent().prev().children().removeClass('active').addClass('complete')
    })
    $('.switcher-wrap label').click(function(){
        $(this).closest('.switcher-wrap').find('input').click()
    }) 
    if($('body').hasClass('table-page')){

    } else {
        $('.form-group .select-keywords').select2();
    }
    $('.footable .footable-even').click(function(){
       let takeCurentId = $(this).attr('data-id');
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.footable-row-detail[data-id="'+ takeCurentId +'"]').hide(300)
        } else {
            $(this).addClass('active');
            $('.footable-row-detail[data-id="'+ takeCurentId +'"]').show(300)
        }
      
    })
    $(' .add-group-wrap .item').click(function(){
        $('.add-group-wrap .item').removeClass('active');
        $('.add-group-wrap .item').find('input').removeAttr('checked');
        $('.add-group-wrap .item').find('.form-check-label').text('Choose it')
        $(this).addClass('active');
        $(this).find('.form-check-label').text('Choosen')
        $(this).find('input').attr('checked', 'checked')
    })

    $('.abc-check').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find('input').removeAttr('checked')
        } else {
            $(this).addClass('active');
            $(this).find('input').attr('checked', 'checked')
        }
    })

    $('.btn-next').click(function(){
       let takeStep = $(this).attr('data-next-step');       
       $('.page-heading .tab-head .nav-link[data-step="'+ takeStep +'"]').click();
    })

    $('.modal-keyword .btn-primary').click(function(){
        let currentVal = $(this).closest('.modal').find('input').val();
        if(currentVal === '') {
            $('.keyword-form-group .error').remove();
            $(this).closest('.modal').find('.keyword-form-group').append('<div class="error">Specify keyword value</div>')
        } else {
            $(this).closest('.modal').find('.error').remove();

            let currentMatchVal = $(this).closest('.modal').find('select').val();
            if (currentMatchVal === 'exact') {
                currentVal = '[' + currentVal + ']';
            } else if (currentMatchVal === 'phrase'){
                currentVal = '"' + currentVal + '"';
            }

        $('.modal-wrap .drag-element-new')
            .clone()
            .addClass('negative-element')
            .prependTo('.addingNegativeKeyWord.drag-card .drag-list .negative-list')
            .find('.title')
            .text(currentVal)
            .attr('data-match-type',currentMatchVal);

        $('.modal-wrap .drag-element-new')
            .clone()
            .prependTo('.addingKeyWord.drag-card .drag-list')
            .find('.title')
            .text(currentVal)
            .attr('data-match-type',currentMatchVal);

        $('.drag-card').removeClass('addingKeyWord').removeClass('addingNegativeKeyWord');
        $(this).closest('.modal').find('.btn-cancel').click();
        initGroup();
        }
    })

    $('#modal-negative-keyword-submit').click(function(){
        let newAdGroup = $(this).closest('.modal').find('#modal-negative-keyword-negative-keyword-name').val();
        if(newAdGroup == '') {
            newAdGroup = 'Example title';
        }
        $('.clone-wrap .drag-new .group-title .value').text(newAdGroup);
         $(this).closest('.modal').find('#modal-negative-keyword-negative-keyword-name').val('')
        $('.clone-wrap .drag-new').clone().prependTo('.drag-group');
        $(this).closest('.modal').find('.btn-cancel').click();
        initGroup();
    })


    $('#modal-delete-negative-keyword-submit').click(function() {
        $('.remove-group.removing').closest('.parent-remove').find('.drag-element:not(.drag-element-new)').each(function(){
            currentParent = $(this);
            // console.log(currentParent)
            mmoveKeywords(currentParent)
        })        
        $('.remove-group.removing').closest('.parent-remove').remove();
        $(this).closest('.modal').find('.btn-cancel').click();
    })

    function mmoveKeywords(currentParent) {
        setTimeout(function() {         
            currentParent.appendTo('.drag-elemnts-list').fadeIn(300);
            checkDrags();
          }, 400);  
    }

function initTitleEditing() {
    function saveTitle() {
        var editTitle = $('.drag-card.editing .edit-title').val();
        $('.drag-card.editing').find('.group-title').children('.value').text(editTitle);
        $('.drag-card.editing').find('.edit-title').remove();
        $('.drag-card.editing').removeClass('editing');
    }
    function titleHandle(){
        $(".edit-title").keyup(function(e){
            if(e.keyCode == 13){
                saveTitle();
            }
        });
        $(document).mouseup(function (e) {
            var container =  $('.drag-card.editing .group-title');
            if (container.has(e.target).length === 0){
                saveTitle();
            }
        });
    }

    let groupsContainer = $('#js-groups');

    groupsContainer.on('click', '.edit', function(e) {
        e.preventDefault();
        var currenTitle =  $(this).closest('.drag-top-info').find('.group-title').children('.value').text();
        console.log($(this).closest('.drag-card').attr('id'))
        $(this).closest('.drag-card').addClass('editing');
        $('.drag-card.editing').find('.editing-title-area').html('<input class="edit-title" type="text" value="' + currenTitle + '" />');
        $(this).closest('.drag-top-info').find('.edit-title').focus();
        titleHandle();
    });
}


    function initGroup(){
        checkDrags();   
        initTitleEditing();

        let groupsContainer = $('#js-groups');

        groupsContainer.on('click', '.remove-group', function(e) {
            e.preventDefault();

            //console.log(e);

            if($(this).attr('data-toggle') != 'modal') {
                // console.log($(this))
                $(this).closest('.parent-remove').fadeOut(300);
                if(!$(this).parent().hasClass('drag-element-new')) {
                    var currentParent = $(this).closest('.parent-remove');
                    mmoveKeywords(currentParent)
                } else {
                    $(this).closest('.parent-remove').remove();
                    checkDrags();
                }             
                
            } else {
                $(this).addClass('removing');
                let currentTitle = $(this).closest('.drag-top-info').find('.group-title').text();
                $('#modal-delete-negative-keyword').find('.modal-title').text('Delete Ad Group ' + currentTitle)
                $('#modal-delete-negative-keyword').find('#modal-delete-negative-keyword-body-form').text('Are you sure you want to delete ' + currentTitle + '? This cannot be undone.');
            }
        });

        groupsContainer.on('click', '.drag-bot-info a', function(e) {
            e.preventDefault();

            console.log(e);

            $('.modal-keyword').find('input').val('');
            $('.modal-keyword').find('select').val('exact');
            if($(this).hasClass('add-keyword')){
                $(this).closest('.drag-card').addClass('addingKeyWord');
            } else {
                $(this).closest('.drag-card').addClass('addingNegativeKeyWord');
            }
        });

        $( ".sortable" ).sortable({
            revert: true,
            cursor: 'move',
            items: ".drag-element",
            connectWith: ".sortable",
            stop: function() {
                checkDrags();
            },
            receive: function( event, ui ) {

            }            
          });

        if ($('.drag-element-new').length) {
            $('.drag-element-new').draggable({
                connectToSortable: ".drag-list.sortable",
                cursor: 'move',
                revert: true,
                stop: function () {
                    checkDrags();
                }
            });
        }

        //   $( ".draggable:not(.drag-element-new), .ui-state-default" ).draggable({
        //     connectToSortable: ".sortable",
        //     cursor: 'move',
        //     // helper: "clone",
        //     revert: "invalid",
        //     stop: function() {
        //         checkDrags();
        //     }
        //   });

    }

    function checkDrags() {
        let newAdGroupsNumber = 0;
        $('.drag-card').each(function(i) {
            //let dragCounter = $(this).find('.drag-element:not(.ui-sortable-placeholder)').length
            $(this).find('.group-number').text('Ad Group ' + ++i);
            $(this).attr('id', 'drag-card-id-' + ++i)

            let number = $(this).find('.drag-element').length;

            if ( number >= 1 ) {
                $(this).find('#empty-list-keyword').addClass('d-none');
                $(this).find('#not-empty-list-keyword').removeClass('d-none');
            } else {
                $(this).find('#empty-list-keyword').removeClass('d-none');
                $(this).find('#not-empty-list-keyword').addClass('d-none');
            }

            $(this).find('.group-size').html(number);

            newAdGroupsNumber++;
            //console.log(i);
        });

        newAdGroupsNumber--;

        if ( newAdGroupsNumber >= 1 ) {
            $('#empty-info').addClass('d-none');
            $('#filled-info').removeClass('d-none');
            $('.error-group').addClass('d-none');
        }

        $('#newAdGroupsNumber').html(newAdGroupsNumber);
       } 
       
       
     initGroup();

    // Check count group after delete the group
    $('.modal-delete-group').on('click' , function(){
        checkDrags();
    });


    $('.account-choice').change(function(){
        let takeAcc = $(this).val();
        $('.form-group.toggle-wrap').fadeOut(0);
        $('.form-group.toggle-wrap[data-account="'+ takeAcc +'"]').fadeIn(300);
    })

    $('.form-group.toggle-wrap .ibox .ibox-tools').click(function(){
        if($(this).closest('.toggle-wrap').hasClass('active')){
            $(this).closest('.toggle-wrap').removeClass('active');
        } else {
            $('.form-group.toggle-wrap').removeClass('active');
            $(this).closest('.toggle-wrap').addClass('active');
        }
        //$('.form-group.toggle-wrap:not(.active) .ibox.collapsed.border-bottom').removeClass('border-bottom').children('.ibox-content').slideToggle();
        //$('.form-group.toggle-wrap:not(.active)').find('.icon').removeClass('fa-chevron-up').removeClass('fa-chevron-down')
    })

    function editAreaClick()
    {
        $('.edit-area').click(function(){
            $(this).parent().fadeOut(0);
            $(this).parent().siblings('.select-keywords').fadeIn(0).focus();
        })
        $('.textarea-visual span[data-role="remove"]').click(function(){
            $(this).parent().remove();
        })            
    }

    $('textarea.select-keywords').change(function()
    {
       let currentLength    = $(this).val().split(/\r\n|\r|\n/).length,
           keyWordList      = $(this).val().split(/\r\n|\r|\n/),
           keyWordListNew   = '',
           $textAreaVisual  = $(this).siblings('.textarea-visual');

       for (let i=0 ;i < currentLength; ++i) {
            keyWordListNew +=
                '<span data-val="' + keyWordList[i] + '">'
                    + keyWordList[i]
                    + '<span data-role="remove"></span>' +
                '</span>'
       }

       if ($textAreaVisual.length) {
           $textAreaVisual.html(keyWordListNew + '<div class="edit-area"></div>');
           $(this).fadeOut(0);
           $textAreaVisual.fadeIn(0);
           editAreaClick();
       }
    });

    editAreaClick();
    
    $(".number-field").TouchSpin({
        min: 0,
        step: 0.1,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
    });

    $('.btn-cancel').click(function(){
        $(this).closest('.modal').fadeOut(300);
        if($(this).attr('id') == 'modal-delete-negative-keyword-cancel') {
            $('.remove-group').removeClass('removing');
        }
    });

    // Change the text on button
    $('.actions ul li a').on('click' , function(){

        let count = $('.new-ad-group.regroup .drag-group').length;
        if ( count > 0 ){
            $('#filled-info').removeClass('d-none');
            $('#empty-info').addClass('d-none');
            $('.error-group').addClass('d-none');
        }
        console.log(count);

        if ( $('#wizard-p-1').hasClass('current') ) {
            let countGroup = $('.new-ad-group .drag-group .drag-card').length;
            if ( countGroup == 0) {
                $('.error-group').removeClass('d-none');
            }
            console.log(countGroup);
        }

        if ( $('#wizard-p-2').hasClass('current') ) {
            $('.actions ul li a[href="#next"]').text('Confirm and create Ad Groups');
        } else if ( $('#wizard-p-1').hasClass('current') ) {
            $('.actions ul li a[href="#next"]').text('Next');
        } else {
            $('.actions ul li a[href="#next"]').text('Next');
        }
    });

})