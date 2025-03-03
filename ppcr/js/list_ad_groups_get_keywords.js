if ($('#table-ad-groups').length) {
    $('.get-ads').click(function (e) {
        e.preventDefault();

        let adGroupId = $(this).data('ad-group-id'),
            container = $(this).closest('tr');

        if (container.hasClass('opened')) {
            container.removeClass('opened');

            $('table').find('.footable-row-detail').remove();
        } else {
            $.ajax({
                url: '/ad-group/keywords',
                type: 'POST',
                data: {
                    adGroupId: adGroupId
                },
                dataType: 'json',
                success: function (data) {

                    console.log(data);

                    container.addClass('opened');

                    let cols = [
                        'keyword_name',
                        'keyword_similarity',
                    ];

                    let html = '';
                    for (const [key, item] of Object.entries(data)) {
                        html += '<tr class="footable-row-detail">';
                        html += '<td colspan="3"></td>';

                        cols.forEach(function (name) {
                            let property = item[name];

                            if(name == 'keyword_name'){
                                var tdClass = 'ppcr-tbl-section-td-border-left-one col-md-2"';
                            }else{
                                var tdClass = 'col-md-1';
                            }
                            html += '<td class="' + tdClass + '" >';

                            if (property) {

                                if(name == 'keyword_similarity') {

                                    if (property >= 80) {
                                        var matchIcon = ' <i class="fa fa-trophy"></i>';
                                        var matchColor = 'text-navy';
                                    } else if (property <= 30) {
                                        var matchIcon = ' <i class="fa fa-flash"></i>';
                                        var matchColor = 'text-danger';
                                    } else {
                                        var matchIcon = ' <i class="fa fa-warning"></i>';
                                        var matchColor = 'text-warning';
                                    }

                                    html += '<div class="pull-left ' + matchColor + '" style="width:45px;">' + property.toFixed(1) + '%' + '</div><div class="pull-left text-center ' + matchColor + '" style="width:20px;">' + matchIcon + '</div>';

                                }else{

                                    html += property;

                                }

                            }

                            html += '</td>';
                        });

                        html += '<td class="ppcr-tbl-section-td-border-left-two text-center">' + item.impressions + '</td>';
                        html += '<td class="text-center">' + item.clicks + '</td>';
                        html += '<td class="text-center">' + item.conversions + '</td>';


                        html += '</tr>';
                    }

                    $('table').find('.footable-row-detail').remove();

                    container.after(html);
                },
                error: function (xhr, status, error) {
                    console.log(status);
                    console.log(error);
                    console.log(xhr);
                }
            });
        }
    })
}