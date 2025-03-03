$('#modal-negative-keyword-submit').click(function() {
    let modal = $('#modal-negative-keyword');

    modal.hide();
});

$('.keyword-check-modal').click(function() {
    let el = $(this),
        modal = $('#modal-negative-keyword');

    let keywordId = el.data('keyword-id') ? el.data('keyword-id') : 0,
        adGroupId = el.data('ad-group-id') ? el.data('ad-group-id') : 0;

    if (modal.length) {
        if (adGroupId) {

            let modalTitle = keywordId
                ? 'Keyword Check'
                : 'Ad Group Check';

            $('#modalTitle').html(modalTitle);

            /*console.log(keywordId);
            console.log(adGroupId);*/

            $.ajax({
                url: '/keyword/check',
                type: 'POST',
                data: {
                    keywordId: keywordId,
                    adGroupId: adGroupId
                },
                dataType: 'json',
                success: function (data) {

                    console.log(data);

                    let fields = [
                        'keywordName',
                        'adGroupName',
                        'keywordSimilarity',
                        'adGroupSimilarity',
                        'adGroupSearchTermSimilarity',
                        'searchQueryToKeywordSimilarity',
                        'searchQueryToAdGroupSimilarity',
                    ];

                    $('#modalItemName').html('');

                    if (data) {
                        fields.forEach(function(field) {

                            let $item = $('#' + field);

                            if (data[field]) {

                                let value =
                                    field === 'adGroupName' || field === 'keywordName'
                                        ? data[field]
                                        : data[field] + '%';

                                if (field === 'adGroupName' || field === 'keywordName') {
                                    $('#modalItemName').html(value);
                                }

                                $item.html(value);
                                $item.closest('li').show();
                            } else {
                                if (field !== 'adGroupName' && field !== 'keywordName') {
                                    $item.closest('li').hide();
                                }
                            }
                        });

                        modal.show();
                    }
                },
                error: function (xhr, status, error) {
                    console.log(status);
                    console.log(error);
                    console.log(xhr);
                }
            });


        } else {
            console.log('Empty ad group ID!');
        }
    } else {
        console.log('Modal not found!');
    }
});